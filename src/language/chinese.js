export default {
    general: {
        search: "搜索",
        searchName: "根据名称搜索",
        operate: "操作",
        setting: "设置",
        manage: "管理",
        edit: "编辑",
        allocation: "分配资源",
        add: "新增",
        confirm: "确定",
        cancel: "取消",
        delete: "删除",
        pleaseSelect: "请选择",
        refresh: "刷新",
        refreshFinish: "已刷新",
        required: "必填",
        warn: "警告"
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
        daemonOverviewInfo:
            "确保所有守护进程均在线，离线状态将导致此守护进程以及相关功能不可用，可能会影响使用体验与数据。<br>面板端 {panelVersion} 必须对应守护进程 {specifiedDaemonVersion} 版本",
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
        offline: "离线",

        panelApiRequestCount: "面板端接口请求量",
        panelApiRequestInfo: "每 1 分钟统计间隔，总计 1 小时的请求历史",

        panelCpuUsage: "面板端 CPU 使用率",
        panelCpuUsageInfo: "每 10 秒统计间隔，总计 10 分钟的 CPU 历史使用率",

        runningInstances: "分布式实例运行量",
        runningInstancesInfo: "每 1 分钟统计间隔，总计 1 小时的实例状态历史",

        panelMemoryUsage: "面板端内存使用率",
        panelMemoryUsageInfo: "每 10 秒统计间隔，总计 10 分钟的内存历史使用率",

        docs: "帮助文档",
        "Q&A": "常见问题"
    },
    instances: {
        instancesList: "应用实例列表",
        selectDaemon: "请选择远程守护进程地址",
        selectOne: "请至少选择一项",
        instanceName: "实例名称",
        showCardList: "简单视图",
        showTableList: "批量操作视图",
        newInstance: "新建实例",
        start: "开启",
        stop: "关闭",
        kill: "终止",
        remove: "移除",
        delete: "删除",
        selectRemoteError: "未选择任何远程守护进程",
        selectRemoteTitle: "请在左上方的下拉框中选择远程守护进程",
        selectRemoteInfo:
            "默认可选择 localhost 守护进程，守护进程可以部署在任意主机上，帮助您快速管理多个主机并且分布式部署。",
        notAnyInstanceTitle: "无数据，请点击右上方绿色的“新建实例”按钮创建实例。",
        notAnyInstanceInfo:
            "应用实例可以是 Minecraft服务器，也可以是其他任何应用程序，点击创建后将部署在指定的远程守护进程中。",
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
            busy: "忙碌"
        },

        card: {
            editConfig: "编辑配置",
            controlPanel: "控制面板",
            remove: "移除实例",
            delete: "删除实例"
        },

        table: {
            instancesList: "实例列表",
            instanceType: "实例类型",
            byteStreamCode: "字节流编码",
            lastDatetime: "最后启动",
            operate: "操作"
        },
        dialog: {
            instanceParameterEdit: "实例参数编辑",
            commandClose: "关闭命令",
            commandCloseInfo: "执行“关闭”命令时所执行的实际命令",
            inputOrOutputCode: "输入/输出编码",
            inputOrOutputCodeInfo: "当控制台出现乱码时可以尝试调整，例如: GBK，UTF-8 等",
            update: "更新",
            close: "关闭"
        }
    },
    users: {
        userList: "用户列表",
        newUser: "新建用户",
        delUser: "删除用户",
        userName: "用户名",
        userNameInfo: "必填，6 到 12 个字符，支持中文，英文和字符",
        regTime: "注册时间",
        lastTime: "最后登录",

        permit: {
            permission: "权限",
            permissionLevel: "权限等级",
            permissionInfo: "普通权限适用于商业用户，最高权限适用于管理人员",
            normal: "普通权限",
            admin: "最高权限",
            ban: "禁封"
        },

        newUserDialog: {
            inputSth: "请输入内容...",
            userPasswd: "用户密码",
            userPasswdInfo: "必填，9 到 36 个字符，不支持中文，只限于字母，数字和符号",
            inputPasswd: "请输入密码"
        },

        ps: "注意事项",
        psInfo:
            "若您从事出租商业活动，请务必保证应用实例运行在 Linux 的 Docker 虚拟容器中，否则将有安全隐患。",
        infoReference: "具体信息参考",

        editUser: "编辑用户",
        resetPasswd: "重置密码",
        resetPasswdInfo: "不填写则不更变原有值",
        originalSet: "原值",
        updateData: "更新数据",
        SaveData: "保存数据",
        selectAUser: "请至少选择一个用户"
    },
    services: {
        remoteDaemonManage: "远程守护进程管理",
        addDaemon: "新增远程守护进程",
        learnHowItWork: "了解工作原理",
        Daemons: "已配置的守护进程",
        remoteInfo:
            "远程守护进程（在任何物理主机上）必须确保全部在线且互相网络畅通，面板连接需公开放行守护进程端口与配置密钥。<br />网页需要能直接连接远程守护进程（上传，下载与控制台），避免使用除 localhost 外的局域网段任何 IP，必须使用外网 IP 或域名进行连接。<br />面板端对应的守护进程版本：{ specifiedDaemonVersion }",
        platform: "平台",
        instanceStatus: "实例状态",
        version: "版本",
        update: "更新",
        connect: "连接",
        changeKey: "修改密钥",

        remarks: "备注信息",
        remarksInfo: "选填，支持中文，用于填写相关备注信息",
        remoteIP: "守护进程所在主机的 IP 地址",
        remoteIPSub: "<b>必须使用外网地址</b>或 localhost 地址，否则将导致远程实例无法连接",
        remoteIPInfo: "必填，例如 mcsmanager.com，43.123.211.12",
        daemonPort: "守护进程端口",
        daemonPortInfo: "必填，例如 24444",
        verifyKey: "验证密钥",
        keySub: "在守护进程启动时控制台上会输出显示，务必确保密钥安全",
        getKey: "如何获取密钥？",
        keyInfo: "必填，例如 6ff0fa1ef9a943f3c6f2fe0e4564a2fa383d35c4b78ccb5",

        addNewWarn: {
            title: "新增远程主机警告",
            ip: "检测到您的连接 IP 为 : { newServiceInfo }，似乎是一个内网地址？",
            outerNet: "面板与守护进程端均要能够让用户访问，以此行为设计即可实现流量分流减轻中心面板端的压力。",
            whyOuterNet: "为什么必须使用外网 IP 连接远程节点",
            because: "为了减轻中心控制端（Web 面板端）的流量压力，我们必须将流量分流到各自的远程主机，<br />这样就必须保证每个远程主机均要能够使用外网访问，所以您也必须使用外网 IP 地址来访问这个主机的实例",
            workingPrinciple: "分布式服务数据传输工作原理",
            KeepIntranet: "请问您是否依然要坚持使用内网 IP 连接？",
            ifTrueThen: "如果强制使用，则实例的部分功能不可用。",
            yeah: "强制执行",
            cancel: "取消执行"
        },

        principlePanel: {
            title: "分布式服务工作原理",
            desc: "为了减轻中心控制端（Web 面板端）的流量压力与计算压力，我们采用 “数据走直连，指令走转发” 的设计概念。<br />这样的设计会暴露各个守护进程，但您守护进程主机上的服务本应就会暴露，再加上可控的权限识别，无需担忧各个主机安全问题。",
            principleImage: "分布式服务工作原理图",
            onlyOne: "如果您只有一个主机，则可以无视此工作原理，按正常使用方式即可。",
        },

        delDaemonWarn: "此操作将永久删除该守护进程，是否继续？",
        inputNewRemark: "请输入新的备注内容",
        updateRemarkSuccess: "更新备注信息成功",
        inputNewKey: "请输入新密钥，设置后将自动尝试连接",
        key: "密钥",
    },
    home: {
        totalInstance: "实例总计",
        totalInstanceCount: "管理员所分配给您的所有实例总数",
        running: "正在运行",
        runCount: "实例正在运行中的数量",
        outOfRunning: "未运行",
        outOfRunningCount: "实例未处于运行中的数量",
        maintaining: "维护中",
        maintainingInfo: "因主机忙碌/维护而暂时不可使用的实例数",
        personalInfo: "个人信息",
        userName: "用户名",
        registerTime: "注册时间",
        loginTime: "最后登录",
        permission: "权限",
        possessedInstanceList: "拥有的实例列表",
        stopping: "停止中",
        starting: "启动中",
        unknownStatus: "未知状态",
        updateSuccess: "更新成功",
        admin: "管理用户",
        user: "普通用户"
    },
    quickStart: {
        title: "您希望使用 MCSManager 面板做什么？",
        quickItems: [
            {
                title: "创建一个的 Minecraft 服务器",
                subTitle: "帮助您快速部署 Java/基岩版 Minecraft 服务器"
            },
            {
                title: "创建一个其他游戏服务器",
                subTitle: "尝试帮助您创建其他游戏服务器，不保证完全兼容"
            },
            {
                title: "在面板中管理我的控制台程序",
                subTitle: "让您的控制台程序，比如 Nginx.exe，frp.exe 和 cmd.exe 在网页上进行管理"
            },
            {
                title: "获得更多信息",
                subTitle: "我们将打开官方文档以帮助您获取更多有用信息"
            }
        ],
        whichServer: "请选择您期望部署到哪台主机？"
    },
    install: {
        welcome: "欢迎使用 MCSManager 管理面板",
        desc: "开源，分布式，开箱即用，支持 Minecraft 游戏服务端和所有控制台程序的管理面板",
        start: "开始使用",
        createAdminAccount: "创建一个访问面板的管理员账号",
        createAdminAccountInfo: "用户名支持任何语言，请务必保证您的密码安全。",
        passWord: "密码",
        createAccount: "创建账号",
        ohhh: "完成！",
        ohhhInfo: "最后，您是第一次使用此软件吗？",
        firstTime: "首次使用",
        oldUSer: "老用户",
        adminOK: "管理员已创建"
    },
    notify: {
        connectDaemonErrorr: "访问远程守护进程异常",
        confirmDelTitle: "最终确认",
        confirmDelContent: "确定要进行移除/删除吗？",
        confirmBatchDelContent: "确定要进行批量移除吗？此操作不会删除实例实际文件，只会删除实例",
        confirmBatchDelFileConten: "确定要进行批量移除吗？此操作不会删除实例实际文件，只会删除实例",
        editSuccess: "修改成功",
        createSuccess: "创建成功",
        delSuccess: "删除成功",
        batchDelSuccess: "批量删除成功",
        Success: "数据刷新可能存在一定延时",
        mayBeDelay: "可能会存在一定延迟，文件删除需要一定的时间",
        selectInsError: "无法执行，请至少选择一个实例",
        startCmdSend: "开启命令已发出",
        stopCmdSend: "关闭命令已发出",
        killCmdSend: "终止命令已发出",
        dateLoadError: "数据加载出错",
        cmdSendInfo: "已成功向各个远程主机发布命令，具体操作可能略有延时，请稍等一段时间后查看结果"
    }
};
