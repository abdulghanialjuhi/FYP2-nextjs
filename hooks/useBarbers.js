import React, { useState,useEffect } from "react";
import { fetchImages } from "../utils/horseImagesUtils";
import axios from "axios";

export function useBarbers() {

    const [barbers, setBarbers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get(`/api/barbershop`)
        .then(async(res) => {
            console.log(res)
            const barbersArr = await fetchImages(res.data?.data)
            setBarbers(barbersArr)
        })
        .catch((err) => {
            setError(err)
            console.log(err)
        })
        .finally(() => setLoading(false))
    }, []) 
    
    return { barbers, setBarbers, error, loading };
}