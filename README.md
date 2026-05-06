# Wildlife Conflict IKN - Sentinel

Sentinel is a digital platform designed to mitigate human-wildlife conflict in the IKN (Ibu Kota Nusantara) area. It provides a real-time reporting system for construction workers and a monitoring dashboard for forest rangers.

## 🚀 Features

- **For Construction Workers**:
  - Secure login using company access codes.
  - Interactive reporting form with SVG-based map picker.
  - Geolocation support and high-quality photo uploads.
  - History tracking of personal reports.
- **For Forest Rangers**:
  - Real-time dashboard with active alerts.
  - Interactive "Forest Map" with zoom and pan capabilities to locate sightings.
  - Status management (Pending, In Progress, Resolved).
  - Detailed incident reports including photos and reporter information.
- **Education Portal**:
  - Interactive species distribution map.
  - Informational content on native wildlife and safety protocols.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Backend**: Next.js API Routes.
- **Database**: PostgreSQL with Prisma ORM.
- **Icons**: Lucide React.
- **State Management**: React Hooks (useState, useEffect).

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm, pnpm, or yarn

## ⚙️ Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd otiinternship
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your database URL:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/oti_db?schema=public"
   ```

4. **Database Setup**:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Access Codes (Default Seeds)

- **Worker**: `WORKER456`
- **Ranger**: `RANGER123`
- **Admin**: `ADMIN999`

## 📂 Project Structure

- `src/app`: Next.js pages and API routes.
- `src/components`: Reusable UI components (Maps, Navbar, etc.).
- `src/lib`: Shared utilities and Prisma client.
- `prisma`: Database schema and seed scripts.
- `public`: Static assets (images, icons, SVG maps).

---
Developed as part of the OTI Internship Program.
