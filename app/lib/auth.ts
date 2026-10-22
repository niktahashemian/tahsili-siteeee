'use client';

import { useMemo, useSyncExternalStore } from 'react';

// ======================================================================
// لایه‌ی احراز هویت سمت مرورگر (دمو)
// اطلاعات در localStorage همین مرورگر ذخیره می‌شود. برای استفاده‌ی واقعی،
// توابع این فایل را با فراخوانی API سرور جایگزین کنید؛ بقیه‌ی صفحه‌ها تغییری نمی‌کنند.
// ======================================================================

export type Grade = 'dahom' | 'yazdahom' | 'davazdahom';
export type Field = 'riyazi' | 'tajrobi' | 'ensani';

export interface User {
  id: string;
  name: string;
  phone: string;
  grade: Grade;
  field: Field;
  passHash: string;
  createdAt: number;
}

export const GRADE_NAMES: Record<Grade, string> = {
  dahom: 'دهم',
  yazdahom: 'یازدهم',
  davazdahom: 'دوازدهم',
};

export const FIELD_NAMES: Record<Field, string> = {
  riyazi: 'ریاضی',
  tajrobi: 'تجربی',
  ensani: 'انسانی',
};

const USERS_KEY = 'tahsili_users';
const SESSION_KEY = 'tahsili_session';
const EVENT = 'tahsili-auth';
const SSR_SENTINEL = '__ssr__';

// ---------------------------- ابزارهای کمکی ----------------------------

export function normalizeDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .trim();
}

export function normalizePhone(input: string): string {
  return normalizeDigits(input).replace(/[\s-]/g, '');
}

export function isValidPhone(phone: string): boolean {
  return /^09\d{9}$/.test(phone);
}

async function hashPassword(password: string, phone: string): Promise<string> {
  try {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const data = new TextEncoder().encode(`${phone}:${password}`);
      const buf = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    }
  } catch {
    /* ignore */
  }
  return `plain:${phone}:${password}`;
}

function readUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } finally {
    window.dispatchEvent(new Event(EVENT));
  }
}

function readSession(): string | null {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

function writeSession(phone: string | null) {
  try {
    if (phone) localStorage.setItem(SESSION_KEY, phone);
    else localStorage.removeItem(SESSION_KEY);
  } finally {
    window.dispatchEvent(new Event(EVENT));
  }
}

// ------------------------------ عملیات اصلی ------------------------------

export interface Result {
  ok: boolean;
  error?: string;
}

export async function registerUser(data: {
  name: string;
  phone: string;
  password: string;
  grade: Grade;
  field: Field;
}): Promise<Result> {
  const phone = normalizePhone(data.phone);
  const name = data.name.trim();
  if (name.length < 2) return { ok: false, error: 'نام و نام خانوادگی را وارد کنید.' };
  if (!isValidPhone(phone)) return { ok: false, error: 'شماره موبایل معتبر نیست (مثال: 09123456789).' };
  if (data.password.length < 6) return { ok: false, error: 'رمز عبور باید حداقل ۶ کاراکتر باشد.' };

  const users = readUsers();
  if (users.some((u) => u.phone === phone)) {
    return { ok: false, error: 'با این شماره قبلاً ثبت‌نام شده است. وارد شوید.' };
  }

  const user: User = {
    id: `u_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
    name,
    phone,
    grade: data.grade,
    field: data.field,
    passHash: await hashPassword(data.password, phone),
    createdAt: Date.now(),
  };
  writeUsers([...users, user]);
  writeSession(phone);
  return { ok: true };
}

export async function loginUser(phoneInput: string, password: string): Promise<Result> {
  const phone = normalizePhone(phoneInput);
  if (!isValidPhone(phone)) return { ok: false, error: 'شماره موبایل معتبر نیست.' };
  const user = readUsers().find((u) => u.phone === phone);
  if (!user) return { ok: false, error: 'حسابی با این شماره پیدا نشد. ابتدا ثبت‌نام کنید.' };
  if (user.passHash !== (await hashPassword(password, phone))) {
    return { ok: false, error: 'رمز عبور اشتباه است.' };
  }
  writeSession(phone);
  return { ok: true };
}

export function logoutUser() {
  writeSession(null);
}

export function getCurrentUser(): User | null {
  const phone = readSession();
  if (!phone) return null;
  return readUsers().find((u) => u.phone === phone) ?? null;
}

export function updateProfile(patch: { name?: string; grade?: Grade; field?: Field }): Result {
  const current = getCurrentUser();
  if (!current) return { ok: false, error: 'ابتدا وارد شوید.' };
  if (patch.name !== undefined && patch.name.trim().length < 2) {
    return { ok: false, error: 'نام و نام خانوادگی را وارد کنید.' };
  }
  const users = readUsers().map((u) =>
    u.id === current.id
      ? { ...u, ...patch, name: patch.name !== undefined ? patch.name.trim() : u.name }
      : u
  );
  writeUsers(users);
  return { ok: true };
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<Result> {
  const current = getCurrentUser();
  if (!current) return { ok: false, error: 'ابتدا وارد شوید.' };
  if (current.passHash !== (await hashPassword(oldPassword, current.phone))) {
    return { ok: false, error: 'رمز عبور فعلی اشتباه است.' };
  }
  if (newPassword.length < 6) return { ok: false, error: 'رمز جدید باید حداقل ۶ کاراکتر باشد.' };
  const newHash = await hashPassword(newPassword, current.phone);
  writeUsers(readUsers().map((u) => (u.id === current.id ? { ...u, passHash: newHash } : u)));
  return { ok: true };
}

export function deleteAccount() {
  const current = getCurrentUser();
  if (!current) return;
  writeUsers(readUsers().filter((u) => u.id !== current.id));
  writeSession(null);
}

// ------------------------------ هوک واکنشی ------------------------------

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(EVENT, callback);
  };
}

function getSnapshot(): string {
  try {
    return `${localStorage.getItem(SESSION_KEY) ?? ''}\u0001${localStorage.getItem(USERS_KEY) ?? ''}`;
  } catch {
    return '';
  }
}

function getServerSnapshot(): string {
  return SSR_SENTINEL;
}

/** کاربر فعلی را برمی‌گرداند. تا زمانی که مرورگر آماده نشده ready=false است. */
export function useAuth(): { user: User | null; ready: boolean } {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = snapshot !== SSR_SENTINEL;
  const user = useMemo(
    () => (ready ? getCurrentUser() : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [snapshot, ready]
  );
  return { user, ready };
}
