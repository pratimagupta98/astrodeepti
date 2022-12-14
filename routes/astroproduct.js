const express = require("express");
const router = express.Router();
 

const {
    add_astro_product,
    product_consltnt_list,
    productlist,
    editCategory,
    dltCategory,
    astro_product_list,
    del_astro_product

} = require("../controller/astroproduct");

 
 
 router.post("/user/add_astro_product", add_astro_product);
  router.get("/user/product_consltnt_list/:id", product_consltnt_list);
  router.get("/user/productlist/:id", productlist);
 router.get("/admin/astro_product_list", astro_product_list);
   router.get("/admin/del_astro_product/:id", del_astro_product);

module.exports = router;

