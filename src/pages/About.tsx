import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-8 py-16"
      >
        {/* Profile Image and Name */}
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-64 h-64 rounded-full overflow-hidden mb-6">
            <img 
              src="/my_img.png" 
              alt="프로필 이미지" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">장상훈</h1>
          <p className="text-xl text-gray-600">Backend Developer / Engineer</p>
        </motion.div>

        {/* Basic Info and Certifications */}
        <div className="w-full grid grid-cols-12 gap-8">
          {/* Basic Info - 3/12 (25%) */}
          <motion.div 
            className="col-span-12 md:col-span-4 bg-white p-6 rounded-lg shadow-md"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-blue-600">기본 정보</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-1 bg-gray-50">개인정보</h3>
                <ul className="space-y-2 pl-4">
                  <li>• 나이: 27세 (1998년생)</li>
                  <li>• 거주지: 부산광역시</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1 bg-gray-50">학력사항</h3>
                <ul className="space-y-2 pl-4">
                  <li>• 전공: 컴퓨터공학과</li>
                  <li className="pl-4 text-sm">- 정보보안전공</li>
                  <li>• 부전공: 사이버경찰보안</li>
                  <li>• 재학기간: 2017 ~ 2022</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-1 bg-gray-50">병역사항</h3>
                <ul className="space-y-2 pl-4">
                  <li>• 군필 / 해병 병장 만기전역</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Certifications - 7/12 (약 58%) */}
          <motion.div 
            className="col-span-12 md:col-span-8 bg-white p-6 rounded-lg shadow-md"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-blue-600">자격증</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">자격증명</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">발행처/기관</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">취득년월</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">정보보안기사 필기</td>
                    <td className="py-3 px-4 text-gray-600">한국방송통신전파진흥원</td>
                    <td className="py-3 px-4 text-gray-600">2024.10</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">정보처리기사</td>
                    <td className="py-3 px-4 text-gray-600">한국산업인력공단</td>
                    <td className="py-3 px-4 text-gray-600">2023.06</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">SQL개발자(SQLD)</td>
                    <td className="py-3 px-4 text-gray-600">한국데이터베이스진흥센터</td>
                    <td className="py-3 px-4 text-gray-600">2023.07</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">네트워크관리사2급</td>
                    <td className="py-3 px-4 text-gray-600">한국정보통신자격협회</td>
                    <td className="py-3 px-4 text-gray-600">2022.07</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">리눅스마스터2급</td>
                    <td className="py-3 px-4 text-gray-600">한국정보통신인력개발센터</td>
                    <td className="py-3 px-4 text-gray-600">2022.12</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">정보처리기능사</td>
                    <td className="py-3 px-4 text-gray-600">한국산업인력공단</td>
                    <td className="py-3 px-4 text-gray-600">2016.07</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">컴퓨터활용능력2급</td>
                    <td className="py-3 px-4 text-gray-600">대한상공회의소</td>
                    <td className="py-3 px-4 text-gray-600">2020.02</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Core Values and Experience */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Core Values */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">핵심가치</h2>
              <div className="grid gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">📚</div>
                  <h3 className="text-lg font-semibold mb-1">지속적인 성장과 학습</h3>
                  <p className="text-sm text-white/80">새로운 기술과 트렌드를 끊임없이 학습합니다.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">💪</div>
                  <h3 className="text-lg font-semibold mb-1">하는 일에 진심</h3>
                  <p className="text-sm text-white/80">모든 프로젝트에 열정을 다합니다.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">⭐</div>
                  <h3 className="text-lg font-semibold mb-1">정직함과 성실함</h3>
                  <p className="text-sm text-white/80">투명하고 정직한 서비스를 제공합니다.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">👥</div>
                  <h3 className="text-lg font-semibold mb-1">사용자 중심</h3>
                  <p className="text-sm text-white/80">사용자의 니즈를 최우선으로 생각합니다.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">🔒</div>
                  <h3 className="text-lg font-semibold mb-1">보안 의식</h3>
                  <p className="text-sm text-white/80">보안을 최우선으로 생각합니다.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Experience */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white rounded-xl p-8 shadow-xl h-full">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">경력 및 경험</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800">모비엔</h3>
                  <p className="text-sm text-gray-600 mt-1">2022.09 ~ 2022.12</p>
                  <p className="text-sm text-gray-600 mt-1">시스템개발부 · 인턴/수습</p>
                  <p className="text-sm text-gray-600 mt-1">PHP 백엔드개발</p>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    <li>• (주)모비엔 웹사이트 구축 프로젝트 참여</li>
                    <li>• 슬라이드 형식의 웹 사이트 제작</li>
                    <li>• 사이트 내 QA(문의하기)기능 구현</li>
                    <li>• 문의 기능 및 관리자 메일 문의 접수 메일 서비스 제공</li>
                    <li>• 관리자 페이지 내 고객의 문의사항을 확인할 수 있는 서비스 제공</li>
                    <li>• 동래구청 MMS 발송 시스템 이미지파일 업로드 기능 개선</li>
                  </ul>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800">추후 작성 예정</h3>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800">개인 프로젝트</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-semibold text-gray-800">SecuriSuite</h4>
                      <p className="text-sm text-gray-600 mt-1">2024.01.10 ~ 2024.02.05</p>
                      <p className="text-sm text-gray-600 mt-1">API 서버 개발 및 인터페이스 제작, 도커 배포</p>
                      <p className="text-sm text-gray-600 mt-1">브라우저에서 정보 보안 도구를 사용하기 위한 그래픽 인터페이스</p>
                      <p className="text-sm text-gray-600 mt-1">기존 JSP 기반의 "라메르 사이트"를 현대적인 웹 개발 표준으로 전면 리팩토링</p>
                      <a href="https://github.com/hoowave/SecuriSuite" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">GitHub 링크 👉</a>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-800">라메르사이트</h4>
                      <p className="text-sm text-gray-600 mt-1">2023.07.01 ~ 2023.09.01</p>
                      <p className="text-sm text-gray-600 mt-1">쉘 스크립트 작성 및 데이터 처리</p>
                      <p className="text-sm text-gray-600 mt-1">웹에서 사용자의 입력을 받아 리눅스 명령을 수행하여 결과를 반환하는 사이트 도구</p>
                      <p className="text-sm text-gray-600 mt-1">웹 크롤링, 웹 미러링, 사전파일 생성과 그 파일을 이용해 보안 테스팅 도구 등 기능 제공</p>
                      <a href="https://github.com/hoowave/Legacy_Project_Lamer" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">GitHub 링크 👉</a>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-800">프로그래밍의 첫 걸음 - 장뽕뽕 사이트</h4>
                      <p className="text-sm text-gray-600 mt-1">2023.01.01 ~ 현재</p>
                      <p className="text-sm text-gray-600 mt-1">화면 설계 및 서비스기획</p>
                      <p className="text-sm text-gray-600 mt-1">웹에서 마우스 클릭을 통해 광물을 캐고, 얻은 돈으로 무기를 사고 강화할 수 있는 "광물 캐서 무기 강화하기" 콘셉트의 게임 및 커뮤니티 사이트</p>
                      <a href="http://hoowave.dothome.co.kr" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">사이트 링크 👉</a>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-800">캐치테이블 예약시스템 API서버 개발</h4>
                      <p className="text-sm text-gray-600 mt-1">2023.11.01 ~ 2023.12.01</p>
                      <p className="text-sm text-gray-600 mt-1">DDD(도메인 주도 개발)을 통한 MSA기반 API서버 개발</p>
                      <a href="https://github.com/hoowave/Catchtable" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">GitHub 링크 👉</a>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-800">선착순 쿠폰 발급 시스템 실습</h4>
                      <p className="text-sm text-gray-600 mt-1">2023.12.01 ~ 2024.01.01</p>
                      <p className="text-sm text-gray-600 mt-1">데이터의 성능과 정합성에 대한 고민 - redis를 사용하여 성능 향상 및 kafka를 사용하여 몰리는 트래픽 처리</p>
                      <a href="https://github.com/hoowave/coupon-system" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">GitHub 링크 👉</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About; 