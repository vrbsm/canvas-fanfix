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
        <b>Welcome to my Canvas Image Slider</b>
      </header>
      <div
        style={{
          height: "500px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "whitesmoke",
        }}
      >
        <CanvasImageSlider images={images} />
      </div>
    </div>
  );
}

export default App;
