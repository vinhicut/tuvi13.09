import React from 'react';

function Header({ onNavigate }) {
  const handleLaSo = (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate('laso');
  };

  const handleBoiKieu = (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate('boikieu');
  };

  return (
    <header className="header">
      <div className="header-left">
        <div
          className="logo"
          onClick={() => onNavigate && onNavigate('article')}
          style={{ cursor: 'pointer' }}
        >
          <div className="bagua">
            <div className="bagua-inner">☯</div>
          </div>
          <div className="logo-text">
            <div className="logo-title">Diễn đàn</div>
            <div className="logo-main">TỬ VI VIỆT NAM</div>
            <div className="logo-url">http://www.tuvivietnam.vn</div>
          </div>
        </div>
      </div>
      <div className="header-right">
        <div className="seal">
          <div className="seal-text">
            紫微
            <br />
            越南
          </div>
        </div>
        <div className="header-buttons">
          <button type="button">Phong Thủy</button>
          <button type="button">Kỳ Môn</button>
          <button type="button">Lịch Vạn Sự</button>
          <button type="button" onClick={handleLaSo}>
            Lá Số Tử Vi
          </button>
          <button type="button" onClick={handleBoiKieu}>
            Bói Kiều
          </button>
          <button type="button">Tứ Trụ</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
