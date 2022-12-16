<!-- 
    Copyright (C) 2022 Friendship Studio - AsakiRain & BiDuang
    <asak@irain.cc> <me@biduang.cn>
 -->

<template>
    <div>
        <div id="reg-layer-top" :class="{ 'reg-layer-fadeout-top': close, 'login-layer-fadein-top': !close }"></div>
        <div id="reg-layer-left" :class="{ 'reg-layer-fadeout-left': close, 'login-layer-fadein-left': !close }">
        </div>
        <div id="reg-layer-right" :class="{ 'reg-layer-fadeout-right': close, 'login-layer-fadein-right': !close }">
        </div>
        <div id="reg-layer-bottom" :class="{ 'reg-layer-fadeout-bottom': close, 'reg-layer-fadein-bottom': !close }">
        </div>

        <div id="reg-panel-wrapper" :class="{ 'reg-panel-wrapper-out': closeWindow }">
            <Transition name="slide" mode="out-in" appear>
                <Panel id="reg-panel" v-loading="loading" body-style="padding: 0;" v-if="(!isFailed && !isSuccess)">
                    <template #default>
                        <div id="body-wrapper">
                            <div id="webauthn-wrapper" class="main-wrapper">
                                <div class="webauthn-title">{{ $t("webauthn.register.processing.title") }}</div>
                                <div class="webauthn-info">{{ $t("webauthn.register.processing.info") }}</div>
                                <div class="reg-progress">
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
                                <div class="error-title">{{ $t("webauthn.register.processing.error.title") }}</div>
                                <el-divider />
                                <div class="error-info">{{ $t("webauthn.register.processing.error.info_1") }}</div>
                                <div class="error-info">{{ $t("webauthn.register.processing.error.info_2") }}</div>
                                <div class="error-detail">
                                    <p id="RegErrorTitle" class="error-info-title">{{ errorTitle }}</p>
                                    <p id="RegErrorDetail" class="error-info-detail">{{ errorDetail }}</p>
                                    <p id="RegErrorDebug" class="error-debug-info">{{ debugInfo }}</p>
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
                            <div id="success-image-wrapper">
                                <el-image style="width: 200px"
                                    src="https://cdn.friendship.org.cn/LightPicture/2022/10/cb39598188d255bd.jpg" fit="contain" />
                            </div>
                            <div id="form-wrapper">
                                <div id="success-title">{{ $t("webauthn.register.processing.success.title") }}</div>
                                <div id="success-info">{{ $t("webauthn.register.processing.success.info") }}</div>
                                <div style="margin-top: 22px">
                                    <div class="register-btn-wrapper row-mt">
                                        <el-button type="primary" size="small" style="width: 110px" :disabled="close" :loading="loading"
                                            @click="handleReturn">
                                            {{ $t("webauthn.register.processing.success.finishBtn") }}
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </Panel>
            </Transition>
        </div>
    </div>
</template>

<script>
import Panel from "../../../../../components/Panel";
import { request } from "../../../../service/protocol";
import { startRegistration } from "@simplewebauthn/browser"
import {
    API_WEBAUTHN_generate_registration_options,
    API_WEBAUTHN_verify_registration,
    sleep
} from "../../../../service/common";
// eslint-disable-next-line no-unused-vars
// import router from "../router";

export default {
    components: { Panel },
    props: {
        processStep: {
            type: Function,
            default: () => { }
        },
        handleReturn: {
            type: Function,
            default: () => { }
        },
        close: {
            type: Boolean,
            default: false
        },
        setContext: {
            type: Function,
            default: () => { }
        },
        ctx: {
            type: Object,
            default: () => { }
        }
    },
    data: function () {
        return {
            closeWindow: false,
            loading: false,
            cause: "",
            loginInfo: "",
            isFailed: false,
            isSuccess: false,
            errorTitle: "未知错误",
            errorDetail: "在尝试使您登录时遇到了意料之外的错误",
            debugInfo: "Error-Unexpected-0"
        };
    },
    methods: {
        async webauthnReg() {
            const username = sessionStorage.getItem("username");
            await sleep(1500);

            let attResp;
            try {
                const opts = await request({
                    method: "POST",
                    url: API_WEBAUTHN_generate_registration_options,
                    data: {
                        username
                    }
                });
                attResp = await startRegistration(opts);
            } catch (error) {
                if (error.name === "InvalidStateError") {
                    this.errorTitle = "注册错误";
                    this.errorDetail = "此设备已被注册";
                    this.debugInfo = "Error-DevicesRegFail-1";
                    this.isFailed = true;
                } else {
                    this.errorTitle = "注册错误";
                    this.errorDetail = error;
                    this.debugInfo = "Error-RegFailedFrontend-151";
                    this.isFailed = true;
                }
                return;
            }
            try {
                const verificationJSON = await request({
                    method: "POST",
                    url: API_WEBAUTHN_verify_registration,
                    data: {
                        username,
                        registration_credential_json: attResp
                    }
                });
                if (verificationJSON && verificationJSON.verified) {
                    this.isSuccess = true;
                } else {
                    this.errorTitle = "注册错误";
                    this.errorDetail = `服务器响应错误: ${JSON.stringify(
                        verificationJSON)}`;
                    this.debugInfo = "Error-RegFailed-170";
                    this.isFailed = true;
                }
            } catch (error) {
                this.errorTitle = "注册错误";
                this.errorDetail = error;
                this.debugInfo = "Error-RegFailedFrontend-177";
                this.isFailed = true;
            }

        }
    },
    async mounted() {
        this.webauthnReg();
    }
};
</script>

<style lang="scss" scoped>
.reg-panel-wrapper-out {
    opacity: 0;
    z-index: 1;
}

.reg-layer-fadeout-top {
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 100vh;
    opacity: 0.2;
}

.reg-layer-fadein-top {
    bottom: 50vh;
}

.reg-layer-fadeout-bottom {
    top: 100vh;
    left: 0px;
    right: 0px;
    bottom: 0px;
    opacity: 0.2;
}

.reg-layer-fadein-bottom {
    top: 50vh;
}

.reg-layer-fadeout-left {
    top: 0px;
    left: 100vw;
    right: 0px;
    bottom: 100vh;
    opacity: 0.2;
}

.reg-layer-fadein-left {
    left: 50vw;
}

.reg-layer-fadeout-right {
    top: 0px;
    right: 100vw;
    left: 0px;
    bottom: 100vh;
    opacity: 0.2;
}

.reg-layer-fadein-right {
    right: 50vw;
}

#reg-layer-top,
#reg-layer-bottom {
    transition-property: all;
    transition-duration: 1.6s;
    transition-timing-function: cubic-bezier(0.17, 0.99, 0.63, 0.6);
    transition-delay: 0s;
}

#reg-layer-right,
#reg-layer-left {
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0.17, 0.99, 0.63, 0.6);
    transition-delay: 0s;
}

#reg-layer-top,
#reg-layer-left,
#reg-layer-right,
#reg-layer-bottom {
    z-index: 998;
    background-color: rgba(43, 43, 43, 0.183);
    position: fixed;
}

#reg-layer-top {
    top: 0px;
    left: 0px;
    right: 0px;
}

#reg-layer-bottom {
    bottom: 0px;
    left: 0px;
    right: 0px;
}

#reg-layer-left {
    top: 0px;
    right: 0px;
    bottom: 0px;
}

#reg-layer-right {
    top: 0px;
    left: 0px;
    bottom: 0px;
}

#reg-panel-wrapper {
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

#reg-panel {
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

.reg-progress {
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

#success-panel {
    min-height: 200px;
    width: 800px;
    transition: all 0.4s 0.2s;
}

#success-image-wrapper {
    display: grid;
    padding-top: 5%;
    align-items: start;
    justify-items: center;
    margin-right: 44px;
}

#success-wrapper {
    padding: 44px;
    display: flex;
}

#form-wrapper {
    font-size: 16px;
}

#success-title {
    font-size: 24px;
    font-weight: 600;
}

#success-info {
    margin-top: 15px;
}

#success-image-wrapper {
    display: grid;
    padding-top: 5%;
    align-items: start;
    justify-items: center;
    margin-right: 44px;
}

@media (max-width: 900px) {
    #success-panel {
        text-align: center;
        margin: 0;
        padding: 0;
        min-height: 100vh;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 0;
    }

    #success-panel:hover {
        border: none;
    }

    #success-wrapper {
        flex-direction: column;
        align-items: center;
    }

    #success-image-wrapper {
        margin-right: 0;
    }
}


@media (max-width: 900px) {
    #reg-panel {
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

    #reg-panel:hover {
        border: none;
    }

    .reg-btn-wrapper {
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
