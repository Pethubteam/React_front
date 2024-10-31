import React, { useEffect, useState, useRef, useCallback } from 'react';

const KakaoMap = ({ hospitals, onHospitalClick }) => {
  const [userPosition, setUserPosition] = useState(null); // 사용자 위치 상태
  const mapRef = useRef(null); // 지도 객체 참조

  // 사용자 위치 가져오기 - 처음 로딩 시에만 실행
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserPosition({ lat, lng });
        },
        (error) => {
          console.error("Error getting geolocation: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // 지도를 초기화하고 마커 추가
  const initializeMap = useCallback(() => {
    if (!userPosition || mapRef.current) return;

    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(userPosition.lat, userPosition.lng),
      level: 3,
    };
    mapRef.current = new window.kakao.maps.Map(container, options);

    // 사용자 위치 마커
    const userMarkerPosition = new window.kakao.maps.LatLng(userPosition.lat, userPosition.lng);
    const userMarker = new window.kakao.maps.Marker({
      position: userMarkerPosition,
      title: "Your Location",
      image: new window.kakao.maps.MarkerImage(
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
        new window.kakao.maps.Size(24, 35)
      ),
    });
    userMarker.setMap(mapRef.current);

    // 병원 마커 및 정보창 설정
    hospitals.forEach(hospital => {
      const hospitalPosition = new window.kakao.maps.LatLng(hospital.lat, hospital.lng);
      const hospitalMarker = new window.kakao.maps.Marker({
        position: hospitalPosition,
        title: hospital.hospitalName,
      });
      hospitalMarker.setMap(mapRef.current);

      // 정보창에 "자세히 보기" 버튼 추가
      const infowindowContent = `
        <div style="padding:10px; width:150px; font-size:14px;">
          <strong>${hospital.hospitalName}</strong><br />
          ${hospital.address}<br />
          <button onclick="window.onHospitalClick(${hospital.id})" 
            style="margin-top:5px; padding:5px; background:#007bff; color:white; border:none; border-radius:4px; cursor:pointer;">
            자세히 보기
          </button>
        </div>
      `;
      const infowindow = new window.kakao.maps.InfoWindow({
        content: infowindowContent,
      });

      // 마커 클릭 시 정보창을 열고 병원 정보를 상위 컴포넌트로 전달
      window.kakao.maps.event.addListener(hospitalMarker, 'click', () => {
        infowindow.open(mapRef.current, hospitalMarker); // 정보창 열기
        window.onHospitalClick = () => onHospitalClick(hospital.id); // 병원 ID 전달
      });
    });
  }, [userPosition, hospitals, onHospitalClick]);

  // Kakao Maps API 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=fa23eae09baacedfdd746f0fa092bcbd&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (userPosition) initializeMap();
      });
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [userPosition, initializeMap]);

  return (
    <div id="map" className="w-full h-80 md:h-[1500px] lg:h-[900px] mx-auto"></div>
  );
};

export default KakaoMap;
