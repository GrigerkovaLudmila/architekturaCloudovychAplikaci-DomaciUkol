import { useState } from "react";
import GroceryItemRow from "./GroceryItemRow";
import { compareByExpirationDate } from "../utils/date";

function CategoryAccordion({ categoryName, items, onEditItem, onDeleteItem }) {
  const [isOpen, setIsOpen] = useState(true);
  const sortedItems = [...items].sort(compareByExpirationDate);

  return (
    <section className="category-section">
      <button
        className="category-toggle"
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span>{categoryName}</span>
        <span className={isOpen ? "chevron open" : "chevron"}>⌄</span>
      </button>

      {isOpen && (
        <div className="category-items">
          {sortedItems.map((item) => (
            <GroceryItemRow
              key={item.id}
              item={item}
              onEdit={onEditItem}
              onDelete={onDeleteItem}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default CategoryAccordion;
