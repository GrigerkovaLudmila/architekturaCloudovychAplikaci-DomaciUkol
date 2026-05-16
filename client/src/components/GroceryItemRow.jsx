import { formatDate } from "../utils/date";

function GroceryItemRow({ item, onEdit, onDelete }) {
  return (
    <article className="item-row">
      <div className="item-property item-property--name">
        <span>Name</span>
        <strong>{item.name}</strong>
      </div>

      <div className="item-property">
        <span>Expiration Date</span>
        <strong>{formatDate(item.expirationDate)}</strong>
      </div>

      <div className="item-property item-property--quantity">
        <span>Quantity</span>
        <strong>{item.quantity}</strong>
      </div>

      <div className="item-actions">
        <button
          className="icon-button icon-button--edit"
          type="button"
          aria-label={`Edit ${item.name}`}
          onClick={() => onEdit(item)}
        >
          ✎
        </button>

        <button
          className="icon-button icon-button--delete"
          type="button"
          aria-label={`Delete ${item.name}`}
          onClick={() => onDelete(item)}
        >
          🗑
        </button>
      </div>
    </article>
  );
}

export default GroceryItemRow;
