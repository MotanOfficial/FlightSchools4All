# ✈️ FlightSchools4All

**FlightSchools4All** is a modern, high-performance web directory designed to help aspiring pilots discover and compare the best EASA-approved flight schools across Europe. From Private Pilot Licenses (PPL) to Airline Transport Pilot Licenses (ATPL), we provide a clear roadmap and a curated list of top-tier aviation academies.

![FlightSchools4All Banner](public/images/hero.png)

## 🚀 Key Features

- **🌍 Pan-European Directory**: Explore flight schools in Romania, France, Spain, Great Britain, Poland, and more.
- **🛡️ EASA Verified**: Every listed school is manually checked for EASA compliance to ensure high training standards.
- **🛣️ Career Roadmap**: A visual guide to the pilot training path (PPL -> CPL -> ATPL).
- **🔍 Intelligent Search**: Quickly find schools by name, location, or course type.
- **📱 Modern UI/UX**: Fully responsive, aviation-themed design with smooth animations and dark mode-ready aesthetics.
- **💨 Blazing Fast**: Built with Next.js 16 and Tailwind CSS for optimal performance.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: GitHub Pages

## 📦 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (Recommended) or [Node.js](https://nodejs.org/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/motanul/FlightSchools4All.git
   cd FlightSchools4All
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

3. Run the development server:
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deployment

This project is configured for automated deployment to **GitHub Pages** via GitHub Actions.

- **Configuration**: [next.config.ts](next.config.ts) handles `basePath` and `assetPrefix` for subdirectory hosting.
- **Workflow**: Push to the `main` branch to trigger the [deploy.yml](.github/workflows/deploy.yml) workflow.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Made with ❤️ for aviation enthusiasts and future captains.
