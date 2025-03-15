import React from "react";
import ButtonComponent from "./Button";
import { FiCircle, FiSquare, FiTriangle, FiImage } from "react-icons/fi";
import { IoText } from "react-icons/io5";
import * as fabric from "fabric";
import {
  FabricObject,
  SerializedShadowOptions,
  Circle,
  Rect,
  Triangle,
  Textbox,
  Image
} from "fabric";
import uuid from "react-uuid";

interface Props {
  canvas: any;
}

const Controls = ({ canvas }: Props) => {
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let imgObj = e.target.files![0];
    let reader = new FileReader();
    reader.readAsDataURL(imgObj);
    reader.onload = (e: any) => {
      let imageUrl = e.target.result;
      let imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      imageElement.onload = () => {
        let image = new Image(imageElement);
        image.set({
          left: 10,
          top: 10,
          scaleX: 100 / imageElement.width,
          scaleY: 100 / imageElement.height,
          id: uuid(),
        });
        canvas.add(image);
        canvas.centerObject(image);
        canvas.renderAll();
        (document.getElementById("imageInput") as HTMLInputElement).value = "";
      };
    };
  };

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
        id: uuid(),
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
        id: uuid(),
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
          color: "rgba(0, 0, 0, 0)",
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
        id: uuid(),
      });

      canvas.add(triangle);
    }
  };

  const addText = () => {
    if (canvas) {
      const text = new Textbox("Enter Something...", {
        left: 50,
        top: 100,
        width: 150,
        fontSize: 20,
        fontStyle: "normal",
        fill: "#DB4D42",
        fontFamily: "Arial",
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
        id: uuid(),
      });

      canvas.add(text);
    }
  };

  return (
    <div>
      <div className="flex justify-center bg-gray-800 mb-5 rounded w-fit mx-auto px-10 py-3">
        <ButtonComponent callback={addRectangle}>
          <FiSquare />
        </ButtonComponent>
        <ButtonComponent callback={addCircle}>
          <FiCircle />
        </ButtonComponent>
        <ButtonComponent callback={addTriangle}>
          <FiTriangle />
        </ButtonComponent>
        <ButtonComponent
          callback={() => document.getElementById("imageInput")?.click()}
        >
          <FiImage />
        </ButtonComponent>
        <ButtonComponent callback={addText}>
          <IoText size={18} />
        </ButtonComponent>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleAddImage}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default Controls;
