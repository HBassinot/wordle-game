import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { isOpen: false };
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return <Navbar className="navbar-cl" expand="md">
			<NavbarBrand href="/"><h1>Mon Wordle</h1></NavbarBrand>
			<NavbarToggler onClick={this.toggle} />
			<Collapse isOpen={this.state.isOpen} navbar>
				<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink href="/config">Config</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>;
	}
}
