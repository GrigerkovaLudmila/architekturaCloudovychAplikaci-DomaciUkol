const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const categoryFolderPath = path.join(__dirname, "storage", "categoryList");

function get(id) {
  try {
    const filePath = path.join(categoryFolderPath, `${id}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadCategory", message: error.message };
  }
}

function create(category) {
  try {
    const categoryList = list();

    const categoryExists = categoryList.some(
      (item) => item.name.toLowerCase() === category.name.toLowerCase()
    );

    if (categoryExists) {
      throw {
        code: "categoryAlreadyExists",
        message: "Category with this name already exists",
      };
    }

    category.id = crypto.randomBytes(16).toString("hex");

    const filePath = path.join(categoryFolderPath, `${category.id}.json`);
    const fileData = JSON.stringify(category, null, 2);

    fs.writeFileSync(filePath, fileData, "utf8");

    return category;
  } catch (error) {
    throw {
      code: error.code || "failedToCreateCategory",
      message: error.message,
    };
  }
}

function update(category) {
  try {
    const currentCategory = get(category.id);

    if (!currentCategory) return null;

    if (category.name && category.name !== currentCategory.name) {
      const categoryList = list();

      const categoryExists = categoryList.some(
        (item) =>
          item.id !== category.id &&
          item.name.toLowerCase() === category.name.toLowerCase()
      );

      if (categoryExists) {
        throw {
          code: "categoryAlreadyExists",
          message: "Category with this name already exists",
        };
      }
    }

    const updatedCategory = {
      ...currentCategory,
      ...category,
    };

    const filePath = path.join(categoryFolderPath, `${category.id}.json`);
    const fileData = JSON.stringify(updatedCategory, null, 2);

    fs.writeFileSync(filePath, fileData, "utf8");

    return updatedCategory;
  } catch (error) {
    throw {
      code: error.code || "failedToUpdateCategory",
      message: error.message,
    };
  }
}

function remove(id) {
  try {
    const filePath = path.join(categoryFolderPath, `${id}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveCategory", message: error.message };
  }
}

function list() {
  try {
    if (!fs.existsSync(categoryFolderPath)) {
      fs.mkdirSync(categoryFolderPath, { recursive: true });
    }

    const files = fs.readdirSync(categoryFolderPath);

    return files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(categoryFolderPath, file),
        "utf8"
      );

      return JSON.parse(fileData);
    });
  } catch (error) {
    throw { code: "failedToListCategories", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};