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
            const horses = await Barberhop.find(query);

            const combinedHorses = await Promise.all(horses.map(async (horse) => {
                const user = await User.findById(horse.userID); 
                const horseCopy = {...horse._doc}
                horseCopy['user'] = user
                return horseCopy ;
            }));
            

            res.status(200).json({ success: true, data: combinedHorses });
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
