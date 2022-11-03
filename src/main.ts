import {ethers, Transaction} from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

let PROVIDER, PK, to: string, data: string;

if (process.env.PROVIDER === undefined) {
    throw new Error('No provider url')
} else {
    PROVIDER = process.env.PROVIDER;
}

if (process.env.PRIVATE_KEY === undefined) {
    throw new Error('No private key')
} else {
    PK = process.env.PRIVATE_KEY;
}

if (process.env.DATA === undefined) {
    throw new Error('No data')
} else {
    data = process.env.DATA;
}

if (process.env.TO === undefined) {
    throw new Error('No TO address')
} else {
    to = process.env.TO;
}

const provider = new ethers.providers.JsonRpcProvider(PROVIDER);
const signer = new ethers.Wallet(PK, provider);

async function main() {
    const nonce = await signer.getTransactionCount();

    const tx = {
        to: to,
        data: data
    }

    console.log(await signer.sendTransaction(tx));
}

main()
    .then(() => {
        console.log('Finished');
    })
    .catch(err => {
        console.log('Error = ', err)
    });