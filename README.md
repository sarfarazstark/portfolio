# DevHub Portfolio

A high-fidelity, pixel-perfect portfolio application built with **React 19** and **TypeScript**, leveraging **Vite** for the build process and **Tailwind CSS v4** for modern, CSS-first utility styling.

## 🚀 Project Overview

DevHub is a data-driven portfolio designed for developers. It prioritizes a refined visual hierarchy, smooth micro-interactions, and ease of maintenance. The entire application's content—from your bio and skills to your project list—is managed through a single source of truth: `src/data/portfolio.json`.

### Key Features
- **Data-Driven Architecture:** Update your entire portfolio by simply editing a JSON file.
- **Modern Tech Stack:** Built with the latest React 19 features and Tailwind CSS v4.
- **Micro-Interactions:** Powered by **Framer Motion**, featuring scroll reveals, staggered lists, and an interactive navigation dock.
- **Theme Support:** Native light and dark mode with a sophisticated neutral Zinc-based palette.
- **Dynamic Project Filtering:** Advanced filtering system powered by **Zustand** that automatically cleans up stale tags.
- **High-Quality Iconography:** Integrated with **Lucide React** and **Developer Icons** for a professional look.
- **Responsive Navigation:** A floating, animated Dock with smooth-scroll integration and scroll-padding.

---

## 🛠️ Technologies Used

- **Core:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Icons:** [Lucide React](https://lucide.dev/), [Developer Icons](https://developer-icons.vercel.app/)
- **Utilities:** [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)

---

## 📦 Setup & Installation

Follow these steps to get the project running locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sarfarazstark/devhub.git
   cd devhub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to see the application in action.

---

## 📝 Usage

### Updating Content
To personalize the portfolio, modify the data in `src/data/portfolio.json`. This file controls:
- **Profile Info:** Name, role, location, and bio.
- **Experience:** Work history with logos and descriptions.
- **Education:** Degrees and certifications.
- **Skills:** Technical expertise with corresponding icons.
- **Projects:** Title, description, tech stack, links, and featured status.

### Customizing Styles
The project uses **Tailwind CSS v4**. You can customize the theme and global styles in:
- `src/index.css`
- `src/App.css`

---

## 🤝 Contribution

Contributions are welcome! If you find a bug or have a feature request, please follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

*Built with ❤️ by [Sarfaraz](https://github.com/sarfarazstark)*
