import Link from 'next/link';
import Image from 'next/image';

export default function FooterNavigation({ activeTab }) {
  return (
    <footer className="w-full bg-white p-4 shadow fixed bottom-0">
      <nav className="flex justify-around">
        <Link href="/home" legacyBehavior>
          <a className={`flex flex-col items-center ${activeTab === 'home' ? 'text-blue-500' : ''}`}>
            <Image src="/icons/home-icon.png" alt="홈" width={24} height={24} />
            <span className="text-xs">홈</span>
          </a>
        </Link>
        <Link href="/favorites" legacyBehavior>
          <a className={`flex flex-col items-center ${activeTab === 'favorites' ? 'text-blue-500' : ''}`}>
            <Image src="/icons/favorite-icon.png" alt="찜한 목록" width={24} height={24} />
            <span className="text-xs">관심목록</span>
          </a>
        </Link>
        <Link href="/map" legacyBehavior>
          <a className={`flex flex-col items-center ${activeTab === 'map' ? 'text-blue-500' : ''}`}>
            <Image src="/icons/map-icon.png" alt="지도" width={24} height={24} />
            <span className="text-xs">지도</span>
          </a>
        </Link>
        <Link href="/more" legacyBehavior>
          <a className={`flex flex-col items-center ${activeTab === 'more' ? 'text-blue-500' : ''}`}>
            <Image src="/icons/more-icon.png" alt="더보기" width={24} height={24} />
            <span className="text-xs">더보기</span>
          </a>
        </Link>
      </nav>
    </footer>
  );
}
