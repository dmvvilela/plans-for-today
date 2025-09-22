import React, { useState, useRef, useEffect } from 'react';
import { Type, ChevronUp } from 'lucide-react';

const FontDropdown = ({ fonts, currentFont, setFont }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentFontName = fonts.find(f => f.value === currentFont)?.name || 'Caveat';

  const getFontFamily = (fontValue) => {
    switch (fontValue) {
      case 'caveat': return 'Caveat, cursive';
      case 'kalam': return 'Kalam, cursive';
      case 'architect': return 'Architects Daughter, cursive';
      case 'indie': return 'Indie Flower, cursive';
      case 'marker': return 'Permanent Marker, cursive';
      case 'shadows': return 'Shadows Into Light, cursive';
      default: return 'Caveat, cursive';
    }
  };

  return (
    <div className="font-dropdown" ref={dropdownRef}>
      <button
        className="font-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Type size={18} />
        <span style={{ fontFamily: getFontFamily(currentFont) }}>
          {currentFontName}
        </span>
        <ChevronUp
          size={14}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}
        />
      </button>

      {isOpen && (
        <div className="font-dropdown-menu">
          {fonts.map(font => (
            <button
              key={font.value}
              className={`font-dropdown-item ${currentFont === font.value ? 'active' : ''}`}
              onClick={() => {
                setFont(font.value);
                setIsOpen(false);
              }}
              style={{ fontFamily: getFontFamily(font.value) }}
            >
              {font.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FontDropdown;