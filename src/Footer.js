import React from 'react';
import {Nav, Navbar, NavbarBrand, NavbarText, NavItem, NavLink } from 'reactstrap';
import hb from './img/hbassinot.png';

class Footer extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const status = 'hbassinot.com';
		let newDate = new Date();
		let year = newDate.getFullYear();

		return <Navbar className="wordle-footer navbar-cl" color="" dark expand="md">
			<NavbarBrand target="_blank" href="https://www.hbassinot.com">{status}</NavbarBrand>
			<Nav className=" ml-auto" navbar>
				<NavItem>
					<NavLink target="_blank" href="https://github.com/HBassinot/wordle-game">GitHub</NavLink>
				</NavItem>
				<NavItem>
					<NavLink>{year}</NavLink>
				</NavItem>
				<NavItem>
					<NavLink><img id="wordle-footer-hb" src={hb} alt="HB" /></NavLink>
				</NavItem>
			</Nav>
		</Navbar>;
	}
}

export default Footer;