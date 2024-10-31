// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import KakaoMap from './MapVue/KakaoMap';
import HospitalPage from './MapVue/HospitalPage';

function App() {
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  // 병원 데이터 불러오기
  useEffect(() => {
    axios.get('http://localhost:8765/hospitals')
      .then((response) => setHospitals(response.data))
      .catch((error) => console.error('Error fetching hospitals:', error));
  }, []);

  // 병원 상세 페이지로 이동하는 함수
  const goToHospitalPage = (hospitalId) => {
    navigate(`/hospital/${hospitalId}`);
  };

  return (
    <div className="App flex flex-col items-center h-screen bg-gray-100">
      <div className="w-full max-w-screen-md flex-1 relative bg-white shadow-lg rounded-lg overflow-hidden">
        {/* KakaoMap에 병원 데이터와 페이지 이동 함수 전달 */}
        <KakaoMap hospitals={hospitals} onHospitalClick={goToHospitalPage} />
      </div>

      {/* 하단 네비게이션 바 */}
      <nav className="fixed bottom-4 w-[90%] max-w-screen-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md flex justify-around py-2 text-gray-700 z-20">
        <Link to="/" className="flex flex-col items-center hover:text-primary">
          <span className="text-lg">🏠</span>
          <span className="text-sm font-semibold">홈</span>
        </Link>
        <Link to="/hospital" className="flex flex-col items-center hover:text-primary">
          <span className="text-lg">🐾</span>
          <span className="text-sm font-semibold">병원</span>
        </Link>
        <Link to="/" className="flex flex-col items-center hover:text-primary">
          <span className="text-lg">🗺️</span>
          <span className="text-sm font-semibold">지도</span>
        </Link>
        <Link to="/mypage" className="flex flex-col items-center hover:text-primary">
          <span className="text-lg">👤</span>
          <span className="text-sm font-semibold">마이페이지</span>
        </Link>
      </nav>

      {/* 라우트 설정 */}
      <Routes>
        <Route path="/hospital/:id" element={<HospitalPage />} />
      </Routes>
    </div>
  );
}

export default App;
