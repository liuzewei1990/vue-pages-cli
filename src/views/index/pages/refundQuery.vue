<template>
  <section class="pad-10">
    <!-- <p>接口说明：此接口用于已交易订单退货订单查询</p>
    <p>使用说明：选择合适的订单编号类型进行查询。</p> -->
    <el-row :gutter="20">
        <el-col :span="12">
        <el-form ref="ruleForm" :inline="true">

            <el-form-item label="订单号类型">
            <el-radio-group v-model="orderType">
                <el-radio label="merOrderNo">接入方</el-radio>
                <el-radio label="plaOrderNo">系统</el-radio>
            </el-radio-group>
            </el-form-item>

            <el-form-item label="退货订单号" prop="amount">
            <el-input v-model="$store.state.lastUpdateRefundOrderNo" placeholder="请输入订单号"></el-input>
            </el-form-item>

            <el-form-item>
            <el-button type="primary" @click="refundQuery('ruleForm')" :loading="loading">退货查询</el-button>
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
            title: "交易退货",
        }
    },
    data() {
        return {
            loading: false,
            orderType: "merOrderNo",
            refundMerOrderNo: "",
            plaOrderNo: "",
            refundPlaOrderNo: "",
            result: "",
            res: {},
            order_info: {}
        }
    },
    methods: {

        refundQuery() {
            //公共域
            let params = { ...this.$store.state.publicParams };

            //服务
            params["service"] = "trade.refund.query";

            params[this.orderType] = this.$store.state.lastUpdateRefundOrderNo;

            params["signData"] = getSignData(params, this.$store.state.md5Key);

            this.loading = true;
            this.postJson(this.getUrl(), params).then(data => {
                this.res = data;
                this.loading = false;

                if (data.code === "00") {
                    let d = {};
                    d["系统订单号："] = data.plaOrderNo;
                    d["接入方订单号："] = data.merOrderNo;
                    d["退货时间："] = data.refundTime;
                    d["退货状态："] = dataJson.refundStatus[data.refundStatus];
                    d["退货金额："] = data.amount;
                    this.order_info = d;
                    this.$notify({
                        title: '退货查询',
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
