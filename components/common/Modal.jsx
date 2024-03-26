import React, { createContext, useContext, useEffect } from "react";
import { css, styled } from "styled-components";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom:0;
    right:0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    ${({ $isOpen }) => !$isOpen && css`
        transition: transform 0.5s ease;
        // transform: translateY(-100%);
        display: none;
        background-color: transparent;
    `};
`;

const ModalWrapper = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    margin: 25px auto;
    ${({ $isOpen }) => !$isOpen && css`
        transition: transform 0.5s ease;
        transform: translateY(-100%);
        background-color: transparent;
    `};
`;

const ModalContent = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    height:90vh;
    width: 60%;
    min-width: 600px;

    ${({ $isOpen }) =>
        $isOpen
        ? css`
            transition: transform 0.5s ease;
            transform: translateY(0%);
            `
        : css`
            transition: transform 0.5s ease;
            transform: translateY(-100%);
            opacity: 0.5;
            `};
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 0.3rem;
    ::-webkit-scrollbar {
        display: none;
    }

    margin: 0 15px;

    @media (max-width: 900px) {
        width: 100%;
        min-width: auto;
    }

`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 1rem;

    font-weight: 700;
    font-size:25px;
    color: black;
`;

const ModalButton = styled.button`
    cursor: pointer;
    padding: 6px 12px;
    background-color: var(--color-primary);
    border: 1px solid var(--color-primary);
    color: white;
    &:hover {
        background-color: var(--primary-color-hover);
        color: black;
    }
    font-size: 14px;
    font-weight: 400;
    border-radius: 4px;
`;

const ModalBody = styled.div`
    display: flex;
    flex-grow: 1;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 1rem;
    min-height: 200px;
    max-height:70vh;
    overflow:auto;
`;
const ModalFooter = styled.div`
    padding: 1rem;
`;

const ModalContext = createContext();


function Modal({ children, $isOpen, setOpenModal, onClose = () => { }, ...rest }) {

    const onModalClose = () => {
        setOpenModal(false)
        onClose() && onClose()
    }

    useEffect(() => {
        if ($isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [$isOpen]);

    return (
        <ModalOverlay $isOpen={$isOpen} onClick={onModalClose}>
        <ModalWrapper $isOpen={$isOpen}>
            <ModalContent {...rest} $isOpen={$isOpen} onClick={(e) => e.stopPropagation()}> 
            <ModalContext.Provider value={onModalClose}>
                {children}
            </ModalContext.Provider>
            </ModalContent>
        </ModalWrapper>
        </ModalOverlay>
    );
}

const Header = ({ children, isClose=true, ...rest }) => {
    const onModalClose = useContext(ModalContext);
    
    return (
        <ModalHeader {...rest}>
            <h3>{children}</h3>
            {isClose && <ModalButton onClick={onModalClose}>
                <i class="fa fa-times" aria-hidden="true"></i>
            </ModalButton>}
        </ModalHeader>
    );
};

const BodyModal = ({ children }) => {
    return <ModalBody>{children}</ModalBody>;
};

const Footer = ({ children }) => {
    return <ModalFooter>{children}</ModalFooter>;
};

Modal.Header = Header;
Modal.Body = BodyModal;
Modal.Footer = Footer;

export default Modal;
