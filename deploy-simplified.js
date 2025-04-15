const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting simplified deployment for Resume Builder...');

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
  // Create out directory if it doesn't exist
  if (!fs.existsSync('out')) {
    fs.mkdirSync('out');
  }
  
  // Create a simple index.html file with a redirect to the GitHub repository
  console.log('\n🔧 Creating simplified app for deployment...');
  
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
    .features {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      margin: 2rem 0;
    }
    .feature {
      background-color: #f9fafb;
      padding: 1rem;
      border-radius: 0.5rem;
      width: 200px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }
    .feature h3 {
      color: #3b82f6;
      margin-top: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Resume Builder</h1>
    <p>Create professional resumes in minutes with our easy-to-use builder.</p>
    
    <div class="features">
      <div class="feature">
        <h3>Modern Templates</h3>
        <p>Choose from multiple professional templates.</p>
      </div>
      <div class="feature">
        <h3>PDF Upload</h3>
        <p>Upload existing PDFs to extract information.</p>
      </div>
      <div class="feature">
        <h3>Easy Editing</h3>
        <p>Intuitive interface for quick resume creation.</p>
      </div>
    </div>
    
    <p>This application is currently running in development mode. Please run it locally for full functionality.</p>
    
    <a href="https://github.com/your-username/resume-builder" class="button">View on GitHub</a>
  </div>
</body>
</html>`;
  
  fs.writeFileSync('out/index.html', htmlContent);
  console.log('✅ Created simplified app');
  
  // Create a firebase.json file for hosting
  console.log('\n🔧 Configuring Firebase Hosting...');
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
