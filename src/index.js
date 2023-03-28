import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { firebaseContext } from "./Contexts/FirebaseContext";
import firebase from "./Config/Firebase";
import Authcontext from "./Contexts/AuthContext";
import ImageContext from "./Contexts/ImageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <firebaseContext.Provider value={{ firebase }}>
      <Authcontext>
        <ImageContext>
          <App />
        </ImageContext>
      </Authcontext>
    </firebaseContext.Provider>
  </React.StrictMode>
);
