import React from 'react';

const HospitalDetail = ({ hospital }) => {
  // 병원 정보가 없을 때는 null 반환
  if (!hospital) return null;

  return (
    <div className="hospital-detail">
      <h2>{hospital.hospitalName}</h2> {/* 병원 이름 */}
      <p>{hospital.address}</p> {/* 병원 주소 */}
      <p>전화번호: {hospital.phoneNumber}</p> {/* 병원 전화번호 */}
      <p>영업 시간: {hospital.operatingHours}</p> {/* 병원 영업시간 */}
      <p>거리: 1.2 km</p> {/* 거리 예시 */}
      <img src={hospital.imagePath || '/default-image.jpg'} alt="병원 이미지" /> {/* 병원 이미지 */}
    </div>
  );
};

export default HospitalDetail;
