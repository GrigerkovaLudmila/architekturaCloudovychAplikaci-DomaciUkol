import CategoryCard from "../components/CategoryCard";
import CategoryForm from "../components/CategoryForm";
import PageHeader from "../components/PageHeader";

function CategoriesPage({
  categories,
  groceryItems,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
}) {
  function getUsedItemCount(categoryId) {
    return groceryItems.filter((item) => item.categoryId === categoryId).length;
  }

  return (
    <>
      <PageHeader title="Categories" />

      <section className="content-panel categories-panel">
        <CategoryForm onCreate={onCreateCategory} />

        <div className="category-list">
          {categories.length === 0 ? (
            <p className="empty-state">No categories yet.</p>
          ) : (
            categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                usedItemCount={getUsedItemCount(category.id)}
                onUpdate={onUpdateCategory}
                onDelete={onDeleteCategory}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default CategoriesPage;
