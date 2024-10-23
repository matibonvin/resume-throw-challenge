import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeCard from "./ResumeCard";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const GameView = () => {
  const [gameState, setGameState] = useState<"review" | "throwing">("review");

  const handleHire = () => {
    toast.success("Candidate hired! 🎉");
    // Reset game state after hiring
    setTimeout(() => {
      setGameState("review");
    }, 2000);
  };

  const handleReject = () => {
    setGameState("throwing");
    toast.error("Resume rejected! Get ready to shoot!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {gameState === "review" ? (
          <ResumeCard onHire={handleHire} onReject={handleReject} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Coming Soon: Paper Ball Throwing Game! 🎯
            </h2>
            <Button
              onClick={() => setGameState("review")}
              className="mt-4"
            >
              Back to Resume Review
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameView;