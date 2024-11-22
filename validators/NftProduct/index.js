const yup = require('yup');

const productSchema = yup.object({
    type: yup.string().strict().required('Type is required'),
    title: yup.string().strict().required('Title is required'),
    currency_id: yup.number().required('Currency is required'),
    price: yup.number().required('Price is required'),
    image_url: yup.string().strict().required('Image Url is required'),
});

module.exports = productSchema;