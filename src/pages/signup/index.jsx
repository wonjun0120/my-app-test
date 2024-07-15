import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    const isPasswordMatch = form.password === form.confirmPassword;
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    const isPhoneValid = phoneRegex.test(form.phone);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(form.email);

    setIsFormValid(
      form.username &&
      form.password &&
      form.confirmPassword &&
      form.name &&
      form.email &&
      form.phone &&
      isPasswordMatch &&
      isPhoneValid &&
      isEmailValid &&
      (userType === 'user' || (userType === 'agent' && form.registrationNumber))
    );

    setPasswordMatch(isPasswordMatch);
  }, [form, userType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        username: form.name,
        password: form.password,
        email: form.email,
        phone_number: form.phone,
        user_id: form.username,
        ...(userType === 'agent' && { registrationNumber: form.registrationNumber }),
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        console.log('회원가입 성공:', response.data);
        alert('회원가입이 성공적으로 완료되었습니다.');
        router.push('/login');
      } else {
        console.error('회원가입 실패: 예상하지 못한 상태 코드', response.status);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(`회원가입 실패: ${error.response.data.error}`);
      } else {
        console.error('회원가입 실패:', error.response ? error.response.data : error.message);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    }
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
          <div className="mb-4">
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
              이메일 (예: user@example.com)
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
              전화번호 (예: 010-0000-0000)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              pattern="010-\d{4}-\d{4}"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Link href="/login">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                로그인 화면으로
              </button>
            </Link>
            <button
              type="submit"
              className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isFormValid ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-700 cursor-not-allowed'
              }`}
              disabled={!isFormValid}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
