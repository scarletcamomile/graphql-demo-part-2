import { NavLink } from "react-router-dom";

const Header = () => (
  <header className="header">
    <NavLink to="/">Cats</NavLink>
    <NavLink to="/breeds">Breeds</NavLink>
    <NavLink to="/chat">Chat</NavLink>
    <NavLink to="/create_breed">Add your breed</NavLink>
  </header>
);

export { Header };
