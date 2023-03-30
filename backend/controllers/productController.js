const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

//@desc:Get all products
//@access: public
// If there is ? = etc, use query to get that
// regex: if we type tph , to bring up iphone
// i: case insensitive

exports.getProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error(error, "Error");
  }
});

//@desc:Get single product
//@access: public

exports.getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error, "Error");
  }
});

//@desc:Delete a single product
//@access: private Admin

exports.deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product Removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error, "Error");
  }
});

//@desc:Create a single product
//@access: private Admin post

exports.createProduct = asyncHandler(async (req, res) => {
  try {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    const createProduct = await product.save();
    res.status(201).json(createProduct);
  } catch (error) {
    console.error(error, "Error");
  }
});

//@desc:Update a single product
//@access: private Admin Put req

exports.updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, brand, category, image, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      (product.name = name),
        (product.price = price),
        (product.description = description),
        (product.brand = brand),
        (product.category = category),
        (product.image = image),
        (product.countInStock = countInStock);

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error, "Error");
  }
});

//@desc:Create new review
//@access: private Post req

exports.createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400).json({ message: "Product Already Rated" });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({
      message: "Review Added",
    });
  } else {
    res.status(404).json({
      message: "Product not found",
    });
  }
});

//@desc:Get Top rated products
//@access: public get

exports.getTopProducts = asyncHandler(async (req, res) => {
  try {
    // sort the products in ascending order and get limit:no of prodcts u want
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
  } catch (error) {
    console.error(error, "Error");
  }
});
