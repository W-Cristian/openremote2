import Layout from "./components/Layout/Layout.js";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import SecuredOwn from "./page/SecuredOwn.js";
import InitialForm from "./components/Forms/InititalForm.js";

import { Fragment } from 'react';

function App() {

  return (
    <Fragment>
      <Layout>
        <Router>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<InitialForm />} />
              <Route path="/secured" element={<SecuredOwn />} />
            </Routes>
          </div>
        </Router>
      </Layout>
    </Fragment>
  );
}

export default App;
