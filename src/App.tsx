import React, { useEffect, useState } from "react";
import CanvasImageSlider from "./component/CanvasImageSlider/CanvasImageSlider";

function App() {
  const [images, setImages] = useState<any[] | null>(null)
  const [highestImage, setHighestImage] = useState(0)
  
  const urls = [
    "/images/image-1.png",
    "/images/image-2.png",
    "/images/image-3.png",
    "/images/image-4.png",
    "/images/image-5.png",
  ];

  const loadImage = (url: string) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
    });
  };

  
  useEffect(() => {
    const loadImages = async () => {
      const promises = urls.map((item) => loadImage(item))
      const loadedImages = await Promise.all(promises) as HTMLImageElement[]
      setHighestImage(loadedImages.reduce((accumulator, currentValue) =>  Math.max(currentValue.height, accumulator), 0))
      setImages(loadedImages)
    }
    loadImages()
  }, [])


  return (
    <div>
      <header>
        <b className="p-10">Fanfix challenge</b>
      </header>
      <div className="h-[500px] w-full flex items-center justify-center">
        { images && <CanvasImageSlider images={images} height={highestImage} />}
      </div>
    </div>
  );
}

export default App;
