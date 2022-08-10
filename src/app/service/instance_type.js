// Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>

export const TYPE_UNIVERSAL = "universal"; // 通用输入输出程序
export const TYPE_WEB_SHELL = "universal/web_shell"; // WebShell 程序
export const TYPE_MINECRAFT_MCDR = "universal/mcdr";

export const TYPE_MINECRAFT_JAVA = "minecraft/java";
export const TYPE_MINECRAFT_BUKKIT = "minecraft/java/bukkit";
export const TYPE_MINECRAFT_SPIGOT = "minecraft/java/spigot";
export const TYPE_MINECRAFT_PAPER = "minecraft/java/paper";
export const TYPE_MINECRAFT_FORGE = "minecraft/java/forge";
export const TYPE_MINECRAFT_FABRIC = "minecraft/java/fabric";
export const TYPE_MINECRAFT_BUNGEECORD = "minecraft/java/bungeecord";
export const TYPE_MINECRAFT_GEYSER = "minecraft/java/geyser";
export const TYPE_MINECRAFT_SPONGE = "minecraft/java/sponge";
export const TYPE_MINECRAFT_MOHIST = "minecraft/java/mohist";
export const TYPE_MINECRAFT_BEDROCK = "minecraft/bedrock";
export const TYPE_MINECRAFT_BDS = "minecraft/bedrock/bds";
export const TYPE_MINECRAFT_NUKKIT = "minecraft/bedrock/nukkit";
export const TYPE_STEAM_SERVER_UNIVERSAL = "steam/universal";

// 前端可选择类型列表
const INSTANCE_TYPE_TRANSLATION = {};
INSTANCE_TYPE_TRANSLATION[TYPE_UNIVERSAL] = "General console program";
INSTANCE_TYPE_TRANSLATION[TYPE_STEAM_SERVER_UNIVERSAL] = "Steam Game Server";
INSTANCE_TYPE_TRANSLATION[TYPE_MINECRAFT_JAVA] = "MC Java Edition";
INSTANCE_TYPE_TRANSLATION[TYPE_MINECRAFT_BEDROCK] = "MC Bedrock Edition";
INSTANCE_TYPE_TRANSLATION[TYPE_MINECRAFT_SPIGOT] = "MC Spigot";
INSTANCE_TYPE_TRANSLATION[TYPE_MINECRAFT_PAPER] = "MC Paper";
INSTANCE_TYPE_TRANSLATION[TYPE_MINECRAFT_BUNGEECORD] = "MC BungeeCord";
INSTANCE_TYPE_TRANSLATION[TYPE_MINECRAFT_BDS] = "MC Bedrock";
INSTANCE_TYPE_TRANSLATION[TYPE_MINECRAFT_SPONGE] = "MC Sponge";
INSTANCE_TYPE_TRANSLATION[TYPE_MINECRAFT_FORGE] = "MC Forge";
INSTANCE_TYPE_TRANSLATION[TYPE_MINECRAFT_FABRIC] = "MC Fabric";
INSTANCE_TYPE_TRANSLATION[TYPE_MINECRAFT_BUKKIT] = "MC Bukkit";
INSTANCE_TYPE_TRANSLATION[TYPE_MINECRAFT_GEYSER] = "MC Geyser";
INSTANCE_TYPE_TRANSLATION[TYPE_MINECRAFT_MCDR] = "MC MCDR";
INSTANCE_TYPE_TRANSLATION[TYPE_WEB_SHELL] = "Web Shell";

// 不同类型的具体配置文件
const INSTANCE_TYPE_DEF_CONFIG = {
  [TYPE_MINECRAFT_BUNGEECORD]: {
    stopCommand: "end"
  },
  [TYPE_STEAM_SERVER_UNIVERSAL]: {
    stopCommand: "^c"
  },
  [TYPE_WEB_SHELL]: {
    stopCommand: "^c"
  },
  [TYPE_UNIVERSAL]: {
    stopCommand: "^c"
  },
  [TYPE_MINECRAFT_JAVA]: {
    stopCommand: "stop"
  },
  [TYPE_MINECRAFT_BEDROCK]: {
    stopCommand: "stop"
  },
  [TYPE_MINECRAFT_SPIGOT]: {
    stopCommand: "stop"
  },
  [TYPE_MINECRAFT_PAPER]: {
    stopCommand: "stop"
  },
  [TYPE_MINECRAFT_BDS]: {
    stopCommand: "stop"
  },
  [TYPE_MINECRAFT_SPONGE]: {
    stopCommand: "stop"
  },
  [TYPE_MINECRAFT_FORGE]: {
    stopCommand: "stop"
  },
  [TYPE_MINECRAFT_FABRIC]: {
    stopCommand: "stop"
  },
  [TYPE_MINECRAFT_BUKKIT]: {
    stopCommand: "stop"
  },
  [TYPE_MINECRAFT_GEYSER]: {
    stopCommand: "geyser stop"
  },
  [TYPE_MINECRAFT_MCDR]: {
    stopCommand: "stop"
  }
};

export { INSTANCE_TYPE_TRANSLATION, INSTANCE_TYPE_DEF_CONFIG };
