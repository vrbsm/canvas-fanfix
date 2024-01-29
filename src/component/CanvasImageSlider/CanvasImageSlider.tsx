import { useEffect, useRef, useState } from "react";
import cx from "classnames";
interface CanvasImageSliderProps {
  images: any[];
  height: number;
}
const CanvasImageSlider = ({ images, height }: CanvasImageSliderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coordinateX, setCoordinateX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imagesOffset, setImagesOffset] = useState(0);
  const imageWidth = 400;
  const imageGap = 10;

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const value = "touches" in e ? e.touches[0].screenX : e.screenX;
    setIsDragging(true);
    setCoordinateX(value);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (coordinateX !== null && isDragging) {
      const value = "touches" in e ? e.touches[0].screenX : e.screenX;
      const newOffsetX = value - coordinateX;
      const newImagesOffset = imagesOffset + newOffsetX;
      const maxOffset = -((images.length - 1) * (imageWidth + imageGap));
      setImagesOffset(Math.max(maxOffset, Math.min(0,newImagesOffset)));
      setCoordinateX(value);
    }
  };

  const drawImages = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    images.forEach((image, index) => {
      const x = index * (imageWidth + imageGap) + imagesOffset;
      context.drawImage(image, x, 0, imageWidth, image.height);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    drawImages(context, canvas);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, coordinateX]);

  return (
    <div className="flex flex-col">
      <canvas
        data-testid="canvas-img-slider"
        ref={canvasRef}
        height={height}
        width={400}
        className={cx(
          { "cursor-grabbing": isDragging },
          "cursor-grab bg-[whitesmoke]"
        )}
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
