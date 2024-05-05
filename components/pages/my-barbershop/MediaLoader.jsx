import Image from "next/image";
import styled from "styled-components";
import { useContext } from "react";
import selectedFiles from "../../../utils/selectedFiles";
import { Context } from "../../../context/GlobalState";

const ImageContainer = styled.div`
    background-color: rgb(247, 247, 247);
    height: 200px;
    margin-bottom: 30px;
    position: relative;
    width: 200px;
    border-radius: 8px;
    overflow: hidden;

    & > img {
        height: 200px;
        width: 200px;
    }
`

const DeleteIcon = styled.div`
    background-color: rgb(255, 90, 95);
    cursor: pointer;
    height: 35px;
    line-height: 35px;
    position: absolute;
    right: 10px;
    text-align: center;
    top: 10px;
    width: 35px;
    border-radius: 8px;
    color: #fff;
`

const PrifileUpload = styled.div`
    width: 100%;
    background-color: rgb(247, 247, 247);
    height: 223px;
    margin-bottom: 30px;
    text-align: center;
    position: relative;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(235, 235, 235);
    border-image: initial;
    border-radius: 8px;
    
`

const UploadInput = styled.input`
    font-size: 100px;
    position: absolute;
    left: 0px;
    top: 0px;
    opacity: 0;
    z-index: 1;
    height: 100%;
    cursor: pointer;
    width: 100%;
`

const InputIcon = styled.div`
    color: gray;
    font-size: 48px;
    margin-top: 50px;
    transform: rotate(180deg);
`

const UploadText = styled.p`
    font-size: 22px;
    // font-family: Georgia;
    color: gray;
    font-weight: 400;
    line-height: 1.2;
    margin-bottom: 0px;
    position: relative;
`

function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000000); // Adjust the range as needed
    const uniqueId = `${timestamp}_${randomNum}`;
    return uniqueId;
}




const MediaUploader = ({ selectedImgs, setSelectedImgs, blob=false }) => {

    const { addNewNotifcation } = useContext(Context)

    // multiple image select
    const multipleImage = (e) => {
        // checking is same file matched with old stored array
        const isExist = selectedImgs?.some((file1) =>
        selectedFiles(e)?.some((file2) => file1.name === file2.name)
        );


        if (!isExist) {
            const selectedFilesArr = [...selectedFiles(e)]
            const fileId = []
            selectedFilesArr.forEach((file) => {
            const obj = {
                id: generateUniqueId(),
                blob: file,
                new: true
            }
            fileId.push(obj)
            })
            setSelectedImgs((old) => [...old, ...fileId]);
        } else {
            addNewNotifcation("You have selected this image already", "warning")
        }
    };

    // delete image
    const deleteImage = (id) => {
        const deleted = selectedImgs?.filter((file) => file.id !== id);
        setSelectedImgs(deleted);
    };

  
    return (
        <div className="flex w-full flex-col">
            <div className="flex w-full">
                <ul className="mb-0 flex gap-3 w-full">
                {selectedImgs.length > 0
                    ? selectedImgs?.map((item, index) => (
                        <li key={index} className="flex">
                        <ImageContainer>
                            <Image
                            width={200}
                            height={200}
                            className="img-fluid cover"
                            src={blob ? URL.createObjectURL(item.blob) : URL.createObjectURL(item)}
                            alt="fp1.jpg"
                            />
                            <DeleteIcon
                            onClick={deleteImage.bind(this, item.id)}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Delete"
                            data-original-title="Delete"
                            >
                            {/* <a onClick={() => deleteImage(item.name)}> */}
                                <span className="fa fa-trash"></span>
                            {/* </a> */}
                            </DeleteIcon>
                        </ImageContainer>
                        </li>
                    ))
                    : undefined}

                {/* End li */}
                </ul>
            </div>
            {/* End .col */}

            <div className="flex w-full">
                <PrifileUpload>
                    <UploadInput
                        type="file"
                        onChange={multipleImage}
                        multiple
                        accept="image/png, image/gif, image/jpeg"
                    />
                    <InputIcon>
                        <span className="fa fa-download"></span>
                    </InputIcon>
                    <UploadText>Drag and drop images here</UploadText>
                </PrifileUpload>
            </div>
            {/* End .col */}
        </div>
  );
};

export default MediaUploader;
