import React from 'react'
import ButtonComponent from "./Button";
import { FiCircle, FiSquare, FiTriangle } from 'react-icons/fi';

interface Props {
    addRectangle: () => void;
    addCircle: () => void;
    addTriangle: () => void;
}

const Controls = ({ addRectangle, addCircle, addTriangle }: Props) => {
  return (
    <div>
      <div className="flex justify-center bg-gray-800 mb-5 rounded w-fit mx-auto px-10 py-3">
          <ButtonComponent callback={addRectangle}>
            <FiSquare />
            <span className="text-sm font-semibold">Rectangle</span>
          </ButtonComponent>
          <ButtonComponent callback={addCircle}>
            <FiCircle />
            <span className="text-sm font-semibold">Circle</span>
          </ButtonComponent>
          <ButtonComponent callback={addTriangle}>
            <FiTriangle />
            <span className="text-sm font-semibold">Triangle</span>
          </ButtonComponent>
        </div>
    </div>
  )
}

export default Controls
