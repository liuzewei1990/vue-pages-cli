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
          <el-button type="primary" @click="refund('ruleForm')" :loading="loading">退货</el-button>
        </el-form-item>
        
        <table>
            <tr v-if="result"><td>退货结果：：</td><td>{{result}}</td></tr>
            <tr v-if="refundMerOrderNo"><td>退货订单号：</td><td>{{refundMerOrderNo}}</td></tr>
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
            title: "交易退货",
        }
    },
    data() {
        return {
            orderType: "merOrderNo",
            refundMerOrderNo: "",
            plaOrderNo: "",
            refundPlaOrderNo: "",
            loading: false,
            result: "",
            res: {},
            order_info: {}
        }
    },
    methods: {
        refund() {

            //公共域
            let params = { ...this.$store.state.publicParams };

            //服务
            params["service"] = "trade.refund";

            //退货订单号
            params["refundMerOrderNo"] = randomDateNow(5);

            params[this.orderType] = this.$store.state.lastUpdateOrderNo;

            params["signData"] = getSignData(params, this.$store.state.md5Key);

            this.loading = true;
            this.postJson(this.getUrl(), params).then(data => {
                this.res = data;

                this.loading = false;
                this.result = data.msg;

                if (data.code === "00") {
                    this.refundMerOrderNo = params.refundMerOrderNo;
                    this.$store.commit("updateRefundOrderNo", this.refundMerOrderNo);
                    this.$notify({
                        title: '交易退货',
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
