import React, { useState, useEffect } from "react";

// CountdownTimer ek React Functional Component hai
const CountdownTimer: React.FC = () => {
  // time state main time ko store karne ke liye use hota hai
  const [time, setTime] = useState(0);
  
  // isRunning state yeh check karti hai ke timer chal raha hai ya nahi
  const [isRunning, setIsRunning] = useState(false);
  
  // remainingTime state main jo waqt bacha hai usay store karta hai
  const [remainingTime, setRemainingTime] = useState(0);

  // useEffect function interval set karne ke liye use hota hai jab timer chal raha ho aur waqt bacha ho
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && remainingTime > 0) {
      // setInterval function har 1 second baad remainingTime ko 1 second kam kar deta hai
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      // Agar waqt khatam ho jaye to timer stop ho jata hai
      setIsRunning(false);
    }
    // Interval ko clear karne ke liye cleanup function return hota hai
    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  // handleStart function timer start karne ke liye use hota hai
  const handleStart = () => {
    if (time > 0) {
      // Agar time set kiya gaya ho, to remainingTime ko time set karta hai aur timer start ho jata hai
      setRemainingTime(time);
      setIsRunning(true);
    }
  };

  // handlePause function timer ko temporarily stop karne ke liye use hota hai
  const handlePause = () => {
    setIsRunning(false);
  };

  // handleReset function timer ko reset karne ke liye use hota hai
  const handleReset = () => {
    setIsRunning(false);
    setRemainingTime(0); // Remaining time ko 0 kar deta hai
    setTime(0); // Original time ko bhi reset kar deta hai
  };

  return (
    <div
      // Yahan component ke layout aur background gradient ko define kiya gaya hai
      className="flex flex-col min-h-screen items-center justify-center
        bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500"
    >
      {/* Heading display karne ke liye */}
      <h1 className="text-4xl font-extrabold uppercase mb-6 text-white">
        Countdown Timer
      </h1>

      {/* Input field jahan user apna time set kar sakta hai */}
      <input
        type="number"
        className="border-2 border-purple-300 bg-transparent font-bold
          p-3 mb-6 text-purple-200 text-xl rounded-lg focus:outline-none"
        placeholder="Enter Time in Seconds"
        value={time > 0 ? time : ""}
        onChange={(e) => setTime(Number(e.target.value))}
      />

      {/* Yeh div remaining time ko display karta hai, aur animation ke sath transition lagata hai */}
      <div
        className={`text-3xl font-semibold uppercase mb-6 text-white transition-opacity duration-300 ${
          remainingTime === 0 ? "opacity-0" : "animate-fade"
        }`}
      >
        {remainingTime} seconds remaining
      </div>

      {/* Buttons ke liye container, jahan Start, Pause aur Reset buttons hain */}
      <div className="space-x-4">
        {/* Start button, handleStart function ko trigger karta hai */}
        <button
          onClick={handleStart}
          className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600
            text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Start
        </button>

        {/* Pause button, handlePause function ko trigger karta hai */}
        <button
          onClick={handlePause}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600
            text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Pause
        </button>

        {/* Reset button, handleReset function ko trigger karta hai */}
        <button
          onClick={handleReset}
          className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600
            text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Reset
        </button>
      </div>

      {/* CSS animations ko define karne ke liye style tag */}
      <style jsx>{`
        @keyframes fade {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade {
          animation: fade 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CountdownTimer;
