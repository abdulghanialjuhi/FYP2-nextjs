

// pages/api/horses/index.js

import Barberhop from "../../../../models/Barberhop";
import dbConnect from "../../../../utils/dbConnect";
// import verifyToken from "../../../utils/verifyToken";

export default async function handler(req, res) {
  await dbConnect();

  const handleRequest = async (req, res) => {
    const { method } = req;
    if (method !== 'GET') {
      return res.status(504).send('Mothod not allowed')
    }

    try {
        const { latitude, longitude, maxDistance } = req.query;
        // console.log('ss: ', latitude, longitude, maxDistance);

        const locations = await Barberhop.find({
          coordinates: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
              },
              $maxDistance: parseInt(maxDistance) // in meters
            }
          }
        }).populate('owner');
        // console.log('locations: ', locations);
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

  };
  handleRequest(req, res);
}

