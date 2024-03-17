import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie'
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect'

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === 'POST') {
    try {
      const { email, password, fullName, phoneNumber, profilePic } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
      }
      const existingUser = await User.findOne({ email });
      console.log('existingUser: ', existingUser);
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'User already exists.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashedPassword,
        fullName,
        phoneNumber,
        profilePic
      });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
      // res.cookie('user-session', token, cookieObj);
      res.setHeader('set-cookie',  cookie.serialize('user-session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/',
      }))
      res.status(201).json({ success: true, token, user });
    } catch (error) {
      console.log('error: ', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
