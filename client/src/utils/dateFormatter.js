// Format date to readable string
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format date with time
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get short date (MM/DD/YYYY)
export const formatShortDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// Check if date is in the past
export const isPastDate = (date) => {
  return new Date(date) < new Date();
};

// Check if date is upcoming (within next 7 days)
export const isUpcoming = (date) => {
  const eventDate = new Date(date);
  const now = new Date();
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  return eventDate > now && eventDate <= sevenDaysFromNow;
};

// Get relative time (e.g., "2 days ago", "in 3 hours")
export const getRelativeTime = (date) => {
  const now = new Date();
  const eventDate = new Date(date);
  const diffMs = eventDate - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMs < 0) {
    // Past date
    const absDays = Math.abs(diffDays);
    const absHours = Math.abs(diffHours);
    if (absDays > 0) return `${absDays} day${absDays > 1 ? 's' : ''} ago`;
    if (absHours > 0) return `${absHours} hour${absHours > 1 ? 's' : ''} ago`;
    return 'Just now';
  } else {
    // Future date
    if (diffDays > 0) return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    if (diffHours > 0) return `in ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    if (diffMinutes > 0) return `in ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    return 'Soon';
  }
};