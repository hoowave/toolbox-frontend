import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center gap-12 py-16"
      >
        <motion.div 
          className="w-64 h-64 relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            <img 
              src="/my_img.png" 
              alt="프로필 이미지" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div 
          className="flex-1 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-800">홍길동</h1>
            <p className="text-xl text-gray-600">웹 개발자 / 프론트엔드 엔지니어</p>
          </div>

          <div className="space-y-4">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold mb-2">기본 정보</h2>
              <ul className="space-y-2 text-gray-600">
                <li>• 나이: 28세</li>
                <li>• 전공: 컴퓨터공학과</li>
                <li>• 위치: 서울특별시</li>
              </ul>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold mb-2">자격증</h2>
              <ul className="space-y-2 text-gray-600">
                <li>• 정보처리기사</li>
                <li>• SQLD</li>
                <li>• AWS Solutions Architect</li>
              </ul>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold mb-2">자기 소개</h2>
              <p className="text-gray-600 leading-relaxed">
                "안녕하세요! 저는 사용자 경험을 중요시하는 프론트엔드 개발자입니다. 
                새로운 기술을 배우는 것을 좋아하며, 특히 React와 TypeScript를 활용한 
                웹 애플리케이션 개발에 관심이 많습니다. 항상 더 나은 코드와 
                사용자 경험을 제공하기 위해 노력하고 있습니다."
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section 
        className="py-16 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-12 shadow-xl">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            핵심가치
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">지속적인 성장과 학습</h3>
              <p className="text-sm text-white/80">
                새로운 기술과 트렌드를 끊임없이 학습하며, 더 나은 서비스를 제공하기 위해 노력합니다.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl mb-4">💪</div>
              <h3 className="text-xl font-semibold mb-2">하는 일에 진심</h3>
              <p className="text-sm text-white/80">
                모든 프로젝트와 서비스에 열정을 다하며, 최선의 결과를 만들어내기 위해 노력합니다.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">정직함과 성실함</h3>
              <p className="text-sm text-white/80">
                투명하고 정직한 서비스 운영으로 사용자들의 신뢰를 쌓아갑니다.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">항상 사용자 중심</h3>
              <p className="text-sm text-white/80">
                사용자의 니즈를 최우선으로 생각하며, 더 나은 사용자 경험을 제공하기 위해 고민합니다.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">보안 의식</h3>
              <p className="text-sm text-white/80">
                사용자의 데이터 보안과 개인정보 보호를 최우선으로 생각하며 안전한 서비스를 제공합니다.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About; 