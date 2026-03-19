import "./Sidebar.css";
import avatar from "../../assets/avatar.png";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img src={avatar} alt="Terrance Tegegne" className="sidebar__avatar" />
        <p className="sidebar__username">Terrance Tegegne</p>
      </div>
    </aside>
  );
}

export default Sidebar;
