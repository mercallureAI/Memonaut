#!/usr/bin/env node
// memo-index.mjs — 扫描 experiences/ 生成 .memonaut/index.md
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { homedir } from 'os';
import { readdirSync, statSync } from 'fs';

// 定位 vault 路径
function getVaultPath() {
  const configPath = join(homedir(), '.memonaut.json');
  if (existsSync(configPath)) {
    return JSON.parse(readFileSync(configPath, 'utf-8')).vaultPath;
  }
  return join(homedir(), 'memonaut-vault');
}

// 递归扫描 .md 文件
function scanMd(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      scanMd(full, files);
    } else if (entry.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

// 从 md 文件提取标题和标签
function extractMeta(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const tagMatch = content.match(/\*\*标签\*\*:\s*(.+)$/m);
  return {
    title: titleMatch ? titleMatch[1].trim() : '(无标题)',
    tags: tagMatch ? tagMatch[1].trim() : '',
  };
}

const vaultPath = getVaultPath();
const expDir = join(vaultPath, 'experiences');
const files = scanMd(expDir);

console.log(`[memo-index] 扫描 ${expDir}，找到 ${files.length} 个文件`);

let index = '# 经验索引\n\n';
for (const f of files) {
  const rel = relative(vaultPath, f).replace(/\\/g, '/');
  const { title, tags } = extractMeta(f);
  index += `- **${title}**${tags ? ` | 标签: ${tags}` : ''} → \`${rel}\`\n`;
}

const indexPath = join(vaultPath, '.memonaut', 'index.md');
writeFileSync(indexPath, index);
console.log(`[memo-index] 索引已写入: ${indexPath}`);
