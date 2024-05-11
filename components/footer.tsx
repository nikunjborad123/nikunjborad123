import { Button } from './ui/button';
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const socialLinks = [
  {
    icon: <FaLinkedinIn height={5} />,
    url: 'https://www.linkedin.com/in/nikunj-borad-7027b4180',
    tooltip: 'Visit LinkedIn',
  },
  {
    icon: <FaGithub />,
    url: 'https://github.com/nikunjborad123',
    tooltip: 'Visit GitHub',
  },
  {
    icon: <FaFacebookF />,
    url: 'https://www.facebook.com/nikunj.borad.92',
    tooltip: 'Visit Facebook',
  },
  {
    icon: <FaInstagram />,
    url: 'https://www.instagram.com/n.m.borad',
    tooltip: 'Visit Instagram',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">
        &copy; {currentYear} Nikunj Borad. All rights reserved.
      </small>

      <div className="flex gap-2 justify-center">
        <TooltipProvider>
          {socialLinks.map((link, index) => (
            <Tooltip key={index}>
              <TooltipTrigger>
                <a href={link.url} target="_blank" className="block">
                  <Button variant="custom" size="icon" component={'span'}>
                    {link.icon}
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </footer>
  );
}
