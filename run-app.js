const { execSync } = require('child_process');

console.log('🚀 Starting Resume Builder application...');

try {
  console.log('\n📋 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('\n📋 Starting development server...');
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}
