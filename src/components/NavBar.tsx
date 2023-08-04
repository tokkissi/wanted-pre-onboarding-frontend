import { NavLink } from "react-router-dom";

interface navLinkProps {
  isActive: boolean;
}

export default function NavBar() {
  const defaultStyle = "text-gray-600";
  const activeStyle = " font-bold text-sky-500 border-b-2 p-2 border-sky-500";
  const flexibleActiveLinkStyle = ({ isActive }: navLinkProps) =>
    isActive ? defaultStyle + activeStyle : defaultStyle;

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
      </ul>
    </nav>
  );
}
