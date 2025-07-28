import Sidebar from "../components/sidebar/Sidebar";
import  "./appLayout.css";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
