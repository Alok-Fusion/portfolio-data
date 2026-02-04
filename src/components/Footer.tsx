import { Heart, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 overflow-hidden">
      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear}{' '}
              <span className="text-foreground font-medium">Alok Kushwaha</span>.
              All rights reserved.
            </p>
          </div>

          {/* Made With */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using
            <span className="text-indigo-500 font-medium ml-1">React & Tailwind</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Alok-Fusion"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-indigo-500 hover:bg-indigo-500/10 transition-all duration-300"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/akushwaha-j"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-indigo-500 hover:bg-indigo-500/10 transition-all duration-300"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:kushwahaalok025@gmail.com"
              className="p-2 rounded-lg text-muted-foreground hover:text-indigo-500 hover:bg-indigo-500/10 transition-all duration-300"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
