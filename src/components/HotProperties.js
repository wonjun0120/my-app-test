import Image from 'next/image';
import Link from 'next/link';

export default function HotProperties() {
  return (
    <section className="w-full p-1">
      <h2 className="text-lg font-bold mb-2">현재 00지역에서 가장 핫한 매물</h2>
      <div className="overflow-x-auto flex space-x-2 mb-4"> {/* space-x-4에서 space-x-2로 변경 */}
        <Link href="/property/4" legacyBehavior>
          <a className="min-w-[200px] bg-white rounded shadow p-2"> {/* min-w-[250px]에서 min-w-[200px]로 변경 */}
            <Image src="/hot1.png" alt="핫한 매물 1" width={140} height={120} /> {/* width={160} height={140}에서 width={140} height={120}로 변경 */}
            <h3 className="mt-2 font-bold text-sm">월세 300/100</h3> {/* 텍스트 크기를 text-sm으로 줄임 */}
            <p className="text-xs text-gray-600">아파트 · 하늘채</p> {/* 텍스트 크기를 text-xs로 줄임 */}
            <p className="text-xs text-gray-600">10층, 25.34㎡, 관리비 12만</p> {/* 텍스트 크기를 text-xs로 줄임 */}
          </a>
        </Link>
        <Link href="/property/5" legacyBehavior>
          <a className="min-w-[200px] bg-white rounded shadow p-2">
            <Image src="/hot2.png" alt="핫한 매물 2" width={140} height={120} />
            <h3 className="mt-2 font-bold text-sm">월세 500/200</h3>
            <p className="text-xs text-gray-600">빌라 · 해오름</p>
            <p className="text-xs text-gray-600">3층, 33.12㎡, 관리비 8만</p>
          </a>
        </Link>
        <Link href="/property/6" legacyBehavior>
          <a className="min-w-[200px] bg-white rounded shadow p-2">
            <Image src="/hot3.png" alt="핫한 매물 3" width={140} height={120} />
            <h3 className="mt-2 font-bold text-sm">월세 200/150</h3>
            <p className="text-xs text-gray-600">오피스텔 · 스타시티</p>
            <p className="text-xs text-gray-600">7층, 22.45㎡, 관리비 10만</p>
          </a>
        </Link>
      </div>
    </section>
  );
}
