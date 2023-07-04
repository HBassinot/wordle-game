import React, { useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import ConfigModal from './ConfigModal'; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar className="navbar-cl" expand="md">
      <NavbarBrand href="/"><h1>Mon Wordle</h1></NavbarBrand>
        <div>
          <a href="#" onClick={toggleModal}>Config</a>
        </div>
        <ConfigModal 
          isOpen={isOpen}
          toggleModal={toggleModal}
        />
    </Navbar>
  );
};

export default Header;
