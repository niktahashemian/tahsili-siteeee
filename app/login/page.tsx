'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../assets/css/auth.css';
import { loginUser, useAuth } from '../lib/auth';
import PasswordField from '../component/auth/PasswordField';

export default function LoginPage() {
  const router = useRouter();
  const { user, ready } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // اگر قبلاً وارد شده، مستقیم به صفحه‌ی حساب برود
  useEffect(() => {
    if (ready && user) router.replace('/account');
  }, [ready, user, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!phone.trim() || !password) {
      setError('شماره موبایل و رمز عبور را وارد کنید.');
      return;
    }
    setLoading(true);
    const res = await loginUser(phone, password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? 'ورود ناموفق بود.');
      return;
    }
    router.push('/account');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">ورود به حساب</h1>
        <p className="auth-subtitle">برای ادامه‌ی آزمون‌ها وارد حساب خود شوید.</p>

        {error && <div className="auth-error" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
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

          <PasswordField
            id="password"
            label="رمز عبور"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
          />

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'در حال ورود…' : 'ورود'}
          </button>
        </form>

        <p className="auth-switch">
          حساب ندارید؟ <Link href="/signup">ثبت‌نام کنید</Link>
        </p>
        <p className="auth-switch" style={{ marginTop: '0.4rem' }}>
          <Link href="/">← بازگشت به صفحه‌ی اصلی</Link>
        </p>
      </div>
    </div>
  );
}
