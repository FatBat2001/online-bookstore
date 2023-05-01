import "../styles/Header.css";
import image from "../assets/images/logo-inverted.jpeg";
import { Link } from "react-router-dom";
import { removeAuthUser } from "../helper/Storage";
const Header = () => {
  return (
    <header className="main-header">
      <Link to={"/"} className="logo">
        <img src={image} alt="" className="image" />
      </Link>
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
            
            {/* guest user view  */}
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
            {/* user && admin view      */}
            <li>
              <Link onClick={() => {removeAuthUser()}} className="Link">
                logout
              </Link>
            </li>
          
          </div>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
