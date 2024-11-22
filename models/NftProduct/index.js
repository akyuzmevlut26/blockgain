const {getDB} = require('../index.js');
const CurrencyModel = require('../Currency');

class NftProductModel {
    /**
     * @description initialize vue axios
     */
    static async all(filters = {}) {
        return await new Promise((resolve, reject) => {
            let db = getDB();

            let sql = 'SELECT * FROM nft_products WHERE 1=1';
            if (filters.type && filters.type.trim().length) {
                sql += ' AND product_type = ' + db.escape(filters.type);
            }

            if (filters.price && filters.price.min && filters.price.min.trim().length) {
                sql += ' AND price >= ' + db.escape(parseFloat(filters.price.min));
            }

            if (filters.price && filters.price.max && filters.price.max.trim().length) {
                sql += ' AND price <= ' + db.escape(parseFloat(filters.price.max));
            }

            db.query(sql, (error, records) => {
                if (error) {
                    return reject(error);
                }
                return resolve(records);
            });
        });
    }

    static async get(product_id, defaultValue = null) {
        return await new Promise((resolve, reject) => {
            getDB().query('SELECT * FROM nft_products WHERE `id` = ?', [product_id], (error, product) => {
                if (error) {
                    return reject(error);
                }

                return resolve((product.length === 1 ? product[0] : defaultValue));
            });
        });
    }

    static async insert(data) {
        try {
            let currency = await CurrencyModel.get(data.currency_id);
            if (!currency) {
                throw 'currency_not_found';
            }

            let queryResult = await new Promise((resolve, reject) => {
                getDB().query('INSERT INTO nft_products SET product_type = ?, title = ?, currency_id = ?, price = ?, image_url = ?',
                    [data.type, data.title, currency.id, data.price, data.image_url],
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
            });

            return {
                status: true,
                data: queryResult
            }
        } catch (error) {
            return {
                status: false,
                error: error
            }
        }

    }
}

module.exports = NftProductModel;