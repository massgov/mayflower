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

function updatePackageJsonVersion(packageJsonPath, newVer, dryRun = false) {
  try {
    if (!fs.existsSync(packageJsonPath)) {
      console.warn(`⚠️  Package.json not found at ${packageJsonPath}`);
      return;
    }

    const content = fs.readFileSync(packageJsonPath, 'utf8');
    const packageData = JSON.parse(content);
    
    const oldVersion = packageData.version;
    let changes = [];
    
    // Update main version
    if (packageData.version) {
      packageData.version = newVer;
      changes.push(`version: ${oldVersion} → ${newVer}`);
    }
    
    // Function to check if a package name should be updated
    const isMayflowerPackage = (packageName) => {
      return packageName.startsWith('@massds/mayflower-') || 
             packageName === '@massds/mayflower-assets' ||
             packageName === '@massds/mayflower-react';
    };
    
    // Update Mayflower dependencies in all dependency types
    const dependencyTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];
    
    dependencyTypes.forEach(depType => {
      if (packageData[depType]) {
        Object.keys(packageData[depType]).forEach(depName => {
          if (isMayflowerPackage(depName)) {
            const oldDepVersion = packageData[depType][depName];
            // Handle version ranges (^, ~, >=, etc.)
            let newDepVersion = newVer;
            if (oldDepVersion.startsWith('^')) {
              newDepVersion = `^${newVer}`;
            } else if (oldDepVersion.startsWith('~')) {
              newDepVersion = `~${newVer}`;
            } else if (oldDepVersion.startsWith('>=')) {
              newDepVersion = `>=${newVer}`;
            }
            
            packageData[depType][depName] = newDepVersion;
            changes.push(`${depType}.${depName}: ${oldDepVersion} → ${newDepVersion}`);
          }
        });
      }
    });
    
    // Only write if there were changes
    if (changes.length > 0) {
      if (!dryRun) {
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2) + '\n');
      }
      
      console.log(`${dryRun ? '🔍' : '✅'} Updated ${packageJsonPath}:`);
      changes.forEach(change => console.log(`    ${change}`));
    } else {
      console.log(`⚪ No changes needed for ${packageJsonPath}`);
    }
    
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
