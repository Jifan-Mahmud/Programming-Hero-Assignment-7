import { createContext, useState, useEffect } from 'react';
import initialFriends from '../data/friends.json';

// eslint-disable-next-line react-refresh/only-export-components
export const FriendsContext = createContext();

const initialTimeline = [];

export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState(() => {
    const saved = localStorage.getItem('keenkeeper_friends');
    return saved ? JSON.parse(saved) : initialFriends;
  });

  const [timeline, setTimeline] = useState(() => {
    const saved = localStorage.getItem('keenkeeper_timeline');
    return saved ? JSON.parse(saved) : initialTimeline;
  });

  useEffect(() => {
    localStorage.setItem('keenkeeper_friends', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('keenkeeper_timeline', JSON.stringify(timeline));
  }, [timeline]);

  
  const determineStatus = (days, goal) => {
    if (days >= goal) return 'overdue';
    if (goal - days <= 5 || days / goal >= 0.8) return 'almost due';
    return 'on-track';
  };

  const addFriend = (newFriend) => {
    const id = Date.now();
    const days = parseInt(newFriend.days_since_contact || 0, 10);
    const goal = parseInt(newFriend.goal || 30, 10);
    const status = determineStatus(days, goal);

    
    const today = new Date();
    today.setDate(today.getDate() - days + goal);
    const nextDueDate = today.toISOString().split('T')[0];

    const friend = {
      id,
      name: newFriend.name,
      picture: newFriend.picture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      email: newFriend.email || `${newFriend.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      days_since_contact: days,
      status,
      tags: newFriend.tags || ["friend"],
      bio: newFriend.bio || "No biography provided.",
      goal,
      next_due_date: nextDueDate
    };

    setFriends(prev => [friend, ...prev]);
  };

  const editFriendGoal = (friendId, newGoalVal) => {
    const goal = parseInt(newGoalVal, 10);
    setFriends(prev => prev.map(friend => {
      if (friend.id === friendId) {
        // Recompute next due date based on new goal and days since contact
        const today = new Date();
        const lastContact = new Date(today);
        lastContact.setDate(today.getDate() - friend.days_since_contact);
        const nextDue = new Date(lastContact);
        nextDue.setDate(lastContact.getDate() + goal);
        const nextDueDateStr = nextDue.toISOString().split('T')[0];
        const status = determineStatus(friend.days_since_contact, goal);

        return {
          ...friend,
          goal,
          next_due_date: nextDueDateStr,
          status
        };
      }
      return friend;
    }));
  };

  const deleteFriend = (friendId) => {
    setFriends(prev => prev.filter(f => f.id !== friendId));
    setTimeline(prev => prev.filter(t => t.friendId !== friendId));
  };

  const logInteraction = (friendId, type) => {
    const friend = friends.find(f => f.id === friendId);
    if (!friend) return;

    // Create a timeline item
    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const actionText = type.charAt(0).toUpperCase() + type.slice(1);
    const newTimelineEntry = {
      id: Date.now().toString(),
      friendId,
      type,
      title: `${actionText} with ${friend.name}`,
      date: formattedDate
    };

    
    setFriends(prev => prev.map(f => {
      if (f.id === friendId) {
        
        const today = new Date();
        today.setDate(today.getDate() + f.goal);
        const nextDueStr = today.toISOString().split('T')[0];

        return {
          ...f,
          days_since_contact: 0,
          status: 'on-track',
          next_due_date: nextDueStr
        };
      }
      return f;
    }));

    
    setTimeline(prev => [newTimelineEntry, ...prev]);
  };

  const snoozeFriend = (friendId, weeks = 2) => {
    setFriends(prev => prev.map(f => {
      if (f.id === friendId) {
        
        const currentDueDate = new Date(f.next_due_date);
        currentDueDate.setDate(currentDueDate.getDate() + (weeks * 7));
        const nextDueStr = currentDueDate.toISOString().split('T')[0];
        
        
        return {
          ...f,
          next_due_date: nextDueStr,
          status: 'on-track' 
        };
      }
      return f;
    }));
  };

  return (
    <FriendsContext.Provider value={{
      friends,
      timeline,
      addFriend,
      editFriendGoal,
      deleteFriend,
      logInteraction,
      snoozeFriend
    }}>
      {children}
    </FriendsContext.Provider>
  );
};
