import { useEffect, useRef, useState } from "react";
import cx from 'classnames'
interface CanvasImageSliderProps {
  images: any[];
}
const CanvasImageSlider = ({ images }: CanvasImageSliderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState(0);
  const [coordinateX, setCoordinateX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleEnd = () => {
    setIsDragging(false)
    setCoordinateX(null);
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const value = "touches" in e ? e.touches[0].clientX : e.clientX;
    setIsDragging(true)
    setCoordinateX(value);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (coordinateX !== null) {
      const value = "touches" in e ? e.touches[0].clientX : e.clientX;
      const difference = coordinateX - value;
      if (Math.abs(difference) > 300) {
        const isRigthToLeft = difference > 0;
        setPosition((state) =>
          isRigthToLeft
            ? Math.min(state + 1, images.length - 1)
            : Math.max(state - 1, 0)
        );
        setCoordinateX(value);
      }
    }
  };

  const handleSliderChange = (e: any) => {
    const newPosition = e.target.value;
    setPosition(newPosition);
  };

  const drawImages = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const image = images[position];
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    drawImages(context, canvas);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, position]);

  return (
    <div
      className="flex flex-col"
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
        height={600}
        width={400}
        className={cx({ "cursor-grabbing" : isDragging }, "cursor-grab w-80 h-80 sm:w-[640px] sm:h-[400px]")}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseOut={handleEnd}
        onMouseMove={handleMove}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      ></canvas>
    </div>
  );
};
export default CanvasImageSlider;
