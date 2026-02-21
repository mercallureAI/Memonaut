#!/usr/bin/env node
// memo-init.mjs — 初始化 Memonaut vault
import { mkdirSync, copyFileSync, existsSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const templateDir = join(__dirname, '..', 'template');

// 确定 vault 路径
const vaultPath = resolve(process.argv[2] || join(homedir(), 'memonaut-vault'));
console.log(`[memo-init] 初始化 vault: ${vaultPath}`);

// 递归复制目录，跳过已存在的文件
function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (!existsSync(destPath)) {
      copyFileSync(srcPath, destPath);
      console.log(`  创建: ${destPath}`);
    } else {
      console.log(`  跳过(已存在): ${destPath}`);
    }
  }
}

copyDir(templateDir, vaultPath);

// 写入 ~/.memonaut.json
const configPath = join(homedir(), '.memonaut.json');
writeFileSync(configPath, JSON.stringify({ vaultPath }, null, 2));
console.log(`[memo-init] 配置已写入: ${configPath}`);
console.log('[memo-init] 完成！可在 Obsidian 中打开此 vault。');
