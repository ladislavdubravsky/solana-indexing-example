import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloWorld } from "../target/types/hello_world";
import dotenv from "dotenv"; 

dotenv.config();

async function main() {
    anchor.setProvider(anchor.AnchorProvider.local());

    const program = anchor.workspace.HelloWorld as Program<HelloWorld>;

    const tx = await program.methods.initialize().rpc();
    console.log("Success, transaction signature", tx);
}

main().then(() => process.exit());