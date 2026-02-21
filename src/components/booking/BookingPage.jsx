// import React, { useState, useEffect } from "react";
// import { CalendarDays, Clock, ArrowLeft, CheckCircle2, X } from "lucide-react";
// import { BookingCalendar } from "../ui/BookingCalendar";
// import { motion } from "framer-motion";
// import { Button } from "../ui/Button";
// import { Card } from "../ui/Card";
// import { CardHeader } from "../ui/CardHeader";
// import { CardTitle } from "../ui/CardTitle";
// import { CardContent } from "../ui/CardContent";
// import api from "../../services/api";

// const timeSlots = [
//   { time: "06:00 - 07:00", price: 1000 },
//   { time: "07:00 - 08:00", price: 1000 },
//   { time: "08:00 - 09:00", price: 1200 },
//   { time: "09:00 - 10:00", price: 1200 },
//   { time: "10:00 - 11:00", price: 1500 },
//   { time: "11:00 - 12:00", price: 1500 },
//   { time: "12:00 - 13:00", price: 1500 },
//   { time: "13:00 - 14:00", price: 1500 },
// ];

// const BookingPage = () => {
//   // ✅ Safe today
//   const getToday = () => {
//     const today = new Date();
//     return new Date(today.getFullYear(), today.getMonth(), today.getDate());
//   };

//   const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const [selectedDate, setSelectedDate] = useState(getToday());
//   const [selectedSlots, setSelectedSlots] = useState([]);
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("cash");
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch booked slots
//   useEffect(() => {
//     const fetchBookedSlots = async () => {
//       try {
//         const date = formatDate(selectedDate);
//         const res = await api.get(`/bookings/by-date/?date=${date}`);
//         setBookedSlots(res.data);
//       } catch (err) {
//         console.error("Booked slot fetch error:", err);
//       }
//     };

//     fetchBookedSlots();
//   }, [selectedDate]);

//   const toggleSlot = (index) => {
//     setSelectedSlots((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
//     );
//   };

//   const totalPrice = selectedSlots.reduce(
//     (sum, i) => sum + timeSlots[i].price,
//     0,
//   );

//   const handleConfirmBooking = async () => {
//     setLoading(true);
//     try {
//       const date = formatDate(selectedDate);

//       for (let index of selectedSlots) {
//         const slot = timeSlots[index];
//         const [start, end] = slot.time.split(" - ");

//         await api.post("/bookings/create/", {
//           date,
//           start_time: start,
//           end_time: end,
//           price: slot.price,
//           payment_method: paymentMethod,
//         });
//       }

//       alert("বুকিং সফল হয়েছে!");

//       setSelectedSlots([]);
//       setShowModal(false);

//       const res = await api.get(`/bookings/by-date/?date=${date}`);
//       setBookedSlots(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("বুকিং করতে সমস্যা হয়েছে!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-center gap-3">
//           <Button variant="ghost" size="icon">
//             <ArrowLeft className="w-5 h-5" />
//           </Button>
//           <div>
//             <h1 className="text-3xl font-bold">বুকিং করুন</h1>
//             <p className="text-muted-foreground">তারিখ ও সময় নির্বাচন করুন</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Date Card */}
//           <Card className="rounded-2xl shadow-sm">
//             <CardHeader className="flex items-center gap-2">
//               <CalendarDays className="w-5 h-5 text-green-600" />
//               <CardTitle className="text-lg">তারিখ নির্বাচন করুন</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <BookingCalendar
//                 selected={selectedDate}
//                 onSelect={setSelectedDate}
//                 className="rounded-md border"
//               />

//               {/* ✅ Selected Date Show */}
//               <div className="mt-4 text-center">
//                 <p className="text-sm text-muted-foreground">নির্বাচিত তারিখ</p>
//                 <p className="font-semibold text-green-600 text-lg">
//                   {formatDate(selectedDate)}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Time Slots */}
//           <Card className="lg:col-span-2 rounded-2xl shadow-sm">
//             <CardHeader>
//               <div className="flex items-center gap-2">
//                 <Clock className="w-5 h-5 text-green-600" />
//                 <CardTitle className="text-lg">সময় নির্বাচন করুন</CardTitle>
//               </div>
//             </CardHeader>

//             <CardContent>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {timeSlots.map((slot, index) => {
//                   const isSelected = selectedSlots.includes(index);

//                   const isBooked = bookedSlots.some((b) => {
//                     const start = b.start_time.slice(0, 5);
//                     const end = b.end_time.slice(0, 5);
//                     return `${start} - ${end}` === slot.time;
//                   });

//                   return (
//                     <motion.div
//                       key={index}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <button
//                         disabled={isBooked}
//                         onClick={() => toggleSlot(index)}
//                         className={`w-full rounded-xl border p-4 text-left transition-all
//                         ${
//                           isBooked
//                             ? "bg-red-50 border-red-400 text-red-600 cursor-not-allowed"
//                             : isSelected
//                               ? "bg-blue-50 border-blue-400 ring-2 ring-blue-300"
//                               : "bg-green-50 border-green-200 hover:border-green-400"
//                         }`}
//                       >
//                         <div className="flex justify-between items-center">
//                           <span className="font-semibold">{slot.time}</span>
//                           {isSelected && (
//                             <CheckCircle2 className="w-4 h-4 text-blue-600" />
//                           )}
//                         </div>
//                         <p className="text-sm mt-1">৳{slot.price}</p>
//                       </button>
//                     </motion.div>
//                   );
//                 })}
//               </div>

//               {selectedSlots.length > 0 && (
//                 <div className="mt-6 p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center flex-wrap gap-4">
//                   <div>
//                     <p>মোট স্লট: {selectedSlots.length}</p>
//                     <p className="font-bold text-green-600">
//                       মোট মূল্য: ৳{totalPrice}
//                     </p>
//                   </div>

//                   <Button
//                     onClick={() => setShowModal(true)}
//                     className="bg-green-600 hover:bg-green-700"
//                   >
//                     বুকিং নিশ্চিত করুন
//                   </Button>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* ✅ Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
//             >
//               <X size={18} />
//             </button>

//             <h2 className="text-xl font-bold mb-4">বুকিং নিশ্চিত করুন</h2>

//             <div className="flex justify-between mb-2">
//               <span>তারিখ:</span>
//               <span className="font-medium">{formatDate(selectedDate)}</span>
//             </div>

//             <div className="flex justify-between mb-2">
//               <span>মোট ঘণ্টা:</span>
//               <span>{selectedSlots.length}</span>
//             </div>

//             <div className="flex justify-between font-bold text-lg mb-4">
//               <span>মোট মূল্য:</span>
//               <span className="text-green-600">৳{totalPrice}</span>
//             </div>

//             {/* Payment Option */}
//             <div className="mb-6">
//               <p className="font-semibold mb-2">
//                 পেমেন্ট পদ্ধতি নির্বাচন করুন:
//               </p>

//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer">
//                   <input
//                     type="radio"
//                     value="cash"
//                     checked={paymentMethod === "cash"}
//                     onChange={() => setPaymentMethod("cash")}
//                   />
//                   Cash On Field
//                 </label>

//                 <label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer">
//                   <input
//                     type="radio"
//                     value="online"
//                     checked={paymentMethod === "online"}
//                     onChange={() => setPaymentMethod("online")}
//                   />
//                   Direct Online Payment
//                 </label>
//               </div>
//             </div>

//             <div className="flex justify-end gap-3">
//               <Button variant="outline" onClick={() => setShowModal(false)}>
//                 বাতিল
//               </Button>

//               <Button
//                 disabled={loading}
//                 className="bg-green-600 hover:bg-green-700"
//                 onClick={handleConfirmBooking}
//               >
//                 {loading ? "প্রসেস হচ্ছে..." : "কনফার্ম করুন"}
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingPage;

import React, { useState, useEffect } from "react";
import { CalendarDays, Clock, ArrowLeft, CheckCircle2, X } from "lucide-react";
import { BookingCalendar } from "../ui/BookingCalendar";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { CardHeader } from "../ui/CardHeader";
import { CardTitle } from "../ui/CardTitle";
import { CardContent } from "../ui/CardContent";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const timeSlots = [
  { time: "06:00 - 07:00", price: 1000 },
  { time: "07:00 - 08:00", price: 1000 },
  { time: "08:00 - 09:00", price: 1200 },
  { time: "09:00 - 10:00", price: 1200 },
  { time: "10:00 - 11:00", price: 1500 },
  { time: "11:00 - 12:00", price: 1500 },
  { time: "12:00 - 13:00", price: 1500 },
  { time: "13:00 - 14:00", price: 1500 },
];

const BookingPage = () => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return !!localStorage.getItem("access");
  };

  const getToday = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getToday());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const date = formatDate(selectedDate);
        const res = await api.get(`/bookings/by-date/?date=${date}`);
        setBookedSlots(res.data);
      } catch (err) {
        console.error("Booked slot fetch error:", err);
      }
    };

    fetchBookedSlots();
  }, [selectedDate]);

  const toggleSlot = (index) => {
    if (!isAuthenticated()) {
      navigate("/login", {
        state: {
          message: "বুকিং করতে লগইন করুন",
          from: "/booking",
        },
      });
      return;
    }

    setSelectedSlots((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const totalPrice = selectedSlots.reduce(
    (sum, i) => sum + timeSlots[i].price,
    0,
  );

  const handleConfirmBooking = async () => {
    if (!isAuthenticated()) {
      navigate("/login", {
        state: {
          message: "বুকিং করতে লগইন করুন",
          from: "/booking",
        },
      });
      return;
    }

    setLoading(true);
    try {
      const date = formatDate(selectedDate);

      for (let index of selectedSlots) {
        const slot = timeSlots[index];
        const [start, end] = slot.time.split(" - ");

        await api.post("/bookings/create/", {
          date,
          start_time: start,
          end_time: end,
          price: slot.price,
          payment_method: paymentMethod,
        });
      }

      alert("বুকিং সফল হয়েছে!");
      setSelectedSlots([]);
      setShowModal(false);

      const res = await api.get(`/bookings/by-date/?date=${date}`);
      setBookedSlots(res.data);
    } catch (err) {
      console.error(err);
      alert("বুকিং করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
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

              {/* ✅ Selected Date Show */}
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">নির্বাচিত তারিখ</p>
                <p className="font-semibold text-green-600 text-lg">
                  {formatDate(selectedDate)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card className="lg:col-span-2 rounded-2xl shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                <CardTitle className="text-lg">সময় নির্বাচন করুন</CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {timeSlots.map((slot, index) => {
                  const isSelected = selectedSlots.includes(index);

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
                        onClick={() => toggleSlot(index)}
                        className={`w-full rounded-xl border p-4 text-left transition-all
                        ${
                          isBooked
                            ? "bg-red-50 border-red-400 text-red-600 cursor-not-allowed"
                            : isSelected
                              ? "bg-blue-50 border-blue-400 ring-2 ring-blue-300"
                              : "bg-green-50 border-green-200 hover:border-green-400"
                        }`}
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

              {selectedSlots.length > 0 && (
                <div className="mt-6 p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <p>মোট স্লট: {selectedSlots.length}</p>
                    <p className="font-bold text-green-600">
                      মোট মূল্য: ৳{totalPrice}
                    </p>
                  </div>

                  <Button
                    onClick={() => setShowModal(true)}
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

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-bold mb-4">বুকিং নিশ্চিত করুন</h2>

            <div className="flex justify-between mb-2">
              <span>তারিখ:</span>
              <span className="font-medium">{formatDate(selectedDate)}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>মোট ঘণ্টা:</span>
              <span>{selectedSlots.length}</span>
            </div>

            <div className="flex justify-between font-bold text-lg mb-4">
              <span>মোট মূল্য:</span>
              <span className="text-green-600">৳{totalPrice}</span>
            </div>

            {/* Payment Option */}
            <div className="mb-6">
              <p className="font-semibold mb-2">
                পেমেন্ট পদ্ধতি নির্বাচন করুন:
              </p>

              <div className="space-y-2">
                <label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer">
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  Cash On Field
                </label>

                <label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer">
                  <input
                    type="radio"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  Direct Online Payment
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                বাতিল
              </Button>

              <Button
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
                onClick={handleConfirmBooking}
              >
                {loading ? "প্রসেস হচ্ছে..." : "কনফার্ম করুন"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
