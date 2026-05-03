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

async function GetAbl(req, res) {
  try {
    const params = req.query?.id ? req.query : req.body;

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

    item.category = categoryDao.get(item.categoryId);

    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;