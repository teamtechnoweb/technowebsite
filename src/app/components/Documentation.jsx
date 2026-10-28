"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Bot, 
  FileText, 
  Gamepad2, 
  Swords, 
  Footprints, 
  FolderOpen,
  Download,
  Search,
  Radio
} from 'lucide-react';

const documents = [
  {
    id: 1,
    title: 'Line Following Robot',
    description: 'Complete technical documentation for building autonomous robots that can follow marked paths using sensors.',
    type: 'pdf',
    downloadUrl: '/documents/Line Following Robot –  Documentation.pdf',
    updatedAt: '2025-08-15',
  },
  {
    id: 2,
    title: 'Sumobot',
    description: 'Design specifications and competition rules for robots designed to push opponents out of a circular ring.',
    type: 'word',
    downloadUrl: '/documents/Sumo_Bot_Documentation.docx',
    updatedAt: '2025-09-01',
  },
  {
    id: 3,
    title: 'BattleBot',
    description: 'Combat robot specifications including weaponry systems, defensive mechanisms, and competition guidelines.',
    type: 'pdf',
    downloadUrl: '/documents/BattleBots.pdf',
    updatedAt: '2025-07-22',
  },
  {
    id: 4,
    title: 'Maze Solver',
    description: 'Algorithms and hardware configurations for autonomous robots capable of navigating and solving complex mazes.',
    type: 'word',
    downloadUrl: '/documents/Maze_Solver_Robot[1].docx',
    updatedAt: '2025-08-28',
  },
  {
    id: 5,
    title: 'RC',
    description: 'Remote control system specifications, frequency management, and control interface documentation.',
    type: 'excel',
    downloadUrl: '/documents/project-timeline.xlsx',
    updatedAt: '2025-09-05',
  },
  {
    id: 6,
    title: 'Futsal',
    description: 'Robot soccer team design specifications, positioning algorithms, and competition strategies.',
    type: 'pdf',
    downloadUrl: '/documents/training-materials.pdf',
    updatedAt: '2025-08-10',
  }
];

const FileIcon = ({ type, title }) => {
  const getIconByTitle = () => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('line following')) {
      return <Bot className="h-6 w-6" />;
    } else if (titleLower.includes('sumobot')) {
      return <Swords className="h-6 w-6" />;
    } else if (titleLower.includes('battlebot')) {
      return <Swords className="h-6 w-6" />;
    } else if (titleLower.includes('maze')) {
      return <Footprints className="h-6 w-6" />;
    } else if (titleLower.includes('rc')) {
      return <Radio className="h-6 w-6" />;
    } else if (titleLower.includes('futsal')) {
      return <Gamepad2 className="h-6 w-6" />;
    } else {
      return <FileText className="h-6 w-6" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'word':
        return 'bg-blue-600';
      case 'pdf':
        return 'bg-red-600';
      case 'excel':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className={`h-12 w-12 ${getBgColor()} rounded-lg flex items-center justify-center text-white`}>
      {getIconByTitle()}
    </div>
  );
};

export default function Documentation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || doc.type === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="py-10 bg-[#060608] relative overflow-hidden" id="documentation">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-2/5 h-2/5 bg-red-800/8 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-rose-900/8 blur-[150px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-1/4 h-1/4 bg-blue-600/2 blur-[120px] rounded-full"></div>
        
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-[0.02]"></div>
        
        <div className="absolute inset-0 bg-linear-to-b from-[#060608] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-br from-red-600/2 via-transparent to-rose-600/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Team <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">Documentation</span>
          </h2>
          <p className="text-xl mb-10 text-center text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Access our technical documentation, project guidelines, and team resources
          </p>
          <div className="flex justify-center">
            <div className="w-28 h-1.5 bg-linear-to-r from-red-500 to-red-700 rounded-full"></div>
          </div>
        </div>

        {/* <div className="mb-10 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full bg-zinc-900/70 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pl-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeFilter === 'all' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                }`}
              >
                All Files
              </button>
              <button 
                onClick={() => setActiveFilter('word')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeFilter === 'word' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                }`}
              >
                Word Docs
              </button>
              <button 
                onClick={() => setActiveFilter('pdf')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeFilter === 'pdf' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                }`}
              >
                PDF Files
              </button>
              <button 
                onClick={() => setActiveFilter('excel')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeFilter === 'excel' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                }`}
              >
                Excel Files
              </button>
            </div>
          </div>
        </div> */}

        {/* Document grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <div key={doc.id} className="bg-zinc-900/70 border border-zinc-800 rounded-lg overflow-hidden hover:border-red-500/30 transition-all duration-300 group">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <FileIcon type={doc.type} title={doc.title} />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">{doc.title}</h3>
                      <p className="text-sm text-gray-400">Updated: {doc.updatedAt}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-6 text-sm">{doc.description}</p>
                  <div className="flex justify-between items-center">
                    <a 
                      href={doc.downloadUrl} 
                      download
                      className="flex items-center text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Download className="h-5 w-5 mr-1" />
                      Download
                    </a>
                    <span className="text-xs text-gray-500 uppercase">
                      {doc.type}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <FolderOpen className="h-16 w-16 mx-auto text-gray-700 mb-4" />
              <h3 className="text-xl font-medium text-gray-400">No documents found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-zinc-900/80 to-black/80 border border-zinc-800 rounded-lg p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white">Need Additional Resources?</h3>
            <p className="text-gray-400 mt-2">
              Contact our team leads to request specific documentation or resources not listed here.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link href="#contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-300">
              Contact Team
            </Link>
          </div>
        </div> */}
        
      </div>
    </section>
  );
}