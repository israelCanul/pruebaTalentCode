import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "../pages/home";
import Renta from "../pages/Renta";

import { useSelector} from "react-redux";

const RoutesComponent = () => {
  const site = useSelector((state) => state.site);
  useEffect(() => {}, [site]);
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <Home items={site.items ? site.items : []} />}
        ></Route>
        <Route
          exact
          path="/renta"
          component={() => (
            <Renta selector="R" items={site.items ? site.items : []} />
          )}
        ></Route>
        <Route
          exact
          path="/venta"
          component={() => (
            <Renta selector="V" items={site.items ? site.items : []} />
          )}
        ></Route>
        <Route
          exact
          path="/productos/:name"
          component={() => (
            <Renta selector="V" items={site.items ? site.items : []} />
          )}
        ></Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

const NotFound = () => {
  return (
    <div id="root">
      <div className="App">
        <div className="NotFound">
          <p>
            Not Found - <span>404</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoutesComponent;
