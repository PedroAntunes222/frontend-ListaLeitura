import React, { useState, createContext } from "react";
import Alerts from "./Alerts/Alerts";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <AlertContext.Provider
      value={{ alert, setAlert, message, setMessage, severity, setSeverity }}
    >
      <>
        {alert && (
          <Alerts severity={severity} message={message} setAlert={setAlert} />
        )}
        {children}
      </>
    </AlertContext.Provider>
  );
};

export default AlertContext;
