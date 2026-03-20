import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";

function Profile({ clothingItems, handleCardClick }) {
  return (
    <section className="profile">
      <Sidebar />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
      />
    </section>
  );
}

export default Profile;
