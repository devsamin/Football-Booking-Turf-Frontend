import React, { useState } from "react";
import { CalendarDays, Clock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { BookingCalendar } from "../ui/BookingCalendar";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { CardHeader } from "../ui/CardHeader";
import { CardTitle } from "../ui/CardTitle";
import { CardContent } from "../ui/CardContent";
import { Badge } from "../ui/Badge";

const timeSlots = [
  { time: "06:00 - 07:00", price: 1000, status: "available" },
  { time: "07:00 - 08:00", price: 1000, status: "available" },
  { time: "08:00 - 09:00", price: 1200, status: "available" },
  { time: "09:00 - 10:00", price: 1200, status: "available" },
  { time: "10:00 - 11:00", price: 1500, status: "available" },
  { time: "11:00 - 12:00", price: 1500, status: "available" },
  { time: "12:00 - 13:00", price: 1500, status: "available" },
  { time: "13:00 - 14:00", price: 1500, status: "available" },
  { time: "14:00 - 15:00", price: 1500, status: "available" },
  { time: "15:00 - 16:00", price: 1500, status: "available" },
  { time: "16:00 - 17:00", price: 1800, status: "available" },
  { time: "17:00 - 18:00", price: 1800, status: "available" },
  { time: "18:00 - 19:00", price: 2000, status: "available" },
  { time: "19:00 - 20:00", price: 2000, status: "available" },
  { time: "20:00 - 21:00", price: 2000, status: "available" },
  { time: "21:00 - 22:00", price: 1800, status: "available" },
  { time: "22:00 - 23:00", price: 1500, status: "available" },
];

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

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
          {/* Date Selector */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center gap-2">
              <CalendarDays className="w-5 h-5 text-green-600" />
              <CardTitle className="text-lg">তারিখ নির্বাচন করুন</CardTitle>
            </CardHeader>
            <CardContent>
              <BookingCalendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />

              <div className="mt-4 p-3 rounded-xl bg-green-50 border text-sm">
                <span className="font-medium">নির্বাচিত তারিখ:</span>{" "}
                {selectedDate?.toLocaleDateString("bn-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card className="lg:col-span-2 rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                <CardTitle className="text-lg">সময় নির্বাচন করুন</CardTitle>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <Badge className="bg-green-100 text-green-700">খালি</Badge>
                <Badge className="bg-red-100 text-red-700">বুকড</Badge>
                <Badge className="bg-blue-100 text-blue-700">নির্বাচিত</Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {timeSlots.map((slot, index) => {
                  const isSelected = selectedSlot === index;

                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        disabled={slot.status === "booked"}
                        onClick={() => setSelectedSlot(index)}
                        className={`w-full rounded-xl border p-4 text-left transition-all
                          ${slot.status === "booked" && "bg-red-50 border-red-200 text-red-500 cursor-not-allowed"}
                          ${isSelected && "bg-blue-50 border-blue-400 ring-2 ring-blue-300"}
                          ${slot.status === "available" && !isSelected && "bg-green-50 border-green-200 hover:border-green-400"}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{slot.time}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          ৳{slot.price}
                        </p>
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Summary & Action */}
              {selectedSlot !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border bg-white shadow-sm"
                >
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">তারিখ:</span>{" "}
                      {selectedDate?.toLocaleDateString("bn-BD", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p>
                      <span className="font-medium">সময়:</span>{" "}
                      {timeSlots[selectedSlot].time}
                    </p>
                    <p>
                      <span className="font-medium">মূল্য:</span> ৳
                      {timeSlots[selectedSlot].price}
                    </p>
                  </div>

                  <Button className="bg-green-600 hover:bg-green-700 rounded-xl px-6">
                    বুকিং নিশ্চিত করুন
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
