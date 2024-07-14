import { useState } from 'react';

export default function Signup() {
  const [userType, setUserType] = useState('user'); // 'user' or 'agent'
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    phone: '',
    registrationNumber: '',
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    setPasswordMatch(true);
    // 회원가입 처리 로직 추가
    console.log('회원가입 정보:', form, '유형:', userType);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">겟 아웃 홈에 오신걸 환영합니다!</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
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
          <div className="mb-4">
          {userType === 'agent' && (
            <div className="mb-4">
              <label htmlFor="registrationNumber" className="block text-gray-700 text-sm font-bold mb-2">
                공인중개사 등록 번호
              </label>
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                value={form.registrationNumber}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          )}
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              아이디
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                !passwordMatch ? 'border-red-500' : ''
              }`}
              required
            />
            {!passwordMatch && <p className="text-red-500 text-xs mt-1">비밀번호가 일치하지 않습니다.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              전화번호
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
