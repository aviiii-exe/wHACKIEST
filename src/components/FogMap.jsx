import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const FogMap = () => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  const HAMPI_LOCATION = [76.4600, 15.3350];

  useEffect(() => {
    // Prevent double-init
    if (mapInstance.current) return;

    try {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        // Using a reliable, key-free OSM style
        style: {
          version: 8,
          sources: {
            'osm': {
              type: 'raster',
              tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap Contributors',
            }
          },
          layers: [
            {
              id: 'osm',
              type: 'raster',
              source: 'osm',
            }
          ]
        },
        center: HAMPI_LOCATION,
        zoom: 13,
      });

      mapInstance.current = map;
      
      // Add a simple marker just to see "something"
      new maplibregl.Marker({ color: 'red' })
        .setLngLat(HAMPI_LOCATION)
        .addTo(map);

    } catch (error) {
      console.error("Map Error:", error);
    }

    // Cleanup
    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    // Force black background to see if container exists
    // Force high z-index to sit on top of everything
    <div 
      ref={mapContainer} 
      className="fixed inset-0 w-full h-full"
      style={{ 
        zIndex: 9999, 
        backgroundColor: '#1a1a1a' 
      }} 
    />
  );
};

export default FogMap;