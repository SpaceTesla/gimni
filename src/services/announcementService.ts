import * as fs from 'fs';
import * as path from 'path';

type Announcement = {
  title: string;
  content: string;
  image: string;
};

export function getAnnouncement(): Announcement {
  const filePath = path.join(process.cwd(), 'src/data/announcement.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
