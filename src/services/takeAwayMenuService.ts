import * as fs from 'fs';
import * as path from 'path';
import { MenuData } from '@/data/menu';

export function getMenuData(): MenuData {
  const filePath = path.join(process.cwd(), 'src/data/takeAwayMenu.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
