const { prefixAdmin } = require("../../config/system");
const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  //Lọc theo trạng thái
  if (req.query.status) {
    find.status = req.query.status;
  }
  //Hết Lọc theo trạng thái

  //Tìm kiêm
  if (req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
  }

  //Hết tìm kiếm

  //Phân trang
  const limitItems = 4;
  let page = 1;
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  const skip = (page - 1) * limitItems;

  const totalProduct = await Product.countDocuments(find);
  const totalPage = Math.ceil(totalProduct / limitItems);
  //Hết phân trang

  // Sắp xếp
  const sort = {};

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort["position"] = "desc";
  }

  // Hết sắp xếp

  const products = await Product.find(find)
    .limit(limitItems)
    .skip(skip)
    .sort(sort);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    totalPage: totalPage,
    currentPage: page,
    limitItems: limitItems,
  });
};

module.exports.changeStatus = async (req, res) => {
  console.log(req.body);
  await Product.updateOne(
    {
      _id: req.body.id,
    },
    {
      status: req.body.status,
    }
  );

  req.flash("success", "Đổi trạng thái thành công !");

  res.json({
    code: "success",
  });
};

module.exports.changeMulti = async (req, res) => {
  console.log(req.body);
  switch (req.body.status) {
    case "active":
    case "inactive":
      await Product.updateMany(
        {
          _id: req.body.ids,
        },
        {
          status: req.body.status,
        }
      );
      req.flash("success", "Đổi trạng thái thành công !");
      res.json({
        code: "success",
      });
      break;
    case "delete":
      await Product.updateMany(
        {
          _id: req.body.ids,
        },
        {
          deleted: true,
        }
      );
      req.flash("success", "Xóa thành công !");
      res.json({
        code: "success",
      });
      break;
    default:
      res.json({
        code: "Trạng thái không hợp lệ!",
      });
      break;
  }
};

module.exports.delete = async (req, res) => {
  console.log(req.body);
  await Product.updateOne(
    {
      _id: req.body.id,
    },
    {
      deleted: true,
    }
  );
  req.flash("success", "Xóa thành công !");
  res.json({
    code: "success",
  });
};

module.exports.changePosition = async (req, res) => {
  console.log(req.body);
  await Product.updateOne(
    {
      _id: req.body.id,
    },
    {
      position: req.body.value,
    }
  );
  req.flash("success", "Đổi vị trí thành công !");
  res.json({
    code: "success",
  });
};

module.exports.create = async (req, res) => {
  const listCategory = await ProductCategory.find({
    deleted: false,
  });
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
    listCategory: listCategory,
  });
};

module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countRecord = await Product.countDocuments();
    req.body.position = countRecord + 1;
  }

  const newRecord = new Product(req.body);
  await newRecord.save();

  res.redirect(`/${prefixAdmin}/products`);
};

module.exports.edit = async (req, res) => {
  console.log(req.params.id);

  const product = await Product.findOne({
    _id: req.params.id,
    deleted: false,
  });

  res.render("admin/pages/products/edit", {
    pageTitle: "Chỉnh sửa sản phẩm",
    product: product,
  });
};

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  }

  await Product.updateOne(
    {
      _id: id,
      deleted: false,
    },
    req.body
  );

  req.flash("success", "Cập nhật thành công !");
  res.redirect("back");
};

module.exports.detail = async (req, res) => {
  console.log(req.params.id);

  const product = await Product.findOne({
    _id: req.params.id,
    deleted: false,
  });

  res.render("admin/pages/products/detail", {
    pageTitle: "Chi tiết sản phẩm",
    product: product,
  });
};