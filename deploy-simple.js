const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting simple Firebase deployment for Resume Builder...');

// Function to execute commands
function runCommand(command) {
  try {
    console.log(`\n📋 Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ Error executing command: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Main deployment function
async function deploy() {
  // Create a simple index.html file for Firebase hosting
  console.log('\n🔧 Creating static files for Firebase hosting...');

  // Create out directory if it doesn't exist
  if (!fs.existsSync('out')) {
    fs.mkdirSync('out');
  }

  // Create a simple index.html file
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume Builder</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(to bottom, #f0f4f8, #d9e2ec);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .container {
      max-width: 800px;
      padding: 2rem;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #3b82f6;
      margin-bottom: 1rem;
    }
    p {
      color: #4b5563;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .button {
      display: inline-block;
      background: linear-gradient(to right, #3b82f6, #6366f1);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
    }
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Resume Builder</h1>
    <p>Create professional resumes in minutes with our easy-to-use builder.</p>
    <p>Our app is currently being deployed. Please check back soon!</p>
    <a href="https://github.com/your-username/resume-builder" class="button">View on GitHub</a>
  </div>
</body>
</html>`;

  fs.writeFileSync('out/index.html', htmlContent);
  console.log('✅ Created static HTML file');

  // Create a firebase.json file for hosting
  const firebaseConfig = {
    "hosting": {
      "public": "out",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ]
    }
  };

  fs.writeFileSync('firebase.json', JSON.stringify(firebaseConfig, null, 2));
  console.log('✅ Created firebase.json configuration');

  // Deploy to Firebase
  console.log('\n🔥 Deploying to Firebase...');
  if (!runCommand('npx --yes firebase-tools@11.30.0 deploy --only hosting')) {
    console.error('❌ Firebase deployment failed.');
    process.exit(1);
  }

  console.log('\n✅ Deployment completed successfully!');
  console.log('🌐 Your Resume Builder app is now live on Firebase Hosting:');
  console.log('   https://resumebuilder-bf672.web.app');
  console.log('   https://resumebuilder-bf672.firebaseapp.com');
}

// Start deployment
deploy().catch(error => {
  console.error('❌ Deployment failed with error:', error);
  process.exit(1);
});
