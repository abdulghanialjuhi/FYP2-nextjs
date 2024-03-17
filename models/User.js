// models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: String,
    phoneNumber: String,
    createdAt: { type: Date, default: Date.now },
    profilePic: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
