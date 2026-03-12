import React, { useState } from "react";
import { 
  Users, UserCheck, Calendar, BookOpen, 
  Target, GraduationCap, ArrowRight, CheckCircle2, 
  PlusCircle, Filter, PieChart, Info, CreditCard,
  Award, ShieldCheck, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { feeService } from "../../services/feeService";

const StudentDashboard = () => {

  const [isPaying, setIsPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const [stats] = useState([
    { name: "My Attendance", value: "88%", icon: Calendar, color: "#4F46E5", label: "Satisfactory" },
    { name: "My Result", value: "8.4", icon: Award, color: "#059669", label: "Cumulative CGPA" },
    { name: "My Fees", value: isPaid ? "₹0" : "₹4,200", icon: CreditCard, color: "#F59E0B", label: isPaid ? "Clear" : "Pending Balance" },
    { name: "My Assignments", value: "11", icon: BookOpen, color: "#EA580C", label: "Completed Items" },
  ]);

  const handlePayBalance = async () => {
    setIsPaying(true);
    try {
      // Simulation of a secure payment gateway integration
      console.log("Initializing secure payment via Supabase Edge Functions...");
      
      // Artificial delay for premium feel
      await new Promise(r => setTimeout(r, 2500));
      
      setIsPaid(true);
      alert('Payment Successful! Transaction Reference: SUPA-' + Math.random().toString(36).substr(2, 9).toUpperCase());
    } catch (err) {
      console.error(err);
      alert('Payment Gateway Timeout. Please try again.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Student Stats Grid */}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Semester Results */}
        <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-[3rem] p-10 shadow-2xl overflow-hidden relative">
          <div className="flex justify-between items-center mb-10 text-white">
            <h4 className="text-xl font-serif font-bold">My Semester Performance</h4>
            <div className="flex bg-white/5 rounded-xl border border-white/5 p-1 gap-1">
              {['S-1', 'S-2', 'S-3'].map(s => (
                <div key={s} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${s === 'S-3' ? 'bg-gold text-maroon' : 'text-white/30'}`}>{s}</div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
             {[
               { name: 'Theory: Database Management Systems', code: 'DBMS', grade: 'O', status: 'pass' },
               { name: 'Theory: Computer Architecture', code: 'CA', grade: 'A+', status: 'pass' },
               { name: 'Theory: Discrete Mathematics', code: 'DM', grade: 'A', status: 'pass' },
               { name: 'Laboratory: DB Management Lab', code: 'DB-LAB', grade: 'O', status: 'pass' },
             ].map((cls, i) => (
               <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-gold/5 transition-all border border-transparent hover:border-gold/10 group">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-gold font-bold text-[10px]">{cls.code}</div>
                   <div>
                     <div className="text-sm font-bold text-white group-hover:text-gold transition-colors">{cls.name}</div>
                     <div className="text-[10px] text-white/20 uppercase tracking-widest">{cls.status}</div>
                   </div>
                 </div>
                 <div className="text-xl font-serif font-bold text-white pr-4">{cls.grade}</div>
               </div>
             ))}
          </div>
        </div>

        {/* Global Pending Fees */}
        <div className="bg-dark-card border border-dark-border rounded-[3rem] p-10 shadow-2xl overflow-hidden relative flex flex-col">
           <div className="flex justify-between items-center mb-10 text-white">
              <h4 className="text-xl font-serif font-bold">Academic Fees</h4>
              <ShieldCheck className={`w-5 h-5 ${isPaid ? 'text-green-500' : 'text-gold'}`} />
           </div>
           
           <div className="flex-1 space-y-6">
             <div className="p-6 bg-white/5 rounded-2xl border border-white/5 relative group cursor-pointer hover:border-gold/30 transition-all">
                <div className="flex justify-between text-white/30 text-[9px] uppercase tracking-widest font-black mb-4">
                  <span>Semester Exam Fees</span>
                  <span className="text-gold">MARCH 2025</span>
                </div>
                <div className={`text-3xl font-serif font-bold ${isPaid ? 'text-white/20 line-through' : 'text-white'}`}>₹1,200</div>
                <div className={`mt-4 flex items-center gap-2 text-[10px] font-bold ${isPaid ? 'text-green-500' : 'text-red-400'}`}>
                   {isPaid ? <CheckCircle2 className="w-3 h-3" /> : <Zap className="w-3 h-3 fill-red-400" />} {isPaid ? 'Paid' : 'Due in 4 days'}
                </div>
             </div>
             
             <div className="p-6 bg-white/5 rounded-2xl border border-white/5 relative group cursor-gradient">
                <div className="flex justify-between text-white/30 text-[9px] uppercase tracking-widest font-black mb-4">
                  <span>Tuition Balance (Inst. 3)</span>
                  <span className="text-white/20">PAID VERIFIED</span>
                </div>
                <div className="text-3xl font-serif font-bold text-white/40">₹3,000</div>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-green-500">
                   <CheckCircle2 className="w-3 h-3" /> Fully Clear
                </div>
             </div>
           </div>
           
           {!isPaid && (
             <button 
              onClick={handlePayBalance}
              disabled={isPaying}
              className="w-full mt-10 py-5 bg-gold text-maroon font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-gold-glow active:scale-95 transition-all"
             >
               {isPaying ? "Processing Gateway..." : "Pay Pending Balance"}
             </button>
           )}
           {isPaid && (
              <div className="mt-10 p-5 bg-green-500/10 border border-green-500/20 rounded-2xl text-center">
                <div className="text-[10px] font-black text-green-500 uppercase tracking-widest">Receipt Generated</div>
                <div className="text-[9px] text-white/30 mt-1 uppercase tracking-tighter">Status: All Clear</div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

