"use client";

import { useState, useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {
  const [rank, setRank] = useState("");
  const [reward, setReward] = useState("");

  // Remove splash screen
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const calculateReward = () => {
    const r = parseInt(rank);

    if (isNaN(r) || r <= 0) {
      setReward("Please enter a valid rank");
      return;
    }

    let rewardAmount = "";

    if (r >= 1 && r <= 3) rewardAmount = "$600";
    else if (r >= 4 && r <= 10) rewardAmount = "$350";
    else if (r >= 11 && r <= 30) rewardAmount = "$125";
    else if (r >= 31 && r <= 80) rewardAmount = "$60";
    else if (r >= 81 && r <= 180) rewardAmount = "$30";
    else if (r >= 181 && r <= 380) rewardAmount = "$20";
    else if (r >= 381 && r <= 780) rewardAmount = "$10";
    else if (r >= 781 && r <= 1580) rewardAmount = "$5";
    else if (r >= 1581 && r <= 3000) rewardAmount = "$3";
    else rewardAmount = "$0 — no reward";

    setReward(`🎉 Your reward is: ${rewardAmount}`);
  };

  const shareMessage = async () => {
    if (!reward.includes("$")) {
      alert("Please calculate your reward before sharing.");
      return;
    }

    const amount = reward.replace("🎉 Your reward is: ", "").trim();
    const message = `Just checked my weekly USDC rewards by entering my rank in this mini app — got ${amount} this week! 💸\n👉 Built by @unknownking: https://farcaster.xyz/miniapps/q7eYtl8drc1F/weekly-reward-checker\nGo check yours too 👀`;

    try {
      await sdk.actions.cast({
        text: message,
      });
    } catch (err) {
      console.error("Failed to cast:", err);
      alert("❌ Something went wrong while sharing. Please try again.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-purple-800 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Weekly USDC Reward Checker
      </h1>

      <input
        type="number"
        placeholder="Enter your rank (e.g. 42)"
        className="border border-white rounded p-2 w-full max-w-xs text-black text-center mb-4 bg-white placeholder-gray-500"
        value={rank}
        onChange={(e) => setRank(e.target.value)}
      />

      <button
        className="bg-white text-purple-800 font-semibold px-4 py-2 rounded hover:bg-gray-200 transition mb-4"
        onClick={calculateReward}
      >
        Check Reward
      </button>

      {reward && (
        <>
          <p className="mt-2 text-xl text-white text-center">{reward}</p>
          <button
            className="mt-4 bg-blue-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={shareMessage}
          >
            📤 Share on Farcaster
          </button>
        </>
      )}
    </main>
  );
}
