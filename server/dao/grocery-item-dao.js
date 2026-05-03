const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const folderPath = path.join(__dirname, "storage", "groceryItemList");

function get(id) {
  try {
    const filePath = path.join(folderPath, `${id}.json`);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    if (e.code === "ENOENT") return null;
    throw { code: "failedToReadGroceryItem", message: e.message };
  }
}

function create(item) {
  try {
    item.id = crypto.randomBytes(16).toString("hex");

    const filePath = path.join(folderPath, `${item.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(item, null, 2), "utf8");

    return item;
  } catch (e) {
    throw { code: "failedToCreateGroceryItem", message: e.message };
  }
}

function update(item) {
  const current = get(item.id);
  if (!current) return null;

  const updated = { ...current, ...item };

  const filePath = path.join(folderPath, `${item.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf8");

  return updated;
}

function remove(id) {
  try {
    fs.unlinkSync(path.join(folderPath, `${id}.json`));
    return {};
  } catch (e) {
    if (e.code === "ENOENT") return {};
    throw { code: "failedToRemoveGroceryItem", message: e.message };
  }
}

function list() {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const files = fs.readdirSync(folderPath);

  return files.map((file) =>
    JSON.parse(fs.readFileSync(path.join(folderPath, file), "utf8"))
  );
}

module.exports = { get, create, update, remove, list };