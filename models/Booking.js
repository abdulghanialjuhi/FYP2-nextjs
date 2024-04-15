import mongoose from 'mongoose';

const bookingSchem = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: { type: String, required: true },
    service: { type: Object, required: true },
    barber: { type: mongoose.Schema.Types.ObjectId, required: true },
    barbershop: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barbershop', 
        required: true 
    },
    date: {Type: Date, required: true},
    date: {Type: String, required: true},
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Barbershop || mongoose.model('Booking', bookingSchem);
