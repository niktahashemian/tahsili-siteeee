'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../assets/css/auth.css';
import { registerUser, useAuth, FIELD_NAMES, GRADE_NAMES, type Field, type Grade } from '../lib/auth';
import PasswordField from '../component/auth/PasswordField';

export default function SignupPage() {
  const router = useRouter();
  const { user, ready } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [grade, setGrade] = useState<Grade>('yazdahom');
  const [field, setField] = useState<Field>('tajrobi');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && user) router.replace('/account');
  }, [ready, user, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('رمز عبور و تکرار آن یکسان نیستند.');
      return;
    }
    setLoading(true);
    const res = await registerUser({ name, phone, password, grade, field });
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? 'ثبت‌نام ناموفق بود.');
      return;
    }
    router.push('/account');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">ثبت‌نام</h1>
        <p className="auth-subtitle">حساب بسازید و پایه و رشته‌ی خود را انتخاب کنید.</p>

        {error && <div className="auth-error" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="name">نام و نام خانوادگی</label>
            <input
              id="name"
              className="auth-input"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="phone">شماره موبایل</label>
            <input
              id="phone"
              className="auth-input ltr"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="09123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="grade">پایه</label>
              <select id="grade" className="auth-select" value={grade} onChange={(e) => setGrade(e.target.value as Grade)}>
                {(Object.keys(GRADE_NAMES) as Grade[]).map((g) => (
                  <option key={g} value={g}>{GRADE_NAMES[g]}</option>
                ))}
              </select>
            </div>
            <div className="auth-field">
              <label htmlFor="field">رشته</label>
              <select id="field" className="auth-select" value={field} onChange={(e) => setField(e.target.value as Field)}>
                {(Object.keys(FIELD_NAMES) as Field[]).map((f) => (
                  <option key={f} value={f}>{FIELD_NAMES[f]}</option>
                ))}
              </select>
            </div>
          </div>

          <PasswordField id="password" label="رمز عبور (حداقل ۶ کاراکتر)" value={password} onChange={setPassword} autoComplete="new-password" />
          <PasswordField id="confirm" label="تکرار رمز عبور" value={confirm} onChange={setConfirm} autoComplete="new-password" />

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'در حال ساخت حساب…' : 'ساخت حساب'}
          </button>
        </form>

        <p className="auth-switch">
          قبلاً ثبت‌نام کرده‌اید؟ <Link href="/login">وارد شوید</Link>
        </p>
        <p className="auth-note">اطلاعات حساب فعلاً فقط روی همین مرورگر ذخیره می‌شود.</p>
      </div>
    </div>
  );
}
