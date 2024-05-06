import React, { useEffect, useRef } from "react";

function Map(props) {
  const { center, zoom } = props;
  const mapRef = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className} size-full`}
      style={props.style}
    ></div>
  );
}

export default Map;
