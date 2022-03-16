/*
  Copyright (C) 2022 Suwings <Suwings@outlook.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
  
  According to the AGPL, it is forbidden to delete all copyright notices, 
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings <Suwings@outlook.com>

  该程序是免费软件，您可以重新分发和/或修改据 GNU Affero 通用公共许可证的条款，
  由自由软件基金会，许可证的第 3 版，或（由您选择）任何更高版本。

  根据 AGPL 与用户协议，您必须保留所有版权声明，如果修改源代码则必须开源修改后的源代码。
  可以前往 https://mcsmanager.com/ 阅读用户协议，申请闭源开发授权等。
*/

import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

export const termColor = {};
termColor.TERM_RESET = "\x1B[0m";
termColor.TERM_TEXT_BLACK = "\x1B[0;30m"; // Black §0
termColor.TERM_TEXT_DARK_BLUE = "\x1B[0;34m"; // Dark Blue §1
termColor.TERM_TEXT_DARK_GREEN = "\x1B[0;32m"; // Dark Green §2
termColor.TERM_TEXT_DARK_AQUA = "\x1B[0;36m"; // Dark Aqua §3
termColor.TERM_TEXT_DARK_RED = "\x1B[0;31m"; // Dark Red §4
termColor.TERM_TEXT_DARK_PURPLE = "\x1B[0;35m"; // Dark Purple §5
termColor.TERM_TEXT_GOLD = "\x1B[0;33m"; // Gold §6
termColor.TERM_TEXT_GRAY = "\x1B[0;37m"; // Gray §7
termColor.TERM_TEXT_DARK_GRAY = "\x1B[0;30;1m"; // Dark Gray §8
termColor.TERM_TEXT_BLUE = "\x1B[0;34;1m"; // Blue §9
termColor.TERM_TEXT_GREEN = "\x1B[0;32;1m"; // Green §a
termColor.TERM_TEXT_AQUA = "\x1B[0;36;1m"; // Aqua §b
termColor.TERM_TEXT_RED = "\x1B[0;31;1m"; // Red §c
termColor.TERM_TEXT_LIGHT_PURPLE = "\x1B[0;35;1m"; // Light Purple §d
termColor.TERM_TEXT_YELLOW = "\x1B[0;33;1m"; // Yellow §e
termColor.TERM_TEXT_WHITE = "\x1B[0;37;1m"; // White §f
termColor.TERM_TEXT_OBFUSCATED = "\x1B[5m"; // Obfuscated §k
termColor.TERM_TEXT_BOLD = "\x1B[21m"; // Bold §l
termColor.TERM_TEXT_STRIKETHROUGH = "\x1B[9m"; // Strikethrough §m
termColor.TERM_TEXT_UNDERLINE = "\x1B[4m"; // Underline §n
termColor.TERM_TEXT_ITALIC = "\x1B[3m"; // Italic §o
termColor.TERM_TEXT_B = "\x1B[1m";

export function initTerminalWindow(elem, fontSize = 13) {
  const term = new Terminal({
    rendererType: "canvas",
    convertEol: true,
    disableStdin: false,
    cursorStyle: "underline",
    cursorBlink: true,
    fontSize: fontSize,
    theme: {
      background: "#1e1e1e"
    }
  });
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(elem);

  // 设置终端宽度，报险起见设置两次
  term.fitAddon = fitAddon;

  term.writeln(
    `${termColor.TERM_TEXT_GOLD}MCSManager Terminal ${termColor.TERM_TEXT_DARK_AQUA}[Powered by Term.js]`
  );
  term.writeln(
    `${termColor.TERM_TEXT_GOLD}Copyright Suwings All rights reserved${termColor.TERM_RESET}\r\n`
  );
  term.info = (msg) => {
    term.writeln(`\r\n[MCSManager] [INFO] ${msg}`);
  };
  // term.prompt = () => {
  //   term.write(`${termColor.TERM_RESET}\r\n$ `);
  // };
  //term.prompt();
  return term;
}

export function textToTermText(data) {
  let text = `${data}`;
  text = text.replace(/§0/gim, termColor.TERM_TEXT_BLACK);
  text = text.replace(/§1/gim, termColor.TERM_TEXT_DARK_BLUE);
  text = text.replace(/§2/gim, termColor.TERM_TEXT_DARK_GREEN);
  text = text.replace(/§3/gim, termColor.TERM_TEXT_DARK_AQUA);
  text = text.replace(/§4/gim, termColor.TERM_TEXT_DARK_RED);
  text = text.replace(/§5/gim, termColor.TERM_TEXT_DARK_PURPLE);
  text = text.replace(/§6/gim, termColor.TERM_TEXT_GOLD);
  text = text.replace(/§7/gim, termColor.TERM_TEXT_GRAY);
  text = text.replace(/§8/gim, termColor.TERM_TEXT_DARK_GRAY);
  text = text.replace(/§9/gim, termColor.TERM_TEXT_BLUE);
  text = text.replace(/§a/gim, termColor.TERM_TEXT_GREEN);
  text = text.replace(/§b/gim, termColor.TERM_TEXT_AQUA);
  text = text.replace(/§c/gim, termColor.TERM_TEXT_RED);
  text = text.replace(/§d/gim, termColor.TERM_TEXT_LIGHT_PURPLE);
  text = text.replace(/§e/gim, termColor.TERM_TEXT_YELLOW);
  text = text.replace(/§f/gim, termColor.TERM_TEXT_WHITE);
  text = text.replace(/§k/gim, termColor.TERM_TEXT_OBFUSCATED);
  text = text.replace(/§l/gim, termColor.TERM_TEXT_BOLD);
  text = text.replace(/§m/gim, termColor.TERM_TEXT_STRIKETHROUGH);
  text = text.replace(/§n/gim, termColor.TERM_TEXT_UNDERLINE);
  text = text.replace(/§o/gim, termColor.TERM_TEXT_ITALIC);
  text = text.replace(/§r/gim, termColor.TERM_RESET);
  // 行结尾符号替换
  text = text.replace(/\r\n/gm, termColor.TERM_RESET + "\r\n");
  return text;
}
