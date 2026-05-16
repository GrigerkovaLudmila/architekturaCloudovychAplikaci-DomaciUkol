import ItemForm from "../components/ItemForm";
import PageHeader from "../components/PageHeader";

function ItemEditorPage({ mode, item, categories, onSubmit, onCancel }) {
  return (
    <>
      <PageHeader title={mode === "edit" ? "Edit Item" : "Add Item"} />
      <ItemForm
        mode={mode}
        item={item}
        categories={categories}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </>
  );
}

export default ItemEditorPage;
