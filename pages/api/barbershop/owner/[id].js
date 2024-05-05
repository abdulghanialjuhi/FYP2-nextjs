// pages/api/horses/index.js

import Barberhop from "../../../../models/Barberhop";
import User from "../../../../models/User";
import dbConnect from "../../../../utils/dbConnect";
// import verifyToken from "../../../utils/verifyToken";

export default async function handler(req, res) {
  await dbConnect();

  const handleRequest = async (req, res) => {
    const { method } = req;
    const { id } = req.query;
    switch (method) {
        case "GET":
            try {
                // const barber = await Barberhop.findOne({_id: id});
                const barber = await Barberhop.findOne({owner: id}).populate('owner').exec();

                if (!barber) {
                    return res.status(404).json({ success: false, error: 'barbershop not found' });
                }

                res.status(200).json({ success: true, data: barber });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
        break;
        case "PUT":
            // const { id } = req.query;

            try {
                const barbershop = await Barberhop.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!barbershop) {
                    return res.status(404).json({ success: false });
                }
                res.status(200).json({ success: true, data: barbershop });
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
