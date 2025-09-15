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
      description: "IoT TV 제어 앱 개발",
      details: [
        "Android Jetpack Compose 기반 UI/UX 구현",
        "Bluetooth HID Spec 적용 및 다수의 디바이스에서 Bluetooth 입력 전달 기능 구현",
        "Bluetooth HID 프로토콜을 기반으로 안정적인 데이터 전송 구조 설계",
        "ConnectSDK 적용을 통한 내부망(Wi-Fi) 기반 TV 제어 기능 개발"
      ],
      color: "emerald"
    },
    {
      id: 3,
      title: "아뮤즈",
      date: "2024.03 ~ 2025.03",
      role: "모바일서비스개발팀 · 사원",
      description: "AI 교구 로봇 앱 개발",
      details: [
        "Flutter 기반 AI 교구 로봇 앱, 웹 개발 및 UI/UX 구현",
        "UnixSocket 통신을 활용하여 AI 모듈과의 실시간 데이터 처리 기능 개발",
        "WebSocket을 이용해 각 디바이스 간 실시간 데이터 송수신 기능 구축",
        "Raspberry Pi 및 웹 환경에서 요구사항에 맞춘 실시간 양방향 데이터 처리 구현"
      ],
      color: "emerald"
    }
  ];

  const mainProjects: Project[] = [
      {
        id: 1,
        title: "Netty & Hibernate TCP Server",
        date: "2025.04.01 ~ 2025.05.01",
        description: "",
        subDescription: "헥사고날 아키텍처를 적용하여 도메인 로직과 인프라를 분리한 확장 가능한 서버 아키텍처 구현",
        links: [
          { text: "GitHub 링크 👉", url: "https://github.com/hoowave/Netty-Hibernate-TCP-Server" }
        ],
        color: "blue"
      },
      {
      id: 2,
      title: "Toolbox",
      date: "2025.02.01 ~ 2025.04.01",
      description: "",
      subDescription: "누구나 필요한 서비스를, 누구나 쉽게 사용할 수 있도록 만드는 프로젝트",
      links: [
        { text: "Backend 👉", url: "https://github.com/hoowave/toolbox-backend" },
        { text: "Frontend 👉", url: "https://github.com/hoowave/toolbox-frontend" }
      ],
      color: "blue"
    },
    {
      id: 3,
      title: "SecuriSuite",
      date: "2024.01.10 ~ 2024.02.05",
      description: "",
      subDescription: [
        "Kali Linux 환경에서 정보 보안 도구를 사용하기 위한 그래픽 인터페이스",
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
      description: "",
      subDescription: [
        "Flutter와 C++ DLL을 FFI로 연동하여 Windows 메모리 패치 프로그램 개발",
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
      description: "",
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
      description: "",
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
      description: "",
      subDescription: "DDD(도메인 주도 개발)을 통한 MSA기반 API서버 개발",
      links: [
        { text: "GitHub 링크 👉", url: "https://github.com/hoowave/Catchtable" }
      ],
      color: "purple"
    }
  ];

  const legacyProjects: Project[] = [
    {
      id: 7,
      title: "라메르사이트",
      date: "2023.07.01 ~ 2023.09.01",
      description: "",
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
      description: "",
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