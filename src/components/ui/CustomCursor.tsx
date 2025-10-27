import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';

interface CustomCursorProps {
  children: React.ReactNode;
}

export default function CustomCursor({ children }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  // Detect if device is mobile/touch
  useEffect(() => {
    const checkIsMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
             ('ontouchstart' in window) || 
             (navigator.maxTouchPoints > 0);
    };
    
    setIsMobile(checkIsMobile());
  }, []);

  useEffect(() => {
    // If mobile, don't hide cursor or add custom cursor
    if (isMobile) return;
    
    // Optimized mouse position update with requestAnimationFrame throttling
    const updateMousePosition = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMousePosition(mousePositionRef.current);
          rafRef.current = null;
        });
      }
    };

    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Set initial position
    const initialPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mousePositionRef.current = initialPos;
    setMousePosition(initialPos);

    // Add event listeners
    window.addEventListener('mousemove', updateMousePosition, { passive: true });

    // Optimized hover listeners with useCallback-like optimization
    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      // Cancel pending RAF if exists
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
      
      // Remove event listeners
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile]);

  // Mini Earth rendering logic
  useEffect(() => {
    // If mobile, don't initialize canvas
    if (isMobile || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set up mini globe dimensions (cursor size)
    const size = 32;
    const radius = size / 2.2;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    context.scale(dpr, dpr);

    // Create projection for mini globe (cached)
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([size / 2, size / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);
    
    // Cache graticule outside render to avoid recreation
    const graticule = d3.geoGraticule();
    const graticuleData = graticule();

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }

      return inside;
    };

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry;

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates;
        if (!pointInPolygon(point, coordinates[0])) {
          return false;
        }
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false;
          }
        }
        return true;
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) {
              return true;
            }
          }
        }
        return false;
      }

      return false;
    };

    const generateDotsInPolygon = (feature: any, dotSpacing = 8) => {
      const dots: [number, number][] = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;

      const stepSize = dotSpacing * 0.15;
      let pointsGenerated = 0;

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
            pointsGenerated++;
          }
        }
      }

      return dots;
    };

    const allDots: { lng: number; lat: number; visible: boolean }[] = [];
    let landFeatures: any;

    const render = () => {
      context.clearRect(0, 0, size, size);

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      // Draw ocean (globe background) - OPEF green theme
      context.beginPath();
      context.arc(size / 2, size / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = "#0D1B12"; // OPEF ink-base color
      context.fill();
      context.strokeStyle = "#97B34D"; // OPEF olive color
      context.lineWidth = 1 * scaleFactor;
      context.stroke();

      if (landFeatures) {
        // Draw graticule - OPEF green theme (using cached graticule)
        context.beginPath();
        path(graticuleData);
        context.strokeStyle = "#97B34D"; // OPEF olive color
        context.lineWidth = 0.5 * scaleFactor;
        context.globalAlpha = 0.4;
        context.stroke();
        context.globalAlpha = 1;

        // Draw land outlines - OPEF green theme
        context.beginPath();
        landFeatures.features.forEach((feature: any) => {
          path(feature);
        });
        context.strokeStyle = "#97B34D"; // OPEF olive color
        context.lineWidth = 1 * scaleFactor;
        context.stroke();

        // Draw halftone dots - OPEF green theme (optimized batch drawing)
        context.fillStyle = "#97B34D"; // OPEF olive color - set once
        context.globalAlpha = 0.7; // Set once for all dots
        
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= size &&
            projected[1] >= 0 &&
            projected[1] <= size
          ) {
            context.beginPath();
            context.arc(projected[0], projected[1], 0.8 * scaleFactor, 0, 2 * Math.PI);
            context.fill();
          }
        });
        
        context.globalAlpha = 1; // Reset after batch
      }
    };

    const loadWorldData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        );
        if (!response.ok) throw new Error("Failed to load land data");

        landFeatures = await response.json();

        // Generate dots for all land features
        let totalDots = 0;
        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 8);
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true });
            totalDots++;
          });
        });

        render();
      } catch (err) {
        console.error("Failed to load land map data for cursor:", err);
      }
    };

    // Set up rotation for mini globe
    const rotation: [number, number, number] = [0, 0, 0];
    let autoRotate = true;
    const rotationSpeed = 0.3;
    let lastFrameTime = Date.now();
    const targetFPS = 30; // Target 30 FPS for rotation
    const frameDelay = 1000 / targetFPS;

    const rotate = () => {
      if (autoRotate) {
        const now = Date.now();
        const timeDelta = now - lastFrameTime;
        
        if (timeDelta >= frameDelay) {
          rotation[0] += rotationSpeed;
          projection.rotate(rotation);
          render();
          lastFrameTime = now;
        }
      }
    };

    // Auto-rotation timer (throttled to target FPS)
    const rotationTimer = d3.timer(rotate);

    // Load the world data
    loadWorldData();

    // Cleanup
    return () => {
      rotationTimer.stop();
    };
  }, [isMobile]);

  return (
    <>
      {children}
      
      {/* Custom Earth Cursor - only show on non-mobile devices */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{
            x: mousePosition.x - 16, // Center the cursor (32px / 2)
            y: mousePosition.y - 16,
          }}
          animate={{
            scale: isHovering ? 1.3 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
        >
          {/* Mini Earth Canvas */}
          <div className="relative w-8 h-8">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ 
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(151, 179, 77, 0.5)'
              }}
            />
            
            {/* Hover effect with expanding ring */}
            {isHovering && (
              <motion.div
                className="absolute inset-0 rounded-full border border-[#97B34D]"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}
