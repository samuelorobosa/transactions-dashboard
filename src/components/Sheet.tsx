import { useEffect, useState } from "react";
import CloseIcon from "../assets/icons/close.svg?react";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface SheetContentProps {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SheetTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return <>{children}</>;
}

export function SheetTrigger({ children, onClick }: SheetTriggerProps) {
  return <div onClick={onClick}>{children}</div>;
}

export function SheetContent({
  children,
  side = "right",
  open,
  onOpenChange,
}: SheetContentProps) {
  const [isMounted, setIsMounted] = useState(open);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  const getTransform = () => {
    const shouldShowClosed = !isAnimating || !open;

    if (shouldShowClosed) {
      if (side === "right") {
        return "translateX(calc(100% + 8px))";
      } else if (side === "left") {
        return "translateX(calc(-100% - 8px))";
      } else if (side === "top") {
        return "translateY(calc(-100% - 8px))";
      } else {
        return "translateY(calc(100% + 8px))";
      }
    }
    return "translateX(0) translateY(0)";
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleBackdropClick}
        style={{
          backdropFilter: "blur(16px)",
        }}
      />
      <div
        className={`fixed z-50 bg-white transition-transform duration-300 ease-in-out ${
          side === "right"
            ? ""
            : side === "left"
            ? ""
            : side === "top"
            ? ""
            : ""
        }`}
        style={{
          backgroundColor: "#FFFFFF",
          padding: "20px 24px",
          borderRadius: "20px",
          boxShadow:
            "0px 8px 16px 4px rgba(188, 196, 204, 0.1), 0px 12px 24px 0px rgba(219, 222, 229, 0.1), 0px 16px 32px 0px rgba(219, 222, 229, 0.1)",
          width: side === "right" || side === "left" ? "456px" : "100%",
          height:
            side === "right" || side === "left" ? "calc(100vh - 16px)" : "auto",
          right: side === "right" ? "8px" : "auto",
          left: side === "left" ? "8px" : "auto",
          top:
            side === "right" || side === "left"
              ? "8px"
              : side === "top"
              ? "8px"
              : "auto",
          bottom:
            side === "right" || side === "left"
              ? "8px"
              : side === "bottom"
              ? "8px"
              : "auto",
          transform: getTransform(),
        }}
      >
        {children}
      </div>
    </>
  );
}

export function SheetHeader({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <div className="pb-5 flex items-center justify-between">
      {children}
      {onClose && (
        <button
          onClick={onClose}
          className="flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
          style={{
            width: "24px",
            height: "24px",
            padding: "5.7px",
          }}
        >
          <figure className="w-full h-full flex items-center justify-center">
            <CloseIcon className="w-full h-full" />
          </figure>
        </button>
      )}
    </div>
  );
}

export function SheetTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-bold text-2xl leading-[120%] tracking-[0%] align-middle capitalize text-black-300">
      {children}
    </h2>
  );
}

export function SheetDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-400">{children}</p>;
}

export function SheetClose({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return <div onClick={onClick}>{children}</div>;
}

export function SheetDateFilters({
  selectedPeriod,
  onPeriodChange,
}: {
  selectedPeriod?: string;
  onPeriodChange?: (period: string) => void;
}) {
  const periods = ["Today", "Last 7 days", "This month", "Last 3 months"];

  return (
    <div className="flex justify-between gap-3">
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => onPeriodChange?.(period)}
          className="font-semibold text-sm leading-4 tracking-[-0.4px] align-middle text-black-300 h-9 rounded-full border border-gray-50 px-4 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          {period}
        </button>
      ))}
    </div>
  );
}
