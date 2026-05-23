import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Context Imports
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LoginContext from "../../contexts/LoginContext";

import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { getInitial, generateBackground } from "../../utils/avatar";
import { removeToken } from "../../utils/token";

function Sidebar({ handleEditProfileClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const navigate = useNavigate();

  const initial = getInitial(currentUser.name);
  const color = generateBackground(currentUser.name);

  const signOut = () => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  };

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
        {/* <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="sidebar__avatar"
        /> */}
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <button
        onClick={handleEditProfileClick}
        type="button"
        className="sidebar__change-btn"
      >
        Change profile data
      </button>
      <button onClick={signOut} type="button" className="sidebar__logout-btn">
        Log out
      </button>
    </aside>
  );
}

export default Sidebar;
