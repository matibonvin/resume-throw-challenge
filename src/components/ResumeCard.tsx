import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useMemo } from "react";

export interface Resume {
  name: string;
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  education: {
    degree: string;
    school: string;
    year: string;
  };
  skills: string[];
}

interface ResumeCardProps {
  onHire: () => void;
  onReject: (resumeData: Resume) => void;
}

const resumeTemplates: Resume[] = [
  {
    name: "John Developer",
    experience: [
      {
        title: "Senior Software Engineer",
        company: "TechCorp Inc.",
        period: "2020-Present",
        description: "Led development of core platform features"
      },
      {
        title: "Software Engineer",
        company: "StartupXYZ",
        period: "2018-2020",
        description: "Full-stack development and API design"
      }
    ],
    education: {
      degree: "B.S. Computer Science",
      school: "Tech University",
      year: "2018"
    },
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS"]
  },
  {
    name: "Sarah Data Scientist",
    experience: [
      {
        title: "Data Scientist",
        company: "Analytics Co.",
        period: "2019-Present",
        description: "Leading machine learning initiatives"
      },
      {
        title: "Data Analyst",
        company: "BigData Inc.",
        period: "2017-2019",
        description: "Statistical analysis and data visualization"
      }
    ],
    education: {
      degree: "M.S. Data Science",
      school: "Data University",
      year: "2017"
    },
    skills: ["Python", "TensorFlow", "SQL", "R", "Tableau"]
  }
];

const ResumeCard = ({ onHire, onReject }: ResumeCardProps) => {
  const selectedResume = useMemo(() => 
    resumeTemplates[Math.floor(Math.random() * resumeTemplates.length)],
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-[600px] p-6 bg-white shadow-lg">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{selectedResume.name}</h2>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Experience</h3>
            <div className="pl-4 space-y-2">
              {selectedResume.experience.map((exp, index) => (
                <div key={index}>
                  <p className="font-medium">{exp.title}</p>
                  <p className="text-sm text-gray-600">{exp.company} • {exp.period}</p>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-700 mt-4">Education</h3>
            <div className="pl-4">
              <p className="font-medium">{selectedResume.education.degree}</p>
              <p className="text-sm text-gray-600">
                {selectedResume.education.school} • {selectedResume.education.year}
              </p>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-700 mt-4">Skills</h3>
            <div className="pl-4 flex flex-wrap gap-2">
              {selectedResume.skills.map((skill) => (
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
            onClick={() => onReject(selectedResume)}
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
