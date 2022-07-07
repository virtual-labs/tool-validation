let testFolder = '../../build/';
const fs = require('fs');
const got = require('got');
const { JSDOM } = require("jsdom");
function main() {
  findFiles(testFolder);
}

main();

function check(file) {
  const html = fs.readFileSync(file);
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href !== null) {
      if (href.startsWith('http://')) {
        console.log(file, href);
      }
    }
  });
}

function findFiles(folder) {
  fs.readdir(folder, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach(file => {
      if (file.isDirectory()) {
        findFiles(folder + file.name + "/");
      } else {
        if (file.name.endsWith('.html')) {
          check(folder + file.name);
        }
      }
    });
  });
}