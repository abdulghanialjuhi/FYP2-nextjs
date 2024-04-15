import mongoose from 'mongoose';

const businesHours = new mongoose.Schema({
    day: { type: String, required: true },
    openTime: { 
        type: String, 
        required: function() {
            return this.isOpen === true;
        }
    },
    closeTime: { 
        type: String, 
        required: function() {
            return this.isOpen === true;
        }
    },
    isOpen: { type: Boolean, required: true }
})

const serviceHoursSchema = new mongoose.Schema({
    service: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
})

const barbersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Image' },
    rate: {Type: Number }
})

const barbershopSchem = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     default: () => new mongoose.Types.ObjectId().toString(),
    // },
    id: mongoose.Schema.Types.ObjectId,
    city: { type: String, required: true },
    state: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    businesHours: [businesHours],
    services: [serviceHoursSchema],
    barbers: [barbersSchema],
    coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere', // Create a 2dsphere index for geospatial queries
        required: true
    },
    barbershopRate: {Type: Number },
    createdAt: { type: Date, default: Date.now },
    images: [String],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Barbershop || mongoose.model('Barbershop', barbershopSchem);
