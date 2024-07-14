import Image from 'next/image';
import Link from 'next/link';

export default function AISuggestedProperties() {
  return (
    <section className="w-full p-4">
      <h2 className="text-lg font-bold mb-2">00님 맞춤 AI 추천 정왕동 매물</h2>
      <div className="overflow-x-auto flex space-x-4 mb-4">
        <Link href="/property/1" legacyBehavior>
          <a className="min-w-[250px] bg-white rounded shadow p-4">
            <Image src="/house1.png" alt="매물 1" width={140} height={120} />
            <h3 className="mt-2 font-bold">월세 200/115</h3>
            <p className="text-sm text-gray-600">오피스텔 · 아멜리아</p>
            <p className="text-sm text-gray-600">5층, 19.84㎡, 관리비 14만</p>
          </a>
        </Link>
        <Link href="/property/2" legacyBehavior>
          <a className="min-w-[250px] bg-white rounded shadow p-4">
            <Image src="/house2.png" alt="매물 2" width={140} height={120} />
            <h3 className="mt-2 font-bold">월세 1000/130</h3>
            <p className="text-sm text-gray-600">오피스텔 · 엘루크반포</p>
            <p className="text-sm text-gray-600">8층, 15.62㎡, 관리비 15만</p>
          </a>
        </Link>
        <Link href="/property/3" legacyBehavior>
          <a className="min-w-[250px] bg-white rounded shadow p-4">
            <Image src="/house3.png" alt="매물 3" width={140} height={120} />
            <h3 className="mt-2 font-bold">월세 1/2</h3>
            <p className="text-sm text-gray-600">오피스텔 · 옥</p>
            <p className="text-sm text-gray-600">10층, 33.51㎡</p>
          </a>
        </Link>
      </div>
    </section>
  );
}
