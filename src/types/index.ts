export type ReadingFormat =
  | 'E-Book'
  | 'Web Novel'
  | 'Light Novel'
  | 'Fanfiction'
  | 'Academic'
  | 'Non-Fiction';

export type ShelfStatus =
  | 'Currently Reading'
  | 'Completed'
  | 'Plan to Read'
  | 'On Hold'
  | 'Dropped';

export interface BookEdition {
  id: string;
  format: string;
  language: string;
  isbn?: string;
  publisher?: string;
  year: number;
}

export interface BookChapter {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  backdropUrl?: string;
  description: string;
  publishedYear: number;
  communityRating: number; // 1 to 10
  ratingCount: number;
  genres: string[];
  tropes: string[];
  format: ReadingFormat;
  isLegalFreeReader: boolean; // Reading progress % is ONLY enabled for legally free titles
  totalPages: number;
  editions: BookEdition[];
  chapters?: BookChapter[];
  buyLink?: string;
}

export interface LibraryItem {
  bookId: string;
  status: ShelfStatus;
  userRating?: number; // 1 to 10 with 0.5 steps
  progressPages?: number;
  progressPercent?: number; // active only for legal reader books
  startDate?: string;
  finishDate?: string;
  privateNotes?: string;
  customLists: string[];
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1.0 to 10.0
  content: string;
  containsSpoilers: boolean;
  helpfulCount: number;
  createdAt: string;
  replies?: {
    id: string;
    userName: string;
    userAvatar: string;
    content: string;
    createdAt: string;
  }[];
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bannerUrl?: string;
  bio: string;
  level: number;
  points: number;
  streakDays: number;
  booksReadTotal: number;
  annualGoal: number;
  rank: number;
  rankPercentile: string;
  favoriteBookIds: string[];
  privacy: {
    readingActivity: 'Public' | 'Friends Only' | 'Private';
    libraryShelves: 'Public' | 'Friends Only' | 'Private';
    reviewsAndRatings: 'Public' | 'Friends Only' | 'Private';
    statsAndStreaks: 'Public' | 'Friends Only' | 'Private';
  };
}

export interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  online: boolean;
  currentBook?: string;
  currentBookCover?: string;
  progressPercent?: number;
}

export interface ActivityItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  bookTitle: string;
  type: 'comment' | 'rating' | 'progress' | 'quote';
  content: string;
  rating?: number;
  timestamp: string;
  containsSpoilers?: boolean;
}

export interface SocialPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  timestamp: string;
  text: string;
  bookAttached?: {
    id: string;
    title: string;
    author: string;
    cover: string;
  };
  imageUrl?: string;
  containsSpoilers?: boolean;
  likes: number;
  hasLiked?: boolean;
  comments: {
    id: string;
    userName: string;
    userAvatar: string;
    content: string;
    timestamp: string;
    containsSpoilers?: boolean;
  }[];
}

export interface Community {
  id: string;
  name: string;
  tagline: string;
  description: string;
  banner: string;
  icon: string;
  memberCount: number;
  userRole?: 'Owner' | 'Member'; // Exactly two roles per design.md!
  channels: string[];
  announcements: {
    id: string;
    title: string;
    content: string;
    date: string;
  }[];
}

export interface ReadingClub {
  id: string;
  name: string;
  description: string;
  activeBookId: string;
  activeBook: Book;
  startDate: string;
  targetCompletionDate: string; // Strictly book-level per design.md
  members: {
    id: string;
    name: string;
    avatar: string;
  }[];
  discussionMessages: {
    id: string;
    userName: string;
    userAvatar: string;
    message: string;
    timestamp: string;
  }[];
  nextBookPoll: {
    options: { bookTitle: string; votes: number }[];
    userVoted?: string;
  };
}

export interface BookDiscussion {
  id: string;
  bookId: string;
  category:
    | 'General Discussion'
    | 'Theories & Predictions'
    | 'Character Analysis'
    | 'Fan Discussions & Art'
    | 'Polls';
  title: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  containsSpoilers: boolean;
  upvotes: number;
  timestamp: string;
  comments: {
    id: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    containsSpoilers?: boolean;
    timestamp: string;
  }[];
}

export interface MuseMessage {
  id: string;
  sender: 'user' | 'muse';
  content: string;
  bookRecommendations?: Book[];
  containsSpoilers?: boolean;
  timestamp: string;
}

export interface MuseConversation {
  id: string;
  title: string;
  createdAt: string;
  messages: MuseMessage[];
}

export interface MusePermissions {
  allowLibraryAccess: boolean;
  allowRatingHistoryAccess: boolean;
  allowPrivateNotesAccess: boolean;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  bookAttachment?: Book;
}

export interface MessageThread {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  isOnline: boolean;
  unreadCount: number;
  messages: DirectMessage[];
}

export interface MissingBookSubmission {
  id: string;
  title: string;
  author: string;
  format: string;
  isbn?: string;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface MetadataCorrectionDiff {
  id: string;
  bookId: string;
  bookTitle: string;
  submittedBy: string;
  submittedAt: string;
  field: 'title' | 'author' | 'synopsis' | 'cover';
  currentValue: string;
  proposedValue: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface ReportedItem {
  id: string;
  type: 'review' | 'discussion' | 'post';
  contentId: string;
  reportedBy: string;
  reason: string;
  contentSnippet: string;
  reportedAt: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

