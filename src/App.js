import AppRouter from "./app-router/AppRouter";
import AuthContextProvider from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
// import PersonalContextProvider from "./contexts/PersonalContext";
import "./App.css";

function App() {
  return (
    <div className="bgContainer">
      <AuthContextProvider>
        <AppRouter />
        <ToastContainer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
