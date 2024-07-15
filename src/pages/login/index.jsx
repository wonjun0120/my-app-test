import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const [userType, setUserType] = useState('user'); // 'user' or 'agent'
  const [form, setForm] = useState({
    id: '',
    password: ''
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = userType === 'user'
      ? 'http://localhost:8080/api/users/login'
      : 'http://localhost:8080/api/agents/login';

    try {
      const response = await axios.post(apiUrl, {
        user_id: form.id,
        password: form.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const { jwt } = response.data;
        console.log('로그인 성공:', response.data);
        localStorage.setItem('token', jwt);
        router.push('/home');
      } else {
        console.error('로그인 실패: 예상하지 못한 상태 코드', response.status);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(`로그인 실패: ${error.response.data.error}`);
      } else {
        console.error('로그인 실패:', error.response ? error.response.data : error.message);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center mb-6">
        <p className="text-blue-500">사기 걱정없이 부동산 매물 찾는 법</p>
        <h1 className="text-4xl font-bold">겟 아워 홈</h1>
      </div>
      <div className="text-left w-full max-w-sm mb-2">
        <Link href="/home" legacyBehavior>
          <a className="text-sm text-blue-500 hover:text-blue-700">홈으로</a>
        </Link>
      </div>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <div className="flex border-b mb-4">
          <button
            onClick={() => setUserType('user')}
            className={`flex-1 py-2 text-center ${userType === 'user' ? 'border-b-2 border-blue-500 font-bold text-blue-500' : 'text-gray-700'}`}
          >
            사용자
          </button>
          <button
            onClick={() => setUserType('agent')}
            className={`flex-1 py-2 text-center ${userType === 'agent' ? 'border-b-2 border-blue-500 font-bold text-blue-500' : 'text-gray-700'}`}
          >
            공인중개사
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label htmlFor="id" className="block text-gray-700 text-sm font-bold mb-2">
              <svg className="inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 12a5 5 0 100-10 5 5 0 000 10zm-7 8a7 7 0 0114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              아이디
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={form.id}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="아이디"
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              <svg className="inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 4a4 4 0 00-4 4v4h1V8a3 3 0 016 0v4h1V8a4 4 0 00-4-4zm-3 8a2 2 0 104 0H7z"
                  clipRule="evenodd"
                />
              </svg>
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="비밀번호"
            />
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="remember" className="mr-2 leading-tight" />
            <label htmlFor="remember" className="text-sm text-gray-700">아이디 저장</label>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              로그인
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link href="/find-id" legacyBehavior>
            <a className="text-sm text-gray-500 hover:text-gray-700 mr-2">아이디 찾기</a>
          </Link>
          <span className="text-gray-500">|</span>
          <Link href="/reset-password" legacyBehavior>
            <a className="text-sm text-gray-500 hover:text-gray-700 mx-2">비밀번호 재설정</a>
          </Link>
          <span className="text-gray-500">|</span>
          <Link href="/signup" legacyBehavior>
            <a className="text-sm text-gray-500 hover:text-gray-700 ml-2">회원가입</a>
          </Link>
        </div>
      </div>
      {userType === 'user' && (
        <div className="mt-8 w-full max-w-sm">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded w-full">
            카카오톡으로 간편 가입
          </button>
        </div>
      )}
    </div>
  );
}
