import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join, parse } from 'path';

const dir = 'public/projects';
const files = readdirSync(dir).filter(f => f.endsWith('.png'));

let done = 0;
for (const f of files) {
  const input = join(dir, f);
  const name = parse(f).name;
  const output = join(dir, name + '.webp');
  await sharp(input).webp({ quality: 85, effort: 4 }).toFile(output);
  const { size: oldSize } = await import('fs').then(m => m.statSync(input));
  const { size: newSize } = await import('fs').then(m => m.statSync(output));
  done++;
  console.log(`${f}: ${(oldSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${((1-newSize/oldSize)*100).toFixed(0)}% saved)`);
}
console.log(`\nConverted ${done} files`);
