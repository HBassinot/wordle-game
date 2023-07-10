import React, { useState, useContext, useEffect} from 'react';
import Modal from 'react-modal';
import UserContext, {WORD_LENGTH_MIN, WORD_LENGTH_MAX} from "../store/UserContext";
import TitleModal from './TitleModal';


Modal.setAppElement('#root'); 

const HelpModal = ({ isOpen, toggleModal}) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      contentLabel="Aide"
      className="modal-wordle"
      overlayClassName="modal-overlay "
    >
        <TitleModal title="Aide" toggleModal={toggleModal} />


<h4>Voici les régles du jeu</h4>
Le but du jeu est de retrouver le mot en un minimum d'essais.
<br></br>
Après chaque proposition, chaque lettre du mot apparaitra de différente couleur :
<br></br>

<ul>
    <li>Les cases de couleur verte indique que la lettre est dans le mot et à la bonne position.<span class="letter correct-position">A</span></li>
    <li>Les cases de couleur oroange indique que la lettre est dans le mot mais pas à la bonne position.<span class="letter correct-letter">L</span></li>
    <li>Les cases de couleur grise indique que la lettre n'est pas dans le mot<span class="letter incorrect-letter">T</span></li>
</ul>



    </Modal>
  );
};

export default HelpModal;
