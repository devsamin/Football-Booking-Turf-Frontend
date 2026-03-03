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
// import { useNavigate } from "react-router-dom";

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
//   const navigate = useNavigate();

//   const getToday = () => {
//     const today = new Date();
//     return new Date(today.getFullYear(), today.getMonth(), today.getDate());
//   };

//   const formatDate = (date) => {
//     return date.toISOString().split("T")[0];
//   };

//   const [selectedDate, setSelectedDate] = useState(getToday());
//   const [selectedSlots, setSelectedSlots] = useState([]);
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("cash");
//   const [loading, setLoading] = useState(false);

//   // 🔥 FETCH BOOKED SLOT
//   const fetchBookedSlots = async () => {
//     try {
//       const date = formatDate(selectedDate);
//       const res = await api.get(`/bookings/by-date/?date=${date}`);
//       setBookedSlots(res.data);
//     } catch (err) {
//       console.error("Booked slot fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchBookedSlots();
//   }, [selectedDate]);

//   // const toggleSlot = (index) => {
//   //   setSelectedSlots((prev) =>
//   //     prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
//   //   );
//   // };

//   const toggleSlot = (index) => {
//     const token = localStorage.getItem("access");

//     // 🔐 Login না থাকলে login page এ পাঠাবে
//     if (!token) {
//       navigate("/login", {
//         state: {
//           message: "বুকিং করতে লগইন করুন",
//           from: "/booking",
//         },
//       });
//       return;
//     }

//     setSelectedSlots((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
//     );
//   };

//   const totalPrice = selectedSlots.reduce(
//     (sum, i) => sum + timeSlots[i].price,
//     0,
//   );

//   // 🔥 CONFIRM BOOKING
//   // const handleConfirmBooking = async () => {
//   //   setLoading(true);
//   const handleConfirmBooking = async () => {
//     const token = localStorage.getItem("access");

//     if (!token) {
//       navigate("/login", {
//         state: {
//           message: "বুকিং করতে লগইন করুন",
//           from: "/booking",
//         },
//       });
//       return;
//     }

//     setLoading(true);

//     const date = formatDate(selectedDate);

//     try {
//       // 💵 CASH BOOKING
//       if (paymentMethod === "cash") {
//         for (let index of selectedSlots) {
//           const slot = timeSlots[index];
//           const [start, end] = slot.time.split(" - ");

//           await api.post("/bookings/create/", {
//             date,
//             start_time: start,
//             end_time: end,
//             price: slot.price, // ✅ এখানে price add করতে হবে
//             payment_method: "cash", // optional, serializer override করবে
//           });
//         }

//         alert("বুকিং সফল হয়েছে!");
//         setSelectedSlots([]);
//         setShowModal(false);
//         fetchBookedSlots();
//       }

//       // 🌐 ONLINE PAYMENT
//       if (paymentMethod === "online") {
//         const selectedSlotStrings = selectedSlots.map((index) => {
//           const slot = timeSlots[index];
//           const [start, end] = slot.time.split(" - ");
//           return `${start}-${end}`;
//         });

//         const res = await api.post("/bookings/create-payment/", {
//           date,
//           slots: selectedSlotStrings,
//           total: totalPrice,
//         });

//         if (res.data.payment_url) {
//           window.location.href = res.data.payment_url;
//         } else {
//           alert("Payment session failed");
//         }
//       }
//     } catch (err) {
//       alert("কিছু সমস্যা হয়েছে");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* HEADER */}
//         <div className="flex items-center gap-3">
//           <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
//             <ArrowLeft className="w-5 h-5" />
//           </Button>
//           <div>
//             <h1 className="text-3xl font-bold">বুকিং করুন</h1>
//             <p className="text-muted-foreground">তারিখ ও সময় নির্বাচন করুন</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* DATE CARD */}
//           <Card className="rounded-2xl shadow-sm">
//             <CardHeader>
//               <CardTitle>তারিখ নির্বাচন করুন</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <BookingCalendar
//                 selected={selectedDate}
//                 onSelect={setSelectedDate}
//               />
//             </CardContent>
//           </Card>

//           {/* TIME SLOT CARD */}
//           <Card className="lg:col-span-2 rounded-2xl shadow-sm">
//             <CardHeader>
//               <CardTitle>সময় নির্বাচন করুন</CardTitle>
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
//                         className={`relative w-full rounded-xl border p-4 text-left transition-all
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

//                         {/* ✅ BOOKED BADGE */}
//                         {isBooked && (
//                           <span className="absolute top-2 right-2 text-xs bg-red-600 text-white px-2 py-1 rounded">
//                             BOOKED
//                           </span>
//                         )}
//                       </button>
//                     </motion.div>
//                   );
//                 })}
//               </div>

//               {selectedSlots.length > 0 && (
//                 <div className="mt-6 p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center">
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

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
//             <h2 className="text-xl font-bold mb-4">বুকিং নিশ্চিত করুন</h2>

//             <p>তারিখ: {formatDate(selectedDate)}</p>
//             <p>মোট ঘণ্টা: {selectedSlots.length}</p>
//             <p className="font-bold text-green-600 mb-4">
//               মোট মূল্য: ৳{totalPrice}
//             </p>

//             <div className="space-y-2 mb-4">
//               <label>
//                 <input
//                   type="radio"
//                   checked={paymentMethod === "cash"}
//                   onChange={() => setPaymentMethod("cash")}
//                 />{" "}
//                 Cash On Field
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="radio"
//                   checked={paymentMethod === "online"}
//                   onChange={() => setPaymentMethod("online")}
//                 />{" "}
//                 Online Payment
//               </label>
//             </div>

//             <div className="flex justify-end gap-3">
//               <Button variant="outline" onClick={() => setShowModal(false)}>
//                 বাতিল
//               </Button>

//               <Button
//                 disabled={loading}
//                 onClick={handleConfirmBooking}
//                 className="bg-green-600 hover:bg-green-700"
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
import { ArrowLeft, CheckCircle2, X } from "lucide-react";
import { BookingCalendar } from "../ui/BookingCalendar";
import { motion, AnimatePresence } from "framer-motion";
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

  const getToday = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const formatDate = (date) => date.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(getToday());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch Booked Slots
  const fetchBookedSlots = async () => {
    try {
      const date = formatDate(selectedDate);
      const res = await api.get(`/bookings/by-date/?date=${date}`);
      setBookedSlots(res.data);
    } catch (err) {
      console.error("Booked slot fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBookedSlots();
  }, [selectedDate]);

  // 🔐 Slot Toggle with Auth Check
  const toggleSlot = (index) => {
    const token = localStorage.getItem("access");

    if (!token) {
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

  // 🔥 Confirm Booking
  const handleConfirmBooking = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login", {
        state: {
          message: "বুকিং করতে লগইন করুন",
          from: "/booking",
        },
      });
      return;
    }

    setLoading(true);
    const date = formatDate(selectedDate);

    try {
      if (paymentMethod === "cash") {
        for (let index of selectedSlots) {
          const slot = timeSlots[index];
          const [start, end] = slot.time.split(" - ");

          await api.post("/bookings/create/", {
            date,
            start_time: start,
            end_time: end,
            price: slot.price,
            payment_method: "cash",
          });
        }

        alert("বুকিং সফল হয়েছে!");
        setSelectedSlots([]);
        setShowModal(false);
        fetchBookedSlots();
      }

      if (paymentMethod === "online") {
        const selectedSlotStrings = selectedSlots.map((index) => {
          const slot = timeSlots[index];
          const [start, end] = slot.time.split(" - ");
          return `${start}-${end}`;
        });

        const res = await api.post("/bookings/create-payment/", {
          date,
          slots: selectedSlotStrings,
          total: totalPrice,
        });

        if (res.data.payment_url) {
          window.location.href = res.data.payment_url;
        } else {
          alert("Payment session failed");
        }
      }
    } catch (err) {
      alert("কিছু সমস্যা হয়েছে");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">বুকিং করুন</h1>
            <p className="text-muted-foreground">তারিখ ও সময় নির্বাচন করুন</p>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* DATE CARD */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>তারিখ নির্বাচন করুন</CardTitle>
            </CardHeader>
            <CardContent>
              <BookingCalendar
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </CardContent>
          </Card>

          {/* SLOT CARD */}
          <Card className="lg:col-span-2 rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>সময় নির্বাচন করুন</CardTitle>
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
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={isBooked}
                      onClick={() => toggleSlot(index)}
                      className={`relative w-full rounded-xl border p-4 text-left transition-all
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

                      {isBooked && (
                        <span className="absolute top-2 right-2 text-xs bg-red-600 text-white px-2 py-1 rounded">
                          BOOKED
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {selectedSlots.length > 0 && (
                <div className="mt-6 p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center">
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

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* HEADER */}
              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-5 relative">
                <h2 className="text-xl font-bold">বুকিং নিশ্চিত করুন</h2>

                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 hover:opacity-80"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* BODY */}
              <div className="p-6 space-y-5 overflow-y-auto">
                {/* BOOKING SUMMARY */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-4">
                  {/* Date */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">তারিখ</span>
                    <span className="font-semibold text-gray-900">
                      {formatDate(selectedDate)}
                    </span>
                  </div>

                  {/* Selected Time Right Side */}
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 text-sm mt-1">
                      নির্বাচিত সময়
                    </span>

                    <div className="flex flex-wrap justify-end gap-2 max-w-[70%]">
                      {selectedSlots.map((index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs bg-green-600 text-white rounded-full whitespace-nowrap"
                        >
                          {timeSlots[index].time}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-2 border-t border-green-200">
                    <span className="font-semibold text-gray-800">
                      মোট মূল্য
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      ৳{totalPrice}
                    </span>
                  </div>
                </div>

                {/* PAYMENT METHOD */}
                <div className="space-y-3">
                  <p className="font-semibold text-gray-800">
                    পেমেন্ট পদ্ধতি নির্বাচন করুন
                  </p>

                  {/* CASH */}
                  <label
                    className={`flex items-center justify-between border p-4 rounded-xl cursor-pointer transition
              ${
                paymentMethod === "cash"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-400"
              }`}
                  >
                    <span className="text-sm">মাঠে এসে নগদ প্রদান করুন</span>

                    <input
                      type="radio"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                      className="accent-green-600 w-4 h-4"
                    />
                  </label>

                  {/* ONLINE */}
                  <label
                    className={`flex items-center justify-between border p-4 rounded-xl cursor-pointer transition
              ${
                paymentMethod === "online"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-400"
              }`}
                  >
                    <span className="text-sm">
                      বিকাশ / কার্ড / অন্যান্য মাধ্যমে পরিশোধ করুন
                    </span>

                    <input
                      type="radio"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                      className="accent-green-600 w-4 h-4"
                    />
                  </label>
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex gap-3 p-5 border-t bg-gray-50">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  বাতিল
                </button>

                <button
                  disabled={loading}
                  onClick={handleConfirmBooking}
                  className="w-full py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition disabled:opacity-50"
                >
                  {loading ? "প্রসেস হচ্ছে..." : "কনফার্ম করুন"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingPage;
