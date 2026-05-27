import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Context Imports
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./SideBar.css";
import { getInitial, generateBackground } from "../../utils/avatar";

function Sidebar({ handleEditProfileClick, handleLogout }) {
  const { currentUser } = useContext(CurrentUserContext);

  const initial = getInitial(currentUser.name);
  const color = generateBackground(currentUser.name);

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar" style={{ backgroundColor: color }}>
            {initial}
          </div>
        )}
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <button
        onClick={handleEditProfileClick}
        type="button"
        className="sidebar__change-btn"
      >
        Change profile data
      </button>
      <button
        onClick={handleLogout}
        type="button"
        className="sidebar__logout-btn"
      >
        Log out
      </button>
    </aside>
  );
}

export default Sidebar;
