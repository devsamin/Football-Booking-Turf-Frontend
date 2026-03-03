import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Home } from "lucide-react";
import api from "../../services/api";
import { Button } from "../ui/Button";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tran_id = query.get("tran_id");

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // যেহেতু ইউজার এখন ব্রাউজারে লগইন অবস্থায় আছে,
        // তাই my-bookings থেকে তার ডাটা নিয়ে আসা যাবে।
        const res = await api.get("/bookings/my-bookings/");
        const myPayment = res.data.filter((b) => b.transaction_id === tran_id);
        setBookings(myPayment);
      } catch (err) {
        console.error("Fetch error:", err);
      }
      setLoading(false);
    };

    if (tran_id) fetchBookings();
    else setLoading(false);
  }, [tran_id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold">
        লোডিং হচ্ছে...
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full border border-green-100">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">পেমেন্ট সফল!</h1>
        <p className="text-gray-500 mt-2">
          আপনার ট্রানজ্যাকশন আইডি: <br />{" "}
          <span className="font-mono text-blue-600 font-bold">{tran_id}</span>
        </p>

        <div className="mt-6 text-left border-t pt-4">
          <h2 className="font-bold text-gray-700 mb-2">বুকিং করা স্লটসমূহ:</h2>
          {bookings.length > 0 ? (
            bookings.map((b, i) => (
              <div
                key={i}
                className="flex justify-between text-sm py-1 border-b border-dashed"
              >
                <span>
                  {b.date} ({b.start_time}-{b.end_time})
                </span>
                <span className="font-bold">৳{b.price}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">তথ্য লোড করা সম্ভব হয়নি।</p>
          )}
        </div>

        <Button
          onClick={() => navigate("/")}
          className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" /> হোম পেজে ফিরে যান
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
