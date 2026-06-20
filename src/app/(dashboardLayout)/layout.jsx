import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { FaBookOpen } from "react-icons/fa";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#0F172A] text-[#F1F5F9]">
      <aside className="w-64 border-r border-[#334155] bg-[#1E293B] p-5 flex flex-col gap-6 sticky top-0 h-screen overflow-y-auto">
        
          <div className="flex items-center gap-3 group border border-gray-400 rounded-2xl p-5 cursor-pointer select-none">
            <div className="bg-[#6366F1] text-white p-2.5 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 duration-200">
              <FaBookOpen size={18} />
            </div>

            <p className="font-extrabold text-xl tracking-tight text-white">
              Biblio
              <span className="text-[#6366F1] group-hover:text-[#F59E0B] transition-colors duration-200 ml-1">
                Drop
              </span>
            </p>
            
          </div>
        

        <DashboardSidebar  />
      </aside>

      <main className="flex-1 p-8 bg-[#0F172A] text-[#E2E8F0] h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
