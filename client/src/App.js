import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import {
  createCategory,
  createGroceryItem,
  deleteCategory,
  deleteGroceryItem,
  listCategories,
  listGroceryItems,
  updateCategory,
  updateGroceryItem,
} from "./api/fridgeApi";
import AppShell from "./components/AppShell";
import ConfirmDialog from "./components/ConfirmDialog";
import CategoriesPage from "./pages/CategoriesPage";
import DashboardPage from "./pages/DashboardPage";
import EditItemRoute from "./pages/EditItemRoute";
import ItemEditorPage from "./pages/ItemEditorPage";

function AppRoutes() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [groceryItems, setGroceryItems] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [itemToDelete, setItemToDelete] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function loadData() {
    try {
      setIsLoading(true);
      setError("");

      const [categoryData, groceryData] = await Promise.all([
        listCategories(),
        listGroceryItems(),
      ]);

      setCategories(categoryData.itemList || []);
      setGroceryItems(groceryData.itemList || []);
      setCategoryMap(groceryData.categoryMap || {});
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreateCategory(category) {
    try {
      setError("");
      await createCategory(category);
      await loadData();
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleUpdateCategory(category) {
    try {
      setError("");
      await updateCategory(category);
      await loadData();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  async function handleDeleteCategory(categoryId) {
    try {
      setError("");
      await deleteCategory(categoryId);
      await loadData();
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleCreateItem(item) {
    try {
      setError("");
      await createGroceryItem(item);
      await loadData();
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleUpdateItem(item) {
    try {
      setError("");
      await updateGroceryItem(item);
      await loadData();
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleConfirmDeleteItem() {
    try {
      setError("");
      await deleteGroceryItem(itemToDelete.id);
      setItemToDelete(null);
      await loadData();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <AppShell>
      {error && <p className="app-error">{error}</p>}
      {isLoading && <p className="app-loading">Loading...</p>}

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/dashboard"
          element={
            <DashboardPage
              groceryItems={groceryItems}
              categoryMap={categoryMap}
              onAddItem={() => navigate("/item/add")}
              onEditItem={(item) => navigate(`/item/edit/${item.id}`)}
              onDeleteItem={setItemToDelete}
            />
          }
        />

        <Route
          path="/categories"
          element={
            <CategoriesPage
              categories={categories}
              groceryItems={groceryItems}
              onCreateCategory={handleCreateCategory}
              onUpdateCategory={handleUpdateCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          }
        />

        <Route
          path="/item/add"
          element={
            <ItemEditorPage
              mode="add"
              categories={categories}
              onSubmit={handleCreateItem}
              onCancel={() => navigate("/dashboard")}
            />
          }
        />

        <Route
          path="/item/edit/:id"
          element={
            <EditItemRoute
              groceryItems={groceryItems}
              categories={categories}
              isLoading={isLoading}
              onSubmit={handleUpdateItem}
              onCancel={() => navigate("/dashboard")}
            />
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <ConfirmDialog
        item={itemToDelete}
        onConfirm={handleConfirmDeleteItem}
        onCancel={() => setItemToDelete(null)}
      />
    </AppShell>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
