# Resume Builder - resume.io Clone

A modern resume builder application that clones the UI/UX of resume.io, built with Next.js, Firebase, and Tailwind CSS.

## Features

- Create professional resumes with multiple templates
- Upload existing resumes to extract information
- Edit and customize your resume
- Create professional cover letters
- Download as PDF
- Save and manage multiple resumes
- Responsive design for all devices

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Firebase Authentication
- Firestore Database
- Firebase Hosting
- Shadcn UI Components
- Aceternity UI Components
- Framer Motion for animations

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/resume-builder.git
cd resume-builder
```

2. Install dependencies and run the application:

```bash
npm run run-app
```

This script will install all dependencies and start the development server.

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

- `/home` - Landing page with hero section, features, templates showcase, testimonials, FAQ, and CTA
- `/app/create-resume` - Resume builder with multi-step form
- `/app/create-cover-letter` - Cover letter builder
- `/resume-templates` - Browse and filter resume templates
- `/resume-examples` - Browse and filter resume examples by industry and experience level

## Deployment

### Deploy to Firebase Hosting

Use our simplified deployment script:

```bash
npm run deploy-simplified
```

This will deploy a simplified version of the application to Firebase Hosting.

After deployment, your application will be available at:
- https://resumebuilder-bf672.web.app
- https://resumebuilder-bf672.firebaseapp.com

## UI Components

The UI is built using a combination of:

1. **Shadcn UI** - For base components like buttons, inputs, and dropdowns
2. **Aceternity UI** - For advanced animations and effects
3. **Custom Components** - Built to match resume.io's design

## Authentication

The application uses Firebase Authentication with Google sign-in. Users can create accounts, save their resumes, and access them from any device.

## Database

Firestore is used to store user data, resume templates, and user-created resumes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
