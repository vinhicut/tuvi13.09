import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';

function TopBar() {
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  const today = new Date();
  const dateStr = today
    .toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .replace(/^./, (c) => c.toUpperCase());

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tuvi_user');
      if (saved) setUser(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('tuvi_token');
    localStorage.removeItem('tuvi_user');
    setUser(null);
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <span className="weather">☀️ 35°C Hanoi</span>
          <span className="date">{dateStr}</span>
        </div>
        <div className="top-bar-right">
          {user ? (
            <>
              <span className="user-greeting">Xin chào, {user.username}</span>
              <a href="#" onClick={logout}>
                Đăng xuất
              </a>
            </>
          ) : (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setAuthOpen(true);
              }}
            >
              Sign in / Join
            </a>
          )}
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
          <div className="social-icons">
            <a href="#" title="Facebook">
              f
            </a>
            <a href="#" title="Email">
              ✉
            </a>
            <a href="#" title="YouTube">
              ▶
            </a>
          </div>
        </div>
      </div>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />
    </>
  );
}

export default TopBar;
