import { useEffect, useState, useRef } from "react";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg?react";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
}

export function CustomSelect({
  options,
  value = [],
  onChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsMounted(false);
          setIsAnimating(false);
        }, 200);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!isOpen) {
      setIsMounted(true);
      setIsAnimating(true);
      setIsOpen(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(false);
        });
      });
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsMounted(false);
        setIsAnimating(false);
      }, 200);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    let newValues: string[];
    if (selectedValues.includes(optionValue)) {
      newValues = selectedValues.filter((v) => v !== optionValue);
    } else {
      newValues = [...selectedValues, optionValue];
    }
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const displayText =
    selectedValues.length === 0
      ? "Select options"
      : selectedValues
          .map((val) => options.find((opt) => opt.value === val)?.label)
          .filter(Boolean)
          .join(", ");

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={handleToggle}
        className={`w-full rounded-lg border px-4 py-3.5 text-left text-sm text-black-300 hover:bg-gray-50 transition-colors cursor-pointer bg-white flex items-center justify-between ${
          isOpen
            ? "border-[3px] border-black-300"
            : "border border-gray-50 focus:outline-none"
        }`}
      >
        <span>{displayText}</span>
        <figure
          className="w-5 h-5 flex items-center justify-center"
          style={{
            paddingTop: "7.23px",
            paddingBottom: "7.75px",
            paddingLeft: "5.58px",
            paddingRight: "5.58px",
          }}
        >
          <ChevronDownIcon
            className={`w-full h-full transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </figure>
      </button>
      {isMounted && (
        <div
          className={`absolute z-50 w-full bg-white rounded-lg transition-all duration-200 ease-in-out ${
            isAnimating
              ? isOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
              : "opacity-100 translate-y-0"
          }`}
          style={{
            top: "calc(100% + 4px)",
            boxShadow:
              "0px 6px 12px 0px rgba(92, 115, 131, 0.08), 0px 4px 8px 0px rgba(92, 115, 131, 0.08)",
            padding: "8px",
          }}
        >
          {options.map((option) => {
            const isChecked = selectedValues.includes(option.value);
            return (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="flex items-center cursor-pointer hover:bg-gray-50 rounded-md transition-colors p-[14px] gap-3"
              >
                <div
                  className={`flex items-center justify-center w-5 h-5 rounded ${
                    isChecked
                      ? "bg-black-300 border-0"
                      : "bg-transparent border border-gray-50"
                  }`}
                >
                  {isChecked && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "Degular, sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "-0.4px",
                    color: "rgba(19, 19, 22, 1)",
                  }}
                >
                  {option.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
