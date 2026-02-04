import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { lazy, Suspense, useEffect, useRef } from 'react';

// Lazy load the 3D scene to prevent blocking initial render
const Hero3DScene = lazy(() => import('@/components/Hero3DScene'));

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ delay: 0.2 });

      // Greeting - fade in with blur
      tl.fromTo(
        greetingRef.current,
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.6, ease: 'power2.out' }
      );

      // Name - character by character reveal with stagger
      const nameChars = nameRef.current?.querySelectorAll('.char');
      if (nameChars) {
        tl.fromTo(
          nameChars,
          { opacity: 0, y: 50, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.05,
            stagger: 0.03,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        );
      }

      // Role - slide in with glow
      tl.fromTo(
        roleRef.current,
        { opacity: 0, x: -30, filter: 'blur(5px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
        '-=0.2'
      );

      // Description - fade up
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // CTA buttons - scale up with bounce
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.3'
      );

      // Social links - stagger from bottom
      const socialItems = socialsRef.current?.children;
      if (socialItems) {
        tl.fromTo(
          socialItems,
          { opacity: 0, y: 20, scale: 0 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(2)',
          },
          '-=0.2'
        );
      }

      // Tech stack - fade in with stagger
      const techItems = techStackRef.current?.children;
      if (techItems) {
        tl.fromTo(
          techItems,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }

      // Floating elements animation
      const floatingItems = floatingRef.current?.children;
      if (floatingItems) {
        gsap.fromTo(
          floatingItems,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(2)',
            delay: 1,
          }
        );

        // Continuous floating animation
        Array.from(floatingItems).forEach((item, i) => {
          gsap.to(item, {
            y: `${Math.sin(i) * 15}`,
            x: `${Math.cos(i) * 10}`,
            duration: 3 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split name into characters
  const nameText = 'Alok Kushwaha';
  const nameChars = nameText.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
      {char}
    </span>
  ));

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background Scene with fallback */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Static fallback background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      {/* 3D Canvas overlay */}
      <Suspense fallback={null}>
        <Hero3DScene />
      </Suspense>

      {/* Floating Elements */}
      <div ref={floatingRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium backdrop-blur-sm">
          <Sparkles className="h-4 w-4 inline mr-2" />
          Machine Learning
        </div>
        <div className="absolute top-[30%] right-[15%] px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium backdrop-blur-sm">
          Deep Learning
        </div>
        <div className="absolute bottom-[25%] left-[15%] px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium backdrop-blur-sm">
          Computer Vision
        </div>
        <div className="absolute bottom-[35%] right-[10%] px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium backdrop-blur-sm">
          NLP
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Greeting */}
          <p
            ref={greetingRef}
            className="text-sm md:text-base font-medium text-indigo-500 tracking-widest uppercase mb-4"
          >
            Hello, I'm
          </p>

          {/* Name */}
          <h1
            ref={nameRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            style={{ perspective: '1000px' }}
          >
            <span className="text-gradient">{nameChars}</span>
          </h1>

          {/* Role */}
          <p
            ref={roleRef}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-6"
          >
            Data Scientist & <span className="text-indigo-500 relative">
              AI Engineer
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
            </span>
          </p>

          {/* Description */}
          <p
            ref={descRef}
            className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-8 leading-relaxed"
          >
            Transforming raw data into intelligent solutions. I build machine learning pipelines,
            deploy scalable AI models, and uncover insights that drive business impact.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-6 text-base font-semibold rounded-full glow-indigo transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30"
            >
              View My Work
              <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
            </Button>
            <a
              href="mailto:kushwahaalok025@gmail.com"
              className="px-8 py-3 text-base font-semibold text-foreground border-2 border-border hover:border-indigo-500 rounded-full transition-all duration-300 hover:text-indigo-500 hover:scale-105"
            >
              Get In Touch
            </a>
          </div>

          {/* Social Links */}
          <div ref={socialsRef} className="flex items-center justify-center gap-4 mb-12">
            <a
              href="https://github.com/Alok-Fusion"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-indigo-500/10 text-muted-foreground hover:text-indigo-500 transition-all duration-300 hover:scale-110 hover:rotate-6"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/akushwaha-j"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-indigo-500/10 text-muted-foreground hover:text-indigo-500 transition-all duration-300 hover:scale-110 hover:-rotate-6"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:kushwahaalok025@gmail.com"
              className="p-3 rounded-full bg-secondary hover:bg-indigo-500/10 text-muted-foreground hover:text-indigo-500 transition-all duration-300 hover:scale-110 hover:rotate-6"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Tech Stack Badges */}
          <div ref={techStackRef} className="flex flex-wrap items-center justify-center gap-3">
            {['Python', 'TensorFlow', 'PyTorch', 'SQL', 'AWS', 'Docker', 'OpenCV', 'NLP'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-xs font-medium bg-secondary/50 text-muted-foreground rounded-full border border-border/50 hover:border-indigo-500/50 hover:text-indigo-500 hover:bg-indigo-500/10 transition-all duration-300 hover:scale-105 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-indigo-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
