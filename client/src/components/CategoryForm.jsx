import { useState } from "react";
import Button from "./Button";
import Field from "./Field";

function CategoryForm({ onCreate }) {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) return;

    onCreate({ name: name.trim() });
    setName("");
  }

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <Field label="Name">
        <input
          value={name}
          placeholder="Enter category name"
          onChange={(event) => setName(event.target.value)}
        />
      </Field>

      <Button type="submit">Add Category</Button>
    </form>
  );
}

export default CategoryForm;
