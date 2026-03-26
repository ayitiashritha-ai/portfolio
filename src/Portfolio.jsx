import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CodingRobot = () => (
  <motion.div
    animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
    className="w-20 h-20 lg:w-24 lg:h-24 text-amber-500/80 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]"
  >
    <svg viewBox="0 0 100 100" fill="currentColor">
      {/* Antenna */}
      <path d="M50 15 L50 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <motion.circle animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} cx="50" cy="5" r="3" fill="#fff" />

      {/* Head */}
      <rect x="30" y="20" width="40" height="30" rx="8" fill="#1f1f1f" stroke="currentColor" strokeWidth="2" />
      {/* Glowing Eyes */}
      <motion.circle animate={{ scaleY: [1, 0.1, 1], opacity: [1, 0.7, 1] }} transition={{ repeat: Infinity, duration: 4, repeatDelay: 0.5 }} cx="42" cy="32" r="4" fill="currentColor" />
      <motion.circle animate={{ scaleY: [1, 0.1, 1], opacity: [1, 0.7, 1] }} transition={{ repeat: Infinity, duration: 4, repeatDelay: 0.5 }} cx="58" cy="32" r="4" fill="currentColor" />
      {/* Mouth */}
      <rect x="42" y="42" width="16" height="3" rx="1.5" fill="#333" />

      {/* Body */}
      <path d="M35 55 L65 55 L70 85 L30 85 Z" fill="#1f1f1f" stroke="currentColor" strokeWidth="2" />
      {/* Chest Screen */}
      <rect x="42" y="62" width="16" height="12" rx="2" fill="#000" />
      <motion.path
        animate={{ strokeDashoffset: [20, 0, 20] }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        d="M45 68 L50 64 L55 70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20" strokeLinecap="round"
      />

      {/* Floating Laptop */}
      <motion.polygon
        animate={{ y: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        points="15,85 85,85 75,70 25,70" fill="#2a2a2a" stroke="#444" strokeWidth="1.5"
      />
      <motion.rect
        animate={{ y: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        x="25" y="65" width="50" height="5" fill="#111"
      />

      {/* Coding Arms */}
      <motion.path
        animate={{ d: ["M 30 65 Q 20 75 30 82", "M 30 65 Q 25 78 40 82", "M 30 65 Q 20 75 30 82"] }}
        transition={{ repeat: Infinity, duration: 0.4 }}
        fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
      />
      <motion.path
        animate={{ d: ["M 70 65 Q 80 75 70 82", "M 70 65 Q 75 78 60 82", "M 70 65 Q 80 75 70 82"] }}
        transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
        fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
      />
    </svg>
  </motion.div>
);

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isResumeUnlocked, setIsResumeUnlocked] = useState(false);
  const aboutCode = `profile = {
    "name": "Ayiti Ashritha",
    "role": "Frontend Developer & AI/ML Engineer",
    "location": "India",
    "education": "B.Tech CSE (AI & ML)",
    "focus": ["React", "Machine Learning", "Intelligent Systems"],
    "open_to": ["Internships", "Junior Roles", "Collaborations"],
    "leadership": "Captain, Women's Kabaddi Team"
}

print("Building real-world products with code, design, and AI.")
`;
  const [typedAboutCode, setTypedAboutCode] = useState("");

  const navItems = [
    { name: "HOME", id: "home" },
    { name: "ABOUT", id: "about" },
    { name: "SKILLS", id: "skills" },
    { name: "EXPERIENCE", id: "experience" },
    { name: "PROJECTS", id: "projects" },
    { name: "CERTIFICATES", id: "certificates" },
    { name: "ACHIEVEMENTS", id: "achievements" },
    { name: "EDUCATION", id: "education" },
    { name: "RESUME", id: "resume" },
    { name: "CONTACT", id: "contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId;

    const typeNext = () => {
      currentIndex += 1;
      setTypedAboutCode(aboutCode.slice(0, currentIndex));

      if (currentIndex < aboutCode.length) {
        const nextChar = aboutCode[currentIndex];
        const delay = nextChar === "\n" ? 70 : 22;
        timeoutId = window.setTimeout(typeNext, delay);
      }
    };

    timeoutId = window.setTimeout(typeNext, 250);

    return () => window.clearTimeout(timeoutId);
  }, [aboutCode]);

  return (
    <div className="flex bg-transparent text-gray-300 font-sans min-h-screen selection:bg-amber-500 selection:text-black">

      {/* --- Sidebar --- */}
      <aside className="fixed hidden xl:flex w-[280px] h-screen bg-[#050b14]/44 backdrop-blur-md border-r border-cyan-500/10 flex-col justify-between z-50">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-10 h-10 bg-[#121212] border border-zinc-800 flex items-center justify-center rounded shadow-lg overflow-hidden">
              <img src="/profile.jpeg" alt="Ayiti Ashritha" className="w-full h-full object-cover transition-all" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg tracking-wider uppercase leading-tight">Ayiti<br />Ashritha</h1>
              <p className="text-zinc-500 text-[10px] tracking-[0.2em] mt-1">PORTFOLIO</p>
            </div>
          </div>

          <p className="text-zinc-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 ml-4">Explore</p>
          <nav className="space-y-1">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={`#${item.id}`}
                className={`flex items-center text-[11px] font-bold tracking-[0.2em] uppercase py-3 px-4 transition-all ${activeSection === item.id
                  ? "text-amber-500 bg-gradient-to-r from-amber-500/10 to-transparent border-l-2 border-amber-500"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/50 border-l-2 border-transparent"
                  }`}
              >
                <span className="mr-4 w-4 text-right opacity-50">{i + 1}.</span> {item.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="p-8 border-t border-zinc-900">
          <h3 className="text-white font-black text-sm uppercase tracking-wider leading-tight mb-3">Open to Internships & Roles</h3>
          <p className="text-zinc-500 text-[10px] tracking-[0.1em] uppercase leading-relaxed">Frontend, React, ML</p>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 xl:ml-[280px] w-full min-h-screen relative pb-24">

        {/* Mobile Header */}
        <div className="xl:hidden sticky top-0 z-50 bg-[#050b14]/38 backdrop-blur-xl border-b border-cyan-500/10 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#121212] border border-zinc-800 flex items-center justify-center rounded overflow-hidden">
              <img src="/profile.jpeg" alt="Ayiti Ashritha" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-white font-bold text-sm tracking-widest uppercase">Ayiti Ashritha</h1>
          </div>
          <a href="#resume" className="border border-amber-500/50 text-amber-500 hover:bg-amber-500/10 px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded transition-colors">
            Resume
          </a>
        </div>

        {/* Desktop Sticky Header */}
        <header className="hidden xl:flex sticky top-0 z-40 bg-[#050b14]/36 backdrop-blur-md border-b border-cyan-500/10 px-12 py-6 justify-between items-center">
          <div>
            <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Personal Portfolio</p>
            <h2 className="text-white font-black text-xl uppercase tracking-widest">Ayiti Ashritha</h2>
          </div>
          <a href="#resume" className="border border-amber-500/50 text-amber-500 hover:bg-amber-500/10 hover:text-amber-400 px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-colors rounded">
            Resume
          </a>
        </header>

        <div className="p-6 md:p-12 lg:px-20 max-w-7xl mx-auto space-y-12">

          {/* ================= HOME / LANDING SECTION ================= */}
          <section id="home" className="scroll-mt-32 pt-10 lg:min-h-[75vh] flex items-center relative">
            <div className="bg-[#07111d]/28 backdrop-blur-sm border border-cyan-500/12 rounded-2xl p-8 lg:p-16 w-full relative overflow-hidden group shadow-[0_0_40px_rgba(0,245,255,0.05)]">
              <div className="flex flex-col-reverse lg:flex-row gap-12 items-center justify-between relative z-10">
                <div className="flex-1 relative">
                  <div className="absolute -top-16 right-4 sm:-right-8 lg:-top-16 lg:-right-4 xl:-right-12 pointer-events-none z-20">
                    <CodingRobot />
                  </div>
                  <p className="text-amber-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Frontend Developer & AI/ML Engineer</p>
                  <h1 className="text-white text-5xl lg:text-7xl font-black uppercase tracking-tight mb-6 leading-none">Ayiti<br />Ashritha</h1>
                  <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-10">
                    A Computer Science student specializing in AI and Machine Learning. I build real-world intelligent systems and beautiful frontend interfaces.
                  </p>

                  <div className="flex flex-wrap gap-4 mb-10">
                    <a href="/resume_locked_123.pdf" download="Ayiti_Ashritha_Resume.pdf" className="bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-lg font-bold text-xs tracking-widest uppercase transition-colors shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                      Download CV
                    </a>
                    <a href="#projects" className="border border-zinc-700 hover:bg-zinc-800 text-white px-8 py-4 rounded-lg font-bold text-xs tracking-widest uppercase transition-colors">
                      View My Work
                    </a>
                  </div>

                  {/* Social Icons */}
                  <div className="flex gap-6 items-center">
                    <a href="https://www.linkedin.com/in/ashritha-ayiti-39230a297/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-amber-500 transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                    </a>
                    <a href="https://github.com/ashrithaayiti18" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-amber-500 transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0 .1-3.7s-1.2-.5-3.9 1.5a13.4 13.4 0 0 0-7 0C6.2 3.3 5 3.8 5 3.8a5.5 5.5 0 0 0 .1 3.7A5.5 5.5 0 0 0 3.6 11c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" /><path d="M3.9 19c4.2-1.2 4.2-2.5 4.2-2.5" /></svg>
                    </a>
                    <a href="mailto:ayitiashritha@gmail.com" className="text-zinc-500 hover:text-amber-500 transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                    </a>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-center gap-6">
                  <div className="w-40 h-40 lg:w-56 lg:h-56 rounded-full border-2 border-cyan-500/20 overflow-hidden shadow-2xl relative group-hover:border-cyan-400/40 transition-colors">
                    <img src="/profile.jpeg" alt="Ayiti Ashritha" className="w-full h-full object-cover transition-all duration-700" />
                    <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  </div>
                  <div className="flex items-center justify-center p-3 rounded-full bg-[#07111d]/18 border border-cyan-500/12 backdrop-blur-sm">
                    <CodingRobot />
                  </div>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            </div>
          </section>

          {/* ================= ABOUT SECTION ================= */}
          <section id="about" className="scroll-mt-32">
            <div className="bg-[#07111d]/24 backdrop-blur-sm border border-cyan-500/12 rounded-2xl p-8 lg:p-16 shadow-[0_0_28px_rgba(0,245,255,0.04)]">
              <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">About Me</p>
              <h2 className="text-white text-3xl font-black uppercase tracking-tight mb-8">My Journey</h2>
              <div className="max-w-4xl rounded-2xl border border-cyan-500/14 bg-[#08111b]/48 overflow-hidden shadow-[0_0_30px_rgba(0,245,255,0.05)]">
                <div className="flex items-center justify-between px-5 py-3 border-b border-cyan-500/10 bg-[#050c14]/55">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80"></span>
                  </div>
                  <p className="text-cyan-200/70 text-[10px] font-bold tracking-[0.25em] uppercase">about_me.py</p>
                </div>
                <pre className="overflow-x-auto p-5 lg:p-6 text-[13px] lg:text-sm leading-7 text-cyan-100 whitespace-pre-wrap font-mono">
                  <span className="text-cyan-300">{typedAboutCode}</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.9 }}
                    className="inline-block w-3 text-amber-400"
                  >
                    |
                  </motion.span>
                </pre>
              </div>
            </div>
          </section>

          {/* ================= SKILLS ================= */}
          <section id="skills" className="scroll-mt-32">
            <div className="bg-[#07111d]/24 backdrop-blur-sm border border-cyan-500/12 rounded-2xl p-8 lg:p-12 shadow-[0_0_28px_rgba(0,245,255,0.04)]">
              <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Skills & Tools</p>
              <h2 className="text-white text-3xl font-black uppercase tracking-tight mb-10">Technical Arsenal</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Languages", items: "Java, Python (Libraries), JavaScript, HTML, CSS" },
                  { title: "AI & ML", items: "Machine Learning, Deep Learning, Computer Vision, NLP, Generative AI" },
                  { title: "Tools & Libs", items: "TensorFlow, Scikit-learn, Pandas, NumPy, Google Colab" },
                  { title: "Soft Skills", items: "Problem-Solving, Collaboration, Adaptability, Leadership" }
                ].map((skill, i) => (
                  <div key={i} className="bg-[#0b1420]/24 border border-cyan-500/10 p-6 rounded-xl hover:border-cyan-400/20 transition-colors">
                    <h4 className="text-amber-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">{skill.title}</h4>
                    <p className="text-zinc-300 text-sm font-medium leading-relaxed">{skill.items}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= EXPERIENCE ================= */}
          <section id="experience" className="scroll-mt-32">
            <div className="bg-[#07111d]/24 backdrop-blur-sm border border-cyan-500/12 rounded-2xl p-8 lg:p-12 shadow-[0_0_28px_rgba(0,245,255,0.04)]">
              <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Work</p>
              <h2 className="text-white text-3xl font-black uppercase tracking-tight mb-10">Experience</h2>

              <div className="border border-cyan-500/10 border-l-blue-500 border-l-2 p-8 bg-[#0b1420]/24 rounded-r-xl max-w-4xl relative overflow-hidden group backdrop-blur-sm">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-2 relative z-10">Nov 2023 - Jan 2024</p>
                <h4 className="text-white font-bold tracking-wide text-2xl mb-1 relative z-10">AI / ML Intern</h4>
                <p className="text-amber-500 text-sm font-bold tracking-widest uppercase mb-6 relative z-10">InternsLite (Virtual)</p>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base relative z-10">
                  Worked on foundational AI and ML tasks including meticulous data preprocessing and model experimentation. Gained pivotal hands-on experience structuring Python ML workflows and orchestrating essential AI tools into coherent analytical solutions. Successfully earned verified certification for the tenure.
                </p>
                <a
                  href="https://drive.google.com/file/d/1hEbTEFXeIugRgOpvw8Ly-U4tAgFRyS22/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-amber-500/40 text-amber-500 hover:bg-amber-500/10 hover:border-amber-500 px-4 py-2 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase transition-colors mt-6 relative z-10"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 15h6" /><path d="M9 11h3" /></svg>
                  View Certificate
                </a>
              </div>
            </div>
          </section>

          {/* ================= PROJECTS ================= */}
          <section id="projects" className="scroll-mt-32">
            <div className="bg-[#07111d]/24 backdrop-blur-sm border border-cyan-500/12 rounded-2xl p-8 lg:p-12 shadow-[0_0_28px_rgba(0,245,255,0.04)]">
              <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Projects</p>
              <h2 className="text-white text-3xl font-black uppercase tracking-tight mb-10">Notable Work</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Project 1 */}
                <div className="bg-[#0b1420]/22 border border-cyan-500/10 p-8 rounded-xl hover:border-cyan-400/20 transition-colors shadow-lg backdrop-blur-sm">
                  <p className="text-amber-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">July 2023</p>
                  <h3 className="text-white text-xl font-bold uppercase tracking-wide mb-4">Diabetes Predictor System</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    Architected a fully functional predictor system integrating data preprocessing, feature engineering, and model evaluation. Operationalized Logistic Regression and Decision Tree models with Pickle, delivering low-latency predictions via an optimized Flask backend connected to an intuitive web interface.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <a
                      href="https://github.com/ayitiashritha-ai/Diabetes-prediction-system.git"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 border border-amber-500/40 text-amber-500 hover:bg-amber-500/10 hover:border-amber-500 px-4 py-2 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0 .1-3.7s-1.2-.5-3.9 1.5a13.4 13.4 0 0 0-7 0C6.2 3.3 5 3.8 5 3.8a5.5 5.5 0 0 0 .1 3.7A5.5 5.5 0 0 0 3.6 11c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" /><path d="M3.9 19c4.2-1.2 4.2-2.5 4.2-2.5" /></svg>
                      View on GitHub
                    </a>
                    <a
                      href="https://diabetespredictor-cbbtuxlthukqy2kyn4sedc.streamlit.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-300 px-4 py-2 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      Live Demo
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {['Python', 'Flask', 'Scikit-learn', 'Frontend'].map((tag, i) => (
                      <span key={i} className="text-[9px] font-bold tracking-widest uppercase bg-zinc-800/50 text-zinc-300 px-3 py-1.5 rounded">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Project 2 */}
                <div className="bg-[#0b1420]/22 border border-cyan-500/10 p-8 rounded-xl hover:border-cyan-400/20 transition-colors shadow-lg backdrop-blur-sm">
                  <p className="text-amber-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Banking Interface Project</p>
                  <h3 className="text-white text-xl font-bold uppercase tracking-wide mb-4">Ace BankLite</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    Developed a banking-style interface that presents money movement with clear transparency and an easy-to-use dashboard experience. The project supports adding or subtracting balance amounts, sending money to recipients, and tracking each update through an organized transaction flow. It also allows users to download transaction history, making it useful for reviewing activity, monitoring balance changes, and demonstrating practical financial interface design with interactive functionality.
                  </p>
                  <a
                    href="https://github.com/ayitiashritha-ai/Ace-banklite.git"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-amber-500/40 text-amber-500 hover:bg-amber-500/10 hover:border-amber-500 px-4 py-2 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase transition-colors mb-6"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0 .1-3.7s-1.2-.5-3.9 1.5a13.4 13.4 0 0 0-7 0C6.2 3.3 5 3.8 5 3.8a5.5 5.5 0 0 0 .1 3.7A5.5 5.5 0 0 0 3.6 11c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" /><path d="M3.9 19c4.2-1.2 4.2-2.5 4.2-2.5" /></svg>
                    View on GitHub
                  </a>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {['JavaScript', 'Banking UI', 'Transactions', 'Download History'].map((tag, i) => (
                      <span key={i} className="text-[9px] font-bold tracking-widest uppercase bg-zinc-800/50 text-zinc-300 px-3 py-1.5 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= CERTIFICATES ================= */}
          <section id="certificates" className="scroll-mt-32">
            <div className="bg-[#07111d]/24 backdrop-blur-sm border border-cyan-500/12 rounded-2xl p-8 lg:p-12 shadow-[0_0_28px_rgba(0,245,255,0.04)]">
              <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Verified Learning</p>
              <h2 className="text-white text-3xl font-black uppercase tracking-tight mb-10">Certifications & Training</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Training block */}
                <div className="bg-[#0b1420]/22 border border-cyan-500/10 p-8 rounded-xl relative overflow-hidden group backdrop-blur-sm">
                  <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <p className="text-amber-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-2 relative z-10">Summer Training</p>
                  <h3 className="text-white text-xl font-bold uppercase tracking-wide mb-2 relative z-10">Fundamentals of Java</h3>
                  <p className="text-zinc-500 text-xs font-mono mb-6 relative z-10">LPU | July 2023</p>
                  <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
                    Completed structured summer training focused on core Java and object-oriented programming principles. Strengthened problem-solving skills through intense hands-on coding exercises.
                  </p>
                </div>

                {/* Certs List */}
                <div className="flex flex-col gap-4">
                  {[
                    { name: "Dart Development Guide", org: "Udemy", date: "Verified", href: "https://www.udemy.com/certificate/UC-e2cd26bf-081f-4eab-9cf6-85bfe5fb957c/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com" },
                    { name: "Master Gen AI and AI Tools", org: "Udemy", date: "August 2023", href: "https://drive.google.com/file/d/1s_8ADILf0_amPZGxfM1SBMJKWkqViehG/view?usp=sharing" },
                    { name: "Java Fundamentals", org: "SkillStone", date: "July 2023", href: "/java_fundamentals_cert.pdf" },
                    { name: "Fundamentals of Network Comm", org: "Coursera", date: "October 2024" },
                  ].map((cert, j) => (
                    <a key={j} href={cert.href || "#"} target={cert.href ? "_blank" : undefined} rel="noreferrer" className={`bg-[#0b1420]/22 border border-cyan-500/10 p-6 rounded-xl flex items-center justify-between transition-colors backdrop-blur-sm ${cert.href ? 'hover:border-amber-500/50 cursor-pointer' : 'hover:border-cyan-400/20 cursor-default'}`}>
                      <div>
                        <p className="text-white font-bold text-sm tracking-wide">{cert.name}</p>
                        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-1">{cert.org}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {cert.href && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500/80"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>}
                        <div className="text-amber-500/80 text-[10px] font-bold tracking-[0.1em] uppercase bg-amber-500/10 px-3 py-1 rounded shrink-0">
                          {cert.date}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================= ACHIEVEMENTS ================= */}
          <section id="achievements" className="scroll-mt-32">
            <div className="bg-[#07111d]/24 backdrop-blur-sm border border-cyan-500/12 rounded-2xl p-8 lg:p-12 shadow-[0_0_28px_rgba(0,245,255,0.04)]">
              <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Highlights</p>
              <h2 className="text-white text-3xl font-black uppercase tracking-tight mb-10">Achievements</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0 }}
                  whileHover={{ y: -15, scale: 1.02, transition: { duration: 0.3 } }}
                  className="bg-[#0b1420]/22 border border-cyan-500/10 p-8 rounded-xl hover:border-cyan-400/20 transition-colors shadow-lg flex flex-col cursor-pointer backdrop-blur-sm"
                >
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-6 border border-zinc-800 relative group/img">
                    <img src="/medal_achievement.png" alt="Sports Medal" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <span className="text-3xl mb-4 block">🏆</span>
                  <h4 className="text-white font-bold tracking-wide mb-2">Sports Leadership</h4>
                  <p className="text-amber-500 text-[10px] font-bold tracking-widest uppercase mb-4">Since Oct 2023</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Elected Captain for the CSE Department's Women's Kabaddi team, fostering teamwork, discipline, and strategic leadership.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                  whileHover={{ y: -15, scale: 1.02, transition: { duration: 0.3 } }}
                  className="bg-[#0b1420]/22 border border-cyan-500/10 p-8 rounded-xl hover:border-cyan-400/20 transition-colors shadow-lg flex flex-col cursor-pointer backdrop-blur-sm"
                >
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-6 border border-zinc-800 relative group/img bg-[#0a0a0a]">
                    <img src="/arduino_achievement.png" alt="Arduino Project" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <span className="text-3xl mb-4 block">🔌</span>
                  <h4 className="text-white font-bold tracking-wide mb-2">Hardware Innovation</h4>
                  <p className="text-amber-500 text-[10px] font-bold tracking-widest uppercase mb-4">March 2024</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Engineered an Arduino-based hardware project featuring a street light pattern that autonomously toggles synchronously with water integration.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 1 }}
                  whileHover={{ y: -15, scale: 1.02, transition: { duration: 0.3 } }}
                  className="bg-[#0b1420]/22 border border-cyan-500/10 p-8 rounded-xl hover:border-cyan-400/20 transition-colors shadow-lg flex flex-col cursor-pointer backdrop-blur-sm"
                >
                  <span className="text-3xl mb-4 block">💻</span>
                  <h4 className="text-white font-bold tracking-wide mb-2">Hackathons</h4>
                  <p className="text-amber-500 text-[10px] font-bold tracking-widest uppercase mb-4">Continuous</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Actively participating in high-intensity university hackathons focused on rapid prototyping, real-world utility, and team collaboration.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ================= EDUCATION ================= */}
          <section id="education" className="scroll-mt-32">
            <div className="bg-[#07111d]/24 backdrop-blur-sm border border-cyan-500/12 rounded-2xl p-8 lg:p-12 shadow-[0_0_28px_rgba(0,245,255,0.04)]">
              <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Academics</p>
              <h2 className="text-white text-3xl font-black uppercase tracking-tight mb-8">Education</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-cyan-500/10 border-t-amber-500 border-t-2 p-8 bg-[#0b1420]/22 rounded-b-xl shadow-lg hover:border-cyan-400/20 transition-colors backdrop-blur-sm">
                  <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">Since Aug 2023</p>
                  <h4 className="text-white font-bold text-lg mb-3 leading-tight">Lovely Professional University</h4>
                  <p className="text-zinc-400 text-sm mb-6">B.Tech - Computer Science and Engineering</p>
                  <p className="text-amber-500 font-bold bg-amber-500/10 px-3 py-1.5 rounded inline-block text-[10px] uppercase tracking-widest">CGPA: 7.0</p>
                </div>

                <div className="border border-cyan-500/10 p-8 bg-[#0b1420]/22 rounded-xl shadow-lg hover:border-cyan-400/20 transition-colors backdrop-blur-sm">
                  <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">Apr 2021 - Mar 2023</p>
                  <h4 className="text-white font-bold text-lg mb-3 leading-tight">Narayana Schools</h4>
                  <p className="text-zinc-400 text-sm mb-6">Intermediate</p>
                  <p className="text-zinc-300 font-bold bg-zinc-800 px-3 py-1.5 rounded inline-block text-[10px] uppercase tracking-widest">94.2%</p>
                </div>

                <div className="border border-cyan-500/10 p-8 bg-[#0b1420]/22 rounded-xl shadow-lg hover:border-cyan-400/20 transition-colors backdrop-blur-sm">
                  <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">Apr 2020 - Mar 2021</p>
                  <h4 className="text-white font-bold text-lg mb-3 leading-tight">Vasavi High School</h4>
                  <p className="text-zinc-400 text-sm mb-6">Matriculation</p>
                  <p className="text-zinc-300 font-bold bg-zinc-800 px-3 py-1.5 rounded inline-block text-[10px] uppercase tracking-widest">100%</p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= RESUME ================= */}
          <section id="resume" className="scroll-mt-32">
            <div className="bg-[#07111d]/24 backdrop-blur-sm border border-cyan-500/12 p-8 lg:p-12 rounded-2xl flex flex-col lg:flex-row gap-12 justify-between items-center relative overflow-hidden shadow-[0_0_28px_rgba(0,245,255,0.04)]">

              <div className="flex-1 w-full z-10">
                <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Resume</p>
                <h2 className="text-white text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6">View My CV</h2>
                <p className="text-zinc-400 text-sm lg:text-base leading-relaxed max-w-lg">
                  Download my latest CV to view my education, technical skills, projects, and experience in one place.
                </p>
              </div>

              {/* Private Unlock wrapper logic applied back cleanly */}
              <div className="w-full lg:w-[420px] bg-[#0b1420]/22 border border-cyan-500/10 rounded-2xl p-6 lg:p-8 shrink-0 shadow-2xl z-10 backdrop-blur-sm">

                {!isResumeUnlocked ? (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-[#0a0a0a] rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800 shadow-inner">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    </div>
                    <h3 className="text-white text-lg font-bold uppercase tracking-wide mb-3">Resume Protected</h3>
                    <p className="text-zinc-400 text-sm mb-8">Access my CV below or request it directly.</p>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => setIsResumeUnlocked(true)}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black text-[10px] tracking-[0.2em] uppercase py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></svg>
                        Unlock View
                      </button>
                      <a
                        href="mailto:ayitiashritha@gmail.com?subject=Requesting Resume Access"
                        className="w-full border border-zinc-700 hover:border-amber-500/50 hover:bg-amber-500/5 text-zinc-300 font-bold text-[10px] tracking-[0.2em] uppercase py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        Request via Email
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Document</p>
                    <h3 className="text-white text-lg font-bold uppercase tracking-wide mb-6">Ayiti Ashritha Resume</h3>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="border border-zinc-800 rounded-lg p-4 bg-[#0a0a0a]">
                        <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Format</p>
                        <p className="text-white font-bold text-xs tracking-wider">PDF</p>
                      </div>
                      <div className="border border-zinc-800 rounded-lg p-4 bg-[#0a0a0a]">
                        <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Updated</p>
                        <p className="text-white font-bold text-xs tracking-wider">{new Date().getFullYear()}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <a href="/resume_locked_123.pdf" target="_blank" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black text-[10px] tracking-[0.2em] uppercase py-4 rounded-lg text-center transition-colors">
                        Open PDF
                      </a>
                      <a href="/resume_locked_123.pdf" download="Ayiti_Ashritha_Resume.pdf" className="w-full border border-zinc-700 hover:bg-zinc-800 text-white font-black text-[10px] tracking-[0.2em] uppercase py-4 rounded-lg text-center transition-colors">
                        Download Copy
                      </a>
                    </div>
                  </>
                )}
              </div>

              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none"></div>
            </div>
          </section>

          {/* ================= CONTACT ================= */}
          <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-6 scroll-mt-32">

            {/* Left: Contact Let's Connect */}
            <div className="bg-[#07111d]/24 backdrop-blur-sm border border-cyan-500/12 rounded-2xl p-8 lg:p-12 shadow-[0_0_28px_rgba(0,245,255,0.04)]">
              <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Contact</p>
              <h2 className="text-white text-3xl lg:text-4xl font-black uppercase tracking-tight mb-8">Let's Connect</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="bg-[#0b1420]/22 border border-cyan-500/10 rounded-xl p-5 hover:border-cyan-400/20 transition-colors backdrop-blur-sm">
                  <div className="w-10 h-10 border border-zinc-700 flex items-center justify-center rounded-lg mb-5 text-amber-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                  </div>
                  <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Email</p>
                  <a href="mailto:ayitiashritha@gmail.com" className="text-white font-bold text-[10px] truncate block hover:text-amber-500 transition-colors">ayitiashritha@gmail.com</a>
                </div>
                {/* Location */}
                <div className="bg-[#0b1420]/22 border border-cyan-500/10 rounded-xl p-5 hover:border-cyan-400/20 transition-colors backdrop-blur-sm">
                  <div className="w-10 h-10 border border-zinc-700 flex items-center justify-center rounded-lg mb-5 text-amber-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Location</p>
                  <p className="text-white font-bold text-xs truncate">India</p>
                </div>
                {/* Github */}
                <div className="bg-[#0b1420]/22 border border-cyan-500/10 rounded-xl p-5 hover:border-cyan-400/20 transition-colors backdrop-blur-sm">
                  <div className="w-10 h-10 border border-zinc-700 flex items-center justify-center rounded-lg mb-5 text-amber-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0 .1-3.7s-1.2-.5-3.9 1.5a13.4 13.4 0 0 0-7 0C6.2 3.3 5 3.8 5 3.8a5.5 5.5 0 0 0 .1 3.7A5.5 5.5 0 0 0 3.6 11c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" /><path d="M3.9 19c4.2-1.2 4.2-2.5 4.2-2.5" /></svg>
                  </div>
                  <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Github</p>
                  <a href="https://github.com/ashrithaayiti18" target="_blank" rel="noreferrer" className="text-white font-bold text-[11px] truncate block hover:text-amber-500 transition-colors">github.com/ashrithaayiti18</a>
                </div>
                {/* Linkedin */}
                <div className="bg-[#0b1420]/22 border border-cyan-500/10 rounded-xl p-5 hover:border-cyan-400/20 transition-colors backdrop-blur-sm">
                  <div className="w-10 h-10 border border-zinc-700 flex items-center justify-center rounded-lg mb-5 text-amber-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                  </div>
                  <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Linkedin</p>
                  <a href="https://www.linkedin.com/in/ashritha-ayiti-39230a297/" target="_blank" rel="noreferrer" className="text-white font-bold text-[10px] truncate block hover:text-amber-500 transition-colors">linkedin.com/in/ashritha-a...</a>
                </div>
              </div>
            </div>

            {/* Right: Availability */}
            <div className="bg-[#07111d]/24 backdrop-blur-sm border border-cyan-500/12 rounded-2xl p-8 lg:p-12 flex flex-col justify-between shadow-[0_0_28px_rgba(0,245,255,0.04)]">
              <div>
                <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Availability</p>
                <h2 className="text-white text-3xl lg:text-4xl font-black uppercase tracking-tight mb-8">Open for Opportunities</h2>

                <p className="text-zinc-400 text-sm leading-relaxed mb-10">
                  I am currently looking for internships, junior developer roles, and collaborative opportunities where I can keep learning while contributing to real products.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-auto">
                <span className="border border-green-500/30 text-green-400 text-[9px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full bg-green-500/5">INTERNSHIP</span>
                <span className="border border-blue-500/30 text-blue-400 text-[9px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full bg-blue-500/5">FRONTEND</span>
                <span className="border border-purple-500/30 text-purple-400 text-[9px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full bg-purple-500/5">MACHINE LEARNING</span>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
