import { useEffect, useRef } from 'react';
import { GraduationCap, Calendar, Award, BookOpen, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: 'MSc Data Science',
    institution: 'SIES College of Arts, Science and Commerce',
    period: 'Jul 2024 - May 2026',
    score: '8.57 CGPA',
    description: 'Advanced studies in machine learning, statistical modeling, and big data analytics.',
    icon: GraduationCap,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    degree: 'BSc Information Technology',
    institution: 'SIES College of Arts, Science and Commerce',
    period: 'Jun 2021 - May 2024',
    score: '9.03 CGPA',
    description: 'Foundation in programming, database management, and software development.',
    icon: BookOpen,
    color: 'from-purple-500 to-pink-500',
  },
  {
    degree: '12th Grade (HSC)',
    institution: "P.V.G's Vidya Bhawan High School and Junior College",
    period: 'Feb 2021',
    score: '83.67%',
    description: 'Science stream with focus on Mathematics and Computer Science.',
    icon: Award,
    color: 'from-pink-500 to-rose-500',
  },
  {
    degree: '10th Grade (SSC)',
    institution: 'New Model English High School',
    period: 'Mar 2019',
    score: '71.2%',
    description: 'Secondary education with strong academic foundation.',
    icon: Award,
    color: 'from-rose-500 to-orange-500',
  },
];

const certifications = [
  'Google Data Analytics',
  'Python Programming',
  'Machine Learning Projects',
  'GenAI Projects',
];

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      // Education cards animation
      const cards = contentRef.current?.querySelectorAll('.education-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: index % 2 === 0 ? -10 : 10 },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 0.7,
              delay: index * 0.1,
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

      // Certifications animation
      const certContainer = contentRef.current?.querySelector('.cert-container');
      if (certContainer) {
        gsap.fromTo(
          certContainer,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: certContainer,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cert badges animation
      const certs = contentRef.current?.querySelectorAll('.cert-badge');
      if (certs) {
        gsap.fromTo(
          certs,
          { opacity: 0, scale: 0.5, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: certContainer,
              start: 'top 80%',
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
      id="education"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-medium text-indigo-500 tracking-widest uppercase mb-4">
            Academic Background
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Education & <span className="text-gradient">Certifications</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            My academic journey and professional certifications
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Education Cards */}
          <div className="lg:col-span-2 space-y-6">
            {education.map((edu, index) => {
              const Icon = edu.icon;
              return (
                <div
                  key={index}
                  className="education-card group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-indigo-500/50 transition-all duration-500 card-hover overflow-hidden"
                  style={{ perspective: '1000px' }}
                >
                  {/* Shine Effect */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform rotate-45" />

                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${edu.color} p-0.5 flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                        <Icon className="h-6 w-6 text-foreground" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-indigo-500 transition-colors">
                          {edu.degree}
                        </h3>
                        <span className="px-3 py-1 text-sm font-medium bg-indigo-500/10 text-indigo-500 rounded-full border border-indigo-500/20">
                          {edu.score}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">
                        {edu.institution}
                      </p>

                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                        <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                        {edu.period}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {edu.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${edu.color} opacity-5`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Certifications */}
          <div className="lg:col-span-1">
            <div className="cert-container sticky top-24 p-6 rounded-2xl bg-card border border-border/50 hover:border-indigo-500/30 transition-colors">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-500" />
                Certifications
              </h3>

              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="cert-badge flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-indigo-500/10 transition-all duration-300 group cursor-default"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 group-hover:scale-110 transition-all">
                      <Sparkles className="h-4 w-4 text-indigo-500" />
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-indigo-500 transition-colors">
                      {cert}
                    </span>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-xs text-muted-foreground text-center">
                  Continuously learning and expanding my skillset through industry-recognized certifications
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
