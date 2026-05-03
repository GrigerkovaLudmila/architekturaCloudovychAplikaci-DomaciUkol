const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDao = require("../../dao/category-dao");
const groceryItemDao = require("../../dao/grocery-item-dao");

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

    const category = categoryDao.get(params.id);

    if (!category) {
      res.status(404).json({
        code: "categoryNotFound",
      });
      return;
    }

    const groceryItemList = groceryItemDao.list();

    const categoryIsUsed = groceryItemList.some(
      (item) => item.categoryId === params.id
    );

    if (categoryIsUsed) {
      res.status(400).json({
        code: "categoryIsUsed",
        message: "Category cannot be deleted because it is used by grocery items",
      });
      return;
    }

    categoryDao.remove(params.id);

    res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;