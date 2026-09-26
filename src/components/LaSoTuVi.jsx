import React, { useEffect, useRef } from 'react';
import './LaSoTuVi.css';

/**
 * Trang Lá Số Tử Vi Đẩu Số
 * Sử dụng iframe để giữ nguyên 100% logic + giao diện gốc.
 * Có thể thay bằng component thuần React sau khi refactor engine.
 */
function LaSoTuVi() {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Scroll to top when entering this view
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="laso-page">
      <div className="laso-breadcrumb">
        Home › Phần mềm › Lá Số Tử Vi
      </div>
      <div className="laso-iframe-wrap">
        <iframe
          ref={iframeRef}
          src="/laso-tuvi.html"
          title="Lá Số Tử Vi Đẩu Số"
          className="laso-iframe"
        />
      </div>
    </div>
  );
}

export default LaSoTuVi;
