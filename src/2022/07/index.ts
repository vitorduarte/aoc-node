import { readFileSync } from 'fs';
import path from 'path';
import { inspect } from 'util';

interface File {
  name: string;
  size: number;
}

interface Folder {
  parent?: Folder;
  name: string;
  childs: (File | Folder)[];
}

const isFolder = (folder: any) => 'childs' in folder;

const main = () => {
  const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim().split('\n');
  const filesTree = mountFileTree(input);
  const allFoldersSize = calculateAllFoldersSize(filesTree);

  solvePart1(allFoldersSize);
  solvePart2(allFoldersSize);
};

const addToFolderIfNotExist = (child: File | Folder, folder: Folder) => {
  const foundChild = folder.childs.find((f) => f.name === child.name);
  if (!foundChild) {
    folder.childs.push(child);
  }
};

const calculateFolderSize = (folder: Folder): number => {
  return folder.childs.reduce(
    (acc, curr) => (isFolder(curr) ? acc + calculateFolderSize(curr as Folder) : acc + (curr as File).size),
    0
  );
};

interface FolderSize extends File {}
const calculateAllFoldersSize = (folder: Folder): FolderSize[] => {
  const foldersSize = folder.childs.reduce((acc: FolderSize[], curr) => {
    if (isFolder(curr)) {
      acc.push({ name: curr.name, size: calculateFolderSize(curr as Folder) });
      acc.push(...calculateAllFoldersSize(curr as Folder));
      return acc;
    }
    return acc;
  }, []);
  if (folder.name === '/') {
    foldersSize.push({ name: '/', size: calculateFolderSize(folder) });
  }
  return foldersSize;
};

const mountFileTree = (input: string[]): Folder => {
  const rootFolder: Folder = { name: '/', childs: [] };
  let currentFolder = rootFolder;

  return input.reduce((acc, curr) => {
    const cdResponse = curr.match(/\$ cd (.*)/);
    if (cdResponse) {
      const dir = cdResponse[1];
      if (dir === '/') {
        currentFolder = rootFolder;
        return rootFolder;
      }

      if (dir === '..') {
        currentFolder = currentFolder.parent || rootFolder;
        return rootFolder;
      }

      const newFolder = currentFolder.childs.find((f) => f.name === dir) as Folder;
      currentFolder = newFolder;
      return rootFolder;
    }

    const dirResponse = curr.match(/dir (.*)/);
    if (dirResponse) {
      const newDir: Folder = {
        parent: currentFolder,
        name: dirResponse[1],
        childs: []
      };
      addToFolderIfNotExist(newDir, currentFolder);
    }

    const fileResponse = curr.match(/(\d+) (.*)/);
    if (fileResponse) {
      const [, size, name] = fileResponse;
      const newFile: File = {
        name,
        size: parseInt(size)
      };
      addToFolderIfNotExist(newFile, currentFolder);
    }

    return rootFolder;
  }, rootFolder);
};

const solvePart1 = (foldersSize: FolderSize[]) => {
  const result = foldersSize.filter((f) => f.size < 100000).reduce((acc, curr) => acc + curr.size, 0);
  console.log('Part 1 Solution :>> ', result);
};

const solvePart2 = (foldersSize: FolderSize[]) => {
  const totalSpace = 70000000;
  const desiredSpace = 30000000;

  const usedSpace = foldersSize.find((f) => f.name === '/')!.size;
  const unusedSpace = totalSpace - usedSpace;
  const folderToDeleteSize = desiredSpace - unusedSpace;

  const [folderToDelete] = foldersSize.filter((f) => f.size >= folderToDeleteSize).sort((a, b) => a.size - b.size);
  const result = folderToDelete.size;
  console.log('Part 2 Solution :>> ', result);
};

main();
