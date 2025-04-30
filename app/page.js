import SendTrasactions from "@/components/SendTrasactions";
import Show from "@/components/Show";
import { SendTransactionError } from "@solana/web3.js";

export default function Home() {
  return (
    <div >
      <Show />
      <SendTrasactions />
    </div>
  );
}
