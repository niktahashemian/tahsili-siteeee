'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../assets/css/auth.css';
import {
  useAuth, logoutUser, updateProfile, changePassword, deleteAccount,
  FIELD_NAMES, GRADE_NAMES, type Field, type Grade, type User,
} from '../lib/auth';
import PasswordField from '../component/auth/PasswordField';

const EXAMS = [
  { name: 'قلمچی', value: 'ghalamchi', color: '#4CAF50' },
  { name: 'ماز', value: 'maz', color: '#2196F3' },
  { name: 'گزینه دو', value: 'gozine2', color: '#FF9800' },
  { name: 'سنجش', value: 'sanjesh', color: '#6011a1' },
  { name: 'خیلی سبز', value: 'kheili sabz', color: '#ec0f22' },
];

function formatDate(ts: number) {
  try {
    return new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(ts));
  } catch {
    return '';
  }
}

export default function AccountPage() {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <div className="auth-page">
        <div className="auth-card"><p className="auth-subtitle" style={{ margin: 0 }}>در حال بارگذاری…</p></div>
      </div>
    );
  }

  // ---------- کاربر وارد نشده: دکمه‌های ورود و ثبت‌نام ----------
  if (!user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1 className="auth-title">حساب کاربری</h1>
          <p className="auth-subtitle">
            برای ذخیره‌ی پایه و رشته‌ی خود و دسترسی سریع به آزمون‌ها، وارد شوید یا ثبت‌نام کنید.
          </p>
          <Link href="/login" className="auth-btn">ورود</Link>
          <Link href="/signup" className="auth-btn secondary">ثبت‌نام</Link>
          <p className="auth-switch" style={{ marginTop: '1.25rem' }}>
            <Link href="/">← بازگشت به صفحه‌ی اصلی</Link>
          </p>
        </div>
      </div>
    );
  }

  return <Profile key={user.id} user={user} />;
}

function Profile({ user }: { user: User }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [grade, setGrade] = useState<Grade>(user.grade);
  const [field, setField] = useState<Field>(user.field);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const [showPass, setShowPass] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const saveProfile = (e: FormEvent) => {
    e.preventDefault();
    const res = updateProfile({ name, grade, field });
    if (!res.ok) return setMsg({ type: 'err', text: res.error ?? 'ذخیره نشد.' });
    setEditing(false);
    setMsg({ type: 'ok', text: 'اطلاعات با موفقیت ذخیره شد.' });
  };

  const savePassword = async (e: FormEvent) => {
    e.preventDefault();
    const res = await changePassword(oldPass, newPass);
    if (!res.ok) return setMsg({ type: 'err', text: res.error ?? 'تغییر رمز انجام نشد.' });
    setOldPass('');
    setNewPass('');
    setShowPass(false);
    setMsg({ type: 'ok', text: 'رمز عبور تغییر کرد.' });
  };

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  const handleDelete = () => {
    if (window.confirm('حساب شما برای همیشه حذف می‌شود. مطمئنید؟')) {
      deleteAccount();
      router.push('/signup');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card wide">
        <div className="acc-head">
          <div className="acc-avatar">{user.name.trim().charAt(0)}</div>
          <div>
            <h1 className="acc-name">{user.name}</h1>
            <p className="acc-sub">{user.phone}</p>
          </div>
        </div>

        {msg && <div className={msg.type === 'ok' ? 'auth-success' : 'auth-error'} role="status">{msg.text}</div>}

        <div className="acc-grid">
          <div className="acc-tile"><span>پایه</span><b>{GRADE_NAMES[user.grade]}</b></div>
          <div className="acc-tile"><span>رشته</span><b>{FIELD_NAMES[user.field]}</b></div>
          <div className="acc-tile"><span>تاریخ عضویت</span><b>{formatDate(user.createdAt)}</b></div>
        </div>

        <div className="acc-section">
          <h2>شروع آزمون ({GRADE_NAMES[user.grade]} {FIELD_NAMES[user.field]})</h2>
          <div className="acc-exams">
            {EXAMS.map((ex) => (
              <Link
                key={ex.value}
                className="acc-exam"
                style={{ background: ex.color }}
                href={`/exam/${user.grade}/${user.field}/${encodeURIComponent(ex.value)}/first-half`}
              >
                {ex.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="acc-section">
          <h2>ویرایش اطلاعات</h2>
          {!editing ? (
            <button type="button" className="auth-btn secondary" onClick={() => { setMsg(null); setEditing(true); }}>
              ویرایش نام، پایه و رشته
            </button>
          ) : (
            <form onSubmit={saveProfile} noValidate>
              <div className="auth-field">
                <label htmlFor="e-name">نام و نام خانوادگی</label>
                <input id="e-name" className="auth-input" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="auth-row">
                <div className="auth-field">
                  <label htmlFor="e-grade">پایه</label>
                  <select id="e-grade" className="auth-select" value={grade} onChange={(e) => setGrade(e.target.value as Grade)}>
                    {(Object.keys(GRADE_NAMES) as Grade[]).map((g) => <option key={g} value={g}>{GRADE_NAMES[g]}</option>)}
                  </select>
                </div>
                <div className="auth-field">
                  <label htmlFor="e-field">رشته</label>
                  <select id="e-field" className="auth-select" value={field} onChange={(e) => setField(e.target.value as Field)}>
                    {(Object.keys(FIELD_NAMES) as Field[]).map((f) => <option key={f} value={f}>{FIELD_NAMES[f]}</option>)}
                  </select>
                </div>
              </div>
              <div className="acc-actions">
                <button type="submit" className="auth-btn">ذخیره</button>
                <button type="button" className="auth-btn secondary" onClick={() => { setEditing(false); setName(user.name); setGrade(user.grade); setField(user.field); }}>
                  انصراف
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="acc-section">
          <h2>تغییر رمز عبور</h2>
          {!showPass ? (
            <button type="button" className="auth-btn secondary" onClick={() => { setMsg(null); setShowPass(true); }}>
              تغییر رمز عبور
            </button>
          ) : (
            <form onSubmit={savePassword} noValidate>
              <PasswordField id="old" label="رمز فعلی" value={oldPass} onChange={setOldPass} autoComplete="current-password" />
              <PasswordField id="new" label="رمز جدید (حداقل ۶ کاراکتر)" value={newPass} onChange={setNewPass} autoComplete="new-password" />
              <div className="acc-actions">
                <button type="submit" className="auth-btn">ثبت رمز جدید</button>
                <button type="button" className="auth-btn secondary" onClick={() => setShowPass(false)}>انصراف</button>
              </div>
            </form>
          )}
        </div>

        <div className="acc-section">
          <div className="acc-actions">
            <button type="button" className="auth-btn secondary" onClick={handleLogout}>خروج از حساب</button>
            <button type="button" className="auth-btn danger" onClick={handleDelete}>حذف حساب</button>
          </div>
        </div>
      </div>
    </div>
  );
}
