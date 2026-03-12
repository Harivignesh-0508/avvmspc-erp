import React from "react";
import { Search, BookOpen, Clock, Library as LibraryIcon } from "lucide-react";

const Library = () => (
  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
    <div className="flex justify-between items-end mb-8">
      <div>
        <h3 className="text-2xl font-serif font-bold text-white mb-1">Central Library OPAC</h3>
        <p className="text-white/40 text-sm">Institutional repository & digital catalog tracking</p>
      </div>
      <div className="flex gap-4">
        <div className="px-6 py-3 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-4 shadow-xl">
          <LibraryIcon className="w-5 h-5 text-gold" />
          <div>
            <div className="text-[10px] text-white/30 uppercase font-black tracking-widest leading-none mb-1">Total Collection</div>
            <div className="text-xl font-mono text-white leading-none font-bold">18,420</div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-8 bg-dark-card border border-dark-border rounded-[2.5rem] p-10 shadow-2xl">
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
          <h4 className="text-xl font-serif font-bold text-white">Institutional Catalog</h4>
          <div className="flex items-center gap-4 bg-dark-bg/50 border border-dark-border rounded-xl px-5 py-2.5">
            <Search className="w-4 h-4 text-white/20" />
            <input type="text" placeholder="Find books, journals, theses..." className="bg-transparent text-sm focus:outline-none w-64 text-white/60" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Quantum Mechanics", author: "Griffiths", copies: 12, dept: "Physics" },
            { title: "Advanced Data Structures", author: "Sartaj Sahni", copies: 8, dept: "CS" },
            { title: "Industrial Chemistry", author: "B.K. Sharma", copies: 5, dept: "Chemistry" },
            { title: "Macro Economics", author: "N. Gregory Mankiw", copies: 15, dept: "Economics" },
          ].map((book, i) => (
            <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-gold/30 transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold group-hover:text-gold transition-colors">{book.title}</div>
                  <div className="text-[10px] text-white/30 uppercase font-black tracking-widest mt-0.5">{book.author}</div>
                </div>
              </div>
              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mt-6">
                <span className="text-white/20">{book.dept}</span>
                <span className="text-gold">{book.copies} Copies Available</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 bg-dark-card border border-dark-border rounded-[2.5rem] p-10 shadow-2xl">
        <h4 className="text-xl font-serif font-bold text-white mb-8 border-b border-white/5 pb-4">Due Returns</h4>
        <div className="space-y-6">
          {[
            { student: "Anitha R", book: "Algorithms CLRS", days: 3 },
            { student: "Vignesh K", book: "Digital Logic Design", days: 1 },
            { student: "Rahul S", book: "Java Programming", days: 5 },
          ].map((item, i) => (
            <div key={i} className="flex gap-6 p-4 hover:bg-white/5 rounded-2xl transition-all group border border-transparent hover:border-white/5">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-white group-hover:text-red-500 transition-colors cursor-pointer">{item.book}</div>
                <div className="text-[10px] text-white/30 font-black uppercase tracking-[0.1em] mt-1">{item.student} • {item.days} Days Late</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Library;
