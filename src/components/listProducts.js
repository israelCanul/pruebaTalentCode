import React from "react"
import PropTypes from 'prop-types';


const ListProducts = ({Selector, items = []})=>{
    const renderItems  = () =>{
        return items.map((item, id) =>{
            if(item.Servicio === Selector){
                return <a key={id} href={`/productos/${item.Nombre}`}><li key={id}> {`${item.Nombre} - ${item.Marca}`} </li></a>
            }
            return true;
        });
    }

    return <div className="list-products">
        <ul>
            {renderItems()}
        </ul>
    </div>
}

ListProducts.propTypes = {
    /**
     * Selector that will be applied
     */
    Selector: PropTypes.string
  };


export default ListProducts;