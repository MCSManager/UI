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

export const TERM_TEXT_RED = "\x1B[31m";
export const TERM_TEXT_GREEN = "\x1B[32m";
export const TERM_TEXT_YELLOW = "\x1B[33m";
export const TERM_TEXT_BLUE = "\x1B[34m";
export const TERM_TEXT_FUCHSIA = "\x1B[35m";
export const TERM_TEXT_CYAN = "\x1B[36m";
export const TERM_TEXT_WHITE = "\x1B[37m";
export const TERM_TEXT_B = "\x1B[1m";

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
  fitAddon.fit();
  setTimeout(() => {
    fitAddon.fit();
  }, 3000);

  term.writeln(`${TERM_TEXT_YELLOW}MCSManager Terminal ${TERM_TEXT_CYAN}[Powered by Term.js]`);
  term.writeln(`${TERM_TEXT_YELLOW}Copyright Suwings All rights reserved${TERM_TEXT_WHITE}`);
  term.info = (msg) => {
    term.writeln(`\r\n[MCSManager] [INFO] ${msg}`);
  };
  term.prompt = () => {
    term.write(`${TERM_TEXT_WHITE}\r\n$`);
  };
  term.prompt();
  return term;
}

export function textToTermText(data) {
  let text = `${data}`;
  text = text.replace(/§0/gim, TERM_TEXT_WHITE);
  text = text.replace(/§1/gim, TERM_TEXT_BLUE);
  text = text.replace(/§2/gim, TERM_TEXT_GREEN);
  text = text.replace(/§3/gim, TERM_TEXT_BLUE);
  text = text.replace(/§4/gim, TERM_TEXT_RED);
  text = text.replace(/§5/gim, TERM_TEXT_FUCHSIA);
  text = text.replace(/§6/gim, TERM_TEXT_YELLOW);
  text = text.replace(/§7/gim, TERM_TEXT_WHITE);
  text = text.replace(/§8/gim, TERM_TEXT_WHITE);
  text = text.replace(/§9/gim, TERM_TEXT_BLUE);
  text = text.replace(/§a/gim, TERM_TEXT_GREEN);
  text = text.replace(/§b/gim, TERM_TEXT_GREEN);
  text = text.replace(/§c/gim, TERM_TEXT_RED);
  text = text.replace(/§d/gim, TERM_TEXT_CYAN);
  text = text.replace(/§e/gim, TERM_TEXT_YELLOW);
  text = text.replace(/§f/gim, TERM_TEXT_WHITE);
  text = text.replace(/§g/gim, TERM_TEXT_YELLOW);
  text = text.replace(/§k/gim, TERM_TEXT_WHITE);
  text = text.replace(/§i/gim, TERM_TEXT_B);
  text = text.replace(/§l/gim, TERM_TEXT_B);
  text = text.replace(/§m/gim, TERM_TEXT_WHITE);
  text = text.replace(/§n/gim, TERM_TEXT_WHITE);
  text = text.replace(/§o/gim, TERM_TEXT_WHITE);
  text = text.replace(/§r/gim, TERM_TEXT_WHITE);
  text = text.replace(/\r\n/gim, `\n`);
  text = text.replace(/\r/gim, `\n`);
  text = text.replace(/\n/gim, `${TERM_TEXT_WHITE}\n`);
  return text;
}
