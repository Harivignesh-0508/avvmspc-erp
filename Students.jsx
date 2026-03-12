import React from "react";
import { Info, Users } from "lucide-react";

const DEPARTMENTS = [
  { name: "Computer Science", code: "CS", students: 320 },
  { name: "Business Administration", code: "MBA", students: 280 },
  { name: "Tamil Literature", code: "TL", students: 190 },
  { name: "Mathematics", code: "MA", students: 160 },
  { name: "Physics", code: "PH", students: 145 },
  { name: "Commerce", code: "CO", students: 310 },
  { name: "English Literature", code: "EL", students: 175 },
  { name: "Chemistry", code: "CH", students: 140 },
];

const Students = ({ students, loading }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div>
        <h3 className="text-2xl font-serif font-bold text-white mb-1">Enrolled Students</h3>
        <p className="text-white/40 text-sm">Overview of institutional student base</p>
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <select className="bg-dark-card border border-dark-border rounded-xl px-5 py-3 text-xs font-bold focus:border-gold outline-none transition-all flex-1 md:flex-none min-w-[180px]">
          <option>All Departments</option>
          {DEPARTMENTS.map(d => <option key={d.code}>{d.name}</option>)}
        </select>
        <button className="bg-gold text-maroon px-6 py-3 rounded-xl text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-premium whitespace-nowrap">
          Export Database
        </button>
      </div>
    </div>

    <div className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 border-b border-dark-border">
              <th className="px-8 py-6">Unique ID</th>
              <th className="px-8 py-6">Student Identity</th>
              <th className="px-8 py-6">Department</th>
              <th className="px-8 py-6 text-center">Semester</th>
              <th className="px-8 py-6 text-right">Academic Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border/50">
            {loading ? (
              <tr><td colSpan="5" className="px-8 py-20 text-center text-white/20 italic">Synchronizing academic data...</td></tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-8 py-32 text-center text-white/20">
                  <Info className="w-12 h-12 mx-auto mb-4 opacity-10" />
                  <div className="text-lg font-bold mb-1 opacity-40">No Enrollment Records Found</div>
                  <p className="text-sm opacity-30">Student records will appear here after initial admission processing.</p>
                </td>
              </tr>
            ) : students.map(s => (
              <tr key={s.rollNumber} className="hover:bg-white/5 transition-all duration-300 group">
                <td className="px-8 py-5 font-mono text-gold text-xs tracking-widest">{s.rollNumber}</td>
                <td className="px-8 py-5 font-bold text-white tracking-wide group-hover:translate-x-1 transition-transform">{s.name}</td>
                <td className="px-8 py-5">
                  <span className="text-white/60 text-xs px-3 py-1 bg-white/5 rounded-full border border-white/5">{s.department}</span>
                </td>
                <td className="px-8 py-5 font-mono text-center text-sm">{s.semester}</td>
                <td className="px-8 py-5 text-right">
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                    {s.status || 'Active'}
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

export default Students;
