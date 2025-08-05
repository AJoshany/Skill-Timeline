import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./routes.jsx";
import Header from "./components/Header/Header.jsx";

function App() {
  let router = useRoutes(routes);
  return (
    <>
      <div className="w-full h-full flex flex-col justify-start items-center gap-20 bg-[var(--color-primary-dark)] text-(--color-white)">
        <Header />
        <div className="container flex flex-col items-center justify-center gap-3 app-main ">
          {router}
        </div>
      </div>
    </>
  );
}

export default App;
