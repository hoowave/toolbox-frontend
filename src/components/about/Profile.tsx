import { motion } from 'framer-motion';

const Profile = () => {
  return (
    <div className="w-full flex justify-between items-start">
      {/* Empty space for left side */}
      <div className="w-1/4" />

      {/* Profile Image and Info */}
      <motion.div 
        className="w-1/4 text-center"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-48 h-48 rounded-full mx-auto mb-4 bg-gray-50/80 p-2 shadow-[4px_4px_10px_0_rgba(0,0,0,0.1),-4px_-4px_10px_0_rgba(255,255,255,0.9)]">
          <div className="w-full h-full rounded-full overflow-hidden shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]">
            <img 
              src="/my_img.png" 
              alt="프로필 이미지" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">장상훈</h1>
        <p className="text-lg text-gray-600">Backend Developer / Engineer</p>
      </motion.div>

      {/* Core Values */}
      <motion.div 
        className="w-1/3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)]"></div>
          <h2 className="text-lg font-bold text-gray-800">핵심가치</h2>
        </div>
        <div className="space-y-2.5">
          <motion.div 
            className="flex items-center gap-3 bg-gray-50/80 rounded-2xl p-3 shadow-[4px_4px_10px_0_rgba(0,0,0,0.1),-4px_-4px_10px_0_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] transition-shadow"
            whileHover={{ x: 5 }}
          >
            <span className="text-lg shrink-0">📚</span>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">지속적인 성장과 학습</h3>
              <p className="text-xs text-gray-600">새로운 기술과 트렌드를 끊임없이 학습합니다.</p>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3 bg-gray-50/80 rounded-2xl p-3 shadow-[4px_4px_10px_0_rgba(0,0,0,0.1),-4px_-4px_10px_0_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] transition-shadow"
            whileHover={{ x: 5 }}
          >
            <span className="text-lg shrink-0">💪</span>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">하는 일에 진심</h3>
              <p className="text-xs text-gray-600">모든 프로젝트에 열정을 다합니다.</p>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3 bg-gray-50/80 rounded-2xl p-3 shadow-[4px_4px_10px_0_rgba(0,0,0,0.1),-4px_-4px_10px_0_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] transition-shadow"
            whileHover={{ x: 5 }}
          >
            <span className="text-lg shrink-0">⭐</span>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">정직함과 성실함</h3>
              <p className="text-xs text-gray-600">투명하고 정직한 서비스를 제공합니다.</p>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3 bg-gray-50/80 rounded-2xl p-3 shadow-[4px_4px_10px_0_rgba(0,0,0,0.1),-4px_-4px_10px_0_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] transition-shadow"
            whileHover={{ x: 5 }}
          >
            <span className="text-lg shrink-0">👥</span>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">사용자 중심</h3>
              <p className="text-xs text-gray-600">사용자의 니즈를 최우선으로 생각합니다.</p>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3 bg-gray-50/80 rounded-2xl p-3 shadow-[4px_4px_10px_0_rgba(0,0,0,0.1),-4px_-4px_10px_0_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] transition-shadow"
            whileHover={{ x: 5 }}
          >
            <span className="text-lg shrink-0">🔒</span>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">보안 의식</h3>
              <p className="text-xs text-gray-600">보안을 최우선으로 생각합니다.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile; 