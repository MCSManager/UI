
<template>
  <el-menu
    class="page-el-menu"
    mode="vertical"
    :router="true"
    :uniqueOpened="false"
    background-color="#30313300"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="height: 100%"
    :default-active="$route.path"
  >
    <el-scrollbar>
      <Logo></Logo>
      <div class="user-info">

        <div class="user-type" :style="userInfo.permission < 10 ? 'background-color: #75cac3' : 'background-color: #be9117'"></div>
        <span>{{ userInfo.userName }}</span>

      </div>
      <el-menu-item-group>
        <template #title>基础功能</template>
        <el-menu-item key="/overview" index="/overview">
          <i class="el-icon-pie-chart"></i>
          <template #title>数据监控</template>
        </el-menu-item>
        <el-menu-item key="/instances" index="/instances">
          <i class="el-icon-coin"></i>
          <template #title>应用实例</template>
        </el-menu-item>
        <el-menu-item key="/users" index="/users">
          <i class="el-icon-user"></i>
          <template #title>用户管理</template>
        </el-menu-item>
        <!-- <el-menu-item key="/home" index="/home">
          <i class="el-icon-pie-chart"></i>
          <template #title>个人简报</template>
        </el-menu-item> -->
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title>高级功能</template>
        <el-menu-item key="/services" index="/services">
          <i class="el-icon-connection"></i>
          <template #title>守护进程管理</template>
        </el-menu-item>
        <el-menu-item key="/container" index="/container">
          <i class="el-icon-copy-document"></i>
          <template #title>镜像与容器</template>
        </el-menu-item>
        <!-- <el-menu-item key="/update" index="/update">
          <i class="el-icon-guide"></i>
          <template #title>版本控制</template>
        </el-menu-item> -->
      </el-menu-item-group>
<!--      <el-menu-item-group>-->
<!--        <template #title>扩展功能</template>-->
<!--        <el-menu-item key="/news" index="/news">-->
<!--          <i class="el-icon-news"></i>-->
<!--          <template #title>更新与通知</template>-->
<!--        </el-menu-item>-->
<!--      </el-menu-item-group>-->
      <el-menu-item-group>
        <template #title>更多</template>
        <el-menu-item key="/settings" index="/settings">
          <i class="el-icon-setting"></i>
          <template #title>设置</template>
        </el-menu-item>
      </el-menu-item-group>

      <!-- <el-menu-item-group> -->
      <!-- <el-menu-item index="/extension">
          <i class="el-icon-cpu"></i>
          <template #title>程序接口</template>
        </el-menu-item> -->
      <!-- <el-menu-item index="/trigger">
          <i class="el-icon-document"></i>
          <template #title>触发器</template>
        </el-menu-item> -->
      <!-- <el-menu-item index="/analysis">
          <i class="el-icon-document"></i>
          <template #title>数据分析</template>
        </el-menu-item> -->
      <!-- </el-menu-item-group> -->
    </el-scrollbar>
  </el-menu>
</template>

<script>
import router from "../app/router";
import Logo from "../components/Logo.vue";

export default {
  components: { Logo },
  data: function () {
    return {};
  },
  watch: {},
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    isTopPermission() {
      return this.$store.state.userInfo.permission >= 10;
    }
  },
  methods: {
    toRouter(path) {
      router.push({ path });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.user-type {

  position: relative;
  display: inline-block;
  margin-right: 5px;

  width: 8px;
  height: 8px;

  border-radius: 50%;

}
.user-info {

  position: relative;

  top: -5px;
  left: 50%;

  width: fit-content;

  padding: 6px 12px;
  color: white;

  font-size: 18px;
  text-align: center;

  background-color: rgb(66, 66, 66);
  border-radius: 5px;

  transform: translateX(-50%);
  transition: all .25s;

}
.page-el-menu {
  background: url("../assets/side.png");
  transition: all 1s;
}

.page-el-menu:hover {
  background-position-x: 50px;
}
</style>
