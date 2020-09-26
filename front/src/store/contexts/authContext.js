import React, { createContext, useState, useEffect } from "react";
import SessionService from "../../services/Session";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("@auth-user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await SessionService.login(email, password);
      console.log(response);
      localStorage.setItem("@auth-token", response.headers["x-auth-token"]);
      localStorage.setItem("@auth-user", JSON.stringify(response.data));
      setUser(response.data);
      history.push("/home");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Não foi possível realizar o seu login"
      );
    }
  };

  const signUp = async (name, email, password) => {
    try {
      const response = await SessionService.logUp(name, email, password);
      console.log(response);
      localStorage.setItem("@auth-token", response.headers["x-auth-token"]);
      localStorage.setItem("@auth-user", JSON.stringify(response.data));
      setUser(response.data);
      history.push("/home");
    } catch (err) {
      alert(
        err?.response?.message || "Não foi pssível concluir o seu cadastro"
      );
    }
  };

  const signout = () => {
    localStorage.clear();
    setUser(null)
    history.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signout, signUp, user, isUserLogged: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
