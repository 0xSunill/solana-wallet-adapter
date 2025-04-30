"use client";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React from 'react'

const Show = () => {
    const { connected, publicKey, wallet, } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState(0);
    // console.log(wallet);


    useEffect(() => {
        const updateBalance = async () => {
          if (!connection || !publicKey) {
            console.error("Wallet not connected or connection unavailable");
          }
    
          try {
            connection.onAccountChange(
              publicKey,
              (updatedAccountInfo) => {
                setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
              },
              "confirmed",
            );
    
            const accountInfo = await connection.getAccountInfo(publicKey);
    
            if (accountInfo) {
              setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
            } else {
              throw new Error("Account info not found");
            }
          } catch (error) {
            console.error("Failed to retrieve account info:", error);
          }
        };
    
        updateBalance();
      }, [connection, publicKey]);
    

    return (
        <div>
            <WalletMultiButton />

            {connected ? (
                <p>Your public key is: {publicKey.toBase58()}</p>
            ) : (
                <p>No wallet connected</p>

            )}

            <div>
                <p>{publicKey ? `Balance: ${balance} SOL` : ""}</p>
            </div>
        </div>
    )
}

export default Show