import { useState, useEffect } from "react";
import { Calendar } from "./Calendar";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg?react";

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

  useEffect(() => {
    if (startDate) {
      setStartDateValue(new Date(startDate));
    } else {
      setStartDateValue(undefined);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      setEndDateValue(new Date(endDate));
    } else {
      setEndDateValue(undefined);
    }
  }, [endDate]);

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
    <div className="mt-6 relative">
      <label className="font-semibold text-base leading-6 tracking-[-0.4px] align-middle text-black-300 block mb-3">
        Date Range
      </label>
      <div className="flex flex-row gap-1.5 relative">
        <button
          type="button"
          onClick={handleStartClick}
          className="flex-1 min-w-0 h-12 rounded-lg border border-gray-50 px-4 text-left text-sm text-black-300 hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:border-[3px] focus:border-black-300 flex items-center justify-between"
        >
          <span>
            {startDateValue ? formatDate(startDateValue) : "Start Date"}
          </span>
          <ChevronDownIcon className="w-2.5 h-2.5 text-gray-400 flex-shrink-0" />
        </button>
        <button
          type="button"
          onClick={handleEndClick}
          className="flex-1 min-w-0 h-12 rounded-lg border border-gray-50 px-4 text-left text-sm text-black-300 hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:border-[3px] focus:border-black-300 flex items-center justify-between"
        >
          <span>{endDateValue ? formatDate(endDateValue) : "End Date"}</span>
          <ChevronDownIcon className="w-2.5 h-2.5 text-gray-400 flex-shrink-0" />
        </button>
      </div>
      {showCalendar && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
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
