import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
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
const EditResource = React.lazy(() => import("./views/resources/EditResource"));
// const EditExpert = React.lazy(() => import("./views/resources/EditExpert"));
class App extends Component {
  render() {
    return (
      <div>
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
              <Route
                exact
                path="/editResource/:id"
                name="Edit Resource"
                render={(props) => <AddResource {...props} />}
              />
              <Route
                exact
                path="/editExpert"
                name="Edit Expert"
                render={(props) => <AddExpert {...props} />}
              />
            </Switch>
          </React.Suspense>
        </HashRouter>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
