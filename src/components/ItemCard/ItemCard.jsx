import { useContext } from "react";

// Context Import
import LoginContext from "../../contexts/LoginContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import likeDefault from "../../assets/like_default.png";
import likeActive from "../../assets/like_active.png";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  // Contexts
  const { isLoggedIn } = useContext(LoginContext);
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };
  return (
    <li className="card">
      <div className="card__content">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button onClick={handleLike} type="button" className="card__like-btn">
            <img
              src={isLiked ? likeActive : likeDefault}
              alt={isLiked ? "Item liked" : "Item not liked"}
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
