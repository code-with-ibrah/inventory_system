import React, { useState } from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import { Drawer } from "antd";
import { LoginOutlined, MenuOutlined } from '@ant-design/icons';
import logoImage from "../../../assets/images/page/logo.png";
import "./home-page-layout.css";
import { MenuLinks } from "../../../utils/menu-links.ts";
import {useAppSelector} from "../../../hooks";


const HomePageLayout = (props: any) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const user = useAppSelector(state => state.auth.user);

    // @ts-ignore
    return <React.Fragment>

        <nav className="navbar">
            <div className="home-container">
                <Link to={MenuLinks.home.index} className="navbar-brand">
                    <img className="navbar-brand__logo" src={logoImage} alt="logo" />
                </Link>

                <div className="navbar-menu__icon" onClick={showDrawer}>
                    <MenuOutlined />
                </div>

                {
                    // @ts-ignore
                    <Drawer direction="right" title="Yello Events Production" onClose={onClose} open={open}>
                        <div className="navbar-content__mobile">
                            <NavLink onClick={onClose} to={MenuLinks.home.index} className="navbar-link">Home</NavLink>
                            <NavLink onClick={onClose} to={MenuLinks.home.awards} className="navbar-link">Awards</NavLink>
                            <a href="https://yelloevents.com/event-tickets/" className="navbar-link">Tickets</a>
                            <NavLink onClick={onClose} to={MenuLinks.home.currentNominationForm} className="navbar-link">Nomination Form</NavLink>
                            {/*<a onClick={onClose} href={'https://old.vote.yelloevents.com/contestant-form'} className="navbar-link">Nomination Form</a>*/}
                            <NavLink onClick={onClose} to={MenuLinks.home.results} className="navbar-link">Results</NavLink>
                            <NavLink onClick={onClose} to={MenuLinks.auth.login} className="navbar-link btn-blue">
                                <LoginOutlined className="navbar-link__icon" />
                                <span>
                                {user?.id ? 'Dashboard' : 'Login'}
                            </span>
                            </NavLink>
                        </div>
                    </Drawer>
                }


                <div className="navbar-content__wrapper">
                    <NavLink to={MenuLinks.home.index} className="navbar-link">Home</NavLink>
                    <NavLink to={MenuLinks.home.awards} className="navbar-link">Awards</NavLink>
                    <a href="https://yelloevents.com/event-tickets/" className="navbar-link">Tickets</a>
                    <NavLink to={MenuLinks.home.currentNominationForm} className="navbar-link">Nomination Form</NavLink>
                    {/*<a onClick={onClose} href={'https://old.vote.yelloevents.com/contestant-form'}*/}
                    {/*   className="navbar-link">Nomination Form</a>*/}
                    <NavLink to={MenuLinks.home.results} className="navbar-link">Results</NavLink>
                    <NavLink to={MenuLinks.auth.login} className="navbar-link btn-blue">
                        <LoginOutlined className="navbar-link__icon"/>
                        <span>
                            {user?.id ? 'Dashboard' : 'Login'}
                        </span>
                    </NavLink>
                </div>
            </div>
        </nav>

        {props.children}
        <Outlet/>


        {<footer className="footer" style={{display: ""}}>
        <div className="home-footer">

                <div className="home-container">

                    <div className="home-footer-link__wrapper">
                        <Link className="footer-link" to={'#'}>Download our mobile App</Link>
                    </div>

                    <p>
                        <span className="footer-link">© {new Date().getFullYear()} Yello Events Production All rights reserved.</span>
                    </p>

                </div>

            </div>
        </footer> }

    </React.Fragment>
}


export default HomePageLayout;