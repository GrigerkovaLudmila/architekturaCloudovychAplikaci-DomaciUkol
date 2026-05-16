async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.code || "Request failed");
  }

  return data;
}

export function listCategories() {
  return request("/category/list");
}

export function createCategory(category) {
  return request("/category/create", {
    method: "POST",
    body: JSON.stringify(category),
  });
}

export function updateCategory(category) {
  return request("/category/update", {
    method: "POST",
    body: JSON.stringify(category),
  });
}

export function deleteCategory(id) {
  return request("/category/delete", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
}

export function listGroceryItems() {
  return request("/groceryItem/list");
}

export function createGroceryItem(item) {
  return request("/groceryItem/create", {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export function updateGroceryItem(item) {
  return request("/groceryItem/update", {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export function deleteGroceryItem(id) {
  return request("/groceryItem/delete", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
}
