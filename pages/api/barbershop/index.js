// pages/api/horses/index.js

import Barberhop from "../../../models/Barberhop";
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
// import verifyToken from "../../../utils/verifyToken";

export default async function handler(req, res) {
  await dbConnect();

  const handleRequest = async (req, res) => {
    const { method } = req;
    switch (method) {
        case "POST":
            try {
                const barber = await Barberhop.create(req.body);
                res.status(201).json({ success: true, data: barber });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
        break;
        case "GET":
            const { name, city, state, gender, userID } =
            req.query;
            let query = {};

            if (userID) query.userID = userID;

            if (name) query.name = name;
            if (city) query.city = city;
            if (state) query.state = state;
            if (gender) query.gender = gender;

            try {
            const barbers = await Barberhop.find(query).populate('owner').exec();

            // const combinedBarbers = await Promise.all(barbers.map(async (barber) => {
            //     const user = await User.findById(barber.owner); 
            //     const barberCopy = {...barber._doc}
            //     barberCopy['owner'] = user
            //     return barberCopy ;
            // }));
            

            res.status(200).json({ success: true, data: combinedBarbers });
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
