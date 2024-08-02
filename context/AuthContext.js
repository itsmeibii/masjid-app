import React, { createContext, useState, useContext } from 'react';

// Create the Context
const ModalContext = createContext();

// Create a custom hook to use the ModalContext
export const useModal = () => {
  return useContext(ModalContext);
};

// Create a Provider component
export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('')

  return (
    <ModalContext.Provider value={{ modal, setModal, name, setName }}>
      {children}
    </ModalContext.Provider>
  );
};
