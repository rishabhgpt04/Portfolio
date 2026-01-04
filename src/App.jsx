import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronDown, ExternalLink, Code, Server, Terminal, Cpu, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import archImg from './assets/Screenshot 2026-01-04 212959.png';
// (Lottie removed)

// --- DATA SOURCE (Based on Resume) ---
const portfolioData = {
  profile: {
    name: "Rishabh Gupta",
    role: "Software Engineer II (AI) & MS CS Student",
    location: "Stony Brook, NY",
    email: "rishabh.gupta.1@stonybrook.edu",
    phone: "+91 9773744566",
    summary: "Master of Science student at Stony Brook University specializing in System Security and AI. Experienced Software Engineer with 3 years of experience and a proven track record in building RAG systems, optimizing query routers, and scaling microservices."
  },
  skills: {
    primary: ["Python", "FastAPI", "SQL", "Cassandra", "RAG", "DSPy", "LangChain", "LangGraph", "MCP", "Git"],
    additional: ["Kubernetes", "Docker", "AWS", "Jenkins", "LLD", "Springboot", "JavaScript", "C++"],
    practices: ["Object Oriented Programming", "Agile", "System Design", "Effective Communication"]
  },
  experience: [
    {
      company: "Rocket Software",
      location: "Hyderabad, India",
      role: "Software Engineer II - AI",
      duration: "Sept. 2024 – Present",
      highlights: [
        "Developed metadata-aware query router for SmartChat (RAG system) using DSPy, improving answer quality by 84%.",
        "Implemented unified LLM inference layer (OpenAI, Anthropic, AWS Bedrock), reducing onboarding time.",
        "Built centralized runtime config system with SSE-based pub-sub, enabling live updates without pod restarts.",
        "Executed 200+ tests, elevating code coverage from 70% to 95%."
      ]
    },
    {
      company: "Capgemini India",
      location: "Pune, India",
      role: "Software Developer",
      duration: "Oct. 2022 – Sept. 2024",
      highlights: [
        "Architected trie + priority queue for Data Catalog routing, slashing query latency 65% across 200k+ records.",
        "Devised C++ indexing microservice (gRPC to FastAPI), accelerating 15k docs/sec at 40ms p99.",
        "Delivered WCAG 2.1 compliant catalog dashboard ensuring accessibility (ARIA, NVDA tested)."
      ]
    },
    {
      company: "Capgemini India",
      location: "Pune, India",
      role: "Software Developer Intern",
      duration: "March 2022 – May 2022",
      highlights: [
        "Optimized Alation lineage service using tracemalloc, cutting memory usage by 35% via bounded caches.",
        "Scaled service to slash governance audit times by 40%."
      ]
    }
  ],
  education: [
    {
      school: "Stony Brook University",
      degree: "Master of Science in Computer Science",
      date: "Expected: Dec. 2027",
      details: "Coursework: System Security, Data Science, Advancements in AI, NLP"
    },
    {
      school: "LNM Institute of Information Technology",
      degree: "Bachelor of Science in Computer Science",
      date: "Aug. 2018 – July 2022",
      details: "Coursework: Computer Networks, Data Structures, Python, OOP"
    }
  ],
  awards: [
    {
      title: "Most Innovative Project Award",
      event: "RocketBuild 2025 (Boston, MA)",
      project: "Smart Scrum Master",
      desc: "Automated Jira ticket creation from MS Teams using Custom MCP server & AI Agent. Achieved 90%+ accuracy and reduced backlog grooming effort by 70%."
    }
  ]
};

// --- COMPONENTS ---

const SectionHeading = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-blue-500/10 rounded-lg">
      <Icon className="w-6 h-6 text-blue-400" />
    </div>
    <h2 className="text-3xl font-bold text-slate-100">{children}</h2>
  </div>
);

const SkillCard = ({ title, skills, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-colors"
  >
    <h3 className="text-xl font-semibold text-blue-300 mb-4">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, idx) => (
        <span key={idx} className="px-4 py-1.5 bg-gradient-to-r from-blue-800/30 via-slate-800/30 to-blue-700/20 text-slate-100 text-sm rounded-full shadow-sm transform hover:scale-105 transition-transform border border-slate-700/30">
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const ExperienceCard = ({ exp, index, onOpenArch }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="relative pl-8 pb-12 border-l-2 border-slate-700 last:border-0"
  >
    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-slate-900" />

    <div className="mb-4">
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-xl font-bold text-slate-100">{exp.company}</h3>
          <span className="text-sm text-slate-400 font-mono">{exp.duration}</span>
        </div>
        <div className="text-blue-400 font-medium mb-1">{exp.role}</div>
        <div className="text-slate-500 text-sm mb-2">{exp.location}</div>
      </div>
    </div>

    <div className="mt-2 flex flex-col sm:flex-row sm:items-start sm:gap-4">
      <ul className="space-y-2 flex-1">
        {exp.highlights.map((item, i) => (
          <li key={i} className="text-slate-300 text-sm leading-relaxed flex gap-2">
            <span className="text-blue-500 mt-1.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Thumbnail beside bullet points on larger screens */}
      {exp.company === 'Rocket Software' && onOpenArch && (
        <div className="hidden sm:flex sm:flex-col sm:items-center sm:justify-start">
          <button onClick={onOpenArch} className="w-36 h-24 rounded-md overflow-hidden shadow-md flex-shrink-0">
            <img src={archImg} alt="SmartChat architecture thumbnail" className="w-full h-full object-cover" />
          </button>
          <button onClick={onOpenArch} className="mt-2 text-sm text-slate-300 hover:text-white underline">
            <ExternalLink className="w-4 h-4 inline-block mr-1" /> View Architecture
          </button>
        </div>
      )}
    </div>

    {/* Text link for small screens */}
    {exp.company === 'Rocket Software' && onOpenArch && (
      <div className="mt-4 sm:hidden">
        <button onClick={onOpenArch} className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white underline">
          <ExternalLink className="w-4 h-4" /> View SmartChat Architecture
        </button>
      </div>
    )}
  </motion.div>
);

// --- MAIN APP COMPONENT ---

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showArchModal, setShowArchModal] = useState(false);
  const [showArchZoom, setShowArchZoom] = useState(0.9);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const firstSentence = portfolioData.profile.summary.split('. ')[0] + '.';

  useEffect(() => {
    const fullTail = ` I'm ${portfolioData.profile.name}.`;
    let idx = 0;
    const typingDelay = 80;
    const t = setInterval(() => {
      idx += 1;
      setTypedText(fullTail.slice(0, idx));
      if (idx >= fullTail.length) clearInterval(t);
    }, typingDelay);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const c = setInterval(() => setShowCursor((s) => !s), 500);
    return () => clearInterval(c);
  }, []);

  // Observe sections inside the scrollable container and update activeSection
  useEffect(() => {
    const container = document.querySelector('.sections-container');
    if (!container) return;
    const sectionIds = ['home', 'skills', 'experience', 'projects', 'education'];
    const options = { root: container, rootMargin: '0px', threshold: 0.55 };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, options);
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="sections-container min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight text-slate-100">RG.</span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            {['About', 'Skills', 'Experience', 'Education', 'Projects'].map((item) => (
              <a 
                key={item} 
                href={item === 'About' ? '#home' : `#${item.toLowerCase()}`}
                className="hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="/Rishabh-Gupta-Resume.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-slate-700 text-slate-200 rounded-full hover:bg-slate-800 transition-colors text-sm">
              Resume
            </a>
            <button onClick={() => setShowContactModal(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-full font-medium transition-colors">
              Hire Me
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="pt-24 pb-12 px-6 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <div className="inline-block px-3 py-1 mb-4 bg-blue-900/30 text-blue-300 border border-blue-800 rounded-full text-sm font-medium">
              Available for Internships & Full-time
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6 tracking-tight">
              <span>Hi,</span>
              <span className="ml-2">{typedText}{showCursor ? <span className="ml-1">|</span> : null}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed mb-4">
              I build intelligent systems. Specializing in <span className="text-blue-400">AI/LLM Engineering</span>, <span className="text-blue-400">System Security</span>, and scalable <span className="text-blue-400">Backend Architectures</span>.
            </p>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-base text-slate-400 max-w-2xl leading-relaxed mb-8">
              {firstSentence}
            </motion.p>

            <div className="flex gap-4 justify-center">
              <a href="https://github.com/rishabhgpt04" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                <Github className="w-5 h-5" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/rishabhgpt26/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" /> LinkedIn
              </a>
              <a href="https://leetcode.com/u/aceofspade1/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                <span aria-hidden="true" className="text-sm">🧩</span>
                <span className="text-xs font-medium">LeetCode</span>
              </a>
              <a href={`mailto:${portfolioData.profile.email}`} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5" /> Email
              </a>
            </div>
          </div>
        </motion.div>
      </header>

      

      {/* Skills Section */}
      <section id="skills" className="py-12 px-6 max-w-5xl mx-auto">
        <SectionHeading icon={Terminal}>Technical Arsenal</SectionHeading>
        <div className="grid md:grid-cols-3 gap-6">
          <SkillCard title="Primary Stack" skills={portfolioData.skills.primary} delay={0} />
          <SkillCard title="Infrastructure & Tools" skills={portfolioData.skills.additional} delay={0.2} />
          <SkillCard title="Core Practices" skills={portfolioData.skills.practices} delay={0.4} />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 max-w-5xl mx-auto bg-slate-900/50 rounded-3xl my-10">
        <SectionHeading icon={Server}>Professional Experience</SectionHeading>
        <div className="mt-10 ml-2">
          {portfolioData.experience.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} onOpenArch={() => { setShowArchModal(true); setShowArchZoom(0.9); }} />
          ))}
        </div>
      </section>

      {/* Projects & Awards */}
      <section id="projects" className="py-20 px-6 max-w-5xl mx-auto">
        <SectionHeading icon={Award}>Key Achievements</SectionHeading>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-500/20 rounded-2xl p-8"
        >
          <div className="flex flex-col md:flex-row gap-6 md:items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider rounded">Winner</span>
                <span className="text-slate-400 text-sm">RocketBuild 2025</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Smart Scrum Master</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Automated Jira ticket creation from Microsoft Teams meetings using a custom MCP server and AI agent.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-950/50 p-3 rounded lg">
                  <span className="block text-emerald-400 font-bold text-lg">90%+</span>
                  <span className="text-slate-500">Processing Accuracy</span>
                </div>
                <div className="bg-slate-950/50 p-3 rounded lg">
                  <span className="block text-emerald-400 font-bold text-lg">70%</span>
                  <span className="text-slate-500">Less Manual Effort</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block w-px bg-slate-800 self-stretch" />
            <div className="w-full md:w-1/3">
              <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {["AI Agents", "MCP", "Microsoft Teams API", "Jira API"].map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Education */}
      <section id="education" className="py-20 px-6 max-w-5xl mx-auto">
        <SectionHeading icon={Code}>Education</SectionHeading>
        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData.education.map((edu, idx) => (
            <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
              <h3 className="text-lg font-bold text-slate-200">{edu.school}</h3>
              <p className="text-blue-400 font-medium mb-2">{edu.degree}</p>
              <p className="text-slate-500 text-sm mb-4">{edu.date}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{edu.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-slate-800 mt-20">
        <p className="text-slate-500 text-sm">
          Built with React, Tailwind & Framer Motion by Rishabh Gupta.
        </p>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-slate-900 rounded-xl w-full max-w-lg p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100">Contact Me</h3>
              <button onClick={() => setShowContactModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
              const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
              const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

              // If EmailJS is configured, send programmatically
              if (serviceId && templateId && publicKey) {
                try {
                  await emailjs.send(serviceId, templateId, {
                    from_name: contactName,
                    from_email: contactEmail,
                    message: contactMessage,
                    to_email: portfolioData.profile.email
                  }, publicKey);
                  setShowContactModal(false);
                  setShowConfirmModal(true);
                } catch (err) {
                  console.error('EmailJS send error', err);
                  // fallback to mailto on error
                  const to = portfolioData.profile.email;
                  const subject = `Portfolio Contact from ${contactName || contactEmail}`;
                  const body = `${contactMessage || ''}\n\nFrom: ${contactName || ''} <${contactEmail || ''}>`;
                  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  window.location.href = mailto;
                  setShowContactModal(false);
                  setShowConfirmModal(true);
                }
              } else {
                // fallback to opening user's mail client
                const to = portfolioData.profile.email;
                const subject = `Portfolio Contact from ${contactName || contactEmail}`;
                const body = `${contactMessage || ''}\n\nFrom: ${contactName || ''} <${contactEmail || ''}>`;
                const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = mailto;
                setShowContactModal(false);
                setShowConfirmModal(true);
              }
            }}>
              <label className="block text-slate-300 text-sm mb-2">Name</label>
              <input required value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full mb-3 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100" />
              <label className="block text-slate-300 text-sm mb-2">Email</label>
              <input required type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full mb-3 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100" />
              <label className="block text-slate-300 text-sm mb-2">Message</label>
              <textarea required value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} rows={5} className="w-full mb-4 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100" />
              <div className="flex items-center justify-end gap-3">
                <button type="button" onClick={() => setShowContactModal(false)} className="px-4 py-2 bg-slate-700 text-slate-200 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-slate-900 rounded-xl w-full max-w-sm p-6 border border-slate-800 text-center">
            <h4 className="text-lg font-bold text-slate-100 mb-2">Message Sent</h4>
            <p className="text-slate-400 mb-4">Thank you! Your message has been prepared in your mail client. Please send it to complete.</p>
            <button onClick={() => { setShowConfirmModal(false); setContactName(''); setContactEmail(''); setContactMessage(''); }} className="px-4 py-2 bg-blue-600 text-white rounded">Close</button>
          </div>
        </div>
      )}

      {/* Architecture Modal */}
      {showArchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <motion.div initial={{ scale: 0.82, opacity: 0 }} animate={{ scale: 0.98, opacity: 1 }} transition={{ duration: 0.28, ease: 'easeOut' }} className="relative bg-slate-900 rounded-xl w-full max-w-3xl p-3 border border-slate-800">
              <button aria-label="Close architecture modal" onClick={() => setShowArchModal(false)} className="absolute top-3 right-3 z-50 p-2 bg-slate-800 text-white rounded-full shadow-lg ring-1 ring-white/10">✕</button>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowArchZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)))} className="px-3 py-1 bg-slate-800 text-slate-200 rounded">−</button>
                  <button onClick={() => setShowArchZoom((z) => Math.min(2.5, +(z + 0.1).toFixed(2)))} className="px-3 py-1 bg-slate-800 text-slate-200 rounded">+</button>
                  <span className="text-sm text-slate-400 ml-3">Zoom: {(showArchZoom * 100).toFixed(0)}%</span>
                </div>
              </div>
            <div className="overflow-hidden rounded-md">
              <motion.img src={archImg} alt="SmartChat Architecture" className="w-full h-auto max-h-[70vh] rounded-md shadow-lg transform origin-center object-contain" animate={{ scale: showArchZoom }} transition={{ type: 'spring', stiffness: 260, damping: 30 }} />
            </div>
            {/* bottom Close button removed per request */}
          </motion.div>
        </div>
      )}
    </div>
  );
}