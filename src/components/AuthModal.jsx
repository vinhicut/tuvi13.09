import React, { useState } from 'react';
import './AuthModal.css';

const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001';

function AuthModal({ open, onClose, onAuthSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
  });

  if (!open) return null;

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url =
        tab === 'login' ? `${API}/api/auth/login` : `${API}/api/auth/register`;
      const body =
        tab === 'login'
          ? { email: form.email, password: form.password }
          : form;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Có lỗi xảy ra');

      localStorage.setItem('tuvi_token', data.token);
      localStorage.setItem('tuvi_user', JSON.stringify(data.user));
      onAuthSuccess?.(data.user);
      onClose?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose} type="button">
          ×
        </button>

        <div className="auth-tabs">
          <button
            type="button"
            className={tab === 'login' ? 'active' : ''}
            onClick={() => setTab('login')}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            className={tab === 'register' ? 'active' : ''}
            onClick={() => setTab('register')}
          >
            Đăng ký
          </button>
        </div>

        <form onSubmit={submit} className="auth-form">
          {tab === 'register' && (
            <>
              <label>
                Họ tên
                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={update}
                  placeholder="Nguyễn Văn A"
                />
              </label>
              <label>
                Username
                <input
                  name="username"
                  value={form.username}
                  onChange={update}
                  required
                  placeholder="username"
                />
              </label>
            </>
          )}

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={update}
              required
              placeholder="email@example.com"
            />
          </label>

          <label>
            Mật khẩu
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={update}
              required
              minLength={6}
              placeholder="Tối thiểu 6 ký tự"
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading
              ? 'Đang xử lý...'
              : tab === 'login'
                ? 'Đăng nhập'
                : 'Tạo tài khoản'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
