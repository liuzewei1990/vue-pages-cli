<template>
  <section class="pad-10">
  <el-row :gutter="20">
    
    <el-col :span="10">
      <el-form :model="params" ref="ruleForm" label-width="100px" :rules="rules" >
        <el-form-item label="支付类型">
          <el-radio-group v-model="params.payType">
            <el-radio label="WECHAT">微信</el-radio>
            <el-radio label="ALIPAY">支付宝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="交易金额" prop="amount">
          <el-input v-model="params.amount" placeholder="请输入金额（单位分）"></el-input>
        </el-form-item>
        <el-form-item label="交易内容" prop="subject">
          <el-input v-model="params.subject" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPayQrCode('ruleForm')" :loading="loading">二维码支付</el-button>
        </el-form-item>
      </el-form>
<!-- <pre v-show="res.code">
{{JSON.stringify(res,null,4)}}
</pre> -->
    </el-col>
    <el-col :span="2">
      <br>
    </el-col>
      
    <el-col :span="8" v-if="src">
      <el-card shadow="never" :body-style="{ padding: '0px',textAlign:'center' }">
        <img :src="src" alt="...">
        <div style="padding: 14px;">
          <span>扫一扫支付</span>
        </div>
      </el-card>
    </el-col>
    
  </el-row>
  </section>
</template>

<script>
import QRCode from "qrcode";
import { randomDateNow, getSignData } from "src/common/utils";

export default {
  // layout: "payLayout",
  components: {
  },
  head() {
    return {
      title: "消费者主扫",
      meta: [
        { hid: 'description', name: 'description', content: '我是支付页面描述' }
      ]
    }
  },
  data() {
    return {
      loading: false,
      service: "trade.scanPay",
      src: "",
      merOrderNo: "",
      res: {},
      params: {
        payType: "WECHAT",
        amount: "",
        subject: "交易测试"
      },
      rules: {
        amount: [
          { required: true, message: '请输入金额' }
        ],
        subject: [
          { required: true, message: '请输入描述' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    createQrcode(url) {
      if (url)
        QRCode.toDataURL(url, { width: 250, }).then(qrcode => {
          this.src = qrcode;
        })
    },
    getPayQrCode(formName) {
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
      params["service"] = this.service;

      //交易订单号
      params["merOrderNo"] = randomDateNow(5);

      //私有域
      params["payType"] = this.params.payType;
      params["amount"] = this.params.amount;
      params["subject"] = this.params.subject;
      params["notifyUrl"] = "http://www.yeepiao.com";

      //可选
      // params["desc"] = "扫码";
      // params["realIp"] = "127.0.0.1";
      // params["latLong"] = "38.6518,104.07642";
      // params["operatorId"] = "OPER001";
      // params["storeId"] = "STORE001";
      // params["terminalId"] = "TERM001";
      // params["productId"] = "PROD001";


      params["signData"] = getSignData(params, this.$store.state.md5Key);
      console.log(params);
      // params["url"] = this.$store.state.url;

      this.loading = true;
      this.postJson(this.getUrl(), params).then(data => {
        this.loading = false;
        this.res = data;

        if (data.code === "00") {
          this.createQrcode(data.qrCode);
          this.merOrderNo = data.merOrderNo;
          this.$store.commit("updateOrderNo", data.merOrderNo);
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
    }
  }
}
</script>

<style scoped>
.qr {
  text-align: center;
}
.qr img {
  display: block;
  width: 200px;
  margin: 0 auto;
}

.qr span {
  line-height: 40px;
}

pre {
  margin-left: 30px;
}
</style>
