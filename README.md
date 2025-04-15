# Modern Resume Builder

A modern resume builder application with enhanced UI/UX and Firebase authentication.

## Features

- Modern UI/UX with animations and visual effects
- Google Sign-in authentication with Firebase
- Resume creation and management
- Multiple resume templates
- PDF resume upload and parsing
- LinkedIn profile import
- Dashboard to manage your resumes

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Aceternity UI components
- Firebase Authentication
- Firestore Database
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account

### Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/modern-resume-builder.git
cd modern-resume-builder
```

2. Install dependencies:

```bash
npm install
```

3. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Set up Authentication with Google provider
   - Create a Firestore database
   - Register a web app and get your Firebase config

4. Create a `.env.local` file in the root directory with your Firebase configuration:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Firebase Admin Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Firebase Setup Details

### Authentication

1. In the Firebase Console, go to Authentication
2. Click "Get Started"
3. Enable the Google sign-in method
4. Add your authorized domains

### Firestore

1. In the Firebase Console, go to Firestore Database
2. Click "Create database"
3. Start in production mode
4. Choose a location close to your users
5. Set up security rules to protect your data

### Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select your Firebase project
3. Go to "APIs & Services" > "Credentials"
4. Create an OAuth client ID
5. Add authorized JavaScript origins and redirect URIs
6. Copy the client ID and client secret to your `.env.local` file

## Deployment

This application can be deployed to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure your environment variables
4. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details.
