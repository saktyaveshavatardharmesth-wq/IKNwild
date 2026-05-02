# Backend Setup Instructions

This project uses **Next.js (App Router)**, **Prisma**, and **Neon PostgreSQL**.

## 1. Database Configuration

1. Create a project in [Neon.tech](https://neon.tech/).
2. Get your connection string (Direct connection).
3. Create a `.env` file in the root directory (if not already present) and add your connection string:
   ```env
   DATABASE_URL="postgresql://user:password@hostname/dbname?sslmode=require"
   ```

## 2. Database Migration & Seeding

Run the following commands to set up your database schema and initial users:

```bash
# Push the schema to Neon
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed the database with initial users (RANGER123 and WORKER456)
npx prisma db seed
```

## 3. API Endpoints

### Authentication
- `POST /api/auth/login`
  - Body: `{ "code": "RANGER123" }` or `{ "code": "WORKER456" }`

### Reports
- `POST /api/reports`: Create a new report (Worker)
- `GET /api/reports`: List reports (Admin/Worker)
- `GET /api/reports/[id]`: Get report details
- `PATCH /api/reports/[id]`: Update report status (Admin)

### Public Data
- `GET /api/public/stats`: Wildlife conflict statistics
- `GET /api/public/map`: Distribution map data
