# 👥 KeenKeeper — Keep Your Friendships Alive

**KeenKeeper** is a beautifully designed, highly interactive, and responsive web application designed to help you track, tend, and nurture the relationships that matter most. In today's busy world, keeping in touch with friends can be challenging. KeenKeeper provides you with a dedicated visual space to monitor last contacts, configure touchpoint frequency goals, log quick check-ins, and view dynamic friendship analytics.

---

🚀 Key Features

1. **Intelligent Contact Tracking Dashboard (Home)**:
   - Centered banner greeting and layout displaying immediate connection progress metrics (Total Friends, On-Track count, Need Attention warning cards, and Total Interactions).
   - Responsive **4-column grid layout** (resizing beautifully for mobile, tablet, and desktop) displaying circular friend profile portraits, last-contact markers, customizable tags, and real-time color-coded urgency status pills (`Overdue` in red, `Almost Due` in yellow, `On-Track` in green).
   - Fully interactive **Add-a-Friend Modal** designed with daisyUI styling, allowing you to dynamically add new friends to your tracker (which recalculates all summary stats automatically).

2. **Rich Interactive Friend Profile Details**:
   - Split two-column display with large circular graphics, biographies, tags, and immediate action buttons (`⏰ Snooze 2 Weeks` to extend deadlines, `📦 Archive`, and `🗑️ Delete` which deletes the profile and returns to Home).
   - Real-time **Goal Editing**: Inline dropdown selectors to update contact frequency goals dynamically (recalculates next-due dates and status badges instantly in memory).
   - **Quick Check-In Panel**: horizontally spaced check-in actions (**Call**, **Text**, **Video**). Clicking any interaction resets days since contact to `0`, updates status badge to "On-Track", shifts next due date forward by the goal length, registers a new history log, and fires a premium toast notification.

3. **Dynamic Friendship Analytics (Stats Page)**:
   - Heading-centered analytics console compiling your check-in counts.
   - Interactive, styled **Pie/Donut Chart** powered by Recharts, complete with smooth segment hover micro-animations and custom tooltip panels.
   - Color-harmonized indicators matching Figma design: Purple for `Text`, Forest Green for `Call`, Mint Green for `Video`, and Amber for `Meetup`.

4. **Searchable & Filterable Timeline Log**:
   - Centralized historic archive of all check-in logs.
   - Quick **Filter Dropdowns** to filter entries by type (`Call`, `Text`, `Video`, `Meetup`), a **Search Bar** to search entries by name or interaction type, and a **Date Sorting Toggle** to sort logs by Newest or Oldest first.

5. **Bulletproof Deployment Routing Resiliency**:
   - Configured with React Router's `<HashRouter>` to guarantee that page refreshes on subroutes (like refreshing on `/stats` or `/friend/1`) do not return server-side `404 Not Found` errors after production builds and deployments.
   - Fully customized **404 Catch-All Page** with premium hero compass alignments directing lost users safely back to the home screen.

---

## 🛠️ Technologies Used

- **Core Library**: [React.js]
- **Routing**: [React Router DOM]
- **Styling**: [Tailwind CSS v4]
- **Iconography**: [Lucide React]
- **Charts & Data Visualization**: [Recharts]
- **Notifications**: [React Toastify]
- **Persistence**: unified context state synced in real-time with browser `localStorage`
