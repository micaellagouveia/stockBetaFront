import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../store/contexts/authContext";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import CategoryService from "../../services/Category";
import "./styles.css";

export default function NewCategoryModal({
  modalVisible,
  setModalVisible,
  getCategories,
}) {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createNewCategory = async () => {
    try {
      await CategoryService.createCategory(name, description, user._id);
      getCategories();
      setModalVisible(false);
    } catch (error) {
        console.log(error)
      alert("Não foi possível criar a categoria");
    }
  };
  return (
    <Modal
      isOpen={modalVisible}
      toggle={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <ModalHeader
        toggle={() => {
          setModalVisible(!modalVisible);
        }}
      >
        Adicionar Nova Categoria
      </ModalHeader>
      <ModalBody className="modal-body">
        <input
          onChange={(event) => setName(event.target.value)}
          placeholder="Nome"
        />
        <input
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Descrição"
        />
      </ModalBody>
      <ModalFooter>
        <button onClick={createNewCategory}>Adicionar</button>
      </ModalFooter>
    </Modal>
  );
}
