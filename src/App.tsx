import React from "react";
import CanvasImageSlider from "./component/CanvasImageSlider/CanvasImageSlider";

function App() {
  const images = [
    "/images/image-1.png",
    "/images/image-2.png",
    "/images/image-3.png",
    "/images/image-4.png",
  ];
  return (
    <div>
      <header>
        <b>Fanfix challenge</b>
      </header>
      <div className="h-[500px] w-full flex items-center justify-center bg-[whitesmoke]">
        <CanvasImageSlider images={images} />
      </div>
    </div>
  );
}

export default App;
