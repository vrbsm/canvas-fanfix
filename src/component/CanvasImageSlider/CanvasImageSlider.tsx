import { useEffect, useRef, useState } from "react";

interface CanvasImageSliderProps {
  images: string[];
}
const CanvasImageSlider = ({ images }: CanvasImageSliderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState(0);

  const handleSliderChange = (e: any) => {
    const newPosition = e.target.value;
    setPosition(newPosition);
  };

  const drawImages = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Load this at the beginning of the app, move
    const image = images[position];
    const img = new Image();
    img.src = image;
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    drawImages(context, canvas);
  }, [images, position]);
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <input
        type="range"
        min="0"
        max={images.length - 1}
        value={position}
        onChange={handleSliderChange}
      />
      <canvas
        data-testid="canvas-img-slider"
        ref={canvasRef}
        width="640"
        height="400"
      ></canvas>
    </div>
  );
};
export default CanvasImageSlider;
