import "../styles/Header.css";
import image from "../assets/images/logo.jpg";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <img src={image} alt="" className="image" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to={"/"} className="Link">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/about"} className="Link">
              About
            </Link>
          </li>
          <li>
            <Link to={"/contact"} className="Link">
              Contact
            </Link>
          </li>
          <div className="login-register">
            <li>
              <Link to={"/Login"} className="Link">
                Login
              </Link>
            </li>
            <li>
              <Link to={"/Register"} className="Link">
                Register
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
