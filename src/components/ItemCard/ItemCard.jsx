import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <li className="card">
      <h1 className="card__name">{item.name}</h1>
      <img className="card__img" src={item.link} alt={item.name} />
    </li>
  );
}

export default ItemCard;
