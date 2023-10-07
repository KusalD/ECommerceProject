const router = require("express").Router();
const cartCtr = require("./cart.controller");


router.get("/getCart", cartCtr.getCart);
router.post("/postCart", cartCtr.postCart);
router.put("/updateCart", cartCtr.updateCart);
router.delete("/deleteCart", cartCtr.deleteCart);