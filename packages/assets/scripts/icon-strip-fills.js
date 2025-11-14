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
      
      // Process SVG tag to add attributes
      svgContent = svgContent.replace(
        /<svg([^>]*)>/,
        function(match, attributes) {
          let newAttributes = attributes;
          
          // Add currentColor if requested and not already present
          if (addCurrentColor && !attributes.includes('fill=')) {
            newAttributes += ' fill="currentColor"';
          }
          
          // Add aria-hidden if not already present
          if (!attributes.includes('aria-hidden')) {
            newAttributes += ' aria-hidden="true"';
          }
          
          return `<svg${newAttributes}>`;
        }
      );
      
      // Write back to file
      fs.writeFileSync(filePath, svgContent);
      
      if (verbose) {
        const changes = [];
        if (totalFills > 0) changes.push(`Removed ${totalFills} fill attribute(s)`);
        if (addCurrentColor) changes.push('Added currentColor');
        changes.push('Added aria-hidden="true"');
        
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
  
  console.log('🔧 Processing SVG files...\n');
  
  stripSvgFills(iconsDir, {
    addCurrentColor: true,
    verbose: true
  });
}

module.exports = stripSvgFills;