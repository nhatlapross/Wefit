const express = require('express');
const walletController = require("../controller/wallet.controller")

const walletRouter = express.Router();

walletRouter.route('/').get(walletController.get_xrp_wallet);

module.exports = walletRouter;