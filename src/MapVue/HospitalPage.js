import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './HospitalPage.css';

const HospitalPage = () => {
  const { id } = useParams();  // URL에서 병원 ID 가져오기
  const [hospital, setHospital] = useState(null);  // 병원 정보 상태
  const [loading, setLoading] = useState(true);  // 로딩 상태 추가

  // 병원 ID에 따른 병원 정보 API 호출
  useEffect(() => {
    axios.get(`http://localhost:8765/hospitals/${id}`)
      .then(response => {
        console.log('Fetched hospital data:', response.data); // 병원 데이터 로그
        setHospital(response.data);  // 병원 정보 업데이트
        setLoading(false);  // 로딩 완료
      })
      .catch(error => {
        console.error('Error fetching hospital details:', error); // 오류 시 로그 출력
        setLoading(false);  // 오류 발생 시 로딩 종료
      });
  }, [id]);

  if (loading) return <p>병원 정보를 불러오는 중...</p>;  // 로딩 중 메시지

  if (!hospital) return <p>해당 병원 정보를 찾을 수 없습니다.</p>;  // 병원 정보가 없을 때 메시지

  return (
    <div className="hospital-page">
      <header className="header">
        <button className="back-button" onClick={() => window.history.back()}>⬅️ 뒤로 가기</button>
      </header>
      <div className="hospital-info">
        <img src={hospital.imagePath} alt={`${hospital.hospitalName} 이미지`} className="hospital-image" />  {/* 병원 이미지 */}
        <div className="hospital-details">
          <h3>{hospital.hospitalName} <span className="heart">❤️</span></h3> {/* 병원 이름 */}
          <p>주소: {hospital.address}</p>  {/* 병원 주소 */}
          <p>연락처: {hospital.phoneNumber || '전화번호 정보 없음'}</p>  {/* 병원 연락처 */}
          <p>영업 시간: {hospital.operatingHours || '영업 시간 정보 없음'}</p>  {/* 영업 시간 */}
        </div>
      </div>
      <div className="reviews-section">
        <h4>등록된 리뷰</h4>
        {/* 샘플 리뷰 */}
        <div className="review">
          <div className="review-score">⭐ 5.0</div>
          <div className="review-details">
            <p>방문 날짜: 2024-10-28</p>
            <p>진료비: 50000원</p>
            <p>리뷰 내용: 친절하고 전문적인 상담을 받을 수 있었습니다.</p>
          </div>
        </div>
        <button className="load-more">리뷰 더보기</button> {/* 더보기 버튼 */}
      </div>
      
    </div>
  );
};

export default HospitalPage;
