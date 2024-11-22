const { getDB } = require('../index.js')

class CurrencyModel {
    /**
     * @description initialize vue axios
     */
    static async get(currency_id, defaultValue = null) {
        return await new Promise((resolve, reject) => {
            getDB().query('SELECT * FROM currencies WHERE `id` = ?', [currency_id], (error, currency) => {
                if (error) {
                    return reject(error);
                }

                return resolve((currency.length === 1 ? currency[0] : defaultValue));
            });
        });
    }
}

module.exports = CurrencyModel;