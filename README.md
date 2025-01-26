# ClaimCracker Frontend

Modern web interface for the ClaimCracker fake news detection system. Built with Next.js 15 and React Server Components.

## Features

- **Modern UI/UX**

  - Server-side rendering with Next.js 15
  - React Server Components for optimal performance
  - Responsive design for all devices
  - Dark/light mode support

- **Performance**

  - Optimized font loading
  - SEO-friendly metadata
  - OpenGraph social sharing
  - Structured data for search engines

- **Developer Experience**
  - TypeScript for type safety
  - Modern tooling setup
  - Organized project structure
  - Hot module reloading

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
└── lib/             # Utility functions and configs
```

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:10000
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) - Server-first UI
- [Backend API Documentation](http://localhost:10000/docs) - ClaimCracker API reference

## Deployment

The application is deployed on [Vercel](https://vercel.com). Each push to the main branch triggers an automatic deployment.

For manual deployment:

```bash
vercel
```

For production deployment:

```bash
vercel --prod
```
