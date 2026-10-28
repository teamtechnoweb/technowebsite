import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-zinc-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
          <div className="flex items-center">
            <div className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-white">TEAM</span>
              <span className="text-red-500 ml-2">TECHNO</span>
            </div>
            <div className="hidden md:block ml-4 w-8 h-0.5 bg-linear-to-r from-red-500 to-transparent"></div>
          </div>
            <p className="mb-4 py-2 text-gray-400">
              An award-winning robotics team pushing the boundaries of technology and innovation.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1H7ydn2RZp/" target='_blank' className="text-gray-400 hover:text-red-500 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/techno.gik?igsh=MTU4Y3o5Y3Bhd3VjNg==" target='_blank' className="text-gray-400 hover:text-red-500 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"></path>
                </svg>
              </a>
             <a href="https://www.linkedin.com/company/team-techno-gik/" target='_blank' className="text-gray-400 hover:text-red-500 transition-colors">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
</svg>
</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-400 hover:text-red-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#expertise" className="text-gray-400 hover:text-red-500 transition-colors">
                  Our Expertise
                </a>
              </li>
              <li>
                <a href="#achievements" className="text-gray-400 hover:text-red-500 transition-colors">
                  Achievements
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-400 hover:text-red-500 transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#documentation" className="text-gray-400 hover:text-red-500 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#sponsorship" className="text-gray-400 hover:text-red-500 transition-colors">
                  Sponsorship
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-red-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Competitions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Neo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  YRT
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  GIS
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  KRT
                </Link>
              </li>
              <li>
                <Link href="https://youtu.be/Ze_VvkUkGFQ?si=Y-eAArW_GKMCxG17" className="text-gray-400 hover:text-red-500 transition-colors">
                  URC
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  TeknoFest
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">
                  GIKI, TOPI SWABI<br />
                </span>
              </li>
              {/* <li className="flex items-center">
                <svg className="h-6 w-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400">0333 4928431</span>
              </li> */}
              <li className="flex items-center">
                <svg className="h-6 w-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className='flex flex-col'>
                <span className="text-gray-400">contact@technogik.com</span>
                {/* <span className="text-gray-400">teamtechnogiki@gmail.com</span> */}
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 Team Techno. All rights reserved.
            </p>
            <a href="https://zainjamshaid.tech" target="_blank" className="text-gray-500 text-md hover:text-red-500 transition-colors mb-4 md:mb-0">
              Developed by Zain Jamshaid
            </a>
            <Link href="/documents/Team-Techno-Sponsorship-Proposal.pdf" target="_blank" download className="text-gray-500 text-sm hover:text-red-500 transition-colors">
              Sponsorship Proposal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}