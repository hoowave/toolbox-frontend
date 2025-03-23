import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SignupTerms = () => {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreements({
      terms: e.target.checked,
      privacy: e.target.checked
    });
    setError(null);
  };

  const handleCheck = (field: 'terms' | 'privacy') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreements(prev => ({
      ...prev,
      [field]: e.target.checked
    }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreements.terms || !agreements.privacy) {
      setError('모든 약관에 동의해주세요.');
      return;
    }
    navigate('/signup/form');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">회원가입</h2>
          <p className="mt-2 text-gray-600">서비스 이용약관에 동의해주세요</p>
        </div>

        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b pb-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={agreements.terms && agreements.privacy}
                  onChange={handleCheckAll}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-900">전체 동의</span>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={agreements.terms}
                    onChange={handleCheck('terms')}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-900">이용약관 동의 (필수)</span>
                </label>
                <div className="mt-2 p-3 bg-gray-50 rounded-md h-32 overflow-auto text-sm text-gray-600 whitespace-pre-line">
                  {`[이용약관]

1. 본 약관은 ToolBox 서비스 이용에 관한 기본적인 사항을 규정합니다.

2. 회원은 본 서비스를 이용함으로써 본 약관에 동의한 것으로 간주됩니다.

3. 서비스의 특성상 일부 기능은 회원가입 없이도 이용 가능합니다.

4. 회원은 본인의 계정 정보를 안전하게 관리할 책임이 있습니다.

5. 서비스 이용 중 발생하는 모든 책임은 회원 본인에게 있습니다.`}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={agreements.privacy}
                    onChange={handleCheck('privacy')}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-900">개인정보 수집 및 이용 동의 (필수)</span>
                </label>
                <div className="mt-2 p-3 bg-gray-50 rounded-md h-32 overflow-auto text-sm text-gray-600 whitespace-pre-line">
                  {`[개인정보 수집 및 이용 동의]

1. 수집하는 개인정보 항목
   - 아이디
   - 비밀번호

2. 수집 및 이용목적
   - 서비스 제공 및 회원 관리
   - 서비스 이용 기록 관리

3. 보유 및 이용기간
   - 회원 탈퇴 시까지

4. 동의를 거부할 권리가 있으며, 동의 거부 시 회원가입이 제한됩니다.

5. 수집된 개인정보는 암호화되어 안전하게 보관됩니다.`}
                </div>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              동의하고 계속하기
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignupTerms; 