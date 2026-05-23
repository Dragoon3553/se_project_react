import { useContext } from "react";

// Context Imports
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  handleEditProfileClick,
  handleLogout,
  card,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const filteredItems = clothingItems.filter((item) => {
    return item.owner === currentUser._id;
  });

  return (
    <section className="profile">
      <Sidebar
        handleEditProfileClick={handleEditProfileClick}
        handleLogout={handleLogout}
      />
      <ClothesSection
        filteredItems={filteredItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        card={card}
      />
    </section>
  );
}

export default Profile;
