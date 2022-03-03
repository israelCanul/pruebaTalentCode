import React from "react";
import Producto from "../components/product";
import ImageBanner from "../img/Purificadora-con-despachador-automatico-de-agua-3.jpg";

const Home = ({ items }) => {
  const renderItems = () => {
    return items.map((item, id) => {
      return <Producto key={id} item={item} />;
    });
  };
  return (
    <div>
      <section className="banner">
        <h1>Porque somos tu mejor opción</h1>
        <div className="banner_description">
          <img src={ImageBanner} alt={"tu mejor opcion"} />
          <p>
            "Somos el único sistema de franquicia en todo México en venta de
            Agua Purificada"
          </p>
        </div>
      </section>
      <section className="productosSection">
        <h2>Productos</h2>
        <div className="items">{renderItems()}</div>
      </section>
    </div>
  );
};

export default Home;
