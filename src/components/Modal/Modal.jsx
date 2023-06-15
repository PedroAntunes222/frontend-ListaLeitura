import React from 'react'
import styles from './Modal.module.scss'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Modal({message, setModal, color}) {
  const navigate = useNavigate();
    
  const closeModal = (e) => {
    e.preventDefault();
    setModal(false);
    navigate("/shelf");
  };

  return (
    <div className={styles.modal}>
    <div style={{backgroundColor: color}}>
      <p>{message}</p>
      <Button onClick={(e) => closeModal(e)}>OK</Button>
    </div>
  </div>
  )
}
