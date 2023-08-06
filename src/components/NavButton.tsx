import { NavLink } from "react-router-dom";

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
}

export default function NavButton({ to, children }: NavButtonProps) {
  const defaultStyle = "text-gray-600 hover:text-sky-300 ";
  const activeStyle = " font-bold text-sky-500 border-b-2 p-2 border-sky-500 ";
  const flexibleActiveLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? defaultStyle + activeStyle : defaultStyle;

  return (
    <li>
      <NavLink className={flexibleActiveLinkStyle} to={to}>
        {children}
      </NavLink>
    </li>
  );
}
