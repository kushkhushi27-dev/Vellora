# 📖 Vellora

> *Every story has a place in your heart.*

Vellora is an all-in-one social reading ecosystem for book lovers. It combines content discovery and ratings, reading tracking, social interaction, community discussions, and an AI recommendation companion called **Muse**.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- **📚 Library Management** — Track books across custom shelves with statuses, ratings, and personal notes
- **🔍 Discovery** — Browse and search books powered by the Open Library API
- **🤖 Muse AI** — Intelligent recommendation companion that understands your taste beyond simple genre tags
- **💬 Social Feed** — Share updates, reviews, and reading milestones with friends
- **📖 Web Reader** — Read directly within the app
- **👥 Communities & Reading Clubs** — Join genre-focused clubs and participate in book discussions
- **🔔 Notifications** — Stay updated on social activity and reading goals
- **🎨 Glassmorphic UI** — Dark editorial luxury design with cinematic literary atmosphere

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | React 18                            |
| Language    | TypeScript 5                        |
| Build Tool  | Vite 6                              |
| Styling     | Tailwind CSS 3, PostCSS, Autoprefixer |
| Routing     | React Router DOM 6                  |
| Icons       | Lucide React                        |
| Utilities   | clsx, tailwind-merge                |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/vellora.git
cd vellora

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
vellora/
├── src/
│   ├── components/
│   │   ├── common/        # Reusable UI components (BookCard, StarRating, etc.)
│   │   └── layout/        # App shell, header, sidebar, activity panel
│   ├── context/           # React context providers (Auth, Library, Muse, Social)
│   ├── data/              # Mock data for development
│   ├── pages/             # Route-level page components
│   ├── services/          # API service layers (Open Library)
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Root component with routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles & Tailwind directives
├── index.html             # HTML entry point
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── postcss.config.js      # PostCSS configuration
└── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">Made with ❤️ for readers everywhere</p>

