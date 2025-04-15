const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Starting deployment process for Resume Builder...');

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

// Function to create a temporary Firebase configuration for Node.js v18
function setupCompatibleFirebase() {
  console.log('\n🔧 Setting up Firebase deployment for Node.js v18...');

  // Create a temporary firebase.json for static deployment
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
  console.log('✅ Created compatible firebase.json configuration');

  return true;
}

// Main deployment function
async function deploy() {
  console.log('\n🔍 Building Next.js application...');
  if (!runCommand('npm run build')) {
    console.error('❌ Build failed. Aborting deployment.');
    process.exit(1);
  }

  // Setup compatible Firebase configuration
  setupCompatibleFirebase();

  console.log('\n🔥 Deploying to Firebase...');

  // Use npx to run firebase-tools directly
  if (!runCommand('npx --yes firebase-tools@11.30.0 deploy --only hosting')) {
    console.error('❌ Firebase deployment failed.');
    process.exit(1);
  }

  console.log('\n✅ Deployment completed successfully!');
  console.log('🌐 Your Resume Builder app is now live on Firebase Hosting.');
  console.log('   https://resumebuilder-bf672.web.app');
  console.log('   https://resumebuilder-bf672.firebaseapp.com');

  rl.close();
}

// Start deployment
deploy().catch(error => {
  console.error('❌ Deployment failed with error:', error);
  process.exit(1);
});
