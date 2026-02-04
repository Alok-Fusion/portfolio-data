import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'kushwahaalok025@gmail.com',
    href: 'mailto:kushwahaalok025@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9137479236',
    href: 'tel:+919137479236',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Mumbai, India',
    href: '#',
  },
];

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/Alok-Fusion',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/akushwaha-j',
  },
  {
    icon: ExternalLink,
    label: 'Portfolio',
    href: 'https://alok-kushwaha.vercel.app',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

      // Contact info cards animation
      const infoCards = contentRef.current?.querySelectorAll('.info-card');
      if (infoCards) {
        gsap.fromTo(
          infoCards,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Social links animation
      const socials = contentRef.current?.querySelectorAll('.social-link');
      if (socials) {
        gsap.fromTo(
          socials,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Form animation
      const form = contentRef.current?.querySelector('.contact-form');
      if (form) {
        gsap.fromTo(
          form,
          { opacity: 0, y: 40, rotateX: 10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: form,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-medium text-indigo-500 tracking-widest uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Have a project in mind? Let's build something intelligent together.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-indigo-500/30 transition-colors">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.href}
                      className="info-card flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-indigo-500/10 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 group-hover:scale-110 transition-all">
                        <Icon className="h-5 w-5 text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{info.label}</p>
                        <p className="text-sm font-medium text-foreground group-hover:text-indigo-500 transition-colors">{info.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-indigo-500/30 transition-colors">
              <h3 className="text-lg font-bold mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link w-12 h-12 rounded-xl bg-secondary hover:bg-indigo-500/10 flex items-center justify-center text-muted-foreground hover:text-indigo-500 transition-all duration-300 hover:scale-110 hover:rotate-6"
                      title={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="contact-form p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-indigo-500/30 transition-colors"
              style={{ perspective: '1000px' }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Send className="h-5 w-5 text-indigo-500" />
                Send Message
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium mb-2 group-hover:text-indigo-500 transition-colors">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="bg-secondary/50 border-border/50 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium mb-2 group-hover:text-indigo-500 transition-colors">
                      Your Email
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="bg-secondary/50 border-border/50 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium mb-2 group-hover:text-indigo-500 transition-colors">
                    Your Message
                  </label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="bg-secondary/50 border-border/50 focus:border-indigo-500 focus:ring-indigo-500/20 resize-none transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`w-full py-6 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    submitted
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-indigo-500 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : submitted ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Message Sent Successfully!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Send Message
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
