import { motion } from 'framer-motion';
import { useState } from 'react';
import Profile from '../components/about/Profile';
import BasicInfo from '../components/about/BasicInfo';
import ExperienceTimeline from '../components/about/ExperienceTimeline';
import ProjectTimeline from '../components/about/ProjectTimeline';
import { Experience, Project } from '../types/experience';

const About = () => {
  const [viewMode, setViewMode] = useState<'project' | 'date'>('project');

  const experiences: Experience[] = [
    {
      id: 1,
      title: "모비엔",
      date: "2022.09 ~ 2022.12",
      role: "시스템개발부 · 인턴/수습",
      description: "PHP 백엔드 개발",
      details: [
        "(주)모비엔 웹사이트 구축 프로젝트 참여",
        "슬라이드 형식의 웹 사이트 제작",
        "사이트 내 QA(문의하기)기능 구현",
        "문의 기능 및 관리자 메일 문의 접수 메일 서비스 제공",
        "관리자 페이지 내 고객의 문의사항을 확인할 수 있는 서비스 제공",
        "동래구청 MMS 발송 시스템 이미지파일 업로드 기능 개선"
      ],
      color: "emerald"
    },
    {
      id: 2,
      title: "아뮤즈",
      date: "2024.03 ~ 2025.03",
      role: "모바일서비스개발팀 · 사원",
      description: "Kotlin, Flutter 모바일 앱 개발",
      details: [
        "추후 작성 예정",
      ],
      color: "emerald"
    }
  ];

  const mainProjects: Project[] = [
    {
      id: 1,
      title: "Toolbox",
      date: "2025.02.01 ~ 현재",
      description: "백엔드 API 서버 개발, 프론트엔드 인터페이스 구현 및 AWS 배포",
      subDescription: "누구나 필요한 서비스를, 누구나 쉽게 사용할 수 있도록 만드는 프로젝트",
      links: [
        { text: "Backend 👉", url: "https://github.com/hoowave/toolbox-backend" },
        { text: "Frontend 👉", url: "https://github.com/hoowave/toolbox-frontend" }
      ],
      color: "blue"
    },
    {
      id: 2,
      title: "SecuriSuite",
      date: "2024.01.10 ~ 2024.02.05",
      description: "API 서버 개발 및 인터페이스 제작, 도커 배포",
      subDescription: [
        "브라우저에서 정보 보안 도구를 사용하기 위한 그래픽 인터페이스",
        "기존 JSP 기반의 \"라메르 사이트\"를 현대적인 웹 개발 표준으로 전면 리팩토링"
      ],
      links: [
        { text: "GitHub 링크 👉", url: "https://github.com/hoowave/SecuriSuite" }
      ],
      color: "blue"
    }
  ];

  const toyProjects: Project[] = [
    {
      id: 3,
      title: "Flutter FFI Memory Patch",
      date: "2024.10.01 ~ 2024.11.01",
      description: "Flutter와 C++ DLL을 FFI로 연동하여 Windows 메모리 패치 프로그램 개발",
      subDescription: [
        "Windows API를 활용한 프로세스 메모리 접근 및 수정 기능 구현",
      ],
      links: [
        { text: "GitHub 링크 👉", url: "https://github.com/hoowave/flutter_ffi_memory_patch" }
      ],
      color: "purple"
    },
    {
      id: 4,
      title: "Android 개발 템플릿",
      date: "2024.09.01 ~ 2024.10.01",
      description: "Android 개발을 위한 최신 아키텍처 기반의 템플릿 개발",
      subDescription: [
        "Jetpack Compose, KSP, MVVM, Hilt를 결합하여 효율적인 개발 환경 구축",
      ],
      links: [
        { text: "GitHub 링크 👉", url: "https://github.com/hoowave/aos-ksp-hilt" }
      ],
      color: "purple"
    },
    {
      id: 5,
      title: "선착순 쿠폰 발급 시스템",
      date: "2023.12.01 ~ 2024.01.01",
      description: "데이터의 성능과 정합성에 대한 고민",
      subDescription: "Redis를 사용하여 성능 향상 및 Kafka를 사용하여 몰리는 트래픽 처리",
      links: [
        { text: "GitHub 링크 👉", url: "https://github.com/hoowave/coupon-system" }
      ],
      color: "purple"
    },
    {
      id: 6,
      title: "캐치테이블 예약시스템",
      date: "2023.11.01 ~ 2023.12.01",
      description: "DDD(도메인 주도 개발)을 통한 MSA기반 API서버 개발",
      links: [
        { text: "GitHub 링크 👉", url: "https://github.com/hoowave/catchtable-reservation" }
      ],
      color: "purple"
    }
  ];

  const legacyProjects: Project[] = [
    {
      id: 7,
      title: "라메르사이트",
      date: "2023.07.01 ~ 2023.09.01",
      description: "쉘 스크립트 작성 및 데이터 처리",
      subDescription: "웹에서 사용자의 입력을 받아 리눅스 명령을 수행하여 결과를 반환하는 사이트 도구",
      links: [
        { text: "GitHub 링크 👉", url: "https://github.com/hoowave/Legacy_Project_Lamer" }
      ],
      color: "gray"
    },
    {
      id: 8,
      title: "장뽕뽕 사이트",
      date: "2023.01.01 ~ 현재",
      description: "화면 설계 및 서비스기획",
      subDescription: "광물 캐서 무기 강화하기 콘셉트의 게임 및 커뮤니티 사이트",
      links: [
        { text: "사이트 링크 👉", url: "http://hoowave.dothome.co.kr" }
      ],
      color: "gray"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-8 py-16"
      >
        <div className="w-full bg-gray-50/50 rounded-3xl p-8 shadow-[inset_0_0_2rem_rgba(0,0,0,0.02)] backdrop-blur-sm">
          <Profile />
        </div>
        
        <div className="w-full bg-gray-50/50 rounded-3xl p-8 shadow-[inset_0_0_2rem_rgba(0,0,0,0.02)] backdrop-blur-sm">
          <BasicInfo />
        </div>
        
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gray-50/50 p-8 rounded-3xl shadow-[inset_0_0_2rem_rgba(0,0,0,0.02)] backdrop-blur-sm">
            <ExperienceTimeline experiences={experiences} />
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gray-50/50 p-8 rounded-3xl shadow-[inset_0_0_2rem_rgba(0,0,0,0.02)] backdrop-blur-sm space-y-16">
            <ProjectTimeline 
              mainProjects={mainProjects}
              toyProjects={toyProjects}
              legacyProjects={legacyProjects}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default About; 