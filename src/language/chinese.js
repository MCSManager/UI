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
        deleteFinish: "已删除",
        pleaseSelect: "请选择",
        refresh: "刷新",
        refreshFinish: "已刷新",
        required: "必填",
        warn: "警告",
        allow: "准许",
        forbid: "禁止",
        enable: "启用",
        closed: "关闭",
        noSelect: "未选择",
        yes: "是",
        no: "否",
        save: "保存",
    },
    root: {
        title: "处理中...",
        private: "个人资料",
        logout: "退出",
        logoutSuccess: "退出成功",
        logoutSuccessInfo: "欢迎下次使用",
        logoutError: "退出失败",
    },
    login: {
        title: "身份验证",
        titleInfo: "使用服务器的 MCSManager 账号登录到面板",
        account: "账号",
        passWord: "密码",
        forgotPassword: "忘记密码",
        forgotPasswordInfo:
            "如果您是管理员且第一次登录，默认账号密码为：root，123456。如果您是普通用户，请要求您的服务商帮助您重置密码。如果您是管理员，请删除 mcsmanager/web/data/Users 文件夹重启面板端以重新加载用户。",
        login: "登录",
        logging: "登录中",
        isNull: "账号或密码不能为空值",
        errorUOrP: "账号或密码错误，请检查后重试",
        logBackIn: "重新登录",
        loginSuccess: "登录成功",

        notify: {
            title: "网页无法正确运作",
            message: "无法获取身份数据，网页所有功能将全部不可用，请立刻刷新网页或重新登录"
        }
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
    newInstances: {
        selectType: "请选择您要创建的应用类型",
        types: [
            {
                name: "Java 版 Minecraft 游戏服务端",
                desc: "适用于类似于 Spigot，Bungeecord 等 Jar 格式文件的服务端"
            },
            {
                name: "基岩版 Minecraft 游戏服务端",
                desc: "适用于 Bedrock Dedicated Server 等二进制执行文件或其他格式的服务端软件"
            },
            {
                name: "其他游戏服务端",
                desc: "适用于类似于大部分游戏私服程序运行，不保证能够完全兼容"
            },
            {
                name: "通用控制台应用程序",
                desc: "适用于类似于 bash，cmd.exe，app.exe，start.sh 和其他任何可用命令启动的程序"
            }
        ],
        selectCreateType: "选择创建方式",
        selectCreateTypeInfo:
            "如果您只想通过服务端软件开启服务器则选择第一项，其他选项均适用于不同的场景需求",
        createTypes: [
            {
                name: "上传单个服务端软件（推荐）",
                desc: "适用于第一次创建服务器，只需上传一个程序文件即可直接创建服务器并生成地图存档等"
            },
            {
                name: "上传服务端压缩包",
                desc: "适用于服务端整合包，以及现有的服务器存档，打包上传后自动解压并运行，只支持 zip 格式"
            },
            {
                name: "无需文件或选择已存在文件",
                desc: "不需要任何文件或者服务端文件已存在远程主机上，只需要手动设置启动命令以及文件目录即可完成"
            }
        ],
        back: "回退",
        instanceNameInfo: "支持中文，尽可能保证唯一性",
        instanceNameInfo2: "实例名，尽可能确保唯一性",
        commandTemplate: "启动命令模板",
        commandTemplateText: "其中 {{ProgramName}} 代表您接下来上传的文件名，一般情况下无需进行修改",
        cmdInfo: "如 java -jar server.jar",
        cmdAssist: "命令助手",
        fileDir: "服务端文件目录",
        fileDirInfo: "选填，默认自动创建与管理，如需填写请写完整绝对路径，如: C:/Servers/MyServer",
        autoCreate: "默认自动创建与管理",
        uploadFile: "上传服务端软件",
        uploadFileInfo: "服务端软件指 JAR/EXE 格式或其他可执行程序（如 Spigot.jar，Paper.jar 等）",
        afterUpload: "上传文件后实例将自动创建",

        launchCmd: "启动命令",
        launchCmdInfo: "因为无法识别压缩包中的服务端文件名，请您自行填写启动命令",
        launchCmdInfo2: "请您自行填写启动命令",
        autoCreate2: "选填，默认自动管理",
        uploadZip: "上传服务端压缩包",
        uploadZipInfo: "仅支持 ZIP 格式，上传后压缩包会自动解压到 “文件目录”",
        uploadZipButton: "上传压缩包",
        upFileInfo: "上传文件后实例将自动创建并解压文件，可能需要一段时间才能完成解压任务",

        selectFromExist: "从已存在的文件选择服务端",
        selectFromExistInfo: "文件必须已经存在远程主机（非面板机器）",
        cmd2: "如 java -jar server.jar，cmd.exe 等等",
        afterFlieName: "填写好服务端软件文件名后，再前往文件管理上传服务端软件即可开启实例。",

        createInstant: "创建实例",
        createSuccess: "创建成功",
        nowYouCan: "您现在可以对实例进行具体的设置和编辑",

        toEdit: "前往编辑实例具体参数",
        toEditInfo: "推荐立即前往编辑界面设置相关参数，比如 Docker 启动方式，编码设置，工作环境等",

        newInstanceGuide: "新建实例引导程序",
        pleaseFinish: "请先完善基本参数再进行上传文件操作",
        uploadAndCreate: "上传文件时将同时创建实例，此操作不可逆，是否继续？",

        uploadFinish: "上传完毕",
        createFinish: "创建完毕",
        instantWillBeCreate: "实例将创建，是否继续？",
        parameterNotFinish: "参数不完整，请填写",
        createFailed: "创建失败，原因:",
        uploadAndSet: "上传文件/设置参数"
    },
    instancesDetail: {
        title: "实例详细信息设置",
        titleInfo:
            "当前界面所有设置只有管理员可以进行更改，应用实例拥有远程代码执行功能，请谨慎修改配置。",
        uid: "远程/本地实例标识符",
        gid: "守护进程标识符",
        status: "当前状态",
        started: "已启动次数",
        createDateTime: "创建日期",
        lastDateTime: "最后启动日期",
        endTime: "到期时间",
        unlimited: "无限制",
        processType: {
            title: "进程类型",
            general: "普通程序启动方式",
            docker: "虚拟化容器启动方式"
        },
        distribute: {
            title: "分配给其他用户",
            ok: "可以，已启用容器隔离",
            no: "不推荐，可能会危害主机"
        },
        instanceType: "实例类型",
        instanceTypeInfo:
            "不同类型会导致功能不同，若无需求类型，可以选择较为抽象的通用类型，例如 Java 通用版服务端",
        launchCmdText:
            "适用于任何程序命令，若程序路径或附加参数中含有空格可使用引号作为边界，包含的文本将视作一段整体。整条命令不可有换行。<br />如果您输入命令无反应，或者终端排版错乱，可以开启 控制台-终端设置-伪终端进行尝试。<br />不同类型会导致功能不同，若无需求类型，可以选择较为抽象的通用类型，例如 Java 通用版服务端<br />通常情况下，建议使用命令助手生成启动命令，如果有额外需求可以自定义启动命令。<br />&#21015;&#22914;&#32;&#34;&#67;&#58;&#92;&#80;&#114;&#111;&#103;&#114;&#97;&#109;&#32;&#70;&#105;&#108;&#101;&#115;&#92;&#74;&#97;&#118;&#97;&#92;&#98;&#105;&#110;&#92;&#106;&#97;&#118;&#97;&#46;&#101;&#120;&#101;&#34;&#32;&#45;&#68;&#102;&#105;&#108;&#101;&#46;&#101;&#110;&#99;&#111;&#100;&#105;&#110;&#103;&#61;&#117;&#116;&#102;&#45;&#56;&#32;&#45;&#68;&#106;&#108;&#105;&#110;&#101;&#46;&#116;&#101;&#114;&#109;&#105;&#110;&#97;&#108;&#61;&#106;&#108;&#105;&#110;&#101;&#46;&#85;&#110;&#115;&#117;&#112;&#112;&#111;&#114;&#116;&#101;&#100;&#84;&#101;&#114;&#109;&#105;&#110;&#97;&#108;&#32;&#45;&#106;&#97;&#114;&#32;&#34;&#109;&#121;&#32;&#115;&#101;&#114;&#118;&#101;&#114;&#46;&#106;&#97;&#114;&#34;&#32;&#45;&#110;&#111;&#103;&#117;&#105;",
        cwd: "工作目录",
        cwdInfo: "实例运行的工作目录，可填绝对路径与相对路径",
        cwdExample: "例如: D:/MyServers/0001",
        updateCmd: "更新/安装程序文件命令",
        updateCmdInfo:
            "当用户执行更新/安装操作时，将会执行此命令，${mcsm_workspace} 代表工作目录，为空则不提供此功能",
        updateCmdExample:
            '例如: "D:/SteamCMD/steamcmd.exe" +login anonymous +force_install_dir "${mcsm_workspace}" "+app_update 380870 validate" +quit',
        ie: "终端输入编码",
        ieInfo: "命令发送编码，重启实例生效",
        oe: "终端输出编码",
        oeInfo: "终端输出编码，重启实例生效",
        stopCmd: "关闭实例命令",
        stopCmdInfo: "^C 代表发送 Ctrl+C 组合键",
        fileCode: "文件管理编码",
        fileCodeInfo: "文件管理功能的解压缩，编辑等编码",
        endTimeInfo: "到期后无法启动",
        launchType: "进程启动方式（推荐）",
        launchTypeInfo:
            "通常默认即可，如果从事商业活动则应当使用虚拟化容器启动方式，否则主机将可能被入侵。",
        defaultType: "默认类型",
        docker: "虚拟化容器（Linux Docker）",

        dockerConfig: "虚拟化容器配置",
        dockerConfigInfo:
            "一种基于 Docker 的虚拟化方案，可以给每个实例装入一个一次性的盒子中运行，使用后销毁，确保主机安全。",
        dockerImage: "环境镜像",
        dockerImageInfo: "指定实例镜像",
        openPort: "开放端口",
        openPortInfo: "多个以空格分割，冒号左边为宿主机暴露端口，右边为容器暴露端口，通常保持一致即可",
        portExample: "选填，示例 25565:25565/tcp 3380:3380/udp",
        quickEdit: "快速编辑",
        extraVolumes: "额外挂载路径",
        extraVolumesInfo:
            "向容器内挂载除工作目录外的其他目录，多个以空格分割，冒号左边为宿主机路径，右边为容器路径",
        extraVolumesExample: "示例 /backups/test1:/workspace/backups /var/logs/test1:/workspace/logs",
        containerName: "容器名",
        containerNameInfo: "容器创建使用的名字，为空随机生成",
        containerNameTooltip: "选填，无特殊需求不建议填写此项",
        containerNameExample: "选填，示例 lobby-1",
        netMode: "网络模式",
        netModeInfo: "选择容器接入的网络模式 如 bridge 网桥",
        netAliases: "网络别名",
        netAliasesInfo: "用于在自定义网络中容器互相访问，空格分隔",
        netAliasesTooltip: "选填，无特殊需求不建议填写此项",
        netAliasesExample: "选填，示例 login-server-1",
        limitCpu: "限制 CPU 使用率（百分比）",
        limitCpuInfo: "限制所有 CPU 总和使用率，会有少许偏差",
        limitCpuTooltip:
            "填写 50 代表所有核心使用率和限制在 50%，若填写 200 则代表准许使用所有核心使用率总和为 200%",
        limitCpuExample: "选填，0 到 无限大",
        cpuSetCpus: "指定 CPU 计算核心",
        cpuSetCpusInfo: "限制容器在指定的 CPU 核心上运行",
        cpuSetCpusTooltip:
            "指定进程在某些核心上运行，合理分配可以更好的利用您的系统硬件资源，例如 0,1 代表在第1，2核心上运作，逗号隔开",
        cpuSetCpusExample: "选填，例如 0,1,2,3",
        maxMem: "最大内存（单位 MB）",
        maxMemInfo: "例如 1024，2048 等，请勿加单位",
        maxMemExample: "选填，例如 1024",
        newImage: "--- 新建镜像 ---",

        console: "控制台",
        fileManager: "文件管理",
        back: "返回",
        saveSet: "保存配置",

        dockerTableDict: [
            {
                label: "通信协议(tcp/udp)"
            },
            {
                label: "对应的主机端口"
            },
            {
                label: "对应的容器端口"
            },
            {
                label: "主机绝对路径"
            },
            {
                label: "挂载到容器路径"
            }
        ],

        startError: "启动命令中不可包含换行，这并非脚本文件，不可执行多条命令，请检查",
        cantGetImageList: "无法获得远程主机镜像列表，建议前往“服务环境”界面创建镜像",
        cantGetNetModeList: "无法获得远程主机网络列表，建议检查 Docker 配置",

    },
    instanceTypeList: {
        "控制台通用程序": "控制台通用程序",
        "Steam 服务端通用": "Steam 服务端通用",
        "MC Java 版通用": "MC Java 版通用",
        "MC 基岩版通用": "MC 基岩版通用",
        "MC Spigot": "MC Spigot",
        "MC Paper": "MC Paper",
        "MC BungeeCord": "MC BungeeCord",
        "MC Bedrock": "MC Bedrock",
        "MC Sponge": "MC Sponge",
        "MC Forge": "MC Forge",
        "MC Fabric": "MC Fabric",
        "MC Bukkit": "MC Bukkit",
        "MC Geyser": "MC Geyser",
        "MC MCDR": "MC MCDR",
        "Web Shell": "Web Shell",
    },
    terminal: {
        name: "名称",
        type: "类型",
        unknown: "未知",
        currentPlayers: "玩家数",

        controlGroup: "实例控制组",
        confirmOperate: "确定执行此操作？",
        start: "开启实例",
        stop: "关闭实例",
        restart: "重启实例",
        kill: "强制终止实例",
        killTask: "终止正在运行的任务",
        updateInstance: "更新/安装实例",

        functionGroup: "实例功能组",
        processConfig: "特定配置",
        termSet: "终端设置",
        statusQuery: "状态查询",
        eventTask: "事件任务",
        instanceDetail: "高级实例设置",
        lastDatetime: "最后启动",
        ie: "输入编码",
        oe: "输出编码",

        newFullScreen: "新开全屏",
        fullScreen: "立刻全屏",
        restart2: "重启",
        exit: "退出",
        inputCmd: "此处可输入命令，按回车键执行",
        cmdHistory: "命令历史",
        noCmdHistory: "暂无任何命令历史",
        panelOnline: "面板端在线人数",
        panelOnlineInfo: "每 10 分钟统计间隔，总计 10 小时的在线人数趋势",

        pingConfig: {
            title: "实例状态查询协议配置",
            title2: "更好的监控服务端状态",
            title2Info: "此功能将根据管理员设置的实例类型自动选择相应协议，获取服务端进程的具体信息和参数（如：游戏人数，版本等）",
            addr: "服务端访问地址",
            inputAddr: "必填，支持域名与 IP 地址，不填写则不会查询服务端信息，人数，版本等。",
            addrExample: "例如：localhost",
            port: "服务端访问端口",
            inputPort: "必填，仅可输入数字端口号",
            portExample: "例如：25565",
        },

        eventConfigPanel: {
            title: "事件触发型任务",
            autoRestart: "自动重启",
            autoRestartInfo: "若实例状态在未经面板操作的情况下变为非运行状态将立刻发起启动实例操作。<br />可用于崩溃后自动重启功能。",
            autoStart: "自动启动",
            autoStartInfo: "只要守护进程（远程节点）运行，就自动发起一次启动实例操作。<br />如果将守护进程开机自启则可用于开机自启实例。",
        },

        unavailableTerminal: {
            title: "无法与守护进程建立连接",
            browserCannotConnect: "浏览器无法连接到",
            browserCannotConnect2: "浏览器无法与守护进程建立连接",
            maybe: "可能是您未开放守护进程的端口导致，或是使用了内网地址的缘故",
            solution: "可能的解决方案",
            solutions: '<li>确保守护进程的地址是公网地址，且守护进程端口已经开放。</li> <li> 若有反向代理，FRP，HTTPS 等，请采用 wss:// 协议连接， <br /> 并且守护进程端地址也需要 HTTPS，WSS 支持。 </li> <li> 前往 <a href="https://docs.mcsmanager.com" target="_blank" rel="noopener noreferrer" >https://docs.mcsmanager.com</a > 了解更多 </li>',
        },

        cantConnectTerm: "无法与终端建立连接",
        cantSendCmdBecauseData: "无法执行命令，数据流通道不可用",
        cantSendCmdBecauseNotRun: "无法执行命令，服务器未开启",
    },
    processConfig: {
        title: "配置列表组",
        aboutConfig: "关于配置文件列表",
        aboutConfigInfo: "配置文件适配工作由开发团队与开源社区开发者共同开发，相关作者已在具体项目中显示“模块作者”。如果出现多个同名的配置文件，在配置文件最前方已经标上适用于哪个服务端，请手动选择服务端/或衍生类服务端类型。",
        noConfigFile: "暂无任何配置文件",
        noConfigFileInfo: "经过特定实例类型({type})并配合文件扫描未检测出有任何符合条件的配置文件，请进行进程配置初始化或更改实例类型来进行调整",
        sameFile: "存在同名文件",
        author: "模块作者",
        unknownCompatible: "面板无法得知此配置文件是否兼容，请您自行根据类型进入相应配置文件界面。",
        browse: "浏览",
    },
    processConfigFile: {
        title: "配置文件",
        reload: "重新加载",
        back: "回到配置文件列表",
        editOriginal: "编辑源文件视图",
        noFile: "文件不存在或权限不正确，无法查看此文件的具体配置，您也许可以尝试到 “文件管理”功能在线编辑此文件，或尝试重启实例刷新此文件。",
        updateFailed: "更新失败"
    },
    termSet: {
        title: "终端设置",
        pty: "仿真终端（Beta）",
        ptyInfo: "通过仿真终端转发程序来获得终端完全交互能力。<br />包括使用 Tab，Ctrl 功能键等，但需要额外安装依赖库，默认情况下已经安装。",
        ifHaveProblems: "如果使用有问题，建议关闭。",
        ptySize: "仿真终端窗口大小",
        ptySizeInfo: "在仿真终端开启时生效，用于设置仿真终端高度和宽度，更改生效需要重启实例。",
        col: "列：",
        line: "行：",
        WebColor: "网页颜色渲染",
        WebColorInfo: "网页自动给输出内容增加颜色渲染，渲染的颜色不一定完全正确。<br />如果颜色渲染功能与软件自带的颜色功能冲突，可以关闭此功能。",
        stopCmdInfo: "当点击“关闭实例”按钮时，会立刻执行此命令，^C 代表 Ctrl+C 信号。",
        crlf: "命令执行回车符",
        crlfInfo: "如果您输入命令按回车没有反应，可以尝试调整此选项。",
        crlfInfo2: "Windows 平台下一般是“回车换行符”，Linux/MacOS 平台下一般是“换行符”。",
        newline: "换行符（\\n）",
        EnterNewline: "回车换行符（\\r\\n）",
        ioCode: "输入输出编码",
        ioCodeInfo: "如果控制台中的内容出现乱码，您可以尝试修改此编码解决问题。",
        setUpdate: "实例配置已更新，部分配置可能需要重启实例生效",
    },
    schedule: {
        addSchedule: "新增计划任务",
        backToConsole: "回到控制台",
        schedules: "计划任务表",
        taskName: "计划任务名字",
        payload: "有效载荷",
        count: "剩余次数",
        infinite: "无限",
        action: "动作",
        sendCmd: "发送命令",
        stop: "停止实例",
        start: "开启实例",
        restart: "重启实例",
        kill: "终止实例",
        intervalsTask: "间隔时间性任务",
        cycleTask: "周期时间性任务",
        specifyTask: "指定时间性任务",
        triggerTime: "触发时间",
        inputTaskName: "必填，并且必须唯一",
        taskType: "任务动作/类型",
        selectDate: "选择日期时间点",
        specificTime: "具体时间点",
        mon: "周一",
        tue: "周二",
        wen: "周三",
        thur: "周四",
        fri: "周五",
        sat: "周六",
        sun: "周日",
        executions: "执行次数",
        executionsNull: "留空为无限次",

        intervalsTaskInfo: "每隔一定时间将执行一次，具体间隔可以仔细设置",
        representHour: "不可为空，请写 0 代表每隔 0 时",
        hour: "时",
        representMin: "不可为空，请写 0 代表每隔 0 分",
        min: "分",
        representSec: "不可为空，请写 0 代表每隔 0 秒",
        sec: "秒",
        executionsNum: "执行次数，留空无限",
        missionPayload: "任务有效负载",
        inputPayload: "比如命令，文件名或其他参数等",
        dataError: "数据异常",
        createSuccess: "计划任务已创建成功，刷新任务列表可见信息",
        every: "每隔",
        on: "每",
        week: "星期",
        month: "月",
        day: "日",
    },
    fileManager: { 

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
    userResources: {
        userInfo: "用户信息",
        name: "名称",
        regTime: "注册时间",
        length: "拥有实例",
        resourceManage: "用户资源管理",
        userExcel: "用户资源表",
        userExcelInfo: "当前子用户可管理的所有实例，若实例状态显示“忙碌”代表此实例不存在或远程主机已经离线。",
        rentRisk: "出租安全风险",
        rentRiskInfo: '为确保您宿主机安全，您必须将任何运行的程序包含在 Docker 虚拟化容器中运行，否则您的用户将有可能入侵破坏宿主机。<br />建议您前往<a class="color-blue" href="https://docs.mcsmanager.com/" target="_blank" rel="noopener noreferrer">官方文档</a>了解更多',
        addInstance: "分配实例",
        saveData: "保存数据",
        daemon: "所属守护进程",
        addInstanceForUser: "为用户新增实例资源",
        addInstanceInfo: "利用远程主机地址与模糊查询来为此用户增加应用实例",
        select: "选择",
    },
    userDetail: {
        basicInfo: "基本信息",
        uuid: "唯一标识符",
        status: "账号状态",
        loginTime: "登录时间",
        api: "接口",
        attention: "注意事项",
        aboutName: "关于用户名",
        aboutNameInfo: "用户名仅可唯一存在，修改时面板会检查是否存在冲突，如果发现冲突则无法进行修改用户名，用户名请勿包含特殊字符或旧版本系统不兼容的文字。",
        aboutPasswd: "关于密码",
        aboutPasswdInfo: "账号密码请尽可能复杂化。请放心，面板管理员无法直接解读您的自定义密码，您的密码即使与其他网站密码有相似之处也不必过于担忧安全问题。",
        aboutApiKey: "关于 API 密钥",
        aboutApiKeyInfo: "适用于开发者使用的 API 密钥与账号密码登录拥有同等权限，重要程度与密码相同，请勿泄露。",
        updatePasswd: "更新密码",
        newPasswd: "新密码",
        newPasswdInfo: "长度必须 9 到 24 位，尽可能包含字母数字加符号组合方式",
        confirmNewPasswd: "确认新密码",
        keepOrigin: "保持原值",
        apiKey: "API 接口密钥",
        whatIsApiKey: "什么是 API 密钥？",
        apiKeyIs: "专供给开发者使用的同等权限密钥，可以为您的第三方程序提供充足的功能与可靠的稳定性。",
        disable: "未启用",
        createApiKey: "生成 API 密钥",
        disableApiKey: "关闭 API 接口",
        accountOk: "账号正常",
        changeThisInfo: "确定要更改此信息吗？",
        userDataUpdate: "用户数据已更新",
        apiKeyChangeSuccess: "API 操作更改成功",
        inputPasswd: "请输入密码值，若不输入则不进行密码修改",
        notStandard: "密码长度不规范，必须长度在 9 位到 36 位之间",
        notSame: "两次密码不一致",
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
            outerNet:
                "面板与守护进程端均要能够让用户访问，以此行为设计即可实现流量分流减轻中心面板端的压力。",
            whyOuterNet: "为什么必须使用外网 IP 连接远程节点",
            because:
                "为了减轻中心控制端（Web 面板端）的流量压力，我们必须将流量分流到各自的远程主机，<br />这样就必须保证每个远程主机均要能够使用外网访问，所以您也必须使用外网 IP 地址来访问这个主机的实例",
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
            onlyOne: "如果您只有一个主机，则可以无视此工作原理，按正常使用方式即可。"
        },

        delDaemonWarn: "此操作将永久删除该守护进程，是否继续？",
        inputNewRemark: "请输入新的备注内容",
        updateRemarkSuccess: "更新备注信息成功",
        inputNewKey: "请输入新密钥，设置后将自动尝试连接",
        key: "密钥"
    },
    container: {
        remoteList: "远程守护进程列表",
        status: "状态",
        imagesManage: "环境镜像管理",
        relevantInfo: "相关资料",
        links: [
            {
                title: "检查本地环境",
                info: "学习如何在系统上知晓您当前的一些常用运行时环境"
            },
            {
                title: "安装 Docker 软件",
                info: "学习如何在常见 Linux 发行版系统上安装 Docker 软件"
            }
        ]
    },
    imageManager: {
        remoteImageManage: "远程主机镜像管理",
        newImage: "新建镜像",
        needTime: "新建镜像可能需要一定时间。",
        remoteImageList: "远程主机镜像列表",
        remoteImageListInfo: "镜像构建与容器运行依赖于 Docker 软件，物理主机上所有守护进程将共享所有镜像。",
        storage: "占用空间",
        details: "详情",

        remoteContainerList: "远程主机容器列表",
        remoteContainerListInfo: "容器列表代表所有正在独立镜像环境运行的应用实例，此处列表不仅仅包括面板所启动的容器。",
        useImage: "使用镜像",
        status: "状态",
        situation: "情况",

        infoDetail: "信息详情",
        aboutDetail: "关于详情信息",
        aboutDetailInfo: "Docker 镜像与容器等详细信息建议由技术人员阅读，此处提供完整的 JSON 格式信息内容。",

        dataLoadError: "数据加载失败",
        tip: "提示",
        foreverDeleteImage: "此操作将永久删除该镜像, 是否继续?",
        sendDelCmd: "删除指令已发出",
        waitForDel: "请耐心等待，使用刷新功能加载列表，稍后此镜像预计将会被删除",
        delImageFailed: "删除镜像失败",
    },
    newImage: {
        createImage: "创建镜像",
        toImageList: "回到镜像列表",
        buildProgress: "构建进度",
        need10min: "新建镜像可能需要十几分钟，请耐心等待",
        whatIsImage: "什么是环境镜像？",
        whatIsImageInfo: "由于 Minecraft 或其他程序需要特定的运行环境，比如 Java/Python/.NET 等等，不同版本在同一台机器上安装管理十分复杂，使用不同的环境镜像可以很方便的管理不同版本不同类型的服务环境。",
        whatIsDocker: "什么是 Docker？为什么需要它？",
        whatIsDockerInfo: "Docker 是一款轻量级虚拟化软件，能够利用环境镜像来创建容器（就像一个盒子）包裹你的实际应用程序，让你的应用程序在一个虚拟的沙箱环境中运行，不论应用程序做任何恶意操作，都不会影响到宿主机的任何文件。",
        images: [
            {
                title: "创建 OpenJDK 8 环境镜像",
                info: "适用于需要 Java 8 的服务端软件，属于经典的 Java 运行时版本，适用于 Minecraft 1.17 以下的所有版本",
            },
            {
                title: "创建 OpenJDK 16 环境镜像",
                info: "内置 Java 16 运行时环境，适用于 Minecraft 1.17 版本的服务端",
            },
            {
                title: "创建 OpenJDK 17 环境镜像",
                info: "内置 Java 17 运行时环境，适用于 Minecraft 1.18 版本以上的服务端",
            },
            {
                title: "创建 Ubuntu 环境镜像",
                info: "适用于 MC 基岩版服务端运行环境或者其他 Linux 程序",
            },
            {
                title: "使用 DockerFile 自定义创建",
                info: "使用 DockerFile 自定义创建任何环境镜像，此操作建议技术人员进行",
            },
        ],
        aboutDockerFile: "关于 DockerFile 文件",
        referenceDoc: "官方参考文档：https://docs.docker.com/engine/reference/builder/",
        attention: "必须创建 /workspace 目录，此目录将自动挂载到实例的文件根目录",

        requireInput: "必填，请输入内容",
        afterCreate: "创建后的镜像名与版本标识",
        imageName: "[必填] 镜像名，如 openjdk",
        imageVer: "[必填] 镜像版本，如 1.0 1.1 latest",
        toSelectImage: "回到镜像选择",
        noData: "暂无数据",
        getProcess: "已获取最新构建进度",
        building: "正在构建...",
        buildError: "构建错误...",
        buildOk: "构建完毕",

        pleaseFinish: "请完成必填项目",
        buildTip: "此构建过程可能需要几分钟时间，请确保网络畅通，是否继续？",
        createTaskStart: "创建镜像任务已经开始",
        pleaseWait: "请耐心等待",
        createTaskError: "创建时失败",
    },
    settings: {
        setOperate: "配置操作",
        updateSet: "更新配置",
        updateSetInfo: "部分配置可能需要重启面板才能生效",

        basicSetting: "基础设置",
        accessPort: "面板访问端口",
        accessPortInfo: "浏览器访问网页面板的端口，必须防火墙放行此端口，重启面板生效。",
        inputNum: "请必须填入数字",

        bindIP: "面板绑定 IP",
        bindIPInfo: "一般情况请保持默认值，一般适用于多个 IP，网卡绑定的场景。",
        inputIP: "默认 0.0.0.0  I  默认情况无需填写",

        loginPage: "登录界面简单说明",
        loginPageInfo: "用于显示在登录界面公开简要说明文字，可以用于管理员身份介绍，备案信息介绍。",
        inputCopy: "请输入文案，例如：京ICP备00000001号",

        referenceLink: "相关参考链接",
        referenceLinksInfo:
            "面板的大部分设置十分重要，在一般情况下，绝大部分参数都无需更改，如果某个参数您并不知晓代表什么，那么建议您不要对其进行修改。",

        limitAndSecurity: "限制与安全",
        canFileManager: "准许普通用户使用文件管理功能",
        canFileManagerInfo:
            "文件管理是一个较为消耗资源且不易控制的功能，如果您的普通用户没有文件管理的任何需求，可以禁止用户使用文件管理。",

        crossAPI: "跨域请求 API 接口",
        crossAPIInfo:
            "HTTP 响应将会加入 access-control-allow-origin: *，可能会降低安全性，但是会提高开发扩展性。",
        loginCheckIp: "同 IP 登录次数限制",
        loginCheckIpInfo:
            "此功能将保护您的面板不被单个主机暴力破解密码，每个 IP 只有 10 次密码错误次数。",
        attention: "注意事项",
        attentionInfo:
            "这些配置设置需要一部分专业知识，您可以根据您的硬件设备来大概猜测哪些值适合您。<br />一般情况下，默认值可以满足个人日常的使用场景，如果规模一旦更大，对硬件的要求更高，为了不过分损失用户体验，一个合适的阈值是十分重要的。",

        about: "关于",
        aboutTitle:
            "软件根据<a target='black' href='https://github.com/MCSManager/MCSManager-Daemon/blob/master/LICENSE'>AGPL-3.0</a>开源软件协议发行",
        aboutTitleInfo:
            "此协议准许每个人都可以复制和分发代码副本，并且可以对使用者收取服务费用。<br />若对代码任何修改，则必须无偿提供软件的完整源代码下载。",
        closedSource: "闭源商业许可证",
        closedSourceInfo: "若您想二次开发并且闭源使用于任何活动（包括但不限于商业，个人）。",
        learnMore: "了解更多",
        userAgreement: "用户协议",
        sponsorList: "开源项目赞助名单",
        sponsorListInfo: "只含前 40 名赞助者，查看完整赞助名单或进行赞助支持请前往",

        settingUpdate: "已更新，部分选项生效可能需要重启面板"
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
        saveSuccess: "保存成功",
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
    },
    router: {
        panel: "控制面板",
        loading: "加载中",
        overview: "数据监控",
        home: "信息总览",
        instances: "应用实例",
        services: "守护进程管理",
        private: "个人信息",
        users: "用户管理",
        analysis: "面板数据分析",
        news: "更新与通知",
        container: "环境镜像",
        imageManager: "镜像管理",
        trigger: "面板触发器",
        extension: "面板扩展",
        settings: "面板设置",
        newImage: "创建镜像",
        terminal: "实例控制台",
        processConfigFile: "实例配置文件",
        processConfig: "实例特定配置",
        fileManager: "实例文件管理",
        fileManagerEditor: "实例文件编辑",
        instanceDetail: "实例配置详情",
        userResources: "用户资源",
        schedule: "计划任务",
        newInstance: "新增实例",
        login: "登录",
        quickStart: "快速开始",
        update: "版本控制",
        install: "安装",
    },
    aside: {
        basic: "基础功能",
        user: "用户中心",
        advanced: "高级功能",
        node: "节点管理",
    },
    businessWarning: {
        title: "商业出租风险警告",
        youMayWillBeHack: "您可能会被入侵！",
        warningInfo: '如果您在 <el-tag type="info" size="mini">Windows/Linux</el-tag> 下将实例分配给<b>陌生人</b> ，那么您的主机将随时可以被其他人通过上传恶意程序入侵主机。',
        hotToProtect: "如何保护我的主机？",
        protectInfo: '您的系统必须是<el-tag type="info" size="mini">Linux</el-tag>系统，并且安装了 Docker 软件，在实例设置界面右下角有<el-tag type="info" size="mini">进程启动方式</el-tag>选择框，请选择虚拟化容器方案，即可确保您的主机安全。<br /><b>虚拟化容器将可以让您的实例在一个虚拟的沙盒环境中运行</b>，您的子用户不管上传任何恶意程序，都将无法危害到其他人。',
    },
    cmdAssist: {
        java: "MC Java 版",
        javaPath: "Java 路径或环境变量",
        javaPathInfo: "若想指定具体的 Java 程序，可写绝对路径，如 C:\\ProgramFiles\\Java\\jdk-16.0.1\\bin\\java.exe",
        javaPathInput: "选填，默认使用 java 环境变量",
        programName: "服务端软件文件名",
        programNameInfo: "即您文件目录下存在的服务端软件名字，必须真实存在，如 Paper.jar，Server.jar",
        inputProgramName: "必填，一般是 jar 格式文件",
        xmx: "最大内存",
        xmxInfo: "Java 程序 -Xmx 参数，必须填写单位，如：1024M，2G 等",
        inputXmx: "选填，不填写则由 Java 自动管理",
        xms: "最小内存",
        xmsInfo: "Java 程序 -Xms 参数，必须填写单位，如：1024M，2G 等",
        additional: "附加参数",
        additionalInfo: "Java 程序 -jar 之前的附加参数，如 -server 等",
        inputAdditional: "选填，默认为空",
        suffix: "后缀参数",
        suffixInfo: "Java 程序 -jar 文件名 之后的附加参数，如 -nogui 等",
        generate: "生成命令",

        bds: "MC 基岩版",
        binaryFileName: "基岩版二进制执行文件名",
        inputBinaryFileName: "如 bedrock_server.exe (Windows) 或 bedrock_server (Linux)",
        summonWin: "生成适用于 Windows 的命令",
        summonLinux: "生成适用于 Linux 的命令",
        
        program: "通用控制台程序",
        programName2: "可执行程序文件名",
        programName2Info: "程序必须已经存在实例文件目录或环境变量中，如 cmd.exe，bash，program.exe 等",
        additionalInfo2: "此选项无具体参考，不同程序类型有不同参数，常见的格式如 -o -c --option 等，以空格分隔",
        inputAdditional2: "选填，默认不传递任何附加参数",
        noContent: "必填字段未填写内容",
        noLinuxBds: "因为 Linux 系统环境复杂多变，我们无法生成一个正确的启动命令，请手动编写启动命令",
    },
}