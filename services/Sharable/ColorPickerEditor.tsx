import React from "react";
import { ChromePicker, CirclePicker } from "react-color";
const ColorPickerEditor = ({
 value,
 onColorChange,
}: {
 value: any;
 onColorChange: (e: any) => void;
}) => {
 return (
  <div className="space-y-4">
   <ChromePicker
    color={value}
    onChange={(e) => onColorChange(e.hex)}
    className="border-r rounded-2xl mb-5"
   />
   <CirclePicker
    color={value}
    onChange={(e) => onColorChange(e.hex)}
    className=""
   />
  </div>
 );
};

export default ColorPickerEditor;
