// Color mapping optimized for floor screen visibility
export const COLOR_CFG = {
  current: { 
    border: 'border-green-400/30', 
    label: 'text-green-200', 
    accentFrom: 'from-green-400/40', 
    accentTo: 'to-green-900/30', 
    subtitle: 'text-green-50', 
    value: 'text-green-200' 
  },
  next: { 
    border: 'border-blue-400/30', 
    label: 'text-blue-200', 
    accentFrom: 'from-blue-400/40', 
    accentTo: 'to-blue-900/30', 
    subtitle: 'text-blue-50', 
    value: 'text-blue-200' 
  },
  networking: { 
    border: 'border-purple-400/30', 
    label: 'text-purple-200', 
    accentFrom: 'from-purple-400/40', 
    accentTo: 'to-purple-900/30', 
    subtitle: 'text-purple-50', 
    value: 'text-purple-200' 
  }
} as const;
