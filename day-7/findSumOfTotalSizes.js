function readData() {
  const fs = require('fs');
  const buffer = fs.readFileSync('data.txt', 'utf8');
  const dataString = buffer.toString();
  return dataString.split('\n');
}
// const fileSystemCommands = [
//   '$ cd /', '$ ls',  'dir a', '14848514 b.txt',
//   '8504156 c.dat', 'dir d',  '$ cd a', '$ ls',
//   'dir e', '29116 f',  '2557 g', '62596 h.lst',
//   '$ cd e', '$ ls',  '584 i', '$ cd ..',
//   '$ cd ..', '$ cd d',  '$ ls', '4060174 j',
//   '8033020 d.log', '5626152 d.ext',  '7214296 k',
// ];

// const fileSystem = {
//   '/': {
//     a: {
//       e: { i: { size: 584 } },
//       f: { size: 29116 },
//       g: { size: 2557 },
//       'h.lst': { size: 62596 }
//     },
//     'b.txt': { size: 14848514 },
//     'c.dat': { size: 8504156 },
//     d: {
//       j: { size: 4060174 },
//       'd.log': { size: 8033020 },
//       'd.ext': { size: 5626152 },
//       k: { size: 7214296 }
//     }
//   }
// }

function findCurrentPathObject(path, fileSystem) {
  let currentPathObject = fileSystem['/'];
  const pathParts = path !== '/' ? path.split('/') : [];

  pathParts.forEach((pathPart) => {
    if (pathPart === '') return;
    currentPathObject = currentPathObject[pathPart];
  });

  return currentPathObject;
}

function convertCommandsToFileSystem(commands) {
  const fileSystem = {
    '/': {},
  };
  let currentPath = '/';
  let currentPathObject = findCurrentPathObject(currentPath, fileSystem);

  commands.forEach((command) => {
    if (command.startsWith('$ cd ..')) {
      const pathParts = currentPath.split('/');
      //'/a/b/c'=> '/a/b/'
      pathParts.splice(pathParts.length - 2, 1);
      currentPath = pathParts.join('/');
      currentPathObject = findCurrentPathObject(currentPath, fileSystem);
    } else if (command.startsWith('$ cd ')) {
      const path = command.split(' ')[2];
      if (path === '/') return;
      currentPath += path + '/';
      currentPathObject = findCurrentPathObject(currentPath, fileSystem);
    } else if (command.startsWith('$ ls')) {
      return;
    } else if (command.startsWith('dir ')) {
      const path = command.split(' ')[1];
      if (!currentPathObject[path]) {
        currentPathObject[path] = {};
      }
    } else {
      const [size, fileName] = command.split(' ');
      currentPathObject[fileName] = {
        size: parseInt(size),
      };
    }
  });
  console.dir(fileSystem, { depth: null });
  return fileSystem;
}

function findSumOfTotalSizes() {
  const commands = readData();
  convertCommandsToFileSystem(commands);
}
findSumOfTotalSizes();
