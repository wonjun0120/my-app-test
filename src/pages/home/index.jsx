import Image from 'next/image';
import Link from 'next/link';
import FooterNavigation from '../../components/FooterNavigation';
import AISuggestedProperties from '../../components/AISuggestedProperties';
import HotProperties from '../../components/HotProperties';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // JWT 토큰 확인하여 로그인 상태 설정
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="flex items-center justify-between w-full p-4 bg-white shadow">
        <div className="flex items-center">
          <Image src="/icons/logo.png" alt="Logo" width={50} height={50} />
          <h1 className="text-xl font-bold ml-2 whitespace-nowrap">겟 아워 홈</h1>
        </div>
        <div className="relative">
          <Link href="/search" legacyBehavior>
            <a className="block">
              <input
                type="text"
                placeholder="어느 매물을 찾으시나요?"
                className="border border-gray-300 rounded-full p-2 pl-8 pr-4 w-52"
                readOnly
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.65 6.15z"></path>
              </svg>
            </a>
          </Link>
        </div>
      </header>

      {/* Category Icons */}
      <section className="grid grid-cols-3 gap-4 p-4">
        <Link href="/one-room" legacyBehavior>
          <a className="flex flex-col items-center">
            <Image src="/icons/one-room.png" alt="원투쓰리룸" width={90} height={90} />
            <span className="mt-2">원,투,쓰리룸</span>
          </a>
        </Link>
        <Link href="/officetel" legacyBehavior>
          <a className="flex flex-col items-center">
            <Image src="/icons/officetel.png" alt="오피스텔" width={90} height={90} />
            <span className="mt-2">오피스텔</span>
          </a>
        </Link>
        <Link href="/apartment" legacyBehavior>
          <a className="flex flex-col items-center">
            <Image src="/icons/apartment.png" alt="아파트" width={90} height={90} />
            <span className="mt-2">아파트</span>
          </a>
        </Link>
      </section>

      {/* Middle Category Icons */}
      <section className="grid grid-cols-2 gap-4 p-4 justify-center">
        <Link href="/monthly-rent" legacyBehavior>
          <a className="flex flex-col items-center">
            <Image src="/icons/monthly-rent.png" alt="월세" width={90} height={90} />
            <span className="mt-2">월세</span>
          </a>
        </Link>
        <Link href="/jeonse" legacyBehavior>
          <a className="flex flex-col items-center">
            <Image src="/icons/jeonse.png" alt="전세" width={90} height={90} />
            <span className="mt-2">전세</span>
          </a>
        </Link>
      </section>

      {/* 조건부 렌더링 */}
      {isLoggedIn ? (
        <AISuggestedProperties />
      ) : (
        <HotProperties />
      )}

      <div className="flex justify-center mt-1">
        <Link href="/map" legacyBehavior>
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            지도에서 더 많은 매물 보기
          </a>
        </Link>
      </div>

      {/* Footer Navigation */}
      <FooterNavigation activeTab="home" />
    </div>
  );
}
