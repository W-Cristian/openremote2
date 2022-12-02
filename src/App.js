import Layout from "./components/Layout/Layout.js";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import SecuredOwn from "./page/SecuredOwn.js";
import Welcome from "./page/Welcome.js";

import { Fragment } from 'react';

function App() {

  return (
    <Fragment>
      <Layout>
        <Router>
          <div className="container">
            <ul className = 'space-y-8 '>
              <li>
                <Link className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 p-2 px-4 rounded' to="/">public component</Link>
              </li>
              <li>
                <Link className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 p-2 px-4 rounded' to="/secured">secured component</Link>
              </li>
            </ul>
            <Routes>
              <Route exact path="/" element={<Welcome />} />
              <Route path="/secured" element={<SecuredOwn />} />
            </Routes>
          </div>
        </Router>
      </Layout>
    </Fragment>
  );
}

export default App;
