// src/HospitalVue/HospitalDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HospitalDetailPage.css';

function HospitalDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState({
    hospitalName: '',
    address: '',
    phoneNumber: '',
    operatingHours: '',
    imagePath: ''
  });
  const [reviews, setReviews] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8765/hospitals/${id}`)
      .then(response => setHospital(response.data))
      .catch(error => console.error('Error fetching hospital data:', error));

    axios.get(`http://localhost:8765/hospitals/${id}/reviews`)
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews data:', error));
  }, [id]);

  return (
    <div className="hospital-detail-page">
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>⬅️</button>
        <h2>병원 상세 정보</h2>
      </header>

      <div className="hospital-info">
        <img
          src={hospital.imagePath || '/default-image.png'}
          alt={`${hospital.hospitalName} 이미지`}
          className="hospital-image"
        />
        <div className="hospital-details">
          <h3>{hospital.hospitalName || '병원 이름 없음'} <span className="heart">❤️</span></h3>
          <div className="info-item">
            <span className="info-label">주소:</span>
            <span className="info-value">{hospital.address || '주소 정보 없음'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">연락처:</span>
            <span className="info-value">{hospital.phoneNumber || '전화번호 정보 없음'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">영업 시간:</span>
            <span className="info-value">{hospital.operatingHours === '0' ? '영업 시간 정보 없음' : hospital.operatingHours || '영업 시간 정보 없음'}</span>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h4>등록된 리뷰</h4>
        {reviews.slice(0, showMore ? reviews.length : 2).map((review, index) => (
          <div className="review" key={index}>
            <div className="review-rating">⭐ {review.rating}</div>
            <div className="review-details">
              <p>방문 날짜: {review.visitDate}</p>
              <p>진료비: {review.cost}원</p>
              <p>리뷰 내용: {review.content}</p>
            </div>
          </div>
        ))}
        {reviews.length > 2 && (
          <button className="load-more" onClick={() => setShowMore(!showMore)}>
            {showMore ? '리뷰 접기' : '리뷰 더보기'}
          </button>
        )}
      </div>

    </div>
  );
}

export default HospitalDetailPage;
