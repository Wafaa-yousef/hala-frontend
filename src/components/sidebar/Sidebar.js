import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faChartLine, faQuoteRight, faChartBar} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const links = [
    { to: "/", label: "Home", icon: faHome },
    { to: "/pricingList", label: "Pricing List", icon: faList },
    { to: "/admintrend", label: "Admin Trends", icon: faChartLine },
    { to: "/customerquote", label: "Get a Quote", icon: faQuoteRight },
    { to: "/utilization", label: "Utilization", icon:faChartBar},
  ];

  return (
    <nav
      className={`sidebar ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <ul>
        {links.map(({ to, label, icon }) => (
          <li key={to} className={location.pathname === to ? "active" : ""}>
            <Link to={to}>
              <FontAwesomeIcon icon={icon} className="icon" />
              {isExpanded && <span className="label">{label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
