import React from "react";
import { CheckCircle2, Clock, Calendar } from "lucide-react";

const Attendance = () => (
  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
    <div className="flex justify-between items-end mb-8">
      <div>
        <h3 className="text-2xl font-serif font-bold text-white mb-1">Attendance Management</h3>
        <p className="text-white/40 text-sm">Daily academic presence monitoring</p>
      </div>
      <div className="flex gap-4">
        <div className="px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500 text-sm font-bold flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4" />
          Today's Average: 94.2%
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { dept: "Computer Science", present: "298/320", pct: 93, color: "#4F46E5" },
        { dept: "Mathematics", present: "152/160", pct: 95, color: "#059669" },
        { dept: "Physics", present: "135/145", pct: 93, color: "#D97706" },
      ].map(item => (
        <div key={item.dept} className="bg-dark-card border border-dark-border rounded-3xl p-8 shadow-2xl">
          <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4">{item.dept}</div>
          <div className="text-3xl font-serif font-bold text-white mb-6">{item.pct}%</div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gold rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
          </div>
          <div className="mt-6 flex justify-between text-xs font-bold">
            <span className="text-white/20">Attendance Status</span>
            <span className="text-white/60">{item.present}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-dark-card border border-dark-border rounded-[2.5rem] p-10 shadow-2xl">
      <h4 className="text-xl font-serif font-bold text-white mb-8">Recent Absentees (Follow-up Required)</h4>
      <div className="space-y-4">
        {[
          { name: "Rahul Sharma", id: "CS2024-045", dept: "CS", days: 3 },
          { name: "Priya V", id: "MA2024-012", dept: "Maths", days: 2 },
          { name: "Arjun K", id: "PH2024-088", dept: "Physics", days: 4 },
        ].map(s => (
          <div key={s.id} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold">{s.name}</div>
                <div className="text-[10px] text-white/20 uppercase font-black tracking-widest">{s.id} • {s.dept}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-red-500 font-bold">{s.days} Consecutive Days</div>
              <button className="text-[10px] text-gold uppercase font-black tracking-widest mt-1 hover:underline">Send Alert</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Attendance;
