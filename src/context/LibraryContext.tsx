import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShelfStatus, LibraryItem, Book } from '../types';
import { mockBooks } from '../data/mockData';
import { getOpenLibraryWork, normalizeWorkId } from '../services/openLibraryService';

interface LibraryContextType {
  library: Record<string, LibraryItem>;
  books: Book[];
  activeBook: Book;
  updateShelfStatus: (bookId: string, status: ShelfStatus) => void;
  updateRating: (bookId: string, rating: number) => void;
  updateProgress: (bookId: string, pages: number, percent?: number) => void;
  updatePrivateNotes: (bookId: string, notes: string) => void;
  addCustomList: (bookId: string, listName: string) => void;
  customLists: string[];
  createCustomList: (name: string) => void;
  getBookById: (id: string) => Book | undefined;
  fetchBookDetails: (id: string) => Promise<Book | null>;
  registerBook: (book: Book) => void;
  registerBooks: (books: Book[]) => void;
  getLibraryItem: (bookId: string) => LibraryItem | undefined;
}

const initialLibrary: Record<string, LibraryItem> = {
  hp7: {
    bookId: 'hp7',
    status: 'Currently Reading',
    userRating: 9.5,
    progressPages: 354,
    startDate: '2026-10-25',
    privateNotes: 'Check chapter 33 carefully for wand allegiance clues.',
    customLists: ['Autumn Favorites', 'All-Time Epics'],
  },
  alchemist: {
    bookId: 'alchemist',
    status: 'Completed',
    userRating: 9.0,
    progressPages: 208,
    finishDate: '2026-09-12',
    customLists: ['Philosophical Journeys'],
  },
  '1984': {
    bookId: '1984',
    status: 'Completed',
    userRating: 9.0,
    progressPages: 328,
    finishDate: '2026-08-04',
    customLists: ['Dystopian Must-Reads'],
  },
  brave_new_world: {
    bookId: 'brave_new_world',
    status: 'Plan to Read',
    customLists: ['Dystopian Must-Reads'],
  },
  one_hundred_years: {
    bookId: 'one_hundred_years',
    status: 'Plan to Read',
    customLists: ['All-Time Epics'],
  },
  frankenstein: {
    bookId: 'frankenstein',
    status: 'Currently Reading',
    userRating: 10.0,
    progressPages: 140,
    progressPercent: 50,
    startDate: '2026-11-01',
    privateNotes: 'Victor’s hubris contrasts deeply with Walton’s initial curiosity.',
    customLists: ['Autumn Favorites', 'Gothic Masterpieces'],
  },
};

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Books registry initialized with curated foundation books, dynamically expanded with real Open Library records
  const [booksMap, setBooksMap] = useState<Record<string, Book>>(() => {
    const initial: Record<string, Book> = {};
    mockBooks.forEach((b) => {
      initial[b.id] = b;
    });
    return initial;
  });

  const [library, setLibrary] = useState<Record<string, LibraryItem>>(() => {
    // Try to load persisted user library state from localStorage
    try {
      const saved = localStorage.getItem('vellora_user_library');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return initialLibrary;
  });

  const [customLists, setCustomLists] = useState<string[]>([
    'Autumn Favorites',
    'All-Time Epics',
    'Gothic Masterpieces',
    'Philosophical Journeys',
    'Dystopian Must-Reads',
  ]);

  // Persist user library state
  useEffect(() => {
    try {
      localStorage.setItem('vellora_user_library', JSON.stringify(library));
    } catch {
      // Ignore
    }
  }, [library]);

  const books = Object.values(booksMap);
  const activeBook = booksMap['hp7'] || books[0];

  const registerBook = (book: Book) => {
    if (!book || !book.id) return;
    setBooksMap((prev) => ({
      ...prev,
      [book.id]: {
        ...prev[book.id],
        ...book,
      },
    }));
  };

  const registerBooks = (newBooks: Book[]) => {
    if (!newBooks || newBooks.length === 0) return;
    setBooksMap((prev) => {
      const updated = { ...prev };
      newBooks.forEach((b) => {
        if (b && b.id) {
          updated[b.id] = {
            ...updated[b.id],
            ...b,
          };
        }
      });
      return updated;
    });
  };

  const updateShelfStatus = (bookId: string, status: ShelfStatus) => {
    setLibrary((prev) => {
      const existing = prev[bookId] || {
        bookId,
        status,
        customLists: [],
      };
      return {
        ...prev,
        [bookId]: {
          ...existing,
          status,
          ...(status === 'Completed' ? { finishDate: new Date().toISOString().split('T')[0] } : {}),
          ...(status === 'Currently Reading' && !existing.startDate
            ? { startDate: new Date().toISOString().split('T')[0] }
            : {}),
        },
      };
    });
  };

  const updateRating = (bookId: string, rating: number) => {
    const clampedRating = Math.min(10, Math.max(1, Math.round(rating * 2) / 2));
    setLibrary((prev) => {
      const existing = prev[bookId] || {
        bookId,
        status: 'Completed',
        customLists: [],
      };
      return {
        ...prev,
        [bookId]: {
          ...existing,
          userRating: clampedRating,
        },
      };
    });
  };

  const updateProgress = (bookId: string, pages: number, percent?: number) => {
    const book = getBookById(bookId);
    setLibrary((prev) => {
      const existing = prev[bookId] || {
        bookId,
        status: 'Currently Reading',
        customLists: [],
      };

      const computedPercent =
        book?.isLegalFreeReader && percent !== undefined
          ? percent
          : book?.isLegalFreeReader && book.totalPages > 0
          ? Math.min(100, Math.round((pages / book.totalPages) * 100))
          : undefined;

      return {
        ...prev,
        [bookId]: {
          ...existing,
          progressPages: pages,
          progressPercent: computedPercent,
        },
      };
    });
  };

  const updatePrivateNotes = (bookId: string, notes: string) => {
    setLibrary((prev) => {
      const existing = prev[bookId] || {
        bookId,
        status: 'Currently Reading',
        customLists: [],
      };
      return {
        ...prev,
        [bookId]: {
          ...existing,
          privateNotes: notes,
        },
      };
    });
  };

  const addCustomList = (bookId: string, listName: string) => {
    setLibrary((prev) => {
      const existing = prev[bookId] || {
        bookId,
        status: 'Plan to Read',
        customLists: [],
      };
      if (existing.customLists.includes(listName)) return prev;
      return {
        ...prev,
        [bookId]: {
          ...existing,
          customLists: [...existing.customLists, listName],
        },
      };
    });
  };

  const createCustomList = (name: string) => {
    if (name.trim() && !customLists.includes(name.trim())) {
      setCustomLists((prev) => [...prev, name.trim()]);
    }
  };

  const getBookById = (id: string): Book | undefined => {
    if (!id) return undefined;
    const normalized = normalizeWorkId(id);
    return booksMap[normalized] || booksMap[id];
  };

  const fetchBookDetails = async (id: string): Promise<Book | null> => {
    if (!id) return null;
    const normalized = normalizeWorkId(id);
    const existing = booksMap[normalized] || booksMap[id];

    // If already in memory with full description and editions, return it immediately
    if (existing && existing.description && existing.editions && existing.editions.length > 0) {
      return existing;
    }

    try {
      const fetched = await getOpenLibraryWork(normalized);
      if (fetched) {
        registerBook(fetched);
        return fetched;
      }
    } catch (err) {
      console.warn(`[LibraryContext] Could not fetch Open Library book ${id}:`, err);
    }

    return existing || null;
  };

  const getLibraryItem = (bookId: string) => library[bookId];

  return (
    <LibraryContext.Provider
      value={{
        library,
        books,
        activeBook,
        updateShelfStatus,
        updateRating,
        updateProgress,
        updatePrivateNotes,
        addCustomList,
        customLists,
        createCustomList,
        getBookById,
        fetchBookDetails,
        registerBook,
        registerBooks,
        getLibraryItem,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
