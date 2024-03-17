// pages/api/auth/login.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie'
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === 'POST') {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: 'User does not exist.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials.' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
      res.setHeader('set-cookie',  cookie.serialize('user-session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/',
      }))
      // res.status(200).json({ success: true, token });
      res.json({auth: true, user: {...user._doc}})
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
