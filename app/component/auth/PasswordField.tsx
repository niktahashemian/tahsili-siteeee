'use client';

import { useState } from 'react';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  placeholder?: string;
}

export default function PasswordField({ id, label, value, onChange, autoComplete, placeholder }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className="auth-pass">
        <input
          id={id}
          className="auth-input ltr"
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
        />
        <button type="button" className="auth-eye" onClick={() => setShow((s) => !s)} aria-label={show ? 'پنهان کردن رمز' : 'نمایش رمز'}>
          {show ? 'پنهان' : 'نمایش'}
        </button>
      </div>
    </div>
  );
}
