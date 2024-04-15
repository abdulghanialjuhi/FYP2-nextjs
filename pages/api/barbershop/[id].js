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
        case "GET":
            const { id } = req.query;

            try {
            const barber = await Barberhop.findOne({_id: id});

            const user = await User.findById(barber.owner); 
            const barberCopy = {...barber._doc}
            barberCopy['owner'] = user

            res.status(200).json({ success: true, data: barberCopy });
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
