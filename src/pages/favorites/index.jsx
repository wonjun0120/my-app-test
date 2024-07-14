import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Favorites() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태
  const router = useRouter();

  useEffect(() => {
    // 여기에 실제 로그인 상태를 확인하는 로직을 추가하세요.
    // 예를 들어, 토큰이 있는지 확인하거나, 사용자 정보를 API로 확인할 수 있습니다.
    const checkLoginStatus = () => {
      // 예시로 로컬 스토리지에서 토큰을 확인하는 로직
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        router.push('/login'); // 로그인 페이지로 리다이렉트
      }
    };
    checkLoginStatus();
  }, [router]);

  if (!isLoggedIn) {
    return null; // 로그인 상태 확인 전에는 아무것도 렌더링하지 않음
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">관심목록</h1>
      {/* 관심목록 콘텐츠를 여기에 추가 */}
    </div>
  );
}
