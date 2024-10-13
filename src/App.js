import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Main from "./pages/Main";

import "./App.css";

function App() {
  return (
    <Router>
      <ChakraProvider>
        <Switch>
          <Route path="/" element={<Main />} />
        </Switch>
      </ChakraProvider>
    </Router>
  );
}

export default App;
