import React from "react";
import "./styles.css";
import logo from "../../assets/StockLogo.png";

export default function SignIn() {
  return (
    <div className="login-container">
      <div className="login-content">
        <img src={logo} alt="logo" width="200" />
        <a href="">voltar</a>
        <p>Cadastrar meu estoque</p>
        <div className="form">
          <input placeholder="Nome" />
          <input placeholder="Email" />
          <input placeholder="Senha" />
          <input placeholder="Confirmar Senha" />
          <button>Cadastrar</button>
        </div>
      </div>
    </div>
  );
}
