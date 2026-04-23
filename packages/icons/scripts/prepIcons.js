const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');
const svgoConfig = require('./svgo.config.js');

function prepIcons(iconsDir) {
  if (!fs.existsSync(iconsDir)) {
    console.error(`Directory not found: ${iconsDir}`);
    return;
  }

  // Function to process a single SVG file
  function processSvgFile(filePath) {
    let svgContent = fs.readFileSync(filePath, 'utf8');
    
    try {
      // Use SVGO to optimize
      const result = optimize(svgContent, {
        path: filePath,
        ...svgoConfig
      });
      
      svgContent = result.data;
      
      // Write back to the same file
      fs.writeFileSync(filePath, svgContent);
      
      return { success: true };
      
    } catch (error) {
      console.error(`❌ Error processing ${path.basename(filePath)}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  // Function to recursively find all SVG files
  function findSvgFiles(dir, basePath = '') {
    const files = [];
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(basePath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively process subdirectories
        files.push(...findSvgFiles(fullPath, relativePath));
      } else if (item.endsWith('.svg')) {
        files.push({
          fullPath,
          relativePath
        });
      }
    });
    
    return files;
  }

  // Find all SVG files recursively
  const svgFiles = findSvgFiles(iconsDir);
  let processedCount = 0;

  console.log(`Found ${svgFiles.length} SVG files to process...`);

  svgFiles.forEach(fileInfo => {
    const { fullPath, relativePath } = fileInfo;
    
    // Process the file in place
    const result = processSvgFile(fullPath);
    
    if (result.success) {
      console.log(`✅ Processed: ${relativePath}`);
      processedCount++;
    }
  });

  console.log(`\n🎉 Successfully processed ${processedCount} SVG files`);

  return {
    processedCount,
    totalFiles: svgFiles.length
  };
}

// CLI usage
if (require.main === module) {
  const iconsDir = process.argv[2] || './static/images/icons';
  
  console.log('🔧 Processing SVG files with SVGO...\n');
  
  prepIcons(iconsDir);
}

module.exports = prepIcons;