import { cn } from '@/lib/utils';
import { type ReactNode, useRef, useState } from 'react';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    radius?: number;
}

export default function MagneticButton({
    children,
    className,
    strength = 0.3,
    radius = 150,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isNear, setIsNear] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < radius) {
            setIsNear(true);
            const pullStrength = (1 - distance / radius) * strength;
            setPosition({
                x: distanceX * pullStrength,
                y: distanceY * pullStrength,
            });
        } else {
            setIsNear(false);
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleMouseLeave = () => {
        setIsNear(false);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div
            className="relative inline-block"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ padding: radius }}
        >
            <div
                ref={buttonRef}
                className={cn(
                    'relative transition-transform duration-200 ease-out',
                    className
                )}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${isNear ? 1.05 : 1})`,
                }}
            >
                {children}

                {/* Glow effect when near */}
                <div
                    className="absolute inset-0 rounded-full bg-indigo-500/30 blur-xl transition-opacity duration-300 -z-10"
                    style={{
                        opacity: isNear ? 0.6 : 0,
                        transform: 'scale(1.2)',
                    }}
                />
            </div>
        </div>
    );
}
