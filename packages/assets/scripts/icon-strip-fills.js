const fs = require('fs');
const path = require('path');

function stripSvgFills(iconsDir, options = {}) {
  const {
    addCurrentColor = true,
    verbose = true
  } = options;

  if (!fs.existsSync(iconsDir)) {
    console.error(`Directory not found: ${iconsDir}`);
    return;
  }

  // Process SVG files using regex (no external dependencies)
  const svgFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));
  let processedCount = 0;

  svgFiles.forEach(file => {
    const filePath = path.join(iconsDir, file);
    let svgContent = fs.readFileSync(filePath, 'utf8');
    
    try {
      // Count fills before removal
      const fillMatches = svgContent.match(/\sfill="[^"]*"/g) || [];
      const fillMatches2 = svgContent.match(/\sfill='[^']*'/g) || [];
      const totalFills = fillMatches.length + fillMatches2.length;
      
      // Remove fill attributes using regex
      svgContent = svgContent
        .replace(/\sfill="[^"]*"/g, '') // Remove fill="..."
        .replace(/\sfill='[^']*'/g, '') // Remove fill='...'
        .replace(/\s+/g, ' ') // Clean up extra spaces
        .trim();
      
      // Add currentColor to root SVG if requested
      if (addCurrentColor && !svgContent.includes('fill=')) {
        svgContent = svgContent.replace(
          /<svg([^>]*)>/,
          '<svg$1 fill="currentColor">'
        );
      }
      
      // Write back to file
      fs.writeFileSync(filePath, svgContent);
      
      if (verbose && totalFills > 0) {
        console.log(`📝 ${file}: Removed ${totalFills} fill attribute(s)`);
      }
      
      processedCount++;
      
    } catch (error) {
      console.error(error.message);
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
  
  console.log('🔧 Stripping fill attributes from SVG files...\n');
  
  stripSvgFills(iconsDir, {
    backup: true,
    addCurrentColor: true,
    verbose: true
  });
}

module.exports = stripSvgFills;