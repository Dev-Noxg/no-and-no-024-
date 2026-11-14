import config from '../config.js';
import sections from './sections.js';
import { uniqueCommands } from './loader.js';
import { fmtDur } from './utils.js';

const startedAt = Date.now();
const LINE = '┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈';

export function mainMenu(pushName = 'صديقي') {
  const all = uniqueCommands();
  const date = new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });

  let t = `╭─❖ 𝐍𝐎 𝐀𝐍𝐃 𝐍𝐎 ❖─╮\n`;
  t += `│\n`;
  t += `│  🍃 أهلاً، ${pushName}\n`;
  t += `│  🎯 الأوامر  ·  ${all.length}\n`;
  t += `│  🟢 الحالة   ·  مستقر\n`;
  t += `│  👑 المطور   ·  ${config.developer}\n`;
  t += `│  🚀 التشغيل  ·  ${fmtDur(Date.now() - startedAt)}\n`;
  t += `│  📅 اليوم    ·  ${date}\n`;
  t += `│\n`;
  t += `╰${'─'.repeat(17)}╯\n\n`;

  t += `📂 *الأقسام*\n${LINE}\n`;
  sections.forEach((s, i) => {
    const n = all.filter(c => c.section === s.key).length;
    t += `${pad(i + 1)} ${s.emoji}  ${s.name}  ${dots(s.name, n)}${n}\n`;
  });
  t += `${LINE}\n`;
  t += `↪️ *${config.prefix}اوامر <رقم>* لعرض قسم\n`;
  t += `   مثال: ${config.prefix}اوامر 2\n\n`;
  t += `𝐛𝐲 · ${config.developer} ✦`;
  return t;
}

function pad(n) { return `\`${String(n).padStart(2, '0')}\``; }
function dots(label, count) {
  const used = label.length + String(count).length;
  const total = 22;
  return '·'.repeat(Math.max(2, total - used)) + ' ';
}

export function sectionMenu(num) {
  const s = sections[num - 1];
  if (!s) return `❌ رقم القسم غير صحيح. اكتب ${config.prefix}اوامر لعرض الأقسام.`;
  const list = uniqueCommands().filter(c => c.section === s.key);

  let t = `╭─ ${s.emoji} *${s.name}* ─╮\n`;
  t += `│ ${s.desc}\n`;
  t += `│ 📦 ${list.length} أمر\n`;
  t += `╰${'─'.repeat(14)}╯\n\n`;

  if (!list.length) {
    t += '🔸 لسه مفيش أوامر في القسم ده.';
    return t;
  }

  t += list.map(c => {
    const tag = c.owner ? '👑' : c.admin ? '🛡️' : c.group ? '👥' : '▫️';
    return `${tag} *${config.prefix}${c.name}*\n   ↳ ${c.desc || '—'}`;
  }).join('\n\n');

  t += `\n\n${LINE}\n👑 مطور  ·  🛡️ أدمن  ·  👥 جروبات بس`;
  return t;
}
