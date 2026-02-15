import React, { useState, useEffect } from "react";
import { CalendarDays, Clock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { BookingCalendar } from "../ui/BookingCalendar";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { CardHeader } from "../ui/CardHeader";
import { CardTitle } from "../ui/CardTitle";
import { CardContent } from "../ui/CardContent";
import api from "../../services/api";

const timeSlots = [
  { time: "06:00 - 07:00", price: 1000 },
  { time: "07:00 - 08:00", price: 1000 },
  { time: "08:00 - 09:00", price: 1200 },
  { time: "09:00 - 10:00", price: 1200 },
  { time: "10:00 - 11:00", price: 1500 },
  { time: "11:00 - 12:00", price: 1500 },
  { time: "12:00 - 13:00", price: 1500 },
  { time: "13:00 - 14:00", price: 1500 },
  { time: "14:00 - 15:00", price: 1500 },
  { time: "15:00 - 16:00", price: 1500 },
  { time: "16:00 - 17:00", price: 1800 },
  { time: "17:00 - 18:00", price: 1800 },
  { time: "18:00 - 19:00", price: 2000 },
  { time: "19:00 - 20:00", price: 2000 },
  { time: "20:00 - 21:00", price: 2000 },
  { time: "21:00 - 22:00", price: 1800 },
  { time: "22:00 - 23:00", price: 1500 },
];

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const date = selectedDate.toISOString().split("T")[0];
        const res = await api.get(`/bookings/by-date/?date=${date}`);
        setBookedSlots(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookedSlots();
  }, [selectedDate]);

  const handleConfirmBooking = async () => {
    if (selectedSlot === null) return;

    const slot = timeSlots[selectedSlot];
    const [start, end] = slot.time.split(" - ");

    const payload = {
      date: selectedDate.toISOString().split("T")[0],
      start_time: start,
      end_time: end,
      price: slot.price,
    };

    try {
      await api.post("/bookings/create/", payload);

      alert("বুকিং সফলভাবে সম্পন্ন হয়েছে!");
      setSelectedSlot(null);

      const date = selectedDate.toISOString().split("T")[0];
      const res = await api.get(`/bookings/by-date/?date=${date}`);
      setBookedSlots(res.data);
    } catch (error) {
      console.error(error);
      alert("বুকিং করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">বুকিং করুন</h1>
            <p className="text-muted-foreground">তারিখ ও সময় নির্বাচন করুন</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Date Card */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-green-600" />
              <CardTitle className="text-lg">তারিখ নির্বাচন করুন</CardTitle>
            </CardHeader>
            <CardContent>
              <BookingCalendar
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Time Slot Card */}
          <Card className="lg:col-span-2 rounded-2xl shadow-sm">
            {/* Flex Header with Legend */}
            <CardHeader className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                <CardTitle className="text-lg">সময় নির্বাচন করুন</CardTitle>
              </div>

              <div className="flex gap-6 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
                  <span>খালি</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 border-2 border-red-500 rounded"></div>
                  <span>বুকড</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>নির্বাচিত</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {timeSlots.map((slot, index) => {
                  const isSelected = selectedSlot === index;

                  const isBooked = bookedSlots.some((b) => {
                    const start = b.start_time.slice(0, 5);
                    const end = b.end_time.slice(0, 5);
                    return `${start} - ${end}` === slot.time;
                  });

                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        disabled={isBooked}
                        onClick={() => setSelectedSlot(index)}
                        className={`w-full rounded-xl border p-4 text-left transition-all
                          ${
                            isBooked &&
                            "bg-red-50 border-red-400 text-red-600 cursor-not-allowed"
                          }
                          ${
                            isSelected &&
                            "bg-blue-50 border-blue-400 ring-2 ring-blue-300"
                          }
                          ${
                            !isBooked &&
                            !isSelected &&
                            "bg-green-50 border-green-200 hover:border-green-400"
                          }
                        `}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{slot.time}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <p className="text-sm mt-1">৳{slot.price}</p>
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {selectedSlot !== null && (
                <div className="mt-6 p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <p>
                      <strong>তারিখ:</strong>{" "}
                      {selectedDate.toLocaleDateString("bn-BD")}
                    </p>
                    <p>
                      <strong>সময়:</strong> {timeSlots[selectedSlot].time}
                    </p>
                    <p>
                      <strong>মূল্য:</strong> ৳{timeSlots[selectedSlot].price}
                    </p>
                  </div>

                  <Button
                    onClick={handleConfirmBooking}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    বুকিং নিশ্চিত করুন
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
