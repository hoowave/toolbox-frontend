import { motion } from 'framer-motion';
import { Project } from '../../types/experience';
import { useState } from 'react';

interface ProjectTimelineProps {
  mainProjects: Project[];
  toyProjects: Project[];
  legacyProjects: Project[];
  viewMode: 'project' | 'date';
  setViewMode: (mode: 'project' | 'date') => void;
}

const ProjectTimeline = ({ 
  mainProjects, 
  toyProjects, 
  legacyProjects, 
  viewMode, 
  setViewMode 
}: ProjectTimelineProps) => {
  const [filters, setFilters] = useState({
    main: true,
    toy: true,
    legacy: true
  });

  const allProjects = [
    ...(filters.main ? mainProjects.map(project => ({ ...project, color: 'blue' })) : []),
    ...(filters.toy ? toyProjects.map(project => ({ ...project, color: 'purple' })) : []),
    ...(filters.legacy ? legacyProjects.map(project => ({ ...project, color: 'gray' })) : [])
  ].sort((a, b) => {
    const dateA = new Date(a.date.split('~')[0].trim()).getTime();
    const dateB = new Date(b.date.split('~')[0].trim()).getTime();
    return dateB - dateA;
  });

  const handleFilterChange = (type: 'main' | 'toy' | 'legacy') => {
    setFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const getColorClass = (type: string, variant: string) => {
    switch (type) {
      case 'blue':
        return `text-blue-${variant}`;
      case 'purple':
        return `text-purple-${variant}`;
      case 'gray':
        return `text-gray-${variant}`;
      default:
        return `text-gray-${variant}`;
    }
  };

  const getShadowClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'shadow-[8px_8px_16px_rgba(37,99,235,0.2),-8px_-8px_16px_#ffffff] hover:shadow-[inset_8px_8px_16px_rgba(37,99,235,0.15),inset_-8px_-8px_16px_#ffffff]';
      case 'purple':
        return 'shadow-[8px_8px_16px_rgba(147,51,234,0.2),-8px_-8px_16px_#ffffff] hover:shadow-[inset_8px_8px_16px_rgba(147,51,234,0.15),inset_-8px_-8px_16px_#ffffff]';
      case 'gray':
        return 'shadow-[8px_8px_16px_rgba(75,85,99,0.2),-8px_-8px_16px_#ffffff] hover:shadow-[inset_8px_8px_16px_rgba(75,85,99,0.15),inset_-8px_-8px_16px_#ffffff]';
      default:
        return 'shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff]';
    }
  };

  const getBorderClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border border-blue-100';
      case 'purple':
        return 'border border-purple-100';
      case 'gray':
        return 'border border-gray-100';
      default:
        return 'border border-gray-100';
    }
  };

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
    <motion.div 
      key={project.id} 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="text-center text-xs font-medium text-gray-600 mb-2">{project.date}</div>
      <motion.div 
        className={`bg-white p-6 rounded-3xl ${getBorderClass(project.color)} ${getShadowClass(project.color)} group cursor-pointer transition-all duration-300`}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <h3 className={`text-lg font-bold ${getColorClass(project.color, '800')} mb-3 leading-snug`}>{project.title}</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed tracking-wide">
          {project.description}
        </p>
        {project.subDescription && (
          <div className="mt-3 text-sm text-gray-600 space-y-2">
            {Array.isArray(project.subDescription) ? (
              project.subDescription.map((desc, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <span className={getColorClass(project.color, '500') + " mt-1"}>•</span>
                  <p className="leading-relaxed tracking-wide">{desc}</p>
                </div>
              ))
            ) : (
              <div className="flex items-start space-x-2">
                <span className={getColorClass(project.color, '500') + " mt-1"}>•</span>
                <p className="leading-relaxed tracking-wide">{project.subDescription}</p>
              </div>
            )}
          </div>
        )}
        <div className="mt-5 flex gap-2 justify-center">
          {project.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className={`px-4 py-1.5 text-sm bg-white ${getColorClass(project.color, '600')} rounded-xl ${getShadowClass(project.color)} transition-all duration-300`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  const TimelineDot = ({ project }: { project: Project }) => {
    const getBgColorClass = (color: string) => {
      switch (color) {
        case 'blue':
          return 'bg-gradient-to-r from-blue-500 to-blue-600';
        case 'purple':
          return 'bg-gradient-to-r from-purple-500 to-purple-600';
        case 'gray':
          return 'bg-gradient-to-r from-gray-500 to-gray-600';
        default:
          return 'bg-gradient-to-r from-gray-500 to-gray-600';
      }
    };

    return (
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-4 h-4 ${getBgColorClass(project.color)} rounded-full z-10 shadow-lg`}>
          <div className="absolute inset-0 bg-white rounded-full m-0.5"></div>
        </div>
      </motion.div>
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">프로젝트 타임라인</h2>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4">
            <button 
              onClick={() => handleFilterChange('main')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-white rounded-xl shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] transition-all duration-300 ${filters.main ? 'shadow-[inset_2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] text-blue-600' : 'text-gray-400'}`}
            >
              <div className="relative w-3 md:w-4 h-3 md:h-4 border-2 rounded border-current transition-colors">
                {filters.main && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 m-0.5 bg-blue-600 rounded-sm"
                  />
                )}
              </div>
              <span className="text-sm md:text-base">메인</span>
            </button>
            <button 
              onClick={() => handleFilterChange('toy')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-white rounded-xl shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] transition-all duration-300 ${filters.toy ? 'shadow-[inset_2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] text-purple-600' : 'text-gray-400'}`}
            >
              <div className="relative w-3 md:w-4 h-3 md:h-4 border-2 rounded border-current transition-colors">
                {filters.toy && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 m-0.5 bg-purple-600 rounded-sm"
                  />
                )}
              </div>
              <span className="text-sm md:text-base">토이</span>
            </button>
            <button 
              onClick={() => handleFilterChange('legacy')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-white rounded-xl shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] transition-all duration-300 ${filters.legacy ? 'shadow-[inset_2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] text-gray-600' : 'text-gray-400'}`}
            >
              <div className="relative w-3 md:w-4 h-3 md:h-4 border-2 rounded border-current transition-colors">
                {filters.legacy && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 m-0.5 bg-gray-600 rounded-sm"
                  />
                )}
              </div>
              <span className="text-sm md:text-base">레거시</span>
            </button>
          </div>
          <div className="relative w-full md:w-auto">
            <select 
              className="w-full md:w-auto appearance-none px-4 md:px-6 py-2 md:py-2.5 bg-white rounded-xl text-sm md:text-base text-gray-700 shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer pr-10 transition-all duration-300"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as 'project' | 'date')}
            >
              <option value="project" className="py-2">프로젝트순</option>
              <option value="date" className="py-2">날짜순</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative space-y-12 md:space-y-16">
        {viewMode === 'project' ? (
          <>
            {/* Main Projects Timeline */}
            {filters.main && mainProjects.length > 0 && (
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"></div>
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {mainProjects.map((project) => (
                    <TimelineDot key={project.id} project={{ ...project, color: 'blue' }} />
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {mainProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={{ ...project, color: 'blue' }} index={index} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Toy Projects Timeline */}
            {filters.toy && toyProjects.length > 0 && (
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400"></div>
                <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {toyProjects.map((project) => (
                    <TimelineDot key={project.id} project={{ ...project, color: 'purple' }} />
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {toyProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={{ ...project, color: 'purple' }} index={index} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Legacy Projects Timeline */}
            {filters.legacy && legacyProjects.length > 0 && (
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400"></div>
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {legacyProjects.map((project) => (
                    <TimelineDot key={project.id} project={{ ...project, color: 'gray' }} />
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {legacyProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={{ ...project, color: 'gray' }} index={index} />
                  ))}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <>
            {/* Date view */}
            <div className="relative">
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-purple-400"></div>
              <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {allProjects.slice(0, 3).map((project) => (
                  <TimelineDot key={project.id} project={project} />
                ))}
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {allProjects.slice(0, 3).map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </div>

            {allProjects.length > 3 && (
              <div className="relative">
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-purple-400"></div>
                <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                  {allProjects.slice(3, 6).map((project) => (
                    <TimelineDot key={project.id} project={project} />
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                  {allProjects.slice(3, 6).map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </div>
            )}

            {allProjects.length > 6 && (
              <div className="relative">
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400"></div>
                <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                  {allProjects.slice(6).map((project) => (
                    <TimelineDot key={project.id} project={project} />
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                  {allProjects.slice(6).map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectTimeline; 