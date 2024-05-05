import React, { useContext, useEffect, useState } from 'react'
import { AsideComponent } from '../../profile'
import axios from 'axios'
import { Context } from '../../../../context/GlobalState'
import StyledTable from '../../../common/StyledTable'
import { useBarber } from '../../../../hooks/useBarberByOwner'
import Modal from '../../../common/Modal'
import AnimatedInput from '../../../common/StyledInput'
import { processImgeObj } from '../../../../utils/horseImagesUtils'
import AlertModal from '../../../common/Alertmodal'
import { SectionLoadingIndicator } from '../../../common/LoadingIndicator'


export default function Barbers() {

    const [editModal, setEditModal] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [delModal, setDelModal] = useState(false)
    const [delBtnLoading, setDelBtnLoading] = useState(false)
    const [deletedBarber, setDeletedBarber] = useState(false)
    const [editedBarber, setEditedBarber] = useState({})

    const { user, addNewNotifcation } = useContext(Context)
    const { barber, setBarber, loading, error } = useBarber(user._id)

    // console.log('barber: ', barber);

    // useEffect(() => console.log(editedBarber),[editedBarber])

    const handleEditBarber = (id) => {
        setEditedBarber(barber?.barbers?.find(item => item._id === id))
        setEditModal(true)
    }

    const handleDeleteBarber = (id) => {
        setDeletedBarber(id)
        setDelModal(true)
    }

    const handleDelete = () => {
        console.log('deletedBarber: ', deletedBarber);

        setDelBtnLoading(true)

        const newData = {
            barbers: barber.barbers.filter((item) => item._id !== deletedBarber).map((item) => ({...item, photo: item.photo?.id})),
        }

        console.log('newData: ', newData);

        axios.put(`/api/barbershop/${barber._id}`, newData)
        .then(async (res) => {
            console.log('res: ', res);
            const barbersPromises = res.data.data.barbers?.map((barber) => {
                return processImgeObj(barber, 'photo');
            });
            const barbersFixed = await Promise.all(barbersPromises)
            console.log('barbersFixed: ', barbersFixed);
            setBarber(prev => ({...prev, barbers: barbersFixed}));
            addNewNotifcation('Barber updated successfully', 'success')
            setDelModal(false)
        }).catch((error) => {
            console.log('error: ', error);
        }).finally(() => {
            setDelBtnLoading(false)
        })
    }

    const tableOptions = [
        {'name': 'Edit', 'icon': 'fa fa-edit', 'onclick': handleEditBarber},
        {'name': 'Remove', 'icon': 'fa fa-trash', 'onclick': handleDeleteBarber}
    ]

    const columns = [
        { field: 'photo', headerName: 'Photo'},
        { field: 'name', headerName: 'Name'}
    ]

    return (
        <div className='flex flex-grow'>
            <AsideComponent />
            <div className='flex flex-grow p-2'>
                {loading ? (
                    <SectionLoadingIndicator />
                ) : error ? (
                    <div className="flex flex-grow items-center justify-center">
                        <h2> Something went wrong </h2>
                    </div>
                ) : (
                    <>
                    {/* delete barber modal */}
                    <AlertModal openModal={delModal} setopenModal={setDelModal} onDelete={handleDelete} loading={delBtnLoading} />

                    <div className='flex flex-grow flex-col px-3 mt-3'>
                        <div className='flex w-full my-3  justify-between items-center'>
                            <h4 className='text-lg'> barbers </h4>
                            <div className='max-w-[200px]'>
                                <button onClick={() => setAddModal(true)} className='primary-button'> Add new barber </button>
                            </div>
                        </div>
                        <StyledTable columns={columns} data={barber.barbers} options={tableOptions} />
                    </div>

                    {editModal && <EditBarberModal setBarber={setBarber} barber={barber} editedBarber={editedBarber} setEditModal={setEditModal} editModal={editModal} />}
                    {addModal && <AddBarberModal setBarber={setBarber} barber={barber} setAddModal={setAddModal} addModal={addModal} />}
                    </>
                )}
            </div>
        </div>
    )
}


const AddBarberModal = ({ addModal, setAddModal, barber, setBarber }) => {

    const [profile, setProfile] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const [name, setName] = useState('');

    const { addNewNotifcation } = useContext(Context)

    const uploadProfile = (e) => {
        setProfile(e.target.files[0]);
    }

    const handleUpdateBarbe = async () => {
        console.log(barber.barbers);
        // return
        if (!name) {
            return addNewNotifcation('Please fill in all fields', 'warning')
        }

        const newBarber = {
            name: name,
            photo: null
        }

        setBtnLoading(true)

        if (profile) {
            let fd = new FormData()
            fd.append('image', profile)

            try {
                const imgRes = await axios.post(`/api/images`, fd, {headers: { "Content-Type": "multipart/form-data" }})
                console.log('imgRes: ', imgRes);
                newBarber.photo = imgRes.data.imageId
            } catch (error) {
                console.log('error: ', error);
            }
        } 

        const newData = {
            barbers: [
                ...barber.barbers.map((item) => ({...item, photo: item.photo?.id})),
                newBarber
            ]
        }

        console.log('newData: ', newData);

        axios.put(`/api/barbershop/${barber._id}`, newData)
        .then(async (res) => {
            console.log('res: ', res);
            const barbersPromises = res.data.data.barbers?.map((barber) => {
                return processImgeObj(barber, 'photo');
            });
            const barbersFixed = await Promise.all(barbersPromises)
            console.log('barbersFixed: ', barbersFixed);
            setBarber(prev => ({...prev, barbers: barbersFixed}));
            addNewNotifcation('Barber updated successfully', 'success')
            setAddModal(false)
        }).catch((error) => {
            console.log('error: ', error);
        }).finally(() => {
            setBtnLoading(false)
        })
    }

    return (
        <div>
            <Modal $isOpen={addModal} setOpenModal={setAddModal} >
                <Modal.Header>
                    Add New Barber
                </Modal.Header>
                <Modal.Body>
                    <ul className='flex flex-col w-full my-4'>
                        <li className='flex w-full gap-4 flex-wrap'>
                            <div className='mb-4'>
                                <div className='wrap-custom-file'>
                                    <input
                                        type="file"
                                        id="image1"
                                        accept="image/png, image/gif, image/jpeg"
                                        onChange={uploadProfile}
                                    />
                                    <label
                                        style={
                                            profile !== null
                                                ? {
                                                    backgroundImage: `url(${URL.createObjectURL(
                                                        profile
                                                    )})`,
                                                }
                                                : undefined
                                        }
                                        htmlFor="image1"
                                    >
                                        <span>
                                            <i className="fa fa-upload"></i> Upload Photo{" "}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </li>

                        <li className='flex w-full'> 
                            <AnimatedInput placeholderName='Name' type="text" name="name" className='input-primary' value={name} onChange={(e) => setName(e.target.value)} />
                        </li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                <div className="flex  justify-end">
                    <div className="w-[40%] flex gap-2">
                        <button onClick={() => setAddModal(false)} className="seconday-button"> Cancel </button>
                        <button disabled={btnLoading} onClick={handleUpdateBarbe} className="primary-button"> Add </button>
                    </div>
                </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const EditBarberModal = ({ barber, editedBarber, editModal, setEditModal, setBarber }) => {

    const [profile, setProfile] = useState(null);
    const [newProfile, setNewProfile] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const [name, setName] = useState('');

    const { addNewNotifcation } = useContext(Context)


    useEffect(() => {
        // console.log('editedBarber: ', editedBarber);
        if (!editedBarber) return
        setName(editedBarber?.name)

        if (editedBarber?.photo){
            setProfile(editedBarber.photo)
        }

    }, [editedBarber])

    const uploadProfile = (e) => {
        setProfile(e.target.files[0]);
        setNewProfile(e.target.files[0]);
    }

    const handleUpdateBarbe = async () => {


        const newBarber = {
            ...editedBarber,
            name: name
        }

        // to change photo object to id if photo exist
        if (editedBarber?.photo?.blob){
            newBarber.photo = editedBarber.photo.id
        }

        setBtnLoading(true)

        if (newProfile) {
            let fd = new FormData()
            fd.append('image', profile)

            try {
                const imgRes = await axios.post(`/api/images`, fd, {headers: { "Content-Type": "multipart/form-data" }})
                console.log('imgRes: ', imgRes);
                newBarber.photo = imgRes.data.imageId
            } catch (error) {
                console.log('error: ', error);
            }
        } 

        const newData = {
            barbers: [
                ...barber.barbers.filter((item) => item._id !== editedBarber._id).map((item) => ({...item, photo: item.photo?.id})),
                newBarber
            ]
        }

        console.log('newData: ', newData);

        axios.put(`/api/barbershop/${barber._id}`, newData)
        .then((res) => {
            console.log('res: ', res);
            setBarber(prev => {
                const updatedArray = prev.barbers.map(obj => {
                    if (obj._id === editedBarber._id) {
                    return { ...obj, name: name }; 
                    }
                    return obj;
                });

                return { ...prev, barbers: updatedArray };
            });
            addNewNotifcation('Barber updated successfully', 'success')
            setEditModal(false)
        }).catch((error) => {
            console.log('error: ', error);
        }).finally(() => {
            setBtnLoading(false)
        })
    }

    return (
        <div>
            <Modal $isOpen={editModal} setOpenModal={setEditModal} >
                <Modal.Header>
                    Edit Barber
                </Modal.Header>
                <Modal.Body>
                <ul className='flex flex-col w-full my-4'>
                    <li className='flex w-full gap-4 flex-wrap'>
                        <div className='mb-4'>
                            <div className='wrap-custom-file'>
                                <input
                                    type="file"
                                    id="image1"
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={uploadProfile}
                                />
                                <label
                                    style={
                                        profile !== null
                                            ? {
                                                backgroundImage: `url(${URL.createObjectURL(
                                                    profile?.blob
                                                )})`,
                                            }
                                            : undefined
                                    }
                                    htmlFor="image1"
                                >
                                    <span>
                                        <i className="fa fa-upload"></i> Upload Photo{" "}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </li>

                    <li className='flex w-full'> 
                        <AnimatedInput placeholderName='Name' type="text" name="name" className='input-primary' value={name} onChange={(e) => setName(e.target.value)} />
                    </li>
                </ul>
                </Modal.Body>
                <Modal.Footer>
                <div className="flex  justify-end">
                    <div className="w-[40%] flex gap-2">
                        <button onClick={() => setEditModal(false)} className="seconday-button"> Cancel </button>
                        <button disabled={btnLoading} onClick={handleUpdateBarbe} className="primary-button"> Update </button>
                    </div>
                </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}