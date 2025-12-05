import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { universities } from '../data/universities';

interface MapSectionProps {
  onCityClick?: (city: string) => void;
  onUniversityClick?: (id: string) => void;
}

export function MapSection({ onCityClick, onUniversityClick }: MapSectionProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Координаты университетов
  const universityCoordinates: { [key: string]: [number, number] } = {
    '1': [43.2380, 76.9450], // КБТУ - Алматы
    '2': [51.0909, 71.4156], // Назарбаев Университет - Астана
    '3': [43.2357, 76.9458], // КазНУ им. аль-Фараби - Алматы
    '4': [43.2521, 76.9286], // КазНМУ - Алматы
    '5': [43.2382, 76.9452], // КИМЭП - Алматы
    '6': [43.2520, 76.9286], // Satbayev University - Алматы
  };

  // Города Казахстана
  const cities = [
    { name: 'Алматы', coords: [43.2220, 76.8512], count: 45 },
    { name: 'Астана', coords: [51.1694, 71.4491], count: 38 },
    { name: 'Шымкент', coords: [42.3417, 69.5901], count: 12 },
    { name: 'Караганда', coords: [49.8047, 73.1094], count: 15 },
    { name: 'Актобе', coords: [50.2839, 57.1670], count: 8 },
  ];

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.async = true;

    script.onload = () => {
      if (mapContainerRef.current && !(window as any).L) return;
      
      const L = (window as any).L;
      
      if (!L || mapRef.current) return;

      // Initialize map
      const map = L.map(mapContainerRef.current).setView([48.0196, 66.9237], 5);
      mapRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Add markers for cities
      cities.forEach((city) => {
        const marker = L.marker(city.coords).addTo(map);
        
        const popupContent = `
          <div style="padding: 8px; min-width: 180px;">
            <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1e40af;">${city.name}</h4>
            <div style="font-size: 14px; color: #666; margin-bottom: 8px;">
              <div>🎓 ${city.count} университетов</div>
            </div>
          </div>
        `;
        
        marker.bindPopup(popupContent);
        
        marker.on('click', () => {
          if (onCityClick) {
            onCityClick(city.name);
          }
        });
      });

      // Add markers for specific universities
      universities.forEach((uni) => {
        const coords = universityCoordinates[uni.id];
        if (coords) {
          // Create custom icon
          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background: #2563eb; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); font-size: 16px;">🎓</div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });

          const marker = L.marker(coords, { icon: customIcon }).addTo(map);
          
          const popupContent = `
            <div style="padding: 12px; min-width: 220px;">
              <h4 style="margin: 0 0 10px 0; font-size: 15px; font-weight: 600; color: #1e40af;">${uni.name}</h4>
              <div style="font-size: 13px; color: #666; margin-bottom: 10px; line-height: 1.6;">
                <div style="margin-bottom: 4px;">📍 ${uni.city}</div>
                <div style="margin-bottom: 4px;">⭐ Оценка: <strong>${uni.overallGrade}</strong></div>
                <div style="margin-bottom: 4px;">💰 ${(uni.tuition.min / 1000000).toFixed(1)} - ${(uni.tuition.max / 1000000).toFixed(1)} млн ₸</div>
              </div>
              <button 
                onclick="window.handleUniversityMapClick('${uni.id}')"
                style="
                  width: 100%;
                  padding: 8px 12px;
                  background: linear-gradient(to right, #2563eb, #3b82f6);
                  color: white;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                  font-size: 13px;
                  font-weight: 500;
                "
              >
                Подробнее
              </button>
            </div>
          `;
          
          marker.bindPopup(popupContent);
        }
      });

      // Add click handler to window for popup buttons
      (window as any).handleUniversityMapClick = (id: string) => {
        if (onUniversityClick) {
          onUniversityClick(id);
        }
      };

      setMapLoaded(true);
    };

    if (!document.querySelector('script[src*="leaflet"]')) {
      document.head.appendChild(script);
    } else if ((window as any).L && mapContainerRef.current && !mapRef.current) {
      script.onload(null as any);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      delete (window as any).handleUniversityMapClick;
    };
  }, [onUniversityClick, onCityClick]);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12">
      <div className="text-center mb-8">
        <h2 className="mb-4">Исследуй университеты по всему Казахстану</h2>
        <p className="text-text-secondary max-w-3xl mx-auto text-lg">
          Интерактивная карта с местоположением всех университетов. Кликни на маркер для подробной информации
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {cities.map((city) => (
          <button
            key={city.name}
            onClick={() => onCityClick?.(city.name)}
            className="bg-white rounded-xl p-4 border border-border hover:border-primary hover:shadow-lg transition-all duration-200 text-center group"
          >
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
              <MapPin size={20} />
            </div>
            <div className="text-sm mb-1 group-hover:text-primary transition-colors">{city.name}</div>
            <div className="text-xs text-text-secondary">{city.count} вузов</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl overflow-hidden border border-border shadow-lg">
        <div 
          ref={mapContainerRef}
          className="w-full h-[500px]"
          style={{ minHeight: '500px' }}
        />
      </div>

      <div className="mt-6 flex items-center justify-center gap-6 text-sm text-text-muted">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs">🎓</div>
          <span>Университеты</span>
        </div>
        <div className="flex items-center gap-2">
          <Navigation size={16} className="text-primary" />
          <span>Нажмите на маркеры для подробной информации</span>
        </div>
      </div>
    </section>
  );
}
