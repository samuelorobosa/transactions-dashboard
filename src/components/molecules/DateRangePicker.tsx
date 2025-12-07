import { useState } from "react";
import { Calendar } from "./Calendar";

interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) {
  const [startDateValue, setStartDateValue] = useState<Date | undefined>(
    startDate ? new Date(startDate) : undefined
  );
  const [endDateValue, setEndDateValue] = useState<Date | undefined>(
    endDate ? new Date(endDate) : undefined
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectingStart, setSelectingStart] = useState(true);

  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day.toString().padStart(2, "0")}, ${year}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    const selectedDate = date;

    if (selectingStart) {
      setStartDateValue(selectedDate);
      if (selectedDate) {
        onStartDateChange?.(selectedDate.toISOString().split("T")[0]);
      }
      setSelectingStart(false);
      if (!endDateValue) {
        setShowCalendar(true);
      } else {
        setShowCalendar(false);
      }
    } else {
      setEndDateValue(selectedDate);
      if (selectedDate) {
        onEndDateChange?.(selectedDate.toISOString().split("T")[0]);
      }
      setShowCalendar(false);
    }
  };

  const handleStartClick = () => {
    setSelectingStart(true);
    setShowCalendar(true);
  };

  const handleEndClick = () => {
    setSelectingStart(false);
    setShowCalendar(true);
  };

  return (
    <div className="mt-6">
      <label className="font-semibold text-base leading-6 tracking-[-0.4px] align-middle text-black-300 block mb-3">
        Date Range
      </label>
      <div className="flex gap-1.5 relative">
        <button
          type="button"
          onClick={handleStartClick}
          className="flex-1 h-12 rounded-lg border border-gray-50 px-4 text-left text-sm text-black-300 hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:border-[3px] focus:border-black-300"
        >
          {startDateValue ? formatDate(startDateValue) : "Start Date"}
        </button>
        <button
          type="button"
          onClick={handleEndClick}
          className="flex-1 h-12 rounded-lg border border-gray-50 px-4 text-left text-sm text-black-300 hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:border-[3px] focus:border-black-300"
        >
          {endDateValue ? formatDate(endDateValue) : "End Date"}
        </button>
      </div>
      {showCalendar && (
        <div className="mt-4 w-full">
          <Calendar
            mode="single"
            selected={selectingStart ? startDateValue : endDateValue}
            onSelect={handleDateSelect}
          />
        </div>
      )}
    </div>
  );
}
