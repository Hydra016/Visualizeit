import React, { useState, useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import Config from "./Config";

interface Props {
  canvas: any;
  selectedObject: any;
  width: number;
  height: number;
  color: string;
  shadow: {
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
  };
  diameter: number;
  position: {
    x: number;
    y: number;
  };
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setShadow: React.Dispatch<
    React.SetStateAction<{
      color: string;
      blur: number;
      offsetX: number;
      offsetY: number;
    }>
  >;
  canvasBgColor: string;
  setCanvasBgColor: React.Dispatch<React.SetStateAction<string>>;
}

const Settings = ({
  canvas,
  selectedObject,
  width,
  height,
  color,
  shadow,
  diameter,
  position,
  setColor,
  canvasBgColor,
  setShadow,
  setCanvasBgColor
}: Props) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);

    if (selectedObject) {
      selectedObject.set({ fill: newColor });
      canvas.renderAll();
    }
  };

  const handleCanvascolorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCanvasBgColor(newColor);

    if (selectedObject) {
      selectedObject.set({ fill: newColor });
      canvas.renderAll();
    }
  };

  const handleShadowColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setShadow((prev) => ({ ...prev, color: newColor }));

    if (selectedObject) {
      selectedObject.set("shadow", {
        ...selectedObject.shadow,
        color: newColor,
      });
      canvas.renderAll();
    }
  };


  const handleShadowBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBlur = parseInt(e.target.value, 10);
    setShadow((prev) => ({ ...prev, blur: newBlur }));

    if (selectedObject) {
      selectedObject.set("shadow", {
        ...selectedObject.shadow,
        blur: newBlur,
      });
      canvas.renderAll();
    }
  };

  const handleShadowOffsetXChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newOffsetX = parseInt(e.target.value, 10);
    setShadow((prev) => ({ ...prev, offsetX: newOffsetX }));

    if (selectedObject) {
      selectedObject.set("shadow", {
        ...selectedObject.shadow,
        offsetX: newOffsetX,
      });
      canvas.renderAll();
    }
  };

  const handleShadowOffsetYChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newOffsetY = parseInt(e.target.value, 10);
    setShadow((prev) => ({ ...prev, offsetY: newOffsetY }));

    if (selectedObject) {
      selectedObject.set("shadow", {
        ...selectedObject.shadow,
        offsetY: newOffsetY,
      });
      canvas.renderAll();
    }
  };

  return (
    <div className="bg-gray-800 min-h-full flex flex-col rounded px-3">
      <div className="flex items-center justify-center gap-10 px-3">
        <span className="py-3 text-xl font-semibold text-white">Settings</span>
        <div className="flex gap-3">
          <FiSettings color="#fff" />
        </div>
      </div>
      <div className="border-b border-gray-500"></div>
      <Config
        type={selectedObject && selectedObject.type}
        width={width}
        height={height}
        diameter={diameter}
        position={position}
        color={color}
        handleColorChange={handleColorChange}
        shadow={shadow}
        handleShadowColorChange={handleShadowColorChange}
        handleShadowBlurChange={handleShadowBlurChange}
        handleShadowOffsetXChange={handleShadowOffsetXChange}
        handleShadowOffsetYChange={handleShadowOffsetYChange}
        canvasBgColor={canvasBgColor}
        setCanvasBgColor={setCanvasBgColor}
        handleCanvascolorChange={handleCanvascolorChange}
      />
    </div>
  );
};

export default Settings;
