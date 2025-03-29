import { useState, useEffect } from "react";

function Clock({ className }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const ampm = time.getHours() >= 12 ? "PM" : "AM";

  const day = time.toLocaleDateString("en-US", { weekday: "long" });
  const month = time.toLocaleDateString("en-US", { month: "long" });
  const date = time.getDate();

  return (
    <div className={`${className} text-2xl md:text-3xl`}>
      <div>
        {hours} <span className="animate-pulse font-sans">:</span> {minutes}{" "}
        <span className="text-[0.5em]">{ampm}</span>
      </div>
      <div className="text-[0.45em] font-sans leading-none">
        {day}, {month} {date}
      </div>
    </div>
  );
}

export default Clock;
