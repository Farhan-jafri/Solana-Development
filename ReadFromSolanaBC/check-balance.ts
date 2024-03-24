import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if(!suppliedPublicKey){
    throw new Error("Provide a public key to check the balance of!")
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const publicKey = new PublicKey(suppliedPublicKey);
const balance = await connection.getBalance(publicKey);
const balanceInSol = balance/LAMPORTS_PER_SOL

console.log(`The balance of the account at ${publicKey} is ${balanceInSol} SOL`); 
console.log('Connected!')