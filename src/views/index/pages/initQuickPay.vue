<template>
  <section class="pad-10">
  <el-row :gutter="0">
    <p class="color_red">提示：快捷支付暂不支持退款！</p>
    <p class="martop10"></p>

    <el-col :span="10">
      
      <el-form v-show="tabType == 1" :model="params" ref="ruleForm" label-width="100px" :rules="rules" >
        <el-form-item label="支付类型">
          <el-radio-group v-model="params.cardType">
            <el-radio label="01">信用卡</el-radio>
            <el-radio label="02">借记卡</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="交易金额" prop="amount">
          <el-input v-model="params.amount" placeholder="请输入金额（单位分）"></el-input>
        </el-form-item>
        <el-form-item label="交易内容" prop="subject">
          <el-input v-model="params.subject" placeholder="请输入描述"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="idName">
          <el-input v-model="params.idName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNo">
          <el-input v-model="params.idNo" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="预留手机号" prop="phoneNo">
          <el-input v-model="params.phoneNo" placeholder="请输入预留手机号"></el-input>
        </el-form-item>
        <el-form-item label="卡号" prop="cardNo">
          <el-input v-model="params.cardNo" placeholder="请输入卡号"></el-input>
        </el-form-item>
        <el-form-item label="有效期" prop="expDt">
          <el-input v-model="params.expDt" placeholder="请输入银行卡背面有效期，例如：0428"></el-input>
        </el-form-item>
        <el-form-item label="CVN2" prop="cvn2" v-show="params.cardType == '01'">
          <el-input v-model="params.cvn2" placeholder="请输入CVN2"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="initQuickPay('ruleForm')" :loading="loading">发起支付</el-button>
        </el-form-item>
      </el-form>

      <el-form v-show="tabType == 2" ref="ruleForm2" label-width="80px" >

        <el-form-item label="验证码" prop="token">
          <el-input v-model="token" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd" v-show="params.cardType != '01'">
          <el-input v-model="pwd" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="quickPay('ruleForm2')" :loading="loading">支付</el-button>
          <el-button type="primary" @click="tabType=1">取消</el-button>
        </el-form-item>
      </el-form>

    </el-col>

    <el-col :span="10" class="center">
      <div class="pre-box">
<!-- <pre v-show="res.code">
{{JSON.stringify(res,null,4)}}
</pre> -->
      </div>
    </el-col>

  </el-row>
  </section>
</template>

<script>

import { randomDateNow, getSignData } from "src/common/utils";
import { setTimeout } from 'timers';

export default {
  // layout: "payLayout",
  components: {
  },
  head() {
    return {
      title: "快捷支付",
    }
  },
  mounted() {

  },
  data() {
    return {
      loading: false,
      tabType: 1,
      plaOrderNo: "",//用于支付确认的系统订单
      token: "",
      pwd: "",
      res: {
      },
      params: {
        payType: "QUICK_PAY",
        amount: "",
        subject: "交易测试",
        desc: "",
        cardNo: "",
        idName: "",
        idNo: "",
        phoneNo: "",
        cardType: "01",
        expDt: "",
        cvn2: "",
        notifyUrl: "http://www.yeepiao.com"
      },
      rules: {
        amount: [
          { required: true, message: '请输入金额' }
        ],
        subject: [
          { required: true, message: '请输入内容' }
        ],
        desc: [
          { required: true, message: '请输入描述' }
        ],
        cardNo: [
          { required: true, message: '请输入卡号' }
        ],
        idName: [
          { required: true, message: '请输入姓名' }
        ],
        idNo: [
          { required: true, message: '请输入有效身份证号码' }
        ],
        phoneNo: [
          { required: true, message: '请输入预留手机号' }
        ],
        expDt: [
          { required: true, message: '请输入卡的有效期' }
        ]
      }
    }
  },
  serverCacheKey() {
    // Will change every 10 secondes
    return Math.floor(Date.now() / 10000)
  },

  methods: {
    initQuickPay(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submit() {
      //公共域
      let params = { ...this.$store.state.publicParams };

      //服务
      params["service"] = "trade.initQuickPay";

      //交易订单号
      params["merOrderNo"] = randomDateNow(5);

      params = { ...params, ...this.params };

      params["signData"] = getSignData(params, this.$store.state.md5Key);
      console.log(params);
      // return;
      this.loading = true;
      this.postJson(this.getUrl(), params).then(data => {
        this.loading = false;
        this.res = data;
        if (data.code === "00") {
          this.tabType = 2;
          this.plaOrderNo = data.plaOrderNo;
          this.$store.commit("updateOrderNo", params.merOrderNo);
          this.$notify({
            title: '消费者主扫',
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
    },

    quickPay() {
      if (!this.plaOrderNo) {
        alert("请先下单！");
        return;
      }
      //公共域
      let params = { ...this.$store.state.publicParams };

      //服务
      params["service"] = "trade.quickPay";

      params["plaOrderNo"] = this.plaOrderNo;
      params["token"] = this.token;
      params["pwd"] = this.pwd;

      params["signData"] = getSignData(params, this.$store.state.md5Key);
      this.loading = true;
      this.postJson(this.getUrl(), params).then(data => {
        this.res = data;
        this.loading = false;
        this.$message(data.msg);
      })

    }
  }
}
</script>

<style lang="less" scoped>
.pre-box {
  max-width: 500px;
  // border: 1px solid red;
  // overflow-x: scroll;
  margin: 0px 50px;
}
</style>
