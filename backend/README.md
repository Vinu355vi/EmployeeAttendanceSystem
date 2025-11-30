# Employee Attendance Backend (scaffold)

This is a minimal Express backend scaffold for the Employee Attendance System. It uses `lowdb` (JSON file) as a lightweight demo database so you can run quickly without installing a separate DB.

Quick start

1. Install dependencies

```powershell
cd backend
npm install
```

2. Seed sample users and attendance

```powershell
npm run seed
```

3. Run in development

```powershell
npm run dev
```

API base: `http://localhost:4000/api`

Notes
- This scaffold is intended to be an MVP. For production, migrate to Postgres/Mongo and add secure storage for JWT/refresh tokens.

Deploying the backend (easy option — Render / Railway)
--------------------------------------------------

Recommendation: for a quick, low-friction deployment that doesn't require refactoring to serverless, deploy the backend as a standalone Node service on Render or Railway and keep the frontend on Vercel. This keeps Prisma + Postgres stable (no serverless connection limits) and avoids changing provider accounts or repository secrets.

Minimal steps to deploy to Render (or similar):

1. Push your repository to GitHub (if not already).
2. On Render: Create a new Web Service and connect your repository + branch.
	- Build Command: npm install && npm run build
	- Start Command: npm start
3. Add environment variables in the Render service settings (DO NOT commit these to git):
	- DATABASE_URL (Postgres URL)
	- JWT_SECRET
	- JWT_EXPIRES_IN (e.g. 1h)
	- BCRYPT_SALT_ROUNDS (e.g. 10)
	- NODE_ENV=production
4. On the Render dashboard, deploy the service. Wait for the build to finish.
5. Once deployed, run the seed script (one-off job or locally run against remote DB):

	# locally (from backend folder) - this will write into the configured DATABASE_URL
	npm run db:seed

6. Update your frontend's `VITE_API_BASE` (in Vercel project settings) to point to the backend URL.

Important safety notes (so nothing touches your personal accounts):
- I did not add any secrets to the repository. Keep your local `backend/.env` out of version control.
- Use the Render/Railway account that you want to host this project on — the repo files I changed are generic and won't modify cloud account settings.
- If you're logged in to any cloud provider with your personal account, double-check which account you're using when creating the service so you don't accidentally deploy into the wrong one.

If you want, I can:
- Prepare a small GitHub Actions workflow to build and automatically deploy a Docker image to a registry (optional).
- Add a `deploy.md` with step-by-step screenshots for Render or Railway.

If you'd like to deploy this now and want me to make the edits required for Vercel serverless instead, say so and I'll convert the express routes into `/api` serverless functions and add the Prisma singleton (this is more work and requires attention to DB pooling).
