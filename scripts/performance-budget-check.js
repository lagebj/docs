#!/usr/bin/env node

/**
 * Performance Budget Checker
 * Checks if the built assets exceed the defined performance budgets
 */

const fs = require('fs');
const path = require('path');

// Performance budgets (in bytes)
const BUDGETS = {
  css: {
    target: 50 * 1024, // 50 KB
    limit: 75 * 1024   // 75 KB
  },
  js: {
    target: 150 * 1024, // 150 KB
    limit: 200 * 1024   // 200 KB
  },
  // Add more budgets as needed
};

/**
 * Check if file size exceeds budget
 * @param {string} filePath - Path to the file
 * @param {object} budget - Budget limits
 * @param {string} resourceName - Name of the resource for reporting
 * @returns {object} Result with status and message
 */
function checkFileSize(filePath, budget, resourceName) {
  try {
    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;
    
    if (stats.size > budget.limit) {
      return {
        status: 'fail',
        message: `${resourceName} size (${sizeKB.toFixed(1)} KB) exceeds limit (${budget.limit / 1024} KB)`
      };
    } else if (stats.size > budget.target) {
      return {
        status: 'warn',
        message: `${resourceName} size (${sizeKB.toFixed(1)} KB) exceeds target (${budget.target / 1024} KB) but within limit`
      };
    } else {
      return {
        status: 'pass',
        message: `${resourceName} size (${sizeKB.toFixed(1)} KB) is within target`
      };
    }
  } catch (error) {
    return {
      status: 'error',
      message: `Error checking ${resourceName}: ${error.message}`
    };
  }
}

/**
 * Main function to run performance budget checks
 */
function runPerformanceChecks() {
  console.log('Running performance budget checks...\n');
  
  const results = [];
  let hasFailures = false;
  
  // Check CSS file size
  const cssFilePath = path.join(__dirname, '../output.css');
  if (fs.existsSync(cssFilePath)) {
    const cssResult = checkFileSize(cssFilePath, BUDGETS.css, 'Main CSS');
    results.push(cssResult);
    if (cssResult.status === 'fail') hasFailures = true;
  } else {
    results.push({
      status: 'error',
      message: 'Main CSS file not found'
    });
  }
  
  // Check section CSS files
  const sectionCssDir = path.join(__dirname, '../css/sections/output');
  if (fs.existsSync(sectionCssDir)) {
    const sectionFiles = fs.readdirSync(sectionCssDir);
    let totalSectionCssSize = 0;
    
    sectionFiles.forEach(file => {
      if (file.endsWith('.css')) {
        const filePath = path.join(sectionCssDir, file);
        const stats = fs.statSync(filePath);
        totalSectionCssSize += stats.size;
      }
    });
    
    const totalSizeKB = totalSectionCssSize / 1024;
    if (totalSectionCssSize > BUDGETS.css.limit) {
      results.push({
        status: 'fail',
        message: `Total section CSS size (${totalSizeKB.toFixed(1)} KB) exceeds limit (${BUDGETS.css.limit / 1024} KB)`
      });
      hasFailures = true;
    } else if (totalSectionCssSize > BUDGETS.css.target) {
      results.push({
        status: 'warn',
        message: `Total section CSS size (${totalSizeKB.toFixed(1)} KB) exceeds target (${BUDGETS.css.target / 1024} KB) but within limit`
      });
    } else {
      results.push({
        status: 'pass',
        message: `Total section CSS size (${totalSizeKB.toFixed(1)} KB) is within target`
      });
    }
  }
  
  // Print results
  results.forEach(result => {
    const statusIcon = result.status === 'pass' ? '✅' : 
                      result.status === 'warn' ? '⚠️ ' : 
                      result.status === 'fail' ? '❌' : '❓';
    console.log(`${statusIcon} ${result.message}`);
  });
  
  console.log('\nPerformance budget check complete.');
  
  // Exit with error code if there are failures
  if (hasFailures) {
    console.log('\n❌ Performance budget violations detected. Failing build.');
    process.exit(1);
  } else {
    console.log('\n✅ All performance budgets within limits.');
    process.exit(0);
  }
}

// Run the checks if this script is executed directly
if (require.main === module) {
  runPerformanceChecks();
}

module.exports = { checkFileSize, runPerformanceChecks };