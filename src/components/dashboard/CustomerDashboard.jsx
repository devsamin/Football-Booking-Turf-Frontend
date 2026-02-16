// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { User, Calendar } from "lucide-react";
// import api from "../../services/api";

// const CustomerDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("upcoming");
//   const [loading, setLoading] = useState(true);

//   const upcomingBookings = [];
//   const pastBookings = [];

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await api.get("auth/profile/");
//         setUser(res.data);
//       } catch (err) {
//         console.error("Failed to load user:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const renderEmptyState = (text) => (
//     <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center justify-center text-center">
//       <Calendar className="w-14 h-14 text-gray-400 mb-4" />
//       <p className="text-gray-600 mb-4">{text}</p>
//       {activeTab === "upcoming" && (
//         <Link
//           to="/booking/new"
//           className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
//         >
//           এখনই বুক করুন
//         </Link>
//       )}
//     </div>
//   );

//   if (loading) {
//     return <p className="p-6">লোড হচ্ছে...</p>;
//   }

//   if (!user) {
//     return <p className="p-6 text-red-500">User data লোড করা যায়নি</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold">কাস্টমার ড্যাশবোর্ড</h1>
//         <p className="text-gray-600">স্বাগতম, {user.username}</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Profile Card */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <div className="flex items-center gap-2 mb-4">
//             <User className="text-gray-600" />
//             <h2 className="text-lg font-semibold">প্রোফাইল</h2>
//           </div>

//           <div className="space-y-3 text-sm">
//             <div>
//               <p className="text-gray-500">নাম</p>
//               <p className="font-medium">{user.username}</p>
//             </div>

//             <div>
//               <p className="text-gray-500">ইমেইল</p>
//               <p className="font-medium">{user.email}</p>
//             </div>

//             <div>
//               <p className="text-gray-500">ফোন</p>
//               <p className="font-medium">{user.phone}</p>
//             </div>

//             <div>
//               <p className="text-gray-500">মোট বুকিং</p>
//               <p className="text-green-600 text-xl font-bold">
//                 {upcomingBookings.length + pastBookings.length}
//               </p>
//             </div>
//           </div>

//           <Link
//             to="/booking/new"
//             className="mt-6 block w-full text-center bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
//           >
//             নতুন বুকিং করুন
//           </Link>
//         </div>

//         {/* Right Content */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Tabs */}
//           <div className="flex items-center bg-gray-100 rounded-full p-1 w-full max-w-xl">
//             <button
//               onClick={() => setActiveTab("upcoming")}
//               className={`flex-1 text-center py-3 rounded-full font-medium transition ${
//                 activeTab === "upcoming"
//                   ? "bg-white shadow"
//                   : "text-gray-600 hover:text-gray-800"
//               }`}
//             >
//               আসন্ন বুকিং ({upcomingBookings.length})
//             </button>

//             <button
//               onClick={() => setActiveTab("past")}
//               className={`flex-1 text-center py-3 rounded-full font-medium transition ${
//                 activeTab === "past"
//                   ? "bg-white shadow"
//                   : "text-gray-600 hover:text-gray-800"
//               }`}
//             >
//               পূর্ববর্তী বুকিং ({pastBookings.length})
//             </button>
//           </div>

//           {/* Content */}
//           {activeTab === "upcoming" ? (
//             upcomingBookings.length === 0 ? (
//               renderEmptyState("কোনো আসন্ন বুকিং নেই")
//             ) : (
//               <div className="space-y-4">
//                 {upcomingBookings.map((booking) => (
//                   <div
//                     key={booking.id}
//                     className="bg-white p-4 rounded-xl shadow"
//                   >
//                     বুকিং #{booking.id}
//                   </div>
//                 ))}
//               </div>
//             )
//           ) : pastBookings.length === 0 ? (
//             renderEmptyState("কোনো পূর্ববর্তী বুকিং নেই")
//           ) : (
//             <div className="space-y-4">
//               {pastBookings.map((booking) => (
//                 <div
//                   key={booking.id}
//                   className="bg-white p-4 rounded-xl shadow"
//                 >
//                   বুকিং #{booking.id}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Calendar, Clock, DollarSign } from "lucide-react";
import api from "../../services/api";

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("auth/profile/");
        setUser(userRes.data);

        const bookingRes = await api.get("/bookings/my-bookings/");
        setBookings(bookingRes.data);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingBookings = bookings.filter((b) => new Date(b.date) >= today);

  const pastBookings = bookings.filter((b) => new Date(b.date) < today);

  const renderBookingCard = (booking) => (
    <div key={booking.id} className="bg-white rounded-2xl shadow p-6">
      {/* Top Section */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {booking.status === "confirmed" && (
              <span className="bg-green-500 text-white px-2 py-0.5 text-xs rounded-md">
                কনফার্মড
              </span>
            )}

            {booking.status === "pending" && (
              <span className="border border-orange-500 text-orange-500 px-2 py-0.5 text-xs rounded-md">
                পেন্ডিং
              </span>
            )}

            {booking.status === "cancelled" && (
              <span className="bg-red-500 text-white px-2 py-0.5 text-xs rounded-md">
                বাতিল
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600">
            বুকিং ID: booking-{booking.id}
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Date */}
        <div className="flex items-start gap-2">
          <Calendar className="h-5 w-5 text-gray-600 mt-0.5" />
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

        {/* Time */}
        <div className="flex items-start gap-2">
          <Clock className="h-5 w-5 text-gray-600 mt-0.5" />
          <div>
            <p className="text-sm text-gray-600">সময়</p>
            <p className="font-semibold">
              {booking.start_time} - {booking.end_time}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-start gap-2">
          <DollarSign className="h-5 w-5 text-gray-600 mt-0.5" />
          <div>
            <p className="text-sm text-gray-600">মূল্য</p>
            <p className="font-semibold text-lg text-green-600">
              ৳{booking.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmptyState = (text) => (
    <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center justify-center text-center">
      <Calendar className="w-14 h-14 text-gray-400 mb-4" />
      <p className="text-gray-600 mb-4">{text}</p>
      {activeTab === "upcoming" && (
        <Link
          to="/booking/new"
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          এখনই বুক করুন
        </Link>
      )}
    </div>
  );

  if (loading) {
    return <p className="p-6">লোড হচ্ছে...</p>;
  }

  if (!user) {
    return <p className="p-6 text-red-500">User data লোড করা যায়নি</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">কাস্টমার ড্যাশবোর্ড</h1>
        <p className="text-gray-600">স্বাগতম, {user.username}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="text-gray-600" />
            <h2 className="text-lg font-semibold">প্রোফাইল</h2>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500">নাম</p>
              <p className="font-medium">{user.username}</p>
            </div>

            <div>
              <p className="text-gray-500">ইমেইল</p>
              <p className="font-medium">{user.email}</p>
            </div>

            <div>
              <p className="text-gray-500">ফোন</p>
              <p className="font-medium">{user.phone || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500">মোট বুকিং</p>
              <p className="text-green-600 text-xl font-bold">
                {bookings.length}
              </p>
            </div>
          </div>

          <Link
            to="/booking/new"
            className="mt-6 block w-full text-center bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            নতুন বুকিং করুন
          </Link>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs */}
          <div className="flex items-center bg-gray-100 rounded-full p-1 w-full max-w-xl">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`flex-1 text-center py-3 rounded-full font-medium transition ${
                activeTab === "upcoming"
                  ? "bg-white shadow"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              আসন্ন বুকিং ({upcomingBookings.length})
            </button>

            <button
              onClick={() => setActiveTab("past")}
              className={`flex-1 text-center py-3 rounded-full font-medium transition ${
                activeTab === "past"
                  ? "bg-white shadow"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              পূর্ববর্তী বুকিং ({pastBookings.length})
            </button>
          </div>

          {/* Booking List */}
          {activeTab === "upcoming" ? (
            upcomingBookings.length === 0 ? (
              renderEmptyState("কোনো আসন্ন বুকিং নেই")
            ) : (
              <div className="space-y-4">
                {upcomingBookings.map(renderBookingCard)}
              </div>
            )
          ) : pastBookings.length === 0 ? (
            renderEmptyState("কোনো পূর্ববর্তী বুকিং নেই")
          ) : (
            <div className="space-y-4">
              {pastBookings.map(renderBookingCard)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
