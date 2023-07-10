import React from 'react';

const TitleModal = ({ title, toggleModal}) => {
  return (
    <h3 className='modal-title'>
    <span className='modal-title-text'>{title}</span>
    <button className="wordleButton ml-auto" onClick={toggleModal} title="fermer">
    <span className='modal-title-close'>fermer </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
      </svg> 
      </button>    
    </h3>
  );
};

export default TitleModal;
