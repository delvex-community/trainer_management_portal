import { adminHeaderLinks } from "@/constants";
import { NavLink } from "react-router-dom";

const AdminNavItems = () => {
  return (
    <ul className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mt-8 sm:mt-0">
      {adminHeaderLinks.map((link) => (
        <li key={link.label}>
          <NavLink
            to={link.route}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-lg text-blue-600"
                : "font-semibold text-lg"
            }
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default AdminNavItems;
