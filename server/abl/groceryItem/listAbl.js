const groceryItemDao = require("../../dao/grocery-item-dao");
const categoryDao = require("../../dao/category-dao");

async function ListAbl(req, res) {
  try {
    const items = groceryItemDao.list();

    const categoryMap = {};
    categoryDao.list().forEach((c) => {
      categoryMap[c.id] = c;
    });

    res.json({
      itemList: items,
      categoryMap,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;