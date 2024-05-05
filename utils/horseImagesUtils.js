import axios from 'axios'


export const getHorseImages = async (photos) => {
    const imgPromises = []
    const results = []
    for (const img of photos) {
        const promise = axios.get(`/api/images/${img}`)
        imgPromises.push(promise)
    }

    const responses = await Promise.all(imgPromises)
    responses.forEach((img) => {
        results.push(img.data)
    })

    return results
}

export const fetchImageById = async (photoId) => {
    try {
        const response = await axios.get(`/api/images/${photoId}`, { responseType: 'arraybuffer' })
        const contentType = response.headers['content-type'];
        const blob = new Blob([response.data], { type: contentType });

        const imgObj = {
            id: photoId,
            blob: blob
        }
        return imgObj
    } catch (error) {
        console.error(`Error fetching image for photo ID ${photoId}:`, error.message);
        return null;
    }
};


export const processObjectImgUpdate = async (obj) => {
    const photosArray = obj.photos || [];
      
    let userProfilePromise = null;
    if (obj.user.profilePic) {
        userProfilePromise = fetchImageById(obj.user.profilePic);
    }
    const imagePromises = photosArray.map((photo) => {
        return fetchImageById(photo);
    });
    
    const [imagesArray, userProfile] = await Promise.all([
        Promise.all([...imagePromises]),
        userProfilePromise
    ]);

    const resultObj = { ...obj, images: imagesArray, user: {...obj.user}}
    if (userProfile) {
        resultObj['user']['profile'] = userProfile.blob
    }
    return resultObj
};

export const processObject = async (obj) => {
    const photosArray = obj.images || [];
      
    let userProfilePromise = null;
    if (obj.owner?.profilePic) {
        userProfilePromise = fetchImageById(obj.owner.profilePic);
    }
    const imagePromises = photosArray.map((photo) => {
        return fetchImageById(photo);
    });

    const barbersPromises = obj.barbers?.map((barber) => {
        return processImgeObj(barber, 'photo');
    });


    
    const [imagesArray, barbersResponse, userProfile] = await Promise.all([
        Promise.all([...imagePromises]),
        Promise.all([...barbersPromises]),
        userProfilePromise,
    ]);

    const resultObj = { ...obj, images: imagesArray, barbers: barbersResponse, owner: {...obj.owner}}
    if (userProfile) {
        resultObj['owner']['profile'] = userProfile
    }
    return resultObj
};


export const processImgeObj = async (obj, field) => {
    const photo = obj[field] || null;
    if (!photo) {
        return { ...obj, [field]: null }
    }
    const image = await fetchImageById(photo);

    const resultObj = { ...obj, [field]: image }
    return resultObj
};


export const fetchImages = async (dataArray) => {

    const processedDataArray = await Promise.all(dataArray.map(processObject));
  
    return processedDataArray;
};

  