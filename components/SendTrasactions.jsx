"use client";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { useState } from 'react';

const SendTransactions = () => {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [status, setStatus] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!publicKey) {
            setStatus("Wallet not connected");
            return;
        }

        try {
            const recipientPubKey = new PublicKey(event.target.recipient.value);
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: recipientPubKey,
                    lamports: 0.1 * LAMPORTS_PER_SOL,
                })
            );

            const signature = await sendTransaction(transaction, connection);
            setStatus(`Transaction sent! Signature: ${signature}`);
        } catch (error) {
            console.error("Transaction failed", error);
            setStatus("Transaction failed");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="recipient"
                    type="text"
                    placeholder="Recipient public key"
                    required
                />
                <button className='p-3 ml-4 border-2 bg-blue-600 ' type="submit">Send 0.1 SOL</button>
            </form>
            <p>{status}</p>
        </div>
    );
};

export default SendTransactions;
