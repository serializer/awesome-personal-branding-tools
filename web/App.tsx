import React, { useState, useMemo } from 'react';
import {
  Search,
  ExternalLink,
  Sparkles,
  Brain,
  Palette,
  Calendar,
  RefreshCw,
  PenTool,
  DollarSign,
  Star,
  Heart,
  Filter,
  Code,
  Image,
  Zap,
  ArrowRight,
  BookOpen,
  Bookmark,
  Mail,
} from 'lucide-react';

// GitHub Icon Component (to avoid deprecated import)
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// Types
interface Tool {
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  url: string;
  isFeatured: boolean;
  pain?: string;
  fix?: string;
  bestFor?: string;
}

// Data Structure from README
const tools: Tool[] = [
  // Editor's Choice
  {
    name: 'Luua',
    category: "Editor's Choice",
    description: 'The "Browser-to-Draft" Engine. Connects to your bookmarks/history and uses your consumption habits to auto-generate high-context posts in your unique style.',
    url: 'http://luua.club',
    isFeatured: true,
    pain: 'You read great articles and find cool GitHub repos, but never turn them into content.',
    fix: 'Luua connects to your bookmarks/history. It uses your consumption habits to auto-generate high-context posts in your unique style.',
    bestFor: 'Builders who consume more than they create.',
  },
  // Ideation & Writing
  {
    name: 'Claude 4.5 Sonnet',
    category: 'Ideation & Writing',
    description: 'The current gold standard for stylistic writing. Less "robotic" than GPT-5.1. Great for expanding bullet points into essays.',
    url: 'https://claude.ai/',
    isFeatured: false,
  },
  {
    name: 'Typefully',
    category: 'Ideation & Writing',
    description: 'Distraction-free editor for X/LinkedIn. Their "Vesper AI" is excellent for rewriting hooks to increase CTR.',
    url: 'https://typefully.com/',
    isFeatured: false,
  },
  {
    name: 'TweetHunter',
    category: 'Ideation & Writing',
    description: 'The massive database of viral tweets. Search keywords like "SaaS" or "React" to see what format is working right now.',
    url: 'https://tweethunter.io/',
    isFeatured: false,
  },
  {
    name: 'Perplexity',
    category: 'Ideation & Writing',
    description: 'Research Assistant. Deeply research topics before you write to ensure factual density.',
    url: 'https://www.perplexity.ai/',
    isFeatured: false,
  },
  // Visuals - Code
  {
    name: 'Carbon',
    category: 'Visuals & Code',
    subcategory: 'For Code',
    description: 'The classic. Turn code into beautiful images.',
    url: 'https://carbon.now.sh/',
    isFeatured: false,
  },
  {
    name: 'Ray.so',
    category: 'Visuals & Code',
    subcategory: 'For Code',
    description: 'A modern alternative to Carbon with beautiful gradients, built by Raycast.',
    url: 'https://ray.so/',
    isFeatured: false,
  },
  {
    name: 'Snappify',
    category: 'Visuals & Code',
    subcategory: 'For Code',
    description: 'Next-gen code snippets that allow for animations and arrows.',
    url: 'https://snappify.com/',
    isFeatured: false,
  },
  // Visuals - Carousels
  {
    name: 'Supergrow',
    category: 'Visuals & Code',
    subcategory: 'For Carousels',
    description: 'Dedicated LinkedIn carousel maker. Turns text prompts into swipeable PDF slides.',
    url: 'https://www.supergrow.ai/',
    isFeatured: false,
  },
  {
    name: 'PostNitro',
    category: 'Visuals & Code',
    subcategory: 'For Carousels',
    description: 'Generates branded carousels for LinkedIn/IG automatically.',
    url: 'https://postnitro.ai/',
    isFeatured: false,
  },
  {
    name: 'Midjourney',
    category: 'Visuals & Code',
    subcategory: 'For Carousels',
    description: 'GenAI Art. The best quality for creating abstract header images or "attention grabber" visuals.',
    url: 'https://www.midjourney.com/',
    isFeatured: false,
  },
  {
    name: 'Canva',
    category: 'Visuals & Code',
    subcategory: 'For Carousels',
    description: 'Use "Bulk Create" + CSV upload to generate 50 quotes/tips in 2 minutes.',
    url: 'https://www.canva.com/',
    isFeatured: false,
  },
  // Visuals - Assets
  {
    name: 'Unsplash',
    category: 'Visuals & Code',
    subcategory: 'For Assets',
    description: 'Stock. High-quality, royalty-free photography for headers.',
    url: 'https://unsplash.com/',
    isFeatured: false,
  },
  {
    name: 'Phosphor Icons',
    category: 'Visuals & Code',
    subcategory: 'For Assets',
    description: 'Icons. The cleanest, most developer-friendly icon family.',
    url: 'https://phosphoricons.com/',
    isFeatured: false,
  },
  {
    name: 'Coolors',
    category: 'Visuals & Code',
    subcategory: 'For Assets',
    description: 'Color. Generate consistent brand color palettes in seconds.',
    url: 'https://coolors.co/',
    isFeatured: false,
  },
  // Scheduling & CRM
  {
    name: 'Taplio',
    category: 'Scheduling & CRM',
    description: 'The OS for LinkedIn. Includes a CRM to DM people who interact with your posts (high conversion).',
    url: 'https://taplio.com/',
    isFeatured: false,
  },
  {
    name: 'Hypefury',
    category: 'Scheduling & CRM',
    description: 'Best for Twitter sales. "Auto-plugs" your product when a tweet goes viral.',
    url: 'https://hypefury.com/',
    isFeatured: false,
  },
  {
    name: 'Buffer',
    category: 'Scheduling & CRM',
    description: 'The best free tier for cross-posting to Bluesky, Mastodon, and LinkedIn simultaneously.',
    url: 'https://buffer.com/',
    isFeatured: false,
  },
  {
    name: 'Shield',
    category: 'Scheduling & CRM',
    description: 'Pure analytics. If you are serious about data-driven growth on LinkedIn, this is the dashboard you need.',
    url: 'https://www.shieldapp.ai/',
    isFeatured: false,
  },
  // Repurposing Engine
  {
    name: 'Descript',
    category: 'Repurposing',
    subcategory: 'Editing',
    description: 'Edit video by editing text. Essential for founders who hate timeline editing.',
    url: 'https://www.descript.com/',
    isFeatured: false,
  },
  {
    name: 'OpusClip',
    category: 'Repurposing',
    subcategory: 'Shorts',
    description: 'Upload a 30min Zoom call; get 10 viral TikToks/Shorts with captions.',
    url: 'https://www.opus.pro/',
    isFeatured: false,
  },
  {
    name: 'Riverside',
    category: 'Repurposing',
    subcategory: 'Recording',
    description: 'Studio quality 4K recording for remote podcasts/interviews.',
    url: 'https://riverside.fm/',
    isFeatured: false,
  },
  {
    name: 'Captions.ai',
    category: 'Repurposing',
    subcategory: 'Mobile',
    description: 'Auto-captions and eye-contact correction for talking head videos.',
    url: 'https://www.captions.ai/',
    isFeatured: false,
  },
  {
    name: 'VideoTap',
    category: 'Repurposing',
    subcategory: 'Repurposing',
    description: 'Converts YouTube videos into fully formatted Markdown blog posts.',
    url: 'https://videotap.com/',
    isFeatured: false,
  },
  {
    name: 'Podsqueeze',
    category: 'Repurposing',
    subcategory: 'Audio',
    description: 'Turn audio files into Show Notes, Tweets, and Newsletters.',
    url: 'https://podsqueeze.com/',
    isFeatured: false,
  },
  // Developer Blogging
  {
    name: 'Hashnode',
    category: 'Developer Blogging',
    description: 'Headless blogging for devs. Great SEO and community distribution.',
    url: 'https://hashnode.com/',
    isFeatured: false,
  },
  {
    name: 'Dub.co',
    category: 'Developer Blogging',
    description: 'Link Management. Open-source link shortener with detailed analytics. Essential for tracking which posts drive traffic.',
    url: 'https://dub.co/',
    isFeatured: false,
  },
  {
    name: 'Ghost',
    category: 'Developer Blogging',
    description: 'The best open-source alternative to Substack.',
    url: 'https://ghost.org/',
    isFeatured: false,
  },
  // Newsletter & Growth
  {
    name: 'Beehiiv',
    category: 'Newsletter & Growth',
    subcategory: 'Newsletter',
    description: 'The newsletter platform built for growth (referral programs built-in).',
    url: 'https://www.beehiiv.com/',
    isFeatured: false,
  },
  {
    name: 'Substack',
    category: 'Newsletter & Growth',
    subcategory: 'Community',
    description: 'The easiest place to start writing and get discovered by network effects.',
    url: 'https://substack.com/',
    isFeatured: false,
  },
  {
    name: 'Letterloop',
    category: 'Newsletter & Growth',
    subcategory: 'Internal',
    description: 'Create a newsletter for your friends or team (great for niche networking).',
    url: 'https://letterloop.co/',
    isFeatured: false,
  },
  // Monetization & Bio
  {
    name: 'Bento',
    category: 'Monetization & Bio',
    description: 'The most beautiful "Link in Bio" for creative developers.',
    url: 'https://bento.me/',
    isFeatured: false,
  },
  {
    name: 'Gumroad',
    category: 'Monetization & Bio',
    description: 'Sell your digital templates/guides.',
    url: 'https://gumroad.com/',
    isFeatured: false,
  },
  {
    name: 'LemonSqueezy',
    category: 'Monetization & Bio',
    description: 'Merchant of Record for SaaS. Handles tax compliance globally.',
    url: 'https://lemonsqueezy.com/',
    isFeatured: false,
  },
  {
    name: 'Buy Me a Coffee',
    category: 'Monetization & Bio',
    subcategory: 'Tips',
    description: 'Simple way for your audience to say thanks.',
    url: 'https://www.buymeacoffee.com/',
    isFeatured: false,
  },
];

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "Editor's Choice": <Sparkles className="w-4 h-4" />,
  'Ideation & Writing': <Brain className="w-4 h-4" />,
  'Visuals & Code': <Palette className="w-4 h-4" />,
  'Scheduling & CRM': <Calendar className="w-4 h-4" />,
  'Repurposing': <RefreshCw className="w-4 h-4" />,
  'Developer Blogging': <PenTool className="w-4 h-4" />,
  'Newsletter & Growth': <Mail className="w-4 h-4" />,
  'Monetization & Bio': <DollarSign className="w-4 h-4" />,
};

// Get unique categories
const categories = ['All', ...Array.from(new Set(tools.filter(t => !t.isFeatured).map(t => t.category)))];

// Tool Card Component
function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6
                 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all duration-300
                 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/20">
              {categoryIcons[tool.category] || <Zap className="w-4 h-4 text-cyan-400" />}
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 group-hover:text-white transition-colors">
                {tool.name}
              </h3>
              {tool.subcategory && (
                <span className="text-xs text-slate-500">{tool.subcategory}</span>
              )}
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
          {tool.description}
        </p>

        {/* Category badge */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/50">
            {tool.category}
          </span>
        </div>
      </div>
    </a>
  );
}

// Spotlight Card Component (Editor's Choice)
function SpotlightCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
    >
      {/* Animated glow effect */}
      <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 rounded-3xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x" />

      {/* Card content */}
      <div className="relative bg-[#0B1120] rounded-3xl p-8 md:p-10">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-teal-500/10" />

        <div className="relative z-10">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-cyan-300">Editor&apos;s Choice</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                {tool.name}
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                {tool.description}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-900 font-medium group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-shadow">
                Try Luua Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Right side - Pain/Fix */}
            <div className="space-y-4">
              {tool.pain && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-sm font-medium text-red-400">The Pain</span>
                  </div>
                  <p className="text-sm text-slate-300">{tool.pain}</p>
                </div>
              )}
              {tool.fix && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">The Fix</span>
                  </div>
                  <p className="text-sm text-slate-300">{tool.fix}</p>
                </div>
              )}
              {tool.bestFor && (
                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Bookmark className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-cyan-400">Best For</span>
                  </div>
                  <p className="text-sm text-slate-300">{tool.bestFor}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

// Main App Component
export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      if (tool.isFeatured) return false; // Exclude featured from grid

      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredTool = tools.find(t => t.isFeatured);

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-50">
      {/* Background gradient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <header className="pt-16 pb-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* Curated by badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm text-cyan-300">Curated by</span>
              <a
                href="http://luua.club"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Luua
              </a>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                The Personal
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Branding Stack
              </span>
            </h1>

            {/* Subheader */}
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4">
              The definitive stack of high-leverage tools for founders and developers building a personal brand.
            </p>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Focus on engineering-as-marketing, automation, and high-ROI workflows.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-10">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{tools.length}</div>
                <div className="text-sm text-slate-500">Curated Tools</div>
              </div>
              <div className="w-px h-10 bg-slate-800" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{categories.length - 1}</div>
                <div className="text-sm text-slate-500">Categories</div>
              </div>
              <div className="w-px h-10 bg-slate-800" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-slate-500">Free to Use</div>
              </div>
            </div>
          </div>
        </header>

        {/* Spotlight Section */}
        {featuredTool && (
          <section className="px-4 pb-12">
            <div className="max-w-6xl mx-auto">
              <SpotlightCard tool={featuredTool} />
            </div>
          </section>
        )}

        {/* Sticky Filter Bar */}
        <div className="sticky top-0 z-50 bg-[#0B1120]/80 backdrop-blur-xl border-b border-slate-800/50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-800/50 rounded-xl
                           text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50
                           focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                              ${selectedCategory === category
                                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-900 shadow-lg shadow-cyan-500/25'
                                : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-slate-800/50'
                              }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <main className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Results count */}
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-500">
                Showing {filteredTools.length} tools
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
            </div>

            {/* Grid */}
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-900/50 flex items-center justify-center">
                  <Search className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-300 mb-2">No tools found</h3>
                <p className="text-sm text-slate-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </main>

        {/* Criteria Section */}
        <section className="px-4 py-12 border-t border-slate-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Criteria for Inclusion</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/20 flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Developer-Friendly</h3>
                <p className="text-sm text-slate-400">Clean UI, markdown support, or API access.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/20 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Low-Friction</h3>
                <p className="text-sm text-slate-400">Solves specific pain points (e.g., &quot;Blank Page&quot;, &quot;Cross-posting&quot;).</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/20 flex items-center justify-center mb-4">
                  <Image className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Verified</h3>
                <p className="text-sm text-slate-400">Used by real founders to reach 10k+ followers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 border-t border-slate-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left side */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500">
                  <Sparkles className="w-5 h-5 text-slate-900" />
                </div>
                <span className="font-semibold text-white">Personal Branding Stack</span>
              </div>

              {/* Center - Contribute */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/luua-club/awesome-personal-branding-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-800/50
                           text-slate-400 hover:text-white hover:border-cyan-500/50 transition-all"
                >
                  <GitHubIcon className="w-4 h-4" />
                  <span className="text-sm">Contribute</span>
                </a>
                <a
                  href="https://creativecommons.org/publicdomain/zero/1.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                  CC0 License
                </a>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                <span>by</span>
                <a
                  href="http://luua.club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  Luua
                </a>
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-8 pt-8 border-t border-slate-800/50 text-center">
              <p className="text-sm text-slate-500">
                No &quot;Waitlist-only&quot; tools. We only list tools that are shipping.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* CSS for gradient animation */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
