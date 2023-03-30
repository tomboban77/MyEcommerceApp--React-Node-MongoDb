const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.get("/top", getTopProducts);
router.post("/", protect, admin, createProduct);
router.post("/:id/reviews", protect, createProductReview);
router.get("/:id", getProductById);
router.delete("/:id", protect, admin, deleteProduct);
router.put("/:id", protect, admin, updateProduct);

module.exports = router;
