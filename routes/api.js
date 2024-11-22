const express = require('express');
const apiPath = '/api';
const router = express.Router();
const validate = require('../middleware/validate');

const nftProductController = require('../controllers/api/NftProduct');
const nftProductSchema = require('../validators/NftProduct');


router.get(apiPath + '/nft-product', nftProductController.getProducts);
router.post(apiPath + '/nft-product', validate(nftProductSchema), nftProductController.insertProduct);
router.get(apiPath + '/nft-product/:id', nftProductController.getProduct);

module.exports = router;