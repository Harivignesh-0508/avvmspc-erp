import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Award, Wallet, Clock, PieChart, ArrowRight, UserCheck, FileText } from "lucide-react";

const DASHBOARD_MODULES = [
  {
    name: "Student Base",
    icon: GraduationCap, // Re-importing icon components
    value: "5,200",
    label: "Active Students",
    color: "#6366F1"
  },
  {
    name: "Attendance Hub",
    icon: UserCheck,
    value: "94%",
    label: "Today's Avg",
    color: "#10B981"
  },
  {
    name: "Exam Registry",
    icon: FileText,
    value: "3",
    label: "Upcoming Exams",
    color: "#F59E0B"
  },
  {
    name: "Fee Portal",
    icon: Wallet,
    value: "₹2.4L",
    label: "Collected Today",
    color: "#EF4444"
  }
];

const activities = [
  { text: "New student admitted (UG Physics)", time: "2 min ago" },
  { text: "Attendance updated for CS Dept", time: "15 min ago" },
  { text: "Fees payment ₹45,000 received", time: "1 hr ago" },
  { text: "Library book #1042 issued", time: "2 hr ago" }
];

const distribution = [
  { label: "Arts", pct: 35, color: "#C9A227" },
  { label: "Science", pct: 28, color: "#4F46E5" },
  { label: "Commerce", pct: 22, color: "#059669" },
  { label: "MBA", pct: 15, color: "#DC2626" }
];

import { GraduationCap } from "lucide-react";

const Dashboard = ({ onAdmit }) => (
  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
    {/* 1️⃣ Dashboard Cards (Modules) */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {DASHBOARD_MODULES.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -8, borderColor: `${item.color}40` }}
          className="bg-dark-card border border-dark-border rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group transition-all duration-300 cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-[40px] rounded-full -mr-12 -mt-12 group-hover:bg-white/10 transition-all" />
          
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundColor: `${item.color}15` }}
          >
            <item.icon className="w-6 h-6" style={{ color: item.color }} />
          </div>

          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 mb-2 group-hover:text-gold transition-colors">
            {item.name}
          </h3>

          <div className="text-3xl font-serif font-bold text-white mb-1">
            {item.value}
          </div>

          <p className="text-[11px] text-white/20 font-medium">
            {item.label}
          </p>
        </motion.div>
      ))}
    </div>

    {/* 2️⃣ Lower Layout: Activity & Analytics */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* 3️⃣ Recent Activity Section */}
      <div className="bg-dark-card border border-dark-border rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
          <h3 className="text-2xl font-serif font-bold text-white">Institutional Flows</h3>
          <div className="text-[10px] text-gold font-bold uppercase tracking-widest px-3 py-1 bg-gold/10 rounded-full">Live Activity</div>
        </div>

        <div className="space-y-6">
          {activities.map((a, i) => (
            <div key={i} className="flex gap-6 p-4 hover:bg-white/5 rounded-[1.5rem] transition-all duration-300 border border-transparent hover:border-white/5 group">
              <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                <Clock className="w-4 h-4 text-white/20 group-hover:text-gold" />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <div className="text-[13px] font-bold text-white hover:text-gold transition-colors cursor-pointer">{a.text}</div>
                  <div className="text-[10px] text-white/30 font-black uppercase tracking-[0.1em] mt-1">Ref: {Math.random().toString(36).substr(2, 6).toUpperCase()}</div>
                </div>
                <div className="text-[10px] text-white/20 font-black tracking-tighter">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-10 py-5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-gold transition-all duration-300">
          View Audit Logs
        </button>
      </div>

      {/* 4️⃣ Analytics Block (Student Distribution) */}
      <div className="bg-dark-card border border-dark-border rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-maroon/5 blur-[100px] rounded-full -ml-32 -mb-32" />
        
        <div className="mb-14">
          <h3 className="text-2xl font-serif font-bold text-white mb-2">Student Distribution</h3>
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest tracking-widest">Academic Stream Analytics</p>
        </div>

        <div className="space-y-10">
          {distribution.map(item => (
            <div key={item.label} className="group">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.3em] mb-4">
                <span className="text-white/40 group-hover:text-white transition-colors">{item.label}</span>
                <span className="text-gold">{item.pct}% Enrollment</span>
              </div>
              <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  className="h-full rounded-full shadow-premium relative overflow-hidden"
                  style={{ backgroundColor: item.color }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6">
          <div className="p-6 bg-white/3 rounded-2xl border border-white/5">
            <div className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-1">Retention Rate</div>
            <div className="text-xl font-bold text-white">99.2%</div>
          </div>
          <div className="p-6 bg-white/3 rounded-2xl border border-white/5">
            <div className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-1">Scholarships</div>
            <div className="text-xl font-bold text-white">₹1.2 Cr</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
