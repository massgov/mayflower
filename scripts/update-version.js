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
  
  // Find all top-level package.json files, excluding patternlab root
  const packageJsonPaths = glob.sync('packages/*/package.json', {
    cwd: path.resolve(__dirname, '..')
  }).filter(p => p !== 'packages/patternlab/package.json'); // Exclude patternlab root
  
  // Add specific patternlab styleguide package.json
  const patternlabStyleguidePackageJson = 'packages/patternlab/styleguide/package.json';
  const patternlabStyleguidePath = path.resolve(__dirname, '..', patternlabStyleguidePackageJson);
  if (fs.existsSync(patternlabStyleguidePath)) {
    packageJsonPaths.push(patternlabStyleguidePackageJson);
  }
  
  // Include root package.json
  const rootPackageJsonPath = path.resolve(__dirname, '../package.json');
  if (fs.existsSync(rootPackageJsonPath)) {
    packageJsonPaths.unshift('package.json');
  }

  console.log('📋 Found package.json files:');
  packageJsonPaths.forEach(p => console.log(`    ${p}`));

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
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2) + '\n');
      
      const relativePath = path.relative(path.resolve(__dirname, '..'), packageJsonPath);
      console.log(`✅ Updated ${relativePath}:`);
      changes.forEach(change => console.log(`    ${change}`));
    } else {
      const relativePath = path.relative(path.resolve(__dirname, '..'), packageJsonPath);
      console.log(`⚪ No changes needed for ${relativePath}`);
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
