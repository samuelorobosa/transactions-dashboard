import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Skeleton from "../Skeleton";

describe("Skeleton", () => {
  it("should render with default props", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("bg-gray-50", "rounded");
  });

  it("should apply rectangular variant", () => {
    const { container } = render(<Skeleton variant="rectangular" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveClass("rounded");
  });

  it("should apply circular variant", () => {
    const { container } = render(<Skeleton variant="circular" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveClass("rounded-full");
  });

  it("should apply text variant", () => {
    const { container } = render(<Skeleton variant="text" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveClass("rounded");
  });

  it("should apply custom width and height", () => {
    const { container } = render(<Skeleton width={100} height={50} />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveStyle({ width: "100px", height: "50px" });
  });

  it("should apply string width and height", () => {
    const { container } = render(<Skeleton width="50%" height="100vh" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveStyle({ width: "50%", height: "100vh" });
  });

  it("should apply custom className", () => {
    const { container } = render(<Skeleton className="custom-class" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveClass("custom-class");
  });

  it("should apply pulse animation by default", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveClass("animate-pulse");
  });

  it("should apply wave animation", () => {
    const { container } = render(<Skeleton animation="wave" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveClass("animate-[shimmer_2s_infinite]");
  });

  it("should apply no animation", () => {
    const { container } = render(<Skeleton animation="none" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).not.toHaveClass("animate-pulse");
    expect(skeleton).not.toHaveClass("animate-[shimmer_2s_infinite]");
  });
});
