router.get("/products", productController.getAllProducts);
router.get("/products/:productId", productController.getProductById);