import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../store/contexts/authContext";
import { useHistory } from "react-router-dom";

export default function Home() {
  const { user, isUserLogged } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!isUserLogged) {
      history.push("/login");
    }
  }, [isUserLogged]);
  return <h1>{`Bem vindo(a), ${user?.name}`}</h1>;
}
