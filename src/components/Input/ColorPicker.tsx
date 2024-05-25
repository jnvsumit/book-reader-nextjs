import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/css';

interface ColorPickerProps {
  colors: string[];
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, value, onChange }) => {
  const [showPalette, setShowPalette] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  const handleColorClick = (color: string) => {
    onChange(color);
    setShowPalette(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) {
      setShowPalette(false);
    }
  };

  useEffect(() => {
    if (showPalette) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPalette]);

  return (
    <div className={css`
      position: relative;
      display: inline-block;
    `}>
      <button
        className={css`
          width: 30px;
          height: 30px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: ${value};
          cursor: pointer;
          &:hover {
            background-color: ${value};
            border-color: #aaa;
          }
        `}
        onClick={() => setShowPalette(!showPalette)}
      />
      {showPalette && (
        <div
          ref={paletteRef}
          className={css`
            position: absolute;
            top: 40px;
            left: 0;
            z-index: 999;
            display: grid;
            grid-template-columns: repeat(5, 30px);
            gap: 5px;
            padding: 10px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          `}
        >
          {colors.map((color) => (
            <div
              key={color}
              className={css`
                width: 30px;
                height: 30px;
                background-color: ${color};
                border: 1px solid #ddd;
                border-radius: 4px;
                cursor: pointer;
                &:hover {
                  border-color: #aaa;
                }
              `}
              onClick={() => handleColorClick(color)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;