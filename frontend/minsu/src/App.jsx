import { BrowserRouter } from "react-router-dom";

import Header from "./components/app/Header"
import Main from "./components/app/Main"
import AuthProvider from "./components/context/AuthProvider"
import HttpHeadersProvider from "./components/context/HttpHeadersProvider";
import "./css/style.css"
import "./css/main.css"
import "./App.css"

function App() {

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <HttpHeadersProvider>
            <Header />
            <Main />
          </HttpHeadersProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
