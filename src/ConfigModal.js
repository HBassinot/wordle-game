import React, { useState, useContext, useEffect} from 'react';
import Modal from 'react-modal';
import UserContext, {WORD_LENGTH_MIN, WORD_LENGTH_MAX} from "./store/user-context";


Modal.setAppElement('#root'); // Assurez-vous d'ajouter cette ligne

const ConfigModal = ({ isOpen, toggleModal}) => {

  const userCtx = useContext(UserContext);

  const [wordLength, setWordLength] = useState(userCtx.userWordLength);
  const [maxTry, setMaxTry] = useState(userCtx.userMaxTry);

  const handleWordLengthChange = (event) => {
    var newWordLength = parseInt(event.target.value, 10);

    // Vérification de la plage de valeurs
    if(newWordLength < WORD_LENGTH_MIN) {
      newWordLength = WORD_LENGTH_MIN;
    } else if(newWordLength > WORD_LENGTH_MAX) {
      newWordLength = WORD_LENGTH_MAX;
    }

    setWordLength(newWordLength);
    userCtx.setWordLength(newWordLength);
  };

  const handleMaxTryChange = (event) => {
    var newMaxtry = parseInt(event.target.value, 10);

    // Vérification de la plage de valeurs
    if(newMaxtry < 1) {
      newMaxtry = 1;
    } else if(newMaxtry > 20) {
      newMaxtry = 20;
    }

    setMaxTry(newMaxtry);
    userCtx.setMaxTry(newMaxtry);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      contentLabel="Configuration"
      className="modal-config"
      overlayClassName="modal-overlay "
    >
      <h3>Configuration</h3>

      <p>Longueur du mot à trouver :</p>
      <input type="number" value={wordLength} onChange={handleWordLengthChange} />

      <br></br><br></br>

      <p>Nombre de tentative :</p>
      <input type="number" value={maxTry} onChange={handleMaxTryChange} />

      <br></br><br></br>

      <button onClick={toggleModal}>Fermer</button>
    </Modal>
  );
};

export default ConfigModal;
