import { useContext, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Phone, MessageSquare, Video, ArrowLeft, Edit2, Check, X, Bell, Shield, Trash2 } from 'lucide-react';
import { FriendsContext } from '../context/FriendsContext';
import { toast } from 'react-toastify';

const FriendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { friends, logInteraction, editFriendGoal, deleteFriend, snoozeFriend } = useContext(FriendsContext);

  const friend = friends.find(f => f.id === parseInt(id, 10));
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState(friend ? friend.goal : '30');

  // Handle case where friend does not exist
  if (!friend) {
    return (
      <main className="flex-1 py-16 px-4 text-center bg-[#fcfbfa]">
        <div className="max-w-md mx-auto bg-white border border-[#e5e4e7] p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-rose-500 mb-2">Friend Not Found</h2>
          <p className="text-[#6b6375] mb-6">The friend profile you are looking for does not exist or has been deleted.</p>
          <Link to="/" className="btn bg-[#1e463a] text-white border-none rounded-md px-6">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  // Formatting dates beautifully e.g. "Feb 27, 2026"
  const formatDueDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const handleCheckIn = (type) => {
    logInteraction(friend.id, type);
    toast.success(`Check-in logged! ${type.charAt(0).toUpperCase() + type.slice(1)} with ${friend.name} added.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const handleSaveGoal = () => {
    editFriendGoal(friend.id, newGoal);
    setIsEditingGoal(false);
    toast.info(`Goal updated! You now connect with ${friend.name} every ${newGoal} days.`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleSnooze = () => {
    snoozeFriend(friend.id, 2);
    toast.info(`Snoozed! Contact deadline extended by 2 weeks.`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleArchive = () => {
    toast.success(`${friend.name} has been archived. (Status saved)`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${friend.name}?`)) {
      deleteFriend(friend.id);
      toast.error(`${friend.name} has been removed.`, {
        position: "top-right",
        autoClose: 3000,
      });
      navigate('/');
    }
  };

  // Determine status color classes
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
    <main className="flex-1 py-10 px-4 md:px-8 bg-[#fcfbfa]">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <div className="mb-6 flex justify-start">
          <Link to="/" className="flex items-center gap-2 text-sm text-[#6b6375] hover:text-[#1e463a] transition-colors font-medium">
            <ArrowLeft size={16} />
            <span>Back to Friends</span>
          </Link>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column — Friend Info Card & Action Buttons */}
          <div className="space-y-6">
            {/* Friend Info Card */}
            <div className="bg-white border border-[#e5e4e7] rounded-2xl p-8 flex flex-col items-center text-center shadow-sm relative">
              {/* Profile Photo */}
              <div className="relative mb-4">
                <img 
                  src={friend.picture} 
                  alt={friend.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-inner"
                />
                <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-white ${friend.status === 'overdue' ? 'bg-rose-500' : friend.status === 'almost due' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold text-[#08060d] mb-1">{friend.name}</h2>
              
              {/* Status Badge */}
              <span className={`px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${statusBg} mb-4`}>
                {statusLabel}
              </span>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                {friend.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-0.5 bg-[#eaf4f1] text-[#1e463a] text-[10px] font-bold tracking-wider uppercase rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="text-[#6b6375] italic text-sm mb-6 max-w-xs font-serif leading-relaxed">
                "{friend.bio}"
              </p>

              {/* Email */}
              <div className="w-full border-t border-[#e5e4e7] pt-4 text-xs text-[#6b6375]">
                <span className="block font-bold uppercase tracking-wider text-[10px] mb-0.5">Preferred Email</span>
                <a href={`mailto:${friend.email}`} className="text-[#1e463a] hover:underline font-medium break-all">
                  {friend.email}
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white border border-[#e5e4e7] rounded-xl p-4 flex flex-col gap-2.5 shadow-sm">
              <button 
                onClick={handleSnooze}
                className="btn btn-outline border-[#e5e4e7] hover:border-[#1e463a] hover:bg-[#eaf4f1] text-[#6b6375] hover:text-[#1e463a] flex items-center justify-center gap-2 w-full font-semibold transition-all py-3 rounded-lg h-auto min-h-0 cursor-pointer"
              >
                <Bell size={16} />
                <span>Snooze 2 Weeks</span>
              </button>
              
              <button 
                onClick={handleArchive}
                className="btn btn-outline border-[#e5e4e7] hover:border-[#1e463a] hover:bg-[#eaf4f1] text-[#6b6375] hover:text-[#1e463a] flex items-center justify-center gap-2 w-full font-semibold transition-all py-3 rounded-lg h-auto min-h-0 cursor-pointer"
              >
                <Shield size={16} />
                <span>Archive</span>
              </button>
              
              <button 
                onClick={handleDelete}
                className="btn btn-outline border-rose-200 hover:border-rose-500 hover:bg-rose-50 text-rose-500 hover:text-rose-600 flex items-center justify-center gap-2 w-full font-semibold transition-all py-3 rounded-lg h-auto min-h-0 cursor-pointer"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Right Column — Stats, Goal and Quick Check-in */}
          <div className="lg:col-span-2 space-y-6 text-left">
            {/* Stats Cards Section */}
            <div className="grid grid-cols-3 gap-4">
              {/* Days Since Contact Card */}
              <div className="bg-white border border-[#e5e4e7] rounded-xl p-5 shadow-sm text-center">
                <span className="text-3xl md:text-4xl font-extrabold text-[#08060d] block mb-1">
                  {friend.days_since_contact}
                </span>
                <span className="text-[10px] md:text-xs font-bold text-[#6b6375] uppercase tracking-wider block">
                  Days Since Contact
                </span>
              </div>

              {/* Goal Card */}
              <div className="bg-white border border-[#e5e4e7] rounded-xl p-5 shadow-sm text-center">
                <span className="text-3xl md:text-4xl font-extrabold text-[#08060d] block mb-1">
                  {friend.goal}
                </span>
                <span className="text-[10px] md:text-xs font-bold text-[#6b6375] uppercase tracking-wider block">
                  Goal (Days)
                </span>
              </div>

              {/* Next Due Date Card */}
              <div className="bg-white border border-[#e5e4e7] rounded-xl p-5 shadow-sm text-center flex flex-col justify-center min-h-[100px]">
                <span className="text-sm md:text-lg font-extrabold text-[#08060d] block leading-tight mb-1">
                  {formatDueDate(friend.next_due_date)}
                </span>
                <span className="text-[10px] md:text-xs font-bold text-[#6b6375] uppercase tracking-wider block">
                  Next Due
                </span>
              </div>
            </div>

            {/* Relationship Goal Card */}
            <div className="bg-white border border-[#e5e4e7] rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#e5e4e7] pb-4 mb-4">
                <h3 className="font-bold text-lg text-[#08060d]">Relationship Goal</h3>
                
                {!isEditingGoal ? (
                  <button 
                    onClick={() => setIsEditingGoal(true)}
                    className="btn btn-xs bg-[#f4f3ec] hover:bg-[#e8e7e1] text-[#6b6375] border-none flex items-center gap-1 font-semibold rounded"
                  >
                    <Edit2 size={12} />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex gap-1.5">
                    <button 
                      onClick={handleSaveGoal}
                      className="btn btn-xs bg-emerald-600 hover:bg-emerald-700 text-white border-none flex items-center justify-center p-1 rounded"
                    >
                      <Check size={14} />
                    </button>
                    <button 
                      onClick={() => {
                        setNewGoal(friend.goal);
                        setIsEditingGoal(false);
                      }}
                      className="btn btn-xs bg-rose-500 hover:bg-rose-600 text-white border-none flex items-center justify-center p-1 rounded"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {!isEditingGoal ? (
                <p className="text-[#6b6375] text-sm md:text-base font-medium">
                  Connect every <span className="text-[#1e463a] font-bold text-lg">{friend.goal} days</span>
                </p>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-[#6b6375] text-sm font-medium">Connect every</span>
                  <select 
                    value={newGoal} 
                    onChange={(e) => setNewGoal(e.target.value)}
                    className="select select-sm bg-white border-[#e5e4e7] text-[#08060d] focus:border-[#1e463a] rounded"
                  >
                    <option value="7">7 days (Weekly)</option>
                    <option value="14">14 days (Bi-weekly)</option>
                    <option value="30">30 days (Monthly)</option>
                    <option value="45">45 days (1.5 Months)</option>
                    <option value="60">60 days (Bi-monthly)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Quick Check-In Card */}
            <div className="bg-white border border-[#e5e4e7] rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg text-[#08060d] border-b border-[#e5e4e7] pb-4 mb-4">
                Quick Check-In
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                <button 
                  onClick={() => handleCheckIn('call')}
                  className="flex flex-col items-center gap-2 p-5 bg-[#fcfbfa] hover:bg-[#eaf4f1] border border-[#e5e4e7] hover:border-[#1e463a]/40 rounded-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <span className="text-xs font-bold text-[#6b6375] group-hover:text-[#1e463a] uppercase tracking-wider">
                    Call
                  </span>
                </button>

                <button 
                  onClick={() => handleCheckIn('text')}
                  className="flex flex-col items-center gap-2 p-5 bg-[#fcfbfa] hover:bg-[#eaf4f1] border border-[#e5e4e7] hover:border-[#1e463a]/40 rounded-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare size={20} />
                  </div>
                  <span className="text-xs font-bold text-[#6b6375] group-hover:text-[#1e463a] uppercase tracking-wider">
                    Text
                  </span>
                </button>

                <button 
                  onClick={() => handleCheckIn('video')}
                  className="flex flex-col items-center gap-2 p-5 bg-[#fcfbfa] hover:bg-[#eaf4f1] border border-[#e5e4e7] hover:border-[#1e463a]/40 rounded-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Video size={20} />
                  </div>
                  <span className="text-xs font-bold text-[#6b6375] group-hover:text-[#1e463a] uppercase tracking-wider">
                    Video
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FriendDetail;
