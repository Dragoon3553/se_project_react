import { useContext } from "react";
// Context Imports
import LoginContext from "../../contexts/LoginContext";

import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  handleEditProfileClick,
  card,
}) {
  // const { isLoggedIn } = useContext(LoginContext);

  return (
    <section className="profile">
      <Sidebar handleEditProfileClick={handleEditProfileClick} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        card={card}
      />
    </section>
  );
}

export default Profile;
