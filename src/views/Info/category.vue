<template>
  <div>
    <div class="addCategory">
      <el-button type="danger" size="medium" @click="activateFirstClassInput">添加一级菜单</el-button>
    </div>
    <div>
      <el-row :gutter="30" class="categoryList">
        <el-col :span="8">
          <div class="listWrapper" v-for="firstClass in category.item" :key="firstClass.index">
            <h4>
              <svg-icon icon-class="minus" className=""></svg-icon>
              {{firstClass.category_name}}
              <div class="button-group">
                <el-button
                  size="mini"
                  type="danger"
                  round
                  @click="activateEditFirstCategory(firstClass)"
                >编辑</el-button>
                <el-button size="mini" type="success" round>添加子级</el-button>
                <el-button size="mini" round @click="activateDeleteWarning(firstClass.id)">删除</el-button>
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
              <el-form-item label="一级分类名称：" v-if="firstClassInputShown">
                <el-input v-model="form.firstClass" :disabled="firstCategoryDisable"></el-input>
              </el-form-item>
              <div class="gap"></div>
              <el-form-item label="二级分类名称：" v-if="secondClassInputShown">
                <el-input v-model="form.secondClass" :disabled="secondCategoryDisable"></el-input>
              </el-form-item>
            </el-form>
            <div class="gap"></div>
            <el-button type="danger" @click="submit()" :disabled="submitDisable">确定</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  addFirstClassReq,
  getCategoryListReq,
  deleteFirstCategoryReq,
  editFirstCategoryReq
} from "@/api/info.js";
import { warningBox } from "@/utils/global.js";

export default {
  data() {
    return {
      labelPosition: "right",
      firstClassInputShown: true,
      secondClassInputShown: true,
      firstCategoryDisable: true,
      secondCategoryDisable: true,
      submitDisable: true,
      submitType: "",
      categoryId: "",
      categoryName: "",
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
    /**
     * 激活一级分类输入框
     */
    activateFirstClassInput() {
      this.submitType = "addFirstCategory";
      this.secondClassInputShown = false;
      this.firstCategoryDisable = false;
      this.submitDisable = false;
    },
    /**
     * 提交
     */
    submit() {
      if (this.submitType == "addFirstCategory") {
        let categoryName = {
          categoryName: this.form.firstClass
        };
        addFirstClassReq(categoryName)
          .then(res => {
            let statusCode = res.data.resCode;
            let newCategory = res.data.data.category_name;
            if (statusCode === 0) {
              this.category.item.push({ category_name: newCategory });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (this.submitType == "addSecondCategory") {
      }
      
      if (this.submitType == "editFirstCategory") {
        this.categoryName = this.form.firstClass;
        editFirstCategoryReq({
          id: this.categoryId,
          categoryName: this.categoryName
        }).then(res => {
          let index = this.category.item.findIndex(item => item.id == this.categoryId);
          this.category.item[index].category_name = res.data.data.data.categoryName;
        })
        .catch(err => console.log(err));
      }
    },
    /**
     * 激活删除警告框
     */
    activateDeleteWarning(id) {
      warningBox({
        warning: "是否确认删除？",
        iconType: "warning",
        fn: this.deleteFirstCategory,
        id: id
      });
    },
    /**
     * 删除一级分类
     */
    deleteFirstCategory(id) {
      deleteFirstCategoryReq({
        categoryId: id
      }).then(res => {
        let index = this.category.item.findIndex((currentItem, index) => {
          return currentItem.id == id;
        });
        this.category.item.splice(index, 1);
      });
    },
    /**
     * 激活编辑一级分类
     */
    activateEditFirstCategory(data) {
      this.categoryId = data.id;
      this.categoryName = data.category_name;
      this.form.firstClass = data.category_name;
      this.activateFirstClassInput();
      this.submitType = "editFirstCategory";
    }
  },
  mounted() {
    getCategoryListReq({})
      .then(res => {
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