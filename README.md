## TASK MANAGER APP
The project presents the following features:

 - User authentication (JWT, cookies)
 - CRUD operations (Create, Read, Update, and Delete)
 - Database management
 - Dynamic UI
 - Dark mode
 - Data validation and feedback

It is a simple task manager web app where users can create a password-protected account, manage their tasks, and mark them as completed or incomplete. The frontend is built on Next.js with TypeScript. State management is handled by Zustand, forms and data validation are performed through Yup and React Hook Forms, and the styling/dark mode is accomplished with TailwindCSS and Flowbite React. 

## CHECK IT OUT
The app is currently live at:
[Live App on Render](https://task-manager-app-front.onrender.com/)

Notes: It uses Render's free tier service; therefore, it may be necessary to wait for the app to wake up. Make sure your browser allows third-party cookies.  

## DEVELOPMENT

**Clone the repo**
```bash
git clone https://github.com/mdanielamartin/task-manager-app.git
```
**Navigate to the frontend directory**
```bash
cd frontend
```
**Install dependencies**
```bash
npm install
```
**Start development server**
```bash
npm run dev
```
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

**Learn More**

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

**Navigate to the backend directory**
```bash
cd backend
```


**(Optional) Create a virtual environment**
```bash
conda create -n name python=3.11
conda activate name
#or
python -m venv venv
#or
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```
**Install dependencies**
```bash
pip install -r requirements.txt
```
**Database**
Make sure PostgreSQL is installed and running.

**Set environment variables for dev mode**
```bash
cp .env.example .env
```

Then edit .env to include your database URI, e.g.:
DATABASE_URL=postgresql://username:password@localhost:5432/task_manager_db

**Run the server**
```bash
export FLASK_APP=app.py
export FLASK_ENV=development
flask run
```

