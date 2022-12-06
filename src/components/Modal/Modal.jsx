import React from "react";

import Button from "@mui/material/Button";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

const fechaModal = () => {
  // setLoading(false);
  // setModal("");
};

function Modal(modal) {
  return modal ? (
    <div>
      <p>Livro adicionado com sucesso</p>
      <Button
        variant="outlined"
        onClick={fechaModal}
        endIcon={<CheckCircleOutlineRoundedIcon />}
        size="large"
        // className={styles.botaoFormulario}
      />
    </div>
  ) : (
    <></>
  );
}

export default Modal;
