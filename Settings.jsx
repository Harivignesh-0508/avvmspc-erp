import React from "react";
import { Settings as SettingsIcon, Bell, Lock, Globe, Monitor } from "lucide-react";

const Settings = () => (
  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
    <div className="flex justify-between items-end mb-8">
      <div>
        <h3 className="text-2xl font-serif font-bold text-white mb-1">System Configuration</h3>
        <p className="text-white/40 text-sm">Managing institutional ERP preferences & security protocols</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        { label: "Notification Centre", sub: "Configure real-time mobile & email alerts", Icon: Bell },
        { label: "Cyber Security", sub: "Two-factor authentication & password policies", Icon: Lock },
        { label: "Institutional Portal", sub: "Domain management & public website sync", Icon: Globe },
        { label: "System Appearance", sub: "Institutional primary colors & dark mode configs", Icon: Monitor },
      ].map(mod => (
        <div key={mod.label} className="bg-dark-card border border-dark-border rounded-[2rem] p-8 shadow-2xl relative overflow-hidden hover:border-gold/30 transition-all cursor-pointer group">
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-white/5 text-white/40 group-hover:text-gold transition-colors">
              <mod.Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-serif font-bold text-white group-hover:text-gold transition-colors">{mod.label}</div>
              <div className="text-white/30 text-xs font-bold uppercase tracking-widest mt-1">{mod.sub}</div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/20 group-hover:text-gold/50 transition-colors">Configuration Portal</span>
            <button className="text-[10px] text-white bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:bg-gold hover:text-maroon transition-all font-black uppercase tracking-widest">Adjust</button>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-dark-card border border-dark-border rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full -mr-32 -mt-32" />
      <h4 className="text-xl font-serif font-bold text-white mb-8 border-b border-white/5 pb-4">Version & Lifecycle Information</h4>
      <div className="space-y-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/40">Pushpam ERP Core Engine</span>
          <span className="text-gold font-bold">v1.2.0 (Stable Release)</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/40">Database Architecture</span>
          <span className="text-white/60">MongoDB Cluster 7.0.2</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/40">Last System Integrity Audit</span>
          <span className="text-green-500 font-bold">Passed (2 hours ago)</span>
        </div>
      </div>
      <button className="w-full mt-10 py-5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-gold transition-all duration-300">
        Check for System Updates
      </button>
    </div>
  </div>
);

export default Settings;
