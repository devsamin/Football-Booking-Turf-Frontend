import React, { useEffect, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import api from "../../services/api";
import { Card } from "../ui/Card";
import { CardContent } from "../ui/CardContent";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my-bookings/");
        setBookings(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">আমার বুকিংসমূহ</h1>

        {bookings.map((booking) => (
          <Card key={booking.id} className="rounded-xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 text-xs rounded
                        ${
                          booking.status === "confirmed"
                            ? "bg-green-500 text-white"
                            : booking.status === "pending"
                              ? "border border-orange-500 text-orange-500"
                              : "bg-red-500 text-white"
                        }`}
                    >
                      {booking.status === "confirmed" && "কনফার্মড"}
                      {booking.status === "pending" && "পেন্ডিং"}
                      {booking.status === "cancelled" && "বাতিল"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    বুকিং ID: booking-{booking.id}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-2">
                  <CalendarDays className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">তারিখ</p>
                    <p className="font-semibold">
                      {new Date(booking.date).toLocaleDateString("bn-BD", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">সময়</p>
                    <p className="font-semibold">
                      {booking.start_time} - {booking.end_time}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">মূল্য</p>
                  <p className="font-semibold text-lg">৳{booking.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
