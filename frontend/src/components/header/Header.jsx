import "./Header.css";
import { Link } from "react-router-dom";
import logo from '../header/EduVerse_logo.png';

const Header = ({isAuth}) => {
  return (
    <header>
      <div className="logo">
      <img src={logo} alt="Logo" />
      </div>

      <div className="link">
        <Link to={"/"}>Home</Link>
        <Link to={"/courses"}>Courses</Link>
        <Link to={"/about"}>About</Link>
        {isAuth ? (
          <Link to={"/account"}>Account</Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
