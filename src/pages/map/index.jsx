import { useState } from 'react';
import { useRouter } from 'next/router';
import NaverMap from '../../components/NaverMap';
import FooterNavigation from '../../components/FooterNavigation';
import { FiSearch } from 'react-icons/fi';

const MapPage = () => {
  const [selectedType, setSelectedType] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const router = useRouter();

  const propertyTypes = [
    { type: '전체', icon: '/icons/all.png' },
    { type: '원,투,쓰리룸', icon: '/icons/one-room.png' },
    { type: '오피스텔', icon: '/icons/officetel.png' },
    { type: '아파트', icon: '/icons/apartment.png' },
    { type: '월세', icon: '/icons/monthly-rent.png' },
    { type: '전세', icon: '/icons/jeonse.png' },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    closeModal();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between w-full p-4 bg-white shadow">
        <button onClick={openModal} className="flex items-center space-x-2 p-2 border rounded-lg">
          <img src={propertyTypes.find(pt => pt.type === selectedType)?.icon} alt={selectedType} className="w-6 h-6" />
          <span>{selectedType}</span>
        </button>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="지역을 검색하세요"
            className="border border-gray-300 rounded-full p-2 pl-8 pr-4 w-52"
            readOnly
            onClick={() => router.push('/search')}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button onClick={openFilterModal} className="flex items-center p-2 border rounded-lg">
          필터
        </button>
      </header>
      <div className="flex-grow">
        <NaverMap />
      </div>
      <FooterNavigation activeTab="map" />

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 max-w-md">
            <h2 className="text-xl font-bold mb-4">매물 유형 선택</h2>
            <div className="grid grid-cols-2 gap-4">
              {propertyTypes.map(({ type, icon }) => (
                <button
                  key={type}
                  onClick={() => handleTypeSelect(type)}
                  className="flex flex-col items-center p-2 border rounded-lg"
                >
                  <img src={icon} alt={type} className="w-12 h-12 mb-2" />
                  <span>{type}</span>
                </button>
              ))}
            </div>
            <button onClick={closeModal} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
              닫기
            </button>
          </div>
        </div>
      )}

      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-screen overflow-y-auto relative">
            <button onClick={closeFilterModal} className="absolute top-2 left-2 text-gray-500 hover:text-gray-700">
              X
            </button>
            <h2 className="text-xl font-bold mb-4">필터 설정</h2>
            <div className="mb-4">
              <h3 className="font-semibold">거래 유형</h3>
              <div className="flex space-x-4">
                <label>
                  <input type="checkbox" />
                  <span> 월세</span>
                </label>
                <label>
                  <input type="checkbox" />
                  <span> 전세</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">가격</h3>
              <label>
                <input type="checkbox" />
                <span> 관리비 포함</span>
              </label>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">보증금 범위</h3>
              <div className="flex space-x-2">
                <input type="number" placeholder="최소" className="border rounded p-2 w-1/2" />
                <input type="number" placeholder="최대" className="border rounded p-2 w-1/2" />
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">월세 범위</h3>
              <div className="flex space-x-2">
                <input type="number" placeholder="최소" className="border rounded p-2 w-1/2" />
                <input type="number" placeholder="최대" className="border rounded p-2 w-1/2" />
              </div>
            </div>
            <button onClick={closeFilterModal} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
              적용하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;
