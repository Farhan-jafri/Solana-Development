import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

async function lookUpSolanaWallet() {
    //Establish Connection to Solana Mainnet
    const connection  = new Connection("https://api.mainnet.solana.com","confirmed")

    try{
        const walletsToLookup = ['GgJJRwLg9NzFQ97o1CJLGLp1KLSUMBwFc6eQNVEr4fbW', 'DtvCuBKG2hrLL7mVUGmaRRv4pFfMAQP7jdyTih9TX5aR', 'mccann.sol']

        for( const wallet of walletsToLookup){
            try{
                //Fetch account information
                const publicKey = new PublicKey(wallet);
                const balance = await connection.getBalance(publicKey);
                const balanceInSol = balance/LAMPORTS_PER_SOL
                console.log(`The balance of the account at ${publicKey} is ${balanceInSol} SOL`);
            } catch (error) {
                console.error(`Error looking up "${wallet}":`, error.message);
            }
        }
    } catch (error) {
        console.error('Error connecting to Solana Mainnet:', error.message);
    }
}

lookUpSolanaWallet();