import React, { useState,useEffect } from "react";
import { processObject } from "../utils/horseImagesUtils";
import axios from "axios";

export function useBarber(id) {

    const [barber, setBarber] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get(`/api/barbershop/${id}`)
        .then(async(res) => {
            console.log(res)
            const barberObj = await processObject(res.data?.data)
            console.log('barberObj: ', barberObj);
            setBarber(barberObj)
        })
        .catch((err) => {
            setError(err)
            console.log(err)
        })
        .finally(() => setLoading(false))
    }, []) 
    
    return { barber, setBarber, error, loading };
}