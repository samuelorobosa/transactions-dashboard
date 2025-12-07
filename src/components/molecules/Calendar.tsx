import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import ChevronLeftIcon from "../../assets/icons/chevron-down.svg?react";
import ChevronRightIcon from "../../assets/icons/chevron-down.svg?react";

interface CalendarProps {
  mode?: "single";
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
}

const rotateLeft = { transform: "rotate(90deg)" };
const rotateRight = { transform: "rotate(-90deg)" };

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  className = "",
}: CalendarProps) {
  return (
    <DayPicker
      mode={mode}
      selected={selected}
      onSelect={onSelect}
      className={`calendar ${className}`}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4",
        caption: "rdp-caption",
        caption_label: "rdp-caption_label",
        nav: "rdp-nav",
        button_previous: "rdp-button_previous",
        button_next: "rdp-button_next",
        table: "rdp-table",
        head_row: "rdp-head_row",
        head_cell: "rdp-head_cell",
        row: "rdp-row",
        cell: "rdp-cell",
        day: "calendar-day",
        day_selected: "calendar-day-selected",
        day_today: "calendar-day-today",
        day_outside: "calendar-day-outside",
        day_disabled: "calendar-day-disabled",
        day_hidden: "invisible",
      }}
      components={{
        Chevron: ({ orientation }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className="h-4 w-4" style={rotateLeft} />;
          }
          return <ChevronRightIcon className="h-4 w-4" style={rotateRight} />;
        },
      }}
    />
  );
}
