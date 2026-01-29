import React from "react";
import { MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react";

const ContactPriceSection = () => {
  return (
    <div className="mt-16 flex flex-col md:flex-row justify-center gap-14 px-6 md:px-32">
      {/* Contact Info Card */}
      <div className="bg-white rounded-3xl p-12 shadow-2xl w-full md:w-[42%] hover:scale-105 transition-transform duration-300">
        <h2 className="mb-10 text-2xl font-bold tracking-wide">
          টার্ফ সম্পর্কে
        </h2>
        <ul className="space-y-6 text-gray-600 text-base">
          <li className="flex items-start gap-5">
            <span className="bg-green-100 text-green-600 p-3 rounded-full">
              <MapPin size={20} />
            </span>
            <div>
              <p className="font-medium text-base">ঠিকানা</p>
              <p className="text-sm text-gray-500">
                মিরপুর, ঢাকা - ১২১৬
              </p>
            </div>
          </li>

          <li className="flex items-start gap-5">
            <span className="bg-green-100 text-green-600 p-3 rounded-full">
              <Phone size={20} />
            </span>
            <div>
              <p className="font-medium text-base">ফোন</p>
              <p className="text-sm text-gray-500">
                +880 1712-345678
              </p>
            </div>
          </li>

          <li className="flex items-start gap-5">
            <span className="bg-green-100 text-green-600 p-3 rounded-full">
              <Mail size={20} />
            </span>
            <div>
              <p className="font-medium text-base">ইমেইল</p>
              <p className="text-sm text-gray-500">
                info@primeturf.com
              </p>
            </div>
          </li>

          <li className="flex items-start gap-5">
            <span className="bg-green-100 text-green-600 p-3 rounded-full">
              <Clock size={20} />
            </span>
            <div>
              <p className="font-medium text-base">খেলার সময়</p>
              <p className="text-sm text-gray-500">
                06:00 - 23:00
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Price List Card */}
      <div className="bg-green-50 rounded-3xl p-12 shadow-2xl w-full md:w-[42%] hover:scale-105 transition-transform duration-300">
        <h2 className="mb-10 text-2xl font-bold tracking-wide">
          মূল্য তালিকা
        </h2>
        <ul className="space-y-5">
          <li className="grid grid-cols-[1fr_auto] items-center bg-white px-7 py-3 rounded-xl hover:bg-green-100 transition-colors w-full">
            <span className="truncate text-base font-medium text-gray-700">
              সকাল (6:00 - 8:00)
            </span>
            <span className="whitespace-nowrap text-green-600 font-semibold text-base">
              ৳1000/ঘণ্টা
            </span>
          </li>

          <li className="grid grid-cols-[1fr_auto] items-center bg-white px-7 py-3 rounded-xl hover:bg-green-100 transition-colors w-full">
            <span className="truncate text-base font-medium text-gray-700">
              দিন (8:00 - 17:00)
            </span>
            <span className="whitespace-nowrap text-green-600 font-semibold text-base">
              ৳1200-1500/ঘণ্টা
            </span>
          </li>

          <li className="grid grid-cols-[1fr_auto] items-center bg-white px-7 py-3 rounded-xl hover:bg-green-100 transition-colors w-full">
            <span className="truncate text-base font-medium text-gray-700">
              সন্ধ্যা (17:00 - 21:00)
            </span>
            <span className="whitespace-nowrap text-green-600 font-semibold text-base">
              ৳1800-2000/ঘণ্টা
            </span>
          </li>

          <li className="grid grid-cols-[1fr_auto] items-center bg-white px-7 py-3 rounded-xl hover:bg-green-100 transition-colors w-full">
            <span className="truncate text-base font-medium text-gray-700">
              রাত (21:00 - 23:00)
            </span>
            <span className="whitespace-nowrap text-green-600 font-semibold text-base">
              ৳1500-1800/ঘণ্টা
            </span>
          </li>
        </ul>

        <button className="mt-10 w-full rounded-xl bg-green-600 px-6 py-4 text-base text-white font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
          বুকিং দেখুন <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ContactPriceSection;
