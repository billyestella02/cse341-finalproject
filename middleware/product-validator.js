import validator from "../helpers/validate.js";

const validateProduct = async (req, res, next) => {
    const validationRule = {
        product: 'required|string',
        name: 'required|string',
        description: 'required|string',
        type: 'required|string',
        size: 'required|string',
        color: 'required|string',
        // price
        stock: "min:0"
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    })
    .catch( err => console.log(err));

};

export default { validateProduct } ;