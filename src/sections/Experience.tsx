import { useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'GenAI Intern',
    company: 'Innomatics Research Labs',
    location: 'Remote',
    period: 'Nov 2025 - Present',
    description:
      'Designed ML-ready datasets using structured preprocessing pipelines including tokenization, vectorization, and normalization.',
    achievements: [
      'Built validation frameworks using statistical checks, improving model reliability by 18%',
      'Worked with retrieval augmented data flows and embedding evaluation workflows',
    ],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    role: 'AI Model Trainer',
    company: 'Outlier.ai',
    location: 'Remote',
    period: 'Sept 2024 - Present',
    description:
      'Cleaned, validated, and structured multi-million-record datasets for classification and reasoning tasks.',
    achievements: [
      'Applied cross-validation and inter-rater reliability checks, enhancing dataset quality by 22%',
      'Performed statistical profiling and pattern analysis on large-scale datasets',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    role: 'Software Developer Intern',
    company: 'MGrid Technologies',
    location: 'Remote',
    period: 'Nov 2024 - Jun 2025',
    description:
      'Built Python/Node.js analytics pipelines with automated data ingestion and preprocessing.',
    achievements: [
      'Designed SQL schemas and optimized queries, reducing query latency by 30%',
      'Automated recurring workflows using scripting, reducing manual load by 8 hrs/week',
    ],
    color: 'from-pink-500 to-rose-500',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline line animation - draw from top to bottom
      const timelineLine = timelineRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1,
            duration: 2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Experience cards animation
      const cards = timelineRef.current?.querySelectorAll('.experience-card');
      if (cards) {
        cards.forEach((card, index) => {
          const isLeft = index % 2 === 0;
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: isLeft ? -80 : 80,
              rotateY: isLeft ? 25 : -25,
            },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Timeline dots animation with pulse
      const dots = timelineRef.current?.querySelectorAll('.timeline-dot');
      if (dots) {
        dots.forEach((dot, index) => {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              delay: index * 0.3,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Continuous pulse animation
          gsap.to(dot, {
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.8)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.5,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-medium text-indigo-500 tracking-widest uppercase mb-4">
            Career Path
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            My experience building intelligent systems and data-driven solutions
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="timeline-line absolute inset-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />
          </div>

          {/* Experience Cards */}
          <div className="space-y-12 md:space-y-0">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative md:grid md:grid-cols-2 md:gap-8 ${
                    index !== 0 ? 'md:mt-16' : ''
                  }`}
                >
                  {/* Timeline Dot - Desktop */}
                  <div
                    className={`timeline-dot hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r ${exp.color} z-10 items-center justify-center shadow-lg shadow-indigo-500/50`}
                  >
                    <div className="w-2 h-2 rounded-full bg-background" />
                  </div>

                  {/* Card */}
                  <div
                    className={`experience-card ${
                      isLeft ? 'md:pr-12' : 'md:col-start-2 md:pl-12'
                    }`}
                    style={{ perspective: '1000px' }}
                  >
                    <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-indigo-500/50 transition-all duration-500 card-hover group relative overflow-hidden">
                      {/* Shine Effect */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform rotate-45" />

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${exp.color} p-0.5 flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                        >
                          <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                            <Briefcase className="h-6 w-6 text-foreground" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-indigo-500 transition-colors">
                            {exp.role}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-indigo-500" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-indigo-500" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className="text-sm text-muted-foreground flex items-start gap-2 group/item"
                          >
                            <Sparkles className={`h-4 w-4 mt-0.5 flex-shrink-0 text-transparent bg-clip-text bg-gradient-to-r ${exp.color}`} />
                            <span className="group-hover/item:text-foreground transition-colors">{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Hover Glow */}
                      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${exp.color} opacity-5`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
