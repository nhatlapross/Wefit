import express from 'express';
import axios from 'axios';
import { AptosClient, AptosAccount, Types, HexString } from "aptos";
import { Aptos, AptosConfig, MoveStructId, Network } from '@aptos-labs/ts-sdk';
import cors from 'cors';

const aptos = new Aptos(
    new AptosConfig({ network: 'testnet' as Network })
);

const app = express();
const port = 3003;

// Configure the client to use the devnet network
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com');

app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only your Next.js app origin
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));

//create challenge
app.post('/challenge', async (req, res) => {
  try {
    const client = new AptosClient('https://api.testnet.aptoslabs.com/v1');
    const contractAddress = "0xe492e1767c795cb66fa5f8d40f19a806c472bf56eecd0d03afe21c1ba8877b07";
    const privateKey = "0xf29d8be243551671c7949f59538980de229cc62061a95ce1505a790f955068e5"
    const moduleName = "wefit"    
    const functionName = "init_challenge"
    const account = new AptosAccount(new HexString(privateKey).toUint8Array());
    const addr = account.address()
    const symbol = 'PQD'
    
    const payload: Types.TransactionPayload = {
        type: "entry_function_payload",
        function: `${contractAddress}::${moduleName}::${functionName}`,
        type_arguments:[],
        arguments: [],          
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

app.post('/register', async (req, res) => {
  try {
    const client = new AptosClient('https://api.testnet.aptoslabs.com/v1');
    const contractAddress = "0xe492e1767c795cb66fa5f8d40f19a806c472bf56eecd0d03afe21c1ba8877b07";
    const privateKey = "0xf29d8be243551671c7949f59538980de229cc62061a95ce1505a790f955068e5"
    const moduleName = "wefit"    
    const functionName = "register"
    const account = new AptosAccount(new HexString(privateKey).toUint8Array());
    const addr = account.address()
    const symbol = 'PQD'
    
    const payload: Types.TransactionPayload = {
        type: "entry_function_payload",
        function: `${contractAddress}::${moduleName}::${functionName}`,
        type_arguments:[],
        arguments: [
          2411,
          "wefit@gmail.com"
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
    const email = req.body.email
    const client = new AptosClient('https://api.testnet.aptoslabs.com/v1');
    const contractAddress = "0xe492e1767c795cb66fa5f8d40f19a806c472bf56eecd0d03afe21c1ba8877b07";
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
          2411,
          email
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