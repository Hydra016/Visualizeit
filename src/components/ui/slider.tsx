import React from "react";

interface Props {
    label: string;
    minVal: number;
    maxVal: number;
    value: number;
    callBack: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider = ({
    minVal,
    maxVal,
    value,
    callBack,
    label
} : Props) => {
  return (
    <div>
      <span>{label}</span>
      <input
        type="range"
        min={minVal}
        max={maxVal}
        step="1"
        value={value}
        onChange={callBack}
        className="w-full"
      />
    </div>
  );
};

export default Slider;
