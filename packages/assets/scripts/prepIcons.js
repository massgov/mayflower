const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');
const svgoConfig = require('./svgo.config.js');

function prepIcons(iconsDir, options = {}) {
  const {
    verbose = true
  } = options;

  if (!fs.existsSync(iconsDir)) {
    console.error(`Directory not found: ${iconsDir}`);
    return;
  }

  // Process SVG files
  const svgFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));
  let processedCount = 0;

  svgFiles.forEach(file => {
    const filePath = path.join(iconsDir, file);
    let svgContent = fs.readFileSync(filePath, 'utf8');
    
    try {
      const originalSize = Buffer.byteLength(svgContent, 'utf8');
      let changes = [];
      
      // Use SVGO to optimize and transform
      const result = optimize(svgContent, {
        path: filePath,
        ...svgoConfig
      });
      
      svgContent = result.data;
      const optimizedSize = Buffer.byteLength(svgContent, 'utf8');
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      changes.push(`Optimized (${savings}% smaller)`);
      changes.push('Processed with SVGO');
 
      // Write back to file
      fs.writeFileSync(filePath, svgContent);
      
      if (verbose && changes.length > 0) {
        console.log(`📝 ${file}: ${changes.join(', ')}`);
      }
      
      processedCount++;
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  });

  if (verbose) {
    console.log(`\n🎉 Processed ${processedCount} SVG files`);
    console.log(`📁 Directory: ${iconsDir}`);
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const iconsDir = args[0] || './static/images/icons';
  
  console.log('🔧 Processing SVG files with SVGO...\n');
  
  prepIcons(iconsDir, {
    verbose: true
  });
}

module.exports = prepIcons;