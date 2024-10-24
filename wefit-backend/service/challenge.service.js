const Contract = require('web3-eth-contract');
const bluebird = require('bluebird'); // eslint-disable-line no-global-assign
const HDWalletProvider = require("@truffle/hdwallet-provider");
const redis = require("redis");
const {wefitCfg} = require("../config/vars");
bluebird.promisifyAll(redis);
const {setAdminToken} = require('./token.service')
const Web3 = require('web3')
const web3 = new Web3(wefitCfg.providerUrl)


//contract config 
const gasPrice = '5000000000'
const maxErc20GasLimit = 500000
const challengeAbi = require("../abi/challengeAbi.json");
const provider = new HDWalletProvider({ 
    privateKeys: [wefitCfg.contractOwnerPriv], 
    providerOrUrl: wefitCfg.providerUrl,
    pollingInterval: 8000
});

const contractParams = {
    from    : wefitCfg.contractOwnerAddr,
    gasPrice: gasPrice,
    gas     : maxErc20GasLimit
};

Contract.setProvider(provider)

exports.createChallenge = async (req)=>{
    let setAdmin = await setAdminToken({admin: wefitCfg.wefitChallengeAddress});
    console.log("Set admin tx: ", setAdmin.transactionHash)
    let contract = new Contract(challengeAbi, wefitCfg.wefitChallengeAddress);
    let nonce = await getNonce(wefitCfg.contractOwnerAddr);
    try {
        let receipt = await contract.methods.createChallenge(req.challengeId, req.amount).send(Object.assign(contractParams, {
            nonce: nonce,
            value: web3.utils.toWei(JSON.stringify(req.amount), 'ether')
        }));
        return receipt;
    } catch (err) {
        return err.message
    }
}

exports.withDraw = async(req) =>{
    let contract = new Contract(challengeAbi, wefitCfg.wefitChallengeAddress)
    let nonce = await getNonce(wefitCfg.contractOwnerAddr)
    try {
        let receipt = await contract.methods.withdrawChallenge(req.sender, req.amount, req.challengeId).send(Object.assign(contractParams, {nonce: nonce}))
        return receipt
    } catch (err) {
        return err.message
    }
}

exports.createChallengeConfig = async(req) =>{
    let contract = new Contract(challengeAbi, wefitCfg.wefitChallengeAddress)
    let nonce = await getNonce(wefitCfg.contractOwnerAddr)
    try {
        let request = [
            req.configId,
            req.challengeId,
            req.duration,
            req.symbol,
            true,
            parseInt(Date.now()/1000),
            parseInt(Date.now()/1000),
            req.bidRate
        ]
        let receipt = await contract.methods.createChallengeConfig(request).send(Object.assign(contractParams, {nonce: nonce}))
        return receipt
    } catch (err) {
        return err.message
    }
}

exports.getChallengeById = async(req) =>{
    let contract = new Contract(challengeAbi, wefitCfg.wefitChallengeAddress)
    let nonce = await getNonce(wefitCfg.contractOwnerAddr)
    try {
        // let request = [
        //     req.configId,
        //     ,
        //     req.duration,
        //     req.symbol,
        //     true,
        //     parseInt(Date.now()/1000),
        //     parseInt(Date.now()/1000),
        //     req.bidRate
        // ]
        let receipt = await contract.methods.getChallengeById(req.challengeId).call()
        console.log("Challenge info: ", receipt)
        return receipt
    } catch (err) {
        return err.message
    }
}