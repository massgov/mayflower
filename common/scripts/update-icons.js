#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function runCommand(command, cwd) {
  console.log(`\n🔧 Running: ${command}`);
  console.log(`📁 In directory: ${cwd}`);
  
  try {
    execSync(command, { 
      cwd, 
      stdio: 'inherit',
      env: { ...process.env, FORCE_COLOR: '1' }
    });
    console.log(`✅ Success: ${command}`);
  } catch (error) {
    console.error(`❌ Failed: ${command}`);
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

function main() {
  const rootDir = path.resolve(__dirname, '../..');
  
  console.log('🚀 Starting icon update process...\n');
  
  // Step 1: Prepare icons in assets package
  console.log('📦 Step 1: Preparing icons in assets package');
  const assetsDir = path.join(rootDir, 'packages/assets');
  if (!fs.existsSync(assetsDir)) {
    console.error('❌ Assets package directory not found:', assetsDir);
    process.exit(1);
  }
  
  // Check if package.json has prepIcons script
  const packageJsonPath = path.join(assetsDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (packageJson.scripts && packageJson.scripts.icons) {
      runCommand('rushx icons', assetsDir);
    } else {
      console.log('⚠️  prepIcons script not found in assets package, skipping...');
    }
  }
  
  // Step 2: Update patternlab icons
  console.log('\n📦 Step 2: Updating patternlab icons');
  const patternlabDir = path.join(rootDir, 'packages/patternlab/styleguide');
  if (fs.existsSync(patternlabDir)) {
    const packageJsonPath = path.join(patternlabDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (packageJson.scripts && packageJson.scripts.icons) {
        runCommand('rushx icons', patternlabDir);
      } else {
        console.log('⚠️  icons script not found in patternlab package, skipping...');
      }
    }
  } else {
    console.log('⚠️  PatternLab package directory not found, skipping...');
  }
  
  // Step 3: Update React icons
  console.log('\n📦 Step 3: Updating React icons');
  const reactDir = path.join(rootDir, 'packages/react');
  if (fs.existsSync(reactDir)) {
    const packageJsonPath = path.join(reactDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (packageJson.scripts && packageJson.scripts.icons) {
        runCommand('rushx icons', reactDir);
      } else {
        console.log('⚠️  icons script not found in react package, skipping...');
      }
    }
  } else {
    console.log('⚠️  React package directory not found, skipping...');
  }
  
  console.log('\n🎉 Icon update process completed!');
}

main();