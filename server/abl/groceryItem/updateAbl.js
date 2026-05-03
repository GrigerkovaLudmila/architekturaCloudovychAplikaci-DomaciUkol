const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;

const ajv = new Ajv();
addFormats(ajv);

const groceryItemDao = require("../../dao/grocery-item-dao");
const categoryDao = require("../../dao/category-dao");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    name: { type: "string", minLength: 1, maxLength: 100 },
    categoryId: { type: "string", minLength: 32, maxLength: 32 },
    expirationDate: { type: "string", format: "date" },
    quantity: { type: "number", minimum: 1 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    const item = req.body;

    const valid = ajv.validate(schema, item);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        validationError: ajv.errors,
      });
      return;
    }

    const currentItem = groceryItemDao.get(item.id);
    if (!currentItem) {
      res.status(404).json({
        code: "groceryItemNotFound",
      });
      return;
    }

    const finalCategoryId = item.categoryId || currentItem.categoryId;

    const category = categoryDao.get(finalCategoryId);
    if (!category) {
      res.status(400).json({
        code: "categoryDoesNotExist",
      });
      return;
    }

    if (item.expirationDate && new Date(item.expirationDate) < new Date()) {
      res.status(400).json({
        code: "expiredDate",
        message: "Expiration date cannot be today or in the past",
      });
      return;
    }

    const updatedItem = groceryItemDao.update(item);
    updatedItem.category = category;

    res.json(updatedItem);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;