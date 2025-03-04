import {
  Canvas,
  Circle,
  FabricObject,
  Rect,
  SerializedShadowOptions,
  Triangle,
} from "fabric";
import React, { useRef, useState, useEffect } from "react";
import Settings from "./Settings";
import Controls from "./Controls";
import LayersComponent from "./LayersComponent";

const Fabric = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [shapes, setShapes] = useState([]);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [diameter, setDiameter] = useState<number>(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canvasBgColor, setCanvasBgColor] = useState<string>("#fff");

  const [color, setColor] = useState("#DB4D42");
  const [shadow, setShadow] = useState({
    color: `rgba(255,255,255,0)`,
    blur: 0,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });

      // initCanvas.backgroundColor = "#1f2937";
      initCanvas.backgroundColor = canvasBgColor;
      initCanvas.renderAll();

      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (!canvas) return;
  
    const updateShapes = () => {
      const objects = canvas.getObjects().map(obj => ({
        type: obj.type || "unknown",
        object: obj,
      })) as any;
      setShapes(objects);
    };
  
    canvas.on("object:added", updateShapes);
    canvas.on("object:removed", updateShapes);
    canvas.on("object:modified", updateShapes);
  
    return () => {
      canvas.off("object:added", updateShapes);
      canvas.off("object:removed", updateShapes);
      canvas.off("object:modified", updateShapes);
    };
  }, [canvas]);
  

  const addRectangle = () => {
    if (canvas) {
      const rect = new Rect({
        top: 100,
        left: 50,
        width: 100,
        height: 60,
        fill: "#DB4D42",
        shadow: {
          color: "rgba(255, 255, 255, 0)",
          blur: 0,
          offsetX: 0,
          offsetY: 0,
          affectStroke: false,
          includeDefaultValues: false,
          nonScaling: false,
          id: 0,
          toSVG: function (object: FabricObject): string {
            throw new Error("Function not implemented.");
          },
          toObject: function (): Partial<SerializedShadowOptions> {
            throw new Error("Function not implemented.");
          },
        },
      });

      canvas.add(rect);
    }
  };

  const addCircle = () => {
    if (canvas) {
      const circle = new Circle({
        top: 100,
        left: 50,
        radius: 50,
        fill: "#DB4D42",
        shadow: {
          color: "rgba(255, 255, 255, 0)",
          blur: 0,
          offsetX: 0,
          offsetY: 0,
          affectStroke: false,
          includeDefaultValues: false,
          nonScaling: false,
          id: 0,
          toSVG: function (object: FabricObject): string {
            throw new Error("Function not implemented.");
          },
          toObject: function (): Partial<SerializedShadowOptions> {
            throw new Error("Function not implemented.");
          },
        },
      });

      canvas.add(circle);
    }
  };

  const addTriangle = () => {
    if (canvas) {
      const triangle = new Triangle({
        top: 100,
        left: 50,
        fill: "#DB4D42",
        width: 100,
        height: 100,
        shadow: {
          color: "rgba(255, 255, 255, 0)",
          blur: 0,
          offsetX: 0,
          offsetY: 0,
          affectStroke: false,
          includeDefaultValues: false,
          nonScaling: false,
          id: 0,
          toSVG: function (object: FabricObject): string {
            throw new Error("Function not implemented.");
          },
          toObject: function (): Partial<SerializedShadowOptions> {
            throw new Error("Function not implemented.");
          },
        },
      });

      canvas.add(triangle);
    }
  };

  useEffect(() => {
    if (!canvas) return;

    const handleSelection = (event: any) => {
      handleObjectSelection(event.selected[0]);
    };

    const handleModification = (event: any) => {
      handleObjectSelection(event.target);
    };

    const handleClear = () => {
      setSelectedObject(null);
      clearSettings();
    };

    canvas.on("selection:created", handleSelection);
    canvas.on("selection:updated", handleSelection);
    canvas.on("selection:cleared", handleClear);
    canvas.on("object:modified", handleModification);
    canvas.on("object:moving", handleModification);
    canvas.on("object:scaling", handleModification);
    return () => {
      canvas.off("selection:created", handleSelection);
      canvas.off("selection:updated", handleSelection);
      canvas.off("selection:cleared", handleClear);
      canvas.off("object:modified", handleModification);
      canvas.off("object:moving", handleModification);
      canvas.off("object:scaling", handleModification);
    };
  }, [canvas]);

  const handleObjectSelection = (object: any) => {
    if (!object) return;

    setSelectedObject(object);
    setPosition({ x: Math.round(object.left), y: Math.round(object.top) });

    if (object.type === "rect" || object.type === "triangle") {
      setWidth(Math.round(object.width * object.scaleX));
      setHeight(Math.round(object.height * object.scaleY));
    } else if (object.type === "circle") {
      setDiameter(Math.round(object.radius * 2 * object.scaleX));
    }

    if (object.fill) {
      setColor(object.fill);
    }

    if (object.shadow) {
      setShadow({
        color: object.shadow.color || `rgba(255,255,255,0)`,
        blur: object.shadow.blur || 30,
        offsetX: object.shadow.offsetX || 5,
        offsetY: object.shadow.offsetY || 2,
      });
    }
  };

  const clearSettings = () => {
    setWidth(0);
    setHeight(0);
    setDiameter(0);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col">
      <Controls
        addRectangle={addRectangle}
        addCircle={addCircle}
        addTriangle={addTriangle}

      />
      <div className="flex gap-10">
        <LayersComponent
          canvas={canvas}
          shapes={shapes}
          setShapes={setShapes}
        />
        <canvas id="canvas" ref={canvasRef} />
        <Settings
          selectedObject={selectedObject}
          width={width}
          height={height}
          color={color}
          shadow={shadow}
          diameter={diameter}
          position={position}
          canvas={canvas}
          setColor={setColor}
          setShadow={setShadow}
          canvasBgColor={canvasBgColor}
          setCanvasBgColor={setCanvasBgColor}
        />
      </div>
    </div>
  );
};

export default Fabric;
