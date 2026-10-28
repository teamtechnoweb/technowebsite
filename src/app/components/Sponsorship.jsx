import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Sponsorship() {
  const sponsorshipTiers = [
    {
      name: 'Platinum',
      price: 'PKR 5,00,000',
      benefits: [
        'Title Sponsor - Global visibility at International Participation',
        'Name Sponsorship (X presents Team Techno*) branding across all platforms',
        'Logos on all merch and our UGV at International competitions (Teknofest, Turkiye)',
        'Featured in all international media coverage, Interviews, and promotional content',
        'All perks from Diamond'
      ],
      highlighted: false
    },
    {
      name: 'Diamond',
      price: 'PKR 2,00,000',
      benefits: [
        'National Partner - Premier presence at Pakistan\'s top competitions',
        'Logos on all merch and robots at national competitions',
        'Branding in national media coverage, Interviews, and event promotions',
        'Support in on-campus recruitment drives and Interview sessions',
        'All perks from Gold'
      ],
      highlighted: true
    },
    {
      name: 'Gold',
      price: 'PKR 100,000',
      benefits: [
        'Sleeve logo on team shirts',
        'Logo on official social media posts and event coverage',
        'One standee placement at events',
        'All perks from Silver'
      ],
      highlighted: false
    },
    {
      name: 'Silver',
      price: 'PKR 50,000',
      benefits: [
        'Social media shoutout (dedicated post + reel + story)',
        'Dedicated Instagram reel',
        'Sponsor name listed on our website'
      ],
      highlighted: false
    }
  ];
  const sponsors = [
    { id: 1, name: 'Sponsor 1', logo: '/sponsor-logo/1.jpg' },
    { id: 2, name: 'Sponsor 2', logo: '/sponsor-logo/2.png' },
    { id: 3, name: 'Sponsor 3', logo: '/sponsor-logo/3.png' },
    { id: 4, name: 'Sponsor 4', logo: '/sponsor-logo/4.png' },
    { id: 5, name: 'Sponsor 5', logo: '/sponsor-logo/5.jpg' }
  ]

  return (
    <section className="py-20 bg-[#060608] relative overflow-hidden" id="sponsorship">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-2/5 h-2/5 bg-red-800/8 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-rose-900/8 blur-[150px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-1/4 h-1/4 bg-blue-600/2 blur-[120px] rounded-full"></div>
        
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-[0.02]"></div>
        
        <div className="absolute inset-0 bg-linear-to-b from-[#060608] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-br from-red-600/2 via-transparent to-rose-600/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Become a <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">Sponsor</span>
          </h2>
          <p className="text-xl mb-8 text-center text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Partner with Team Techno to support innovation and engineering excellence while gaining valuable exposure for your brand.
          </p>
          <div className="flex justify-center">
            <div className="w-28 h-1.5 bg-linear-to-r from-red-500 to-red-700 rounded-full"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-xl border border-zinc-800/70 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-500/20 blur-xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-red-600/10 blur-xl rounded-full"></div>
            
            <h3 className="text-2xl font-bold mb-4 text-white relative z-10">Why Sponsor Us?</h3>
            <ul className="space-y-3 text-gray-300 relative z-10">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Support STEM education and innovation in robotics</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Brand visibility at prestigious national and international competitions</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Access to talented engineering students for recruitment</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Tax benefits for educational sponsorship contributions</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Demonstrate your commitment to technological advancement</span>
              </li>
            </ul>
            
            <div className="mt-8">
              <Link 
                href="/documents/Team-Techno-Sponsorship-Proposal.pdf" 
                target="_blank"
                download
                className="inline-flex items-center justify-center px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white font-medium text-sm rounded-lg transition-transform hover:scale-105 hover:shadow-lg shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Download Sponsorship Proposal
              </Link>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-zinc-900/30 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50 hover:border-red-500/30 transition-all duration-300 hover:shadow-red-500/5 hover:shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-white">Current Sponsors</h3>
              <p className="text-gray-400 mb-4">
                Driven forward by the unwavering support of our amazing sponsors.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                {sponsors.map((sponsor, index) => (
                  <div 
                    key={sponsor.id} 
                    className={`bg-zinc-800/50 rounded-lg py-2 transition-all duration-300 hover:bg-zinc-800/70 hover:shadow-md flex items-center justify-center ${
                      index === 4 ? 'col-span-2' : ''
                    }`}
                  >
                    <div className={`relative ${index === 4 ? 'w-1/2 mx-auto' : 'w-full'} h-24`}>
                      <Image 
                        src={sponsor.logo} 
                        alt={sponsor.name} 
                        fill 
                        className="object-contain hover:opacity-100 transition-opacity"
                        style={{ objectFit: 'contain' }}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-zinc-900/30 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50 hover:border-red-500/30 transition-all duration-300 hover:shadow-red-500/5 hover:shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-white">How Your Support Helps</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-1/4 mr-4 text-sm text-gray-400">Materials</div>
                  <div className="w-3/4 bg-zinc-800 rounded-full h-2.5">
                    <div className="bg-linear-to-r from-red-500 to-red-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-1/4 mr-4 text-sm text-gray-400">Competition Fees</div>
                  <div className="w-3/4 bg-zinc-800 rounded-full h-2.5">
                    <div className="bg-linear-to-r from-red-500 to-red-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-1/4 mr-4 text-sm text-gray-400">Travel</div>
                  <div className="w-3/4 bg-zinc-800 rounded-full h-2.5">
                    <div className="bg-linear-to-r from-red-500 to-red-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-1/4 mr-4 text-sm text-gray-400">Equipment</div>
                  <div className="w-3/4 bg-zinc-800 rounded-full h-2.5">
                    <div className="bg-linear-to-r from-red-500 to-red-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight">
            Sponsorship <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">Tiers</span>
          </h3>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-linear-to-r from-red-500 to-red-700 rounded-full"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sponsorshipTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`bg-zinc-900/30 backdrop-blur-sm rounded-xl border transition-all duration-300 flex flex-col
                ${tier.highlighted 
                  ? 'border-red-500/50 shadow-lg shadow-red-500/10 relative z-10 transform md:-translate-y-4' 
                  : 'border-zinc-800/50 hover:border-red-500/30 hover:shadow-lg'}`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 bg-linear-to-r from-red-600 to-red-700 text-white text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="p-6 flex flex-col h-full">
                <h4 className="text-xl font-bold mb-2 text-white">{tier.name}</h4>
                <p className="text-2xl font-bold text-red-500 mb-4">{tier.price}</p>
                <ul className="space-y-2 mb-6 grow">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-300">
                      <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="#contact" 
                  className={`block text-center px-6 py-2.5 rounded-lg font-medium text-sm transition-colors mt-auto
                    ${tier.highlighted 
                      ? 'bg-linear-to-r from-red-600 to-red-700 text-white hover:shadow-lg hover:from-red-700 hover:to-red-800' 
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
                >
                  Become a Sponsor
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">
            For custom sponsorship packages or in-kind donations, please contact our sponsorship team directly.
          </p>
          <a 
            href="mailto:contact@technogik.com" 
            className="inline-flex items-center text-red-500 hover:text-red-400 font-medium"
          >
            contact@technogik.com
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}