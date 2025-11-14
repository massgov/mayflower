const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');
const svgoConfig = require('./svgo.config.js');

function stripSvgFills(iconsDir, options = {}) {
  const {
    optimize: shouldOptimize = true,
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
      
      if (shouldOptimize) {
        // Use SVGO to optimize and transform
        const result = optimize(svgContent, {
          path: filePath,
          ...svgoConfig
        });
        
        if (result.error) {
          console.error(`❌ SVGO error for ${file}:`, result.error);
          return;
        }
        
        svgContent = result.data;
        const optimizedSize = Buffer.byteLength(svgContent, 'utf8');
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        changes.push(`Optimized (${savings}% smaller)`);
        changes.push('Processed with SVGO');
      } else {
        // Manual processing if SVGO is disabled
        const fillMatches = svgContent.match(/\sfill="[^"]*"/g) || [];
        const fillMatches2 = svgContent.match(/\sfill='[^']*'/g) || [];
        const strokeMatches = svgContent.match(/\sstroke="[^"]*"/g) || [];
        const totalRemoved = fillMatches.length + fillMatches2.length + strokeMatches.length;
        
        svgContent = svgContent
          .replace(/\sfill="[^"]*"/g, '')
          .replace(/\sfill='[^']*'/g, '')
          .replace(/\sstroke="[^"]*"/g, '')
          .replace(/\sstroke-width="[^"]*"/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        
        // Add attributes manually
        svgContent = svgContent.replace(
          /<svg([^>]*)>/,
          function(match, attributes) {
            let newAttributes = attributes;
            
            if (!attributes.includes('aria-hidden')) {
              newAttributes += ' aria-hidden="true"';
            }
            
            if (!attributes.includes('fill=')) {
              newAttributes += ' fill="currentColor"';
            }
            
            return `<svg${newAttributes}>`;
          }
        );
        
        if (totalRemoved > 0) {
          changes.push(`Removed ${totalRemoved} attributes manually`);
        }
        changes.push('Added aria-hidden and fill manually');
      }
      
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
  
  stripSvgFills(iconsDir, {
    optimize: true,
    verbose: true
  });
}

module.exports = stripSvgFills;