import React, { useEffect } from "react";
import { RxHeight, RxWidth, RxColorWheel, RxShadow } from "react-icons/rx";
import { LuDiameter, LuTrash } from "react-icons/lu";
import { FaBold, FaItalic } from "react-icons/fa";
import { RiFontFamily } from "react-icons/ri";
import Slider from "@/shared/ui/Slider";

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
  selectedObject: any;
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
  deleteObject: (object: any) => void;
  enableShadow: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shadowEnabled: boolean;
  canvas: any;
}

const Config = ({
  type,
  width,
  height,
  diameter,
  position,
  color,
  shadow,
  selectedObject,
  handleColorChange,
  handleShadowColorChange,
  handleShadowBlurChange,
  handleShadowOffsetXChange,
  handleShadowOffsetYChange,
  deleteObject,
  canvasBgColor,
  handleCanvascolorChange,
  enableShadow,
  shadowEnabled,
  canvas,
}: Props) => {
  const [fontSize, setFontSize] = React.useState(
    selectedObject?.fontSize || 16
  );
  const [fontFamily, setFontFamily] = React.useState(
    selectedObject?.fontFamily || "Arial"
  );

  const [fontWeight, setFontWeight] = React.useState(
    selectedObject?.fontWeight || "normal"
  );
  const [fontStyle, setFontStyle] = React.useState(
    selectedObject?.fontStyle || "normal"
  );
  const [imageFill, setImageFill] = React.useState(false);

  useEffect(() => {
    if (selectedObject) {
      setFontSize(selectedObject.fontSize || 16);
      setFontFamily(selectedObject.fontFamily || "Arial");
      setFontWeight(selectedObject.fontWeight || "normal");
      setFontStyle(selectedObject.fontStyle || "normal");
      if (type === "image") {
        setImageFill(
          selectedObject.scaleX === canvas.width / selectedObject.width &&
            selectedObject.scaleY === canvas.height / selectedObject.height
        );
      }
    }
  }, [selectedObject, type, canvas]);

  useEffect(() => {
    const newSize = parseInt(fontSize, 10);
    const newFontFamily = fontFamily;
    if (selectedObject) {
      selectedObject.set("fontSize", newSize);
      selectedObject.set("fontFamily", newFontFamily);
      selectedObject.set("fontWeight", fontWeight);
      selectedObject.set("fontStyle", fontStyle);
      canvas.renderAll();
    }

    console.log("font weight: " + fontWeight);
  }, [fontSize, selectedObject, canvas, fontFamily, fontWeight, fontStyle]);

  const handleFontStyle = (style: string) => {
    if (style === "bold") {
      setFontWeight("bold");
      selectedObject.set("fontWeight", "bold");
    } else if (style === "italic") {
      setFontWeight("italic");
      selectedObject.set("fontStyle", "italic");
    } else {
      setFontWeight("normal");
      selectedObject.set("fontWeight", "normal");
    }
    canvas.renderAll();
  };

  const handleImageFillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFill(e.target.checked);
    if (e.target.checked && selectedObject && type === "image") {
      selectedObject.set({
        scaleX: canvas.width / selectedObject.width,
        scaleY: canvas.height / selectedObject.height,
        objectFit: "contain",
      });
    } else if (selectedObject && type === "image") {
      selectedObject.set({
        scaleX: 1,
        scaleY: 1,
        objectFit: "none",
      });
    }
    canvas.renderAll();
  };

  return (
    <div className="flex flex-col gap-3 mt-3 h-full w-[250px]">
      <div>
        <span className="text-white text-lg capitalize">Canvas</span>
        <div className="flex items-center justify-between text-white border-b border-gray-500">
          <div className="flex items-center gap-3">
            <input
              id="color"
              type="color"
              value={canvasBgColor || "#ffffff"}
              onChange={handleCanvascolorChange}
              className="w-8 h-8 rounded-md border-none"
            />
            <span>{canvasBgColor || "#ffffff"}</span>
          </div>
          <RxColorWheel />
        </div>
      </div>

      {type ? (
        <>
          <div className="flex items-center justify-between text-white border-b border-gray-500">
            <span className="text-white text-lg capitalize">{type}</span>
            <LuTrash
              onClick={() => deleteObject(selectedObject)}
              className="cursor-pointer"
            />
          </div>

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
            {type !== "textbox" && (
              <div className="flex items-center justify-between">
                <span>Shadow</span>
                <input
                  onChange={enableShadow}
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer rounded-md border-none"
                  checked={selectedObject?.shadowEnabled || false}
                />
              </div>
            )}

            {selectedObject?.shadowEnabled && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      id="color"
                      type="color"
                      value={shadow.color}
                      onChange={handleShadowColorChange}
                      className="w-8 h-8 cursor-pointer rounded-md border-none"
                    />
                    <span>{shadow.color}</span>
                  </div>
                  <RxShadow />
                </div>

                <Slider
                  minVal={0}
                  maxVal={100}
                  value={shadow.blur}
                  callBack={handleShadowBlurChange}
                  label="Blur"
                />

                <Slider
                  minVal={-100}
                  maxVal={100}
                  value={shadow.offsetX}
                  callBack={handleShadowOffsetXChange}
                  label="Offset X"
                />

                <Slider
                  minVal={-100}
                  maxVal={100}
                  value={shadow.offsetY}
                  callBack={handleShadowOffsetYChange}
                  label="Offset Y"
                />
              </>
            )}

            {type === "textbox" && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label>Font size</label>
                  <input
                    onChange={(e: any) => setFontSize(e.target.value)}
                    type="number"
                    value={fontSize}
                    className="w-10 text-black"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label>Font Family</label>
                  <select
                  value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="text-black"
                  >
                    {[
                      "Arial",
                      "Verdana",
                      "Helvetica",
                      "Tahoma",
                      "Trebuchet MS",
                      "Times New Roman",
                      "Georgia",
                      "Garamond",
                      "Courier New",
                      "Brush Script MT",
                      "Open Sans",
                      "Noto Sans",
                      "Raleway",
                      "Roboto",
                      "Merriweather",
                      "Permanent Marker"
                    ].map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <label>Font Style</label>
                  <div className="flex gap-3">
                    <div
                      className={`${
                        fontWeight === "normal" && fontStyle === "normal"
                          ? "bg-gray-500"
                          : ""
                      } p-2 rounded-md`}
                    >
                      <RiFontFamily
                        onClick={() => handleFontStyle("normal")}
                        className="cursor-pointer"
                      />
                    </div>
                    <div
                      className={`${
                        fontWeight === "bold" ? "bg-gray-500" : ""
                      } p-2 rounded-md`}
                    >
                      <FaBold
                        onClick={() => handleFontStyle("bold")}
                        className="cursor-pointer"
                      />
                    </div>
                    <div
                      className={`${
                        fontWeight === "italic" ? "bg-gray-500" : ""
                      } p-2 rounded-md`}
                    >
                      <FaItalic
                        onClick={() => handleFontStyle("italic")}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {type === "image" && (
              <div className="flex items-center justify-between">
                <span>Image Fill</span>
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={imageFill}
                  onChange={handleImageFillChange}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-white text-lg h-full w-full flex justify-center items-center">
          Please select an object
        </div>
      )}
    </div>
  );
};

export default Config;
