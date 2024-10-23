import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface ResumeCardProps {
  onHire: () => void;
  onReject: () => void;
}

const ResumeCard = ({ onHire, onReject }: ResumeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-[600px] p-6 bg-white shadow-lg">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">John Developer</h2>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Experience</h3>
            <div className="pl-4 space-y-2">
              <div>
                <p className="font-medium">Senior Software Engineer</p>
                <p className="text-sm text-gray-600">TechCorp Inc. • 2020-Present</p>
                <p className="text-sm text-gray-600">Led development of core platform features</p>
              </div>
              <div>
                <p className="font-medium">Software Engineer</p>
                <p className="text-sm text-gray-600">StartupXYZ • 2018-2020</p>
                <p className="text-sm text-gray-600">Full-stack development and API design</p>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-700 mt-4">Education</h3>
            <div className="pl-4">
              <p className="font-medium">B.S. Computer Science</p>
              <p className="text-sm text-gray-600">Tech University • 2018</p>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-700 mt-4">Skills</h3>
            <div className="pl-4 flex flex-wrap gap-2">
              {["React", "TypeScript", "Node.js", "Python", "AWS"].map((skill) => (
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
        
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={onReject}
            variant="destructive"
            className="w-32 gap-2"
          >
            <X className="w-4 h-4" />
            Reject
          </Button>
          <Button
            onClick={onHire}
            variant="default"
            className="w-32 gap-2 bg-green-600 hover:bg-green-700"
          >
            <Check className="w-4 h-4" />
            Hire
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ResumeCard;