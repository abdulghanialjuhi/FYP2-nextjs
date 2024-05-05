import Booking from "../../../models/Booking";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const handleRequest = async (req, res) => {
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                // create js function that check if barber is booked within barbershop, the function check for pending status only and takes barbershop id, barber id and startDate with this format '2024-04-26T18:32:59.411Z' and the duration is taken from the server object inside the barbershop document to determine the endTime
                const { status, service, barber, date, time, user, isDeleted, barbershop } =
                req.query;
                let query = {};
    
                if (user) query.user = user;
                if (status) query.status = status;
                if (service) query.service = service;
                if (barber) query.barber = barber;
                if (date) query.date = date;
                if (time) query.time = time;
                if (isDeleted) query.isDeleted = isDeleted;
                if (barbershop) query.barbershop = barbershop;

                // const barber = await Barberhop.findOne({_id: id});
                const booking = await Booking.find(query).populate('barbershop').exec();

                res.status(200).json({ success: true, data: booking });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
        break;
        case "PUT":
            const { id } = req.query
            try {
                const booking = await Booking.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!booking) {
                    return res.status(404).json({ success: false });
                }
                res.status(200).json({ success: true, data: booking });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
        break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
  };
  handleRequest(req, res);
}
