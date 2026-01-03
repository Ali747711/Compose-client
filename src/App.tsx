import { useState } from "react";

import "./App.css";
import { Card } from "./Card";
import { Calendar } from "./components/ui/calendar";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div onClick={() => setIsOpen(false)} className="bg-amber-800 w-2xl h-100">
      {isOpen && <Card />}{" "}
      <button
        onClick={(e) => {
          setIsOpen(true);
          e.stopPropagation();
        }}
      >
        Show
      </button>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />
    </div>
  );
}

export default App;
