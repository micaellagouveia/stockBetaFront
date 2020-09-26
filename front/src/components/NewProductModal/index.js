import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../store/contexts/authContext";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import CategoryService from "../../services/Category";
import ProductServie from "../../services/Product";
import NewCategoryModal from "../NewCategoryModal";
import "./styles.css";

export default function NewProductModal({
  modalVisible,
  setModalVisible,
  getProducts,
}) {
  const [newCategoryVisible, setNewCategoryModalVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  async function getCategories() {
    const response = await CategoryService.listCategories(user._id);
    setCategories(response);
  }
  useEffect(() => {
    if (user) getCategories();
  }, [user]);

  const createProduct = async () => {
    try {
      await ProductServie.createProduct(name, price, user._id, categoryId);
      getProducts();
      setModalVisible(false)
    } catch (err) {
      alert("Não foi possível criar seu produto");
    }
  };
  return (
    <Modal
      isOpen={modalVisible}
      toggle={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <NewCategoryModal
        modalVisible={newCategoryVisible}
        setModalVisible={setNewCategoryModalVisible}
        getCategories={getCategories}
      />
      <ModalHeader
        toggle={() => {
          setModalVisible(!modalVisible);
        }}
      >
        Adicionar Novo Produto
      </ModalHeader>
      <ModalBody className="modal-body">
        <input
          placeholder="Nome"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder="Preço"
          onChange={(event) => setPrice(event.target.value)}
        />
        <div className="category-selector">
          <select
            placeholder="Categoria"
            onChange={(event) => setCategoryId(event.target.value)}
          >
            <option value="">Categoria</option>
            {categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
          </select>
          <button onClick={() => setNewCategoryModalVisible(true)}>+</button>
        </div>
      </ModalBody>
      <ModalFooter>
        <button onClick={createProduct}>Adicionar</button>
      </ModalFooter>
    </Modal>
  );
}
