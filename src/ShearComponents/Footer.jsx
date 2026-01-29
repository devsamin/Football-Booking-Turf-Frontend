import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-gray-300 pt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            প্রাইম ফুটবল টার্ফ
          </h3>
          <p className="text-sm leading-relaxed">
            ঢাকার সেরা ফুটবল টার্ফ | আধুনিক সুবিধা সহ উন্নতমানের কৃত্রিম ঘাস।
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">যোগাযোগ</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> মিরপুর, ঢাকা - ১২১৬
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +880 1712-345678
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> info@primeturf.com
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">খেলার সময়</h4>
          <p className="text-sm mb-2">প্রতিদিন: সকাল ৯:০০ - রাত ১১:০০</p>
          <p className="text-sm">সপ্তাহের সবদিন খোলা</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <h4 className="text-center text-white font-semibold mb-4">
          আমরা যে পেমেন্ট গ্রহণ করি
        </h4>
        <div className="flex flex-wrap justify-center gap-6">
          <img src="/payments/bkash.png" alt="bKash" className="h-8 object-contain" />
          <img src="/payments/nagad.png" alt="Nagad" className="h-8 object-contain" />
          <img src="/payments/rocket.png" alt="Rocket" className="h-8 object-contain" />
          <img src="/payments/visa.png" alt="Visa" className="h-8 object-contain" />
          <img src="/payments/mastercard.png" alt="Mastercard" className="h-8 object-contain" />
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 mt-12 py-6 text-center text-sm text-gray-400">
        © 2026 প্রাইম ফুটবল টার্ফ | সকল স্বত্ব সংরক্ষিত
      </div>
    </footer>
  );
}
