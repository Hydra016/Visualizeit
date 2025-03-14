import React, { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { Shape } from "../../types";
import { FiCircle, FiSquare, FiTriangle } from "react-icons/fi";

interface Props {
  shapes: Shape[];
  canvas: any;
  setShapes: any;
  selectedObject: any;
}

const LayersComponent = ({
  shapes,
  canvas,
  setShapes,
  selectedObject,
}: Props) => {
  const [activeObject, setActiveObject] = useState<any>(null);

  useEffect(() => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      setActiveObject(activeObject);
    }
  }, [selectedObject]);

  const renderShapeIcon = (shapeType: string) => {
    switch (shapeType) {
      case "rect":
        return <FiSquare />;
      case "circle":
        return <FiCircle />;
      case "triangle":
        return <FiTriangle />;
    }
  };

  const bringForward = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      const objectIndex = canvas._objects.indexOf(activeObject);

      if (objectIndex < canvas._objects.length - 1) {
        [canvas._objects[objectIndex], canvas._objects[objectIndex + 1]] = [
          canvas._objects[objectIndex + 1],
          canvas._objects[objectIndex],
        ];
        const updatedShapes = canvas.getObjects().map((obj: any) => ({
          type: obj.type,
          object: obj,
        }));
        setShapes(updatedShapes);
        canvas.renderAll();
      }
    }
  };

  const sendBackward = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      const objectIndex = canvas._objects.indexOf(activeObject);

      if (objectIndex > 0) {
        [canvas._objects[objectIndex], canvas._objects[objectIndex - 1]] = [
          canvas._objects[objectIndex - 1],
          canvas._objects[objectIndex],
        ];
        const updatedShapes = canvas.getObjects().map((obj: any) => ({
          type: obj.type,
          object: obj,
        }));
        setShapes(updatedShapes);
        canvas.renderAll();
      }
    }
  };

  return (
    <div className="flex flex-col h-fit pb-3 px-3 rounded bg-gray-800">
      <div className="flex items-center justify-center gap-10">
        <span className="py-3 text-xl font-semibold text-white">Layers</span>
        <div className="flex gap-3">
          <FiArrowUp
            className="cursor-pointer"
            onClick={() => bringForward()}
            color="#fff"
          />
          <FiArrowDown
            className="cursor-pointer"
            onClick={() => sendBackward()}
            color="#fff"
          />
        </div>
      </div>
      <div className="border-b border-gray-500"></div>

      <div className="text-white py-4 flex flex-col gap-3">
        {shapes && shapes.length > 0 ? (
          shapes
            .slice()
            .reverse()
            .map((shape: any) => {
              return (
                <div
                  className={`flex gap-2 items-center p-2 ${
                    shape.object &&
                    activeObject &&
                    activeObject.id === shape.object.id
                      ? "bg-gray-500 rounded"
                      : ""
                  }`}
                  key={shape.id}
                >
                  {renderShapeIcon(shape.type as string)}
                  <span>{shape.type}</span>
                </div>
              );
            })
        ) : (
          <div>Canvas is empty</div>
        )}
      </div>
    </div>
  );
};

export default LayersComponent;
