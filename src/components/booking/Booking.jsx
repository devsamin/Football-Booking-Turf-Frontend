import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, ArrowLeft } from "lucide-react";

const Booking = () => {
  const [date, setDate] = useState(null);
  const timeSlots = [
    "06:00 - 07:00",
    "07:00 - 08:00",
    "08:00 - 09:00",
    "09:00 - 10:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">বুকিং করুন</h1>
            <p className="text-sm text-gray-500 mt-1">
              তারিখ ও সময় নির্বাচন করুন
            </p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-600 transition"
          >
            <ArrowLeft size={16} /> হোমে ফিরে যান
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Date Picker */}
          <div className="lg:col-span-1 border rounded-lg p-4 bg-white shadow">
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="h-5 w-5" />
              <h2 className="text-base font-semibold">তারিখ নির্বাচন করুন</h2>
            </div>
            <input
              type="date"
              className="w-full border rounded-md p-2"
              value={date || ""}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Time Slots */}
          <div className="lg:col-span-2 border rounded-lg p-4 bg-white shadow">
            <h2 className="text-base font-semibold mb-2">সময় নির্বাচন করুন</h2>
            <p className="text-sm text-gray-500 mb-4">
              উপলব্ধ সময় থেকে একটি বা একাধিক স্লট বেছে নিন।
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  className="rounded-lg border px-3 py-2 text-sm text-gray-700 hover:bg-green-100 hover:border-green-400 transition"
                >
                  {slot}
                </button>
              ))}
            </div>

            <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              বুকিং কনফার্ম করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
