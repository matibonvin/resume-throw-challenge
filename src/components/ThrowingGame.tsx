import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ThrowingGame = () => {
  const [angle, setAngle] = useState(45);
  const [power, setPower] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const generateTrajectoryKeyframes = (angle: number, power: number) => {
    const frames = [];
    const radians = (angle * Math.PI) / 180;
    const velocity = power * 0.15; // Reduced velocity multiplier for better gameplay
    const gravity = 9.81;
    const duration = 2;
    const steps = 60;
    
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * duration;
      // Adjusted scale factors for better visual trajectory
      const x = velocity * Math.cos(radians) * t * 80;
      const y = (velocity * Math.sin(radians) * t - (gravity * t * t) / 2) * -50;
      frames.push({ x, y });
    }
    
    return frames;
  };

  const checkBasketCollision = (trajectory: { x: number; y: number }[]) => {
    // Adjusted basket position and collision detection
    const basketX = 350; // Moved basket slightly left
    const basketY = -50; // Raised basket position
    const basketWidth = 40;
    const basketHeight = 30;

    for (let point of trajectory) {
      if (
        point.x >= basketX - basketWidth / 2 &&
        point.x <= basketX + basketWidth / 2 &&
        point.y >= basketY - basketHeight / 2 &&
        point.y <= basketY + basketHeight / 2
      ) {
        return true;
      }
    }
    return false;
  };

  const throwBall = () => {
    setIsAnimating(true);
    setAttempts(prev => prev + 1);
    
    const trajectory = generateTrajectoryKeyframes(angle, power);
    const isBasketHit = checkBasketCollision(trajectory);

    setTimeout(() => {
      setIsAnimating(false);
      if (isBasketHit) {
        setScore(prev => prev + 1);
        toast.success(`Scored! (${score + 1}/${attempts + 1} shots made)`);
      } else {
        toast.error(`Miss! (${score}/${attempts + 1} shots made)`);
      }
    }, 2000);
  };

  return (
    <div className="relative h-[600px] w-full bg-blue-50 overflow-hidden">
      {/* Game controls */}
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-lg w-64">
        <div className="space-y-4">
          <div className="text-center mb-4">
            <p className="font-bold text-lg">Score: {score}/{attempts}</p>
            <p className="text-sm text-gray-600">
              Accuracy: {attempts > 0 ? Math.round((score/attempts) * 100) : 0}%
            </p>
          </div>
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
                x: generateTrajectoryKeyframes(angle, power).map(p => p.x),
                y: generateTrajectoryKeyframes(angle, power).map(p => p.y),
                rotate: [0, 720],
              }
            : {
                x: 0,
                y: 0,
                rotate: 0,
              }
        }
        transition={{
          duration: 2,
          ease: "linear",
          times: Array.from({ length: 61 }, (_, i) => i / 60),
        }}
      >
        <div className="w-8 h-8 bg-white rounded-full border-2 border-gray-300 shadow-md transform transition-transform hover:scale-105" />
      </motion.div>

      {/* Basket - adjusted position */}
      <div className="absolute right-60 bottom-40">
        <div className="w-16 h-16 border-4 border-orange-500 rounded-b-full transform -rotate-12" />
        <div className="w-2 h-20 bg-gray-800 absolute -right-2 top-0" />
      </div>
    </div>
  );
};

export default ThrowingGame;