import express from 'express';
import axios from 'axios';
import { AptosClient, AptosAccount, Types, HexString } from "aptos";
import { Aptos, AptosConfig, MoveStructId, Network } from '@aptos-labs/ts-sdk';

const aptos = new Aptos(
    new AptosConfig({ network: 'testnet' as Network })
);

const app = express();
const port = 3003;

// Configure the client to use the devnet network
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com');

app.use(express.json());

//create challenge
app.post('/challenge', async (req, res) => {
  try {
    const client = new AptosClient('https://api.testnet.aptoslabs.com/v1');
    const contractAddress = "0x73722d480a7a95ef700c10a5649836bcfd735ce2f74363cca1a26a4695014128";
    const privateKey = "0xf29d8be243551671c7949f59538980de229cc62061a95ce1505a790f955068e5"
    const moduleName = "wefit"    
    const functionName = "initialize_game"
    const account = new AptosAccount(new HexString(privateKey).toUint8Array());
    const addr = account.address()
    const symbol = 'PQD'
    
    const payload: Types.TransactionPayload = {
        type: "entry_function_payload",
        function: `${contractAddress}::${moduleName}::${functionName}`,
        type_arguments:[],
        arguments: [
          "0xe8ec9945a78a48452def46207e65a0a4ed6acd400306b977020924ae3652ab85",
          "PQD",
          'PQD',
          1,
          1
        ],          
    };
    
    const rawTxn = await client.generateTransaction(account.address(), payload);
    const signedTxn = await client.signTransaction(account, rawTxn);
    const pendingTxn = await client.submitTransaction(signedTxn);
    const txnResult = await client.waitForTransaction(pendingTxn.hash);

    res.json({"tx_hash":pendingTxn.hash})

  } catch (error) {    
    res.status(500).json({ success: false, error: error });
  }
});

app.post('/claim', async (req, res) => {
  try {
    const address = req.body.address
    const client = new AptosClient('https://api.testnet.aptoslabs.com/v1');
    const contractAddress = "0x73722d480a7a95ef700c10a5649836bcfd735ce2f74363cca1a26a4695014128";
    const privateKey = "0xf29d8be243551671c7949f59538980de229cc62061a95ce1505a790f955068e5"
    const moduleName = "wefit"    
    const functionName = "claim"
    const account = new AptosAccount(new HexString(privateKey).toUint8Array());
    const addr = account.address()
    const symbol = 'PQD'
    
    const payload: Types.TransactionPayload = {
        type: "entry_function_payload",
        function: `${contractAddress}::${moduleName}::${functionName}`,
        type_arguments:[],
        arguments: [
          address
        ],          
    };
    
    const rawTxn = await client.generateTransaction(account.address(), payload);
    const signedTxn = await client.signTransaction(account, rawTxn);
    const pendingTxn = await client.submitTransaction(signedTxn);
    const txnResult = await client.waitForTransaction(pendingTxn.hash);

    res.json({"tx_hash":pendingTxn.hash})

  } catch (error) {    
    res.status(500).json({ success: false, error: error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});