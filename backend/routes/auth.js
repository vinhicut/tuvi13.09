import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = Router();

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '7d' }
  );
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, full_name } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Thiếu username, email hoặc password' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Mật khẩu tối thiểu 6 ký tự' });
    }

    const [exists] = await pool.query(
      'SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1',
      [email, username]
    );
    if (exists.length) {
      return res.status(409).json({ message: 'Email hoặc username đã tồn tại' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password_hash, full_name) VALUES (?, ?, ?, ?)',
      [username, email, password_hash, full_name || null]
    );

    const user = {
      id: result.insertId,
      username,
      email,
      full_name: full_name || null,
    };
    const token = signToken(user);

    res.status(201).json({ message: 'Đăng ký thành công', token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Thiếu email hoặc password' });
    }

    const [rows] = await pool.query(
      'SELECT id, username, email, password_hash, full_name FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    if (!rows.length) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
    };
    const token = signToken(payload);

    res.json({ message: 'Đăng nhập thành công', token, user: payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Chưa đăng nhập' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await pool.query(
      'SELECT id, username, email, full_name, created_at FROM users WHERE id = ? LIMIT 1',
      [decoded.id]
    );
    if (!rows.length) return res.status(404).json({ message: 'Không tìm thấy user' });

    res.json({ user: rows[0] });
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
});

export default router;
