const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDao = require("../../dao/category-dao");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1, maxLength: 100 },
  },
  required: ["name"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let category = req.body;

    const valid = ajv.validate(schema, category);

    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    try {
      category = categoryDao.create(category);
    } catch (e) {
      res.status(400).json(e);
      return;
    }

    res.json(category);
  } catch (e) {
    res.status(500).json({
      code: "serverError",
      message: e.message,
    });
  }
}

module.exports = CreateAbl;