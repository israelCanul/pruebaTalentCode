import React from 'react';
import { toggleModal } from "../actions";
import { useDispatch } from "react-redux";

import "../scss/producto.scss";

const Product = ({item})=>{
    const dispatch = useDispatch();
    return <div className="product">
        <div className="img">
            <img src={item.Picture} alt={item.Nombre} />
        </div>
        <div className="description">
            <p>
                <strong>{item.Nombre}</strong> <br />            
                <span>{item.Marca}</span>
            </p>
            <p>
                Mod: {item.Modelo}
            </p>
        </div>
        <div className="action">
            <a href="/" onClick={(e)=>{
                e.preventDefault();
                dispatch(toggleModal(item));
            }}>More Info</a>
        </div>
    </div>
}

export default Product;