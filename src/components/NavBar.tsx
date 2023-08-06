import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import NavButton from "./NavButton";

export default function NavBar() {
  const { logout, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="py-2 mb-[1px]">
      <ul className="flex justify-around">
        <NavButton to="/">Home</NavButton>
        <NavButton to="/signin">SignIn</NavButton>
        <NavButton to="/signup">SignUp</NavButton>
        <NavButton to="/todo">TODO LIST</NavButton>
        <li
          className={
            "text-gray-600 hover:text-sky-300 hover:cursor-pointer " +
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
