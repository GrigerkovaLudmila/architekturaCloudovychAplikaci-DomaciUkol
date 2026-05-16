import { useState } from "react";
import Button from "./Button";

function CategoryCard({ category, usedItemCount, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [error, setError] = useState("");

  function startEditing() {
    setName(category.name);
    setError("");
    setIsEditing(true);
  }

  function discardEditing() {
    setName(category.name);
    setError("");
    setIsEditing(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Category name is required.");
      return;
    }

    try {
      await onUpdate({ id: category.id, name: trimmedName });
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  }

  if (isEditing) {
    return (
      <form className="category-card category-card--editing" onSubmit={handleSubmit}>
        <div className="category-edit-fields">
          <label htmlFor={`category-${category.id}`}>Name</label>
          <input
            id={`category-${category.id}`}
            value={name}
            onChange={(event) => {
              setError("");
              setName(event.target.value);
            }}
            autoFocus
          />
          {error && <p className="form-error category-edit-error">{error}</p>}
        </div>

        <div className="category-actions">
          <Button type="submit">Apply</Button>
          <Button type="button" variant="danger" onClick={discardEditing}>
            Discard
          </Button>
        </div>
      </form>
    );
  }

  return (
    <article className="category-card">
      <div>
        <h2>{category.name}</h2>
        <p>
          {usedItemCount} item{usedItemCount === 1 ? "" : "s"}
        </p>
      </div>

      <div className="category-actions">
        <Button type="button" variant="ghost" onClick={startEditing}>
          Edit
        </Button>

        <Button
          type="button"
          variant="danger"
          disabled={usedItemCount > 0}
          title={
            usedItemCount > 0
              ? "Delete the items in this category first"
              : "Delete category"
          }
          onClick={() => onDelete(category.id)}
        >
          Delete
        </Button>
      </div>
    </article>
  );
}

export default CategoryCard;
