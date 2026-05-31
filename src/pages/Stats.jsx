import { useContext } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { HelpCircle } from 'lucide-react';
import { FriendsContext } from '../context/FriendsContext';

// Custom tooltips declared outside of render to conform to React guidelines
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-[#e5e4e7] p-3 rounded-lg shadow-lg text-left">
        <p className="font-bold text-xs uppercase tracking-wider text-[#6b6375] mb-1">{data.name}</p>
        <p className="text-[#08060d] text-sm font-extrabold">{data.value} interactions</p>
      </div>
    );
  }
  return null;
};

const Stats = () => {
  const { timeline } = useContext(FriendsContext);

  // Compute interaction counts
  const callCount = timeline.filter(t => t.type === 'call').length;
  const textCount = timeline.filter(t => t.type === 'text').length;
  const videoCount = timeline.filter(t => t.type === 'video').length;
  const meetupCount = timeline.filter(t => t.type === 'meetup').length;

  const totalInteractions = callCount + textCount + videoCount + meetupCount;

  // Chart data matching Figma requested colors and legends
  const chartData = [
    { name: 'Call', value: callCount, color: '#1e463a' }, // Dark green
    { name: 'Text', value: textCount, color: '#8b5cf6' }, // Purple
    { name: 'Video', value: videoCount, color: '#10b981' }, // Mint green
    // Meetup is added as a premium touch since mock data contains it
    ...(meetupCount > 0 ? [{ name: 'Meetup', value: meetupCount, color: '#f59e0b' }] : [])
  ].filter(item => item.value > 0); // Hide empty segments to prevent rendering issues

  return (
    <main className="flex-1 py-10 px-4 md:px-8 bg-[#fcfbfa]">
      <div className="max-w-4xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-[#08060d] text-left mb-8">
          Friendship Analytics
        </h1>

        {/* Card Panel */}
        <div className="bg-white border border-[#e5e4e7] rounded-2xl p-8 shadow-sm text-center">
          <div className="flex items-center justify-between border-b border-[#e5e4e7] pb-4 mb-6">
            <h3 className="font-bold text-lg text-[#08060d] text-left">
              By Interaction Type
            </h3>
            <span className="text-xs font-bold text-[#6b6375] bg-[#f4f3ec] px-3 py-1 rounded-full uppercase tracking-wider">
              Total logged: {totalInteractions}
            </span>
          </div>

          {totalInteractions === 0 ? (
            <div className="py-16">
              <HelpCircle className="mx-auto h-12 w-12 text-[#6b6375] mb-3 animate-bounce" />
              <h4 className="text-base font-bold text-[#08060d]">No Analytics Available</h4>
              <p className="text-[#6b6375] text-sm mt-1">Please log check-ins in a friend's page first to draw the chart.</p>
            </div>
          ) : (
            <div>
              {/* Pie/Donut Chart Container */}
              <div className="w-full h-80 relative flex items-center justify-center mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: 'none' }} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>

                {/* Centered Total Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-extrabold text-[#08060d] tracking-tighter">
                    {totalInteractions}
                  </span>
                  <span className="text-[10px] font-bold text-[#6b6375] uppercase tracking-widest mt-0.5">
                    Interactions
                  </span>
                </div>
              </div>

              {/* Legends matching Figma: • Text • Call • Video */}
              <div className="flex flex-wrap items-center justify-center gap-6 border-t border-[#e5e4e7] pt-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#8b5cf6]"></span>
                  <span className="text-sm font-semibold text-[#6b6375] hover:text-[#08060d] transition-colors flex items-center gap-1">
                    Text <span className="text-xs font-bold text-indigo-500/70">({textCount})</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#1e463a]"></span>
                  <span className="text-sm font-semibold text-[#6b6375] hover:text-[#08060d] transition-colors flex items-center gap-1">
                    Call <span className="text-xs font-bold text-emerald-800/70">({callCount})</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#10b981]"></span>
                  <span className="text-sm font-semibold text-[#6b6375] hover:text-[#08060d] transition-colors flex items-center gap-1">
                    Video <span className="text-xs font-bold text-emerald-500/70">({videoCount})</span>
                  </span>
                </div>
                {meetupCount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span>
                    <span className="text-sm font-semibold text-[#6b6375] hover:text-[#08060d] transition-colors flex items-center gap-1">
                      Meetup <span className="text-xs font-bold text-amber-500/70">({meetupCount})</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Stats;
