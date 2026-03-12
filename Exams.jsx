import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

const ResultList = ({ students, loading }) => (
  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-4 border-b border-white/5">
      <div>
        <h3 className="text-2xl font-serif font-bold text-white mb-2">Examinations & Scholar Performance</h3>
        <p className="text-white/40 text-sm">Monitoring academic excellence across all departments</p>
      </div>
      <button className="px-8 py-3 bg-gold text-maroon rounded-2xl text-xs uppercase tracking-widest font-bold">
        Generate Performance Audit
      </button>
    </div>

    {loading ? (
      <div className="text-center py-24 text-white/20 italic">Compiling academic datasets...</div>
    ) : students.length === 0 ? (
      <div className="bg-dark-card border border-dark-border rounded-3xl p-24 text-center">
        <Award className="w-16 h-16 mx-auto mb-6 text-gold opacity-10" />
        <div className="text-xl font-bold opacity-30">No Evaluation Data Found</div>
        <p className="text-sm opacity-20">Admission of students is required before academic tracking begins.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {students.slice(0, 6).map(s => (
          <motion.div
            key={s.rollNumber}
            whileHover={{ y: -8 }}
            className="bg-dark-card border border-dark-border rounded-3xl p-8 hover:border-gold/30 transition-all duration-500 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-gold/10 transition-all" />

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <div className="font-bold text-lg text-white group-hover:text-gold transition-colors">{s.name}</div>
                <div className="text-[11px] text-white/30 uppercase font-black tracking-[0.2em] mt-1">{s.rollNumber}</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center">
                <div className="text-[8px] uppercase font-black text-white/40 mb-0.5">Sem</div>
                <div className="text-base font-bold text-gold">{s.semester}</div>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {[
                { subject: "Data Structures", grade: "A+", marks: 92, color: "#C9A227" },
                { subject: "Operating Systems", grade: "A", marks: 85, color: "#4F46E5" },
                { subject: "Software Engineering", grade: "O", marks: 98, color: "#059669" },
              ].map(r => (
                <div key={r.subject} className="flex justify-between items-center p-4 bg-white/[0.03] rounded-2xl hover:bg-white/[0.06] transition-colors border border-transparent hover:border-white/5 group/row">
                  <span className="text-white/60 text-xs font-semibold group-hover/row:text-white transition-colors">{r.subject}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-gold text-xs font-bold">{r.marks}%</span>
                    <span className="text-[11px] font-black text-white bg-white/10 px-2 py-0.5 rounded-lg border border-white/10">{r.grade}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-gold transition-all duration-300">
              Investigate Performance Details
            </button>
          </motion.div>
        ))}
      </div>
    )}
  </div>
);

export default ResultList;
