import "../styles/Header.css";
import image from "../assets/images/logo-inverted.jpeg";
import { Link } from "react-router-dom";
import { removeAuthUser, getAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Header = () => {
  const navigate = useNavigate();
  const logout_endpoint_path = 'http://localhost:4000/auth/logout';
  
  const logout = (e) => {
    e.preventDefault();
    axios
    .post("http://localhost:4000/auth/logout", getAuthUser())
    .then((resp) => {
      console.log('horray');  
    })
    .catch((errors) => {
      console.log(errors);
    });
    
    removeAuthUser();
    navigate("/");
  };
  const user = getAuthUser();
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
          {user && user.type === "librarian" && (
            <li>
              <Link to={"/dashboard"} className="Link">
                Dashboard
              </Link>
            </li>
          )}
          {user && user.type === "normal" && (
            <li>
              <Link to={"/borrowed"} className="Link">
                Borrowed Books
              </Link>
            </li>
          )}
          <div className="login-register">
            {/* guest user view  */}

            {!user && (
              <div>
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
            )}
            {/* user && admin view      */}

            {user && (
              <button
                style={{
                  textDecoration: "none",
                }}
                onClick={logout}
                className="Link"
              >
                logout
              </button>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
