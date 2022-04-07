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

import {
  TYPE_MINECRAFT_JAVA,
  TYPE_MINECRAFT_BDS,
  TYPE_MINECRAFT_BUKKIT,
  TYPE_MINECRAFT_BUNGEECORD,
  TYPE_MINECRAFT_GEYSER,
  TYPE_MINECRAFT_PAPER,
  TYPE_MINECRAFT_SPIGOT,
  TYPE_MINECRAFT_BEDROCK,
  TYPE_MINECRAFT_FORGE,
  TYPE_MINECRAFT_FABRIC,
  TYPE_MINECRAFT_SPONGE,
  TYPE_MINECRAFT_MOHIST
} from "./instance_type";

export function getInstanceConfigByType(type) {
  let result = [];
  INSTANCE_CONFIGS.forEach((v) => {
    if (v.category.includes(type)) result.push(v);
  });
  // 返回副本以避免干扰原始数据
  return JSON.parse(JSON.stringify(result));
}

// 所有配置文件列表
export const INSTANCE_CONFIGS = [
  {
    // 配置文件显示名
    fileName: "[通用] server.properties",
    // 配置文件对应的实际路径（相对于实例根目录）
    path: "server.properties",
    // 配置文件用于显示界面的组件名（参考 ProcessConfigFile.vue 的 components 属性）
    redirect: "common/server.properties",
    // 配置文件解析类型，支持 yml,json,txt,properties
    type: "properties",
    // 配置文件中文解释
    info: `Minecraft 服务端极其重要的配置文件，几乎绝大部分常用配置（端口，人数，视距等）均在此文件中进行编辑`,
    // 配置文件适配模块作者名
    author: "Suwings",
    // 配置文件 Github 地址（只能放置 Github 地址）
    github: "https://github.com/Suwings",
    // 在哪些服务端类型下此配置文件可见
    category: [
      TYPE_MINECRAFT_SPIGOT,
      TYPE_MINECRAFT_PAPER,
      TYPE_MINECRAFT_JAVA,
      TYPE_MINECRAFT_BUKKIT,
      TYPE_MINECRAFT_FORGE,
      TYPE_MINECRAFT_FABRIC,
      TYPE_MINECRAFT_SPONGE
    ]
  },
  {
    fileName: "[通用] eula.txt",
    type: "properties",
    info: "软件最终用户协议，此协议必须设置同意，否则无法启用服务端软件",
    path: "eula.txt",
    redirect: "common/eula.txt",
    author: "Lazy",
    github: "https://github.com/LazyCreeper/",
    category: [
      TYPE_MINECRAFT_SPIGOT,
      TYPE_MINECRAFT_PAPER,
      TYPE_MINECRAFT_JAVA,
      TYPE_MINECRAFT_BUKKIT,
      TYPE_MINECRAFT_FABRIC,
      TYPE_MINECRAFT_SPONGE
    ]
  },
  {
    fileName: "[Spigot] spigot.yml",
    path: "spigot.yml",
    redirect: "bukkit/spigot.yml",
    type: "yml",
    info: "Spigot 配置文件，能够进一步的控制服务器的行为和具体参数，一些更为高级的限制都在此配置文件中",
    author: "Suwings",
    github: "https://github.com/Suwings",
    category: [
      TYPE_MINECRAFT_SPIGOT,
      TYPE_MINECRAFT_PAPER,
      TYPE_MINECRAFT_JAVA,
      TYPE_MINECRAFT_BUKKIT
    ]
  },
  // {
  //   fileName: "[Bukkit] permissions.yml",
  //   path: "permissions.yml",
  //   redirect: "bukkit/permissions.yml",
  //   type: "yml",
  //   info: "基本权限配置文件，一般情况无需多过改动",
  //   author: "Suwings",
  //   github: "https://github.com/Suwings",
  //   category: [TYPE_MINECRAFT_SPIGOT, TYPE_MINECRAFT_PAPER, TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_BUKKIT]
  // },
  // {
  //   fileName: "[Bukkit] commands.yml",
  //   path: "commands.yml",
  //   redirect: "bukkit/commands.yml",
  //   type: "yml",
  //   info: "Bukkit 原始命令文件，一般情况无需改动",
  //   author: "Suwings",
  //   github: "https://github.com/Suwings",
  //   category: [TYPE_MINECRAFT_SPIGOT, TYPE_MINECRAFT_PAPER, TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_BUKKIT]
  // },
  {
    fileName: "[Bukkit] bukkit.yml",
    path: "bukkit.yml",
    redirect: "bukkit/bukkit.yml",
    type: "yml",
    info: "Bukkit 原始配置文件",
    author: "AlexanderMC8533 & Lazy",
    github: "https://github.com/AlexanderMC8533/",
    category: [
      TYPE_MINECRAFT_SPIGOT,
      TYPE_MINECRAFT_PAPER,
      TYPE_MINECRAFT_JAVA,
      TYPE_MINECRAFT_BUKKIT
    ]
  },
  // {
  //   fileName: "[Bukkit] whitelist.json",
  //   type: "json",
  //   info: "服务器白名单",
  //   path: "whitelist.json",
  //   redirect: "bukkit/whitelist.json",
  //   author: "Suwings",
  //   github: "https://github.com/Suwings",
  //   category: [TYPE_MINECRAFT_SPIGOT, TYPE_MINECRAFT_PAPER, TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_BUKKIT]
  // },
  // {
  //   fileName: "[Bukkit] ops.json",
  //   type: "json",
  //   info: "服务器管理员列表",
  //   path: "ops.json",
  //   redirect: "bukkit/ops.json",
  //   author: "Suwings",
  //   github: "https://github.com/Suwings",
  //   category: [TYPE_MINECRAFT_SPIGOT, TYPE_MINECRAFT_PAPER, TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_BUKKIT]
  // },
  {
    fileName: "[Bungeecord] config.yml",
    type: "yml",
    info: "Bungeecord 群组服务端的重要配置文件，可以进行分布式管理，节点控制等，但此配置文件较为复杂，此处仅供简单的配置和操作",
    path: "config.yml",
    redirect: "bungeecord/config.yml",
    author: "Lazy",
    github: "https://github.com/LazyCreeper/",
    category: [TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_BUNGEECORD]
  },
  {
    fileName: "[Bedrock] server.properties",
    path: "server.properties",
    redirect: "bds/server.properties",
    type: "properties",
    info: `Minecraft Bedrock 服务端极其重要的配置文件，几乎绝大部分常用配置（端口，人数，视距等）均在此文件中进行编辑`,
    author: "Lazy",
    github: "https://github.com/LazyCreeper",
    category: [TYPE_MINECRAFT_BDS, TYPE_MINECRAFT_BEDROCK]
  },
  {
    fileName: "[Mohist] mohist.yml",
    path: "mohist.yml",
    redirect: "mohist/mohist.yml",
    type: "yml",
    info: "mohist.yml 服务端配置文件",
    author: "Suwings",
    github: "https://github.com/LazyCreeper",
    category: [TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_MOHIST]
  },
  {
    fileName: "[Paper] paper.yml",
    type: "yml",
    info: "PaperSpigot 服务端软件配置文件，能够进一步的配置高级参数以及更具体化的游戏设置，对整体性能有极大的决定效果",
    path: "paper.yml",
    redirect: "paper/paper.yml",
    author: "Lazy",
    github: "https://github.com/LazyCreeper",
    category: [TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_PAPER]
  },
  {
    fileName: "[Geyser] config.yml",
    type: "yml",
    info: "Geyser 服务端软件配置文件，拥有基本的服务器参数设定（如端口，最大玩家数等）并且也可以设定服务端细节参数（区块缓存，线程数等）",
    path: "config.yml",
    redirect: "geyser/config.yml",
    author: "Lazy",
    github: "https://github.com/LazyCreeper",
    category: [TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_GEYSER]
  }
];
