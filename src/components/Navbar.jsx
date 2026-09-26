import React from 'react';

const softwareItems = [
  { icon: '🤖', label: 'Luận Giải Tử Vi AI', href: '#', view: null },
  { icon: '🌐', label: 'Lá Số Tử Vi', href: '#', view: 'laso' },
  { icon: '🏠', label: 'La Kinh Phong Thủy', href: '#', view: null },
  { icon: '☯️', label: 'Bói Dịch Tử Vi Việt Nam', href: '#', view: null },
  { icon: '🎩', label: 'Bói Quẻ Kiều', href: '#', view: 'boikieu' },
  { icon: '🔄', label: 'Bói Dịch PT Thăng Long', href: '#', view: null },
  { icon: '📅', label: 'Lịch Vạn Sự', href: '#', view: null },
  { icon: '🧭', label: 'Lục Nhâm Đại Độn', href: '#', view: null },
  { icon: '🚩', label: 'Kỳ Môn Độn Giáp', href: '#', view: null },
];

function Navbar({ onNavigate, currentView }) {
  const handleClick = (e, item) => {
    e.preventDefault();
    if (item.view && onNavigate) {
      onNavigate(item.view);
    }
  };

  const goHome = (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate('article');
  };

  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li>
          <a href="#" onClick={goHome}>
            <span className="home-icon">🏠</span> TRANG CHỦ ▾
          </a>
        </li>
        <li>
          <a href="#">CHUYÊN MỤC ▾</a>
        </li>
        <li className="has-dropdown">
          <a href="#">PHẦN MỀM ▾</a>
          <ul className="dropdown-menu">
            {softwareItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item)}
                  className={currentView === item.view ? 'active' : ''}
                >
                  <span className="dd-icon">{item.icon}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <a href="#">SẢN PHẨM</a>
        </li>
        <li>
          <a href="#">KHOÁ HỌC</a>
        </li>
        <li>
          <a href="#">DIỄN ĐÀN ▾</a>
        </li>
        <li>
          <a href="#">LIÊN HỆ</a>
        </li>
      </ul>
      <div className="search-icon">🔍</div>
    </nav>
  );
}

export default Navbar;
