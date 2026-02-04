import TiltCard from '@/components/TiltCard';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart3, ExternalLink, Filter, Github, Target } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

type Category = 'all' | 'ml' | 'nlp' | 'cv' | 'data' | 'finance';

interface Project {
  title: string;
  subtitle: string;
  category: Category;
  categoryLabel: string;
  image: string;
  accuracy?: string;
  impact?: string;
  description: string;
  tech: string[];
  highlights: string[];
  github: string;
  color: string;
}

const projects: Project[] = [
  // DATA SCIENCE / ML PROJECTS
  {
    title: 'Wheat Crop Disease Detection',
    subtitle: 'MSc Research - Computer Vision',
    category: 'cv',
    categoryLabel: 'Computer Vision',
    image: '/project_wheat.jpg',
    accuracy: '89%',
    impact: '~15-20% accuracy improvement',
    description:
      'Research project for MSc Data Science focusing on wheat crop health detection using CNN and ML hybrid pipeline with preprocessing techniques.',
    tech: ['Python', 'OpenCV', 'CNN', 'Scikit-learn', 'Matplotlib'],
    highlights: [
      'Applied CLAHE, resizing, and denoising preprocessing',
      'Evaluated RandomForest, XGBoost, SVM with Bayesian optimization',
      'Used Grad-CAM for interpretability and feature saliency',
      'Reduced manual crop inspection effort significantly',
    ],
    github: 'https://github.com/Alok-Fusion',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'NemesisAI',
    subtitle: 'NLP Debate Analytics Platform',
    category: 'nlp',
    categoryLabel: 'NLP',
    image: '/project_nemesis.jpg',
    accuracy: '88%',
    impact: 'Persistent conversation analytics',
    description:
      'Advanced NLP platform for debate analytics using Transformer models to generate relevant counter-arguments and analyze conversation patterns.',
    tech: ['Python', 'Flask', 'Transformers', 'MongoDB'],
    highlights: [
      '~88% relevance accuracy in counter-arguments',
      'Persistent conversation analytics storage',
      'Demonstrates reasoning-based NLP capabilities',
      'Real-time debate flow analysis',
    ],
    github: 'https://github.com/Alok-Fusion',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Fake Persona Detector',
    subtitle: 'Fraud Classification System',
    category: 'ml',
    categoryLabel: 'Machine Learning',
    image: '/project1.jpg',
    accuracy: '80%+',
    impact: 'Fintech fraud & KYC relevance',
    description:
      'Multimodal fraud detection system combining text embeddings (TF-IDF, Word2Vec) and image embeddings for fake persona identification.',
    tech: ['Python', 'TF-IDF', 'Embeddings', 'Scikit-learn'],
    highlights: [
      '~80%+ accuracy in fake vs real classification',
      'Direct relevance to fintech fraud & KYC',
      'Image feature analysis integration',
      'Text-based embedding classification',
    ],
    github: 'https://github.com/Alok-Fusion',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'AI Reverse Image Search',
    subtitle: 'Analytical Prototype',
    category: 'cv',
    categoryLabel: 'Computer Vision',
    image: '/project_reverse.jpg',
    impact: 'Fast similarity ranking',
    description:
      'Computer vision prototype for reverse image search using image hashing and embedding similarity metrics for fast image retrieval.',
    tech: ['Python', 'Image Hashing', 'Embeddings', 'Similarity Metrics'],
    highlights: [
      'Fast similarity ranking algorithm',
      'Image hashing for quick lookups',
      'Embedding-based similarity matching',
      'Reduced manual verification effort',
    ],
    github: 'https://github.com/Alok-Fusion',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    title: 'MindMood',
    subtitle: 'Emotion Analytics System',
    category: 'nlp',
    categoryLabel: 'NLP',
    image: '/project_mindmood.jpg',
    accuracy: '75-80%',
    impact: 'Privacy-first local analytics',
    description:
      'Emotion detection and analytics platform using sentiment and emotion classifiers for behavioral analysis with privacy-focused design.',
    tech: ['Python', 'Sentiment Analysis', 'Emotion Classifiers'],
    highlights: [
      '~75-80% emotion detection accuracy',
      'Privacy-first local analytics approach',
      'Behavioral pattern recognition',
      'Real-time emotion tracking',
    ],
    github: 'https://github.com/Alok-Fusion',
    color: 'from-pink-500 to-rose-500',
  },
  // DATA ANALYSIS / DATA EXTRACTION
  {
    title: 'PDF Measurement & BOQ Extraction',
    subtitle: 'Industrial Analytics',
    category: 'data',
    categoryLabel: 'Data Extraction',
    image: '/project_pdf.jpg',
    impact: '60-70% effort reduction',
    description:
      'Automated PDF processing system for extracting measurements and Bill of Quantities data from construction documents using computer vision.',
    tech: ['Python', 'OpenCV', 'PDF Processing', 'Pandas'],
    highlights: [
      '60-70% reduction in manual BOQ effort',
      'Structured, traceable tabular outputs',
      'Automated measurement extraction',
      'Construction document parsing',
    ],
    github: 'https://github.com/Alok-Fusion',
    color: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Missing Person Finder',
    subtitle: 'Analytical System',
    category: 'cv',
    categoryLabel: 'Computer Vision',
    image: '/project4.jpg',
    accuracy: '92%',
    impact: 'Faster candidate shortlisting',
    description:
      'Computer vision-based system for missing person identification using 128D deep metric embeddings and similarity ranking algorithms.',
    tech: ['Python', 'OpenCV', 'KNN', 'Cosine Similarity'],
    highlights: [
      '128D deep metric embeddings',
      'Cosine similarity & KNN retrieval',
      '40% improvement in search latency',
      'Structured lifecycle data tracking',
    ],
    github: 'https://github.com/Alok-Fusion',
    color: 'from-indigo-500 to-violet-500',
  },
  // FINANCE / ECONOMIC DATA ANALYSIS
  {
    title: 'Financial Stress & Commodity Gap Analysis',
    subtitle: 'Financial Data Analysis',
    category: 'finance',
    categoryLabel: 'Finance',
    image: '/project_finance.jpg',
    impact: 'Market imbalance detection',
    description:
      'Real analytical study of price gaps, spreads, and volatility patterns to identify financial stress periods through commodity vs financial movement.',
    tech: ['Python', 'Pandas', 'NumPy', 'Statistical Analysis'],
    highlights: [
      'Identified stress periods via widening gaps',
      'Price gaps & spreads analysis',
      'Volatility pattern detection',
      'Market imbalance interpretability',
    ],
    github: 'https://github.com/Alok-Fusion',
    color: 'from-red-500 to-rose-500',
  },
  {
    title: 'Commodity Price Trend Analysis',
    subtitle: 'Time-Series Finance Analysis',
    category: 'finance',
    categoryLabel: 'Finance',
    image: '/project_finance.jpg',
    impact: 'Risk-aware decision making',
    description:
      'Comprehensive time-series analysis of commodity prices with rolling statistics, trend analysis, and comparative period studies.',
    tech: ['Python', 'Pandas', 'NumPy', 'Rolling Statistics'],
    highlights: [
      'Trend analysis & pattern detection',
      'Rolling mean & volatility tracking',
      'Comparative period analysis',
      'Unstable price regime detection',
    ],
    github: 'https://github.com/Alok-Fusion',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    title: 'Inflation & Price Sensitivity Analysis',
    subtitle: 'Economic Analytics',
    category: 'finance',
    categoryLabel: 'Finance',
    image: '/project_finance.jpg',
    impact: 'Macro-economic insights',
    description:
      'Economic analysis studying price changes across time windows and comparing commodity movement against inflationary pressure.',
    tech: ['Python', 'Pandas', 'Economic Modeling'],
    highlights: [
      'Purchasing-power erosion analysis',
      'Price change time-window studies',
      'Commodity vs inflation comparison',
      'Macro-economic analytical exposure',
    ],
    github: 'https://github.com/Alok-Fusion',
    color: 'from-emerald-500 to-green-500',
  },
  {
    title: 'Profit-Loss & Margin Analysis',
    subtitle: 'Financial Case Studies',
    category: 'finance',
    categoryLabel: 'Finance',
    image: '/project_finance.jpg',
    impact: 'Business finance analytics',
    description:
      'Analytical case studies focusing on margin computation, break-even analysis, and scenario-based financial comparisons.',
    tech: ['Python', 'Pandas', 'Financial Modeling'],
    highlights: [
      'Margin computation & analysis',
      'Break-even point calculation',
      'Scenario-based comparison',
      'Practical business finance analytics',
    ],
    github: 'https://github.com/Alok-Fusion',
    color: 'from-violet-500 to-purple-500',
  },
];

const categories: { value: Category; label: string; count: number }[] = [
  { value: 'all', label: 'All Projects', count: projects.length },
  { value: 'ml', label: 'Machine Learning', count: projects.filter(p => p.category === 'ml').length },
  { value: 'nlp', label: 'NLP', count: projects.filter(p => p.category === 'nlp').length },
  { value: 'cv', label: 'Computer Vision', count: projects.filter(p => p.category === 'cv').length },
  { value: 'data', label: 'Data Extraction', count: projects.filter(p => p.category === 'data').length },
  { value: 'finance', label: 'Finance Analytics', count: projects.filter(p => p.category === 'finance').length },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

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

      // Filter animation
      gsap.fromTo(
        filterRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: filterRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Initial cards animation
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, rotateX: 10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards when filter changes
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-card');
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
        }
      );
    }
  }, [activeCategory]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      {/* Section Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-10">
          <p className="text-sm font-medium text-indigo-500 tracking-widest uppercase mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Showcasing my work in machine learning, computer vision, NLP, data extraction, and financial analytics
          </p>
        </div>

        {/* Category Filter */}
        <div ref={filterRef} className="flex flex-wrap justify-center gap-2 mb-10">
          <div className="flex items-center gap-2 text-muted-foreground mr-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeCategory === cat.value
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 scale-105'
                : 'bg-secondary text-muted-foreground hover:bg-indigo-500/10 hover:text-indigo-500'
                }`}
            >
              {cat.label}
              <span className={`ml-1.5 text-xs ${activeCategory === cat.value ? 'text-indigo-200' : 'text-muted-foreground'}`}>
                ({cat.count})
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]"
        >
          {filteredProjects.map((project, index) => (
            <TiltCard
              key={`${project.title}-${index}`}
              className="project-card rounded-2xl"
              tiltMaxAngle={10}
              scale={1.02}
            >
              <div
                className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-indigo-500/50 transition-all duration-500 card-hover flex flex-col h-full"
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                  {/* Category Badge */}
                  <div className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${project.color} text-white shadow-lg`}>
                    {project.categoryLabel}
                  </div>

                  {/* Accuracy/Impact Badge */}
                  {(project.accuracy || project.impact) && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-indigo-500/90 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
                      <Target className="h-3 w-3" />
                      {project.accuracy || project.impact?.split(' ')[0]}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Title */}
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-indigo-500 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-0.5 text-xs font-medium bg-secondary text-muted-foreground rounded-full hover:bg-indigo-500/20 hover:text-indigo-500 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-secondary text-muted-foreground rounded-full">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1 mb-4">
                    {project.highlights.slice(0, 2).map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className="text-xs text-muted-foreground flex items-start gap-1.5"
                      >
                        <BarChart3 className="h-3 w-3 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full hover:bg-indigo-500/10 hover:text-indigo-500 hover:border-indigo-500/50 transition-all duration-300"
                      >
                        <Github className="h-3.5 w-3.5 mr-1.5" />
                        View Code
                      </Button>
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-indigo-500 px-2 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-5`}
                  />
                </div>

                {/* Corner Shine Effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform rotate-45" />
              </div>
            </TiltCard>
          ))}
        </div>

        {/* View More */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/Alok-Fusion"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 hover:bg-indigo-500/10 hover:text-indigo-500 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105"
            >
              <Github className="h-5 w-5 mr-2" />
              View More on GitHub
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
