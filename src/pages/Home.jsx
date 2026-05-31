import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, AlertTriangle, Search, X } from 'lucide-react';
import { FriendsContext } from '../context/FriendsContext';

const Home = () => {
  const { friends, timeline, addFriend } = useContext(FriendsContext);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Form states for adding a new friend
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [daysSinceContact, setDaysSinceContact] = useState('');
  const [goal, setGoal] = useState('30');
  const [bio, setBio] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');

  // Simulate data fetching loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Summary statistics calculations
  const totalFriends = friends.length;
  const onTrackCount = friends.filter(f => f.status === 'on-track').length;
  const needAttentionCount = friends.filter(f => f.status === 'overdue' || f.status === 'almost due').length;
  
  // Count interactions in the current month
  const currentMonthName = new Date().toLocaleDateString('en-US', { month: 'long' });
  const interactionsThisMonth = timeline.filter(t => {
    // If the entry dates are from 2026, count them. Since mock data is from Feb/Mar 2026,
    // let's count entries in 2026 or this month. Let's count entries in 2026 to show a realistic number.
    return t.date.includes('2026') || t.date.includes(currentMonthName);
  }).length;

  // Unique list of tags for filtering
  const allTags = ['All', ...new Set(friends.flatMap(f => f.tags))];

  // Filtering logic
  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          friend.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All' || friend.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const tagsArray = tagsInput
      ? tagsInput.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag.length > 0)
      : ['friend'];

    addFriend({
      name,
      email,
      days_since_contact: daysSinceContact ? parseInt(daysSinceContact, 10) : 0,
      goal: goal ? parseInt(goal, 10) : 30,
      bio,
      tags: tagsArray,
      picture: pictureUrl || undefined
    });

    // Reset form and close modal
    setName('');
    setEmail('');
    setDaysSinceContact('');
    setGoal('30');
    setBio('');
    setTagsInput('');
    setPictureUrl('');
    setIsModalOpen(false);
  };

  return (
    <main className="flex-1 py-10 px-4 md:px-8 bg-[#fcfbfa]">
      {/* Banner Section */}
      <section className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#08060d] mb-4">
          Friends to keep close in your life
        </h1>
        <p className="text-[#6b6375] text-sm md:text-base leading-relaxed mb-6">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn bg-[#1e463a] hover:bg-[#153229] text-white border-none gap-2 px-6 shadow-md hover:scale-102 transition-all font-semibold rounded-md"
        >
          <Plus size={18} />
          <span>Add a Friend</span>
        </button>
      </section>

      {/* Summary Cards Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
        <div className="bg-white border border-[#e5e4e7] p-5 rounded-xl shadow-sm text-center">
          <span className="text-3xl md:text-4xl font-bold text-[#1e463a] block mb-1">{totalFriends}</span>
          <span className="text-xs font-semibold text-[#6b6375] uppercase tracking-wider block">Total Friends</span>
        </div>
        <div className="bg-white border border-[#e5e4e7] p-5 rounded-xl shadow-sm text-center">
          <span className="text-3xl md:text-4xl font-bold text-emerald-600 block mb-1">{onTrackCount}</span>
          <span className="text-xs font-semibold text-[#6b6375] uppercase tracking-wider block">On Track</span>
        </div>
        <div className="bg-white border border-[#e5e4e7] p-5 rounded-xl shadow-sm text-center">
          <span className="text-3xl md:text-4xl font-bold text-rose-500 block mb-1">{needAttentionCount}</span>
          <span className="text-xs font-semibold text-[#6b6375] uppercase tracking-wider block">Need Attention</span>
        </div>
        <div className="bg-white border border-[#e5e4e7] p-5 rounded-xl shadow-sm text-center">
          <span className="text-3xl md:text-4xl font-bold text-indigo-600 block mb-1">{interactionsThisMonth}</span>
          <span className="text-xs font-semibold text-[#6b6375] uppercase tracking-wider block">Interactions This Year</span>
        </div>
      </section>

      {/* Filter and Friends List */}
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e4e7] pb-6 mb-8">
          <h2 className="text-2xl font-bold text-[#08060d] text-left">Your Friends</h2>
          
          {/* Search and Tag Filtering Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#6b6375]" />
              <input
                type="text"
                placeholder="Search friends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-sm pl-9 bg-white border-[#e5e4e7] text-[#08060d] rounded-md focus:border-[#1e463a] focus:outline-none w-full sm:w-56"
              />
            </div>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="select select-sm bg-white border-[#e5e4e7] text-[#08060d] rounded-md focus:border-[#1e463a] focus:outline-none"
            >
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading Spinner / Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="bg-white border border-[#e5e4e7] rounded-xl p-6 flex flex-col items-center animate-pulse">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-5 bg-gray-200 w-32 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 w-16 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 w-24 rounded-full mb-2"></div>
                <div className="h-6 bg-gray-200 w-20 rounded-full"></div>
              </div>
            ))}
          </div>
        ) : filteredFriends.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-[#e5e4e7] shadow-sm">
            <AlertTriangle className="mx-auto h-12 w-12 text-[#6b6375] mb-4" />
            <h3 className="text-lg font-bold text-[#08060d]">No Friends Found</h3>
            <p className="text-[#6b6375] text-sm mt-1">Try resetting your filters or search keywords.</p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFriends.map((friend) => {
              // Determine status colors matching Figma
              let statusBg = 'bg-emerald-600 text-white';
              let statusLabel = 'On-Track';
              if (friend.status === 'overdue') {
                statusBg = 'bg-rose-500 text-white';
                statusLabel = 'Overdue';
              } else if (friend.status === 'almost due') {
                statusBg = 'bg-amber-500 text-white';
                statusLabel = 'Almost Due';
              }

              return (
                <div 
                  key={friend.id}
                  onClick={() => navigate(`/friend/${friend.id}`)}
                  className="group bg-white border border-[#e5e4e7] hover:border-[#1e463a]/40 rounded-xl p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  {/* Circular cropped Picture */}
                  <div className="relative mb-4">
                    <img 
                      src={friend.picture} 
                      alt={friend.name}
                      className="w-24 h-24 rounded-full object-cover border-2 border-slate-100 group-hover:border-[#1e463a] transition-all"
                    />
                    {friend.status === 'overdue' && (
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-rose-500 rounded-full border-2 border-white"></span>
                    )}
                    {friend.status === 'almost due' && (
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-amber-500 rounded-full border-2 border-white"></span>
                    )}
                    {friend.status === 'on-track' && (
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold text-[#08060d] group-hover:text-[#1e463a] transition-colors">
                    {friend.name}
                  </h3>

                  {/* Days Since Contact */}
                  <span className="text-xs text-[#6b6375] font-medium mb-3">
                    {friend.days_since_contact}d ago
                  </span>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                    {friend.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-2.5 py-0.5 bg-[#eaf4f1] text-[#1e463a] text-[10px] font-bold tracking-wider uppercase rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Status Badge */}
                  <span className={`px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${statusBg}`}>
                    {statusLabel}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Add a Friend Modal */}
      {isModalOpen && (
        <div className="modal modal-open bg-black/50 transition-opacity backdrop-blur-xs flex items-center justify-center z-55">
          <div className="modal-box bg-white max-w-md w-full p-6 rounded-xl border border-[#e5e4e7] shadow-xl relative text-left">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-[#6b6375] hover:text-[#08060d] transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="font-bold text-xl text-[#08060d] mb-4">Add a Friend</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label text-xs font-bold uppercase tracking-wider text-[#6b6375] p-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered bg-white border-[#e5e4e7] text-[#08060d] focus:border-[#1e463a] w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label text-xs font-bold uppercase tracking-wider text-[#6b6375] p-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered bg-white border-[#e5e4e7] text-[#08060d] focus:border-[#1e463a] w-full"
                  />
                </div>
                <div>
                  <label className="label text-xs font-bold uppercase tracking-wider text-[#6b6375] p-1">Profile Photo URL</label>
                  <input 
                    type="url" 
                    placeholder="https://example.com/photo.jpg" 
                    value={pictureUrl} 
                    onChange={(e) => setPictureUrl(e.target.value)}
                    className="input input-bordered bg-white border-[#e5e4e7] text-[#08060d] focus:border-[#1e463a] w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label text-xs font-bold uppercase tracking-wider text-[#6b6375] p-1">Days Since Contact</label>
                  <input 
                    type="number" 
                    min="0"
                    placeholder="e.g. 12" 
                    value={daysSinceContact} 
                    onChange={(e) => setDaysSinceContact(e.target.value)}
                    className="input input-bordered bg-white border-[#e5e4e7] text-[#08060d] focus:border-[#1e463a] w-full"
                  />
                </div>
                <div>
                  <label className="label text-xs font-bold uppercase tracking-wider text-[#6b6375] p-1">Contact Goal (Days)</label>
                  <select 
                    value={goal} 
                    onChange={(e) => setGoal(e.target.value)}
                    className="select select-bordered bg-white border-[#e5e4e7] text-[#08060d] focus:border-[#1e463a] w-full"
                  >
                    <option value="7">Every 7 Days (Weekly)</option>
                    <option value="14">Every 14 Days (Bi-weekly)</option>
                    <option value="30">Every 30 Days (Monthly)</option>
                    <option value="45">Every 45 Days (1.5 Months)</option>
                    <option value="60">Every 60 Days (Bi-monthly)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label text-xs font-bold uppercase tracking-wider text-[#6b6375] p-1">Tags (Comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="college, work, travel" 
                  value={tagsInput} 
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="input input-bordered bg-white border-[#e5e4e7] text-[#08060d] focus:border-[#1e463a] w-full"
                />
              </div>

              <div>
                <label className="label text-xs font-bold uppercase tracking-wider text-[#6b6375] p-1">Short Biography</label>
                <textarea 
                  placeholder="Met in university. Loves hiking together..." 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)}
                  className="textarea textarea-bordered bg-white border-[#e5e4e7] text-[#08060d] focus:border-[#1e463a] w-full h-20"
                ></textarea>
              </div>

              <div className="modal-action flex justify-end gap-2 mt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="btn bg-[#e5e4e7] hover:bg-[#d8d7da] text-[#6b6375] border-none font-semibold rounded-md"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn bg-[#1e463a] hover:bg-[#153229] text-white border-none font-semibold rounded-md"
                >
                  Save Friend
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
