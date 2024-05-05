import { styled } from "styled-components";
import { BtnLoadingIndicator } from "./LoadingIndicator";



const Modalbackground = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    justify-content: center;
    z-index: 1000;
    overflow: hidden;
`

const Modalcontainer = styled.div`
    width: 450px;
    height: 200px;
    border-radius: 12px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
    padding: 20px;
`

const CloseBtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Closebtn = styled.button`
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
`

const TitleCointaier = styled.div`
    display: inline-block;
    text-align: center;
    margin-top: 10px;
`

const MassageContainer = styled.div`
    height : 25px;
    whidth: 100%
    flex: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    text-align: center;
`

const BtnContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    align-items: center;
    margin-top:auto;
`

const Canclebtn = styled.button`
    background-color: white;
    color: black;
    font-weight: bold;
    border-radius: 25px;
    font-size: 15px;
    border: 1px solid rgb(185, 185, 185);
    cursor: pointer;
    padding: 10px 15px;
    &:hover {
        background-color: #e5e5e5;
    }
`

const PrementDeleteBtn = styled.button`
    min-width: 170px;
    border: none;
    color: white;
    background-color: var(--primary-color);
    &:hover {
        background-color: var(--primary-color-hover);
    }
    border-radius: 25px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    padding: 10px 15px;
`

export default function AlertModal({ openModal, setopenModal, onDelete, loading=false }) {

    const handleCloseModal = () => {
        if (loading) return
        setopenModal(false)
    }

    return (
        <>
            {openModal && (
                <Modalbackground onClick={handleCloseModal}>
                    <Modalcontainer onClick={(e)=>{e.stopPropagation()}}>
                        <CloseBtnContainer>
                            <Closebtn onClick={handleCloseModal}>
                                <i className="fa fa-close"/>
                            </Closebtn>
                        </CloseBtnContainer>
                        <TitleCointaier>
                            <h3>Are you sure you want to delete this item</h3>
                        </TitleCointaier>
                        <MassageContainer>
                            <span>Once deleted, this item will no longer be accessible.</span>
                        </MassageContainer>
                        <BtnContainer>
                            <div className="max-w-[200px] mr-3">
                                <button className="secondary-button" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                            </div>
                            <div className="max-w-[200px]">
                                <button className="primary-button" onClick={onDelete}>
                                    {loading ? <BtnLoadingIndicator /> : 'Permanently delete'}
                                </button>
                            </div>
                        </BtnContainer>
                    </Modalcontainer>
                </Modalbackground>
            )}
        </>
    )
}
