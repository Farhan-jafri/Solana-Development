import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    LAMPORTS_PER_SOL,
  } from "@solana/web3.js";
  import "dotenv/config"
  import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToPubKey = process.argv[2] || null;

if(!suppliedToPubKey){
    console.log(`Please provide a public key to send to`);
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubkey: ${suppliedToPubKey}`)

const toPubKey = new PublicKey(suppliedToPubKey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

await airdropIfRequired(
    connection,
    senderKeypair.publicKey,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL,
);

const balance = await connection.getBalance(senderKeypair.publicKey);

console.log(balance)

const transaction = new Transaction();
const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey:senderKeypair.publicKey,
    toPubkey:toPubKey,
    lamports:LAMPORTS_TO_SEND
});

transaction.add(sendSolInstruction);
const signature = await sendAndConfirmTransaction(connection,transaction,[
    senderKeypair,
])

console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubKey}. `
  );
  console.log(`Transaction signature is ${signature}!`);