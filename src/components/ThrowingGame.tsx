import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ThrowingGame = () => {
  const [angle, setAngle] = useState(45);
  const [power, setPower] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });

  const calculateTrajectory = (angle: number, power: number) => {
    const radians = (angle * Math.PI) / 180;
    const velocity = power * 0.2;
    const gravity = 9.81;
    const time = 2;
    
    const x = velocity * Math.cos(radians) * time * 100;
    const y = (velocity * Math.sin(radians) * time - (gravity * time * time) / 2) * -100;
    
    return { x, y };
  };

  const throwBall = () => {
    setIsAnimating(true);
    const trajectory = calculateTrajectory(angle, power);
    
    setBallPosition(trajectory);
    
    // Check if the ball lands in the basket (rough estimation)
    const isBasketHit = 
      trajectory.x > 380 && 
      trajectory.x < 420 && 
      trajectory.y > -50 && 
      trajectory.y < 50;

    setTimeout(() => {
      setIsAnimating(false);
      setBallPosition({ x: 0, y: 0 });
      if (isBasketHit) {
        toast.success("Perfect shot! 🎯");
      } else {
        toast.error("Miss! Try again!");
      }
    }, 2000);
  };

  return (
    <div className="relative h-[600px] w-full bg-blue-50 overflow-hidden">
      {/* Game controls */}
      <div className="absolute bottom-4 left-4 z-10 bg-white p-4 rounded-lg shadow-lg w-64">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Angle: {angle}°</label>
            <Slider
              value={[angle]}
              onValueChange={(value) => setAngle(value[0])}
              min={0}
              max={90}
              step={1}
              disabled={isAnimating}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Power: {power}%</label>
            <Slider
              value={[power]}
              onValueChange={(value) => setPower(value[0])}
              min={0}
              max={100}
              step={1}
              disabled={isAnimating}
            />
          </div>
          <Button 
            onClick={throwBall} 
            disabled={isAnimating}
            className="w-full"
          >
            Throw!
          </Button>
        </div>
      </div>

      {/* Paper ball */}
      <motion.div
        className="absolute bottom-20 left-20"
        animate={
          isAnimating
            ? {
                x: ballPosition.x,
                y: ballPosition.y,
                rotate: 720,
              }
            : {
                x: 0,
                y: 0,
                rotate: 0,
              }
        }
        transition={{
          type: "tween",
          duration: 2,
        }}
      >
        <div className="w-8 h-8 bg-white rounded-full border-2 border-gray-300 shadow-md" />
      </motion.div>

      {/* Basket */}
      <div className="absolute right-40 bottom-20">
        <div className="w-16 h-16 border-4 border-orange-500 rounded-b-full transform -rotate-12" />
        <div className="w-2 h-20 bg-gray-800 absolute -right-2 top-0" />
      </div>
    </div>
  );
};

export default ThrowingGame;