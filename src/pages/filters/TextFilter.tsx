import React from 'react'
import { FaBold, FaItalic } from "react-icons/fa";
import { RiFontFamily } from "react-icons/ri";

interface Props {
    fontSize: any;
    setFontSize: any;
    fontFamily: any;
    setFontFamily: any;
    fontWeight: any;
    fontStyle: any;
    handleFontStyle: any;
}

const TextFilter = (
    { fontSize, setFontSize, fontFamily, setFontFamily, fontWeight, fontStyle, handleFontStyle }: Props
) => {
  return (
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
  )
}

export default TextFilter;
