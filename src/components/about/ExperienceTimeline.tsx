import { motion } from 'framer-motion';
import { Experience } from '../../types/experience';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.date.split('~')[0].trim()).getTime();
    const dateB = new Date(b.date.split('~')[0].trim()).getTime();
    return dateB - dateA;
  });

  return (
    <div className="space-y-16">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">경력 및 경험</h2>
        </div>
      </div>

      <div className="relative">
        <div className="relative">
          <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400"></div>
          <div className="relative grid grid-cols-3 gap-8">
            {sortedExperiences.map((experience, index) => (
              <motion.div 
                key={experience.id} 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-4 h-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full z-10 shadow-lg">
                  <div className="absolute inset-0 bg-white rounded-full m-0.5"></div>
                </div>
                <div className="mt-8">
                  <div className="text-center text-xs font-medium text-gray-600 mb-2">{experience.date}</div>
                  <motion.div 
                    className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-[8px_8px_16px_rgba(16,185,129,0.2),-8px_-8px_16px_#ffffff] hover:shadow-[inset_8px_8px_16px_rgba(16,185,129,0.15),inset_-8px_-8px_16px_#ffffff] group cursor-pointer transition-all duration-300"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <h3 className="text-lg font-bold text-emerald-800 mb-3 leading-snug">{experience.title}</h3>
                    <p className="text-sm font-medium text-emerald-600 mb-2 leading-relaxed">{experience.role}</p>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed tracking-wide">
                      {experience.description}
                    </p>
                    <div className="space-y-2 text-sm text-gray-600">
                      {experience.details.map((detail, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <p className="leading-relaxed tracking-wide">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline; 