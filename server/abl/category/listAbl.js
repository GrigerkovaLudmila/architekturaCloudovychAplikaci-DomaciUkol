const categoryDao = require("../../dao/category-dao");

async function ListAbl(req, res) {
  try {
    const categoryList = categoryDao.list();

    res.json({
      itemList: categoryList,
    });
  } catch (e) {
    res.status(500).json({
      code: "serverError",
      message: e.message,
    });
  }
}

module.exports = ListAbl;