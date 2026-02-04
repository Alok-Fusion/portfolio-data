import { cn } from '@/lib/utils';
import { type ReactNode, useRef, useState } from 'react';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    glareEnabled?: boolean;
    tiltMaxAngle?: number;
    perspective?: number;
    scale?: number;
    transitionSpeed?: number;
}

export default function TiltCard({
    children,
    className,
    glareEnabled = true,
    tiltMaxAngle = 15,
    perspective = 1000,
    scale = 1.02,
    transitionSpeed = 400,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate rotation angles
        const rotateX = (mouseY / (rect.height / 2)) * -tiltMaxAngle;
        const rotateY = (mouseX / (rect.width / 2)) * tiltMaxAngle;

        setTransform(
            `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
        );

        // Calculate glare position
        const percentX = ((e.clientX - rect.left) / rect.width) * 100;
        const percentY = ((e.clientY - rect.top) / rect.height) * 100;
        setGlarePosition({ x: percentX, y: percentY });
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setTransform('');
        setGlarePosition({ x: 50, y: 50 });
    };

    return (
        <div
            ref={cardRef}
            className={cn('relative overflow-hidden', className)}
            style={{
                transform: isHovering ? transform : '',
                transition: `transform ${transitionSpeed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}

            {/* Glare overlay */}
            {glareEnabled && (
                <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                    style={{
                        opacity: isHovering ? 1 : 0,
                        background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
                    }}
                />
            )}

            {/* Shine effect */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                    opacity: isHovering ? 0.5 : 0,
                    background: `linear-gradient(
            ${105 + (glarePosition.x - 50) * 0.5}deg,
            transparent 40%,
            rgba(255,255,255,0.1) 45%,
            rgba(255,255,255,0.2) 50%,
            rgba(255,255,255,0.1) 55%,
            transparent 60%
          )`,
                }}
            />
        </div>
    );
}
