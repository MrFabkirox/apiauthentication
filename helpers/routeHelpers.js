const Joi = require('joi')

module.exports = {

    // see project docker_node_mongo_t for other organization
    validateBody: (schema) => {
        return (req, res, next) => {

            // result of the compare of req.body to the Joi schema
            const result = Joi.validate(req.body, schema)

            // if validation error, will trigger to user route validateBody
            if(result.error) {
                return res.status(400).json(result.error)
            }

            // validated value in req.value.body instead raw req.body
            // for that 1. initalization empty req.value if it doesn t exist
            if (!req.value) { req.value = {};}

            // 2. creation of sub object body with req.value
            req.value['body'] = result.value;

            // if ok continue to route call and pass req.value.body to users controller
            next();
        }
    },

    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}
