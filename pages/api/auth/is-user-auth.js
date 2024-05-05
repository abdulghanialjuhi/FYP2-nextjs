
import jwt from 'jsonwebtoken';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    if (method === 'GET') {

        // const token = req.headers.cookie?.split('=')[1]
        const cookies = req.headers.cookie?.split('; ');
        const token = cookies?.find(cookie => cookie.startsWith('user-session'))?.split('=')[1];
        if (!token) {
            req.auth = false
        }

        try {
            const user = await jwt.verify(token, process.env.JWT_SECRET);
            const isUserExsist = await User.findOne({ _id: user?.userId });
            if (!isUserExsist) {
                res.setHeader('Set-Cookie', 'user-session=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
                req.auth = false
                return res.json({auth: req.auth, user: req.user})
            }

            req.user = {...isUserExsist._doc}
            // req.refreshToken = refreshToken
            req.auth = true
            return res.json({auth: req.auth, user: req.user})
        } catch (err) {
            // return res.status(403).json({ message: 'Invalid token' });
            res.setHeader('Set-Cookie', 'user-session=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
            req.auth = false
            return res.json({auth: req.auth, user: req.user})
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }

}
