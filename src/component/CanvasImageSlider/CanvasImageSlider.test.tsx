import { fireEvent, render, screen } from "@testing-library/react";
import CanvasImageSlider from "./CanvasImageSlider";

describe("CanvasImageSlider", () => {
  let images: HTMLImageElement[] = [];

  beforeEach(() => {
    const img = new Image();
    img.src = "";
    img.onload = () => jest.fn();
    images = [img];

    window.HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
        clearRect: jest.fn(),
        drawImage: jest.fn()
    })) as any;
  })

  afterEach(() => {
    (window.HTMLCanvasElement.prototype.getContext as any).mockRestore();
  });

  it("render canvas", () => {
    render(<CanvasImageSlider height={100} images={images} />);
    const canvasElement = screen.getByTestId    ("canvas-img-slider");
    expect(canvasElement).toBeInTheDocument();
  });

  test('handles mouse/touch events', () => {
    render(<CanvasImageSlider height={100} images={images} />);
    const canvasElement = screen.getByTestId('canvas-img-slider');

    fireEvent.mouseDown(canvasElement, { screenX: 100 });
    fireEvent.mouseMove(canvasElement, { screenX: 100 });
    expect(canvasElement).toHaveClass('cursor-grabbing')
    fireEvent.mouseUp(canvasElement);
    expect(canvasElement).not.toHaveClass('cursor-grabbing')
  });

});
