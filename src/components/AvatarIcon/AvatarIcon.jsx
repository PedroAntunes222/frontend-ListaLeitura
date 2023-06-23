import React from "react";
import Avatar from "@mui/material/Avatar";

const avatarMaker = (nome) => {
  return nome?.slice(0, 1);
};

export default function AvatarIcon({ user }) {
  return <Avatar alt="Remy Sharp">{avatarMaker(user.nome)}</Avatar>;
}
