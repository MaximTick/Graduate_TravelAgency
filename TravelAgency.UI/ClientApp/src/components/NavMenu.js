import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, Form, FormGroup, NavbarToggler, NavItem, NavLink, Dropdown, Modal, ModalHeader, ModalBody, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Link } from 'react-router-dom';

import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
            dropdownOpen: false,
            modalSignOut: false,
            roles: []
        };

        this.modalSignOut = this.modalSignOut.bind(this);
        this.signOut = this.signOut.bind(this);

        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    modalSignOut() {
        this.setState({
            modalSignOut: !this.state.modalSignOut
        });
    }

    signOut = async function () {
        let url = "/api/v1/users/logout";
        let method = "post";

        let response = await fetch(url, {
            method: method,
            mode: 'cors'
        });

        this.setState({
            modalSignOut: !this.state.modalSignOut
        });

        window.location.reload();
        window.location.replace("/");
    }

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    async loadData() {
        let url = "api/v1/users/account";

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();
            responseJson.then(results => {
                this.setState({
                    roles: results.roles
                });
            });
        }
    }

    async componentDidMount() {
        await this.loadData();
    }

    renderNavbar() {
        let isAdmin = this.state.roles.indexOf('admin');
        let isUser = this.state.roles.indexOf('user');

        if (isAdmin != (-1)) {
            return (
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">TRAVELA</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/hotelsA">HOTELS</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/toursA">TOURS</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/comments">COMMENTS</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/auctionsA">AUCTIONS</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="text-dark" style={{ cursor: "pointer" }} onClick={this.modalSignOut}>LOGOUT</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            );
        }
        else if (isUser != (-1)) {
            return (
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">TRAVELA</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/hotelsU">HOTELS</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/toursU">TOURS</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/auctionsU">AUCTIONS</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/profile">PROFILE</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="text-dark" style={{ cursor: "pointer" }} onClick={this.modalSignOut}>LOGOUT</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            );
        }
        else {
            return (
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">TRAVELA</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/hotelsU">HOTELS</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/toursU">TOURS</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/login">SIGN IN</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/register">SIGN UP</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            );
        }
    }

    render() {
        return (
            <header>
                {
                    this.renderNavbar()
                }
                <div>
                    <Modal isOpen={this.state.modalSignOut} >
                        <ModalHeader toggle={this.modalSignOut} >
                            Sign Out
                        </ModalHeader>
                        <ModalBody>
                            <p>Are you sure you want to log out?</p>
                            <button className="btn btn-outline-danger" onClick={this.signOut}>Log Out</button>
                        </ModalBody>
                    </Modal>
                </div>
            </header>
        );
    }
}
