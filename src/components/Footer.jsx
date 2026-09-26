import React from 'react';

const goodPosts = [
  { title: 'Ra mắt dịch vụ luận giải Tử Vi AI', date: '09/08/2025' },
  {
    title: 'Ra mắt phần mềm Lịch Pháp – Tử Vi – Phong Thủy Bậc Đầu',
    date: '24/07/2023',
  },
  { title: 'Hóa Lộc [năm sinh] ở cung Phụ Mẫu', date: '30/11/2021' },
];

const popularPosts = [
  { title: 'CÁCH LẬP LÁ SỐ TỬ VI', date: '24/02/2020' },
  {
    title:
      'Sao Thiên Lương, Dương Lương Xương Lộc Hội, Lộ Truyền Đệ Nhất Danh',
    date: '15/02/2020',
  },
  { title: 'TẬT ÁCH CUNG NHÂN ĐÀM', date: '16/02/2020' },
];

const topics = [
  { name: 'Tử Vi', count: 280 },
  { name: 'Dịch lý', count: 144 },
  { name: 'Tử Vi - Tứ Hóa', count: 139 },
  { name: 'Tử Vi - Cung Vị', count: 100 },
  { name: 'Tứ Trụ', count: 55 },
  { name: 'Tử Vi - Cách Cục Luận', count: 43 },
  { name: 'Tạp học', count: 22 },
  { name: 'Sự kiện', count: 16 },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <h4>BÀI VIẾT HAY</h4>
          {goodPosts.map((post) => (
            <div className="footer-post" key={post.title}>
              <div className="fp-img"></div>
              <div>
                <div>{post.title}</div>
                <div className="fp-date">{post.date}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="footer-col">
          <h4>ĐƯỢC XEM NHIỀU</h4>
          {popularPosts.map((post) => (
            <div className="footer-post" key={post.title}>
              <div className="fp-img"></div>
              <div>
                <div>{post.title}</div>
                <div className="fp-date">{post.date}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="footer-col">
          <h4>CHỦ ĐỀ NỔI BẬT</h4>
          <ul className="topic-list">
            {topics.map((topic) => (
              <li key={topic.name}>
                <span>{topic.name}</span>
                <span>{topic.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-about">
          <div className="footer-logo">
            <div className="bagua small">☯</div>
            <strong>Diễn đàn TỬ VI VIỆT NAM</strong>
          </div>
          <p>
            Diễn đàn Tử Vi Việt Nam được thành lập từ năm 2010 bởi thầy Nguyễn
            Trọng Tuệ, bút danh tuetvnb, cùng đông đảo thành viên yêu thích bộ
            môn huyền học Tử Vi đẩu số. Và cùng với Câu lạc bộ Phong thủy Thăng
            Long, đây đã là nơi chia sẻ kiến thức và đàm luận về các triết lý
            Văn hoá Phương Đông của nhiều chí sỹ cả trong và ngoài nước.
          </p>
          <div className="contact-info">
            <div>
              Liên hệ: <a href="tel:0587156666">058 715 6666</a>
            </div>
            <div>info@tuvivietnam.vn</div>
          </div>
          <div className="footer-social">
            <a href="#">f</a>
            <a href="#">✉</a>
            <a href="#">▶</a>
          </div>
        </div>

        <div className="footer-links">
          <h4>LIÊN KẾT</h4>
          <div className="fb-page small">
            <div className="fb-header">
              <div className="fb-avatar logo-sm"></div>
              <div>
                <div className="fb-name">Viện Nghiên …</div>
                <div className="fb-followers">4,7K người theo dõi</div>
              </div>
            </div>
            <button className="fb-follow">f Theo dõi Trang</button>
          </div>
        </div>
      </div>

      <div className="copyright">
        © 2022 - Diễn đàn Tử Vi Việt Nam
        <div className="bottom-links">
          <a href="#">Bói Dịch PT Thăng Long</a>
          <a href="#">Bói Dịch Tử Vi Việt Nam</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
