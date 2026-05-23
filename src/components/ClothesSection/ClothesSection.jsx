import { useContext } from "react";

// Context Import
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LoginContext from "../../contexts/LoginContext";

import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  card,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__title">Your items</p>
        <button
          onClick={handleAddClick}
          className="clothes-section__add-btn"
          type="button"
        >
          + Add new
        </button>
      </div>
      {isOwn && (
        <ul className="clothes-section__list">
          {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ClothesSection;
