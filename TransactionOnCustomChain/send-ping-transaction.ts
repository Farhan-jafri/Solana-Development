import * as web3 from "@solana/web3.js"
import "dotenv/config"
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";


const payer = getKeypairFromEnvironment("SECRET_KEY")
const connection = new web3.Connection(web3.clusterApiUrl("devnet"))

const newBalance = await airdropIfRequired(
    connection,
    payer.publicKey,
    1*web3.LAMPORTS_PER_SOL,
    0.5*web3.LAMPORTS_PER_SOL
);

//Steps we need to ping program
//1.Create a transaction
//2.Create an instruction
//3.Add the instruction to the transaction
//4.Send the transaction

const PING_PROGRAM_ADDRESS = new web3.PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa')
const PING_PROGRAM_DATA_ADDRESS =  new web3.PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod')

//1. Create a transaction
const transaction = new web3.Transaction();
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS)
const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS)

//2. Create the instuction
const instruction = new web3.TransactionInstruction({
    keys:[
        {
            pubkey:pingProgramDataId,
            isSigner:false,
            isWritable:true
        },
    ],
    programId
})

//3.Add the instruction to the transaction
transaction.add(instruction)

//4.Send the transaction
const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer]
)

console.log(`✅ Transaction completed! Signature is ${signature}`)
//To look Solana Explorer for transactions directly through logs
console.log(`You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)