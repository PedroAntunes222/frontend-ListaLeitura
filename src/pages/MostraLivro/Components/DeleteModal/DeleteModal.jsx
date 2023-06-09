import React from 'react'
import styles from './DeleteModal.module.scss'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function DeleteModal({message, setModal}) {
  const navigate = useNavigate();
    
  const fechaModal = (e) => {
    e.preventDefault();
    setModal(false);
    navigate("/lista");
  };

  return (
    <div className={styles.modal}>
    <div>
      <p>{message}</p>
      <Button onClick={(e) => fechaModal(e)}>OK</Button>
    </div>
  </div>
  )
}
