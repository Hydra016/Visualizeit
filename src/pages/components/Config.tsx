import React from "react";
import { RxHeight, RxWidth, RxColorWheel, RxShadow } from "react-icons/rx";
import { LuDiameter } from "react-icons/lu";

type Shadow = {
  color: string;
  blur: number;
  offsetX: number;
  offsetY: number;
};

interface Props {
  type: String;
  width: number;
  height: number;
  diameter: number;
  position: {
    x: number;
    y: number;
  };
  color: string | number | readonly string[] | undefined;
  handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shadow: Shadow;
  handleShadowColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleShadowBlurChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleShadowOffsetXChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleShadowOffsetYChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  canvasBgColor: string;
  setCanvasBgColor: React.Dispatch<React.SetStateAction<string>>;
  handleCanvascolorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Config = ({
  type,
  width,
  height,
  diameter,
  position,
  color,
  shadow,
  handleColorChange,
  handleShadowColorChange,
  handleShadowBlurChange,
  handleShadowOffsetXChange,
  handleShadowOffsetYChange,
  canvasBgColor,
  setCanvasBgColor,
  handleCanvascolorChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 mt-3">
      <div>
      <span className="text-white text-lg capitalize">
        Canvas
      </span>
      <div className="flex items-center justify-between text-white border-b border-gray-500">
        <div className="flex items-center gap-3">
          <input
            id="color"
            type="color"
            value={canvasBgColor}
            onChange={handleCanvascolorChange}
            className="w-8 h-8 rounded-md border-none"
          />
          <span>{canvasBgColor}</span>
        </div>
        <RxColorWheel />
      </div>

      </div>


      <span className="text-white text-lg capitalize">
        {type ? type : "Select an object"}
      </span>

      <div className="text-white flex justify-between gap-6 items-center">
        {type === "circle" ? (
          <div className="flex items-center w-full gap-3">
            <LuDiameter color="#fff" />
            <span>{diameter}</span>
          </div>
        ) : (
          <>
            <div className="flex items-center w-full justify-between">
              <RxWidth color="#fff" />
              <span>{width}</span>
            </div>

            <div className="flex items-center w-full justify-between">
              <RxHeight color="#fff" />
              <span>{height}</span>
            </div>
          </>
        )}
      </div>
      <div className="text-white flex justify-between gap-6 items-center">
        <div className="flex items-center w-full justify-between">
          <span>X</span>
          <span>{position.x}</span>
        </div>
        <div className="flex items-center w-full justify-between">
          <span>Y</span>
          <span>{position.y}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-white border-t border-gray-500">
        <div className="flex items-center gap-3">
          <input
            id="color"
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-8 h-8 rounded-md border-none"
          />
          <span>{color}</span>
        </div>
        <RxColorWheel />
      </div>

      <div className="text-white border-t border-gray-500 py-5">
        <span>Shadow</span>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={shadow.color}
              onChange={handleShadowColorChange}
              className="w-8 h-8 rounded-md border-none"
            />
            <span>{shadow.color}</span>
          </div>
          <RxShadow />
        </div>

        <div>
          <span>Blur</span>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={shadow.blur}
            onChange={handleShadowBlurChange}
            className="w-full"
          />
        </div>

        <div>
          <span>Offset X</span>
          <input
            type="range"
            min="-100"
            max="100"
            step="1"
            value={shadow.offsetX}
            onChange={handleShadowOffsetXChange}
            className="w-full"
          />
        </div>

        <div>
          <span>Offset Y</span>
          <input
            type="range"
            min="-100"
            max="100"
            step="1"
            value={shadow.offsetY}
            onChange={handleShadowOffsetYChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Config;
