import { useContext } from "react";

// Context Import
import LoginContext from "../../contexts/LoginContext";

import "./ItemCard.css";
import likeDefault from "../../assets/like_default.png";
import likeActive from "../../assets/like_active.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { isLoggedIn } = useContext(LoginContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
  };

  return (
    <li className="card">
      <div className="card__content">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button type="button" className="card__like-btn">
            <img
              src={likeDefault}
              alt={`isLiked ? 'like active' : 'like default'`}
              className="card__like-btn_img"
            />
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__img"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
