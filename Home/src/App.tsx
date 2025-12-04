import { useEffect } from "react";
import "./App.css";
import AppRouter from "./router/AppRouter";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const restore = useAuthStore((state) => state.restore);

  useEffect(() => {
    restore(); // sessionStorage → store 로 복원
  }, []);

  return <AppRouter />;
}

export default App;
