const fs = require('fs');
const path = require('path');

const replacements = {
  'pink': 'sky',
  'fuchsia': 'cyan',
  'purple': 'teal',
  '#d946ef': '#0ea5e9',
  '#8b5cf6': '#06b6d4',
  'from-indigo-600': 'from-blue-600',
  'to-indigo-500': 'to-blue-500',
  '99,102,241': '59,130,246'
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [oldStr, newStr] of Object.entries(replacements)) {
    const regex = new RegExp(oldStr, 'gi');
    if (regex.test(content)) {
      content = content.replace(regex, newStr);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
