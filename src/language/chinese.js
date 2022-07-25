export default {
    general: {
        search: "搜索",
        setting: "设置"
    },
    overview: {
        systemInfoTable: "系统信息表",
        daemonStatus: "守护进程状态",
        daemonAvailable: "已正确连接数 / 已配置总数",
        instanceStatus: "实例运行状态",
        runningAndTotalInstance: "正在运行数 / 全部实例总数",
        userLogin: "用户登录次数",
        failedLogin: "登录失败次数 : 登录成功次数",
        systemType: "系统类型",
        systemName: "系统版本",
        webPanelTime: "面板端时间",
        localTime: "本地时间",
        computerName: "计算机名称",
        systemUserName: "进程权限用户",
        memoryUsage: "内存使用数值",
        nodeVersion: "Node 版本",
        panelVersion: "面板版本",
        specifiedDaemonVersion: "对应守护进程版本",
        illegalAccess: "阻挡请求次数",
        banips: "封禁 IP 数",
        minBefore: "分前",
        secBefore: "秒前",
        systemLoad: "系统负载",
        systemLoadPercentage: "面板所在主机 CPU，RAM 百分比",

        daemonOverview: "分布式服务总览",
        daemonOverviewInfo: "确保所有守护进程均在线，离线状态将导致此守护进程以及相关功能不可用，可能会影响使用体验与数据。<br>面板端 {panelVersion} 必须对应守护进程 {specifiedDaemonVersion} 版本",
        addr: "地址",
        remarks: "备注",
        port: "端口",
        mem: "内存",
        instance: "已有实例",
        runningInstance: "运行实例",
        daemonVersion: "守护进程版本",
        lowDaemonVersion: "与面板端要求版本不一致",
        connectStatus: "连接状态",
        online: "在线",
        errorConnect: "无法连接到指定 IP 或者密钥错误",
        outline: "离线",

        panelApiRequestCount: "面板端接口请求量",
        panelApiRequestInfo: "每 1 分钟统计间隔，总计 1 小时的请求历史",

        panelCpuUsage: "面板端 CPU 使用率",
        panelCpuUsageInfo: "每 10 秒统计间隔，总计 10 分钟的 CPU 历史使用率",

        runningInstances: "分布式实例运行量",
        runningInstancesInfo: "每 1 分钟统计间隔，总计 1 小时的实例状态历史",

        panelMemoryUsage: "面板端内存使用率",
        panelMemoryUsageInfo: "每 10 秒统计间隔，总计 10 分钟的内存历史使用率",

        docs: "帮助文档",
        "Q&A": "常见问题",
    },


    home: {
        totalInstance: "实例总计",
        running: "正在运行",
        outOfRunning: "未运行",
        maintaining: "维护中",
        personalInfo: "个人信息",
        userName: "用户名",
        registerTime: "注册时间",
        loginTime: "最后登录",
        permission: "权限",
        possessedInstanceList: "拥有的实例列表",
        stopping: "停止中",
        starting: "启动中",
        unknownStatus: "未知状态",

    },
    instances: {
        instancesList: "应用实例列表",
        selectDaemon: "请选择远程守护进程地址",
        instanceName: "实例名称",
        showCardList: "简单视图",
        showTableList: "批量操作视图",
        newInstance: "新建实例",
        start: "开启",
        stop: "关闭",
        kill: "终止",
        remove: "移除",
        delete: "删除",
        selectRemoteError: "错误：未选择任何远程守护进程",
        selectRemoteTitle: "请在左上方的下拉框中选择远程守护进程",
        selectRemoteInfo: "默认可选择 localhost 守护进程，守护进程可以部署在任意主机上，帮助您快速管理多个主机并且分布式部署。",
        notAnyInstanceTitle: "无数据，请点击右上方绿色的“新建实例”按钮创建实例。",
        notAnyInstanceInfo: "应用实例可以是 Minecraft服务器，也可以是其他任何应用程序，点击创建后将部署在指定的远程守护进程中。",
        lastDatetime: "启动时间",
        endTime: "到期时间",
        otherInfo: "其他信息",
        detailsInfo: "详细信息",
        playerCount: "人数",
        mcVersion: "版本",

        status: {
            title: "状态",
            runStatus: "运行状态",
            die: "未运行",
            running: "运行中",
            stopping: "停止中",
            starting: "启动中",
            busy: "忙碌",
        },

        card: {
            editConfig: "编辑配置",
            controlPanel: "控制面板",
            remove: "移除实例",
            delete: "删除实例",
        },

        table: {
            instancesList: "实例列表",
            instanceType: "实例类型",
            operate: "操作"
        }

    }
}