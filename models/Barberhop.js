import mongoose from 'mongoose';

const barbershopSchem = new mongoose.Schema({
    _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere', // Create a 2dsphere index for geospatial queries
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    images: [String],
}, { timestamps: true });

export default mongoose.models.Barbershop || mongoose.model('Barbershop', barbershopSchem);
