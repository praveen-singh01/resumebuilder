const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Firebase deployment process for Resume Builder...');

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

// Function to temporarily disable API routes for static export
function prepareForStaticExport() {
  console.log('\n🔧 Preparing app for static export...');
  
  // Create a backup directory
  if (!fs.existsSync('backup')) {
    fs.mkdirSync('backup');
  }
  
  // Backup and disable API routes
  const apiDir = path.join('src', 'app', 'api');
  if (fs.existsSync(apiDir)) {
    // Backup API directory
    if (!fs.existsSync('backup/api')) {
      fs.mkdirSync('backup/api', { recursive: true });
    }
    
    // Copy API files to backup
    copyDir(apiDir, 'backup/api');
    
    // Rename API directory to disable it
    fs.renameSync(apiDir, path.join('src', 'app', '_api'));
    console.log('✅ API routes temporarily disabled for static export');
  }
  
  // Create a temporary firebase.json for static deployment
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
  
  return true;
}

// Function to restore API routes after deployment
function restoreAfterDeployment() {
  console.log('\n🔄 Restoring app after deployment...');
  
  // Restore API directory
  const disabledApiDir = path.join('src', 'app', '_api');
  if (fs.existsSync(disabledApiDir)) {
    fs.renameSync(disabledApiDir, path.join('src', 'app', 'api'));
    console.log('✅ API routes restored');
  }
}

// Helper function to copy a directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Main deployment function
async function deploy() {
  try {
    // Prepare for static export
    prepareForStaticExport();
    
    console.log('\n🔍 Building Next.js application...');
    if (!runCommand('npm run build')) {
      console.error('❌ Build failed. Aborting deployment.');
      return false;
    }
    
    console.log('\n🔥 Deploying to Firebase...');
    if (!runCommand('npx --yes firebase-tools@11.30.0 deploy --only hosting')) {
      console.error('❌ Firebase deployment failed.');
      return false;
    }
    
    console.log('\n✅ Deployment completed successfully!');
    console.log('🌐 Your Resume Builder app is now live on Firebase Hosting:');
    console.log('   https://resumebuilder-bf672.web.app');
    console.log('   https://resumebuilder-bf672.firebaseapp.com');
    
    return true;
  } finally {
    // Always restore the app state, even if deployment fails
    restoreAfterDeployment();
  }
}

// Start deployment
deploy().then(success => {
  if (!success) {
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Deployment failed with error:', error);
  // Try to restore the app state
  try {
    restoreAfterDeployment();
  } catch (restoreError) {
    console.error('❌ Failed to restore app state:', restoreError);
  }
  process.exit(1);
});
