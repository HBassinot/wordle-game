import React, { useState, useContext, useEffect} from 'react';
import Modal from 'react-modal';
import UserContext, {WORD_LENGTH_MIN, WORD_LENGTH_MAX} from "../store/UserContext";
import TitleModal from './TitleModal';


Modal.setAppElement('#root'); // Assurez-vous d'ajouter cette ligne

const ScoreModal = ({ isOpen, toggleModal}) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      contentLabel="Score"
      className="modal-wordle"
      overlayClassName="modal-overlay "
    >
      <TitleModal title="Score" toggleModal={toggleModal} />

Voici les scores.

    </Modal>
  );
};

export default ScoreModal;
