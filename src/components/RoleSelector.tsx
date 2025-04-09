
import React from 'react';
import { cn } from '@/lib/utils';
import { User, Dumbbell, HeadsetHelp, ShieldAlert } from 'lucide-react';

interface RoleSelectorProps {
  selectedRole: string;
  onRoleSelect: (role: string) => void;
}

const RoleSelector = ({ selectedRole, onRoleSelect }: RoleSelectorProps) => {
  const roles = [
    {
      id: 'user',
      name: 'User',
      description: 'Looking for fitness coaching',
      icon: User,
    },
    {
      id: 'coach',
      name: 'Coach',
      description: 'Professional fitness trainer',
      icon: Dumbbell,
    },
    {
      id: 'moderator',
      name: 'Moderator',
      description: 'Support staff for coaches',
      icon: HeadsetHelp,
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Platform administrator',
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {roles.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.id;
        
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onRoleSelect(role.id)}
            className={cn(
              "flex items-center p-4 border-2 rounded-lg transition-all",
              isSelected 
                ? "border-gympal-blue bg-gympal-blue/5" 
                : "border-gray-200 hover:border-gympal-blue/50"
            )}
          >
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center mr-3",
              isSelected ? "bg-gympal-blue text-white" : "bg-gray-100 text-gray-500"
            )}>
              <Icon size={20} />
            </div>
            <div className="text-left">
              <h3 className={cn(
                "font-medium",
                isSelected ? "text-gympal-blue" : "text-gray-900"
              )}>
                {role.name}
              </h3>
              <p className="text-gray-500 text-sm">{role.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
