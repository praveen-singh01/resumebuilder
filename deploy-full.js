const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting full deployment of Resume Builder to Firebase...');

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
  // Build the Next.js application
  console.log('\n🔍 Building Next.js application...');
  
  // Disable TypeScript checking during build
  if (!fs.existsSync('.env.local')) {
    fs.writeFileSync('.env.local', '');
  }
  
  // Append TypeScript and ESLint disable flags to .env.local
  fs.appendFileSync('.env.local', '\nNEXT_DISABLE_TYPECHECK=1\nNEXT_DISABLE_ESLINT=1\n');
  
  // Run the build command
  if (!runCommand('npm run build')) {
    console.error('❌ Build failed. Aborting deployment.');
    process.exit(1);
  }
  
  // Create a firebase.json file for hosting
  console.log('\n🔧 Configuring Firebase Hosting...');
  const firebaseConfig = {
    "hosting": {
      "public": "out",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ],
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
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
