import React, { useState, useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import Config from "./Config";
import { MdLayersClear } from "react-icons/md";

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
    x: any;
    y: any;
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
  setCanvasBgColor,
}: Props) => {
  const [shadowEnabled, setShadowEnabled] = useState(false);

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
    canvas.backgroundColor = newColor;
    canvas.renderAll();
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

  const enableShadow = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedObject) {
      const isEnabled = e.target.checked;
      selectedObject.shadowEnabled = isEnabled;
      if (isEnabled) {
        setShadow((prev) => ({ ...prev, color: "rgba(0,0,0,0.75)" }));
        selectedObject.set("shadow", {
          color: "rgba(0,0,0,0.75)",
          blur: 30,
          offsetX: 5,
          offsetY: 2,
        });
      } else {
        setShadow((prev) => ({ ...prev, color: "rgba(0,0,0,0)" }));
        selectedObject.set("shadow", {
          color: "rgba(0,0,0,0)",
          blur: 0,
          offsetX: 0,
          offsetY: 0,
        });
      }
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

  const clearCanvas = () => {
    canvas.clear();
    canvas.backgroundColor = "#ffffff";
    setCanvasBgColor("#ffffff");
    canvas.renderAll();
  };

  const deleteObject = (object: any) => {
    if (object) {
      canvas.remove(object);
      canvas.renderAll();
    }
  };

  return (
    <div className="bg-gray-800 min-h-full flex flex-col rounded px-3">
      <div className="flex items-center justify-between gap-10">
        <div className="flex items-center gap-3">
          <FiSettings color="#fff" />
          <span className="py-3 text-xl font-semibold text-white">
            Settings
          </span>
        </div>
        <MdLayersClear color="#fff" cursor={"pointer"} onClick={clearCanvas} />
      </div>
      <div className="border-b border-gray-500"></div>
      <Config
        type={selectedObject && selectedObject.type}
        selectedObject={selectedObject}
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
        deleteObject={deleteObject}
        enableShadow={enableShadow}
        shadowEnabled={shadowEnabled}
      />
    </div>
  );
};

export default Settings;
