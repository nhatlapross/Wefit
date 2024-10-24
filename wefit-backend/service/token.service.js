const Contract = require('web3-eth-contract');
const {wefitCfg, contractParams} = require('../config/vars')
const {getNonce} = require('./priceFeed_service')

const tokenAbi = require("../abi/tokenAbi.json");
const {provider} = require('../utils/provider')

Contract.setProvider(provider)

exports.setAdminToken = async(req) =>{
    let contract = new Contract(tokenAbi, wefitCfg.wefitTokenAddress)
    let nonce = await getNonce(wefitCfg.contractOwnerAddr)
    try {
        let receipt = await contract.methods.addWhiteListAddress(req.admin).send(Object.assign(contractParams, {nonce: nonce}))
        return receipt
    } catch (err) {
        return err.message
    }
}