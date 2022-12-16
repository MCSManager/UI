<!-- 
    Copyright (C) 2022 Friendship Studio - AsakiRain & BiDuang
    <asak@irain.cc> <me@biduang.cn>
 -->

<template>
    <div>
        <div id="login-layer-top" :class="{ 'login-layer-fadeout-top': close, 'login-layer-fadein-top': !close }"></div>
        <div id="login-layer-left" :class="{ 'login-layer-fadeout-left': close, 'login-layer-fadein-left': !close }">
        </div>
        <div id="login-layer-right" :class="{ 'login-layer-fadeout-right': close, 'login-layer-fadein-right': !close }">
        </div>
        <div id="login-layer-bottom"
            :class="{ 'login-layer-fadeout-bottom': close, 'login-layer-fadein-bottom': !close }"></div>

        <div id="login-panel-wrapper" :class="{ 'login-panel-wrapper-out': closeWindow }">
            <Transition name="slide" mode="out-in" appear>
                <Panel id="login-panel" v-loading="loading" body-style="padding: 0;" v-if="(!isFailed && !isSuccess)">
                    <template #default>
                        <div id="body-wrapper">
                            <div id="webauthn-wrapper" class="main-wrapper">
                                <div class="webauthn-title">{{ $t("webauthn.login.logining") }}</div>
                                <div class="webauthn-info">{{ $t("webauthn.login.logining_info") }}</div>
                                <div class="login-progress">
                                    <el-progress :show-text="false" :percentage="100" :indeterminate="true" />
                                </div>
                            </div>
                        </div>
                    </template>
                </Panel>
                <Panel id="error-panel" v-loading="loading" body-style="padding: 0;" v-else-if="isFailed">
                    <template #default>
                        <div id="body-wrapper">
                            <div id="error-wrapper" class="error-wrapper">
                                <i class="el-icon-cirle-close-filled"></i>
                                <div class="error-title">{{ $t("webauthn.login.error.title") }}</div>
                                <el-divider />
                                <div class="error-info">{{ $t("webauthn.login.error.info_1") }}</div>
                                <div class="error-info">{{ $t("webauthn.login.error.info_2") }}</div>
                                <div class="error-detail">
                                    <p id="loginErrorTitle" class="error-info-title">{{ errorTitle }}</p>
                                    <p id="loginErrorDetail" class="error-info-detail">{{ errorDetail }}</p>
                                    <p id="loginErrorDebug" class="error-debug-info">{{ debugInfo }}</p>
                                </div>
                                <div class="error-return">
                                    <el-button type="warning" @click="handleReturn">返回</el-button>
                                </div>
                            </div>
                        </div>
                    </template>
                </Panel>
                <Panel id="success-panel" v-loading="loading" body-style="padding: 0;" v-else-if="isSuccess">
                    <template #default>
                        <div id="success-wrapper">
                            <div id="form-wrapper">
                                <div id="success-title">登录成功</div>
                                <div id="success-info">win</div>
                                <div style="margin-top: 22px">
                                    <div class="register-btn-wrapper row-mt">
                                        <el-button type="primary" size="small" style="width: 110px" :disabled="close"
                                            :loading="loading" @click="handleReturn">返回
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </Panel>
            </Transition>
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

        <div class="bg"></div>
    </div>
</template>

<script>
import Panel from "../../../../components/Panel";
import { request, setupUserInfo } from "../../../service/protocol";
import { startAuthentication } from "@simplewebauthn/browser";
import {
    API_WEBAUTHN_generate_authentication_options,
    API_WEBAUTHN_verify_authentication,
    sleep
} from "../../../service/common";
// eslint-disable-next-line no-unused-vars
// import router from "../router";

export default {
    components: { Panel },
    data: function () {
        return {
            close: false,
            closeWindow: false,
            loading: false,
            cause: "",
            loginInfo: "",
            isFailed: false,
            errorTitle: "未知错误",
            errorDetail: "在尝试使您登录时遇到了意料之外的错误",
            debugInfo: "Error-Unexpected-0"
        };
    },
    methods: {
        async handleReturn() {
            this.close = true;
            this.closeWindow = true;
            this.$router.back();
        },
        async webauthnLogin() {
            const username = sessionStorage.getItem("username");
            await sleep(1500);

            let asseResp;
            try {
                const opts = await request({
                    method: "POST",
                    url: API_WEBAUTHN_generate_authentication_options,
                    data: {
                        username
                    }
                });
                if (opts.error) {
                    this.errorTitle = opts.error;
                    this.errorDetail = opts.error_detail;
                    this.debugInfo = opts.debug_info
                    this.isFailed = true;
                    return;
                }
                asseResp = await startAuthentication(opts);
            } catch (error) {
                this.errorTitle = "登录错误";
                this.errorDetail = error;
                this.debugInfo = "Error-AuthFailedFrontend-193";
                this.isFailed = true;
                return;
            }
            let verify;
            try {
                verify = await request({
                    method: "POST",
                    url: API_WEBAUTHN_verify_authentication,
                    data: {
                        username,
                        authentication_credential_json: asseResp
                    }
                });
            } catch (error) {
                this.errorTitle = "登录错误";
                this.errorDetail = error;
                this.debugInfo = "Error-AuthFailedFrontend-209";
                this.isFailed = true;
                return;
            }
            if (verify) {
                console.log("User Authenticated!");
                this.close = true;
                this.closeWindow = true;
                try {
                    await setupUserInfo();
                } catch (error) {
                    this.$alert(this.$t("login.notify.message"), this.$t("login.notify.title"));
                }
                await sleep(1500);
                this.$router.push({ path: "/" });
            }
        }

    },
    async mounted() {
        this.webauthnLogin();
    }
};
</script>

<style lang="scss" scoped>
.bg {
    z-index: 997;
    position: fixed;
    backdrop-filter: blur(8px) brightness(0.5);
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
}

.login-panel-wrapper-out {
    opacity: 0;
    z-index: 1;
}

.login-layer-fadeout-top {
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 100vh;
    opacity: 0.2;
}

.login-layer-fadein-top {
    bottom: 50vh;
}

.login-layer-fadeout-bottom {
    top: 100vh;
    left: 0px;
    right: 0px;
    bottom: 0px;
    opacity: 0.2;
}

.login-layer-fadein-bottom {
    top: 50vh;
}

.login-layer-fadeout-left {
    top: 0px;
    left: 100vw;
    right: 0px;
    bottom: 100vh;
    opacity: 0.2;
}

.login-layer-fadein-left {
    left: 50vw;
}

.login-layer-fadeout-right {
    top: 0px;
    right: 100vw;
    left: 0px;
    bottom: 100vh;
    opacity: 0.2;
}

.login-layer-fadein-right {
    right: 50vw;
}

#login-layer-top,
#login-layer-bottom {
    transition-property: all;
    transition-duration: 1.6s;
    transition-timing-function: cubic-bezier(0.17, 0.99, 0.63, 0.6);
    transition-delay: 0s;
}

#login-layer-right,
#login-layer-left {
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0.17, 0.99, 0.63, 0.6);
    transition-delay: 0s;
}

#login-layer-top,
#login-layer-left,
#login-layer-right,
#login-layer-bottom {
    z-index: 998;
    background-color: rgba(43, 43, 43, 0.183);
    position: fixed;
}

#login-layer-top {
    top: 0px;
    left: 0px;
    right: 0px;
}

#login-layer-bottom {
    bottom: 0px;
    left: 0px;
    right: 0px;
}

#login-layer-left {
    top: 0px;
    right: 0px;
    bottom: 0px;
}

#login-layer-right {
    top: 0px;
    left: 0px;
    bottom: 0px;
}

#login-panel-wrapper {
    position: fixed;
    z-index: 999;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;

    display: flex;
    align-items: center;

    transition-property: all;
    transition-duration: 1.5s;
    transition-timing-function: cubic-bezier(1, 0.05, 0.84, 0.74);
    transition-delay: 0s;
}

.light #login-panel-wrapper {
    // background: #e4e4e400;
}

#login-panel {
    min-height: 270px;
    width: 430px;
    transition: all 0.4s 0.2s;
}

/* #login-panel:hover {
  box-shadow: 0 0px 18px rgba(0, 0, 0, 0.1);
  border: 1px solid #828487;
  transform: scale(1.04);
} */

.login-btn-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.login-info-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: right;
}

.login-info-wrapper a {
    color: gray;
    text-decoration: underline;
}

#login-cause {
    color: rgb(170, 8, 8);
    font-size: 12px;
    margin-right: 18px;
}

.fgp {
    font-size: 12px;
    margin-right: 18px;
}

.main-wrapper {
    margin: 25px;
    position: relative;
    transform: translateY(20%);
}

.webauthn-title {
    margin-top: 25px;
    font-size: 24px;
    font-weight: 600;
}

.webauthn-info {
    margin-top: 15px;
    font-size: 16px;
}

.login-progress {
    margin-top: 50px;
    width: 100%;
}

#error-panel {
    min-height: 460px;
    width: 900px;
    transition: all 0.4s 0.2s;
}

.error-wrapper {
    margin: 25px;
}

.error-title {
    text-align: left;
    font-size: 28px;
    font-weight: 600;
}

.error-info {
    text-align: left;
    font-size: 16px;
    margin-top: 12px;
}

.error-detail {
    min-height: 120px;
    text-align: left;
    font-size: 14px;
    margin-top: 12px;
    background-color: rgba(161, 161, 161, 0.295);
    padding: 15px;
    border: 1px solid --el-box-shadow-lighter;
    border-radius: 4px;
}

.error-info-title {
    text-align: left;
    font-size: 15px;
    margin-top: 12px;
    font-weight: bold;
}

.error-info-detail {
    text-align: left;
    font-size: 14px;
}

.error-debug-info {
    text-align: left;
    font-size: 14px;
    color: #227670;
}

.error-return {
    text-align: right;
    margin-top: 20px;
}

@media (max-width: 900px) {
    #login-panel {
        text-align: center;
        margin: 0;
        padding: 0;
        min-height: 100vh;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 0px;
    }

    #login-panel:hover {
        border: none;
    }

    .login-btn-wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column-reverse;
        text-align: center;
    }

    #login-cause {
        margin-top: 12px;
        margin-right: 0px;
    }

    .login-info-wrapper {
        text-align: center;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}
</style>
