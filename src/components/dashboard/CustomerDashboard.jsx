// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { User, Calendar } from "lucide-react";

// const CustomerDashboard = () => {
//   const user = {
//     name: "রহিম আহমেদ",
//     email: "rahim@email.com",
//     phone: "+880 1712-111111",
//     totalBookings: 0,
//   };

//   const upcomingBookings = []; // ভবিষ্যতে API থেকে আসবে
//   const pastBookings = []; // ভবিষ্যতে API থেকে আসবে

//   const [activeTab, setActiveTab] = useState("upcoming");

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

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold">কাস্টমার ড্যাশবোর্ড</h1>
//         <p className="text-gray-600">স্বাগতম, {user.name}</p>
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
//               <p className="font-medium">{user.name}</p>
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
//                 {user.totalBookings}
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
//                     {/* Booking Card UI এখানে আসবে */}
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
//                   {/* Booking Card UI এখানে আসবে */}
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
import { User, Calendar } from "lucide-react";
import api from "../../services/api";

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [loading, setLoading] = useState(true);

  const upcomingBookings = [];
  const pastBookings = [];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("auth/profile/");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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
        {/* Left Profile Card */}
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
              <p className="font-medium">{user.phone}</p>
            </div>

            <div>
              <p className="text-gray-500">মোট বুকিং</p>
              <p className="text-green-600 text-xl font-bold">
                {upcomingBookings.length + pastBookings.length}
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

          {/* Content */}
          {activeTab === "upcoming" ? (
            upcomingBookings.length === 0 ? (
              renderEmptyState("কোনো আসন্ন বুকিং নেই")
            ) : (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white p-4 rounded-xl shadow"
                  >
                    বুকিং #{booking.id}
                  </div>
                ))}
              </div>
            )
          ) : pastBookings.length === 0 ? (
            renderEmptyState("কোনো পূর্ববর্তী বুকিং নেই")
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white p-4 rounded-xl shadow"
                >
                  বুকিং #{booking.id}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
