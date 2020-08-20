<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogSwitch"
      width="30%"
      :modal-append-to-body="false"
      @close="close()"
    >
      <el-form :model="form">
        <el-form-item label="类型：" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择活动区域">
            <el-option label="国内新闻" value="domestic"></el-option>
            <el-option label="国外新闻" value="forign"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="概况：" :label-width="formLabelWidth">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="内容：" :label-width="formLabelWidth">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="danger">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogSwitch: false,
      form: {
          category: '',
          desc: '',
          content: ''
        },
        formLabelWidth: '120px'
    };
  },
  props: {
    switchValue: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  methods: {
    close() {
      this.dialogSwitch = false;
      this.$emit("close", false);
    }
  },
  watch: {
    switchValue: function(val) {
      this.dialogSwitch = val;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>