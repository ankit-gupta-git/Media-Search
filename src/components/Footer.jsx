import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start space-x-6">
            {[ 
              { icon: <FaGithub />, link: "https://github.com/ankit-gupta-git", label: "GitHub" },
              { icon: <FaTwitter />, link: "https://x.com/ankitgupta_79", label: "Twitter" },
              { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/iamankit-gupta", label: "LinkedIn" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="text-text-secondary transition-all duration-300
                           hover:text-primary hover:-translate-y-1 hover:scale-110"
              >
                <span className="h-6 w-6 text-xl">{item.icon}</span>
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="mt-8 md:mt-0 text-center md:text-right">
            <p className="text-sm text-text-secondary">
              &copy; {currentYear} Media Search App. All rights reserved.
            </p>

            <div className="mt-2 flex justify-center md:justify-end space-x-4 text-xs text-text-secondary">
              {["Privacy Policy", "Terms of Service", "Contact"].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="relative transition-colors duration-300 hover:text-primary
                             after:content-[''] after:absolute after:left-0 after:-bottom-1
                             after:h-[1px] after:w-0 after:bg-primary
                             after:transition-all after:duration-300
                             hover:after:w-full"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-text-secondary">
            Built with ❤️ by <span className="hover:text-primary transition-colors">Ankit Gupta</span> · Open Source
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
