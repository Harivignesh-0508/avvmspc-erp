import React, { useState, useEffect } from "react";
import { 
  Users, UserCheck, GraduationCap, CreditCard, 
  FileText, PieChart, Database, Activity, 
  ArrowRight, Search, PlusCircle, Filter,
  Calendar, Award
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

const attendanceData = [
  { day: 'Mon', percentage: 92 },
  { day: 'Tue', percentage: 95 },
  { day: 'Wed', percentage: 94 },
  { day: 'Thu', percentage: 96 },
  { day: 'Fri', percentage: 93 },
];

const feeData = [
  { month: 'Jan', amount: 1.2 },
  { month: 'Feb', amount: 0.8 },
  { month: 'Mar', amount: 2.4 },
];

const AdminDashboard = ({ onAdmit }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate real data fetching
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { name: "Students (Active)", value: "5200", icon: Users, color: "#4F46E5", trend: "+120 from last year" },
    { name: "Attendance (Today)", value: "94%", icon: Calendar, color: "#059669", trend: "+2% from yesterday" },
    { name: "Fees Collected", value: "₹2.4L", icon: CreditCard, color: "#F59E0B", trend: "Target: ₹5L" },
    { name: "Upcoming Exams", value: "3", icon: FileText, color: "#EF4444", trend: "Next in 5 days" },
  ];

  if (isLoading) {
    return (
      <div className="space-y-10 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-dark-card border border-dark-border rounded-[2.5rem] p-8 h-48 flex flex-col justify-between">
              <div className="w-14 h-14 bg-white/5 rounded-2xl"></div>
              <div className="space-y-3">
                <div className="h-8 bg-white/5 rounded-xl w-1/2"></div>
                <div className="h-4 bg-white/5 rounded-xl w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-dark-card border border-dark-border rounded-[3rem] h-[400px]"></div>
          <div className="bg-dark-card border border-dark-border rounded-[3rem] h-[400px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((mod, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-dark-card border border-dark-border rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group hover:border-gold/30 transition-all cursor-default"
          >
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110" style={{ backgroundColor: `${mod.color}15` }}>
                <mod.icon className="w-6 h-6" style={{ color: mod.color }} />
              </div>
            </div>
            <div className="text-4xl font-serif font-bold mb-2 text-white">{mod.value}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 mb-3">{mod.name}</div>
            <div className="text-[10px] font-bold text-white/20">{mod.trend}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Charts Section */}
        <div className="bg-dark-card border border-dark-border rounded-[3rem] p-10 shadow-2xl overflow-hidden relative">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xl font-serif font-bold text-white mb-1">Weekly Attendance Trend</h4>
            <div className="text-gold text-xs font-bold px-3 py-1 bg-gold/10 rounded-full">94% Avg</div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" vertical={false} />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1D27', border: '1px solid #2A2D3A', borderRadius: '12px' }}
                  itemStyle={{ color: '#C9A227', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="percentage" stroke="#C9A227" strokeWidth={3} dot={{ r: 4, fill: '#C9A227', strokeWidth: 2, stroke: '#1A1D27' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center mt-10 mb-8">
             <h4 className="text-xl font-serif font-bold text-white mb-1">Fee Collection (Lakhs)</h4>
             <button className="text-[10px] uppercase font-black tracking-widest text-gold hover:text-white transition-colors">View Report</button>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" vertical={false} />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                   cursor={{ fill: '#2A2D3A' }}
                   contentStyle={{ backgroundColor: '#1A1D27', border: '1px solid #2A2D3A', borderRadius: '12px' }}
                />
                <Bar dataKey="amount" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Performance Tracking & Activity Timeline */}
        <div className="bg-dark-card border border-dark-border rounded-[3rem] p-10 shadow-2xl overflow-hidden relative flex flex-col">
           <div className="flex justify-between items-center mb-10">
              <div>
                <h4 className="text-xl font-serif font-bold text-white">Activity Timeline</h4>
                <p className="text-white/30 text-xs mt-1">Real-time institutional actions</p>
              </div>
              <Activity className="w-5 h-5 text-gold animate-pulse" />
           </div>
           
           <div className="space-y-6 flex-1">
              {[
                { label: 'Student admission completed', target: 'M.Sc Computer Science', time: '12 min ago', type: 'success', icon: GraduationCap },
                { label: 'Fees payment received', target: '₹45,000 (Semester IV)', time: '1 hr ago', type: 'info', icon: CreditCard },
                { label: 'Attendance updated', target: 'Dept of English (92%)', time: '2 hr ago', type: 'warning', icon: UserCheck },
                { label: 'Result published', target: 'B.Sc Physics - Semester II', time: '5 hr ago', type: 'neutral', icon: Award },
              ].map((log, i) => (
                <div key={i} className="flex gap-5 group items-start">
                  <div className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 border border-white/5 ${
                    log.type === 'success' ? 'bg-green-500/10 text-green-500' :
                    log.type === 'warning' ? 'bg-orange-500/10 text-orange-500' :
                    log.type === 'info' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-gold/10 text-gold'
                  }`}>
                    <log.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 pb-6 border-b border-dark-border/50">
                    <div className="text-sm font-bold text-white/90 group-hover:text-gold transition-colors">{log.label}</div>
                    <div className="text-xs text-white/40 mt-1">{log.target}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-white/20 font-bold tracking-wider">{log.time}</span>
                    </div>
                  </div>
                </div>
              ))}
           </div>

           <button 
             onClick={onAdmit}
             className="w-full mt-6 py-4 bg-gold text-maroon rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-gold-glow transition-all active:scale-95 flex items-center justify-center gap-2"
           >
             <PlusCircle className="w-4 h-4" /> Admit New Student
           </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
