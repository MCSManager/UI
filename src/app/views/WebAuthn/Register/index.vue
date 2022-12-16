<!--
  Copyright (C) 2022 RainChen <asak@irain.cc>
-->

<template>
    <div id="register-layer-top" :class="{ 'register-layer-fadeout-top': close, 'register-layer-fadein-top': !close }">
    </div>
    <div id="register-layer-left"
        :class="{ 'register-layer-fadeout-left': close, 'register-layer-fadein-left': !close }"></div>
    <div id="register-layer-right"
        :class="{ 'register-layer-fadeout-right': close, 'register-layer-fadein-right': !close }"></div>
    <div id="register-layer-bottom"
        :class="{ 'register-layer-fadeout-bottom': close, 'register-layer-fadein-bottom': !close }"></div>

    <div id="register-panel-wrapper" :class="{ 'register-panel-wrapper-out': closeWindow }">
        <Starter v-if="step == 'starter'" :processStep="processStep" :handleReturn="handleReturn" :ctx="ctx"
            :setContext="setContext" :close="close" />
        <Processing v-if="step == 'processing'" :processStep="processStep" :handleReturn="handleReturn" :ctx="ctx"
            :setContext="setContext" :close="close" />
    </div>
    <div>
        <el-row :gutter="20">
            <el-col :md="24" :offset="0">
                <Panel>
                    <template #default>
                        <el-skeleton :rows="5" />
                    </template>
                </Panel>
            </el-col>
            <el-col :md="6" :offset="0">
                <Panel>
                    <template #default>
                        <el-skeleton :rows="7" />
                    </template>
                </Panel>
            </el-col>
    
            <el-col :md="6" :offset="0">
                <Panel>
                    <template #default>
                        <el-skeleton :rows="7" />
                    </template>
                </Panel>
            </el-col>
    
            <el-col :md="6" :offset="0">
                <Panel>
                    <template #default>
                        <el-skeleton :rows="7" />
                    </template>
                </Panel>
            </el-col>
    
            <el-col :md="6" :offset="0">
                <Panel>
                    <template #default>
                        <el-skeleton :rows="7" />
                    </template>
                </Panel>
            </el-col>
    
            <el-col :md="24" :offset="0">
                <Panel>
                    <template #default>
                        <el-skeleton :rows="4" />
                    </template>
                </Panel>
                <Panel>
                    <template #default>
                        <el-skeleton :rows="2" />
                    </template>
                </Panel>
                <Panel>
                    <template #default>
                        <el-skeleton :rows="5" />
                    </template>
                </Panel>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Panel from "@/components/Panel";
import { sleep } from "@/app/service/common.js";
import Starter from "./components/Starter.vue";
import Processing from "./components/Processing.vue";
// eslint-disable-next-line no-unused-vars
// import router from "../router";
export default {
    components: { Panel, Starter, Processing },
    data: function () {
        return {
            step: "starter",
            close: false,
            closeWindow: false,
            loading: false,
            ctx: {
                userName: this.$store.state.userInfo.userName
            }
        };
    },
    methods: {
        async handleReturn() {
            this.close = true;
            this.closeWindow = true;
            await sleep(1500);
            this.$router.back();
        },
        processStep(step) {
            this.step = step;
        },
        setContext(ctx) {
            this.ctx = ctx;
        }
    }
};
</script>

<style lang="scss" scoped>

.register-panel-wrapper-out {
    opacity: 0;
    z-index: 1;
}

.register-layer-fadeout-top {
    top: 0;
    left: 0;
    right: 0;
    bottom: 100vh;
    opacity: 0.2;
}

.register-layer-fadein-top {
    bottom: 50vh;
}

.register-layer-fadeout-bottom {
    top: 100vh;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.2;
}

.register-layer-fadein-bottom {
    top: 50vh;
}

.register-layer-fadeout-left {
    top: 0;
    left: 100vw;
    right: 0;
    bottom: 100vh;
    opacity: 0.2;
}

.register-layer-fadein-left {
    left: 50vw;
}

.register-layer-fadeout-right {
    top: 0;
    right: 100vw;
    left: 0;
    bottom: 100vh;
    opacity: 0.2;
}

.register-layer-fadein-right {
    right: 50vw;
}

#register-layer-top,
#register-layer-bottom {
    transition-property: all;
    transition-duration: 1.6s;
    transition-timing-function: cubic-bezier(0.17, 0.99, 0.63, 0.6);
    transition-delay: 0s;
}

#register-layer-right,
#register-layer-left {
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0.17, 0.99, 0.63, 0.6);
    transition-delay: 0s;
}

#register-layer-top,
#register-layer-left,
#register-layer-right,
#register-layer-bottom {
    z-index: 998;
    background-color: rgb(228, 228, 228);
    position: fixed;
}

#register-layer-top {
    top: 0;
    left: 0;
    right: 0;
}

#register-layer-bottom {
    bottom: 0;
    left: 0;
    right: 0;
}

#register-layer-left {
    top: 0;
    right: 0;
    bottom: 0;
}

#register-layer-right {
    top: 0;
    left: 0;
    bottom: 0;
}

#register-panel-wrapper {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;

    transition-property: all;
    transition-duration: 1.5s;
    transition-timing-function: cubic-bezier(1, 0.05, 0.84, 0.74);
    transition-delay: 0s;
}

.light #register-panel-wrapper {
    background: #e4e4e4;
}
</style>
