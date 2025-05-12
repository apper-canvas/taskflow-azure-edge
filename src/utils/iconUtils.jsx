import * as Icons from 'lucide-react';

// Get an icon by its name
const getIcon = (name) => {
  if (Icons[name]) {
    return Icons[name];
  }
  console.warn(`Icon ${name} not found`);
  return Icons.HelpCircle; // Fallback icon
};

export default getIcon;