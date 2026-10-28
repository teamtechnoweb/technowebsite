"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ECMemberCard = ({ member }) => {
  return (
    <div className={`relative w-full 
      bg-linear-to-br from-red-950/30 via-neutral-900 to-black
      border-2 border-yellow-500 shadow-yellow-500/20
      rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl 
      hover:shadow-yellow-500/40`}>

      {member.ecTitle && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-linear-to-r from-yellow-400 to-yellow-600 text-black font-bold text-xs uppercase tracking-wider py-1.5 px-4 rounded-bl-lg">
            {member.ecTitle}
          </div>
        </div>
      )}

      <div className="relative h-64 xs:h-72 sm:h-80 w-full overflow-hidden group">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/60 to-black/90"></div>

        <div className="absolute bottom-0 left-0 right-0 p-3 xs:p-4 sm:p-3.5">
          <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold text-white text-center tracking-tight">
            {member.name}
          </h3>

          <div className="text-xs text-neutral-300 mt-1.5 xs:mt-2 sm:mt-2.5 text-center space-x-1 xs:space-x-1.5">
            <span className="inline-block px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 bg-neutral-800/70 rounded-full">
              {member.batch}
            </span>
            <span className="inline-block px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 bg-neutral-800/70 rounded-full">
              {member.faculty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


const CardSkeleton = ({ isEC = false }) => {
  const cardHeight = isEC ? 'h-64 xs:h-72 sm:h-80' : 'h-64 sm:h-72';
  return (
    <div className={`relative w-full ${cardHeight} bg-neutral-800/70 rounded-xl overflow-hidden border border-neutral-700/50`}>
      <div className="w-full h-full relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="h-6 sm:h-7 bg-neutral-700 rounded-md mb-3"></div>
          <div className="h-4 sm:h-5 w-3/4 bg-neutral-700 rounded-md mb-2"></div>
          {isEC && <div className="h-4 sm:h-5 w-28 mx-auto bg-neutral-700 rounded-md"></div>}
        </div>
      </div>
    </div>
  );
};

export default function TeamDisplay() {
  const [ecMembers, setEcMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/member');
        const sortedEc = response.data
          .filter(member => member.memberType === 'ec')
          .sort((a, b) => {
            const order = { 
              'captain': 1, 
              'manager': 2,
              'vice captain': 3,
              'technicallead': 3,
              'directorelectrical': 5,
              'directorprogramming': 6
            };
            const aOrder = order[a.ecTitle?.toLowerCase()?.trim()] || Infinity;
            const bOrder = order[b.ecTitle?.toLowerCase()?.trim()] || Infinity;
            if (aOrder !== bOrder) return aOrder - bOrder;
            return a.name.localeCompare(b.name);
          });
        setEcMembers(sortedEc);
      } catch (err) {
        console.error('Failed to fetch members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const isLeadershipRole = (title) => {
    if (!title) return false;
    const lowerTitle = title.toLowerCase().trim();
    return lowerTitle === 'captain' || lowerTitle === 'manager' || lowerTitle === 'manager' || lowerTitle === 'Vice Captain' || lowerTitle === 'vicecaptain'  || lowerTitle === 'Technical Lead' || lowerTitle === 'technicallead' || lowerTitle === 'Director Electrical' || lowerTitle === 'directorelectrical' || lowerTitle === 'Director Programming' || lowerTitle === 'directorprogramming' ;
  };

  return (
    <div id='team' className="min-h-screen bg-[#060608] text-white">
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-shimmer {
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }
      `}</style>

      <div className="relative overflow-hidden py-12 sm:py-16 md:py-20 bg-[#060608]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-2/5 h-2/5 bg-red-800/5 blur-[180px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-rose-900/5 blur-[150px] rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-blue-600/1.5 blur-[120px] rounded-full"></div>
          
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-[0.01]"></div>
          
          <div className="absolute inset-0 bg-linear-to-b from-[#060608] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-br from-red-600/1 via-transparent to-rose-600/1"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden opacity-30 z-0">
          <div className="absolute h-60rem sm:h-80rem md:h-96rem w-60rem sm:w-[20rem] md:w-[24rem] rounded-full bg-red-600/15 blur-3xl -top-16 -left-16 animate-pulse"></div>
          <div className="absolute h-60 sm:h-80 md:h-24 w-60 sm:w-[20rem] md:w-[24rem] rounded-full bg-red-700/10 blur-3xl -bottom-12 -right-12 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="absolute inset-0 bg-black/10 z-0"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
              Meet Our <span className="text-red-600">Leads</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
              A passionate group of innovators, creators, and leaders dedicated to pushing boundaries and building the future together.
            </p>

            <div className="flex justify-center">
              <div className="w-24 h-1 bg-linear-to-r from-red-500 to-red-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#060608] relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-[0.008]"></div>
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-red-600/0.5 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            {error && <div className="text-center text-red-500 py-6 sm:py-8 text-lg">{error}</div>}
            
            {loading ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(8)].map((_, i) => (
                  <CardSkeleton key={i} isEC={true} />
                ))}
              </div>
            ) : ecMembers.length > 0 ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {ecMembers.map(member => (
                  <ECMemberCard
                    key={member._id || member.name}
                    member={member}
                    isLeadership={isLeadershipRole(member.ecTitle)}
                  />
                ))}
              </div>
            ) : (
              !error && <div className="text-center text-neutral-500 py-6 sm:py-8 text-lg">No leads found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}