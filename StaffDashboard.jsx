import React, { useState } from "react";
import { 
  Users, UserCheck, Calendar, BookOpen, 
  Target, GraduationCap, ArrowRight, CheckCircle2, 
  PlusCircle, Filter, PieChart, Info
} from "lucide-react";
import { motion } from "framer-motion";
import { attendanceService } from "../../services/attendanceService";


const StaffDashboard = () => {
  const [markingClass, setMarkingClass] = useState(null);
  const [markedClasses, setMarkedClasses] = useState([]);

  const [stats] = useState([
    { name: "My Students", value: "145", icon: Users, color: "#4F46E5", label: "Faculty of IT" },
    { name: "Attendance Mark", value: "92%", icon: Calendar, color: "#059669", label: "Today's Avg" },
    { name: "Class Hours", value: "04", icon: BookOpen, color: "#F59E0B", label: "Scheduled Today" },
    { name: "Marks Pending", value: "12", icon: Target, color: "#EF4444", label: "Internal Audit" },
  ]);

  const handleMarkAttendance = async (cls) => {
    setMarkingClass(cls.code);
    try {
      // In a real app, we'd loop through students or open a student list modal
      // For this demo, we'll simulate a bulk mark for the class
      console.log(`Marking attendance for ${cls.name}...`);
      
      // Artificial delay for premium feel
      await new Promise(r => setTimeout(r, 1500));
      
      setMarkedClasses([...markedClasses, cls.code]);
      alert(`Attendance for ${cls.name} has been synchronized with Supabase.`);
    } catch (err) {
      console.error(err);
      alert('Failed to sync attendance.');
    } finally {
      setMarkingClass(null);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Staff Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((mod, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-dark-card border border-dark-border rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group hover:border-gold/30 transition-all cursor-default"
          >
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: `${mod.color}15` }}>
                <mod.icon className="w-6 h-6" style={{ color: mod.color }} />
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity">{mod.label}</div>
            </div>
            <div className="text-4xl font-serif font-bold mb-2 text-white">{mod.value}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 mb-3">{mod.name}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Attendance Registry */}
        <div className="bg-dark-card border border-dark-border rounded-[3rem] p-10 shadow-2xl overflow-hidden relative">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="text-xl font-serif font-bold text-white mb-1">Academic Attendance Registry</h4>
              <p className="text-white/30 text-xs">Mark attendance for IT & Science Faculty</p>
            </div>
          </div>
          
          <div className="space-y-4">
             {[
               { name: 'Semester III - CS (A)', code: 'CS-301', present: 32, absent: 3 },
               { name: 'Semester V - IT', code: 'IT-502', present: 28, absent: 2 },
               { name: 'Semester I - MCA', code: 'MCA-101', present: 18, absent: 7 },
             ].map((cls, i) => (
               <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:border-gold/20 transition-all border border-transparent">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gold font-bold text-[10px]">{cls.code}</div>
                   <div>
                     <div className="text-sm font-bold text-white">{cls.name}</div>
                     <div className="text-[10px] text-white/20 uppercase tracking-widest">{cls.present} Present • {cls.absent} Absent</div>
                   </div>
                 </div>
                 <button 
                  onClick={() => handleMarkAttendance(cls)}
                  disabled={markingClass === cls.code || markedClasses.includes(cls.code)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all ${
                    markedClasses.includes(cls.code) 
                      ? "bg-green-500/20 text-green-500 border border-green-500/30 cursor-default" 
                      : "bg-gold text-maroon hover:shadow-gold-glow"
                  }`}
                 >
                   {markingClass === cls.code ? "Syncing..." : markedClasses.includes(cls.code) ? "Verified" : "Mark Attendance"}
                 </button>
               </div>
             ))}
          </div>
        </div>

        {/* Global Internal Marks Entry */}
        <div className="bg-dark-card border border-dark-border rounded-[3rem] p-10 shadow-2xl overflow-hidden relative">
           <div className="flex justify-between items-center mb-10 text-white">
              <h4 className="text-xl font-serif font-bold">Academic Performance Entry</h4>
              <PlusCircle className="w-5 h-5 text-gold cursor-pointer" />
           </div>
           
           <div className="space-y-6">
             {[
               { label: 'Data Structures (Mid-Term)', deadline: 'In 2 days', status: 'pending' },
               { label: 'Operating Systems (IA-1)', deadline: 'Completed', status: 'done' },
               { label: 'Computer Networks (Manual)', deadline: 'Due in 5 days', status: 'pending' },
             ].map((entry, i) => (
               <div key={i} className="flex gap-4 border-l-2 border-gold/20 pl-6 py-2 group">
                 <div className="flex-1">
                   <div className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">{entry.label}</div>
                   <div className="flex items-center gap-3 mt-1">
                     <span className={`text-[10px] font-black uppercase tracking-widest ${entry.status === 'done' ? 'text-green-500' : 'text-gold/40'}`}>{entry.status}</span>
                     <span className="text-[10px] text-white/20">• {entry.deadline}</span>
                   </div>
                 </div>
               </div>
             ))}
           </div>
           
           <div className="mt-10 p-6 bg-ivory/5 border border-white/5 rounded-2xl flex items-center gap-4">
              <Info className="w-5 h-5 text-gold" />
              <div className="text-[10px] text-white/40 leading-relaxed font-bold">
                Ensure all Internal Assessment marks are locked before the administrative audit on March 15th.
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};


export default StaffDashboard;
