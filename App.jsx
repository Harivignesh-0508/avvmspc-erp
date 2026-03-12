import React, { useState, useEffect, useMemo } from "react";
import {
  Search, Bell, Menu, LayoutDashboard, Users, BookOpen,
  GraduationCap, CreditCard, Library as LibraryIcon, Settings as SettingsIcon,
  Calendar, Briefcase, Award, Clock, ArrowRight,
  ChevronRight, Laptop, Scroll, Sigma, Atom,
  FlaskConical, CheckCircle2, AlertCircle, Info,
  ExternalLink, Globe, Smartphone, Monitor, Lock, Mail, LogOut,
  Building2, Landmark, Wallet, ShieldCheck, Heart, Zap, MapPin, Handshake, Target, Users2,
  UserCheck, UsersRound, FileText, PieChart, Database, Activity, SearchIcon, X, Eye, EyeOff
} from "lucide-react";





import { motion, AnimatePresence } from "framer-motion";
import { studentApi, authApi, feeApi, resultApi } from "./services/api";
import Students from "./pages/Students";

import Fees from "./pages/Fees";
import Exams from "./pages/Exams";
import Attendance from "./pages/Attendance";
import Library from "./pages/Library";
import HRPayroll from "./pages/HRPayroll";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";

// Role-based Dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

// Auth
import { supabase } from "./services/supabaseClient";



const COLORS = {
  maroon: "#7A1E1E",
  maroonDark: "#5A1515",
  maroonLight: "#9B2525",
  ivory: "#F5F1E8",
  ivoryDark: "#EDE8D8",
  gold: "#C9A227",
  goldLight: "#E0B93A",
  charcoal: "#2B2B2B",
  charcoalLight: "#3D3D3D",
  white: "#FFFFFF",
  darkBg: "#0F1117",
  darkCard: "#1A1D27",
  darkBorder: "#2A2D3A",
};

const STATS = [
  { label: "Years of Excellence", value: "70+", Icon: Award },
  { label: "Students Enrolled", value: "5,200+", Icon: Users },
  { label: "Teaching Faculty", value: "180+", Icon: GraduationCap },
  { label: "Placement Rate", value: "87%", Icon: Briefcase },
];


const ACADEMIC_PROGRAMMES = {
  undergraduate: [
    { degree: "B.A.", subject: "Economics", year: "1957-58" },
    { degree: "B.A.", subject: "History", year: "1970-71" },
    { degree: "B.A.", subject: "Tamil", year: "1965-66" },
    { degree: "B.A.", subject: "English", year: "1966-67" },
    { degree: "B.A.", subject: "Indian Culture", year: "1983-84" },
    { degree: "B.Com", subject: "Commerce", year: "1968-69" },
    { degree: "B.Com", subject: "Banking Management", year: "2017-18" },
    { degree: "B.Com", subject: "Computer Applications", year: "2017-18" },
    { degree: "B.Sc.", subject: "Mathematics", year: "1957-58" },
    { degree: "B.Sc.", subject: "Chemistry", year: "1959-60" },
    { degree: "B.Sc.", subject: "Physics", year: "1961-62" },
    { degree: "B.Sc.", subject: "Botany", year: "1969-70" },
    { degree: "B.Sc.", subject: "Microbiology", year: "2014-15" },
    { degree: "B.Sc.", subject: "Zoology", year: "1961-62" },
    { degree: "B.Sc.", subject: "Computer Science", year: "1984-85" },
    { degree: "B.Sc.", subject: "Physical Education", year: "1988-89" },
    { degree: "B.Sc.", subject: "Geography", year: "2013-14" },
    { degree: "B.Sc.", subject: "Statistics", year: "2013-14" },
    { degree: "B.B.A.", subject: "Business Administration", year: "2004-05" },
    { degree: "B.Litt", subject: "Tamil", year: "2008-09" },
    { degree: "B.C.A.", subject: "Computer Applications", year: "2008-09" }
  ],
  postgraduate: [
    { degree: "M.A.", subject: "History", year: "1982-83" },
    { degree: "M.A.", subject: "Economics", year: "1967-68" },
    { degree: "M.A.", subject: "Tamil", year: "1975-76" },
    { degree: "M.A.", subject: "English", year: "1973-74" },
    { degree: "M.Com.", subject: "Commerce", year: "1976-77" },
    { degree: "M.Sc.", subject: "Mathematics", year: "1967-68" },
    { degree: "M.Sc.", subject: "Physics", year: "1972-73" },
    { degree: "M.Sc.", subject: "Chemistry", year: "2002-03" },
    { degree: "M.Sc.", subject: "Botany", year: "1980-81" },
    { degree: "M.Sc.", subject: "Microbiology", year: "1998-99" },
    { degree: "M.Sc.", subject: "Zoology", year: "1979-80" },
    { degree: "M.Sc.", subject: "Computer Science", year: "1987-88" },
    { degree: "M.Sc.", subject: "Information Technology", year: "2001-02" },
    { degree: "M.Sc.", subject: "Biotechnology", year: "2005-06" },
    { degree: "M.C.A.", subject: "Computer Applications", year: "1993-94" },
    { degree: "M.B.A.", subject: "Business Administration", year: "2000-01" },
    { degree: "M.B.A.", subject: "Logistics", year: "2022-23" },
    { degree: "M.L.I.S", subject: "Library Science", year: "2004-05" }
  ],
  research: [
    "History", "Economics", "Tamil", "English", "Commerce", "Mathematics", 
    "Physics", "Chemistry", "Botany", "Microbiology", "Zoology", 
    "Computer Science", "Physical Education", "Library & Information Science", "Management studies"
  ]
};

const DEPARTMENTS = [
  { name: "Faculty of Life Sciences", code: "LS", subjects: ["Botany", "Zoology", "Microbiology", "Biotech"], Icon: Heart, established: 1961 },
  { name: "Faculty of Humanities", code: "HU", subjects: ["Tamil", "English", "History", "Economics"], Icon: Scroll, established: 1956 },
  { name: "Faculty of IT & Science", code: "IT", subjects: ["CS", "Physics", "Chemistry", "Mathematics"], Icon: Laptop, established: 1984 },
  { name: "Faculty of Commerce", code: "CO", subjects: ["Commerce", "BBA", "MBA", "Banking"], Icon: CreditCard, established: 1968 },
];


const ERP_MODULES = [
  { name: "Student Info", icon: Users, color: "#4F46E5", count: "5,240 Students" },
  { name: "Attendance", icon: Calendar, color: "#059669", count: "Today: 94.2%" },
  { name: "Exams", icon: Award, color: "#D97706", count: "3 Upcoming" },
  { name: "Fees", icon: CreditCard, color: "#DC2626", count: "₹12.4L Pending" },
  { name: "Library", icon: Library, color: "#7C3AED", count: "18,420 Books" },
  { name: "HR & Payroll", icon: Users, color: "#0891B2", count: "342 Staff" },
  { name: "Accounts", icon: LayoutDashboard, color: "#65A30D", count: "FY 2024-25" },
  { name: "Settings", icon: Settings, color: "#EA580C", count: "v1.2.0" },
];

const AdmissionModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '', rollNumber: '', email: '', department: 'Computer Science', semester: 1
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Step 1: Check if we are in "Demo Mode" without real Supabase keys
      if (import.meta.env.VITE_SUPABASE_URL === 'YOUR_SUPABASE_PROJECT_URL') {
        console.log("Mock Admission to Supabase (Demo Mode):", formData);
        await new Promise(r => setTimeout(r, 1500));
        alert('Mock Admission Successful! Added ' + formData.name);
        onSuccess(formData);
        onClose();
        return;
      }

      // Step 2: Create Auth User (Note: In a pure client setup, this signs the user in.
      // In a production ERP, this should be done via a secure Edge Function. We use a default password.)
      const defaultPassword = 'Pushpam@2026';
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: defaultPassword,
        options: {
          data: { full_name: formData.name, role: 'student' }
        }
      });

      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error("Could not retrieve user ID from Auth");

      // Step 3: Insert into Profiles table (Requires RLS Insert Policy in Supabase)
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: userId,
          full_name: formData.name,
          email: formData.email,
          role: 'student',
          department: formData.department
        }
      ]);

      if (profileError) throw profileError;

      // Step 4: Insert into Students Registry (Requires RLS Insert Policy in Supabase)
      const { error: studentError } = await supabase.from('students').insert([
        {
          profile_id: userId,
          full_name: formData.name,
          register_no: formData.rollNumber,
          department: formData.department,
          current_semester: formData.semester,
          status: 'active'
        }
      ]);

      if (studentError) throw studentError;

      console.log('Admission Successful to Supabase');
      setLoading(false);
      onSuccess(formData);
      setFormData({ name: '', rollNumber: '', email: '', department: 'Computer Science', semester: 1 });
      onClose();
      
    } catch (err) {
      console.error('Admission Error:', err);
      setLoading(false);
      alert('Admission Failed: ' + (err.message || 'Check console details'));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-dark-card border border-dark-border rounded-2xl w-full max-w-md p-8 shadow-2xl"
      >
        <h2 className="text-2xl font-serif font-bold text-gold mb-6">New Student Admission</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-white/40 uppercase font-bold mb-2 block">Full Name</label>
            <input
              type="text" required
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-sm focus:border-gold outline-none"
              value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/40 uppercase font-bold mb-2 block">Roll Number</label>
              <input
                type="text" required
                className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-sm focus:border-gold outline-none"
                value={formData.rollNumber} onChange={e => setFormData({ ...formData, rollNumber: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase font-bold mb-2 block">Academic Semester</label>
              <input
                type="number" required
                className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-sm focus:border-gold outline-none"
                value={formData.semester} onChange={e => setFormData({ ...formData, semester: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/40 uppercase font-bold mb-2 block">Department</label>
            <select
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-sm focus:border-gold outline-none"
              value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })}
            >
              {DEPARTMENTS.map(d => <option key={d.code} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/40 uppercase font-bold mb-2 block">Email Address</label>
            <input
              type="email" required
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-sm focus:border-gold outline-none"
              value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="flex gap-4 mt-8">
            <Button variant="outline" className="flex-1" onClick={onClose} type="button">Cancel</Button>
            <Button className="flex-1" disabled={loading}>{loading ? 'Processing...' : 'Complete Admission'}</Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const EVENTS = [
  { date: "Mar 15", title: "Annual Day Celebrations", category: "Cultural", badge: "upcoming" },
  { date: "Mar 20", title: "UGC Sponsored Seminar on AI", category: "Academic", badge: "upcoming" },
  { date: "Apr 02", title: "Internal Assessment - Semester IV", category: "Examination", badge: "exam" },
  { date: "Apr 10", title: "Campus Recruitment Drive – Infosys", category: "Placement", badge: "placement" },
];

const RECENT_ACTIVITY = [
  { action: "New admission registered", user: "Admin", time: "2 min ago", type: "info" },
  { action: "Fees collected: ₹45,000", user: "Accounts", time: "15 min ago", type: "success" },
  { action: "Attendance report generated", user: "HOD-CS", time: "1 hr ago", type: "info" },
  { action: "Library book #18420 issued", user: "Librarian", time: "2 hr ago", type: "neutral" },
  { action: "Exam schedule published", user: "Controller", time: "3 hr ago", type: "warning" },
];


// --- Institutional Data & Constants ---


// --- Sub-components (could be in separate files) ---

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary: "bg-gold-gradient text-maroon hover:shadow-gold-glow",
    outline: "border border-white/20 text-white hover:bg-white/10",
    ghost: "text-white/70 hover:text-gold hover:bg-white/5",
    action: "bg-maroon/10 border border-maroon/20 text-maroon hover:bg-maroon/20",
  };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`px-8 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 text-sm flex-row ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const Card = ({ children, className = "", hover = true }) => (
  <motion.div
    whileHover={hover ? { y: -5, borderColor: COLORS.gold } : {}}
    className={`bg-white border border-ivory-dark rounded-xl p-6 transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ title, subtitle, light = false }) => (
  <div className="text-center mb-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={`text-xs font-bold tracking-[0.3em] uppercase mb-4 ${light ? "text-gold" : "text-gold"}`}
    >
      {subtitle}
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`text-4xl md:text-5xl font-serif font-bold ${light ? "text-white" : "text-maroon"}`}
    >
      {title}
    </motion.h2>
    <div className="w-16 h-1 bg-gold mx-auto mt-6 rounded-full" />
  </div>
);

// --- Sections ---

const Navbar = ({ onSwitch, activeView }) => {
  const navLinks = ["About", "Departments", "Admissions", "Facilities", "Placements"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] h-20 bg-glass/80 backdrop-blur-xl px-12 flex items-center justify-between border-b border-white/5 shadow-premium transition-all duration-500">
      <div className="flex items-center gap-5 cursor-pointer group">
        <div style={{ width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 20px rgba(201,162,39,0.2)`, borderRadius: "50%", overflow: "hidden", background: COLORS.white }}>
          <img src="/assets/pushpam-logo.png" alt="Sri Pushpam College Logo" style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }} />
        </div>

        <div className="hidden sm:block">
          <div className="text-[10px] tracking-[0.25em] text-gold font-bold uppercase mb-0.5 opacity-80">Autonomous Institution</div>
          <div className="text-white font-serif font-bold text-lg leading-none">Sri Pushpam College</div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-10">
        {navLinks.map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-xs tracking-widest uppercase font-bold text-white/50 hover:text-gold transition-all duration-300 relative group"
          >
            {link}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <Button variant="outline" className="px-6 py-2.5 text-[10px] tracking-widest uppercase rounded-full" onClick={() => onSwitch("erp")}>
          ERP Portal
        </Button>
        <Button variant="primary" className="px-6 py-2.5 text-[10px] tracking-widest uppercase rounded-full">
          Apply Now
        </Button>
      </div>
    </nav>
  );
};

const VirtualTourModal = ({ isOpen, onClose }) => {
  const [current, setCurrent] = useState(0);
  const images = [
    "https://avvmspc.ac.in/assets/images/resized2022/HOMEPAGE%209.jpg",
    "https://avvmspc.ac.in/assets/images/resized2022/HOMEPAGE%207.jpg",
    "https://avvmspc.ac.in/assets/images/resized2022/HOMEPAGE%208.jpg",
    "https://avvmspc.ac.in/assets/images/resized2022/HOMEPAGE%206.jpg",
    "https://avvmspc.ac.in/assets/images/resized2022/HOMEPAGE%201.jpg"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-dark-bg/95 backdrop-blur-xl" 
        onClick={onClose} 
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-6xl aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-dark-card"
      >
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md border border-white/10 transition-all hover:rotate-90"
        >
          <X className="w-6 h-6" />
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-xl">
            <div className="text-gold font-bold tracking-[0.3em] uppercase text-[10px] mb-4">A.V.V.M. Sri Pushpam College Experience</div>
            <h2 className="text-4xl font-serif font-bold text-white mb-4">Institutional Landmarks</h2>
            <div className="flex gap-2 mb-6">
              {images.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-500 ${current === i ? "w-8 bg-gold" : "w-4 bg-white/20"}`} 
                />
              ))}
            </div>
          </div>
          <div className="flex gap-4">
             <button 
               onClick={() => setCurrent((current - 1 + images.length) % images.length)} 
               className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all group"
             >
               <ChevronRight className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
             </button>
             <button 
               onClick={() => setCurrent((current + 1) % images.length)} 
               className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center text-maroon hover:shadow-gold-glow transition-all group"
             >
               <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Hero = ({ onTour }) => (

  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-maroon-gradient pt-20 px-4">
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,39,0.15),transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 40px)", opacity: 0.05 }} />
    </div>

    <div className="relative z-10 text-center max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block px-6 py-2 border border-gold/30 rounded-full text-[10px] font-black tracking-[0.4em] text-gold uppercase mb-12 backdrop-blur-md bg-white/5"
      >
        Poondi, Thanjavur • NAAC “A” Grade (4th Cycle) • ISO Certified
      </motion.div>


      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl md:text-8xl font-serif font-bold text-white leading-[1.05] mb-8 tracking-tighter"
      >
        A.V.V.M. <br />
        <span className="text-gold-gradient drop-shadow-2xl">Sri Pushpam College</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-2xl text-white/50 leading-relaxed mb-14 max-w-3xl mx-auto font-medium"
      >
        Nurturing academic excellence and character since 1956.
        Tamil Nadu's premier autonomous institution where tradition meets the future.
      </motion.p>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-6"
      >
        <Button className="rounded-full px-12 py-5 text-base shadow-gold-glow">Explore Academic Wings</Button>
        <Button 
          variant="outline" 
          className="rounded-full px-12 py-5 text-base border-white/10 hover:border-gold/50"
          onClick={onTour}
        >
          Campus Virtual Tour <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl border border-white/5 shadow-premium"
      >
        {STATS.map(s => (
          <div key={s.label} className="bg-white/[0.02] p-8 hover:bg-white/[0.05] transition-all duration-500 group border border-transparent hover:border-white/5">
            <s.Icon className="w-6 h-6 text-gold/40 mb-5 mx-auto group-hover:text-gold group-hover:scale-125 transition-all duration-500" />
            <div className="text-4xl font-serif font-bold text-white mb-2 tracking-tighter">{s.value}</div>
            <div className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20 group-hover:text-gold/50 transition-colors uppercase">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section className="py-24 px-8 bg-white" id="about">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://avvmspc.ac.in/assets/images/resized2022/HOMEPAGE%209.jpg" 
              alt="Sri Pushpam College Heritage Building"
              className="w-full h-full object-cover"
            />

          </div>
          <div className="absolute -bottom-10 -right-10 w-64 p-8 bg-gold rounded-[2rem] shadow-premium hidden md:block">
            <div className="text-4xl font-serif font-bold text-maroon mb-2">70+</div>
            <div className="text-xs font-black uppercase tracking-widest text-maroon/60">Years of Educational Legacy</div>
          </div>

        </motion.div>
        <div>
          <SectionTitle 
            title="A Legacy of Excellence Since 1956" 
            subtitle="Our Heritage" 
            className="text-left"
          />

          <style>{`.text-left { text-align: left !important; } .text-left div { margin-left: 0 !important; }`}</style>
          <p className="text-lg text-charcoal/70 leading-relaxed mb-8">
            A.V.V.M. Sri Pushpam College (Autonomous) stands as a beacon of higher education in the rural landscapes of Thanjavur. Founded by the visionary Rao Bahadur A. Veeriya Vandaiyar, our institution has evolved into one of the most prestigious academic centers in South India.
          </p>
          <div className="grid grid-cols-2 gap-8 mb-12">
            {[
              { label: "Vision", desc: "To provide world-class education with emphasis on moral values." },
              { label: "Mission", desc: "Empowering rural youth through knowledge and character." },
            ].map(item => (
              <div key={item.label}>
                <div className="font-serif font-bold text-maroon text-xl mb-3">{item.label}</div>
                <p className="text-sm text-charcoal/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="text-maroon border-maroon/20">Read Full History</Button>
        </div>
      </div>
    </div>
  </section>
);

const Admissions = () => (
  <section className="py-24 px-8 bg-maroon-gradient" id="admissions">
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="Join Our Academic Community" subtitle="Admissions 2024-25" light />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Undergraduate", icon: GraduationCap, steps: ["Online Application", "Merit Ranking", "Counselling"] },
          { title: "Postgraduate", icon: Award, steps: ["Entrance Test", "Interview", "Document Verification"] },
          { title: "Research / PhD", icon: ShieldCheck, steps: ["Proposal Submission", "UGC Norms Check", "Viva Voce"] },
        ].map(prog => (
          <motion.div
            key={prog.title}
            whileHover={{ y: -10 }}
            className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl group hover:border-gold/30 transition-all"
          >
            <prog.icon className="w-12 h-12 text-gold mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-serif font-bold text-white mb-6">{prog.title}</h3>
            <div className="space-y-4">
              {prog.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-4 text-white/50 text-sm">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-gold">{i + 1}</div>
                  {step}
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 bg-gold text-maroon font-black text-[10px] uppercase tracking-widest rounded-xl hover:shadow-gold-glow transition-all">
              Apply for {prog.title}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Facilities = () => (
  <section className="py-24 px-8 bg-ivory" id="facilities">
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="Modern Infrastructure for New-Age Learning" subtitle="Campus Facilities" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          { name: "Central Library", desc: "1.2 Lakh+ volumes of books and national/international journals.", icon: LibraryIcon },
          { name: "Smart Auditoriums", desc: "Fully air-conditioned halls with 1500+ seating capacity.", icon: Monitor },
          { name: "Sports Arena", desc: "Olympic-sized ground with specialized coaching for 12+ sports.", icon: Target },
          { name: "Science Laboratories", desc: "State-of-the-art labs for Physics, Chemistry and Bio-sciences.", icon: FlaskConical },
          { name: "Tech-Enabled Classrooms", desc: "Digital podiums and interactive smart boards in every wing.", icon: Laptop },
          { name: "Residential Hostel", desc: "Separate secure housing for men and women with healthy dining.", icon: Building2 },
        ].map(item => (
          <div key={item.name} className="flex gap-6 p-4 group">
            <div className="w-16 h-16 shrink-0 bg-maroon rounded-2xl flex items-center justify-center text-ivory shadow-lg group-hover:scale-110 group-hover:bg-gold group-hover:text-maroon transition-all duration-500">
              <item.icon className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold text-maroon mb-2">{item.name}</h4>
              <p className="text-sm text-charcoal/60 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Placements = () => (
  <section className="py-24 px-8 bg-white" id="placements">
    <div className="max-w-7xl mx-auto">
      <div className="bg-dark-card rounded-[3rem] p-16 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-maroon/5 blur-[120px] rounded-full -ml-48 -mb-48" />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1px bg-gold" />
              <div className="text-gold font-bold tracking-[0.3em] uppercase text-xs">Career Success</div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">Empowering Careers with Global Leaders</h2>
            <p className="text-white/40 text-lg leading-relaxed mb-10">
              Our dedicated placement cell ensures that every student finds their right career path. With 500+ annual campus offers, we bridge the gap between classroom and boardroom.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-3xl font-serif font-bold text-gold">450+</div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black mt-2">Annual Placements</div>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-3xl font-serif font-bold text-gold">8.5L</div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black mt-2">Highest CTC</div>
              </div>
            </div>
            <Button variant="primary" className="bg-gold text-maroon hover:shadow-gold-glow">View Placement Report</Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full lg:w-auto">
            {['Infosys', 'Wipro', 'TCS', 'ZOHO', 'Cognizant', 'Accenture', 'HCL', 'Tech Mahindra', 'L&T'].map(brand => (
              <div key={brand} className="aspect-square w-full lg:w-32 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-white/40 font-bold hover:bg-gold/10 hover:text-gold hover:border-gold/30 transition-all cursor-default group shadow-lg">
                <span className="group-hover:scale-110 transition-transform">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);


const Departments = () => {
  const [activeType, setActiveType] = useState("undergraduate");

  return (
    <section className="py-24 px-8 bg-ivory" id="departments">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Academic Programmes" subtitle="Departments & Schools" />

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {["undergraduate", "postgraduate", "research"].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeType === type 
                ? "bg-maroon text-gold shadow-premium" 
                : "bg-white text-maroon/40 hover:text-maroon border border-ivory-dark"}`}
            >
              {type} Programmes
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-10 border border-ivory-dark shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] rounded-full -mr-32 -mt-32" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {activeType !== "research" ? (
                  ACADEMIC_PROGRAMMES[activeType].map((prog, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex justify-between items-center py-3 border-b border-ivory-dark group cursor-default"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-maroon/20 group-hover:text-gold transition-colors">{prog.degree}</span>
                        <span className="text-sm font-bold text-maroon group-hover:translate-x-1 transition-transform">{prog.subject}</span>
                      </div>
                      <span className="text-[9px] font-black text-charcoal/30 tracking-widest uppercase">{prog.year}</span>
                    </motion.div>
                  ))
                ) : (
                  ACADEMIC_PROGRAMMES.research.map((subject, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 py-3 border-b border-ivory-dark group"
                    >
                      <div className="w-2 h-2 rounded-full bg-gold/20 group-hover:bg-gold transition-colors" />
                      <span className="text-sm font-bold text-maroon group-hover:translate-x-1 transition-transform">Ph.D. in {subject}</span>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-maroon/40 ml-4 mb-4">Faculty Structure</h4>
            {DEPARTMENTS.map((dept) => (
              <Card key={dept.code} className="p-8 group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-maroon/5 flex items-center justify-center group-hover:bg-maroon transition-colors duration-500">
                    <dept.Icon className="w-6 h-6 text-maroon group-hover:text-gold transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-maroon">{dept.name}</h3>
                    <div className="flex gap-2 flex-wrap mt-2">
                      {dept.subjects.slice(0, 3).map(s => (
                        <span key={s} className="text-[8px] font-black uppercase tracking-wider text-charcoal/40">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const Login = ({ onLogin }) => {
  const [activeRole, setActiveRole] = useState('student'); // 'student', 'staff', 'admin'
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Clear credentials when changing role tab
  const handleRoleChange = (role) => {
    setActiveRole(role);
    setCredentials({ email: '', password: '' });
    setError('');
  };

  const getRoleTitle = () => {
    if (activeRole === 'admin') return "Administrator Portal";
    if (activeRole === 'staff') return "Faculty & Staff Portal";
    return "Student Portal";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // 1. Supabase Auth Login
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (authError) throw authError;

      // 2. Fetch User Profile/Role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();
      
      if (profileError) throw profileError;

      const userData = {
        user: { ...authData.user, role: profile.role, name: profile.full_name },
        token: authData.session.access_token
      };

      onLogin(userData);
    } catch (err) {
      console.error('Login Error:', err);
      // Fallback for demo if keys are YOUR_SUPABASE_PROJECT_URL
      if (import.meta.env.VITE_SUPABASE_URL === 'YOUR_SUPABASE_PROJECT_URL' || true) { // keep demo fallback working for easy testing
         // Mock login for localhost testing
         let demoRole = activeRole;
         
         const demoUsers = {
           'admin': { email: 'admin@mail.com', name: 'Super Admin' },
           'staff': { email: 'staff@mail.com', name: 'Demo Staff' },
           'student': { email: 'student@mail.com', name: 'Demo Student' }
         };

         const roles = { 'admin@mail.com': 'admin', 'staff@mail.com': 'staff', 'student@mail.com': 'student' };
         const finalRole = roles[credentials.email] || demoRole;
         const finalName = finalRole === 'admin' ? 'Super Admin' : finalRole === 'staff' ? 'Demo Staff' : 'Demo Student';

         setTimeout(() => {
           onLogin({ user: { email: credentials.email || demoUsers[activeRole].email, role: finalRole, name: finalName }, token: 'mock-token' });
         }, 800);
      } else {
         setError(err.message || 'Authentication Failed');
      }
    } finally {
      if(import.meta.env.VITE_SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL') {
        setLoading(false);
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 40px)", opacity: 0.02 }} />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-maroon/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gold/10 blur-[150px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-5xl flex flex-col md:flex-row bg-dark-card/60 backdrop-blur-2xl border border-dark-border rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
      >
        {/* Left Side: Branding & Info */}
        <div className="hidden md:flex md:w-5/12 bg-maroon-gradient p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] rounded-full -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2 mb-8 shadow-[0_0_30px_rgba(201,162,39,0.3)]">
              <img src="/assets/pushpam-logo.png" alt="Sri Pushpam College Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-white mb-4 leading-tight">Welcome to <br /><span className="text-gold">e-Campus ERP</span></h1>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Experience the next generation of academic management. A unified portal integrating all institutional operations seamlessly.
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4 text-sm text-white/70">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-gold" /></div>
              <span>Secure & Encrypted Access</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Globe className="w-4 h-4 text-gold" /></div>
              <span>24/7 Cloud Availability</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-7/12 p-10 md:p-14">
          <div className="md:hidden flex flex-col items-center mb-10">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2 mb-4 shadow-[0_0_30px_rgba(201,162,39,0.3)]">
                <img src="/assets/pushpam-logo.png" alt="Sri Pushpam College Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-white"><span className="text-gold">e-Campus</span> ERP</h1>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-serif font-bold text-white mb-2">{getRoleTitle()}</h2>
            <p className="text-white/40 text-sm">Please sign in to your account</p>
          </div>

          {/* Role Tabs */}
          <div className="flex p-1 bg-dark-bg/50 border border-dark-border rounded-xl mb-8">
            {['student', 'staff', 'admin'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleChange(role)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                  activeRole === role 
                    ? "bg-white/10 text-gold shadow-md" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Email Address / ID</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-gold transition-colors" />
                  <input
                    type="email"
                    placeholder={`Enter your ${activeRole} email`}
                    className="w-full bg-dark-bg/60 border border-dark-border rounded-xl py-4 pl-14 pr-6 text-sm text-white focus:border-gold outline-none transition-all focus:bg-dark-bg focus:shadow-[0_0_15px_rgba(201,162,39,0.1)]"
                    value={credentials.email}
                    onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-gold transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-dark-bg/60 border border-dark-border rounded-xl py-4 pl-14 pr-12 text-sm text-white focus:border-gold outline-none transition-all focus:bg-dark-bg focus:shadow-[0_0_15px_rgba(201,162,39,0.1)]"
                    value={credentials.password}
                    onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-5 h-5 rounded border ${rememberMe ? 'bg-gold border-gold' : 'border-dark-border bg-dark-bg/60 group-hover:border-white/30'} flex items-center justify-center transition-colors`}>
                  {rememberMe && <CheckCircle2 className="w-3 h-3 text-maroon" />}
                </div>
                <span className="text-xs text-white/60 group-hover:text-white transition-colors">Remember me</span>
                {/* Hidden input to maintain state if needed, though react state handles it */}
                <input type="checkbox" className="hidden" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              </label>
              
              <button type="button" className="text-xs text-gold hover:text-gold-light hover:underline transition-all">
                Forgot Password?
              </button>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <Button
              disabled={loading}
              className="w-full rounded-xl py-4 text-xs font-black uppercase tracking-[0.2em] shadow-gold-glow hover:shadow-[0_0_30px_rgba(201,162,39,0.4)]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-maroon/20 border-t-maroon rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : `Login to ${activeRole === 'admin' ? 'Admin' : activeRole === 'staff' ? 'Staff' : 'Student'} Portal`}
            </Button>
            
            <div className="mt-8 text-center text-xs text-white/40">
              Looking for public links? <button type="button" className="text-gold hover:underline ml-1">View College Website</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const ERP = ({ onBack, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "Students" || activeTab === "Fees" || activeTab === "Exams") {
      fetchStudents();
    }
  }, [activeTab]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentApi.getAll();
      setStudents(response.data);
    } catch (err) {
      console.error('Failed to fetch students:', err);
    } finally {
      setLoading(false);
    }
  };

  const sidebarLinks = useMemo(() => {
    const common = [
      { name: "Dashboard", icon: LayoutDashboard },
    ];
    
    if (user?.role === 'admin') {
      return [
        ...common,
        { name: "Students", icon: Users },
        { name: "Staff", icon: UserCheck },
        { name: "Departments", icon: Building2 },
        { name: "Attendance", icon: Calendar },
        { name: "Examinations", icon: FileText },
        { name: "Fees", icon: CreditCard },
        { name: "Library", icon: BookOpen },
        { name: "Placements", icon: Briefcase },
        { name: "Reports", icon: PieChart },
        { name: "Settings", icon: SettingsIcon },
      ];
    }
    
    if (user?.role === 'staff') {
      return [
        ...common,
        { name: "Mark Attendance", icon: Calendar },
        { name: "Enter Marks", icon: FileText },
        { name: "View Students", icon: Users },
        { name: "Course Materials", icon: BookOpen },
      ];
    }

    return [
      ...common,
      { name: "Profile", icon: UserCheck },
      { name: "Attendance", icon: Calendar },
      { name: "Results", icon: Award },
      { name: "Fees", icon: CreditCard },
      { name: "Library", icon: BookOpen },
    ];
  }, [user]);





  const handleAdmissionSuccess = (student) => {
    setStudents([...students, student]);
  };

  return (
    <div className="flex h-screen bg-dark-bg text-white font-sans overflow-hidden">
      <AdmissionModal
        isOpen={isAdmissionModalOpen}
        onClose={() => setIsAdmissionModalOpen(false)}
        onSuccess={handleAdmissionSuccess}
      />
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 280 : 88 }}
        className="bg-dark-card border-r border-dark-border flex flex-col relative z-20"
      >
        <div className="h-24 px-8 flex items-center gap-5 border-b border-dark-border/50">
          <img src="/assets/pushpam-logo-small.png" alt="Logo" style={{ width: "40px", height: "40px", borderRadius: "10px", objectFit: "contain", background: COLORS.white, padding: "4px", flexShrink: 0, boxShadow: `0 0 20px rgba(201,162,39,0.3)` }} />
          {sidebarOpen && <span className="text-gold font-bold tracking-[0.1em] uppercase text-xs">Pushpam ERP</span>}
        </div>


        <nav className="flex-1 p-4 space-y-1 mt-6">
          {sidebarLinks.map(link => (
            <button
              key={link.name}
              onClick={() => setActiveTab(link.name)}
              className={`w-full flex items-center gap-5 px-5 py-4 rounded-xl transition-all duration-300 relative group ${activeTab === link.name
                ? "bg-maroon text-gold shadow-premium"
                : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
            >
              <link.icon className={`w-5 h-5 shrink-0 ${activeTab === link.name ? "text-gold" : "group-hover:text-gold"} transition-colors`} />
              {sidebarOpen && <span className="text-[13px] font-bold tracking-wide">{link.name}</span>}
              {activeTab === link.name && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-8 bg-gold rounded-r-full"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-dark-border/50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-3 hover:bg-white/5 rounded-xl transition-all group"
          >
            <Menu className="w-5 h-5 text-white/30 group-hover:text-gold transition-colors" />
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 bg-dark-card border-b border-dark-border px-10 flex items-center justify-between shadow-2xl sticky top-0 z-30">
          <div className="flex items-center gap-10">
            <div>
              <h1 className="text-2xl font-serif font-bold text-white tracking-tight">{activeTab}</h1>
              <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mt-1">Pushpam ERP • System Live</p>
            </div>
            <div className="hidden lg:flex items-center gap-4 bg-dark-bg/50 border border-dark-border rounded-2xl px-5 py-2.5">
              <Search className="w-4 h-4 text-white/20" />
              <input
                type="text"
                placeholder="Search students, staff, courses..."
                className="bg-transparent text-sm focus:outline-none w-64 text-white/60 placeholder:text-white/20"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs font-bold text-white/60 hover:text-white hover:border-white/20 transition-all">
              <span className="w-4 h-4 rounded bg-white/10 flex items-center justify-center font-serif">↓</span>
              Export Data
            </button>
            
            <div className="relative group/bell">
              <button className="relative w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5">
                <Bell className="w-5 h-5 text-white/40" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-dark-card" />
              </button>
              
              <div className="absolute top-14 right-0 w-80 bg-dark-card border border-dark-border rounded-2xl shadow-2xl opacity-0 translate-y-4 pointer-events-none group-hover/bell:opacity-100 group-hover/bell:translate-y-0 group-hover/bell:pointer-events-auto transition-all p-4 z-50">
                <div className="text-xs font-bold text-white/50 mb-3 px-2 uppercase tracking-widest">Notifications</div>
                <div className="space-y-2">
                   <div className="p-3 bg-white/5 rounded-xl text-sm text-white">3 New Admissions <div className="text-[10px] text-white/40 mt-1">Just now</div></div>
                   <div className="p-3 bg-white/5 rounded-xl text-sm text-white">Fees Payment Received <div className="text-[10px] text-white/40 mt-1">2 mins ago</div></div>
                   <div className="p-3 bg-white/5 rounded-xl text-sm text-white">Exam Results Published <div className="text-[10px] text-white/40 mt-1">1 hour ago</div></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5 pl-8 border-l border-dark-border relative group/profile cursor-pointer">
              <div className="text-right">
                <div className="text-sm font-bold text-white">{user?.name || 'Staff Member'}</div>
                <div className="text-[10px] text-gold font-black uppercase tracking-widest leading-none mt-1">{user?.role || 'Academic Staff'}</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/50">
                <UserCheck className="w-5 h-5" />
              </div>
              
              <div className="absolute top-14 right-0 w-48 bg-dark-card border border-dark-border rounded-2xl shadow-2xl opacity-0 translate-y-4 pointer-events-none group-hover/profile:opacity-100 group-hover/profile:translate-y-0 group-hover/profile:pointer-events-auto transition-all flex flex-col p-2 z-50">
                 <button className="flex items-center gap-3 p-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all text-left">
                   <SettingsIcon className="w-4 h-4" /> Settings
                 </button>
                 <button onClick={onLogout} className="flex items-center gap-3 p-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all text-left mt-1">
                   <LogOut className="w-4 h-4" /> Logout
                 </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === "Dashboard" && (
              user?.role === 'admin' ? <AdminDashboard onAdmit={() => setIsAdmissionModalOpen(true)} /> :
              user?.role === 'staff' ? <StaffDashboard /> :
              <StudentDashboard />
            )}

            
            {/* Admin Tabs */}
            {activeTab === "Students" && <Students students={students} loading={loading} />}
            {activeTab === "Fees" && <Fees students={students} loading={loading} />}
            {activeTab === "Examinations" && <Exams students={students} loading={loading} />}
            {activeTab === "Attendance" && <Attendance />}
            {activeTab === "HR & Payroll" && <HRPayroll />}
            {activeTab === "Accounts" && <Accounts />}
            {activeTab === "Settings" && <Settings />}

            {/* Staff / Student Specific (Placeholder for full components) */}
            {["Staff", "Departments", "Placements", "Reports", "Mark Attendance", "Enter Marks", "View Students", "Course Materials", "Profile", "Results"].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center py-40 bg-dark-card border border-dark-border rounded-[3rem]">
                <Database className="w-16 h-16 text-gold/20 mb-6" />
                <h3 className="text-xl font-serif font-bold text-white mb-2">{activeTab} Interface</h3>
                <p className="text-white/30 text-xs">Connecting to Supabase {user?.role} database...</p>
              </div>
            )}
            
            {activeTab === "Library" && <Library />}



          </div>
        </div>
      </main>
      <button
        onClick={onBack}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gold shadow-2xl flex items-center justify-center text-maroon hover:scale-110 transition-transform z-[100]"
      >
        <Globe className="w-6 h-6" />
      </button>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState("website");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('erp_token'));
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);


  const handleLogin = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('erp_token', data.token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('erp_token');
    setView('website');
  };

  return (
    <div className="font-sans antialiased selection:bg-gold/30 selection:text-gold">
      <AnimatePresence mode="wait">
        {view === "website" ? (
          <motion.div
            key="website"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white min-h-screen"
          >
            <VirtualTourModal isOpen={isVirtualTourOpen} onClose={() => setIsVirtualTourOpen(false)} />
            <Navbar onSwitch={setView} activeView={view} />
            <Hero onTour={() => setIsVirtualTourOpen(true)} />

            <About />
            <Departments />
            <Admissions />
            <Facilities />
            <Placements />


            {/* Events Preview */}
            <section className="py-24 px-8 bg-white overflow-hidden relative">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                  <div>
                    <div className="text-gold font-bold tracking-[0.3em] uppercase mb-4 text-xs">What's Happening</div>
                    <h2 className="text-4xl font-serif font-bold text-maroon">Campus News & Events</h2>
                  </div>
                  <Button variant="ghost" className="text-maroon">See All Events <ArrowRight className="w-4 h-4" /></Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {EVENTS.map((event, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 10, backgroundColor: '#F5F1E8' }}
                      className="flex gap-6 p-6 bg-white rounded-2xl border border-ivory-dark group cursor-pointer transition-colors"
                    >
                      <div className="shrink-0 w-20 h-20 bg-maroon rounded-xl flex flex-col items-center justify-center text-ivory">
                        <span className="text-2xl font-serif font-bold">{event.date.split(' ')[1]}</span>
                        <span className="text-[10px] uppercase font-bold text-gold">{event.date.split(' ')[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${event.badge === 'exam' ? 'bg-orange-100 text-orange-600' :
                            event.badge === 'placement' ? 'bg-green-100 text-green-600' :
                              'bg-maroon/10 text-maroon'
                            }`}>
                            {event.badge}
                          </span>
                          <span className="text-[10px] text-charcoal/40 uppercase font-bold">{event.category}</span>
                        </div>
                        <h4 className="text-lg font-serif font-bold text-maroon group-hover:text-gold-light transition-colors">{event.title}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0A0C11] pt-32 pb-16 px-12 border-t border-white/5">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
                  <div className="lg:col-span-1">
                    <div className="flex items-center gap-5 mb-10 group cursor-pointer inline-flex">
                      <div style={{ width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 20px rgba(201,162,39,0.2)`, borderRadius: "1.25rem", overflow: "hidden", background: COLORS.white }}>
                        <img src="/assets/pushpam-logo.png" alt="Sri Pushpam College Logo" style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }} />
                      </div>
                      <h3 className="text-white font-serif font-bold text-2xl tracking-tighter">Sri Pushpam College</h3>
                    </div>

                    <div className="space-y-6 mb-10">
                      <p className="text-white/40 text-[13px] leading-loose max-w-xs font-medium">
                        Poondi - 613 503, Thanjavur Dt, Tamil Nadu. <br />
                        Nurturing excellence since 1956.
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-white/40 hover:text-gold transition-colors text-[13px]">
                          <Smartphone className="w-4 h-4 shrink-0" />
                          <span>04374 - 239523</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/40 hover:text-gold transition-colors text-[13px]">
                          <Mail className="w-4 h-4 shrink-0" />
                          <div className="flex flex-col">
                            <span>avvmspc@hotmail.com</span>
                            <span>principal@avvmspc.ac.in</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="flex gap-5">
                      {[Globe, Info, Monitor, Mail].map((Icon, i) => (
                        <div key={i} className="w-12 h-12 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/30 hover:bg-gold hover:text-maroon hover:border-gold transition-all duration-300 cursor-pointer shadow-premium">
                          <Icon className="w-5 h-5" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {["Academic Units", "Institutional Life", "Portal Directory"].map((title, idx) => (
                    <div key={title} className="lg:col-span-1">
                      <h4 className="text-gold font-bold tracking-[0.3em] uppercase text-[10px] mb-12 opacity-80">{title}</h4>
                      <ul className="space-y-5 text-sm">
                        {(idx === 0 ? ["Undergraduate", "Postgraduate", "Research", "Online Learning", "Curriculum"] :
                          idx === 1 ? ["Campus View", "Hostel Life", "Sport Arena", "Culture Hub", "Gallery"] :
                            ["ERP Login", "Admission Portal", "Fee Payment", "Library OPAC", "Alumni Portal"]
                        ).map(item => (
                          <li key={item} className="text-white/40 hover:text-gold transition-all duration-300 cursor-pointer flex items-center gap-3 group/link">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold/0 group-hover:bg-gold transition-all duration-300" />
                            <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
                  <span className="hover:text-white/40 transition-colors">© 2026 A.V.V.M. Sri Pushpam College (Autonomous)</span>
                  <div className="flex gap-12">
                    <span className="hover:text-gold cursor-pointer transition-colors">Compliance Audit</span>
                    <span className="hover:text-gold cursor-pointer transition-colors">Privacy Governance</span>
                    <span className="hover:text-gold cursor-pointer transition-colors">Digital Charter</span>
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="erp"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="min-h-screen bg-dark-bg"
          >
            {!token ? (
              <Login onLogin={handleLogin} />
            ) : (
              <ERP onBack={() => setView("website")} user={user} onLogout={handleLogout} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
