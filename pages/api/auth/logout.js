

export default async function handler(req, res) {

    if (req.method !== 'GET') return res.status(405).json({ status: 'fail', message: 'Method not allowed here!' });

    try {
        res.setHeader('Set-Cookie', 'user-session=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
        // return res.status(200).json('Logged out successfully')
        res.writeHead(302, { Location: '/login' });
        res.end();
        return;
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: `Bad request happened! ${error.message}` });
    }
}