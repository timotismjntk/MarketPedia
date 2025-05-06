
import React, { useState, useEffect, useRef } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface LiveStreamPopupProps {
  stream: {
    id: string;
    title: string;
    thumbnailImage: string;
    sellerName: string;
  };
  onClose: () => void;
}

const LiveStreamPopup: React.FC<LiveStreamPopupProps> = ({ stream, onClose }) => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Calculate a good initial position (bottom right corner)
  useEffect(() => {
    const calculateInitialPosition = () => {
      const padding = 20;
      const width = isMinimized ? 120 : 300;
      const height = isMinimized ? 40 : 200;
      
      return {
        x: window.innerWidth - width - padding,
        y: window.innerHeight - height - padding - 70 // Account for bottom nav
      };
    };
    
    setPosition(calculateInitialPosition());
  }, [isMinimized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Ensure the popup stays within the viewport
    const width = popupRef.current?.offsetWidth || 300;
    const height = popupRef.current?.offsetHeight || 200;
    
    const boundedX = Math.max(0, Math.min(window.innerWidth - width, newX));
    const boundedY = Math.max(0, Math.min(window.innerHeight - height - 70, newY)); // Account for bottom navigation
    
    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    navigate(`/live/${stream.id}`);
  };

  const handleToggleSize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        // Ensure the popup stays within the viewport
        const width = popupRef.current?.offsetWidth || 300;
        const height = popupRef.current?.offsetHeight || 200;
        
        const boundedX = Math.max(0, Math.min(window.innerWidth - width, newX));
        const boundedY = Math.max(0, Math.min(window.innerHeight - height - 70, newY)); // Account for bottom navigation
        
        setPosition({ x: boundedX, y: boundedY });
      };
      
      const handleGlobalMouseUp = () => {
        setIsDragging(false);
      };
      
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  // Also handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const newX = touch.clientX - dragStart.x;
        const newY = touch.clientY - dragStart.y;
        
        // Ensure the popup stays within the viewport
        const width = popupRef.current?.offsetWidth || 300;
        const height = popupRef.current?.offsetHeight || 200;
        
        const boundedX = Math.max(0, Math.min(window.innerWidth - width, newX));
        const boundedY = Math.max(0, Math.min(window.innerHeight - height - 70, newY)); // Account for bottom navigation
        
        setPosition({ x: boundedX, y: boundedY });
        e.preventDefault(); // Prevent scrolling while dragging
      };
      
      const handleGlobalTouchEnd = () => {
        setIsDragging(false);
      };
      
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd);
      
      return () => {
        document.removeEventListener('touchmove', handleGlobalTouchMove);
        document.removeEventListener('touchend', handleGlobalTouchEnd);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div
      ref={popupRef}
      className={`fixed z-50 rounded-lg overflow-hidden shadow-lg cursor-move ${
        isMinimized ? 'w-auto' : 'w-[300px]'
      } ${isDragging ? 'opacity-80' : 'opacity-100'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isDragging ? 'none' : 'all 0.2s ease'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onClick={isMinimized ? handleToggleSize : handleClick}
    >
      {isMinimized ? (
        <div className="flex items-center bg-primary text-white p-2 pr-3">
          <Badge variant="destructive" className="flex items-center mr-2">
            <span className="w-1 h-1 bg-white rounded-full mr-0.5 animate-pulse"></span>
            LIVE
          </Badge>
          <span className="font-medium text-sm truncate">{stream.sellerName}</span>
          <button
            className="ml-2 p-1 hover:bg-white/10 rounded"
            onClick={handleToggleSize}
          >
            <Maximize2 size={16} />
          </button>
          <button
            className="ml-1 p-1 hover:bg-white/10 rounded"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <>
          <div className="relative">
            <img 
              src={stream.thumbnailImage} 
              alt={stream.title}
              className="w-full h-[150px] object-cover"
            />
            <div className="absolute top-2 left-2 flex gap-2">
              <Badge variant="destructive" className="flex items-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></span>
                LIVE
              </Badge>
            </div>
            <div className="absolute top-2 right-2 flex">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 bg-black/50 text-white hover:bg-black/70 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleSize(e);
                }}
              >
                <Minimize2 size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-1 bg-black/50 text-white hover:bg-black/70 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <X size={14} />
              </Button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <p className="text-white text-sm font-medium truncate">{stream.sellerName}</p>
            </div>
          </div>
          <div className="bg-white p-2 border-t">
            <p className="text-sm font-medium line-clamp-1">{stream.title}</p>
            <Button size="sm" className="w-full mt-2">
              Join Stream
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LiveStreamPopup;
