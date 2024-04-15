import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useComponentVisible from "./useClickOutside";
// import { IoIosArrowDown } from "react-icons/io";
// import useComponentVisible from "../../../hooks/useClickOutside";


const SelectContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    // height: 130px;
    margin: 10px 0px;
    color: var(--color-primary);
`

const SelectOptionHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0.75rem;
    border: 0.4px solid #d9d9d9;
    align-items: center;
    border-radius: 5px;
`

const DropdownIcon = styled.div`
    padding: 5px;
    display: flex;
    transition: all 200ms ease;
    transform: ${(props) => props.$showMenu ? 'rotate(180deg)': 'rotate(0deg)'}
`


const SelectOptionList = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 200px;
    overflow: scroll;
    gap: 5px;
    border: 0.2px solid #e5e5e5;
    padding: 10px;
    position: absolute;
    top: 45px;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px 1px 0.5px rgba(191, 191, 191, 0.75);
    background-color: #fff;
    z-index: 1000;
`

const ItemSelect = styled.div`
    display: flex;
    width: 100%;
    padding: 5px 10px;
    border-radius: 5px;
    /* border: 0.2px solid gray; */
    align-items: center;
    gap: 10px;
    cursor: pointer;

    &:hover {
        background-color: #e5e5e5;
    }
`

export default function Dropdown({ title, options, value, onSelect, onClose }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  
    const handleCheckboxChange = (id) => {
      const updatedSelectedItems = selectedItems.includes(id)
        ? selectedItems.filter((item) => item !== id)
        : [...selectedItems, id];
  
      setSelectedItems(updatedSelectedItems);
      onSelect(updatedSelectedItems);
    };

    useEffect(() => {
        if (value) {
            const checkOptions = []
            options.forEach((item) => {
                if (item[value]) {
                    checkOptions.push(item.id)
                }
            })
            setSelectedItems(checkOptions)
        }
    }, [])


    useEffect(() => {
        if (!isComponentVisible) {
            onClose && onClose()
        }
    }, [isComponentVisible])

    useEffect(() => {
        onSelect(selectedItems);
        // console.log(selectedItems_name);
      }, [selectedItems]);
  
    const handleShowMenu = () => {
        setIsComponentVisible(!isComponentVisible)
    }
  
    return (
        <SelectContainer ref={ref}>
            <SelectOptionHeader onClick={handleShowMenu}>
                <label>Select {title}:</label>
                <DropdownIcon onClick={handleShowMenu} $showMenu={isComponentVisible}>
                    {/* <IoIosArrowDown size={20} /> */}
                    <i className="fa fa-caret-down text-black" aria-hidden="true"></i>
                </DropdownIcon>
            </SelectOptionHeader>
            {isComponentVisible  && (
                <SelectOptionList>
                    {options?.map((item, i) => (
                        <ItemSelect onClick={handleCheckboxChange.bind(this, item.id)} key={i}>
                            <input
                            type="checkbox"
                            value={item.id}
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                            />
                            {item.name}
                        </ItemSelect>
                    ))}
                </SelectOptionList>
            )}
        </SelectContainer>
    );
  };


  