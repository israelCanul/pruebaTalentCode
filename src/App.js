import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataItems,setDataItemsForm,toggleModal } from "./actions";
import logo from "./logo.svg";

import "./scss/App.scss";

//components 
import ListProducts from "./components/listProducts"
import Contacto from "./components/formulario"
import RoutesComponent from "./Routes"


function App() {
  const [modalOpened, setModal] = useState(false);
  const site = useSelector((state) => state.site);
  const dispatch = useDispatch();
  useEffect(() => {
    
    if (site !== null) {
      if (site.items.length === 0) {
        
        dispatch(fetchDataItems());
      }
    }
  }, [site, dispatch]);

  const closeFormulario = ()=>{    
    dispatch(toggleModal());
  }

  return (
    <div className={`App ${modalOpened ? "modalOpened": ""}`}>
      <header className="App-header">
        
        <nav>
          <div className="logo">
            <a href="/">
              <img height="50" src={logo} alt="Logo empresa" />
            </a>
          </div>
          <ul className="options">
            <li className="options_option">
              <a href="/renta">Renta</a> 
              <ListProducts items = {site.items} Selector="R" />
            </li>
            <li className="options_option">
            <a href="/venta">Venta</a> 
             
              <ListProducts items = {site.items} Selector="V" />
            </li>
            <li className="options_option">
            <a href="/contacto" onClick={(e)=>{
              e.preventDefault();
              dispatch(toggleModal());
            }}>Contacto</a> 
              
            </li>
          </ul>
        </nav>
      </header>
      <div className="container">
        <RoutesComponent  />
      </div>
      { site.modalIsOpen === true ?
        <Contacto producto={site.itemSelected} toggleModal={closeFormulario}  /> : ""
      }
      
    </div>
  );
}

export default App;
