import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/login/Login"));
const AddExpert = React.lazy(() => import("./views/experts/AddExpert"));
const AddResource = React.lazy(() => import("./views/resources/AddResource"));
class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />

            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
            <Route
              exact
              path="/addExpert"
              name="Add Expert"
              render={(props) => <AddExpert {...props} />}
            />
            <Route
              exact
              path="/addResource"
              name="Add Resource"
              render={(props) => <AddResource {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
