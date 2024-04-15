import React, { useState,useEffect } from "react";
import { fetchImages } from "../utils/horseImagesUtils";
import axios from "axios";

export function useBarbers() {

    const [barbers, setBarbers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`api/barbershop`)
        .then(async(res) => {
            console.log(res)
            const barbersArr = await fetchImages(res.data?.data)
            console.log('barbersArr: ', barbersArr);
            setBarbers(barbersArr)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => setLoading(false))
    }, []) 
    
    return { barbers, setBarbers, loading };
}