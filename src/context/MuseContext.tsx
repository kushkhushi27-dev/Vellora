import React, { createContext, useContext, useState } from 'react';
import { MuseConversation, MuseMessage, MusePermissions } from '../types';
import { mockBooks } from '../data/mockData';

interface MuseContextType {
  conversations: MuseConversation[];
  activeConversationId: string;
  permissions: MusePermissions;
  updatePermissions: (updates: Partial<MusePermissions>) => void;
  sendMessage: (prompt: string) => void;
  startNewThread: () => void;
  selectConversation: (id: string) => void;
}

const initialConversations: MuseConversation[] = [
  {
    id: 'conv_1',
    title: 'Gothic Atmosphere & Tragic Antagonists',
    createdAt: 'Today, 2:15 PM',
    messages: [
      {
        id: 'm_init',
        sender: 'muse',
        content: 'Greetings, Amy. I am Muse, your literary companion. How may I illuminate your reading journey today?',
        timestamp: '2:15 PM',
      },
      {
        id: 'm_user_1',
        sender: 'user',
        content: 'I loved the philosophical melancholy in Frankenstein and the dark romanticism of Dorian Gray. What should I explore next that captures that sense of gothic obsession?',
        timestamp: '2:16 PM',
      },
      {
        id: 'm_muse_1',
        sender: 'muse',
        content: 'A sublime trajectory. Given your affinity for gothic introspection and moral decay, I strongly recommend Carlos Ruiz Zafón’s **The Shadow of the Wind** and Frank Herbert’s philosophical masterpiece **Dune**.',
        bookRecommendations: [mockBooks[7], mockBooks[6]], // Shadow of the Wind and Dune
        containsSpoilers: false,
        timestamp: '2:17 PM',
      },
      {
        id: 'm_muse_spoiler',
        sender: 'muse',
        content: 'Regarding the character arcs in *The Shadow of the Wind*: Julian Carax’s real connection to Daniel Sempere mirrors the classic gothic double motif, where the author and the reader inadvertently live identical tragedies across time.',
        containsSpoilers: true, // MUST BE SHIELDED!
        timestamp: '2:17 PM',
      },
    ],
  },
  {
    id: 'conv_2',
    title: 'Epistolary Narratives & Modern Classics',
    createdAt: 'Nov 5, 2026',
    messages: [
      {
        id: 'm_conv2_1',
        sender: 'muse',
        content: 'Welcome back. Exploring multi-perspective epistolary works expands the thematic depth of any literary circle.',
        timestamp: 'Nov 5, 4:00 PM',
      },
    ],
  },
];

const MuseContext = createContext<MuseContextType | undefined>(undefined);

export const MuseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<MuseConversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv_1');
  const [permissions, setPermissions] = useState<MusePermissions>({
    allowLibraryAccess: true,
    allowRatingHistoryAccess: true,
    allowPrivateNotesAccess: false, // Default false for safety
  });

  const updatePermissions = (updates: Partial<MusePermissions>) => {
    setPermissions((prev) => ({ ...prev, ...updates }));
  };

  const selectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const startNewThread = () => {
    const newId = `conv_${Date.now()}`;
    const newConv: MuseConversation = {
      id: newId,
      title: 'New Literary Inquiry',
      createdAt: 'Just now',
      messages: [
        {
          id: `m_${Date.now()}`,
          sender: 'muse',
          content: 'Greetings. Tell me about the emotions, tropes, or atmospheric worlds you wish to discover today.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newId);
  };

  const sendMessage = (prompt: string) => {
    if (!prompt.trim()) return;

    const userMsg: MuseMessage = {
      id: `m_user_${Date.now()}`,
      sender: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConversationId) {
          return {
            ...c,
            title: c.title === 'New Literary Inquiry' ? prompt.slice(0, 32) + '...' : c.title,
            messages: [...c.messages, userMsg],
          };
        }
        return c;
      })
    );

    // Context-aware simulated response from Muse
    setTimeout(() => {
      let museReply = 'Your inquiry resonates deeply with timeless literary archetypes.';
      let recs = [mockBooks[0], mockBooks[5]];
      let hasSpoiler = false;

      const lower = prompt.toLowerCase();
      if (lower.includes('fantasy') || lower.includes('magic') || lower.includes('epic')) {
        museReply = `Based on your library${
          permissions.allowLibraryAccess ? ' and reading records' : ''
        }, I recommend diving into celestial worldbuilding with *Figma-tes: Cross the Celestial Gates* alongside *Harry Potter and the Deathly Hallows*.`;
        recs = [mockBooks[5], mockBooks[0]];
      } else if (lower.includes('dystopia') || lower.includes('sci-fi') || lower.includes('future')) {
        museReply = `For deep societal critiques, compare Orwell's *1984* with Huxley's *Brave New World*. Notice how Orwell feared external oppression while Huxley warned of pleasant, voluntary pacification.`;
        recs = [mockBooks[2], mockBooks[3]];
      } else if (lower.includes('spoiler') || lower.includes('ending') || lower.includes('death')) {
        museReply = `In the climactic duel of the Battle of Hogwarts, Voldemort’s Killing Curse rebounds from Harry’s Expelliarmus because the Elder Wand refuses to strike its true master.`;
        hasSpoiler = true;
      } else {
        museReply = `Reflecting on your journey: great literature is never about mere escapism; it mirrors the secret architecture of our own minds. Consider exploring *The Picture of Dorian Gray* or *One Hundred Years of Solitude*.`;
        recs = [mockBooks[4], mockBooks[4]];
      }

      const museMsg: MuseMessage = {
        id: `m_muse_${Date.now()}`,
        sender: 'muse',
        content: museReply,
        bookRecommendations: hasSpoiler ? undefined : recs,
        containsSpoilers: hasSpoiler,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConversationId) {
            return {
              ...c,
              messages: [...c.messages, museMsg],
            };
          }
          return c;
        })
      );
    }, 600);
  };

  return (
    <MuseContext.Provider
      value={{
        conversations,
        activeConversationId,
        permissions,
        updatePermissions,
        sendMessage,
        startNewThread,
        selectConversation,
      }}
    >
      {children}
    </MuseContext.Provider>
  );
};

export const useMuse = () => {
  const context = useContext(MuseContext);
  if (!context) {
    throw new Error('useMuse must be used within a MuseProvider');
  }
  return context;
};

