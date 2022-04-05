
<template>
  <Panel class="file-tree">

    <template #title>文件列表</template>
    <template #default>

      <div style="position: absolute;height: 94%;width: 94%;overflow: hidden">

        <el-scrollbar>

          <el-tree :current-node-key="$route.query.target" highlight-current ref="tree" :props="tree.props" :load="loadNode" lazy @node-click="handleFileTreeClick" />

        </el-scrollbar>

      </div>

    </template>

  </Panel>
  <Panel class="file-editor" @keydown="handleKeyDown">
    <template #title>编辑文件 {{ target }}</template>
    <template #default>
      <div class="instance-table-warpper">
        <div>
          <ItemGroup>
            <el-button size="small" @click="back" v-if="!backType" type="primary">
              <i class="el-icon-pie-chart"></i> 返回
            </el-button>
            <el-button size="small" @click="refresh">
              <i class="el-icon-refresh"></i> 刷新
            </el-button>
            <el-button size="small" type="success" @click="saveFile" :disabled="edit.originText === edit.text">
              <i class="el-icon-refresh"></i> 保存
            </el-button>
            <!-- <el-button size="small" @click="backTerminal" plain v-if="backType == 1">
              回到控制台
            </el-button> -->
          </ItemGroup>
        </div>
        <div>
          <el-button size="small" @click="backViaHistory" type="primary" plain v-if="backType == 1">
            回到简单编辑视图
          </el-button>
        </div>
      </div>
      <div v-show="!error" style="overflow: auto">
        <!-- <textarea :value="value" id="mcode-editor" style="display:none"></textarea> -->
        <div id="editor" style="height: 75vh" class="editor-code-font"></div>
      </div>
      <div v-show="error" style="padding: 16px 0px">
        <el-alert title="编辑文件错误" type="error" :description="error" show-icon></el-alert>
      </div>
    </template>
  </Panel>
</template>
<script>
import Panel from "../../components/Panel";
import { API_FILE_LIST, API_FILE_URL } from "../service/common";
import path from "path";
import { request } from "../service/protocol";
import { inject } from 'vue'

export default {
  inject: ['reload'],
  components: { Panel },
  data() {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      target: this.$route.query.target,
      backType: this.$route.query.backType,
      error: null,
      // 文件编辑功能
      edit: {
        originText: "",
        text: "",
        fileName: this.$route.query.target
      },
      editor: null,
      reload: null,

      tree: {

        // data: [],
        props: {
          label: 'name',
          children: 'children',
          isLeaf: 'type',
        },

        height: '100%',

      }
    };
  },
  async mounted() {
    await this.render();
    this.editor = window.ace.edit("editor");
    this.editor.setTheme("ace/theme/twilight");
    this.editor.getSession().on('change', (e) => {

      this.handleEditorChange(e)

    });
    const extName = path.extname(this.target);
    if (extName === ".js") this.editor.session.setMode("ace/mode/javascript");
    if (extName === ".json") this.editor.session.setMode("ace/mode/json");
    if (extName === ".yml" || extName === ".yaml") this.editor.session.setMode("ace/mode/yaml");
    if (extName === ".ini") this.editor.session.setMode("ace/mode/ini");
    if (extName === ".java") this.editor.session.setMode("ace/mode/java");
    if (extName === ".css") this.editor.session.setMode("ace/mode/css");
    if (extName === ".html") this.editor.session.setMode("ace/mode/html");
    if (extName === ".properties") this.editor.session.setMode("ace/mode/properties");
    if (extName === ".py") this.editor.session.setMode("ace/mode/python");
    if (extName === ".txt") this.editor.session.setMode("ace/mode/text");
    if (extName === ".bat") this.editor.session.setMode("ace/mode/batchfile");
    if (extName === ".sh") this.editor.session.setMode("ace/mode/sh");
    if (extName === ".c" || extName === ".cpp") this.editor.session.setMode("ace/mode/c_cpp");

    if( this.edit.text.length > 0 ) {

      this.editor.setValue(this.edit.text);
      this.edit.originText = this.edit.text;

    }

    this.reload = inject('reload')

    this.tree.height = this.$refs.tree.clientHeight
  },
  methods: {
    async handleFileTreeClick( node, attr ) {

      if( node.type === 0 ) return

      let target = path.join(this.target, '../')

      let parent = attr.parent

      while( parent && parent.data.type === 0 ) {

        target = path.join(target, parent.data.name)

        parent = parent.parent

      }

      target = path.join(target, node.name)

      if( this.target === target ) {

        // 试图切换到当前已经打开的文件
        return this.$message.error('当前文件已经打开')

      }

      const openFile = async() => {

        await this.$router.push({
          path: `/file_editor/${this.serviceUuid}/${this.instanceUuid}/`,
          query: {
            target: path.normalize(target)
          }
        });

        location.reload()
        // this.reload()

      }

      if( !this.edit.originText === this.edit.text ) {

        // 未保存 提示用户
        this.$confirm('当前文件未保存，是否保存？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

          await this.saveFile()

          await openFile()

        }).catch(() => {

          openFile()

        })

      } else await openFile()

    },
    async loadNode( node, resolve ) {

      if( node.id !== 0 && node?.data.type !== 0 ) {

        return resolve( [] )

      }

      let target = path.join(this.$route.query.target, '../')

      let parent = node.parent

      while( parent && parent.data.type === 0 ) {

        target = path.join(target, parent.data.name)

        parent = parent.parent

      }

      if( node?.data?.name ) {

        target = path.join(target, node.data.name)

      }

      const data = [ ...await this.list( path.normalize(target) ) ]

      resolve( data )

    },
    // 目录 List 功能
    async list(cwd = ".") {
      this.$route.query.path = cwd;
      const data = await request({
        method: "GET",
        url: API_FILE_LIST,
        params: {
          remote_uuid: this.serviceUuid,
          uuid: this.instanceUuid,
          target: cwd
        }
      });
      return data
    },
    handleKeyDown( event ) {

      // Ctrl + S 保存
      if( event.ctrlKey && event.keyCode === 83 ) {

        event.preventDefault();

        this.saveFile();

      }

    },
    async refresh() {
      await this.render();
      this.$message({ message: "已刷新", type: "success" });
    },
    async backTerminal() {
      this.$router.push({
        path: `/terminal/${this.serviceUuid}/${this.instanceUuid}/`
      });
    },
    async back() {
      this.$router.push({
        path: `/file/${this.serviceUuid}/${this.instanceUuid}/`,
        query: {
          path: path.dirname(this.target)
        }
      });
    },
    handleEditorChange(e) {

      this.edit.text = this.editor.getSession().getValue()

      console.log( e )

    },
    backViaHistory() {
      this.$router.go(-1);
    },
    // 编辑文件
    async render() {
      try {
        const text = await request({
          method: "PUT",
          url: API_FILE_URL,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          },
          data: {
            target: this.target
          }
        });
        this.edit.text = text;
        this.edit.isOpenEdit = true;
        this.edit.fileName = this.target;
        if (this.editor) this.editor.setValue(this.edit.text);
      } catch (error) {
        this.error = error.message;
      }
    },

    // 保存文件
    async saveFile() {

      if( this.edit.originText === this.edit.text ) return

      this.edit.originText = this.edit.text

      this.edit.text = this.editor.getValue();
      await request({
        method: "PUT",
        url: API_FILE_URL,
        params: {
          remote_uuid: this.serviceUuid,
          uuid: this.instanceUuid
        },
        data: {
          text: this.edit.text,
          target: this.target
        }
      });
      this.$message({ message: "更新文本成功", type: "success" });
    }
  }
};
</script>

<style scoped>
.file-tree {

  position: relative;
  display: inline-block;

  width: 20%;
  height: 90%;

}
.file-editor {

  position: relative;
  display: inline-block;

  width: 79%;
  height: 90%;

  left: 1%;

}
@media screen and (max-width:860px){
  .file-tree{ display:none; }
  .file-editor {

    display: block;

    width: 100%;
    left: 0;

  }
}
.editor-code-font {
  font-family: "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", "Droid Sans Mono",
    monospace;
  font-size: 12px;
  white-space: pre-wrap;
}
</style>
