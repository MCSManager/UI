// Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>

// This file is only for Chinese users, Added Chinese explanation to the configuration file
// 此文件仅用于中国用户，其作用是为配置文件新增中文解释

import {
  TYPE_MINECRAFT_JAVA,
  TYPE_MINECRAFT_BDS,
  TYPE_MINECRAFT_BUKKIT,
  TYPE_MINECRAFT_BUNGEECORD,
  TYPE_MINECRAFT_VELOCITY,
  TYPE_MINECRAFT_GEYSER,
  TYPE_MINECRAFT_PAPER,
  TYPE_MINECRAFT_SPIGOT,
  TYPE_MINECRAFT_BEDROCK,
  TYPE_MINECRAFT_FORGE,
  TYPE_MINECRAFT_FABRIC,
  TYPE_MINECRAFT_SPONGE,
  TYPE_MINECRAFT_MOHIST,
  TYPE_MINECRAFT_MCDR
} from "./instance_type";
import i18n from "../i18n"
const $t=i18n.global.t

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
    fileName: $t("processConfig.introduction.bdsServerProperties.name"),
    type: "properties",
    info: $t("processConfig.introduction.bdsServerProperties.info"),
    path: "server.properties",
    redirect: "bds/server.properties",
    author: "Lazy",
    github: "https://github.com/LazyCreeper",
    category: [TYPE_MINECRAFT_BDS, TYPE_MINECRAFT_BEDROCK]
  },
  {
    fileName: $t("processConfig.introduction.bukkitYml.name"),
    type: "yml",
    info: $t("processConfig.introduction.bukkitYml.info"),
    path: "bukkit.yml",
    redirect: "bukkit/bukkit.yml",
    author: "AlexanderMC8533 & Lazy",
    github: "https://github.com/AlexanderMC8533/",
    category: [
      TYPE_MINECRAFT_SPIGOT,
      TYPE_MINECRAFT_PAPER,
      TYPE_MINECRAFT_JAVA,
      TYPE_MINECRAFT_BUKKIT
    ]
  },
  {
    fileName: $t("processConfig.introduction.configYml.name"),
    type: "yml",
    info: $t("processConfig.introduction.configYml.info"),
    path: "config.yml",
    redirect: "bungeecord/config.yml",
    author: "Lazy",
    github: "https://github.com/LazyCreeper/",
    category: [TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_BUNGEECORD]
  },
  {
    fileName: $t("processConfig.introduction.eulaTxt.name"),
    type: "properties",
    info: $t("processConfig.introduction.eulaTxt.info"),
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
    fileName: $t("processConfig.introduction.geyserYml.name"),
    type: "yml",
    info: $t("processConfig.introduction.geyserYml.info"),
    path: "config.yml",
    redirect: "geyser/config.yml",
    author: "Lazy",
    github: "https://github.com/LazyCreeper",
    category: [TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_GEYSER]
  },
  {
    fileName: $t("processConfig.introduction.mcdrConfigYml.name"),
    type: "yml",
    info: $t("processConfig.introduction.mcdrConfigYml.info"),
    path: "config.yml",
    redirect: "mcdr/config.yml",
    author: "Huaji_MUR233",
    github: "https://github.com/HuajiMUR233",
    category: [TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_MCDR]
  },
  {
    fileName: $t("processConfig.introduction.mohistYml.name"),
    type: "yml",
    info: $t("processConfig.introduction.mohistYml.info"),
    path: "mohist.yml",
    redirect: "mohist/mohist.yml",
    author: "Unitwk",
    github: "https://github.com/LazyCreeper",
    category: [TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_MOHIST]
  },
  {
    fileName: $t("processConfig.introduction.paperYml.name"),
    type: "yml",
    info: $t("processConfig.introduction.paperYml.info"),
    path: "paper.yml",
    redirect: "paper/paper.yml",
    author: "Lazy",
    github: "https://github.com/LazyCreeper",
    category: [TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_PAPER]
  },
  {
    fileName: $t("processConfig.introduction.paperGlobalYml.name"),
    type: "yml",
    info: $t("processConfig.introduction.paperGlobalYml.info"),
    path: "config/paper-global.yml",
    redirect: "paper/paper-global.yml",
    author: "Lazy",
    github: "https://github.com/LazyCreeper",
    category: [TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_PAPER]
  },
  {
    fileName: $t("processConfig.introduction.paperWorldDefaults.name"),
    type: "yml",
    info: $t("processConfig.introduction.paperWorldDefaults.info"),
    path: "config/paper-world-defaults.yml",
    redirect: "paper/paper-world-defaults.yml",
    author: "Lazy",
    github: "https://github.com/LazyCreeper",
    category: [TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_PAPER]
  },
  {
    fileName: $t("processConfig.introduction.permissionYml.name"),
    type: "yml",
    info: $t("processConfig.introduction.permissionYml.info"),
    path: "permission.yml",
    redirect: "mcdr/permission.yml",
    author: "Huaji_MUR233",
    github: "https://github.com/HuajiMUR233",
    category: [TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_MCDR]
  },
  {
    fileName: $t("processConfig.introduction.serverProperties.name"),
    type: "properties",
    info: $t("processConfig.introduction.serverProperties.info"),
    path: "server.properties",
    redirect: "common/server.properties",
    author: "Unitwk",
    github: "https://github.com/Unitwk",
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
    fileName: $t("processConfig.introduction.spigotYml.name"),
    type: "yml",
    info: $t("processConfig.introduction.spigotYml.info"),
    path: "spigot.yml",
    redirect: "bukkit/spigot.yml",
    author: "Unitwk",
    github: "https://github.com/Unitwk",
    category: [
      TYPE_MINECRAFT_SPIGOT,
      TYPE_MINECRAFT_PAPER,
      TYPE_MINECRAFT_JAVA,
      TYPE_MINECRAFT_BUKKIT
    ]
  },
  {
    fileName: $t("processConfig.introduction.velocityToml.name"),
    type: "toml",
    info: $t("processConfig.introduction.velocityToml.info"),
    path: "velocity.toml",
    redirect: "velocity/velocity.toml",
    author: "WhitePaper233",
    github: "https://github.com/WhitePaper233/",
    category: [TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_VELOCITY]
  }
  // {
  //   fileName: "[Bukkit] permissions.yml",
  //   path: "permissions.yml",
  //   redirect: "bukkit/permissions.yml",
  //   type: "yml",
  //   info: "基本权限配置文件，一般情况无需多过改动",
  //   author: "Unitwk",
  //   github: "https://github.com/Unitwk",
  //   category: [TYPE_MINECRAFT_SPIGOT, TYPE_MINECRAFT_PAPER, TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_BUKKIT]
  // },
  // {
  //   fileName: "[Bukkit] commands.yml",
  //   path: "commands.yml",
  //   redirect: "bukkit/commands.yml",
  //   type: "yml",
  //   info: "Bukkit 原始命令文件，一般情况无需改动",
  //   author: "Unitwk",
  //   github: "https://github.com/Unitwk",
  //   category: [TYPE_MINECRAFT_SPIGOT, TYPE_MINECRAFT_PAPER, TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_BUKKIT]
  // },
  // {
  //   fileName: "[Bukkit] whitelist.json",
  //   type: "json",
  //   info: "服务器白名单",
  //   path: "whitelist.json",
  //   redirect: "bukkit/whitelist.json",
  //   author: "Unitwk",
  //   github: "https://github.com/Unitwk",
  //   category: [TYPE_MINECRAFT_SPIGOT, TYPE_MINECRAFT_PAPER, TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_BUKKIT]
  // },
  // {
  //   fileName: "[Bukkit] ops.json",
  //   type: "json",
  //   info: "服务器管理员列表",
  //   path: "ops.json",
  //   redirect: "bukkit/ops.json",
  //   author: "Unitwk",
  //   github: "https://github.com/Unitwk",
  //   category: [TYPE_MINECRAFT_SPIGOT, TYPE_MINECRAFT_PAPER, TYPE_MINECRAFT_JAVA, TYPE_MINECRAFT_BUKKIT]
  // },
];
