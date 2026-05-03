const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDao = require("../../dao/category-dao");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string", minLength: 1 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    const category = req.body;

    const valid = ajv.validate(schema, category);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        validationError: ajv.errors,
      });
      return;
    }

    let updated;
    try {
      updated = categoryDao.update(category);
    } catch (e) {
      res.status(400).json(e);
      return;
    }

    if (!updated) {
      res.status(404).json({
        code: "categoryNotFound",
      });
      return;
    }

    res.json(updated);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;