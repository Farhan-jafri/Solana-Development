import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

function isValidSolanaAddress(address: string): boolean {
    // Regular expression for validating Solana addresses
    const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{44}$/;
    return solanaAddressRegex.test(address);
};

function checkBalance(solanaAddress: string, amount: number) {
    if (isValidSolanaAddress(solanaAddress)) {
        // Proceed with transaction
        console.log(`The balance of the account at ${solanaAddress} is ${amount} SOL`);
    } else {
        // Handle invalid address
        console.error('Invalid Solana wallet address:', solanaAddress);
        // Provide user feedback or take appropriate action
        // For example: display an error message to the user
        // alert('Invalid Solana wallet address. Please enter a valid address.');
    }
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const publicKey = new PublicKey("DM5XNfeZBF4SfY497AWq5DxXoQh9JUMhF916rSqRpkZd");
const pKey = publicKey.toString()
const balance = await connection.getBalance(publicKey);
const balanceInSol = balance/LAMPORTS_PER_SOL

checkBalance(pKey,balanceInSol);