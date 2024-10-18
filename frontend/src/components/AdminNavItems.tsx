import { adminHeaderLinks } from "@/constants";
import { NavLink } from "react-router-dom";

const AdminNavItems = () => {
  return (
    <ul className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 sm:mt-0">
      {adminHeaderLinks.map((link) => (
        <li key={link.label}>
          <NavLink
            to={link.route}
            className={({ isActive }) =>
              isActive
                ? "font-[500] text-lg text-blue-600"
                : "font-[500] text-lg"
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
