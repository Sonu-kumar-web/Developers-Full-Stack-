import React, { Fragment, useEffect } from "react";
import {
   BrowserRouter as Router,
   Route,
   Switch,
   Redirect,
} from "react-router-dom";

import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layouts/Alert";
import { loadUser } from "./redux/actions/auth";
import setAuthToken from "./redux/utils/setAuthToken";

import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

if (localStorage.token) {
   setAuthToken(localStorage.token);
   console.log("Profile", localStorage.getItem("token"));
}

const App = () => {
   useEffect(() => {
      store.dispatch(loadUser());
   }, []);

   return (
      <Provider store={store}>
         <Router>
            <Fragment>
               <Navbar />
               <Route exact path="/" component={Landing} />
               <section className="container">
                  <Alert />
                  <Switch>
                     <Route exact path="/register" component={Register} />
                     <Route exact path="/login" component={Login} />
                  </Switch>
               </section>
            </Fragment>
         </Router>
      </Provider>
   );
};

export default App;
