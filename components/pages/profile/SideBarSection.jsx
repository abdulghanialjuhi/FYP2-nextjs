import React from 'react'
// import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components';
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Section = styled.section`
    display: flex;
    min-width: 50px;
    position: relative;
`

const SideBarSectionContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background-color: #e2e2e2;
    z-index: 1000;
    /* border-right: 0.2px rgb(182, 182, 182) solid; */
    width: 50px;
    transition: width 0.2s;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &:hover {
        width: 200px;
        transition-delay: 1s;
        box-shadow: 2px 0px 4px -2px rgb(170, 170, 170);
    }
`

const SideNavItem = styled.div`
    ${props => props.$active && 'background-color: #fff'};

    &:hover {
        background-color: #fff;
    }

`

const SideNavItemLink = styled(Link)`
    width: 180px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    color: black;
    overflow: hidden;
`

const NavSpan = styled.span`
    white-space: nowrap;
`

const IconContainer = styled.div`
    min-width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function SideBarSection({ sideNavs=[] }) {

    const location = usePathname()
    const route = location

    return (
        <Section>
            <SideBarSectionContainer>
                {sideNavs.map((nav) => (
                    <SideNavItem key={nav.path} $active={route.includes(nav.path)} >
                        <SideNavItemLink href={nav.path}>
                            <IconContainer>
                                {nav.icon}
                            </IconContainer>
                            <NavSpan> {nav.name} </NavSpan>
                        </SideNavItemLink>
                    </SideNavItem>
                ))}
            </SideBarSectionContainer>
        </Section>
    )
}
