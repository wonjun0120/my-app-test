import { useEffect } from 'react';
import Script from 'next/script';

const NaverMap = () => {
  useEffect(() => {
    const initializeMap = () => {
      if (!window.naver) return;

      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const mapOptions = {
          center: new naver.maps.LatLng(latitude, longitude),
          zoom: 14, // 주변 동 정도의 줌 레벨로 설정
        };

        const map = new naver.maps.Map('map', mapOptions);

        new naver.maps.Marker({
          position: new naver.maps.LatLng(latitude, longitude),
          map,
        });
      }, (error) => {
        console.error('Error fetching location:', error);
      });
    };

    if (window.naver) {
      initializeMap();
    } else {
      window.addEventListener('load', initializeMap);
    }

    return () => window.removeEventListener('load', initializeMap);
  }, []);

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="beforeInteractive"
        onLoad={() => console.log('Naver Maps script loaded')}
      />
      <div id="map" style={{ width: '100%', height: '100vh' }} />
    </>
  );
};

export default NaverMap;
