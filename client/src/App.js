import { Header } from "./components/Header";
import { Routes } from "./Routes";
import "./styles/App.css";

const App = () => {
  return (
    <>
      <Header />
      <main className="app">
        <Routes />
      </main>
    </>
  );
};

export { App };
