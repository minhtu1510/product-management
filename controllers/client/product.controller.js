const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

module.exports.index = async (req, res) => {
  const products = await Product.find({
    deleted: false,
    status: "active",
  }).sort({
    position: "desc",
  });

  for (const item of products) {
    item.priceNew = (item.price * (100 - item.discountPercentage)) / 100;
    item.priceNew = item.priceNew.toFixed(0);
  }

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
  });
};

module.exports.detail = async (req, res) => {
  const slug = req.params.slug;
  const product = await Product.findOne({
    deleted: false,
    slug: slug,
    status: "active",
  });

  product.priceNew = (product.price * (100 - product.discountPercentage)) / 100;
  product.priceNew = product.priceNew.toFixed(0);

  res.render("client/pages/products/detail", {
    pageTitle: product.title,
    product: product,
  });
};

module.exports.category = async (req, res) => {
  const slugCategory = req.params.slugCategory;

  const category = await ProductCategory.findOne({
    deleted: false,
    slug: slugCategory,
    status: "active",
  });

  const allCategoryChildren = [];

  const getCategoryChildren = async (parentId) => {
    const childs = await ProductCategory.find({
      deleted: false,
      status: "active",
      parent_id: parentId,
    });

    for (const child of childs) {
      allCategoryChildren.push(child.id);
      await getCategoryChildren(child.id);
    }
  };

  await getCategoryChildren(category.id);

  const products = await Product.find({
    deleted: false,
    status: "active",
    category_id: { $in: [category.id, ...allCategoryChildren] },
  });

  for (const product of products) {
    product.priceNew =
      (product.price * (100 - product.discountPercentage)) / 100;
    product.priceNew = product.priceNew.toFixed(0);
  }

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
  });
};