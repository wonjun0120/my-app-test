import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FooterNavigation from '../../components/FooterNavigation'; // FooterNavigation 컴포넌트 경로 확인 필요

const MorePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('get-our-home-token') || sessionStorage.getItem('get-our-home-token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // localStorage에서 JWT 삭제
    localStorage.removeItem('get-our-home-token');
    // sessionStorage에서 JWT 삭제
    sessionStorage.removeItem('get-our-home-token');
    // 홈 페이지로 리디렉션
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col items-center bg-white">
        <h1 className="text-2xl font-bold mb-4">더보기</h1>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
          >
            로그아웃
          </button>
        )}
      </div>
      <FooterNavigation activeTab="more" />
    </div>
  );
};

export default MorePage;
