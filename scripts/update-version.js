const path = require('path');
const fs = require('fs');
const glob = require('glob');

module.exports = function updateVersion(newVer) {
  console.log(`🚀 Updating version to ${newVer}...`);
  
  // Update the .env file (existing functionality)
  updateCoreEnvVersion(newVer);
  
  // Update all package.json files
  updatePackageJsonVersions(newVer);
  
  console.log(`✅ Version update to ${newVer} completed!`);
};

function updateCoreEnvVersion(newVer) {
  console.log('📝 Updating core .env file...');
  
  const filePath = `${path.resolve(__dirname, '../packages/core')}/.env`;
  
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  .env file not found at ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /[0-9]+\.[0-9]+\.[0-9]+/g;
  const newContent = content.replace(regex, newVer);

  fs.writeFileSync(filePath, newContent);
  console.log(`✅ Updated ${filePath}`);
}

function updatePackageJsonVersions(newVer) {
  console.log('📦 Updating package.json files...');
  
  // Find all package.json files in the packages directory
  const packageJsonPaths = glob.sync('packages/*/package.json', {
    cwd: path.resolve(__dirname, '..')
  });

  packageJsonPaths.forEach(relativePath => {
    const fullPath = path.resolve(__dirname, '..', relativePath);
    updatePackageJsonVersion(fullPath, newVer);
  });
}

function updatePackageJsonVersion(packageJsonPath, newVer) {
  try {
    if (!fs.existsSync(packageJsonPath)) {
      console.warn(`⚠️  Package.json not found at ${packageJsonPath}`);
      return;
    }

    // Read and parse package.json
    const content = fs.readFileSync(packageJsonPath, 'utf8');
    const packageData = JSON.parse(content);
    
    // Store old version for logging
    const oldVersion = packageData.version;
    
    // Update version
    packageData.version = newVer;
    
    // Write back to file with proper formatting
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2) + '\n');
    
    console.log(`✅ Updated ${packageJsonPath}: ${oldVersion} → ${newVer}`);
    
  } catch (error) {
    console.error(`❌ Error updating ${packageJsonPath}:`, error.message);
  }
}

// If script is run directly (not as module)
if (require.main === module) {
  const newVersion = process.argv[2];
  
  if (!newVersion) {
    console.error('❌ Please provide a version number');
    console.log('Usage: node scripts/update-version.js 14.2.0');
    process.exit(1);
  }
  
  // Validate version format
  const versionRegex = /^\d+\.\d+\.\d+$/;
  if (!versionRegex.test(newVersion)) {
    console.error('❌ Invalid version format. Use semantic versioning (e.g., 14.2.0)');
    process.exit(1);
  }
  
  module.exports(newVersion);
}
