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

// 用于 Terminal 视图中终端组件的文字颜色渲染
export function encodeConsoleColor(text) {
  const term = {};
  term.TERM_NULL = "\x1B[0m";
  term.TERM_TEXT_RED = "\x1B[1;0;31m";
  term.TERM_TEXT_GREEN = "\x1B[1;0;32m";
  term.TERM_TEXT_YELLOW = "\x1B[1;0;33m";
  term.TERM_TEXT_BLUE = "\x1B[1;1;34m";
  term.TERM_TEXT_FUCHSIA = "\x1B[1;0;35m";
  term.TERM_TEXT_CYAN = "\x1B[1;0;36m";
  term.TERM_TEXT_WHITE = "\x1B[1;0;37m";
  term.TERM_TEXT_B = "\x1B[1m";

  // 基本颜色
  text = text.replace(/\[([^[\]]+)\]/gim, "[§1$1§r]");
  text = text.replace(/([A-Za-z0-9 _§&;\-\\.]{1,}: )/gim, "§6$1§r");
  //   text = text.replace(/INFO/gm, term.TERM_TEXT_GREEN + "INFO" + term.TERM_NULL);
  //   text = text.replace(/(\d{2,}:\d{2,}:\d{2,})/gm, term.TERM_TEXT_CYAN + "$1" + term.TERM_NULL);

  // Minecraft 原生颜色替代解析
  text = text.replace(/§0/gm, term.TERM_TEXT_WHITE);
  text = text.replace(/§1/gm, term.TERM_TEXT_CYAN);
  text = text.replace(/§2/gm, term.TERM_TEXT_GREEN);
  text = text.replace(/§3/gm, term.TERM_TEXT_CYAN);
  text = text.replace(/§4/gm, term.TERM_TEXT_RED);
  text = text.replace(/§5/gm, term.TERM_TEXT_FUCHSIA);
  text = text.replace(/§6/gm, term.TERM_TEXT_YELLOW);
  text = text.replace(/§7/gm, term.TERM_TEXT_WHITE);
  text = text.replace(/§8/gm, term.TERM_TEXT_WHITE);
  text = text.replace(/§9/gm, term.TERM_TEXT_CYAN);
  text = text.replace(/§a/gm, term.TERM_TEXT_GREEN);
  text = text.replace(/§b/gm, term.TERM_TEXT_CYAN);
  text = text.replace(/§c/gm, term.TERM_TEXT_RED);
  text = text.replace(/§d/gm, term.TERM_TEXT_RED);
  text = text.replace(/§e/gm, term.TERM_TEXT_YELLOW);
  text = text.replace(/§f/gm, term.TERM_TEXT_WHITE);
  // 基于&符号
  text = text.replace(/&0/gm, term.TERM_TEXT_WHITE);
  text = text.replace(/&1/gm, term.TERM_TEXT_CYAN);
  text = text.replace(/&2/gm, term.TERM_TEXT_GREEN);
  text = text.replace(/&3/gm, term.TERM_TEXT_CYAN);
  text = text.replace(/&4/gm, term.TERM_TEXT_RED);
  text = text.replace(/&5/gm, term.TERM_TEXT_FUCHSIA);
  text = text.replace(/&6/gm, term.TERM_TEXT_YELLOW);
  text = text.replace(/&7/gm, term.TERM_TEXT_WHITE);
  text = text.replace(/&8/gm, term.TERM_TEXT_WHITE);
  text = text.replace(/&9/gm, term.TERM_TEXT_CYAN);
  text = text.replace(/&a/gm, term.TERM_TEXT_GREEN);
  text = text.replace(/&b/gm, term.TERM_TEXT_CYAN);
  text = text.replace(/&c/gm, term.TERM_TEXT_RED);
  text = text.replace(/&d/gm, term.TERM_TEXT_RED);
  text = text.replace(/&e/gm, term.TERM_TEXT_YELLOW);
  text = text.replace(/&f/gm, term.TERM_TEXT_WHITE);
  // 字体格式
  text = text.replace(/§r/gm, term.TERM_NULL);
  text = text.replace(/&r/gm, term.TERM_NULL);
  text = text.replace(/§k/gm, "\x1B[1m");
  text = text.replace(/&k/gm, "\x1B[1m");
  text = text.replace(/§l/gm, "\x1B[1m");
  text = text.replace(/&l/gm, "\x1B[1m");
  text = text.replace(/§m/gm, "\x1B[2m");
  text = text.replace(/&m/gm, "\x1B[2m");
  text = text.replace(/§n/gm, "\x1B[4m");
  text = text.replace(/&n/gm, "\x1B[4m");
  text = text.replace(/§o/gm, "\x1B[3m");
  text = text.replace(/&o/gm, "\x1B[3m");

  // 特殊文本替换
  var RegExpStringArr = [
    //蓝色
    [
      "Unknown command",
      "Loading libraries, please wait...",
      "Loading",
      "Loaded",
      "\\d{1,3}%",
      "true",
      "false",
      "plugin.yml"
    ],
    //绿色
    [
      "/help",
      "left the game",
      "Enabling",
      "Server thread",
      "Saving chunks for level",
      "----",
      "UUID",
      "Starting minecraft server version",
      "Timings Reset",
      "\\(",
      "\\)",
      "\\{",
      "\\}",
      '\\"',
      "&lt;",
      "&gt;",
      "Preparing start region for level"
    ],
    //红色
    ["WARN", "EULA", "Error", "Invalid", "Stopping the server", "Caused by", "Stopping"],
    //黄色
    [
      "Starting Minecraft server on",
      "world_the_end",
      "world_nether",
      "Done",
      "MCSMANAGER",
      "Server thread"
    ]
  ];
  for (var k in RegExpStringArr) {
    for (var y in RegExpStringArr[k]) {
      var reg = new RegExp("(" + RegExpStringArr[k][y].replace(/ /gim, "&nbsp;") + ")", "igm");
      if (k == 0)
        //蓝色
        text = text.replace(reg, term.TERM_TEXT_BLUE + "$1" + term.TERM_NULL);
      if (k == 1)
        //绿色
        text = text.replace(reg, term.TERM_TEXT_GREEN + "$1" + term.TERM_NULL);
      if (k == 2)
        //红色
        text = text.replace(reg, term.TERM_TEXT_RED + "$1" + term.TERM_NULL);
      if (k == 3)
        //黄色
        text = text.replace(reg, term.TERM_TEXT_YELLOW + "$1" + term.TERM_NULL);
    }
  }
  // 行结尾符号替换
  text = text.replace(/\r\n/gm, term.TERM_NULL + "\r\n");
  return text;
}
