const Product = require("../../models/product.model");

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

  const products = await Product.find(find).limit(limitItems).skip(skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    totalPage: totalPage,
    currentPage: page,
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
  res.json({
    code: "success",
    message: "Đổi trạng thái thành công!",
  });
};

module.exports.changeMulti = async (req, res) => {
  console.log(req.body);
  await Product.updateMany(
    {
      _id: req.body.ids,
    },
    {
      status: req.body.status,
    }
  );
  res.json({
    code: "success",
    message: "Đổi trạng thái thành công!",
  });
};

module.exports.delete = async (req, res) => {
  console.log(req.body);
  await Product.deleteOne({
    _id: req.body.id,
  });
  res.json({
    code: "success",
    message: "Xóa thành công!",
  });
};