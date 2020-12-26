import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <Aux>
        <div className = {classes.DesktopOnly} >
        <BackDrop />
        </div>
        <header className = {classes.Toolbar}>
            < DrawerToggle clicked = {props.drowertoggleClicked}/>
            <div className = {classes.Logo}>
                <Logo/>
            </div>
        
            <nav className = {classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    </Aux>    
);


export default toolbar;