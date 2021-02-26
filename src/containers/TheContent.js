import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

// routes config
import routes from "../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};

const TheContent = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <main className="c-main pt-4">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                <PrivateRoutes
                  key={idx}
                  exact
                  path={route.path}
                  component={route.component}
                  isAuthenticated={isLoggedIn}
                />
                // route.component && (
                //   <Route
                //     key={idx}
                //     path={route.path}
                //     exact={route.exact}
                //     name={route.name}
                //     render={(props) => (
                //       <CFade>
                //         <route.component {...props} />
                //       </CFade>
                //     )}
                //   />
                // )
              );
            })}
            <Redirect to="/login" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
