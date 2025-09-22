import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/style.css";
import useBoardStore from "../store/boardStore";

const CalendarPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);
  const { currentDate, navigateToDate } = useBoardStore();

  const isToday =
    currentDate && currentDate.toDateString() === new Date().toDateString();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDaySelect = (date) => {
    if (date) {
      navigateToDate(date);
      setIsOpen(false);
    }
  };

  const getCalendarPosition = () => {
    if (!pickerRef.current) return {};

    const buttonRect = pickerRef.current.getBoundingClientRect();
    const calendarWidth = 300; // Approximate width of calendar
    const windowWidth = window.innerWidth;

    // Align calendar to the left side of the controls panel
    let left = buttonRect.left - 100; // Shift left to align better with panel

    // Adjust if it would go off the left edge
    if (left < 10) {
      left = 10;
    }

    // Adjust if it would go off the right edge
    if (left + calendarWidth > windowWidth - 10) {
      left = windowWidth - calendarWidth - 10;
    }

    return {
      left: `${left}px`,
      bottom: "70px",
    };
  };

  return (
    <div className="calendar-picker" ref={pickerRef}>
      <button
        className="action-btn calendar-btn"
        onClick={() => setIsOpen(!isOpen)}
        title={
          isToday ? "Today - Click for calendar" : format(currentDate, "MMM d")
        }
        style={{
          background: "#e67e22",
          color: "white",
        }}
      >
        <Calendar size={18} />
        {!isToday && (
          <span className="date-badge">{format(currentDate, "d")}</span>
        )}
      </button>

      {isOpen && (
        <div className="calendar-dropdown" style={getCalendarPosition()}>
          <DayPicker
            mode="single"
            selected={currentDate}
            onSelect={handleDaySelect}
            showOutsideDays={false}
            fixedWeeks={false}
            modifiersClassNames={{
              selected: "selected-day",
              today: "today-day",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarPicker;
