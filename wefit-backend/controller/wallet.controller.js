const { logger } = require('../config/logger');
const {generate_xrp_wallet} = require('../service/wallet.service')

exports.get_xrp_wallet = async(req, res, next) =>{
    try {       
        let resp = await generate_xrp_wallet();
        res.json(resp)
    } catch (err) {
        logger.info("Get wallet error: ", err.message);
        next(err)
    }
}
