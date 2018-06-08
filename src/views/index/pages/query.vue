<template>
  <section class="pad-10">
  <el-row :gutter="20">
    <el-col :span="10">
      <el-form ref="ruleForm" :inline="true">

        <el-form-item label="订单号类型">
          <el-radio-group v-model="orderType">
            <el-radio label="merOrderNo">接入方</el-radio>
            <el-radio label="plaOrderNo">系统</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="订单号" prop="amount">
          <el-input v-model="$store.state.lastUpdateOrderNo" placeholder="请输入订单号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="query('ruleForm')" :loading="loading">查询</el-button>
        </el-form-item>
        
        <table>
            <tr v-for="(item,key,index) in order_info" :key="index"><td>{{key}}：</td><td>{{item}}</td></tr>
        </table>
      </el-form>

    </el-col>
    <el-col :span="8">
        <br>
    </el-col> 
    <el-col :span="8">
<!-- <pre v-show="res.code">
{{JSON.stringify(res,null,4)}}
</pre> -->
    </el-col>     
  </el-row>
  </section>
</template>

<script>
import { randomDateNow, getSignData } from "src/common/utils";
import dataJson from "src/worddata/trade.json";
export default {
    // layout: "payLayout",
    components: {
    },
    head() {
        return {
            title: "交易查询",
        }
    },
    data() {
        return {
            service: "trade.query",
            orderType: "merOrderNo",
            loading: false,
            res: {},
            order_info: {
                // "系统订单号": "",
                // "交易状态": "",
                // "交易金额": "",
                // "结算类型": "",
                // "接入方订单号": "",
                // "操作员编号": "",
                // "店铺编号": "",
                // "终端编号": "",
                // "购方ID": "",
            }
        }
    },
    methods: {
        query() {

            //公共域
            let params = { ...this.$store.state.publicParams };
            //服务
            params["service"] = this.service;

            params[this.orderType] = this.$store.state.lastUpdateOrderNo;

            params["signData"] = getSignData(params, this.$store.state.md5Key);

            this.loading = true;
            this.postJson(this.getUrl(), params).then(data => {
                this.loading = false;
                this.res = data;

                this.order_info = {};
                if (data.code === "00") {
                    let d = {};
                    d["交易状态"] = dataJson.tradeStatus[data.tradeStatus];
                    d["系统订单号"] = data.plaOrderNo;
                    d["接入方订单号"] = data.merOrderNo;
                    d["交易金额（分）"] = data.amount + "";
                    d["结算类型"] = data.settleType;
                    // d["操作员编号"] = data.operatorId;
                    // d["店铺编号"] = data.storeId;
                    // d["终端编号"] = data.terminalId;
                    d["购方ID"] = data.buyerId;

                    this.order_info = d;
                    this.$notify({
                        title: '交易查询',
                        dangerouslyUseHTMLString: true,
                        customClass: "customClass",
                        message: `<div>
<pre v-show="res.code">
${JSON.stringify(data, null, 4)}
</pre>
                    </div>`,
                        duration: 0
                    });
                } else {
                    this.$message(data.msg);
                }
            })
        }
    }
}
</script>

<style scoped>
</style>
