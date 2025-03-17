const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL 환경변수가 설정되지 않았습니다. .env 파일을 확인해주세요.');
}

export { API_BASE_URL }; 