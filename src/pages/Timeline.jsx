import { useContext, useState } from 'react';
import { Phone, Video, HelpCircle, Search, ArrowUpDown, Filter, Sparkles, MessageCircle } from 'lucide-react';
import { FriendsContext } from '../context/FriendsContext';

// Helper component to render icons with customized background/icon colors
const TimelineIcon = ({ type }) => {
  switch (type) {
    case 'call':
      return (
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100 shadow-xs">
          <Phone size={20} />
        </div>
      );
    case 'text':
      return (
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100 shadow-xs">
          <MessageCircle size={20} />
        </div>
      );
    case 'video':
      return (
        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center border border-purple-100 shadow-xs">
          <Video size={20} />
        </div>
      );
    case 'meetup':
    default:
      return (
        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center border border-amber-100 shadow-xs">
          <Sparkles size={20} />
        </div>
      );
  }
};

const Timeline = () => {
  const { timeline } = useContext(FriendsContext);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  // Filtering logic
  const filteredTimeline = timeline.filter(entry => {
    const matchesFilter = filterType === 'all' || entry.type === filterType;
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          entry.date.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sorting logic (newest has index-based sort, but let's implement a robust date-sorting since it's highly recommended)
  const sortedTimeline = [...filteredTimeline].sort((a, b) => {
    // If IDs are timestamps, we can use them as secondary sorting.
    // Or parse the string dates (e.g. "March 29, 2026")
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    if (sortOrder === 'newest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  return (
    <main className="flex-1 py-10 px-4 md:px-8 bg-[#fcfbfa]">
      <div className="max-w-4xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-[#08060d] text-left mb-8">
          Timeline
        </h1>

        {/* Filter and Search Bar */}
        <div className="bg-white border border-[#e5e4e7] p-5 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Dropdown */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-[#6b6375]" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="select select-sm bg-[#fcfbfa] border-[#e5e4e7] text-[#08060d] rounded-md focus:border-[#1e463a] focus:outline-none font-medium"
              >
                <option value="all">Filter: All Interactions</option>
                <option value="call">Calls</option>
                <option value="text">Texts</option>
                <option value="video">Videos</option>
                <option value="meetup">Meetups</option>
              </select>
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-[#6b6375]" />
              <button
                onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                className="btn btn-sm bg-[#fcfbfa] hover:bg-[#e8e7e1] text-[#6b6375] hover:text-[#08060d] border border-[#e5e4e7] font-semibold rounded-md gap-1.5"
              >
                Sort: {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
              </button>
            </div>
          </div>

          {/* Search Query */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#6b6375]" />
            <input
              type="text"
              placeholder="Search by friend or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-sm pl-9 bg-[#fcfbfa] border-[#e5e4e7] text-[#08060d] rounded-md focus:border-[#1e463a] focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Timeline Entries List */}
        {sortedTimeline.length === 0 ? (
          <div className="bg-white border border-[#e5e4e7] rounded-2xl p-12 text-center shadow-sm">
            <HelpCircle className="mx-auto h-12 w-12 text-[#6b6375] mb-3" />
            <h3 className="text-lg font-bold text-[#08060d]">No interactions logged</h3>
            <p className="text-[#6b6375] text-sm mt-1">Try relaxing your search terms or filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedTimeline.map((entry) => (
              <div 
                key={entry.id}
                className="bg-white border border-[#e5e4e7] hover:border-[#1e463a]/30 rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 text-left"
              >
                {/* Icon Container */}
                <TimelineIcon type={entry.type} />

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-bold text-[#08060d] text-base md:text-lg mb-0.5 leading-tight">
                    {entry.title}
                  </h3>
                  <span className="text-xs text-[#6b6375] font-semibold uppercase tracking-wider block">
                    {entry.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Timeline;
