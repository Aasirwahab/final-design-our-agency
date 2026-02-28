# WebVoxel Studio

WebVoxel Studio is a premium, high-performance agency website built with modern web technologies. It features stunning 3D visualizations, smooth animations, and a robust backend to deliver an exceptional user experience.

## ✨ Features

- **Immersive 3D Graphics**: Interactive 3D globe and elements powered by Three.js and React Three Fiber.
- **Premium Animations**: Fluid transitions and scroll effects using Framer Motion and Lenis smooth scrolling.
- **Robust Authentication**: Secure user authentication and management seamlessly integrated with Clerk.
- **Real-time Database**: High-performance data synchronization and backend operations with Convex.
- **Modern Styling**: Utility-first CSS with Tailwind CSS v4 for pixel-perfect, responsive designs.
- **Type-Safe**: Built entirely with TypeScript for reliable and maintainable code.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Rendering**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), [three-globe](https://github.com/vasturiano/three-globe)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.studiofreight.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database/Backend**: [Convex](https://www.convex.dev/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)

## 🛠️ Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine. We recommend using `pnpm` as your package manager.

```bash
npm install -g pnpm
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/webvoxel-studio.git
   cd webvoxel-studio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following keys. You will need to get these from your Clerk and Convex dashboards.
   
   ```env
   # Clerk Auth
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Convex
   CONVEX_DEPLOYMENT=your_convex_deployment
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. In a new terminal, run the Convex development server (to sync database changes):
   ```bash
   npx convex dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
## 📦 Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/components`: Reusable UI and 3D components.
- `/convex`: Convex backend functions and schema.
- `/lib`: Utility functions and shared logic.
- `/public`: Static assets.

## 🚀 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Don't forget to add your environment variables (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL`, etc.) in the Vercel project settings.
4. Deploy!

## 📄 License

This project is licensed under the MIT License.
