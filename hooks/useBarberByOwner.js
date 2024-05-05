import { useState,useEffect } from "react";
import { processObject } from "../utils/horseImagesUtils";
import axios from "axios";

export function useBarber(id) {

    const [barber, setBarber] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get(`/api/barbershop/owner/${id}`)
        .then(async(res) => {
            console.log(res)
            const barber = await processObject(res.data?.data)
            setBarber(barber)
        })
        .catch((err) => {
            setError(err)
            console.log(err)
        })
        .finally(() => setLoading(false))
    }, []) 
    
    return { barber, setBarber, loading, error };
}