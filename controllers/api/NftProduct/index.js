const NftProductModel = require('../../../models/NftProduct');


module.exports = {
    getProducts: async (req, res) => {
        let products = await NftProductModel.all(req.query);
        res.status(200).send({status: true, data: products});
    },
    getProduct: async (req, res) => {
        let product = await NftProductModel.get(req.params.id);
        if (product) {
            res.status(200).send({status: true, data: product});
        } else {
            res.status(400).send({status: false, errors: 'record_not_found'});
        }
    },
    insertProduct: async (req, res) => {
        let result = await NftProductModel.insert(req.body);
        if (result.status) {
            res.status(201).send({status: true, data: {id: result.data.insertId, action: 'insert'}});
        } else {
            res.status(400).send({status: false, errors: result.error});
        }
    }
}