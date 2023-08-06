import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function NavBar() {
  const defaultStyle = "text-gray-600 hover:text-sky-300 ";
  const activeStyle = " font-bold text-sky-500 border-b-2 p-2 border-sky-500 ";
  const flexibleActiveLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? defaultStyle + activeStyle : defaultStyle;

  const { logout, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="py-2 mb-[1px]">
      <ul className="flex justify-around">
        <li>
          <NavLink className={flexibleActiveLinkStyle} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={flexibleActiveLinkStyle} to="/signin">
            SignIn
          </NavLink>
        </li>
        <li>
          <NavLink className={flexibleActiveLinkStyle} to="/signup">
            SignUp
          </NavLink>
        </li>
        <li>
          <NavLink className={flexibleActiveLinkStyle} to="/todo">
            TODO LIST
          </NavLink>
        </li>
        <li
          className={
            defaultStyle +
            "hover:cursor-pointer " +
            (accessToken ? "" : "hidden")
          }
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </li>
      </ul>
    </nav>
  );
}
