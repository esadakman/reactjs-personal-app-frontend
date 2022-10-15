import AppRouter from "./app-router/AppRouter";
import AuthContextProvider from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
// import PersonalContextProvider from "./contexts/PersonalContext";
import './App.css'

function App() {
  return (
    <div
      style={{
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundAttachment: "fixed",
        height: "100vh",
        marginTop: 0,
      }}
    >
      <AuthContextProvider> 
          <AppRouter />
          <ToastContainer /> 
      </AuthContextProvider>
    </div>
  );
}

export default App;
