import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SelectOrbitProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

export function SelectOrbit({ value, onChange, options, placeholder = 'Seleccionar', className }: SelectOrbitProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 w-full px-4 py-2.5 bg-muted border border-border/50 rounded-lg text-sm hover:border-primary/50 transition-colors"
      >
        <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
          {value || placeholder}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 py-1 bg-popover border border-border rounded-lg shadow-xl animate-scale-in">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors",
                value === option && "text-primary bg-primary/10"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
