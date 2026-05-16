import { useParams } from "react-router-dom";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import ItemEditorPage from "./ItemEditorPage";

function EditItemRoute({ groceryItems, categories, isLoading, onSubmit, onCancel }) {
  const { id } = useParams();
  const item = groceryItems.find((groceryItem) => groceryItem.id === id);

  if (item) {
    return (
      <ItemEditorPage
        mode="edit"
        item={item}
        categories={categories}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    );
  }

  if (isLoading) {
    return (
      <>
        <PageHeader title="Edit Item" />
        <section className="content-panel">
          <p className="empty-state">Loading item...</p>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Edit Item" />
      <section className="content-panel not-found-panel">
        <p className="empty-state">This item was not found.</p>
        <Button type="button" onClick={onCancel}>Back to Dashboard</Button>
      </section>
    </>
  );
}

export default EditItemRoute;
