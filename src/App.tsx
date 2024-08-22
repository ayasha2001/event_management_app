// Base Imports
import React from "react";

// Component Imports
import Header from "./components/Header";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import myStore from "./store/store";

function App() {
  return (
    <div className="App">
      <Header />
      <Provider store={myStore}>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
