import React, { useState, useContext } from "react";
import "./styles.css";
import logo from "../../assets/StockLogo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/contexts/authContext";

export default function SignUp(history) {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const logUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Senha diferente");
      return;
    }

    await signUp(name, email, password);
  };
  return (
    <div className="login-container">
      <div className="login-content">
        <img src={logo} alt="logo" width="200" />
        <Link to="/">voltar</Link>
        <p>Cadastrar meu estoque</p>
        <form onSubmit={logUp} className="form">
          <input
            type="text"
            placeholder="Nome"
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
