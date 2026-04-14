import { Link } from "react-router-dom";
import { BiLogoReact } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav className="navbar">
  <Link to="/" className="navbar-brand">
    <span className="navbar-logo-wrap">
      <BiLogoReact className="navbar-logo" />
      <span className="navbar-title">React Router</span>
    </span>
  </Link>

  <div className="navbar-links">
    <Link to="/" className="navbar-link">Home</Link>
    <Link to="/recipes" className="navbar-link">Recipes</Link>
    <Link to="/groceries" className="navbar-link">Groceries</Link>
  </div>
</nav>
  );
};

export default Navbar;
