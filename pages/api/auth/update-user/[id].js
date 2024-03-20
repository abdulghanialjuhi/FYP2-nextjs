import bcrypt from "bcryptjs"; // Make sure to install bcryptjs
import verifyToken from "../../../../utils/verifyToken";
import dbConnect from '../../../../utils/dbConnect';
import User from "../../../../models/User";

export default async function handler(req, res) {
    await dbConnect();

    const handleRequest = async (req, res) => {

        const {
            query: { id },
            method,
        } = req;

        if (method !== 'PUT') {
            return res.status(404).send('mothod not found')
        }

        if (req.body.password) {
            try {
    
                // check user
                const isUser = await User.findOne({_id: id})
                if (!isUser) {
                  return res.status(404).send('user not found')
                }
    
                // check old password
                const comparePassword = await bcrypt.compare(req.body.oldPassword, isUser.password);
                if(!comparePassword) {
                    return res.status(403).send('Password not match')
                }
    
                // Hash the new password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
                // Update the user with the new hashed password
                const user = await User.findByIdAndUpdate(
                    id,
                    { $set: { password: hashedPassword } }, // Update the password field
                    { new: true, runValidators: true }
                );
    
                if (!user) {
                    return res.status(404).json({ success: false });
                }
    
                // Respond without returning the new password
                const userResponse = { ...user._doc };
                delete userResponse.password;
                res.status(200).json({ success: true, data: userResponse });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
        } else {
            try {
                const user = await User.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!user) {
                    return res.status(404).json({ success: false });
                }
                res.status(200).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
        }
    
    }

    return verifyToken(req, res, () => handleRequest(req, res));

}