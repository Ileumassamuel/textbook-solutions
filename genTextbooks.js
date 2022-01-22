const fs = require('fs');

const getDirectories = (source) =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const getTags = (content) => {
  const lines = content.split('\n').filter(stuff => stuff !== "");
  const parsedTags = lines.map(line => line.split('-')[1].trim());
  return parsedTags;
};

const rootPath = './textbooks';

let textbookItems = [];
const authors = getDirectories(rootPath);

for (const author of authors) {
  const titles = getDirectories(`${rootPath}/${author}`);

  for (const title of titles) {

    const data = fs.readFileSync(`${rootPath}/${author}/${title}/tags.yaml`, 'utf8');
    const tags = getTags(data);

    const editions = getDirectories(`${rootPath}/${author}/${title}`);

    textbookItems.push({
      title,
      author,
      editions,
      tags: tags
    });
  }

}

fs.writeFileSync(`./textbooks.json`, JSON.stringify(textbookItems, null, 4));
