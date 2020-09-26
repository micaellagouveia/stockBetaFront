import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/contexts/authContext";
import { useHistory } from "react-router-dom";
import ProductCart from "../../components/ProductCart";
import logo from "../../assets/StockLogo.png";
import { RiLogoutBoxRFill } from "react-icons/all";
import ProductService from "../../services/Product";
import NewProductModal from "../../components/NewProductModal";
import "./styles.css";

export default function Home() {
  const [newProductModalVisible, setNewProductModalVisible] = useState(false);
  const { user, isUserLogged, signout } = useContext(AuthContext);
  const history = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!isUserLogged) {
      history.push("/home");
    }
  }, [isUserLogged]);

  async function getProducts() {
    try {
      const response = await ProductService.listProducts(user._id);
      setProducts(response);
    } catch (err) {
      console.log(err.response);
    }
  }
  useEffect(() => {
    if(user) getProducts();
  }, []);

  return (
    <div className="home-container">
      <NewProductModal
        modalVisible={newProductModalVisible}
        setModalVisible={setNewProductModalVisible}
        getProducts={getProducts}
      />
      <div className="home-header">
        <img src={logo} alt="logo" width={200} />
        <RiLogoutBoxRFill size={50} color="#AC1C1C" className="logout-icon" onClick={signout} />
      </div>
      <h2>{`Bem vindo(a) ao seu estoque, ${user?.name}`}</h2>
      <input className="search=product" placeholder="Buscar um produto" />
      <button onClick={()=>{
        setNewProductModalVisible(true)
      }}className="add-product">Adicionar produto</button>
      {products.length ? (
        products.map((product) => <ProductCart product={product} />)
      ) : (
        <p>Você ainda não possui produtos no seu estoque</p>
      )}
    </div>
  );
}
