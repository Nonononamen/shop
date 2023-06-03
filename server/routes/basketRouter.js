const Router = require('express')
const router = new Router()

const basketController = require('../controllers/basketController')


const authMiddleware = require('../middleware/authMiddleware')

// ------- CRUD корзины ------- //
router.get('/', authMiddleware , basketController.getBasketUser)
router.post('/', authMiddleware , basketController.addToBasket)


module.exports = router