import React, { createContext, useContext, useState } from 'react';
import {
  Friend,
  ActivityItem,
  SocialPost,
  Community,
  ReadingClub,
  BookDiscussion,
  MessageThread,
  MissingBookSubmission,
  MetadataCorrectionDiff,
  ReportedItem,
} from '../types';
import {
  mockFriends,
  mockActivities,
  mockSocialPosts,
  mockCommunities,
  mockClubs,
  mockDiscussions,
  mockMessageThreads,
  mockMissingSubmissions,
  mockMetadataDiffs,
  mockReportedItems,
  currentUser,
} from '../data/mockData';

interface SocialContextType {
  friends: Friend[];
  activities: ActivityItem[];
  posts: SocialPost[];
  communities: Community[];
  clubs: ReadingClub[];
  discussions: BookDiscussion[];
  threads: MessageThread[];
  activeThreadId: string;
  setActiveThreadId: (id: string) => void;
  sendDirectMessage: (text: string) => void;
  createPost: (text: string, imageUrl?: string, bookId?: string, containsSpoilers?: boolean) => void;
  toggleLikePost: (postId: string) => void;
  addPostComment: (postId: string, text: string, containsSpoilers?: boolean) => void;
  joinCommunity: (id: string) => void;
  leaveCommunity: (id: string) => void;
  voteClubPoll: (clubId: string, optionTitle: string) => void;
  addDiscussionPost: (
    bookId: string,
    category: BookDiscussion['category'],
    title: string,
    content: string,
    containsSpoilers: boolean
  ) => void;
  addDiscussionComment: (
    discussionId: string,
    content: string,
    containsSpoilers: boolean
  ) => void;
  // Admin queues
  missingSubmissions: MissingBookSubmission[];
  approveMissingSubmission: (id: string) => void;
  rejectMissingSubmission: (id: string) => void;
  metadataDiffs: MetadataCorrectionDiff[];
  acceptMetadataDiff: (id: string) => void;
  rejectMetadataDiff: (id: string) => void;
  reportedItems: ReportedItem[];
  resolveReportedItem: (id: string) => void;
  submitMissingBook: (title: string, author: string, format: string, isbn?: string) => void;
  submitMetadataCorrection: (
    bookId: string,
    bookTitle: string,
    field: 'title' | 'author' | 'synopsis' | 'cover',
    currentVal: string,
    proposedVal: string
  ) => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [friends] = useState<Friend[]>(mockFriends);
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);
  const [posts, setPosts] = useState<SocialPost[]>(mockSocialPosts);
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [clubs, setClubs] = useState<ReadingClub[]>(mockClubs);
  const [discussions, setDiscussions] = useState<BookDiscussion[]>(mockDiscussions);
  const [threads, setThreads] = useState<MessageThread[]>(mockMessageThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>('thread_brittany');

  const [missingSubmissions, setMissingSubmissions] = useState<MissingBookSubmission[]>(mockMissingSubmissions);
  const [metadataDiffs, setMetadataDiffs] = useState<MetadataCorrectionDiff[]>(mockMetadataDiffs);
  const [reportedItems, setReportedItems] = useState<ReportedItem[]>(mockReportedItems);

  const sendDirectMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setThreads((prev) =>
      prev.map((t) => (t.id === activeThreadId ? { ...t, messages: [...t.messages, newMsg] } : t))
    );
  };

  const createPost = (text: string, imageUrl?: string, _bookId?: string, containsSpoilers?: boolean) => {
    if (!text.trim()) return;
    const newPost: SocialPost = {
      id: `post_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.displayName,
      userAvatar: currentUser.avatarUrl,
      timestamp: 'Just now',
      text,
      imageUrl,
      containsSpoilers: !!containsSpoilers,
      likes: 0,
      hasLiked: false,
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasLiked = !p.hasLiked;
          return {
            ...p,
            hasLiked,
            likes: hasLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const addPostComment = (postId: string, text: string, containsSpoilers?: boolean) => {
    if (!text.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      userName: currentUser.displayName,
      userAvatar: currentUser.avatarUrl,
      content: text,
      timestamp: 'Just now',
      containsSpoilers,
    };
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p))
    );
  };

  const joinCommunity = (id: string) => {
    setCommunities((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, userRole: 'Member' as const, memberCount: c.memberCount + 1 } : c
      )
    );
  };

  const leaveCommunity = (id: string) => {
    setCommunities((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, userRole: undefined, memberCount: Math.max(0, c.memberCount - 1) } : c
      )
    );
  };

  const voteClubPoll = (clubId: string, optionTitle: string) => {
    setClubs((prev) =>
      prev.map((c) => {
        if (c.id === clubId) {
          return {
            ...c,
            nextBookPoll: {
              options: c.nextBookPoll.options.map((opt) =>
                opt.bookTitle === optionTitle ? { ...opt, votes: opt.votes + 1 } : opt
              ),
              userVoted: optionTitle,
            },
          };
        }
        return c;
      })
    );
  };

  const addDiscussionPost = (
    bookId: string,
    category: BookDiscussion['category'],
    title: string,
    content: string,
    containsSpoilers: boolean
  ) => {
    const newDisc: BookDiscussion = {
      id: `disc_${Date.now()}`,
      bookId,
      category,
      title,
      authorName: currentUser.displayName,
      authorAvatar: currentUser.avatarUrl,
      content,
      containsSpoilers,
      upvotes: 1,
      timestamp: 'Just now',
      comments: [],
    };
    setDiscussions((prev) => [newDisc, ...prev]);

    // Also add to activities
    setActivities((prev) => [
      {
        id: `act_${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.displayName,
        userAvatar: currentUser.avatarUrl,
        bookTitle: title,
        type: 'comment',
        content,
        timestamp: 'Just now',
        containsSpoilers,
      },
      ...prev,
    ]);
  };

  const addDiscussionComment = (
    discussionId: string,
    content: string,
    containsSpoilers: boolean
  ) => {
    const newComment = {
      id: `comm_${Date.now()}`,
      authorName: currentUser.displayName,
      authorAvatar: currentUser.avatarUrl,
      content,
      containsSpoilers,
      timestamp: 'Just now',
    };
    setDiscussions((prev) =>
      prev.map((d) =>
        d.id === discussionId ? { ...d, comments: [...d.comments, newComment] } : d
      )
    );
  };

  const approveMissingSubmission = (id: string) => {
    setMissingSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'approved' as const } : s))
    );
  };

  const rejectMissingSubmission = (id: string) => {
    setMissingSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'rejected' as const } : s))
    );
  };

  const acceptMetadataDiff = (id: string) => {
    setMetadataDiffs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'accepted' as const } : d))
    );
  };

  const rejectMetadataDiff = (id: string) => {
    setMetadataDiffs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'rejected' as const } : d))
    );
  };

  const resolveReportedItem = (id: string) => {
    setReportedItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'resolved' as const } : r))
    );
  };

  const submitMissingBook = (title: string, author: string, format: string, isbn?: string) => {
    const sub: MissingBookSubmission = {
      id: `sub_${Date.now()}`,
      title,
      author,
      format,
      isbn,
      submittedBy: currentUser.displayName,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setMissingSubmissions((prev) => [sub, ...prev]);
  };

  const submitMetadataCorrection = (
    bookId: string,
    bookTitle: string,
    field: 'title' | 'author' | 'synopsis' | 'cover',
    currentVal: string,
    proposedVal: string
  ) => {
    const diff: MetadataCorrectionDiff = {
      id: `diff_${Date.now()}`,
      bookId,
      bookTitle,
      submittedBy: currentUser.displayName,
      submittedAt: new Date().toISOString().split('T')[0],
      field,
      currentValue: currentVal,
      proposedValue: proposedVal,
      status: 'pending',
    };
    setMetadataDiffs((prev) => [diff, ...prev]);
  };

  return (
    <SocialContext.Provider
      value={{
        friends,
        activities,
        posts,
        communities,
        clubs,
        discussions,
        threads,
        activeThreadId,
        setActiveThreadId,
        sendDirectMessage,
        createPost,
        toggleLikePost,
        addPostComment,
        joinCommunity,
        leaveCommunity,
        voteClubPoll,
        addDiscussionPost,
        addDiscussionComment,
        missingSubmissions,
        approveMissingSubmission,
        rejectMissingSubmission,
        metadataDiffs,
        acceptMetadataDiff,
        rejectMetadataDiff,
        reportedItems,
        resolveReportedItem,
        submitMissingBook,
        submitMetadataCorrection,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};

