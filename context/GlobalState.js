import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

export const Context = createContext({})

export default function GlobalState() {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
    const [isAuth, setIsAuth] = useState(false)
    const [notificationStatus, setNotificationStatus] = useState([]);

    const addNewNotifcation = (message, type, timeremaining = 4) => {
        setNotificationStatus(prev => [...prev, { message, type, timeremaining }])
    }

    const actions = (action) => {
        const { type, payload } = action;

        switch (type) {
            case "SET_LOADING":
                return setLoading(payload)
            case "SET_USER":
                return setUser(payload)
            case "SET_IS_AUTH":
                return setIsAuth(payload)
            case "SET_NOTIFCATION_STATUS":
                return setNotificationStatus(payload)
            default:
                return loading;
        }
    };

    // useEffect(() => {
    //     axios.get('/api/auth/is-user-auth', {withCredentials: true})
    //     .then(async(res) => {
    //         if (res.data.auth) {
    //             if (res.data.user.profilePic) {
    //                 try {
    //                     const response = await axios.get(`/api/images/${res.data.user.profilePic}`, { responseType: 'arraybuffer' })
    //                     const contentType = response.headers['content-type'];
    //                     const blob = new Blob([response.data], { type: contentType });
    //                     res.data.user['profileImg'] = blob
    //                 } catch (err) {
    //                     console.log('error: ', err);
    //                 } finally {
    //                     setUser(res.data.user)
    //                 }
    //             } else {
    //                 setUser(res.data.user)
    //             }
    //         }
    //         setIsAuth(res.data.auth)
    //         console.log(res);
    //     }).catch((err) => {
    //         setUser({})
    //         setIsAuth(false)
    //         console.log(err);
    //     }).finally(() => {
    //         setLoading(false)
    //     })
    // }, [])

    return { actions, addNewNotifcation, loading, user, isAuth, notificationStatus }
}

