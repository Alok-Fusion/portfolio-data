import TiltCard from '@/components/TiltCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BarChart3,
  Brain,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Server,
  Settings,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    icon: Code2,
    title: 'Programming',
    skills: ['Python', 'SQL', 'Pandas', 'NumPy'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Brain,
    title: 'ML / DL',
    skills: ['Scikit-Learn', 'TensorFlow', 'PyTorch', 'Keras'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Database,
    title: 'Data Processing',
    skills: ['Spark', 'Hadoop', 'Airflow', 'ETL Pipelines'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    skills: ['AWS', 'Azure', 'Docker', 'Git'],
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: BarChart3,
    title: 'Visualization',
    skills: ['Matplotlib', 'Seaborn', 'Plotly', 'PowerBI'],
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: Server,
    title: 'Deployment',
    skills: ['FastAPI', 'Flask', 'REST APIs', 'Model Serving'],
    color: 'from-indigo-500 to-violet-500',
  },
  {
    icon: Settings,
    title: 'ML Workflow',
    skills: ['EDA', 'Feature Engineering', 'Hyperparameter Tuning', 'CV'],
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: GitBranch,
    title: 'Specializations',
    skills: ['Computer Vision', 'NLP', 'Time Series', 'Fraud Detection'],
    color: 'from-fuchsia-500 to-purple-500',
  },
];

const coreSkills = [
  'Regression',
  'Classification',
  'Clustering',
  'Time Series',
  'A/B Testing',
  'NLP',
  'Computer Vision',
  'Deep Learning',
  'MLOps',
  'Statistical Analysis',
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const coreSkillsRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation with 3D flip
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 60,
              rotateY: index % 2 === 0 ? -15 : 15,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Core skills animation
      const skillTags = coreSkillsRef.current?.querySelectorAll('.skill-tag');
      if (skillTags) {
        gsap.fromTo(
          skillTags,
          { opacity: 0, scale: 0.5, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: coreSkillsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-medium text-indigo-500 tracking-widest uppercase mb-4">
            Expertise
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Tools and technologies I use to transform data into intelligent decisions
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          style={{ perspective: '1000px' }}
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <TiltCard
                key={index}
                className="skill-card rounded-2xl"
                tiltMaxAngle={12}
                scale={1.03}
              >
                <div
                  className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-indigo-500/50 transition-all duration-500 overflow-hidden h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Gradient Background on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Shine Effect */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform rotate-45" />

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} p-0.5 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <Icon className="h-6 w-6 text-foreground" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-indigo-500 transition-colors">
                    {category.title}
                  </h3>

                  {/* Skills */}
                  <ul className="space-y-1.5">
                    {category.skills.map((skill, skillIndex) => (
                      <li
                        key={skillIndex}
                        className="text-sm text-muted-foreground flex items-center gap-2 group/item hover:text-foreground transition-colors"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color} group-hover/item:scale-150 transition-transform`} />
                        {skill}
                      </li>
                    ))}
                  </ul>

                  {/* Hover Glow */}
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-10 blur-xl`}
                    />
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Core Skills Tags */}
        <div className="mt-16" ref={coreSkillsRef}>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Core Competencies
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {coreSkills.map((skill, index) => (
              <span
                key={skill}
                className="skill-tag px-4 py-2 text-sm font-medium bg-indigo-500/10 text-indigo-500 rounded-full border border-indigo-500/20 hover:bg-indigo-500/20 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
