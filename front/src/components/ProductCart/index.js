import React, { useState } from "react";
import { Card } from "reactstrap";
import "./styles.css";
import { FaRegEdit } from "react-icons/all";
import { Tooltip } from "reactstrap";
import moment from "moment";

export default function ProductCart({ product }) {
  console.log(product);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div className="product-card">
      <div>
        <p>{product.name}</p>
        <p>{moment(product.createdAt).format("DD/MM/YYYY")}</p>
      </div>
      <div className="product-right-info">
        <div className="product-price">
          <p>{`R$ ${product.price}`}</p>
          <p className="product-category" id="product-category">
            {product.category.name}
          </p>
          <Tooltip
            placement="bottom"
            isOpen={tooltipOpen}
            target="product-category"
            toggle={toggle}
          >
            {product.category.description}
          </Tooltip>
        </div>
        <FaRegEdit size={30} color="#444" className="edit-icon" />
      </div>
    </div>
  );
}
