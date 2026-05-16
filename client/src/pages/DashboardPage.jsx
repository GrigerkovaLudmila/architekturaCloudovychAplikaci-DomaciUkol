import CategoryAccordion from "../components/CategoryAccordion";
import PageHeader from "../components/PageHeader";

function DashboardPage({ groceryItems, categoryMap, onAddItem, onEditItem, onDeleteItem }) {
  const groupedItems = groceryItems.reduce((groups, item) => {
    const categoryName = categoryMap[item.categoryId]?.name || "Without Category";

    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }

    groups[categoryName].push(item);
    return groups;
  }, {});

  const sortedCategoryNames = Object.keys(groupedItems).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <>
      <PageHeader title="Dashboard" actionLabel="Add item" onAction={onAddItem} />

      <section className="content-panel dashboard-panel">
        <div className="sort-bar">
          <span>Auto-sorted by Category</span>
        </div>

        {sortedCategoryNames.length === 0 ? (
          <p className="empty-state">No items in your fridge yet.</p>
        ) : (
          sortedCategoryNames.map((categoryName) => (
            <CategoryAccordion
              key={categoryName}
              categoryName={categoryName}
              items={groupedItems[categoryName]}
              onEditItem={onEditItem}
              onDeleteItem={onDeleteItem}
            />
          ))
        )}
      </section>
    </>
  );
}

export default DashboardPage;
