import { useState } from "react";
import Button from "./Button";
import Field from "./Field";
import { formatDate, isFutureDateInputValue, parseDisplayDate } from "../utils/date";

function ItemForm({ mode, item, categories, onSubmit, onCancel }) {
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    name: item?.name || "",
    expirationDate: item?.expirationDate ? formatDate(item.expirationDate) : "",
    quantity: item?.quantity || 1,
    categoryId: item?.categoryId || "",
  });

  function updateField(fieldName, value) {
    setFormError("");
    setFormData((currentData) => ({
      ...currentData,
      [fieldName]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const parsedExpirationDate = parseDisplayDate(formData.expirationDate);

    if (!parsedExpirationDate) {
      setFormError("Enter expiration date in DD.MM.YYYY format.");
      return;
    }

    if (!isFutureDateInputValue(parsedExpirationDate)) {
      setFormError("Expiration date must be tomorrow or later.");
      return;
    }

    const dtoIn = {
      ...formData,
      expirationDate: parsedExpirationDate,
      quantity: Number(formData.quantity),
    };

    if (mode === "edit") {
      dtoIn.id = item.id;
    }

    onSubmit(dtoIn);
  }

  return (
    <form className="editor-card" onSubmit={handleSubmit}>
      {formError && <p className="form-error">{formError}</p>}

      <Field label="Name">
        <input
          value={formData.name}
          placeholder={
            mode === "edit"
              ? "Enter item's name if you want to change it"
              : "Enter item's name"
          }
          onChange={(event) => updateField("name", event.target.value)}
        />
      </Field>

      <Field label="Expiration Date">
        <input
          type="text"
          inputMode="numeric"
          maxLength="10"
          value={formData.expirationDate}
          placeholder="DD.MM.YYYY"
          onChange={(event) => updateField("expirationDate", event.target.value)}
        />
      </Field>

      <Field label="Quantity">
        <input
          type="number"
          min="1"
          value={formData.quantity}
          placeholder={
            mode === "edit"
              ? "Enter quantity if you want to change it"
              : "Enter quantity"
          }
          onChange={(event) => updateField("quantity", event.target.value)}
        />
      </Field>

      <Field label="Category">
        <select
          value={formData.categoryId}
          onChange={(event) => updateField("categoryId", event.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </Field>

      <div className="form-actions">
        <Button type="submit">{mode === "edit" ? "Apply" : "Add Item"}</Button>
        <Button type="button" variant="danger" onClick={onCancel}>Discard</Button>
      </div>
    </form>
  );
}

export default ItemForm;
