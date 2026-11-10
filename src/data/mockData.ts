import {
  Book,
  UserProfile,
  Friend,
  ActivityItem,
  SocialPost,
  Community,
  ReadingClub,
  BookDiscussion,
  Review,
  MissingBookSubmission,
  MetadataCorrectionDiff,
  ReportedItem,
  MessageThread,
} from '../types';

export const currentUser: UserProfile = {
  id: 'user_amy',
  username: 'amywinnar',
  displayName: 'Amy Winnar',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  bannerUrl: 'https://images.unsplash.com/photo-1507842229451-79b1be886a20?auto=format&fit=crop&w=1200&q=80',
  bio: 'Voracious reader of gothic fantasy and philosophical epics. Always annotated, always seeking hidden marginalia.',
  level: 2,
  points: 88242,
  streakDays: 7,
  booksReadTotal: 34,
  annualGoal: 50,
  rank: 2339,
  rankPercentile: 'Top 1%',
  favoriteBookIds: ['hp7', 'frankenstein', 'dorian_gray', 'wind_name'],
  privacy: {
    readingActivity: 'Public',
    libraryShelves: 'Public',
    reviewsAndRatings: 'Public',
    statsAndStreaks: 'Public',
  },
};

export const mockFriends: Friend[] = [
  {
    id: 'f_brittany',
    username: 'brittanysullivan',
    displayName: 'Brittany Sullivan',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    online: true,
    currentBook: 'Harry Potter and the Deathly Hallows',
    progressPercent: 62,
  },
  {
    id: 'f_tonya',
    username: 'tonyagray',
    displayName: 'Tonya Gray',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    online: true,
    currentBook: 'The Alchemist',
    progressPercent: 48,
  },
  {
    id: 'f_charlotte',
    username: 'charlotteparker',
    displayName: 'Charlotte Parker',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    online: false,
    currentBook: '1984',
    progressPercent: 88,
  },
  {
    id: 'f_carson',
    username: 'carsonp',
    displayName: 'CarsonP',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    online: true,
    currentBook: 'Dune',
    progressPercent: 34,
  },
  {
    id: 'f_jordan',
    username: 'jordanhaze',
    displayName: 'Jordan Haze',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
    online: false,
    currentBook: 'Frankenstein',
    progressPercent: 91,
  },
  {
    id: 'f_miley',
    username: 'mileycyrus',
    displayName: 'Miley Cyrus',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=150&q=80',
    online: true,
    currentBook: 'Harry Potter and the Deathly Hallows',
    progressPercent: 78,
  },
  {
    id: 'f_shannon',
    username: 'shannonthebest',
    displayName: 'Shannonthebest',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    online: true,
    currentBook: 'Harry Potter and the Deathly Hallows',
    progressPercent: 55,
  },
  {
    id: 'f_cardi',
    username: 'cardib',
    displayName: 'Cardi B',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    online: false,
    currentBook: 'The Shadow of the Wind',
    progressPercent: 15,
  },
];

export const mockBooks: Book[] = [
  {
    id: 'hp7',
    title: 'Harry Potter and the Deathly Hallows',
    author: 'J.K. Rowling',
    coverUrl: 'https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    description: 'The final confrontation between Harry Potter and Lord Voldemort. Harry, Ron, and Hermione leave Hogwarts to track down and destroy Voldemort’s Horcruxes in an unforgiving journey of sacrifice, memory, and legendary destiny.',
    publishedYear: 2007,
    communityRating: 9.3,
    ratingCount: 14820,
    genres: ['High Fantasy', 'Adventure', 'Mystery', 'YA'],
    tropes: ['The Chosen One', 'Found Family', 'Heroic Sacrifice', 'Dark Prophecy'],
    format: 'E-Book',
    isLegalFreeReader: false, // Physical/Commercial title per design.md (no automated reading % progress bar)
    totalPages: 759,
    buyLink: 'https://www.bloomsbury.com',
    editions: [
      { id: 'ed_1', format: 'Deluxe Hardcover', language: 'English', isbn: '978-0545010221', publisher: 'Bloomsbury', year: 2007 },
      { id: 'ed_2', format: 'Kindle Digital', language: 'English', publisher: 'Pottermore', year: 2012 },
      { id: 'ed_3', format: 'French Translation', language: 'French', publisher: 'Gallimard Jeunesse', year: 2007 }
    ]
  },
  {
    id: 'alchemist',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80',
    description: 'A magical fable about Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure as extravagant as any ever found.',
    publishedYear: 1988,
    communityRating: 8.8,
    ratingCount: 22100,
    genres: ['Philosophical Fiction', 'Allegory', 'Adventure'],
    tropes: ['Personal Legend', 'Spiritual Journey', 'Desert Odyssey'],
    format: 'E-Book',
    isLegalFreeReader: false,
    totalPages: 208,
    editions: [
      { id: 'ed_alc1', format: 'Paperback Anniversary', language: 'English', publisher: 'HarperOne', year: 1993 }
    ]
  },
  {
    id: '1984',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80',
    description: 'Winston Smith toes the Party line, rewriting history to satisfy the Ministry of Truth. With every lie he writes, Winston grows to hate the Party that yearns for power for its own sake.',
    publishedYear: 1949,
    communityRating: 9.1,
    ratingCount: 31200,
    genres: ['Dystopian', 'Political Fiction', 'Sci-Fi'],
    tropes: ['Totalitarian State', 'Forbidden Romance', 'Memory Manipulation', 'Thought Police'],
    format: 'E-Book',
    isLegalFreeReader: false,
    totalPages: 328,
    editions: [
      { id: 'ed_1984_1', format: 'Centennial Edition', language: 'English', publisher: 'Secker & Warburg', year: 1949 }
    ]
  },
  {
    id: 'brave_new_world',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    description: 'A prophetic masterpiece envisioning a genetically conditioned, hedonistic dystopia maintained through technological consumerism and soma tablets.',
    publishedYear: 1932,
    communityRating: 8.7,
    ratingCount: 16500,
    genres: ['Dystopian', 'Philosophical', 'Classic'],
    tropes: ['Manufactured Society', 'Loss of Humanity', 'Individual Resistance'],
    format: 'E-Book',
    isLegalFreeReader: false,
    totalPages: 288,
    editions: [
      { id: 'ed_bnw_1', format: 'Standard Paperback', language: 'English', publisher: 'Chatto & Windus', year: 1932 }
    ]
  },
  {
    id: 'one_hundred_years',
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel García Márquez',
    coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=600&q=80',
    description: 'The monumental chronicle of the Buendía family in the mythical town of Macondo, blending magical realism with historical tragedy.',
    publishedYear: 1967,
    communityRating: 9.4,
    ratingCount: 19400,
    genres: ['Magical Realism', 'Literary Fiction', 'Historical'],
    tropes: ['Generational Curse', 'Cyclical Time', 'Solitude and Myth'],
    format: 'E-Book',
    isLegalFreeReader: false,
    totalPages: 417,
    editions: [
      { id: 'ed_ohy_1', format: 'Harper Perennial Modern Classics', language: 'Spanish/English', publisher: 'Harper', year: 2006 }
    ]
  },
  {
    id: 'frankenstein',
    title: 'Frankenstein: The Modern Prometheus',
    author: 'Mary Shelley',
    coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80',
    description: 'Public domain classic. Victor Frankenstein discovers the secret of animating lifeless matter, creating a sentient creature only to recoil in terror from his creation, sparking an existential gothic tragedy.',
    publishedYear: 1818,
    communityRating: 9.0,
    ratingCount: 18450,
    genres: ['Gothic Fiction', 'Horror', 'Sci-Fi Classic'],
    tropes: ['Mad Scientist', 'Monstrous Rejection', 'Hubris of Creation', 'Vengeance Pact'],
    format: 'E-Book',
    isLegalFreeReader: true, // Fully readable in Vellora Legal Web Reader!
    totalPages: 280,
    editions: [
      { id: 'ed_frank_pub', format: 'Vellora Legal Digital Edition', language: 'English', publisher: 'Project Gutenberg / Vellora Archive', year: 1818 }
    ],
    chapters: [
      {
        id: 'ch1',
        title: 'Letter I & Chapter I: The Spark of Ambition',
        paragraphs: [
          'You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking.',
          'I am already far north of London, and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight. Do you understand this feeling? This breeze, which has travelled from the regions towards which I am advancing, gives me a foretaste of those icy climes.',
          'I try in vain to be persuaded that the pole is the seat of frost and desolation; it ever presents itself to my imagination as the region of beauty and delight. There, Margaret, the sun is for ever visible, its broad disk just skirting the horizon and diffusing a perpetual splendour.',
          'There snow and frost are banished; and, sailing over a calm sea, we may be wafted to a land surpassing in wonders and in beauty every region hitherto discovered on the habitable globe. Its productions and features may be without example, as the phenomena of the heavenly bodies undoubtedly are in those undiscovered solitudes.'
        ]
      },
      {
        id: 'ch2',
        title: 'Chapter II: The Alchemical Obsession',
        paragraphs: [
          'We were brought up together; there was not quite a year difference between our ages. I need not say that we were strangers to any species of disunion or dispute. Harmony was the soul of our companionship, and the diversity and contrast that subsided in our characters drew us nearer together.',
          'Elizabeth was of a calmer and more concentrated disposition; but, with all my passion, I was capable of a more intense application and was more deeply smitten with the thirst for knowledge. She busied herself with following the aerial creations of the poets; and in the majestic and wondrous scenes which surrounded our Swiss home.',
          'Natural philosophy is the genius that has regulated my fate; I desire, therefore, in this narration, to state those facts which led to my predilection for that science. When I was thirteen years of age we all went on a party of pleasure to the baths near Thonon; the inclemency of the weather obliged us to remain confined.'
        ]
      },
      {
        id: 'ch3',
        title: 'Chapter III: The Breath of Life',
        paragraphs: [
          'It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet.',
          'It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.',
          'How can I describe my emotions at this catastrophe, or how delineate the wretch whom with such infinite pains and care I had endeavoured to form? His limbs were in proportion, and I had selected his features as beautiful. Beautiful! Great God! His yellow skin scarcely covered the work of muscles and arteries beneath.'
        ]
      }
    ]
  },
  {
    id: 'dorian_gray',
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    description: 'Enthralled by his own youth and beauty reflected in a portrait painted by Basil Hallward, Dorian Gray sells his soul so that the portrait will age while he remains forever youthful and unblemished.',
    publishedYear: 1890,
    communityRating: 8.9,
    ratingCount: 14200,
    genres: ['Gothic Fiction', 'Philosophical', 'Decadent Movement'],
    tropes: ['Deal with the Devil', 'Double Life', 'Aesthetic Corruption', 'Vanity Curse'],
    format: 'E-Book',
    isLegalFreeReader: true,
    totalPages: 254,
    editions: [
      { id: 'ed_dg_1', format: 'Standard Legal Public Domain', language: 'English', publisher: 'Vellora Archive', year: 1890 }
    ],
    chapters: [
      {
        id: 'dg_ch1',
        title: 'The Studio of Basil Hallward',
        paragraphs: [
          'The studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac, or the more delicate perfume of the pink-flowering thorn.',
          'From the corner of the divan of Persian saddle-bags on which he was lying, smoking, as was his custom, innumerable cigarettes, Lord Henry Wotton could just catch the gleam of the honey-sweet and honey-coloured blossoms of a laburnum.',
          'In the centre of the room, clamped to an upright easel, stood the full-length portrait of a young man of extraordinary personal beauty, and in front of it, some little distance away, was sitting the artist himself, Basil Hallward.'
        ]
      }
    ]
  },
  {
    id: 'pride_and_prejudice',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    description: 'A timeless romantic comedy charting the emotional development of Elizabeth Bennet, who learns about the repercussions of hasty judgments and comes to appreciate the difference between the superficial and the essential.',
    publishedYear: 1813,
    communityRating: 9.2,
    ratingCount: 28900,
    genres: ['Romance', 'Classic', 'Regency'],
    tropes: ['Enemies to Lovers', 'Class Differences', 'Misunderstandings', 'Wit & Banter'],
    format: 'E-Book',
    isLegalFreeReader: true,
    totalPages: 432,
    editions: [
      { id: 'ed_pp_1', format: 'Definitive Public Domain', language: 'English', publisher: 'Vellora Classics', year: 1813 }
    ],
    chapters: [
      {
        id: 'pp_ch1',
        title: 'Chapter I: A Truth Universally Acknowledged',
        paragraphs: [
          'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
          'However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.',
          '"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"'
        ]
      }
    ]
  },
  {
    id: 'figma_tes',
    title: 'Figma-tes: Cross the Celestial Gates',
    author: 'Aria Thorne & Kaelen Voss',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80',
    description: 'Last task to become a master astral walker: uncover the ancient runes hidden in the floating citadels of Zephyria. A cinematic journey of celestial navigation and architectural sorcery.',
    publishedYear: 2024,
    communityRating: 9.6,
    ratingCount: 4210,
    genres: ['Cosmic Fantasy', 'High Fantasy', 'Adventure', 'Web Novel'],
    tropes: ['Academy of Magic', 'Ancient Technology', 'Mentor Betrayal', 'Cosmic Wonders'],
    format: 'Web Novel',
    isLegalFreeReader: true,
    totalPages: 540,
    editions: [
      { id: 'ed_fig_1', format: 'Digital Serialization', language: 'English', publisher: 'Vellora Originals', year: 2024 }
    ],
    chapters: [
      {
        id: 'ft_ch1',
        title: 'Prologue: The Horizon Above the Clouds',
        paragraphs: [
          'The sky did not end at the cloudline; it merely shifted hue from azure to imperial violet. On the roof of the rusted atmospheric tram, Kaelen lay listening to the humming converter coils.',
          'Beside him, the obsidian stray cat flicked its ears as the twin moons crossed into alignment. The exam was set for sunrise, and only three will cross the threshold of the Celestial Gate.'
        ]
      }
    ]
  },
  {
    id: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the spice melange.',
    publishedYear: 1965,
    communityRating: 9.2,
    ratingCount: 35100,
    genres: ['Science Fiction', 'Space Opera', 'Political Intrigue'],
    tropes: ['Messianic Warning', 'Ecology & Power', 'Feudal Empire', 'Desert Mysticism'],
    format: 'E-Book',
    isLegalFreeReader: false,
    totalPages: 688,
    editions: [
      { id: 'ed_dune_1', format: 'Deluxe Hardcover', language: 'English', publisher: 'Ace Books', year: 2019 }
    ]
  },
  {
    id: 'shadow_wind',
    title: 'The Shadow of the Wind',
    author: 'Carlos Ruiz Zafón',
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80',
    description: 'Barcelona, 1945: A young boy is taken by his antiquarian book dealer father to the secret Cemetery of Forgotten Books, where he selects an obscure title that plunges him into a dark web of murder and tragic love.',
    publishedYear: 2001,
    communityRating: 9.5,
    ratingCount: 16700,
    genres: ['Gothic Mystery', 'Historical Fiction', 'Magical Realism'],
    tropes: ['Book Within a Book', 'Lost Author', 'Shadowed Past', 'Rainy Barcelona'],
    format: 'E-Book',
    isLegalFreeReader: false,
    totalPages: 487,
    editions: [
      { id: 'ed_sow_1', format: 'Penguin Modern Classics', language: 'English', publisher: 'Penguin', year: 2004 }
    ]
  },
  {
    id: 'silent_patient',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    description: 'Alicia Berenson’s life is seemingly perfect. Then, one evening, she shoots her husband five times in the face and never speaks another word.',
    publishedYear: 2019,
    communityRating: 8.9,
    ratingCount: 26400,
    genres: ['Psychological Fiction', 'Thriller', 'Mystery'],
    tropes: ['Unreliable Narrator', 'Psychiatric Ward', 'Dark Twist'],
    format: 'E-Book',
    isLegalFreeReader: false,
    totalPages: 336,
    editions: [
      { id: 'ed_sp_1', format: 'Celadon Hardcover', language: 'English', publisher: 'Celadon Books', year: 2019 }
    ]
  },
  {
    id: 'wuthering_heights',
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
    description: 'A tempestuous tale of passionate, tempestuous love between Catherine Earnshaw and Heathcliff across the windswept Yorkshire moors.',
    publishedYear: 1847,
    communityRating: 8.7,
    ratingCount: 19800,
    genres: ['Romance', 'Dark Romance', 'Gothic Fiction', 'Classic'],
    tropes: ['Obsessive Love', 'Revenge Tragedy', 'Windswept Moors'],
    format: 'E-Book',
    isLegalFreeReader: true,
    totalPages: 416,
    editions: [
      { id: 'ed_wh_1', format: 'Public Domain Classics', language: 'English', publisher: 'Vellora Archive', year: 1847 }
    ]
  },
  {
    id: 'name_of_the_wind',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80',
    description: 'The heroic tale of Kvothe, from his childhood in a troupe of traveling players to years spent as an orphan in a crime-riddled city, to his daring entry into a legendary school of magic.',
    publishedYear: 2007,
    communityRating: 9.5,
    ratingCount: 38200,
    genres: ['Fantasy', 'High Fantasy', 'Adventure'],
    tropes: ['Magical University', 'Legendary Bard', 'Unsolved Mystery'],
    format: 'E-Book',
    isLegalFreeReader: false,
    totalPages: 662,
    editions: [
      { id: 'ed_notw_1', format: '10th Anniversary Deluxe', language: 'English', publisher: 'DAW', year: 2017 }
    ]
  },
  {
    id: 'neuromancer',
    title: 'Neuromancer',
    author: 'William Gibson',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    description: 'Case was the sharpest data-thief in the matrix until he crossed the wrong people and his nervous system was crippled. Now a mysterious new employer recruits him for an ultimate hack against a rogue AI.',
    publishedYear: 1984,
    communityRating: 9.0,
    ratingCount: 15300,
    genres: ['Science Fiction', 'Cyberpunk', 'Thriller'],
    tropes: ['Virtual Cyberspace', 'Transhuman Artificial Intelligence', 'High Tech Low Life'],
    format: 'E-Book',
    isLegalFreeReader: false,
    totalPages: 271,
    editions: [
      { id: 'ed_nm_1', format: 'Ace Science Fiction', language: 'English', publisher: 'Ace', year: 1984 }
    ]
  },
  {
    id: 'solo_leveling',
    title: 'Solo Leveling: Arise',
    author: 'Chugong',
    coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    description: 'In a world where hunters must battle deadly monsters to protect humanity, Sung Jinwoo, the weakest hunter of all mankind, finds himself in a mysterious dual dungeon that grants him the unique ability to level up infinitely.',
    publishedYear: 2018,
    communityRating: 9.6,
    ratingCount: 42100,
    genres: ['Web Novel', 'Fantasy', 'Action', 'Adventure'],
    tropes: ['Zero to Hero', 'System Quest', 'Shadow Monarch', 'Dungeon Gates'],
    format: 'Web Novel',
    isLegalFreeReader: true,
    totalPages: 520,
    editions: [
      { id: 'ed_sl_1', format: 'D&C Media Web Serialization', language: 'Korean/English', publisher: 'KakaoPage', year: 2018 }
    ]
  },
  {
    id: 'meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: 'The personal writings of the Roman Emperor, offering timeless spiritual reflections, stoic exercises, and counsel on navigating human fate, duty, and mortality.',
    publishedYear: 180,
    communityRating: 9.3,
    ratingCount: 31000,
    genres: ['Non-Fiction', 'Philosophical Fiction', 'Classic'],
    tropes: ['Stoic Philosophy', 'Imperial Reflections', 'Internal Resilience'],
    format: 'Non-Fiction',
    isLegalFreeReader: true,
    totalPages: 256,
    editions: [
      { id: 'ed_med_1', format: 'Vellora Philosophical Translation', language: 'English', publisher: 'Vellora Archive', year: 180 }
    ]
  }
];

export const mockActivities: ActivityItem[] = [
  {
    id: 'act_1',
    userId: 'f_shannon',
    userName: 'Shannonthebest',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    bookTitle: 'Harry Potter and the Deathly Hallows',
    type: 'comment',
    content: 'Why is Tom Riddle also referred to as the father?',
    timestamp: '3h ago',
  },
  {
    id: 'act_2',
    userId: 'f_miley',
    userName: 'Miley Cyrus',
    userAvatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=150&q=80',
    bookTitle: 'Harry Potter and the Deathly Hallows',
    type: 'comment',
    content: "It's cause his father was also named Tom Riddle",
    timestamp: '3h ago',
  },
  {
    id: 'act_3',
    userId: 'f_charlotte',
    userName: 'Charlotte Parker',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    bookTitle: 'Harry Potter and the Deathly Hallows',
    type: 'comment',
    content: 'Anyone else really really love chapter 12?',
    timestamp: '4h ago',
  },
  {
    id: 'act_4',
    userId: 'f_tonya',
    userName: 'Tonya Gray',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    bookTitle: 'Harry Potter and the Deathly Hallows',
    type: 'comment',
    content: "I'm not there yet, wait for meeeee!",
    timestamp: '4h ago',
  },
  {
    id: 'act_5',
    userId: 'user_amy',
    userName: 'Amy Winnar',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    bookTitle: 'Harry Potter and the Deathly Hallows',
    type: 'comment',
    content: 'When they revealed who it was, I was crying for 30m. The twist was so beautiful',
    timestamp: '2h ago',
  },
  {
    id: 'act_6',
    userId: 'f_brittany',
    userName: 'Brittany Sullivan',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    bookTitle: 'Harry Potter and the Deathly Hallows',
    type: 'comment',
    content: 'Wait until you get to 14...',
    timestamp: '3h ago',
  },
];

export const mockReviews: Review[] = [
  {
    id: 'rev_1',
    bookId: 'hp7',
    userId: 'f_brittany',
    userName: 'Brittany Sullivan',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 9.5,
    content: 'The narrative pacing in the forest of Dean and the Prince’s Tale remains one of the finest payoffs in modern high fantasy literature. You feel the weight of every lost friend.',
    containsSpoilers: false,
    helpfulCount: 42,
    createdAt: '2 days ago',
  },
  {
    id: 'rev_2',
    bookId: 'hp7',
    userId: 'f_carson',
    userName: 'CarsonP',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 8.5,
    content: 'Snape’s memories completely recontextualized seven volumes of storytelling. The patronus reveal was magnificent.',
    containsSpoilers: true, // Marked spoiler!
    helpfulCount: 29,
    createdAt: '1 week ago',
  },
  {
    id: 'rev_3',
    bookId: 'frankenstein',
    userId: 'user_amy',
    userName: 'Amy Winnar',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 10.0,
    content: 'Mary Shelley wrote an unflinching indictment of fatherly neglect and scientific vanity at nineteen years old. The creature’s eloquence in the Mer de Glace still gives me chills.',
    containsSpoilers: false,
    helpfulCount: 88,
    createdAt: '3 weeks ago',
  }
];

export const mockCommunities: Community[] = [
  {
    id: 'comm_fantasy',
    name: 'The High Fantasy Guild',
    tagline: 'Worldbuilding, ancient languages, and epic sagas.',
    description: 'A sanctuary for readers immersed in epic scopes, intricate magical systems, and sprawling continental maps.',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    icon: '🏰',
    memberCount: 1420,
    userRole: 'Owner', // Exactly 2 roles: Owner or Member
    channels: ['general-lore', 'character-arcs', 'magic-systems', 'recommendations'],
    announcements: [
      { id: 'ann_1', title: 'Monthly Epic Tome Vote is Live', content: 'Cast your votes for the December mega-read before Friday.', date: 'Yesterday' }
    ]
  },
  {
    id: 'comm_gothic',
    name: 'Gothic & Dark Academia',
    tagline: 'Tweed coats, shadowed cloisters, and forbidden tomes.',
    description: 'Exploring romantic horror, melancholia, classical aesthetics, and architectural mystery.',
    banner: 'https://images.unsplash.com/photo-1507842229451-79b1be886a20?auto=format&fit=crop&w=1200&q=80',
    icon: '🏛️',
    memberCount: 2890,
    userRole: 'Member',
    channels: ['manuscript-discussions', 'atmospheric-quotes', 'gothic-classics'],
    announcements: [
      { id: 'ann_2', title: 'Shelley Anniversary Reading Salon', content: 'Join us in voice on the 20th for a reading of Frankenstein chapter 10.', date: '3 days ago' }
    ]
  },
  {
    id: 'comm_scifi',
    name: 'Cyberpunk & Speculative Orbit',
    tagline: 'High tech, low life, distant constellations.',
    description: 'Exploring transhumanism, dysonspheres, neon corridors, and artificial consciousness.',
    banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    icon: '🚀',
    memberCount: 960,
    userRole: 'Member',
    channels: ['singularity-debates', 'space-opera', 'dystopian-forecasts'],
    announcements: []
  }
];

export const mockClubs: ReadingClub[] = [
  {
    id: 'club_midnight',
    name: 'The Midnight Reading Circle',
    description: 'Reading one transformative novel every month together at our own pace.',
    activeBookId: 'frankenstein',
    activeBook: mockBooks[5], // Frankenstein
    startDate: 'November 1, 2026',
    targetCompletionDate: 'November 28, 2026', // Strictly book-level completion target per design.md
    members: [
      { id: 'user_amy', name: 'Amy Winnar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
      { id: 'f_brittany', name: 'Brittany Sullivan', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
      { id: 'f_charlotte', name: 'Charlotte Parker', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' },
      { id: 'f_tonya', name: 'Tonya Gray', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' }
    ],
    discussionMessages: [
      { id: 'm1', userName: 'Charlotte Parker', userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80', message: 'How is everyone finding the letters from Captain Walton?', timestamp: 'Yesterday 10:14 PM' },
      { id: 'm2', userName: 'Amy Winnar', userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', message: 'The epistolary frame sets the isolation perfectly before Victor even speaks.', timestamp: 'Yesterday 10:20 PM' }
    ],
    nextBookPoll: {
      options: [
        { bookTitle: 'The Picture of Dorian Gray', votes: 14 },
        { bookTitle: 'Dracula', votes: 9 },
        { bookTitle: 'Wuthering Heights', votes: 6 }
      ],
      userVoted: 'The Picture of Dorian Gray'
    }
  }
];

export const mockDiscussions: BookDiscussion[] = [
  {
    id: 'disc_1',
    bookId: 'hp7',
    category: 'Theories & Predictions',
    title: 'The Elder Wand allegiance: Was Harry always destined to be the master?',
    authorName: 'Charlotte Parker',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    content: 'Looking at how Draco disarmed Dumbledore at the Astronomy Tower, and later how Harry wrestled Draco’s wand at Malfoy Manor, the chain of custody is remarkably intricate.',
    containsSpoilers: true,
    upvotes: 68,
    timestamp: '4 hours ago',
    comments: [
      {
        id: 'c1',
        authorName: 'Amy Winnar',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        content: 'Exactly! Voldemort never truly understood wandlore because he only saw power through conquest, not surrender.',
        containsSpoilers: true,
        timestamp: '3 hours ago'
      }
    ]
  },
  {
    id: 'disc_2',
    bookId: 'hp7',
    category: 'Character Analysis',
    title: 'Neville Longbottom’s complete character trajectory',
    authorName: 'Brittany Sullivan',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    content: 'From the boy terrified of Professor Snape in book one to drawing the sword of Gryffindor from the sorting hat before Voldemort himself.',
    containsSpoilers: false,
    upvotes: 94,
    timestamp: '1 day ago',
    comments: []
  }
];

export const mockSocialPosts: SocialPost[] = [
  {
    id: 'post_1',
    userId: 'user_amy',
    userName: 'Amy Winnar',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    timestamp: '2 hours ago',
    text: 'Spent the rainy afternoon re-reading the finale chapters of Deathly Hallows with warm tea. The Prince’s Tale breaks my heart every single year.',
    bookAttached: {
      id: 'hp7',
      title: 'Harry Potter and the Deathly Hallows',
      author: 'J.K. Rowling',
      cover: 'https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&w=600&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
    containsSpoilers: false,
    likes: 38,
    hasLiked: true,
    comments: [
      {
        id: 'c_post_1',
        userName: 'Brittany Sullivan',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        content: 'That chapter is pure literary alchemy.',
        timestamp: '1 hour ago'
      }
    ]
  },
  {
    id: 'post_2',
    userId: 'f_tonya',
    userName: 'Tonya Gray',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    timestamp: '5 hours ago',
    text: 'My aesthetic autumn bookshelf update! Categorized strictly by emotional resonance rather than spine color.',
    imageUrl: 'https://images.unsplash.com/photo-1507842229451-79b1be886a20?auto=format&fit=crop&w=900&q=80',
    likes: 54,
    hasLiked: false,
    comments: []
  }
];

export const mockMessageThreads: MessageThread[] = [
  {
    id: 'thread_brittany',
    participantId: 'f_brittany',
    participantName: 'Brittany Sullivan',
    participantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    isOnline: true,
    unreadCount: 0,
    messages: [
      { id: 'm10', senderId: 'f_brittany', text: 'Have you reached chapter 34 yet??', timestamp: '3:45 PM' },
      { id: 'm11', senderId: 'user_amy', text: 'Yes! Literally had to put the book down to breathe.', timestamp: '3:47 PM' },
      { id: 'm12', senderId: 'f_brittany', text: 'I told you! The King’s Cross station scene is genius.', timestamp: '3:50 PM' }
    ]
  },
  {
    id: 'thread_tonya',
    participantId: 'f_tonya',
    participantName: 'Tonya Gray',
    participantAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    isOnline: true,
    unreadCount: 1,
    messages: [
      { id: 'm20', senderId: 'f_tonya', text: 'Are you joining the Frankenstein reading circle tonight?', timestamp: '1:15 PM' }
    ]
  }
];

export const mockMissingSubmissions: MissingBookSubmission[] = [
  {
    id: 'sub_1',
    title: 'Piranesi',
    author: 'Susanna Clarke',
    format: 'E-Book',
    isbn: '978-1526622426',
    submittedBy: 'Charlotte Parker',
    submittedAt: '2026-11-06',
    status: 'pending'
  },
  {
    id: 'sub_2',
    title: 'Gormenghast',
    author: 'Mervyn Peake',
    format: 'E-Book',
    isbn: '978-0099285243',
    submittedBy: 'Jordan Haze',
    submittedAt: '2026-11-05',
    status: 'pending'
  }
];

export const mockMetadataDiffs: MetadataCorrectionDiff[] = [
  {
    id: 'diff_1',
    bookId: 'hp7',
    bookTitle: 'Harry Potter and the Deathly Hallows',
    submittedBy: 'Shannonthebest',
    submittedAt: '2026-11-07',
    field: 'synopsis',
    currentValue: 'The final confrontation between Harry Potter and Lord Voldemort...',
    proposedValue: 'The epic seventh and final installment following Harry, Ron, and Hermione as they venture beyond Hogwarts to locate the remaining Horcruxes.',
    status: 'pending'
  }
];

export const mockReportedItems: ReportedItem[] = [
  {
    id: 'rep_1',
    type: 'review',
    contentId: 'rev_2',
    reportedBy: 'Brittany Sullivan',
    reason: 'Unmarked major plot spoiler in review text without tag',
    contentSnippet: 'Snape’s memories completely recontextualized seven volumes...',
    reportedAt: '2026-11-07 14:22',
    status: 'pending'
  }
];

