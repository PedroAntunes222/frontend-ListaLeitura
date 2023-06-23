import React, { useContext } from "react";
import AuthContext from "../../../../context/Auth/auth";

import LogoutIcon from "@mui/icons-material/Logout";

export default function LogoutButton() {
  const { demo } = useContext(AuthContext);

  const logout = () => {
    if (demo) {
      localStorage.removeItem("demo");
    }
    localStorage.removeItem("login");
    window.location.reload();
  };

  return <LogoutIcon onClick={logout} />;
}
