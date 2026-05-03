const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;

const ajv = new Ajv();
addFormats(ajv);

const groceryItemDao = require("../../dao/grocery-item-dao");
const categoryDao = require("../../dao/category-dao");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1, maxLength: 100 },
    categoryId: { type: "string", minLength: 32, maxLength: 32 },
    expirationDate: { type: "string", format: "date" },
    quantity: { type: "number", minimum: 1 },
  },
  required: ["name", "categoryId", "expirationDate", "quantity"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let item = req.body;

    const valid = ajv.validate(schema, item);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        validationError: ajv.errors,
      });
      return;
    }

    // expiration must not be today or in the past
    if (new Date(item.expirationDate) < new Date()) {
      res.status(400).json({
        code: "expiredDate",
        message: "Expiration date cannot be today or be in the past",
      });
      return;
    }

    // category must exist
    const category = categoryDao.get(item.categoryId);
    if (!category) {
      res.status(400).json({
        code: "categoryDoesNotExist",
      });
      return;
    }

    item = groceryItemDao.create(item);

    // attach category
    item.category = category;

    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;