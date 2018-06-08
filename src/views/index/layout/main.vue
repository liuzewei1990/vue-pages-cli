<template>
  <div>
    <div class="header">
    <el-alert v-if="$store.state.dev == 'true'"
      title="开发模式已开启"
      @close="$store.state.dev = 'false'"
      type="warning">
    </el-alert>
			<div class="container">
          <el-row :gutter="20">
          <el-col :span="6">
            <div class="title">
            <img :src="require('src/assets/img/logo.png')" alt="" class="logo">
            <span>聚合支付测试</span>
            </div>
          </el-col>
          <el-col :span="14">
            <table class="martop25">
                <tr>
                  <td>接口地址：</td>
                  <td><input type="text" v-model="$store.state.url" class="border url" style="width:400px;background:#FFF;"></td>
                  <td>
                    <el-dropdown @visible-change="visibleChange">
                      <span class="el-dropdown-link">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in urls" :key="index">
                          <span @click="$store.state.url = item">{{item}}</span>
                          <span class="el-icon-error" @click.stop="removeUrl(index,visibleChange)"></span>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </td>
                </tr>
            </table>
          </el-col>
          </el-row>

      </div>
    </div>
    <div class="container">
      <div class="martop20"></div>
      <table>
        <tr>
          <td> 商户号：</td>
          <td><input type="text" v-model="$store.state.publicParams.customerNo" class="border"></td>
          <td> 机构号：</td>
          <td><input type="text" v-model="$store.state.publicParams.companyNo" class="border"></td>
          <td>机构密钥：</td>
          <td><input type="text" v-model="$store.state.md5Key" class="border"></td>
        </tr>
      </table>
      
      <div class="martop20"></div>
      <!-- <el-row :gutter="20">
        <el-col>
          <el-form ref="ruleForm" :inline="true">
            <el-form-item label="接口地址">
              <el-input v-model="$store.state.url" placeholder="请输入接口地址"></el-input>
            </el-form-item>
            <el-form-item label="商户号">
              <el-input v-model="$store.state.publicParams.customerNo" placeholder="请输入商户号"></el-input>
            </el-form-item>
            <el-form-item label="机构号">
              <el-input v-model="$store.state.publicParams.companyNo" placeholder="请输入机构号"></el-input>
            </el-form-item>
            <el-form-item label="机构密钥">
              <el-input v-model="$store.state.md5Key" placeholder="请输入机构密钥"></el-input>
            </el-form-item>
          </el-form>
        </el-col> 
      </el-row> -->

      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="消费者主扫" name="/scanPay">
          <keep-alive>
              <router-view ></router-view>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="快捷支付" name="/initQuickPay">
          <keep-alive>
              <router-view ></router-view>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="H5支付" name="/h5Pay">
          <keep-alive>
              <router-view ></router-view>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="交易查询" name="/query">
          <keep-alive>
              <router-view ></router-view>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="交易退货" name="/refund">
          <keep-alive>
              <router-view ></router-view>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="退货查询" name="/refundQuery">
          <keep-alive>
              <router-view ></router-view>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>


      <!-- <div>Footer</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: this.$route.path,
      urls: []
    }
  },
  mounted() {
    console.log()
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push(this.activeName)
    },
    visibleChange(v) {
      this.urls = this.getUrls();
    }
  }
}
</script>

<style lang="less" scoped>
.router-link-exact-active {
  color: #555;
  cursor: default;
  background-color: #fff;
  border: 1px solid #ddd;
  border-bottom-color: transparent;
}
.header {
  position: relative;
  background-color: #f3f3f3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), inset 0 -1px 0 0 #fcfcfc;
  -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), inset 0 -1px 0 0 #fcfcfc;
  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), inset 0 -1px 0 0 #fcfcfc;
  border-top: 4px solid #67ad03;
  border-bottom: 1px solid #bdbdbd;

  .title {
    display: flex;
    align-items: center;
    margin: 15px 0;
    font-size: 20px;
  }

  .logo {
    width: 50px;
    margin-right: 10px;
  }
}

.border {
  border: 1px solid #e7e7e7;
  // width: 100px;
  padding: 2px;
}
</style>
