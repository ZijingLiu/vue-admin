<template>
  <div>
    <!-- 顶部控件 -->
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="label-wrapper category">
          <label>类型：</label>
          <div class="content-wrapper">
            <el-select v-model="categorysValue" placeholder="请选择">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrapper date">
          <label>日期：</label>
          <div class="content-wrapper">
            <el-date-picker
              v-model="datesValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="label-wrapper keyword">
          <label>关键字：</label>
          <div class="content-wrapper">
            <el-select v-model="categorysValue" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input v-model="searchBoxsInput" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" @click="dialogOpened = true">新增</el-button>
      </el-col>
    </el-row>
    <div class="gap"></div>
    <!-- 列表 -->
    <el-row>
      <el-col>
        <el-table :data="tablesData" border style="width: 100%">
          <el-table-column type="selection" width="45"></el-table-column>
          <el-table-column prop="title" label="标题" width="630"></el-table-column>
          <el-table-column prop="category" label="类型" width="130"></el-table-column>
          <el-table-column prop="date" label="日期" width="237"></el-table-column>
          <el-table-column prop="admin" label="管理员" width="115"></el-table-column>
          <el-table-column label="操作">
              <el-button size="small" type="success">编辑</el-button>
              <el-button size="small" type="danger" @click="deleteSingle">删除</el-button>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 底部控件 -->
    <div class="gap"></div>
    <el-row>
      <el-col :span="12">
        <button class="pull-left">批量删除</button>
      </el-col>
      <el-col :span="12">
        <el-pagination background layout="prev, pager, next" :total="1000"  class="pull-right"></el-pagination>
      </el-col>
    </el-row>
    <infoDialog :dialogOpenedValue="dialogOpened" @close="close"></infoDialog>
  </div>
</template>

<script>
import { warningBox } from "@/utils/global.js";
import infoDialog from "./dialog/infoDialog";
export default {
  data() {
    return {
      categorysValue: "",
      datesValue: "",
      searchBoxsInput: "",
      dialogOpened: false,
      categoryOptions: [
        {
          value: "选项1",
          label: "ID"
        },
        {
          value: "选项2",
          label: "ID2"
        }
      ],
      tablesData: [
        {
          title: "打发时间大富科技哈萨克来得及发看",
          category: "大赛的发",
          date: "2016-05-03",
          admin: "管理员"
        },
        {
          title: "打发时间大富科技哈萨克来得及发看",
          category: "大赛的发",
          date: "2016-05-03",
          admin: "管理员"
        },
        {
          title: "打发时间大富科技哈萨克来得及发看",
          category: "大赛的发",
          date: "2016-05-03",
          admin: "管理员"
        },
        {
          title: "打发时间大富科技哈萨克来得及发看",
          category: "大赛的发",
          date: "2016-05-03",
          admin: "管理员"
        }
      ]
    };
  },
  components: {
    infoDialog
  },
  methods: {
    close(val) {
      this.dialogOpened = val;
    },
    deleteSingle() {
      warningBox({
        warning: "即将删除此新闻，是否确认删除？",
        iconType: "warning"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.label-wrapper {
  &.category {
    @include label-wrapper(left, 60px, 40px, 60px);
  }
  &.date {
    @include label-wrapper(right, 93px, 40px, 94px);
  }
  &.keyword {
    @include label-wrapper(right, 80px, 40px, 80px);
  }
}
.gap{
  height: 30px;
  width: 100px;
}
</style>