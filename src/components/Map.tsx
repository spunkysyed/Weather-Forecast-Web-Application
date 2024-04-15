import React from "react";

interface MapProps {
  lat: number;
  lon: number;
  zoom?: number;
}

const Map: React.FC<MapProps> = ({ lat, lon, zoom = 11 }) => {
  return (
    <>
      <iframe
        src={`https://maps.google.com/maps?q=${lat},${lon}&z=${zoom}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="google map"
        className="basis-1/1 md:basis-1/2 h-full opacity-85 rounded-3xl"
      ></iframe>
    </>
  );
};

export default Map;
