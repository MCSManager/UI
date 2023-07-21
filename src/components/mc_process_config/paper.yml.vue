<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
  This page is for Chinese users only
-->

<template>
  <div v-if="modelValue">
    <LineOption :custom="true">
      <template #default>
        <div class="sub-title">
          <div class="sub-title">关于配置兼容与翻译</div>
          <div class="sub-title-info">
            此界面由开源社区开发者开发与翻译，若翻译发现错误可前往开源社区进行反馈。配置文件部分设置因版本和服务端类型不同会有些许变化，某些配置文件子元素过于复杂，可能会导致配置项值无法正常显示，如遇到不正常的配置项值切勿进行修改。若对配置文件要进行更为详细的配置，建议前往文件在线管理功能进行文件编辑。
          </div>
        </div>
        <div class="sub-title">
          <div class="sub-title">关于配置文件</div>
          <div class="sub-title-info">
            此文件是 Paper 服务端软件专用配置文件，有近 400 行的服务器具体参数配置，Paper
            每个版本的各个参数都可能有细节变化从而导致翻译工作及其困难，部分参数可能不会有中文翻译。
          </div>
        </div>
      </template>
    </LineOption>
    <!-- 根据一层 Map 对象遍历所有选项 -->
    <div v-for="(item, index) in config" :key="index">
      <!-- 选项标题与选项传值,组件会自动判断其值类型采用不同组件 -->
      <LineOption :option-value="config" :option-key="index">
        <!-- 选项标题 -->
        <template #title>{{ index }}</template>
        <!-- 选项中文解释 -->
        <template #info>{{ descriptionByTitle(description, index) }}</template>
      </LineOption>
    </div>
  </div>
</template>

<script>
import { getDescriptionByTitle, jsonToMap } from "../../app/service/common";
import LineOption from "../LineOption";
import LineOptionList from "../LineOptionList";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { LineOption, LineOptionList },
  props: {
    modelValue: Object
  },
  async mounted() {
    // 将多子节点JSON对象转为无子对象的一层 Map 对象
    this.config = jsonToMap(this.modelValue);
  },
  methods: {
    descriptionByTitle(...p) {
      // 利用已转换到一层 Map 对象 Key 值获取来自多子节点的 JSON 对象具体 Value
      return getDescriptionByTitle(...p);
    }
  },
  data() {
    return {
      config: null,
      description: {
        "use-display-name-in-quit-message": this.$t("processConfig.paperYml.useDisplayNameInQuitMessage"),
        "verbose": this.$t("processConfig.paperYml.verbose"),
        "config-version": this.$t("processConfig.paperYml.configVersion"),
        "settings": {
          "console-has-all-permissions": this.$t("processConfig.paperYml.settings.consoleHasAllPermissions"),
          "use-alternative-luck-formula": this.$t("processConfig.paperYml.settings.useAlternativeLuckFormula"),
          "chunk-tasks-per-tick": this.$t("processConfig.paperYml.settings.chunkTasksPerTick"),
          "save-empty-scoreboard-teams": this.$t("processConfig.paperYml.settings.saveEmptyScoreboardTeams"),
          "enable-player-collisions": this.$t("processConfig.paperYml.settings.enablePlayerCollisions"),
          "player-auto-save-rate": this.$t("processConfig.paperYml.settings.playerAutoSaveRate"),
          "max-player-auto-save-per-tick": this.$t("processConfig.paperYml.settings.maxPlayerAutoSavePerTick"),
          "track-plugin-scoreboards": this.$t("processConfig.paperYml.settings.trackPluginScoreboards"),
          "region-file-cache-size": this.$t("processConfig.paperYml.settings.regionFileCacheSize"),
          "incoming-packet-spam-threshold": this.$t("processConfig.paperYml.settings.incomingPacketSpamThreshold"),
          "suggest-player-names-when-null-tab-completions": this.$t("processConfig.paperYml.settings.suggestPlayerNamesWhenNullTabCompletions"),
          "bungee-online-mode": this.$t("processConfig.paperYml.settings.bungeeOnlineMode"),
          "max-joins-per-tick": this.$t("processConfig.paperYml.settings.maxJoinsPerTick"),
          "load-permissions-yml-before-plugins": this.$t("processConfig.paperYml.settings.loadPermissionsYmlBeforePlugins"),
          "use-display-name-in-quit-message": this.$t("processConfig.paperYml.settings.useDisplayNameInQuitMessage"),
          "fix-entity-position-desync": this.$t("processConfig.paperYml.settings.fixEntityPositionDesync"),
          "log-named-entity-deaths": this.$t("processConfig.paperYml.settings.logNamedEntityDeaths"),
          "save-player-data": this.$t("processConfig.paperYml.settings.savePlayerData"),
          "use-versioned-world": this.$t("processConfig.paperYml.settings.useVersionedWorld"),
          "unsupported-settings": {
            "allow-permanent-block-break-exploits": this.$t("processConfig.paperYml.settings.unsupportedSettings.allowPermanentBlockBreakExploits"),
            "allow-piston-duplication": this.$t("processConfig.paperYml.settings.unsupportedSettings.allowPistonDuplication"),
            "allow-headless-pistons": this.$t("processConfig.paperYml.settings.unsupportedSettings.allowHeadlessPistons"),
            "allow-permanent-block-break-exploits-readme": this.$t("processConfig.paperYml.settings.unsupportedSettings.allowPermanentBlockBreakExploitsReadme"),
            "allow-piston-duplication-readme": this.$t("processConfig.paperYml.settings.unsupportedSettings.allowPistonDuplicationReadme"),
            "allow-headless-pistons-readme": this.$t("processConfig.paperYml.settings.unsupportedSettings.allowHeadlessPistonsReadme")
          },
          "async-chunks": {
            "enable": this.$t("processConfig.paperYml.settings.asyncChunks.enable"),
            "threads": this.$t("processConfig.paperYml.settings.asyncChunks.threads")
          },
          "watchdog": {
            "early-warning-every": this.$t("processConfig.paperYml.settings.watchdog.earlyWarningEvery"),
            "early-warning-delay": this.$t("processConfig.paperYml.settings.watchdog.earlyWarningDelay")
          },
          "book-size": {
            "page-max": this.$t("processConfig.paperYml.settings.bookSize.pageMax"),
            "total-multiplier": this.$t("processConfig.paperYml.settings.bookSize.totalMultiplier")
          },
          "spam-limiter": {
            "tab-spam-increment": this.$t("processConfig.paperYml.settings.spamLimiter.tabSpamIncrement"),
            "tab-spam-limit": this.$t("processConfig.paperYml.settings.spamLimiter.tabSpamLimit"),
            "recipe-spam-increment": this.$t("processConfig.paperYml.settings.spamLimiter.recipeSpamIncrement"),
            "recipe-spam-limit": this.$t("processConfig.paperYml.settings.spamLimiter.recipeSpamLimit")
          },
          "velocity-support": {
            "enabled": this.$t("processConfig.paperYml.settings.velocitySupport.enabled"),
            "online-mode": this.$t("processConfig.paperYml.settings.velocitySupport.onlineMode"),
            "secret": this.$t("processConfig.paperYml.settings.velocitySupport.secret")
          },
          "item-validation": {
            "display-name": this.$t("processConfig.paperYml.settings.itemValidation.displayName"),
            "loc-name": this.$t("processConfig.paperYml.settings.itemValidation.locName"),
            "lore-line": this.$t("processConfig.paperYml.settings.itemValidation.loreLine"),
            "book": {
              "title": this.$t("processConfig.paperYml.settings.itemValidation.book.title"),
              "author": this.$t("processConfig.paperYml.settings.itemValidation.book.author"),
              "page": this.$t("processConfig.paperYml.settings.itemValidation.book.page")
            },
            "console": {
              "enable-brigadier-highlighting": this.$t("processConfig.paperYml.settings.itemValidation.console.enableBrigadierHighlighting"),
              "enable-brigadier-completions": this.$t("processConfig.paperYml.settings.itemValidation.console.enableBrigadierCompletions")
            },
            "loggers": {
              "deobfuscate-stacktraces": this.$t("processConfig.paperYml.settings.itemValidation.loggers.deobfuscateStacktraces")
            }
          }
        },
        "timings": {
          "enabled": this.$t("processConfig.paperYml.timings.enabled"),
          "verbose": this.$t("processConfig.paperYml.timings.verbose"),
          "server-name-privacy": this.$t("processConfig.paperYml.timings.serverNamePrivacy"),
          "url": this.$t("processConfig.paperYml.timings.url"),
          "hidden-config-entries": this.$t("processConfig.paperYml.timings.hiddenConfigEntries"),
          "history-interval": this.$t("processConfig.paperYml.timings.historyInterval"),
          "history-length": this.$t("processConfig.paperYml.timings.historyLength"),
          "server-name": this.$t("processConfig.paperYml.timings.serverName")
        },
        "messages": {
          "no-permission": this.$t("processConfig.paperYml.messages.noPermission"),
          "kick": {
            "connection-throttle": this.$t("processConfig.paperYml.messages.kick.connectionThrottle"),
            "flying-player": this.$t("processConfig.paperYml.messages.kick.flyingPlayer"),
            "flying-vehicle": this.$t("processConfig.paperYml.messages.kick.flyingVehicle"),
            "authentication-servers-down": this.$t("processConfig.paperYml.messages.kick.authenticationServersDown")
          }
        },
        "world-settings": {
          "default": {
            "armor-stands-tick": this.$t("processConfig.paperYml.worldSettings.default.armorStandsTick"),
            "disable-teleportation-suffocation-check": this.$t("processConfig.paperYml.worldSettings.default.disableTeleportationSuffocationCheck"),
            "remove-corrupt-tile-entities": this.$t("processConfig.paperYml.worldSettings.default.removeCorruptTileEntities"),
            "experience-merge-max-value": this.$t("processConfig.paperYml.worldSettings.default.experienceMergeMaxValue"),
            "falling-block-height-nerf": this.$t("processConfig.paperYml.worldSettings.default.fallingBlockHeightNerf"),
            "tnt-entity-height-nerf": this.$t("processConfig.paperYml.worldSettings.default.tntEntityHeightNerf"),
            "phantoms-do-not-spawn-on-creative-players": this.$t("processConfig.paperYml.worldSettings.default.phantomsDoNotSpawnOnCreativePlayers"),
            "phantoms-only-attack-insomniacs": this.$t("processConfig.paperYml.worldSettings.default.phantomsOnlyAttackInsomniacs"),
            "max-auto-save-chunks-per-tick": this.$t("processConfig.paperYml.worldSettings.default.maxAutoSaveChunksPerTick"),
            "per-player-mob-spawns": this.$t("processConfig.paperYml.worldSettings.default.perPlayerMobSpawns"),
            "delay-chunk-unloads-by": this.$t("processConfig.paperYml.worldSettings.default.delayChunkUnloadsBy"),
            "disable-thunder": this.$t("processConfig.paperYml.worldSettings.default.disableThunder"),
            "keep-spawn-loaded-range": this.$t("processConfig.paperYml.worldSettings.default.keepSpawnLoadedRange"),
            "spawner-nerfed-mobs-should-jump": this.$t("processConfig.paperYml.worldSettings.default.spawnerNerfedMobsShouldJump"),
            "entities-target-with-follow-range": this.$t("processConfig.paperYml.worldSettings.default.entitiesTargetWithFollowRange"),
            "non-player-arrow-despawn-rate": this.$t("processConfig.paperYml.worldSettings.default.nonPlayerArrowDespawnRate"),
            "creative-arrow-despawn-rate": this.$t("processConfig.paperYml.worldSettings.default.creativeArrowDespawnRate"),
            "zombies-target-turtle-eggs": this.$t("processConfig.paperYml.worldSettings.default.zombiesTargetTurtleEggs"),
            "zombie-villager-infection-chance": this.$t("processConfig.paperYml.worldSettings.default.zombieVillagerInfectionChance"),
            "all-chunks-are-slime-chunks": this.$t("processConfig.paperYml.worldSettings.default.allChunksAreSlimeChunks"),
            "mob-spawner-tick-rate": this.$t("processConfig.paperYml.worldSettings.default.mobSpawnerTickRate"),
            "seed-based-feature-search": this.$t("processConfig.paperYml.worldSettings.default.seedBasedFeatureSearch"),
            "prevent-tnt-from-moving-in-water": this.$t("processConfig.paperYml.worldSettings.default.preventTntFromMovingInWater"),
            "iron-golems-can-spawn-in-air": this.$t("processConfig.paperYml.worldSettings.default.ironGolemsCanSpawnInAir"),
            "skeleton-horse-thunder-spawn-chance": this.$t("processConfig.paperYml.worldSettings.default.skeletonHorseThunderSpawnChance"),
            "disable-ice-and-snow": this.$t("processConfig.paperYml.worldSettings.default.disableIceAndSnow"),
            "water-over-lava-flow-speed": this.$t("processConfig.paperYml.worldSettings.default.waterOverLavaFlowSpeed"),
            "use-faster-eigencraft-redstone": this.$t("processConfig.paperYml.worldSettings.default.useFasterEigencraftRedstone"),
            "nether-ceiling-void-damage-height": this.$t("processConfig.paperYml.worldSettings.default.netherCeilingVoidDamageHeight"),
            "allow-non-player-entities-on-scoreboards": this.$t("processConfig.paperYml.worldSettings.default.allowNonPlayerEntitiesOnScoreboards"),
            "parrots-are-unaffected-by-player-movement": this.$t("processConfig.paperYml.worldSettings.default.parrotsAreUnaffectedByPlayerMovement"),
            "portal-search-radius": this.$t("processConfig.paperYml.worldSettings.default.portalSearchRadius"),
            "portal-create-radius": this.$t("processConfig.paperYml.worldSettings.default.portalCreateRadius"),
            "disable-explosion-knockback": this.$t("processConfig.paperYml.worldSettings.default.disableExplosionKnockback"),
            "container-update-tick-rate": this.$t("processConfig.paperYml.worldSettings.default.containerUpdateTickRate"),
            "keep-spawn-loaded": this.$t("processConfig.paperYml.worldSettings.default.keepSpawnLoaded"),
            "armor-stands-do-collision-entity-lookups": this.$t("processConfig.paperYml.worldSettings.default.armorStandsDoCollisionEntityLookups"),
            "grass-spread-tick-rate": this.$t("processConfig.paperYml.worldSettings.default.grassSpreadTickRate"),
            "should-remove-dragon": this.$t("processConfig.paperYml.worldSettings.default.shouldRemoveDragon"),
            "use-vanilla-world-scoreboard-name-coloring": this.$t("processConfig.paperYml.worldSettings.default.useVanillaWorldScoreboardNameColoring"),
            "fixed-chunk-inhabited-time": this.$t("processConfig.paperYml.worldSettings.default.fixedChunkInhabitedTime"),
            "prevent-moving-into-unloaded-chunks": this.$t("processConfig.paperYml.worldSettings.default.preventMovingIntoUnloadedChunks"),
            "baby-zombie-movement-modifier": this.$t("processConfig.paperYml.worldSettings.default.babyZombieMovementModifier"),
            "count-all-mobs-for-spawning": this.$t("processConfig.paperYml.worldSettings.default.countAllMobsForSpawning"),
            "optimize-explosions": this.$t("processConfig.paperYml.worldSettings.default.optimizeExplosions"),
            "duplicate-uuid-resolver": this.$t("processConfig.paperYml.worldSettings.default.duplicateUuidResolver"),
            "duplicate-uuid-saferegen-delete-range": this.$t("processConfig.paperYml.worldSettings.default.duplicateUuidSaferegenDeleteRange"),
            "disable-creeper-lingering-effect": this.$t("processConfig.paperYml.worldSettings.default.disableCreeperLingeringEffect"),
            "max-entity-collisions": this.$t("processConfig.paperYml.worldSettings.default.maxEntityCollisions"),
            "filter-nbt-data-from-spawn-eggs-and-related": this.$t("processConfig.paperYml.worldSettings.default.filterNbtDataFromSpawnEggsAndRelated"),
            "light-queue-size": this.$t("processConfig.paperYml.worldSettings.default.lightQueueSize"),
            "auto-save-interval": this.$t("processConfig.paperYml.worldSettings.default.autoSaveInterval"),
            "enable-treasure-maps": this.$t("processConfig.paperYml.worldSettings.default.enableTreasureMaps"),
            "treasure-maps-return-already-discovered": this.$t("processConfig.paperYml.worldSettings.default.treasureMapsReturnAlreadyDiscovered"),
            "show-sign-click-command-failure-msgs-to-player": this.$t("processConfig.paperYml.worldSettings.default.showSignClickCommandFailureMsgsToPlayer"),
            "fix-items-merging-through-walls": this.$t("processConfig.paperYml.worldSettings.default.fixItemsMergingThroughWalls"),
            "fix-climbing-bypassing-cramming-rule": this.$t("processConfig.paperYml.worldSettings.default.fixClimbingBypassingCrammingRule"),
            "only-players-collide": this.$t("processConfig.paperYml.worldSettings.default.onlyPlayersCollide"),
            "allow-vehicle-collisions": this.$t("processConfig.paperYml.worldSettings.default.allowVehicleCollisions"),
            "portal-search-vanilla-dimension-scaling": this.$t("processConfig.paperYml.worldSettings.default.portalSearchVanillaDimensionScaling"),
            "seed-based-feature-search-loads-chunks": this.$t("processConfig.paperYml.worldSettings.default.seedBasedFeatureSearchLoadsChunks"),
            "max-leash-distance": this.$t("processConfig.paperYml.worldSettings.default.maxLeashDistance"),
            "fix-wither-targeting-bug": this.$t("processConfig.paperYml.worldSettings.default.fixWitherTargetingBug"),
            "allow-player-cramming-damage": this.$t("processConfig.paperYml.worldSettings.default.allowPlayerCrammingDamage"),
            "update-pathfinding-on-block-update": this.$t("processConfig.paperYml.worldSettings.default.updatePathfindingOnBlockUpdate"),
            "map-item-frame-cursor-limit": this.$t("processConfig.paperYml.worldSettings.default.mapItemFrameCursorLimit"),
            "ender-dragons-death-always-places-dragon-egg": this.$t("processConfig.paperYml.worldSettings.default.enderDragonsDeathAlwaysPlacesDragonEgg"),
            "allow-using-signs-inside-spawn-protection": this.$t("processConfig.paperYml.worldSettings.default.allowUsingSignsInsideSpawnProtection"),
            "bed-search-radius": this.$t("processConfig.paperYml.worldSettings.default.bedSearchRadius"),
            "allow-leashing-undead-horse": this.$t("processConfig.paperYml.worldSettings.default.allowLeashingUndeadHorse"),
            "baby-zombie-movement-speed": this.$t("processConfig.paperYml.worldSettings.default.babyZombieMovementSpeed"),
            "door-breaking-difficulty": {
              "zombie": this.$t("processConfig.paperYml.worldSettings.default.doorBreakingDifficulty.zombie"),
              "vindicator": this.$t("processConfig.paperYml.worldSettings.default.doorBreakingDifficulty.vindicator")
            },
            "mobs-can-always-pick-up-loot": {
              "zombies": this.$t("processConfig.paperYml.worldSettings.default.mobsCanAlwaysPickUpLoot.zombies"),
              "skeletons": this.$t("processConfig.paperYml.worldSettings.default.mobsCanAlwaysPickUpLoot.skeletons")
            },
            "spawn-limits": {
              "monsters": this.$t("processConfig.paperYml.worldSettings.default.spawnLimits.monsters"),
              "animals": this.$t("processConfig.paperYml.worldSettings.default.spawnLimits.animals"),
              "water-animals": this.$t("processConfig.paperYml.worldSettings.default.spawnLimits.waterAnimals"),
              "water-ambient": this.$t("processConfig.paperYml.worldSettings.default.spawnLimits.waterAmbient"),
              "ambient": this.$t("processConfig.paperYml.worldSettings.default.spawnLimits.ambient")
            },
            "entity-per-chunk-save-limit": {
              "experience_orb": this.$t("processConfig.paperYml.worldSettings.default.entityPerChunkSaveLimit.experienceOrb"),
              "snowball": this.$t("processConfig.paperYml.worldSettings.default.entityPerChunkSaveLimit.snowball"),
              "ender_pearl": this.$t("processConfig.paperYml.worldSettings.default.entityPerChunkSaveLimit.enderPearl"),
              "fireball": this.$t("processConfig.paperYml.worldSettings.default.entityPerChunkSaveLimit.fireball"),
              "small_fireball": this.$t("processConfig.paperYml.worldSettings.default.entityPerChunkSaveLimit.smallFireball"),
              "arrow": this.$t("processConfig.paperYml.worldSettings.default.entityPerChunkSaveLimit.arrow")
            },
            "mob-effects": {
              "undead-immune-to-certain-effects": this.$t("processConfig.paperYml.worldSettings.default.mobEffects.undeadImmuneToCertainEffects"),
              "spiders-immune-to-poison-effect": this.$t("processConfig.paperYml.worldSettings.default.mobEffects.spidersImmuneToPoisonEffect"),
              "immune-to-wither-effect": {
                "wither": this.$t("processConfig.paperYml.worldSettings.default.mobEffects.immuneToWitherEffect.wither"),
                "wither-skeleton": this.$t("processConfig.paperYml.worldSettings.default.mobEffects.immuneToWitherEffect.witherSkeleton")
              }
            },
            "tick-rates": {
              "sensor": {
                "villager": {
                  "secondarypoisensor": this.$t("processConfig.paperYml.worldSettings.default.tickRates.sensor.villager.secondarypoisensor"),
                  "validatenearbypoi": this.$t("processConfig.paperYml.worldSettings.default.tickRates.sensor.villager.validatenearbypoi")
                }
              }
            },
            "fishing-time-range": {
              "MinimumTicks": this.$t("processConfig.paperYml.worldSettings.default.fishingTimeRange.MinimumTicks"),
              "MaximumTicks": this.$t("processConfig.paperYml.worldSettings.default.fishingTimeRange.MaximumTicks")
            },
            "despawn-ranges": {
              "soft": this.$t("processConfig.paperYml.worldSettings.default.despawnRanges.soft"),
              "hard": this.$t("processConfig.paperYml.worldSettings.default.despawnRanges.hard")
            },
            "frosted-ice": {
              "enabled": this.$t("processConfig.paperYml.worldSettings.default.frostedIce.enabled"),
              "delay": {
                "min": this.$t("processConfig.paperYml.worldSettings.default.frostedIce.delay.min"),
                "max": this.$t("processConfig.paperYml.worldSettings.default.frostedIce.delay.max")
              }
            },
            "game-mechanics": {
              "disable-pillager-patrols": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.disablePillagerPatrols"),
              "disable-relative-projectile-velocity": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.disableRelativeProjectileVelocity"),
              "disable-unloaded-chunk-enderpearl-exploit": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.disableUnloadedChunkEnderpearlExploit"),
              "disable-chest-cat-detection": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.disableChestCatDetection"),
              "nerf-pigmen-from-nether-portals": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.nerfPigmenFromNetherPortals"),
              "disable-player-crits": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.disablePlayerCrits"),
              "shield-blocking-delay": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.shieldBlockingDelay"),
              "disable-end-credits": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.disableEndCredits"),
              "scan-for-legacy-ender-dragon": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.scanForLegacyEnderDragon"),
              "disable-sprint-interruption-on-attack": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.disableSprintInterruptionOnAttack"),
              "fix-curing-zombie-villager-discount-exploit": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.fixCuringZombieVillagerDiscountExploit"),
              "disable-mob-spawner-spawn-egg-transformation": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.disableMobSpawnerSpawnEggTransformation"),
              "pillager-patrols": {
                "spawn-chance": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.pillagerPatrols.spawnChance"),
                "spawn-delay": {
                  "per-player": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.pillagerPatrols.spawnDelay.perPlayer"),
                  "ticks": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.pillagerPatrols.spawnDelay.ticks")
                },
                "start": {
                  "per-player": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.pillagerPatrols.start.perPlayer"),
                  "day": this.$t("processConfig.paperYml.worldSettings.default.gameMechanics.pillagerPatrols.start.day")
                }
              }
            },
            "viewdistances": {
              "no-tick-view-distance": this.$t("processConfig.paperYml.worldSettings.default.viewdistances.noTickViewDistance")
            },
            "anti-xray": {
              "enabled": this.$t("processConfig.paperYml.worldSettings.default.antiXray.enabled"),
              "engine-mode": this.$t("processConfig.paperYml.worldSettings.default.antiXray.engineMode"),
              "max-chunk-section-index": this.$t("processConfig.paperYml.worldSettings.default.antiXray.maxChunkSectionIndex"),
              "update-radius": this.$t("processConfig.paperYml.worldSettings.default.antiXray.updateRadius"),
              "lava-obscures": this.$t("processConfig.paperYml.worldSettings.default.antiXray.lavaObscures"),
              "max-block-height": this.$t("processConfig.paperYml.worldSettings.default.antiXray.maxBlockHeight"),
              "use-permission": this.$t("processConfig.paperYml.worldSettings.default.antiXray.usePermission"),
              "chunk-edge-mode": this.$t("processConfig.paperYml.worldSettings.default.antiXray.chunkEdgeMode"),
              "replacement-blocks": this.$t("processConfig.paperYml.worldSettings.default.antiXray.replacementBlocks"),
              "hidden-blocks": this.$t("processConfig.paperYml.worldSettings.default.antiXray.hiddenBlocks")
            },
            "squid-spawn-height": {
              "maximum": this.$t("processConfig.paperYml.worldSettings.default.squidSpawnHeight.maximum")
            },
            "generator-settings": {
              "flat-bedrock": this.$t("processConfig.paperYml.worldSettings.default.generatorSettings.flatBedrock")
            },
            "max-growth-height": {
              "cactus": this.$t("processConfig.paperYml.worldSettings.default.maxGrowthHeight.cactus"),
              "reeds": this.$t("processConfig.paperYml.worldSettings.default.maxGrowthHeight.reeds"),
              "bamboo": {
                "max": this.$t("processConfig.paperYml.worldSettings.default.maxGrowthHeight.bamboo.max"),
                "min": this.$t("processConfig.paperYml.worldSettings.default.maxGrowthHeight.bamboo.min")
              }
            },
            "lootables": {
              "auto-replenish": this.$t("processConfig.paperYml.worldSettings.default.lootables.autoReplenish"),
              "restrict-player-reloot": this.$t("processConfig.paperYml.worldSettings.default.lootables.restrictPlayerReloot"),
              "reset-seed-on-fill": this.$t("processConfig.paperYml.worldSettings.default.lootables.resetSeedOnFill"),
              "max-refills": this.$t("processConfig.paperYml.worldSettings.default.lootables.maxRefills"),
              "refresh-min": this.$t("processConfig.paperYml.worldSettings.default.lootables.refreshMin"),
              "refresh-max": this.$t("processConfig.paperYml.worldSettings.default.lootables.refreshMax")
            },
            "hopper": {
              "cooldown-when-full": this.$t("processConfig.paperYml.worldSettings.default.hopper.cooldownWhenFull"),
              "disable-move-event": this.$t("processConfig.paperYml.worldSettings.default.hopper.disableMoveEvent"),
              "disable-move-event-quickshop-tips": this.$t("processConfig.paperYml.worldSettings.default.hopper.disableMoveEventQuickshopTips")
            },
            "alt-item-despawn-rate": {
              "enabled": this.$t("processConfig.paperYml.worldSettings.default.altItemDespawnRate.enabled"),
              "items": {
                "COBBLESTONE": this.$t("processConfig.paperYml.worldSettings.default.altItemDespawnRate.items.COBBLESTONE")
              }
            },
            "lightning-strike-distance-limit": {
              "sound": this.$t("processConfig.paperYml.worldSettings.default.lightningStrikeDistanceLimit.sound"),
              "impact-sound": this.$t("processConfig.paperYml.worldSettings.default.lightningStrikeDistanceLimit.impactSound"),
              "flash": this.$t("processConfig.paperYml.worldSettings.default.lightningStrikeDistanceLimit.flash")
            },
            "wandering-trader": {
              "spawn-minute-length": this.$t("processConfig.paperYml.worldSettings.default.wanderingTrader.spawnMinuteLength"),
              "spawn-day-length": this.$t("processConfig.paperYml.worldSettings.default.wanderingTrader.spawnDayLength"),
              "spawn-chance-failure-increment": this.$t("processConfig.paperYml.worldSettings.default.wanderingTrader.spawnChanceFailureIncrement"),
              "spawn-chance-min": this.$t("processConfig.paperYml.worldSettings.default.wanderingTrader.spawnChanceMin"),
              "spawn-chance-max": this.$t("processConfig.paperYml.worldSettings.default.wanderingTrader.spawnChanceMax")
            },
            "unsupported-settings": {
              "fix-invulnerable-end-crystal-exploit": this.$t("processConfig.paperYml.worldSettings.default.unsupportedSettings.fixInvulnerableEndCrystalExploit")
            }
          }
        }
      }
    };
  }
};
</script>
