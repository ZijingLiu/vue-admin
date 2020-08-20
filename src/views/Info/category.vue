<template>
  <div>
    <div class="addCategory">
      <el-button type="danger" size="medium" @click="activateAddingFirstClass">添加一级菜单</el-button>
    </div>
    <div>
      <el-row :gutter="30" class="categoryList">
        <el-col :span="8">
          <div class="listWrapper" v-for="firstClass in category.item" :key="firstClass.index">
            <h4>
              <svg-icon icon-class="minus" className=""></svg-icon>
              {{firstClass.category_name}}
              <div class="button-group">
                <el-button size="mini" type="danger" round>编辑</el-button>
                <el-button size="mini" type="success" round>添加子级</el-button>
                <el-button size="mini" round>删除</el-button>
              </div>
            </h4>
            <ul v-if="firstClass.children">
              <li v-for="secondClass in firstClass.children" :key="secondClass.id">
                {{secondClass.category_name}}
                <div class="button-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16" class="editField">
          <h4>一级分类编辑</h4>
          <div class="gap"></div>
          <div class="fieldWrapper">
            <el-form
              :label-position="labelPosition"
              label-width="120px"
              ref="ruleForm"
              :model="form"
            >
              <el-form-item label="一级分类名称：" v-if="showFirstClassInput">
                <el-input v-model="form.firstClass"></el-input>
              </el-form-item>
              <div class="gap"></div>
              <el-form-item label="二级分类名称：" v-if="showSecondClassInput">
                <el-input v-model="form.secondClass"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="submit" :loading="submit_loading">确定</el-button>
              </el-form-item>
            </el-form>
            <div class="gap"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { addFirstClass, getCategoryList } from "@/api/info.js";

export default {
  data() {
    return {
      labelPosition: "right",
      showFirstClassInput: true,
      showSecondClassInput: true,
      submit_loading: false,
      form: {
        firstClass: "",
        secondClass: ""
      },
      category: {
        item: []
      }
    };
  },
  methods: {
    activateAddingFirstClass() {
      this.showSecondClassInput = false;
    },
    submit() {
      this.submit_loading = true;
      let categoryName = {
        categoryName: this.form.firstClass
      };
      this.$refs["ruleForm"].resetFields();
      addFirstClass(categoryName)
        .then(res => {
          let statusCode = res.data.resCode;
          let newCategory = res.data.data.category_name;
          if (statusCode === 0) {
            this.category.item.push({ category_name: newCategory });
          }
          this.submit_loading = false;
        })
        .catch(err => {
          console.log(err);
          this.submit_loading = false;
        });
    }
  },
  mounted() {
    getCategoryList({})
      .then(res => {
        console.log(res.data.data);
        this.category.item = res.data.data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style lang="scss" scoped>
.addCategory {
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid #000;
  margin-bottom: 40px;
}
.categoryList {
  line-height: 44px;
  position: relative;
  h4 {
    position: relative;
    padding-left: 40px;
    svg {
      position: absolute;
      top: 9px;
      left: 9px;
      cursor: pointer;
    }
  }
  li {
    position: relative;
    margin-left: 20px;
    padding-left: 40px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 20px;
      width: 32px;
      border-bottom: 1px dotted black;
    }
    &:after {
      content: "";
      position: absolute;
      left: 0px;
      top: 0px;
      bottom: 0px;
      border-left: 1px dotted black;
    }
  }
  li:first-child {
    &:after {
      top: -16px;
    }
  }
  li:last-child {
    &:after {
      bottom: 24px;
    }
  }
  li,
  h4 {
    &:hover {
      background-color: #ccc;
      .button-group {
        display: block;
      }
    }
  }
  .button-group {
    display: none;
    position: absolute;
    top: -2px;
    right: 40px;
  }
}
.editField {
  .fieldWrapper {
    width: 50%;
    margin: auto;
  }
  h4 {
    background-color: #ccc;
  }
}
.gap {
  height: 30px;
  width: 100px;
}
</style>