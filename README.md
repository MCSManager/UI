<img src="https://public-link.oss-cn-shenzhen.aliyuncs.com/mcsm_picture/logo.png" alt="MCSManager 图标.png" width="500px" />

<br />

[![Status](https://img.shields.io/badge/npm-v6.14.15-blue.svg)](https://www.npmjs.com/)
[![Status](https://img.shields.io/badge/node-v14.17.6-blue.svg)](https://nodejs.org/en/download/)
[![Status](https://img.shields.io/badge/License-AGPL-red.svg)](https://github.com/Suwings/MCSManager)

[官方网站](http://mcsmanager.com/) | [使用文档](https://docs.mcsmanager.com/) | [团队主页](https://github.com/MCSManager) | [面板端项目](https://github.com/MCSManager/MCSManager) | [网页前端项目](https://github.com/MCSManager/UI) | [守护进程项目](https://github.com/MCSManager/Daemon)

**适用于 MCSManager 的 Web UI 项目。**

项目主仓库请前往：[https://github.com/MCSManager/MCSManager](https://github.com/MCSManager/MCSManager)

<br />

## MCSManager 简介

**分布式，稳定可靠，开箱即用，高扩展性，支持 Minecraft 和其他少数游戏的控制面板。**

MCSManager 面板（简称：MCSM 面板）是一款全中文，轻量级，开箱即用，多实例和支持 Docker 的 Minecraft 服务端管理面板。

此软件在 Minecraft 和其他游戏社区内中已有一定的流行程度，它可以帮助你集中管理多个物理服务器，动态在任何主机上创建游戏服务端，并且提供安全可靠的多用户权限系统，可以很轻松的帮助你管理多个服务器。

<br />

## 搭建开发环境

```bash
git clone https://github.com/MCSManager/MCSManager-UI.git
cd MCSManager-UI
npm install
npm run serve
# 访问 http://localhost:8080/ 即可预览界面
```

> 需要面板端项目同时运行以提供后端接口能力，默认所有请求转发到 23333 端口。

<br />

## 问题报告

欢迎发现的任何问题进行反馈，必当及时修复。

若发现严重安全漏洞又不便公开发布，请发送邮件至: Suwings@outlook.com，安全问题修复后将在代码中附加漏洞发现者姓名。

<br />

## 贡献

如果你在使用过程中发现任何问题，可以提交 Issue 或自行 Fork 修改后提交 Pull Request。

代码需要保持现有格式，不得格式化多余代码，具体可[参考这里](https://github.com/MCSManager/MCSManager/issues/544)。

<br />

## 版权约束

此开源项目使用 [AGPL 协议](LICENSE) 作为开源协议，未经过官方闭源开发授权，您如果对代码有任何修改，则必须要公开您修改后的源代码，具体约束如下。

**准许**

- 对软件源代码进行修改，复制，分发。
- 利用软件进行商业使用，赚取利润。

**必须**

- 公开提供您修改后的完整源代码。
- 在代码文件、界面中保留版权声明。

**禁止**

- 禁止售卖此软件，申请专利，著作权等。

> 更多授权与版权约束详情，请前往官方网站界面了解更多。

<br />
