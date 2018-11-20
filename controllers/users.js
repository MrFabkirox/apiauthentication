module.exports = {
    signUp: async (req, res, next) => {
        /*  // done by module express-promise-router
        try {
            [block]
        } catch(error) {
            next(error)
        }
        */

       // joi validation on Email & Pwd
       // req.value.body used from validation
       console.log('UsersController.signUp() called')
       res.json({
           "req.value.body": req.value.body
       })
    },

    signIn: async (req, res, next) => {
        // Generate token
        console.log('UsersController.signIn() called')
    },

    secret: async (req, res, next) => {
       console.log('UsersController.secret() called')
    }
}
