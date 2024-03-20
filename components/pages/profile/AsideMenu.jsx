import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const AsideMenuContainer = styled.aside`
    width: ${(props) => props.asidewidth ? props.asidewidth : '250px'};
    display: flex;
    padding: 10px;
    padding-top: 2rem;
    background-color: var(--color-secondary)
`

const AsideVanMenu = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
`

const AsideMenuList = styled.ul`
    display: flex;
    flex-direction: column;
    list-style-type: none;
    gap: 1rem;

    & > li {
        border-top: 0.5px solid var(--color-primary);
    }

    > * {
        &:first-child {
            border-top-width: 0px !important;
        }
    }

`

const AsideMenuItem = styled.li`
    display: flex;
    align-items: center;
`

const StyledListItem = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    padding: 6px 8px;
    border-radius: 5px;
    text-decoration: none;
    color: black;
    width: 100%;
    position: relative;

`

const StyledLink = styled(StyledListItem).attrs({ as: Link })`

    &:hover {
        background-color: #e5e5e5;
    }

    &.setting1-item__active {
        background-color: #ededed;
    
        &::before {
          content: '';
          position: absolute;
          left: 0;
          width: 4px;
          height: 80%;
          background-color: var(--primary-color);
          border-radius: 15px;
        }
    }
`

const AsideMenuGroup = styled.li`
    margin-top: 10px;
    border-top: 0.5px solid gray;
    display: flex;
    flex-direction: column;
`

const AsidGroupTitle = styled.span`
    display: flex;
    width: 100%;
    font-size: 12px;
    margin: 10px 0;
    color: gray;
    font-weight: 600;
`

const NestedAsideGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const NestedAsideGroupHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    cursor: pointer;
    border-radius: 5px;

`

const SpanIcon = styled.span`
    display: flex;
    font-weight: 400;
`

const NestedDropdownIcon = styled.div`
    margin-left: auto;
    display: flex;
    height: 100%;
    align-items: center;

    &:svg {
        transition: all 200ms ease;
    }

    &.nested-dropdown-icon__active {
        transform: rotate(180deg)

    }
`

const NestedDropdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 50px;
    padding: 5px 10px;
    gap: 5px;
`


export default function AsideMenu({ children, asidewidth }) {


    return (
        <AsideMenuContainer asidewidth={asidewidth}>
            <AsideVanMenu>
                <AsideMenuList>
                    {children}
                    {/* {settingsList(user.organization).map((item) => (
                        <li key={item.path}>
                            <SettingSidebar {...item} />
                        </li>
                    ))}
                    {user.role !== 'editor' && (
                        <>
                            <SettingsSection title='Organization' list={settingsOrgList(user.organization)} />
                            <SettingsSection title='Apps' list={settingsAppsList(user.organization)} />
                        </>
                    )} */}
                </AsideMenuList>
            </AsideVanMenu>
        </AsideMenuContainer>
    )
}


const SettingsSection = ({ list, title }) => {

    return (
        <AsideMenuGroup> 
            <AsidGroupTitle> {title} </AsidGroupTitle>
            <AsideVanMenu>
                <AsideMenuList>
                    {list.map((item) => (
                        <li key={item.path}>
                           {!item.nested ? <SettingSidebar {...item} /> : <NestedSettingSidebar {...item} />}
                        </li>
                    ))}
                </AsideMenuList>
            </AsideVanMenu>
        </AsideMenuGroup>
    )
}

const NestedSettingSidebar = ({ name, icon, nestedlist }) => {

    const [showDrowDown, setShowDrowDown] = useState(false)

    return (
        <NestedAsideGroup>
            <NestedAsideGroupHeader className='nested-setting-header'>
                <StyledListItem onClick={() => setShowDrowDown(!showDrowDown)}>
                    <SpanIcon> {icon} </SpanIcon>
                    <SpanIcon> {name} </SpanIcon>
                    <NestedDropdownIcon className={`${showDrowDown ? 'nested-dropdown-icon__active' : ''}`}>
                        {/* <IoIosArrowDown size={16} /> */}
                        ^
                    </NestedDropdownIcon>
                </StyledListItem>
            </NestedAsideGroupHeader>
            {showDrowDown && (
                <NestedDropdownContainer>
                    {nestedlist.map((item) => (
                        <SettingSidebar key={item.path} {...item} />
                    ))}
                </NestedDropdownContainer>
            )}
        </NestedAsideGroup>
    )
}


const SettingSidebar = ({ name, path, icon }) => {
    const loaction = usePathname()

    return (
        <AsideMenuItem>
            <StyledLink href={path} className={loaction === path ? 'setting1-item__active' : ''}>
                <span> {icon} </span>
                <span> {name} </span>
            </StyledLink>
        </AsideMenuItem>
    )
}