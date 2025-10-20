// src/components/TechLogos.tsx
import React from 'react';
import { Code } from 'lucide-react'; // Default icon

// Define props for the SvgLogo component
interface SvgLogoProps {
  path: React.ReactNode;
  className?: string;
  'aria-label'?: string; // Add aria-label prop
}

// Define props for the TechLogos component
interface TechLogosProps {
  name: string;
  className?: string; // Add optional className prop
}

const SvgLogo: React.FC<SvgLogoProps> = ({ path, className = "w-4 h-4", 'aria-label': ariaLabel }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    aria-label={ariaLabel}
  >
    {path}
  </svg>
);

// A map to hold the logos with a defined type signature
const logos: { [key: string]: React.ReactElement<SvgLogoProps> } = {
  'React': <SvgLogo path={<path d="M12 2.247a1 1 0 0 0-1 1v3.472a8.999 8.999 0 0 0-6.364 6.364H1.175a1 1 0 1 0 0 2h3.472a8.999 8.999 0 0 0 6.364 6.364v3.472a1 1 0 1 0 2 0v-3.472a8.999 8.999 0 0 0 6.364-6.364h3.472a1 1 0 1 0 0-2h-3.472a8.999 8.999 0 0 0-6.364-6.364V3.247a1 1 0 0 0-1-1zM12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />} />,
  'JavaScript': <SvgLogo path={<path d="M6 6h12v12H6z" />} />,
  'Python': <SvgLogo path={<path d="M16.5 7.5c-1.2 0-2.3.4-3.2 1.1l-2.4-2.4a4.5 4.5 0 1 0-1.5 1.5l2.4 2.4c-.7.9-1.1 2-1.1 3.2s.4 2.3 1.1 3.2l-2.4 2.4a4.5 4.5 0 1 0 1.5 1.5l2.4-2.4c.9.7 2 1.1 3.2 1.1s2.3-.4 3.2-1.1l2.4 2.4a4.5 4.5 0 1 0 1.5-1.5l-2.4-2.4c.7-.9 1.1-2 1.1-3.2s-.4-2.3-1.1-3.2l2.4-2.4a4.5 4.5 0 1 0-1.5-1.5l-2.4 2.4c-.9-.7-2-1.1-3.2-1.1z" />} />,
  'Node.js': <SvgLogo path={<path d="M12 2L1.6 7.5v9L12 22l10.4-5.5v-9L12 2zm-1 16.5v-7h2v7h-2z" />} />,
  'GitHub': <SvgLogo path={<path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.82c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.48A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10z" />} />,
  'ChatGPT-4': <SvgLogo path={<path d="M21.12 9.32a1.001 1.001 0 0 0-.97-1.29l-5.63.02c-.37 0-.7.24-.85.58l-1.97 4.26-1.1-2.25a1 1 0 0 0-.89-.58h-4.3a1 1 0 1 0 0 2h3.83l2.21 4.51c.31.64 1.13.89 1.77.58l3.19-1.52 3.16 1.51c.64.31 1.46.06 1.77-.58l2.1-4.53c.24-.52.01-1.13-.51-1.35zM4 5a1 1 0 1 0 0 2h.3a1 1 0 1 0 0-2H4zm-1.29 5.88a1 1 0 0 0 1.35.51l2.1-4.53c.24-.52.01-1.13-.51-1.35a1.001 1.001 0 0 0-1.35.51l-2.1 4.53c-.24.52-.01 1.13.51 1.35zM7.41 18.5a1 1 0 0 0 .89.58h4.3a1 1 0 1 0 0-2h-3.83l-2.21-4.51a1.003 1.003 0 0 0-1.77-.58L3 13.52c-.64-.31-1.46-.06-1.77.58l-1.97 4.26c-.24.52-.01 1.13.51 1.35a1.001 1.001 0 0 0 1.35-.51l2.29-4.71z" />} />,
  'Gemini': <SvgLogo path={<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />} />,
  'Claude 3': <SvgLogo path={<path d="M12 4.41L7.59 12 12 19.59 16.41 12 12 4.41M12 2L2 12l10 10 10-10L12 2z" />} />,
  'Llama': <SvgLogo path={<path d="M15.5,12c-2.2,0-4-1.8-4-4s1.8-4,4-4,4,1.8,4,4-1.8,4-4,4Zm-7,6c0,2.2,1.8,4,4,4s4-1.8,4-4-1.8-4-4-4-4,1.8-4,4ZM8.5,12c-2.2,0-4-1.8-4-4s1.8-4,4-4,4,1.8,4,4-1.8,4-4,4Z" />} />,
};

const TechLogos: React.FC<TechLogosProps> = ({ name, className }) => {
  const LogoComponent = logos[name];
  
  if (LogoComponent) {
    return React.cloneElement(LogoComponent, { 
      'aria-label': `${name} logo`,
      className: className || LogoComponent.props.className
    } as SvgLogoProps);
  }
  
  // Return a default icon if no specific logo is found
  return <Code className={className || "w-4 h-4"} aria-label="Default code icon" />;
};

export default TechLogos;