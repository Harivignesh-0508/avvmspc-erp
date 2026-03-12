import React from "react";
import { CreditCard, ArrowRight, Laptop, Briefcase, Award, Clock } from "lucide-react";

const Accounts = () => (
  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
    <div className="flex justify-between items-end mb-8">
      <div>
        <h3 className="text-2xl font-serif font-bold text-white mb-1">Accounts & Financial Ledger</h3>
        <p className="text-white/40 text-sm">Comprehensive institutional financial monitoring & reporting</p>
      </div>
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-premium whitespace-nowrap">
           Financial Year 2024-25
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { label: "Total Revenue", value: "₹4.2 Cr", Icon: CreditCard, color: "#059669" },
        { label: "Staff Expenditure", value: "₹1.8 Cr", Icon: Briefcase, color: "#DC2626" },
        { label: "Research Grants", value: "₹45.0 L", Icon: Award, color: "#C9A227" },
      ].map(mod => (
        <div key={mod.label} className="bg-dark-card border border-dark-border rounded-[2rem] p-8 shadow-2xl overflow-hidden relative">
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

    <div className="bg-dark-card border border-dark-border rounded-[2.5rem] p-10 shadow-2xl relative">
      <h4 className="text-xl font-serif font-bold text-white mb-8 border-b border-white/5 pb-4">Transactional Intelligence</h4>
      <div className="space-y-6">
        {[
          { detail: "Tuition Fees Collected (UG Science)", amt: "+ ₹4,20,000", type: "in" },
          { detail: "Laboratory Equipment Purchase", amt: "- ₹1,45,000", type: "out" },
          { detail: "Hostel Maintenance Bill", amt: "- ₹85,000", type: "out" },
          { detail: "Alumni Donation Fund Received", amt: "+ ₹50,000", type: "in" },
        ].map((item, i) => (
          <div key={i} className="flex gap-6 p-4 hover:bg-white/5 rounded-[1.5rem] transition-all duration-300 border border-transparent hover:border-white/5 group">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${item.type === 'in' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              <Clock className="w-4 h-4" />
            </div>
            <div className="flex-1 flex justify-between items-center">
              <div>
                <div className="text-[13px] font-bold text-white inline-block hover:text-gold transition-colors cursor-pointer">{item.detail}</div>
                <div className="text-[10px] text-white/30 font-black uppercase tracking-[0.1em] mt-1">Ref ID: TXN_SPC_12456_{i}</div>
              </div>
              <div className={`font-mono font-bold ${item.type === 'in' ? 'text-green-500' : 'text-red-500'}`}>{item.amt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Accounts;
