const Ajv = require("ajv");
const ajv = new Ajv();

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

    const category = categoryDao.get(params.id);

    if (!category) {
      res.status(404).json({
        code: "categoryNotFound",
      });
      return;
    }

    res.json(category);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;