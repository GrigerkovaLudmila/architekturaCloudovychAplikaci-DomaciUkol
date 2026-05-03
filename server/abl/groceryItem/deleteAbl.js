const Ajv = require("ajv");
const ajv = new Ajv();

const groceryItemDao = require("../../dao/grocery-item-dao");
const categoryDao = require("../../dao/category-dao");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
    const params = req.body;

    const valid = ajv.validate(schema, params);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        validationError: ajv.errors,
      });
      return;
    }

    const item = groceryItemDao.get(params.id);

    if (!item) {
      res.status(404).json({
        code: "groceryItemNotFound",
      });
      return;
    }

    const categoryId = item.categoryId;

    groceryItemDao.remove(params.id);

    const remainingItems = groceryItemDao.list();

    const categoryStillUsed = remainingItems.some(
      (groceryItem) => groceryItem.categoryId === categoryId
    );

    let deletedCategory = null;

    if (!categoryStillUsed) {
      deletedCategory = categoryDao.get(categoryId);

      if (deletedCategory) {
        categoryDao.remove(categoryId);
      }
    }

    res.json({
      deletedItem: item,
      deletedCategory,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;