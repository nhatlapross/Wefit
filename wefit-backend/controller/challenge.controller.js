const { logger } = require('../config/logger');
const {createChallenge, withDraw, createChallengeConfig, getChallengeById} = require('../service/challenge.service')

exports.createChallenge = async(req, res, next) =>{
    try {
        let request = {
            challengeId: req.body.challengeId,
            amount: req.body.amount
        }
        let resp = await createChallenge(request);
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Create challenge error: ", err.message);
        next(err)
    }
}

exports.withDrawChallenge = async(req, res, next) =>{
    try {
        let request = {
            sender: req.body.sender,
            amount: req.body.amount,
            challengeId: req.body.challengeId
        }
        let resp = await withDraw(request)
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Withdraw challenge error: ", err.message)
        next(err)
    }
}

exports.createChallengeConfig = async(req, res, next) =>{
    try {
        let request = {
            configId: req.body.configId,
            duration: req.body.duration,
            symbol: req.body.symbol,
            challengeId: req.body.challengeId,
            bidRate: req.body.bidRate
        }
        let resp = await createChallengeConfig(request)
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Create challenge config error: ", err.message)
        next(err)
    }
}

exports.getChallengeById = async(req, res, next) =>{
    try {
        let request = {
            challengeId: req.body.challengeId,
        }
        let resp = await getChallengeById(request)
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Get challenge id error: ", err.message)
        next(err)
    }
}
