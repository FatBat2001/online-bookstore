import "../styles/Header.css";
import image from "../assets/images/logo-inverted.jpeg";
import { Link } from "react-router-dom";
import { removeAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();  
  const logout = () => {
    removeAuthUser();
    navigate("/");
  };
  
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
            
              <button style={{
                textDecoration:"none"
              }}
              onClick={logout} className="Link">
                logout
              </button>
            
          
          </div>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
