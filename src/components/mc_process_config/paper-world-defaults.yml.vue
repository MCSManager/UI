<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div v-if="modelValue">
    <LineOption :custom="true">
      <template #default>
        <div class="sub-title" v-iszh>
          <div class="sub-title">关于配置兼容与翻译</div>
          <div class="sub-title-info">
            此界面由开源社区开发者开发与翻译，若翻译发现错误可前往开源社区进行反馈。配置文件部分设置因版本和服务端类型不同会有些许变化，某些配置文件子元素过于复杂，可能会导致配置项值无法正常显示，如遇到不正常的配置项值切勿进行修改。若对配置文件要进行更为详细的配置，建议前往文件在线管理功能进行文件编辑。
          </div>
        </div>
        <div class="sub-title">
          <div class="sub-title">{{this.$t("processConfig.introduction.common.aboutConfig")}}</div>
          <div class="sub-title-info">
            {{this.$t("processConfig.introduction.paperWorldDefaultsYml.infoLong")}}
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
        "_version": this.$t("processConfig.paperWorldDefaultsYml.Version"),
        "anticheat": {
          "anti-xray": {
            "enabled": this.$t("processConfig.paperWorldDefaultsYml.anticheat.antiXray.enabled"),
            "engine-mode": this.$t("processConfig.paperWorldDefaultsYml.anticheat.antiXray.engineMode"),
            "hidden-blocks": this.$t("processConfig.paperWorldDefaultsYml.anticheat.antiXray.hiddenBlocks"),
            "lava-obscures": this.$t("processConfig.paperWorldDefaultsYml.anticheat.antiXray.lavaObscures"),
            "max-block-height": this.$t("processConfig.paperWorldDefaultsYml.anticheat.antiXray.maxBlockHeight"),
            "replacement-blocks": this.$t("processConfig.paperWorldDefaultsYml.anticheat.antiXray.replacementBlocks"),
            "update-radius": this.$t("processConfig.paperWorldDefaultsYml.anticheat.antiXray.updateRadius"),
            "use-permission": this.$t("processConfig.paperWorldDefaultsYml.anticheat.antiXray.usePermission")
          },
          "obfuscation": {
            "items": {
              "hide-durability": this.$t("processConfig.paperWorldDefaultsYml.anticheat.obfuscation.items.hideDurability"),
              "hide-itemmeta": this.$t("processConfig.paperWorldDefaultsYml.anticheat.obfuscation.items.hideItemmeta")
            }
          }
        },
        "chunks": {
          "auto-save-interval": this.$t("processConfig.paperWorldDefaultsYml.chunks.autoSaveInterval"),
          "delay-chunk-unloads-by": this.$t("processConfig.paperWorldDefaultsYml.chunks.delayChunkUnloadsBy"),
          "fixed-chunk-inhabited-time": this.$t("processConfig.paperWorldDefaultsYml.chunks.fixedChunkInhabitedTime"),
          "max-auto-save-chunks-per-tick": this.$t("processConfig.paperWorldDefaultsYml.chunks.maxAutoSaveChunksPerTick"),
          "prevent-moving-into-unloaded-chunks": this.$t("processConfig.paperWorldDefaultsYml.chunks.preventMovingIntoUnloadedChunks")
        },
        "collisions": {
          "allow-player-cramming-damage": this.$t("processConfig.paperWorldDefaultsYml.collisions.allowPlayerCrammingDamage"),
          "allow-vehicle-collisions": this.$t("processConfig.paperWorldDefaultsYml.collisions.allowVehicleCollisions"),
          "fix-climbing-bypassing-cramming-rule": this.$t("processConfig.paperWorldDefaultsYml.collisions.fixClimbingBypassingCrammingRule"),
          "max-entity-collisions": this.$t("processConfig.paperWorldDefaultsYml.collisions.maxEntityCollisions"),
          "only-players-collide": this.$t("processConfig.paperWorldDefaultsYml.collisions.onlyPlayersCollide")
        },
        "entities": {
          "armor-stands": {
            "do-collision-entity-lookups": this.$t("processConfig.paperWorldDefaultsYml.entities.armorStands.doCollisionEntityLookups"),
            "tick": this.$t("processConfig.paperWorldDefaultsYml.entities.armorStands.tick")
          },
          "behavior": {
            "baby-zombie-movement-modifier": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.babyZombieMovementModifier"),
            "disable-chest-cat-detection": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.disableChestCatDetection"),
            "disable-creeper-lingering-effect": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.disableCreeperLingeringEffect"),
            "disable-player-crits": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.disablePlayerCrits"),
            "door-breaking-difficulty": {
              "husk": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.doorBreakingDifficulty.husk"),
              "vindicator": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.doorBreakingDifficulty.vindicator"),
              "zombie": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.doorBreakingDifficulty.zombie"),
              "zombie_villager": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.doorBreakingDifficulty.zombieVillager"),
              "zombified_piglin": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.doorBreakingDifficulty.zombifiedPiglin")
            },
            "ender-dragons-death-always-places-dragon-egg": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.enderDragonsDeathAlwaysPlacesDragonEgg"),
            "experience-merge-max-value": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.experienceMergeMaxValue"),
            "mobs-can-always-pick-up-loot": {
              "skeletons": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.mobsCanAlwaysPickUpLoot.skeletons"),
              "zombies": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.mobsCanAlwaysPickUpLoot.zombies")
            },
            "nerf-pigmen-from-nether-portals": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.nerfPigmenFromNetherPortals"),
            "parrots-are-unaffected-by-player-movement": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.parrotsAreUnaffectedByPlayerMovement"),
            "phantoms-do-not-spawn-on-creative-players": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.phantomsDoNotSpawnOnCreativePlayers"),
            "phantoms-only-attack-insomniacs": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.phantomsOnlyAttackInsomniacs"),
            "piglins-guard-chests": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.piglinsGuardChests"),
            "pillager-patrols": {
              "disable": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.pillagerPatrols.disable"),
              "spawn-chance": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.pillagerPatrols.spawnChance"),
              "spawn-delay": {
                "per-player": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.pillagerPatrols.spawnDelay.perPlayer"),
                "ticks": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.pillagerPatrols.spawnDelay.ticks")
              },
              "start": {
                "day": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.pillagerPatrols.start.day"),
                "per-player": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.pillagerPatrols.start.perPlayer")
              }
            },
            "should-remove-dragon": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.shouldRemoveDragon"),
            "spawner-nerfed-mobs-should-jump": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.spawnerNerfedMobsShouldJump"),
            "zombie-villager-infection-chance": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.zombieVillagerInfectionChance"),
            "zombies-target-turtle-eggs": this.$t("processConfig.paperWorldDefaultsYml.entities.behavior.zombiesTargetTurtleEggs")
          },
          "entities-target-with-follow-range": this.$t("processConfig.paperWorldDefaultsYml.entities.entitiesTargetWithFollowRange"),
          "mob-effects": {
            "immune-to-wither-effect": {
              "wither": this.$t("processConfig.paperWorldDefaultsYml.entities.mobEffects.immuneToWitherEffect.wither"),
              "wither-skeleton": this.$t("processConfig.paperWorldDefaultsYml.entities.mobEffects.immuneToWitherEffect.witherSkeleton")
            },
            "spiders-immune-to-poison-effect": this.$t("processConfig.paperWorldDefaultsYml.entities.mobEffects.spidersImmuneToPoisonEffect"),
            "undead-immune-to-certain-effects": this.$t("processConfig.paperWorldDefaultsYml.entities.mobEffects.undeadImmuneToCertainEffects")
          },
          "spawning": {
            "all-chunks-are-slime-chunks": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.allChunksAreSlimeChunks"),
            "alt-item-despawn-rate": {
              "enabled": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.altItemDespawnRate.enabled"),
              "items": {
                "cobblestone": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.altItemDespawnRate.items.cobblestone")
              }
            },
            "count-all-mobs-for-spawning": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.countAllMobsForSpawning"),
            "creative-arrow-despawn-rate": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.creativeArrowDespawnRate"),
            "despawn-ranges": {
              "ambient": {
                "hard": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.ambient.hard"),
                "soft": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.ambient.soft")
              },
              "axolotls": {
                "hard": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.axolotls.hard"),
                "soft": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.axolotls.soft")
              },
              "creature": {
                "hard": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.creature.hard"),
                "soft": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.creature.soft")
              },
              "misc": {
                "hard": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.misc.hard"),
                "soft": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.misc.soft")
              },
              "monster": {
                "hard": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.monster.hard"),
                "soft": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.monster.soft")
              },
              "underground_water_creature": {
                "hard": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.undergroundWaterCreature.hard"),
                "soft": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.undergroundWaterCreature.soft")
              },
              "water_ambient": {
                "hard": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.waterAmbient.hard"),
                "soft": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.waterAmbient.soft")
              },
              "water_creature": {
                "hard": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.waterCreature.hard"),
                "soft": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.despawnRanges.waterCreature.soft")
              }
            },
            "disable-mob-spawner-spawn-egg-transformation": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.disableMobSpawnerSpawnEggTransformation"),
            "duplicate-uuid": {
              "mode": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.duplicateUuid.mode"),
              "safe-regen-delete-range": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.duplicateUuid.safeRegenDeleteRange")
            },
            "filter-nbt-data-from-spawn-eggs-and-related": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.filterNbtDataFromSpawnEggsAndRelated"),
            "iron-golems-can-spawn-in-air": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.ironGolemsCanSpawnInAir"),
            "monster-spawn-max-light-level": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.monsterSpawnMaxLightLevel"),
            "non-player-arrow-despawn-rate": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.nonPlayerArrowDespawnRate"),
            "per-player-mob-spawns": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.perPlayerMobSpawns"),
            "scan-for-legacy-ender-dragon": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.scanForLegacyEnderDragon"),
            "skeleton-horse-thunder-spawn-chance": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.skeletonHorseThunderSpawnChance"),
            "slime-spawn-height": {
              "slime-chunk": {
                "maximum": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.slimeSpawnHeight.slimeChunk.maximum")
              },
              "surface-biome": {
                "maximum": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.slimeSpawnHeight.surfaceBiome.maximum"),
                "minimum": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.slimeSpawnHeight.surfaceBiome.minimum")
              }
            },
            "spawn-limits": {},
            "wandering-trader": {
              "spawn-chance-failure-increment": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.wanderingTrader.spawnChanceFailureIncrement"),
              "spawn-chance-max": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.wanderingTrader.spawnChanceMax"),
              "spawn-chance-min": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.wanderingTrader.spawnChanceMin"),
              "spawn-day-length": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.wanderingTrader.spawnDayLength"),
              "spawn-minute-length": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.wanderingTrader.spawnMinuteLength")
            },
            "wateranimal-spawn-height": {
              "maximum": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.wateranimalSpawnHeight.maximum"),
              "minimum": this.$t("processConfig.paperWorldDefaultsYml.entities.spawning.wateranimalSpawnHeight.minimum")
            }
          }
        },
        "environment": {
          "disable-explosion-knockback": this.$t("processConfig.paperWorldDefaultsYml.environment.disableExplosionKnockback"),
          "disable-ice-and-snow": this.$t("processConfig.paperWorldDefaultsYml.environment.disableIceAndSnow"),
          "disable-teleportation-suffocation-check": this.$t("processConfig.paperWorldDefaultsYml.environment.disableTeleportationSuffocationCheck"),
          "disable-thunder": this.$t("processConfig.paperWorldDefaultsYml.environment.disableThunder"),
          "frosted-ice": {
            "delay": {
              "max": this.$t("processConfig.paperWorldDefaultsYml.environment.frostedIce.delay.max"),
              "min": this.$t("processConfig.paperWorldDefaultsYml.environment.frostedIce.delay.min")
            },
            "enabled": this.$t("processConfig.paperWorldDefaultsYml.environment.frostedIce.enabled")
          },
          "generate-flat-bedrock": this.$t("processConfig.paperWorldDefaultsYml.environment.generateFlatBedrock"),
          "nether-ceiling-void-damage-height": this.$t("processConfig.paperWorldDefaultsYml.environment.netherCeilingVoidDamageHeight"),
          "optimize-explosions": this.$t("processConfig.paperWorldDefaultsYml.environment.optimizeExplosions"),
          "portal-create-radius": this.$t("processConfig.paperWorldDefaultsYml.environment.portalCreateRadius"),
          "portal-search-radius": this.$t("processConfig.paperWorldDefaultsYml.environment.portalSearchRadius"),
          "portal-search-vanilla-dimension-scaling": this.$t("processConfig.paperWorldDefaultsYml.environment.portalSearchVanillaDimensionScaling"),
          "treasure-maps": {
            "enabled": this.$t("processConfig.paperWorldDefaultsYml.environment.treasureMaps.enabled"),
            "find-already-discovered": {
              "loot-tables": this.$t("processConfig.paperWorldDefaultsYml.environment.treasureMaps.findAlreadyDiscovered.lootTables"),
              "villager-trade": this.$t("processConfig.paperWorldDefaultsYml.environment.treasureMaps.findAlreadyDiscovered.villagerTrade")
            }
          },
          "water-over-lava-flow-speed": this.$t("processConfig.paperWorldDefaultsYml.environment.waterOverLavaFlowSpeed")
        },
        "feature-seeds": {
          "generate-random-seeds-for-all": this.$t("processConfig.paperWorldDefaultsYml.featureSeeds.generateRandomSeedsForAll")
        },
        "fishing-time-range": {
          "maximum": this.$t("processConfig.paperWorldDefaultsYml.fishingTimeRange.maximum"),
          "minimum": this.$t("processConfig.paperWorldDefaultsYml.fishingTimeRange.minimum")
        },
        "fixes": {
          "disable-unloaded-chunk-enderpearl-exploit": this.$t("processConfig.paperWorldDefaultsYml.fixes.disableUnloadedChunkEnderpearlExploit"),
          "falling-block-height-nerf": this.$t("processConfig.paperWorldDefaultsYml.fixes.fallingBlockHeightNerf"),
          "fix-curing-zombie-villager-discount-exploit": this.$t("processConfig.paperWorldDefaultsYml.fixes.fixCuringZombieVillagerDiscountExploit"),
          "fix-items-merging-through-walls": this.$t("processConfig.paperWorldDefaultsYml.fixes.fixItemsMergingThroughWalls"),
          "prevent-tnt-from-moving-in-water": this.$t("processConfig.paperWorldDefaultsYml.fixes.preventTntFromMovingInWater"),
          "split-overstacked-loot": this.$t("processConfig.paperWorldDefaultsYml.fixes.splitOverstackedLoot"),
          "tnt-entity-height-nerf": this.$t("processConfig.paperWorldDefaultsYml.fixes.tntEntityHeightNerf")
        },
        "hopper": {
          "cooldown-when-full": this.$t("processConfig.paperWorldDefaultsYml.hopper.cooldownWhenFull"),
          "disable-move-event": this.$t("processConfig.paperWorldDefaultsYml.hopper.disableMoveEvent"),
          "ignore-occluding-blocks": this.$t("processConfig.paperWorldDefaultsYml.hopper.ignoreOccludingBlocks")
        },
        "lootables": {
          "auto-replenish": this.$t("processConfig.paperWorldDefaultsYml.lootables.autoReplenish"),
          "max-refills": this.$t("processConfig.paperWorldDefaultsYml.lootables.maxRefills"),
          "refresh-max": this.$t("processConfig.paperWorldDefaultsYml.lootables.refreshMax"),
          "refresh-min": this.$t("processConfig.paperWorldDefaultsYml.lootables.refreshMin"),
          "reset-seed-on-fill": this.$t("processConfig.paperWorldDefaultsYml.lootables.resetSeedOnFill"),
          "restrict-player-reloot": this.$t("processConfig.paperWorldDefaultsYml.lootables.restrictPlayerReloot")
        },
        "maps": {
          "item-frame-cursor-limit": this.$t("processConfig.paperWorldDefaultsYml.maps.itemFrameCursorLimit"),
          "item-frame-cursor-update-interval": this.$t("processConfig.paperWorldDefaultsYml.maps.itemFrameCursorUpdateInterval")
        },
        "max-growth-height": {
          "bamboo": {
            "max": this.$t("processConfig.paperWorldDefaultsYml.maxGrowthHeight.bamboo.max"),
            "min": this.$t("processConfig.paperWorldDefaultsYml.maxGrowthHeight.bamboo.min")
          },
          "cactus": this.$t("processConfig.paperWorldDefaultsYml.maxGrowthHeight.cactus"),
          "reeds": this.$t("processConfig.paperWorldDefaultsYml.maxGrowthHeight.reeds")
        },
        "misc": {
          "disable-end-credits": this.$t("processConfig.paperWorldDefaultsYml.misc.disableEndCredits"),
          "disable-relative-projectile-velocity": this.$t("processConfig.paperWorldDefaultsYml.misc.disableRelativeProjectileVelocity"),
          "disable-sprint-interruption-on-attack": this.$t("processConfig.paperWorldDefaultsYml.misc.disableSprintInterruptionOnAttack"),
          "light-queue-size": this.$t("processConfig.paperWorldDefaultsYml.misc.lightQueueSize"),
          "max-leash-distance": this.$t("processConfig.paperWorldDefaultsYml.misc.maxLeashDistance"),
          "redstone-implementation": this.$t("processConfig.paperWorldDefaultsYml.misc.redstoneImplementation"),
          "shield-blocking-delay": this.$t("processConfig.paperWorldDefaultsYml.misc.shieldBlockingDelay"),
          "show-sign-click-command-failure-msgs-to-player": this.$t("processConfig.paperWorldDefaultsYml.misc.showSignClickCommandFailureMsgsToPlayer"),
          "update-pathfinding-on-block-update": this.$t("processConfig.paperWorldDefaultsYml.misc.updatePathfindingOnBlockUpdate")
        },
        "scoreboards": {
          "allow-non-player-entities-on-scoreboards": this.$t("processConfig.paperWorldDefaultsYml.scoreboards.allowNonPlayerEntitiesOnScoreboards"),
          "use-vanilla-world-scoreboard-name-coloring": this.$t("processConfig.paperWorldDefaultsYml.scoreboards.useVanillaWorldScoreboardNameColoring")
        },
        "spawn": {
          "allow-using-signs-inside-spawn-protection": this.$t("processConfig.paperWorldDefaultsYml.spawn.allowUsingSignsInsideSpawnProtection"),
          "keep-spawn-loaded": this.$t("processConfig.paperWorldDefaultsYml.spawn.keepSpawnLoaded"),
          "keep-spawn-loaded-range": this.$t("processConfig.paperWorldDefaultsYml.spawn.keepSpawnLoadedRange")
        },
        "tick-rates": {
          "behavior": {
            "villager": {
              "validatenearbypoi": this.$t("processConfig.paperWorldDefaultsYml.tickRates.behavior.villager.validatenearbypoi")
            }
          },
          "container-update": this.$t("processConfig.paperWorldDefaultsYml.tickRates.containerUpdate"),
          "grass-spread": this.$t("processConfig.paperWorldDefaultsYml.tickRates.grassSpread"),
          "mob-spawner": this.$t("processConfig.paperWorldDefaultsYml.tickRates.mobSpawner"),
          "sensor": {
            "villager": {
              "secondarypoisensor": this.$t("processConfig.paperWorldDefaultsYml.tickRates.sensor.villager.secondarypoisensor")
            }
          }
        },
        "unsupported-settings": {
          "fix-invulnerable-end-crystal-exploit": this.$t("processConfig.paperWorldDefaultsYml.unsupportedSettings.fixInvulnerableEndCrystalExploit")
        }
      }
    };
  }
};
</script>
