import React from "react";
import Producto from "../components/product";
import { useParams } from "react-router-dom";

const Home = ({ items, selector = "V" }) => {
  let params = useParams();
  const renderItems = () => {
    return items.map((item, id) => {
      if (item.Servicio === selector && params.name === undefined) {
        return <Producto key={id} item={item} />;
      } else {
        if (params.name !== undefined) {
          if (item.Nombre === params.name) {
            return <Producto key={id} item={item} />;
          }
        }
      }
      return true;
    });
  };
  return (
    <div>
      <section className="banner">
        <h1>
          {params.name !== undefined
            ? params.name
            : selector === "R"
            ? "Productos para Renta"
            : "Productos para Venta"}
        </h1>
        <p>
          Tener una ventana despachadora de agua puede ayudar a tu negocio a
          aumentar aun más las ganancias y brindar un servicio valioso a tus
          clientes, como es facilitarles el servicio de agua purificada cuando
          ellos lo necesitan.
        </p>
      </section>
      <section className="productosSection">
        <div className="items">{renderItems()}</div>
      </section>
    </div>
  );
};

export default Home;
