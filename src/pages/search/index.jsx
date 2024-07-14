import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([
    '경기도 시흥시 정왕동',
  ]);

  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchHistory([searchTerm, ...searchHistory]);
      setSearchTerm('');
    }
  };

  const deleteSearchHistoryItem = (item) => {
    setSearchHistory(searchHistory.filter((history) => history !== item));
  };

  const clearAllSearchHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="w-full max-w-md flex items-center p-4 bg-white shadow">
        <button onClick={() => router.back()} className="text-gray-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div className="relative flex-grow">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="지역, 지하철, 대학, 단지, 매물번호"
              className="border border-gray-300 rounded-full p-2 pl-10 pr-10 w-full"
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
          </form>
        </div>
      </div>
      <div className="flex-grow w-full max-w-md bg-gray-100 p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">최근 검색</h2>
          <button onClick={clearAllSearchHistory} className="text-gray-500">
            전체삭제
          </button>
        </div>
        {searchHistory.length === 0 ? (
          <p className="text-gray-500">검색 기록이 없습니다.</p>
        ) : (
          <ul>
            {searchHistory.map((item, index) => (
              <li key={index} className="flex justify-between items-center bg-white p-2 mb-2 rounded shadow">
                <span>{item}</span>
                <button
                  onClick={() => deleteSearchHistoryItem(item)}
                  className="text-gray-200"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
