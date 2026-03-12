import React from "react";

const Fees = ({ students, loading }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div>
        <h3 className="text-2xl font-serif font-bold text-white mb-1">Institutional Finance Control</h3>
        <p className="text-white/40 text-sm">Real-time tuition & exam fee tracking portal</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-dark-card border border-red-500/20 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-xl">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <div>
            <div className="text-[10px] text-white/30 uppercase font-black tracking-widest leading-none mb-1">Total Receivables</div>
            <div className="text-xl font-mono text-white leading-none font-bold">₹12,40,000</div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 border-b border-dark-border">
              <th className="px-8 py-6">Student Information</th>
              <th className="px-8 py-6">Total Fee Billing</th>
              <th className="px-8 py-6">Amount Collected</th>
              <th className="px-8 py-6">Outstanding Balance</th>
              <th className="px-8 py-6 text-right">Digital Receipting</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border/50 text-sm">
            {loading ? (
              <tr><td colSpan="5" className="px-8 py-20 text-center text-white/20 italic">Synchronizing financial ledger...</td></tr>
            ) : students.length === 0 ? (
              <tr><td colSpan="5" className="px-8 py-32 text-center text-white/20">No financial transactions recorded.</td></tr>
            ) : students.map(s => {
              const total = 45000;
              const paid = s.rollNumber.includes('1') ? 45000 : 20000;
              const balance = total - paid;
              return (
                <tr key={s.rollNumber} className="hover:bg-white/5 transition-all duration-300 group">
                  <td className="px-8 py-6">
                    <div className="font-bold text-white mb-0.5 group-hover:translate-x-1 transition-transform">{s.name}</div>
                    <div className="text-[10px] text-white/30 tracking-widest">{s.rollNumber} • {s.department}</div>
                  </td>
                  <td className="px-8 py-6 font-mono text-white/60">₹{total.toLocaleString()}</td>
                  <td className="px-8 py-6 font-mono text-green-500 font-bold">₹{paid.toLocaleString()}</td>
                  <td className="px-8 py-6 font-mono text-red-500 font-bold">₹{balance.toLocaleString()}</td>
                  <td className="px-8 py-6 text-right">
                    {balance > 0 ? (
                      <button className="px-5 py-2.5 bg-gold text-maroon rounded-xl font-black text-[10px] uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-premium">
                        Collect Payment
                      </button>
                    ) : (
                      <span className="px-5 py-2.5 bg-white/5 text-white/20 rounded-xl font-black text-[10px] uppercase tracking-tighter border border-white/5">
                        Billing Settled
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Fees;
