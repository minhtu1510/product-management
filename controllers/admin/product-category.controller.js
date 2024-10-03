const { prefixAdmin } = require("../../config/system");
const ProductCategory = require("../../models/product-category.model");

module.exports.index = (req, res) => {
  res.render("admin/pages/products-category/index", {
    pageTitle: "Danh sách danh mục sản phẩm",
  });
};

module.exports.create = async (req, res) => {
  const listCategory = await ProductCategory.find({
    deleted: false,
  });
  res.render("admin/pages/products-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    listCategory: listCategory,
  });
};

module.exports.createPost = async (req, res) => {
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countRecord = await ProductCategory.countDocuments();
    req.body.position = countRecord + 1;
  }
  console.log(req.body);
  const newRecord = new ProductCategory(req.body);
  await newRecord.save();

  res.redirect(`/${prefixAdmin}/products-category`);
};
