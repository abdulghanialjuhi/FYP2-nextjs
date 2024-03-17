
import jwt from 'jsonwebtoken';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    if (method === 'GET') {

        const token = req.headers.cookie?.split('=')[1]
        if (!token) {
            req.auth = false
        }

        jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
            try {
                console.log('user: ', user);
                console.log('err: ', error?.message);
                const isUserExsist = await User.findOne({ _id: user?.userId });

                if (error || !isUserExsist) {
                    res.setHeader('Set-Cookie', 'user-session=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
                    req.auth = false
                    return res.json({auth: req.auth, user: req.user})
                }
                // const refreshToken = generateAccessToken(user.email)
                req.user = {...isUserExsist._doc}
                // req.refreshToken = refreshToken
                req.auth = true
                return res.json({auth: req.auth, user: req.user})
            } catch (error) {
                console.log('error: ', error);
                return res.json({auth: false})
            }

        })

        // res.status(500).json({ auth: false, message: 'Internal server error' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }

}
