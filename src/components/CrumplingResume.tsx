import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface CrumplingResumeProps {
  onComplete: () => void;
  resumeData: {
    name: string;
    experience: Array<{
      title: string;
      company: string;
      period: string;
    }>;
    education: {
      degree: string;
      school: string;
      year: string;
    };
    skills: string[];
  };
}

const CrumplingResume = ({ onComplete, resumeData }: CrumplingResumeProps) => {
  const [clicks, setClicks] = useState(0);
  const requiredClicks = 5;

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    
    if (newClicks === requiredClicks) {
      toast.success("Resume crumpled! Time to play!");
      onComplete();
    } else {
      toast(`Click ${requiredClicks - newClicks} more times to crumple!`);
    }
  };

  const scale = 1 - (clicks * 0.15);
  const rotate = clicks * 15;

  return (
    <motion.div
      animate={{
        scale,
        rotate,
        borderRadius: `${clicks * 20}px`,
      }}
      transition={{ type: "spring", duration: 0.5 }}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Card className="w-[600px] p-6 bg-white shadow-lg opacity-90">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{resumeData.name}</h2>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Experience</h3>
            <div className="pl-4 space-y-2">
              {resumeData.experience.slice(0, 1).map((exp, index) => (
                <div key={index}>
                  <p className="font-medium">{exp.title}</p>
                  <p className="text-sm text-gray-600">{exp.company} • {exp.period}</p>
                </div>
              ))}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-700 mt-4">Education</h3>
            <div className="pl-4">
              <p className="font-medium">{resumeData.education.degree}</p>
              <p className="text-sm text-gray-600">{resumeData.education.school} • {resumeData.education.year}</p>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-700 mt-4">Skills</h3>
            <div className="pl-4 flex flex-wrap gap-2">
              {resumeData.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CrumplingResume;