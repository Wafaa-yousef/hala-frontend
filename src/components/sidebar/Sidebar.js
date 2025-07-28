
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const links = [

    { to: "/", label: "Home" },
    {to:'/pricingList',label:"Pricing List"},
    { to: "/admintrend", label: "Admin Trends" },
    { to: "/customerquote", label:"Get a quote"},
    { to: "/utilization", label:"Utilization dashboard"}
  ];

  return (
    <nav className="sidebar">
      
      <ul>
        {links.map(({ to, label }) => (
          <li key={to} className={location.pathname === to ? "active" : ""}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
