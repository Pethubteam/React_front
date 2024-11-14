import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import KakaoMap from './MapVue/KakaoMap';
import LoginPage from './LoginVue/LoginPage';
import SignUpPage from './LoginVue/SignUpPage';
import HospitalListPage from './HospitalVue/HospitalListPage';
import HospitalDetailPage from './HospitalVue/HospitalDetailPage';

function App() {
  const [hospitals, setHospitals] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // 병원 데이터 불러오기
  useEffect(() => {
    axios.get('http://localhost:8765/hospitals')
      .then((response) => setHospitals(response.data))
      .catch((error) => console.error('병원 정보를 불러오는 중 오류 발생:', error));
  }, []);

  // 병원 상세 페이지로 이동하는 함수
  const goToHospitalPage = (hospitalId) => {
    navigate(`/hospital/${hospitalId}`);
  };

  return (
    <div className="App flex flex-col items-center h-screen bg-gray-100">
      {/* 현재 경로에 따라 해당 컴포넌트를 렌더링 */}
      <Routes>
        <Route path="/" element={<KakaoMap hospitals={hospitals} onHospitalClick={goToHospitalPage} />} />
        <Route path="/map" element={<KakaoMap hospitals={hospitals} onHospitalClick={goToHospitalPage} />} />
        <Route path="/hospitals" element={<HospitalListPage hospitals={hospitals} />} />
        <Route path="/hospital/:id" element={<HospitalDetailPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      {/* 하단 네비게이션 바 */}
      <nav className="fixed bottom-4 w-[90%] max-w-screen-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md flex justify-around py-2 text-gray-700 z-20">
        <Link to="/" className="flex flex-col items-center hover:text-primary">
          <span className="text-lg">🏠</span>
          <span className="text-sm font-semibold">홈</span>
        </Link>
        <Link to="/hospitals" className="flex flex-col items-center hover:text-primary">
          <span className="text-lg">🐾</span>
          <span className="text-sm font-semibold">병원</span>
        </Link>
        <Link to="/map" className="flex flex-col items-center hover:text-primary">
          <span className="text-lg">🗺️</span>
          <span className="text-sm font-semibold">지도</span>
        </Link>
        <Link to="/mypage" className="flex flex-col items-center hover:text-primary">
          <span className="text-lg">👤</span>
          <span className="text-sm font-semibold">마이페이지</span>
        </Link>
        <Link to="/signup" className="flex flex-col items-center hover:text-primary">
          <span className="text-lg">📝</span>
          <span className="text-sm font-semibold">회원가입</span>
        </Link>
        <Link to="/login" className="flex flex-col items-center hover:text-primary">
          <span className="text-lg">🔑</span>
          <span className="text-sm font-semibold">로그인</span>
        </Link>
      </nav>
    </div>
  );
}

export default App;
