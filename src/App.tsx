import React, { useState, useEffect, useRef } from "react";
import { 
  Globe, 
  Github, 
  Terminal, 
  ArrowUpRight, 
  Lock, 
  CheckCircle2, 
  Database, 
  Mail, 
  User, 
  ExternalLink, 
  MessageSquare, 
  Cpu, 
  Layers, 
  Activity, 
  Check, 
  Copy, 
  Trash2,
  ChevronRight,
  BookOpen,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS, SKILLS, TRANSLATIONS, Project, SkillCategory } from "./data";

interface CommittedMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export default function App() {
  const [lang, setLang] = useState<"en" | "ru">("en");
  const [activeCategory, setActiveCategory] = useState<"all" | "backend" | "automation" | "frontend">("all");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  // Pipeline Simulation States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionStep, setSubmissionStep] = useState("");
  const [submissionProgress, setSubmissionProgress] = useState(0);
  
  // Inbox Local database state
  const [messages, setMessages] = useState<CommittedMessage[]>([]);

  // Directus Dynamic Data States
  const [projectsList, setProjectsList] = useState<Project[]>(PROJECTS);
  const [skillsList, setSkillsList] = useState<SkillCategory[]>(SKILLS);
  const [globals, setGlobals] = useState<{
    profile_photo?: string | null;
    background_photo?: string | null;
  }>({});

  useEffect(() => {
    async function loadDirectusData() {
      try {
        const projectsRes = await fetch("https://sandbox.directus.com/items/projects?sort=sort");
        if (projectsRes.ok) {
          const { data } = await projectsRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjectsList(data);
          }
        }
      } catch (err) {
        console.error("Failed to load projects from Directus:", err);
      }

      try {
        const skillsRes = await fetch("https://sandbox.directus.com/items/skills?sort=sort");
        if (skillsRes.ok) {
          const { data } = await skillsRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setSkillsList(data);
          }
        }
      } catch (err) {
        console.error("Failed to load skills from Directus:", err);
      }

      try {
        const globalsRes = await fetch("https://sandbox.directus.com/items/globals");
        if (globalsRes.ok) {
          const { data } = await globalsRes.json();
          if (data) {
            setGlobals(data);
          }
        }
      } catch (err) {
        console.error("Failed to load globals from Directus:", err);
      }
    }

    loadDirectusData();
  }, []);

  const t = TRANSLATIONS[lang];

  // Load messages on mount
  useEffect(() => {
    const cached = localStorage.getItem("mizgr_inbox_ledger");
    if (cached) {
      try {
        setMessages(JSON.parse(cached));
      } catch (err) {
        console.error("Failed to parse cached message database:", err);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value} = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit via simulated API trigger
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmissionSuccess(false);
    setSubmissionProgress(15);
    
    // Smooth user guidance steps (non-geeky)
    const steps = [
      {
        text: lang === "en" ? "Establishing connection..." : "Установка соединения...",
        progress: 40
      },
      {
        text: lang === "en" ? "Processing contact details..." : "Обработка контактных данных...",
        progress: 75
      },
      {
        text: lang === "en" ? "Finalizing secure transmission..." : "Завершение отправки...",
        progress: 100
      }
    ];

    for (let i = 0; i < steps.length; i++) {
      setSubmissionStep(steps[i].text);
      // Smooth visual progression
      const startProg = i === 0 ? 15 : steps[i - 1].progress;
      const targetProg = steps[i].progress;
      for (let p = startProg; p <= targetProg; p += 5) {
        setSubmissionProgress(p);
        await new Promise(resolve => setTimeout(resolve, 60));
      }
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    const newMessage: CommittedMessage = {
      id: "MSG-" + Math.floor(1000 + Math.random() * 9000),
      name: formData.name,
      email: formData.email,
      subject: formData.subject || (lang === "en" ? "General Work Query" : "Общий запрос работы"),
      message: formData.message,
      timestamp: new Date().toLocaleTimeString() + " | " + new Date().toLocaleDateString()
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem("mizgr_inbox_ledger", JSON.stringify(updated));

    setIsSubmitting(false);
    setSubmissionSuccess(true);
    setSubmissionStep("");
    setSubmissionProgress(0);
    
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });

    setTimeout(() => {
      setSubmissionSuccess(false);
    }, 5000);
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem("mizgr_inbox_ledger", JSON.stringify(updated));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Filter projects dynamically based on tabs
  const filteredProjects = activeCategory === "all" 
    ? projectsList 
    : projectsList.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#070709] text-[#E4E4E7] relative selection:bg-white selection:text-black font-sans leading-relaxed overflow-x-hidden antialiased">
      
      {/* MONUMENTAL MINIMAL FIXED ARCHITECTURAL BACKGROUND PHOTO */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center transition-all duration-1000 pointer-events-none opacity-[0.14] grayscale mix-blend-lighten"
        style={{ 
          backgroundImage: `url('${
            globals.background_photo 
              ? `https://sandbox.directus.com/assets/${globals.background_photo}` 
              : "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=2400&q=80"
          }')` 
        }}
      />
      
      {/* SOPHISTICATED NO-MOCK SHADOW GRADIENTS */}
      <div className="fixed inset-0 z-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/50 pointer-events-none" />

      {/* HEADER: CLEAN MODERN NAVIGATION */}
      <header className="sticky top-0 z-50 w-full bg-[#070709]/80 backdrop-blur-md border-b border-zinc-900 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-white text-black p-1 px-3 font-mono font-black text-xs tracking-[0.2em] flex items-center gap-2">
              <span>{globals.title || "MIZGR"}</span>
            </div>
            <span className="hidden sm:inline-block h-4 w-[1px] bg-zinc-800"></span>
            <span className="hidden sm:inline-block text-[10px] text-zinc-500 tracking-wider uppercase font-medium">
              {lang === "en" ? (globals.role_en || "Backend & Automation Engineering") : (globals.role_ru || "Бэкенд-разработка и Автоматизация")}
            </span>
          </div>

          {/* Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-zinc-400">
            <a href="#work" className="hover:text-white transition-colors">{t.navProjects}</a>
            <a href="#expertise" className="hover:text-white transition-colors">{t.navSkills}</a>
            <a href="#contact" className="hover:text-white transition-colors">{t.navContact}</a>
          </nav>

          {/* Bilingual Switcher */}
          <div className="flex items-center gap-4">
            <div className="flex bg-zinc-950 border border-zinc-800 p-0.5 rounded text-[11px] font-bold select-none">
              <button 
                onClick={() => setLang("en")} 
                className={`px-3 py-1 rounded-sm tracking-wider transition-all cursor-pointer ${lang === "en" ? "bg-white text-black font-extrabold" : "text-zinc-500 hover:text-white"}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang("ru")} 
                className={`px-3 py-1 rounded-sm tracking-wider transition-all cursor-pointer ${lang === "ru" ? "bg-white text-black font-extrabold" : "text-zinc-500 hover:text-white"}`}
              >
                RU
              </button>
            </div>

            <a 
              href="#contact" 
              className="px-4 py-2 bg-white text-black hover:bg-zinc-200 font-bold text-xs tracking-wider uppercase transition-colors rounded-sm shadow-md"
            >
              {t.contactMe}
            </a>
          </div>

        </div>
      </header>

      {/* HERO SECTION: MODERN & BALANCED (NOT GEEKY) */}
      <section className="pt-12 pb-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: THE MONUMENTAL PHOTO FRAME (THE SPECIFIED USER PHOTO) */}
          <div className="lg:col-span-5 relative">
            <div className="border border-zinc-800 p-3 bg-zinc-950/40 rounded-sm overflow-hidden backdrop-blur-sm shadow-xl">
              <div className="relative group overflow-hidden border border-zinc-800 rounded-sm aspect-[4/5] bg-zinc-950">
                <img 
                  src={
                    globals.profile_photo 
                      ? `https://sandbox.directus.com/assets/${globals.profile_photo}` 
                      : "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80"
                  } 
                  alt="Mizgr Monumental Brutalist Concrete Structural Slabs" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-95 contrast-125 transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Visual Label overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#070709] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between">
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest font-mono text-zinc-400">
                      REPRESENTATIVE WORK
                    </span>
                    <span className="block text-xs font-black text-white mt-1 uppercase tracking-widest">
                      BERLIN MEMORIAL GRID
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-450 border border-zinc-800 bg-zinc-900/85 px-2 py-0.5 font-mono">
                    2026.SYS
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PROFESSIONAL HUMAN OVERVIEW */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            <div className="inline-flex self-start items-center gap-2 bg-zinc-900 border border-zinc-800 text-[#E4E4E7] px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded">
              <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span>AVAILABLE FOR OFFERS</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-white leading-tight">
             {globals.title || "MIZG"}
            </h1>

            <p className="font-mono text-xs md:text-sm text-zinc-400 tracking-wider uppercase font-semibold border-l-2 border-white pl-3.5">
              {lang === "en" ? (globals.role_en || t.role) : (globals.role_ru || t.role)}
            </p>

            <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans max-w-xl">
              {lang === "en" ? (globals.about_en || t.shortAbout) : (globals.about_ru || t.shortAbout)}
            </p>

            <blockquote className="border-l-4 border-zinc-700 pl-4 py-1.5 text-zinc-400 text-xs italic bg-zinc-950/20 max-w-lg">
              "{lang === "en" ? (globals.quote_en || t.quoteText) : (globals.quote_ru || t.quoteText)}"
            </blockquote>

            {/* Direct Social Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 max-w-lg">
              
              <a 
                href={globals.telegram_link || "https://t.me/Mizgtelegram"} 
                target="_blank" 
                rel="noreferrer" 
                className="bg-zinc-950/85 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-500 p-4 rounded-sm flex items-center justify-between text-zinc-300 hover:text-white transition-all duration-300 group shadow-lg"
              >
                <div>
                  <span className="block text-[9px] text-zinc-500 font-bold tracking-widest uppercase transition-colors group-hover:text-zinc-400">TELEGRAM CHANNEL</span>
                  <span className="block text-xs font-bold mt-1">
                    {globals.telegram_link ? `@${globals.telegram_link.split("/").pop()}` : "@Mizgtelegram"}
                  </span>
                </div>
                <ArrowUpRight size={16} className="text-zinc-650 group-hover:transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-zinc-500 group-hover:text-white" />
              </a>

              <a 
                href={globals.github_link || "https://github.com/Mizgr"} 
                target="_blank" 
                rel="noreferrer" 
                className="bg-zinc-950/85 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-500 p-4 rounded-sm flex items-center justify-between text-zinc-300 hover:text-white transition-all duration-300 group shadow-lg"
              >
                <div>
                  <span className="block text-[9px] text-zinc-500 font-bold tracking-widest uppercase transition-colors group-hover:text-zinc-400">GITHUB CODEBASE</span>
                  <span className="block text-xs font-bold mt-1">
                    {globals.github_link ? globals.github_link.replace("https://", "").replace("http://", "") : "github.com/Mizgr"}
                  </span>
                </div>
                <ArrowUpRight size={16} className="text-zinc-650 group-hover:transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-zinc-500 group-hover:text-white" />
              </a>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 1: WORK PORTFOLIO (NO IDE WORKSPACE TREE) */}
      <section id="work" className="py-20 border-t border-zinc-900 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        
        {/* Title metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-[10px] text-zinc-500 font-mono font-bold tracking-widest uppercase">
              // RECENT DEPLOYMENTS
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl">
              {t.projectsHeader}
            </h2>
            <p className="text-xs text-zinc-450 font-sans max-w-md">
              {t.projectsSub}
            </p>
          </div>

          {/* Simple Tab-category Filter Options */}
          <div className="flex flex-wrap bg-zinc-950 border border-zinc-850 p-1 rounded-md text-xs select-none">
            <button 
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded font-bold transition-all cursor-pointer ${activeCategory === "all" ? "bg-white text-black shadow-md" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              {t.filterAll}
            </button>
            <button 
              onClick={() => setActiveCategory("backend")}
              className={`px-4 py-2 rounded font-bold transition-all cursor-pointer ${activeCategory === "backend" ? "bg-white text-black shadow-md" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              {t.filterBackend}
            </button>
            <button 
              onClick={() => setActiveCategory("automation")}
              className={`px-4 py-2 rounded font-bold transition-all cursor-pointer ${activeCategory === "automation" ? "bg-white text-black shadow-md" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              {t.filterAutomation}
            </button>
            <button 
              onClick={() => setActiveCategory("frontend")}
              className={`px-4 py-2 rounded font-bold transition-all cursor-pointer ${activeCategory === "frontend" ? "bg-white text-black shadow-md" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              {t.filterFrontend}
            </button>
          </div>
        </div>

        {/* Dynamic Project Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-[#0b0c0f] border border-zinc-850 rounded-sm p-6 flex flex-col justify-between shadow-lg hover:border-zinc-650 transition-colors relative group"
              >
                <div>
                  
                  {/* Card category tags */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[9px] px-2.5 py-1 font-mono uppercase rounded-sm font-semibold">
                      {project.category}
                    </span>
                    <span className="text-[10px] text-zinc-600 font-mono">SYS_LOC_V: {project.id}</span>
                  </div>

                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2 leading-none">
                    {lang === "en" ? project.titleEn : project.titleRu}
                  </h3>

                  <p className="text-zinc-450 text-xs mt-3 mb-5 font-sans leading-relaxed">
                    {lang === "en" ? project.descEn : project.descRu}
                  </p>

                  {/* Bullet Spec highlights */}
                  <div className="space-y-3.5 mb-6 border-t border-zinc-900 pt-5">
                    {(lang === "en" ? project.detailsEn : project.detailsRu).map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 font-sans text-xs text-zinc-300 leading-normal">
                        <ChevronRight size={14} className="text-zinc-500 mt-0.5 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                </div>

                <div>
                  
                  {/* Modern clean tech pill metrics */}
                  <div className="flex flex-wrap gap-1.5 mb-5 select-none">
                    {project.tags.map(tag => (
                      <span key={tag} className="bg-zinc-950 border border-zinc-900 rounded-sm px-2 py-0.5 text-[9px] text-zinc-400 font-medium font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Direct Launch Buttons (Clean, non-geeky) */}
                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-900">
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-white text-black hover:bg-zinc-200 text-[11px] font-bold uppercase transition-all rounded flex items-center gap-1.5 shadow"
                      >
                        <Globe size={11} />
                        <span>{t.linkText}</span>
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white text-[11px] font-bold uppercase transition-all rounded flex items-center gap-1.5 bg-zinc-950/30"
                      >
                        <Github size={11} />
                        <span>{t.repoText}</span>
                      </a>
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>

      {/* SECTION 2: EXPERTISE SECTION (RESTYLED WITHOUT BLINKING SHELL TERMINALS) */}
      <section id="expertise" className="py-20 bg-zinc-950/40 border-t border-zinc-900 px-4 md:px-8 max-w-7xl mx-auto relative z-10 rounded-sm backdrop-blur-sm">
        
        {/* Title Header */}
        <div className="space-y-2 mb-12">
          <span className="text-[10px] text-zinc-500 font-mono font-bold tracking-widest uppercase">
            // FIELD PROFICIENCIES
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl">
            {t.stackHeader}
          </h2>
          <p className="text-xs text-zinc-450 font-sans max-w-lg">
            {t.stackSub}
          </p>
        </div>

        {/* 2X2 Sleek Clean Skills Grid (Super scannable) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsList.map((category) => (
            <div 
              key={category.id}
              className="bg-[#0b0c0f] border border-zinc-900 rounded p-6 shadow-md hover:border-zinc-800 transition-colors"
            >
              
              {/* Category label */}
              <div className="flex items-center gap-3 border-b border-zinc-900 pb-4 mb-5">
                <div className="p-1 px-2.5 bg-zinc-900 border border-zinc-800 rounded font-mono text-[10px] text-white">
                  {category.id.toUpperCase()}
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  {lang === "en" ? category.titleEn : category.titleRu}
                </h3>
              </div>

              {/* Skills proficiencies listing */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-300 font-semibold">{skill.name}</span>
                      <span className="text-zinc-500 text-[10px] font-mono">{skill.level}%</span>
                    </div>

                    <div className="h-4 bg-zinc-950 border border-zinc-900 rounded-sm relative overflow-hidden flex items-center p-0.5">
                      <div 
                        className="h-full bg-white transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                      {skill.info && (
                        <span className="absolute right-3.5 text-[9px] text-zinc-500 truncate max-w-[80%] font-medium uppercase tracking-wider">
                          {skill.info}
                        </span>
                      )}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* SECTION 3: DIRECT CONTACT MODULE (CLEAN & NON-GEEKY) */}
      <section id="contact" className="py-20 border-t border-zinc-900 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT side: CONTACT FORM CARD */}
          <div className="lg:col-span-7 bg-[#0b0c0f] border border-zinc-850 p-6 md:p-8 rounded-sm shadow-xl relative">
            
            <div className="flex items-center gap-3 mb-4">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                {t.contactHeader}
              </h3>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-sans">
              {t.contactSub}
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* YOUR NAME */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                    {t.formName}
                  </label>
                  <input 
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Maksim Orлов"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#070709] border border-zinc-850 px-4 py-3 rounded-sm text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>

                {/* YOUR EMAIL */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                    {t.formEmail}
                  </label>
                  <input 
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. contact@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#070709] border border-zinc-850 px-4 py-3 rounded-sm text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>

              </div>

              {/* SUBJECT */}
              <div className="space-y-1.5">
                <label className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  {t.formSubject}
                </label>
                <input 
                  type="text"
                  name="subject"
                  placeholder="e.g. Python Backend & Crawlers automation query"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-[#070709] border border-zinc-850 px-4 py-3 rounded-sm text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors"
                />
              </div>

              {/* MESSAGE */}
              <div className="space-y-1.5">
                <label className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  {t.formMessage}
                </label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project, target metrics, or system challenges..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-[#070709] border border-zinc-850 px-4 py-3 rounded-sm text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                />
              </div>

              {/* Elegant Minimalist Progress Loader */}
              <AnimatePresence>
                {isSubmitting && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 mt-2 overflow-hidden"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2 text-zinc-400 font-sans tracking-wide">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        <span>{submissionStep}</span>
                      </div>
                      <span className="text-white font-mono text-[10px] font-bold">
                        {submissionProgress}%
                      </span>
                    </div>

                    <div className="h-2 bg-zinc-950 border border-zinc-900 rounded-sm overflow-hidden flex items-center p-0.5 relative">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: `${submissionProgress}%` }}
                        transition={{ duration: 0.1 }}
                        className="h-full bg-white rounded-sm shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success output layout */}
              <AnimatePresence>
                {submissionSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#070709] border border-zinc-800 p-4 rounded-sm flex items-start gap-3 select-all"
                  >
                    <CheckCircle2 size={16} className="text-white mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-xs text-white uppercase tracking-wider">
                        {t.formSuccessTitle}
                      </h4>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-normal font-sans">
                        {t.formSuccessDesc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Action */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-white text-black font-bold hover:bg-zinc-200 hover:text-black hover:scale-[1.01] text-xs tracking-wider uppercase transition-all duration-300 disabled:opacity-50 select-none flex items-center justify-center gap-2 rounded-sm cursor-pointer shadow"
              >
                {isSubmitting ? (
                  <span>{t.formSubmitting}</span>
                ) : (
                  <>
                    <span>{t.formSubmit}</span>
                  </>
                )}
              </button>

            </form>

          </div>

          {/* RIGHT side: DIRECT TELEPHONY CHANNELS */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#0b0c0f] border border-zinc-850 p-6 rounded shadow-xl">
              <h4 className="font-bold text-xs text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-3 mb-4">
                {t.contactMethodHeader}
              </h4>

              <div className="space-y-4">
                
                {/* Telegram access channel */}
                <a 
                  href={globals.telegram_link || "https://t.me/Mizgtelegram"}
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-[#070709] border border-zinc-900 rounded hover:border-zinc-500 transition-all group shadow"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] text-zinc-500 group-hover:text-white uppercase">TG</span>
                    <div>
                      <span className="block text-[9px] text-zinc-500 uppercase tracking-widest font-mono">Maksim Mizgr chat</span>
                      <span className="block text-xs text-white font-bold mt-0.5">{t.telegramTitle}</span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-650 group-hover:text-white transition-colors" />
                </a>

                {/* Github direct */}
                <a 
                  href={globals.github_link || "https://github.com/Mizgr"}
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-[#070709] border border-zinc-900 rounded hover:border-zinc-500 transition-all group shadow"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] text-zinc-500 group-hover:text-white uppercase">GH</span>
                    <div>
                      <span className="block text-[9px] text-zinc-500 uppercase tracking-widest font-mono">github.com/Mizgr</span>
                      <span className="block text-xs text-white font-bold mt-0.5">{t.githubTitle}</span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-650 group-hover:text-white transition-colors" />
                </a>

              </div>
            </div>

            {/* Direct transmission policy info */}
            <div className="bg-[#0b0c0f]/60 border border-zinc-900 p-4 rounded text-zinc-500 space-y-2">
              <div className="flex items-center gap-2 text-zinc-400">
                <Lock size={12} />
                <span className="font-semibold uppercase text-[9px] tracking-wider">PRIVACY SECURE</span>
              </div>
              <p className="text-[10px] leading-relaxed">
                Your message is stored securely inside a transient ledger storage. Live databases route contacts safely into direct messaging queues. No public cookies or cross trackers are kept.
              </p>
            </div>

          </div>

        </div>

        {/* DEMO PERSISTENT REPLICATED LEDGER METRIC */}
        <div id="local-messages-ledger" className="mt-12 bg-[#0b0c0f] border border-zinc-850 p-6 md:p-8 rounded-sm shadow-xl relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-900 pb-4 mb-6 gap-4">
            <div>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <Database size={14} className="text-zinc-400" />
                <span>{t.sentMessagesTitle}</span>
              </h3>
              <p className="text-zinc-400 text-[11px] font-sans mt-1 leading-normal max-w-2xl">
                {t.sentMessagesSubtitle}
              </p>
            </div>

            <span className="bg-[#070709] border border-zinc-900 px-3 py-1 font-mono text-[10px] text-zinc-500 rounded font-semibold uppercase">
              LOCAL_DB_STORE.records: {messages.length}
            </span>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-zinc-900 rounded bg-[#070709]/40 text-zinc-600 italic text-xs select-none">
              {t.ledgerEmpty}
            </div>
          ) : (
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
              {messages.map((msg, index) => (
                <div 
                  key={msg.id} 
                  className="p-4 bg-[#070709] border border-zinc-900 hover:border-zinc-600 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors select-all"
                >
                  <div className="flex-1 space-y-2 w-full">
                    {/* Record metadata */}
                    <div className="flex flex-wrap items-center gap-2 border-b border-zinc-900 pb-1.5 md:pb-2 text-[10px]">
                      <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-white font-mono rounded-sm font-bold uppercase tracking-wider">
                        MESSAGE #{messages.length - index}
                      </span>
                      <span className="text-zinc-700">|</span>
                      <span className="text-[11px] text-zinc-200 font-bold uppercase">{msg.name}</span>
                      <span className="text-zinc-700">|</span>
                      <span className="text-zinc-500 text-[10px] break-all">{msg.email}</span>
                    </div>

                    <div className="text-white font-bold text-xs uppercase tracking-wide">
                      <span className="text-zinc-500 font-mono text-[10px] mr-2">SUBJECT:</span> {msg.subject}
                    </div>

                    {/* Message contents */}
                    <div className="p-3 bg-zinc-950/60 border border-zinc-900 rounded font-sans text-xs text-zinc-300 leading-relaxed italic whitespace-pre-wrap select-all">
                      "{msg.message}"
                    </div>
                  </div>

                  {/* Actions & Timestamp details */}
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto border-t md:border-t-0 border-zinc-900 pt-3 md:pt-0 gap-3">
                    <div className="text-right">
                      <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-widest">SUBMITTED_AT</span>
                      <span className="block font-mono text-[10px] text-zinc-400 mt-0.5 whitespace-nowrap">
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Deletion control */}
                    <button 
                      onClick={() => deleteMessage(msg.id)}
                      className="p-2 text-zinc-650 hover:text-white border border-zinc-900 bg-zinc-950 hover:border-white rounded cursor-pointer transition-colors"
                      title="Delete local logged message"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#040405] border-t border-zinc-900 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col gap-2 max-w-md text-center md:text-left">
            <p className="font-mono text-white font-black text-xs tracking-[0.25em] uppercase">
              {globals.title || "MIZGR"} PORTFOLIO
            </p>
            <p className="font-sans text-[10px] text-zinc-500 leading-normal tracking-wide uppercase font-semibold">
              {lang === "en" ? (globals.footer_en || t.footerText) : (globals.footer_ru || t.footerText)}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 text-[10px] text-zinc-500">
            <div className="flex items-center gap-4 uppercase font-bold tracking-widest font-mono">
              <a href={globals.github_link || "https://github.com/Mizgr"} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GITHUB</a>
              <span>•</span>
              <a href={globals.telegram_link || "https://t.me/Mizgtelegram"} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">TELEGRAM</a>
            </div>
            
            <div className="font-mono text-zinc-700 tracking-wider text-[9px] select-none uppercase font-semibold">
              STATUS: STABLE_V2.0 // © 2026 {globals.title || "MIZGR"}
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
