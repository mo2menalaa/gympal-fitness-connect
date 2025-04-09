
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({ icon: Icon, title, description, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg border border-gray-100", 
      className
    )}>
      <div className="h-12 w-12 rounded-lg bg-gympal-blue/10 flex items-center justify-center mb-5">
        <Icon className="text-gympal-blue" size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
