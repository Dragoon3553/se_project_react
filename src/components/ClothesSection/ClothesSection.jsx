import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  filteredItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
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
      <ul className="clothes-section__list">
        {filteredItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
