import React from "react";
import { Users, Briefcase, Award, ArrowRight } from "lucide-react";

const HRPayroll = () => (
  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
    <div className="flex justify-between items-end mb-8">
      <div>
        <h3 className="text-2xl font-serif font-bold text-white mb-1">Human Resource & Payroll Audit</h3>
        <p className="text-white/40 text-sm">Managing 342 institutional staff profiles & salary disbursement</p>
      </div>
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-gold text-maroon rounded-xl text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-premium whitespace-nowrap">
          Generate Monthly Payslips
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
         { label: "Teaching Faculty", value: "180+", Icon: Users, color: "#4F46E5" },
         { label: "Administrative Staff", value: "85", Icon: Briefcase, color: "#059669" },
         { label: "Supporting Staff", value: "77", Icon: Award, color: "#EA580C" },
         { label: "Research Scholars", value: "42", Icon: Users, color: "#7C3AED" },
      ].map(mod => (
        <div
          key={mod.label}
          className="bg-dark-card border border-dark-border rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: `${mod.color}15` }}>
              <mod.Icon className="w-6 h-6" style={{ color: mod.color }} />
            </div>
            <ArrowRight className="w-4 h-4 text-white/20" />
          </div>
          <div className="text-3xl font-serif font-bold mb-2 text-white">{mod.value}</div>
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">{mod.label}</div>
        </div>
      ))}
    </div>

    <div className="bg-dark-card border border-dark-border rounded-[2.5rem] p-10 shadow-2xl">
      <h4 className="text-xl font-serif font-bold text-white mb-8">Recent Staff Additions</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 border-b border-dark-border">
              <th className="px-8 py-6">Staff Identity</th>
              <th className="px-8 py-6">Designation</th>
              <th className="px-8 py-6">Department</th>
              <th className="px-8 py-6 text-right">Payroll Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border/50 text-sm">
            {[
              { name: "Dr. V. Maniraj", pos: "Assoc. Professor & HOD", dept: "MCA", status: "Active" },
              { name: "Dr. Jegan Pavul", pos: "Director", dept: "MBA", status: "Active" },
              { name: "Dr. P. Dhanalakshmi", pos: "Asst. Professor", dept: "MBA", status: "Active" },
              { name: "Dr. N. Alagusundaram", pos: "Asst. Professor", dept: "MBA", status: "Active" },
              { name: "Dr. D. Suresh", pos: "Asst. Professor", dept: "MBA", status: "Active" },
              { name: "Mrs. B. Mala", pos: "Asst. Professor", dept: "MBA", status: "Active" },
              { name: "Dr. D. Regupathy", pos: "Asst. Professor", dept: "MCA", status: "Active" },
              { name: "Dr. K. Sudhakar", pos: "Asst. Professor", dept: "MCA", status: "Active" },
            ].map((staff, i) => (
              <tr key={i} className="hover:bg-white/5 transition-all group">
                <td className="px-8 py-6 text-white font-bold group-hover:text-gold">{staff.name}</td>
                <td className="px-8 py-6 text-white/40">{staff.pos}</td>
                <td className="px-8 py-6 text-white/40">{staff.dept}</td>
                <td className="px-8 py-6 text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${staff.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {staff.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default HRPayroll;
