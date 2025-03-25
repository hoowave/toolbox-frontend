import { motion } from 'framer-motion';

const BasicInfo = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
      {/* Basic Info - 3/12 (25%) */}
      <motion.div 
        className="col-span-1 md:col-span-4 bg-white p-4 md:p-6 rounded-3xl shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]"
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">기본 정보</h2>
        </div>
        <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
          <div className="bg-white p-3 md:p-4 rounded-xl shadow-[inset_2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]">
            <h3 className="font-semibold mb-2 text-blue-600">개인정보</h3>
            <ul className="space-y-1.5 md:space-y-2 pl-4">
              <li>• 나이: 27세 (1998년생)</li>
              <li>• 거주지: 부산광역시</li>
            </ul>
          </div>
          
          <div className="bg-white p-3 md:p-4 rounded-xl shadow-[inset_2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]">
            <h3 className="font-semibold mb-2 text-blue-600">학력사항</h3>
            <ul className="space-y-1.5 md:space-y-2 pl-4">
              <li>• 전공: 컴퓨터공학과</li>
              <li className="pl-4 text-sm">- 정보보안전공</li>
              <li>• 부전공: 사이버경찰보안</li>
              <li>• 재학기간: 2017 ~ 2022</li>
            </ul>
          </div>

          <div className="bg-white p-3 md:p-4 rounded-xl shadow-[inset_2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]">
            <h3 className="font-semibold mb-2 text-blue-600">병역사항</h3>
            <ul className="space-y-1.5 md:space-y-2 pl-4">
              <li>• 군필 / 해병 병장 만기전역</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Certifications - 7/12 (약 58%) */}
      <motion.div 
        className="col-span-1 md:col-span-8 bg-white p-4 md:p-6 rounded-3xl shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]"
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">자격증</h2>
        </div>
        <div className="overflow-x-auto bg-white rounded-xl shadow-[inset_2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]">
          <table className="min-w-full text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-200/50">
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-800">자격증명</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-800">발행처/기관</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-gray-800">취득년월</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-700">정보보안기사 필기</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-600">한국방송통신전파진흥원</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-600">2024.10</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-700">정보처리기사</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-600">한국산업인력공단</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-600">2023.06</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-700">SQL개발자(SQLD)</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-600">한국데이터베이스진흥센터</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-600">2023.07</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-700">네트워크관리사2급</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-600">한국정보통신자격협회</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-600">2022.07</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-700">리눅스마스터2급</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-600">한국정보통신인력개발센터</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-600">2022.12</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-700">정보처리기능사</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-600">한국산업인력공단</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-600">2016.07</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-700">컴퓨터활용능력2급</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-600">대한상공회의소</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-gray-600">2020.02</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default BasicInfo; 