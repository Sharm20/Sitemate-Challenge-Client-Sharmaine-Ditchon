import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Read from "./pages/Read";

import "./App.css";

function App() {
  return (
    <Router>
      <ChakraProvider>
        <Switch>
          <Route path="/" element={<Create />} />
          <Route path="/update-clinic" element={<Update />} />
          <Route path="/read" element={<Read />} />
        </Switch>
      </ChakraProvider>
    </Router>
  );
}

export default App;
