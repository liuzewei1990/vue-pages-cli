<template>
  <div class="Keyboard-box" :class="{fixed:fixed,show:show}">
    <div class="numbers">
      <button class="_av" 
      v-for="(item,index) in numbers" 
      :key="index" 
      :class="{full:item.full}" 
      @touchend="handleNumber($event,item)"
      type="button">{{item.name}}</button>
    </div>
    <div class="btns">
      <button @touchstart="touchstart($event)" @touchend="touchend" class="delete _av" type="button">delete</button>
      <button @click="confirm" class="pay-btn" :class="{disable:payDisable}" type="button">确认<br/>支付</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    maxMoney: {
      type: Number,
      default: 100000
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      numbers: [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
        { name: "6" },
        { name: "7" },
        { name: "8" },
        { name: "9" },
        { name: "0", full: true },
        { name: "." },
      ],
      values: [],
      btnDisable: false,
      payDisable: false,
      show: false
    }
  },
  mounted() {
    this.values = String(this.value).split("");
  },
  watch: {
    value(val) {
      this.values = String(val).split("");
    },
    values(arr) {
      let money = arr.join("");
      this.$emit("input", this.isMoneyRule(money));
    }
  },
  methods: {
    handleNumber(e, item) {
      e.preventDefault();
      let number = item.name;
      if (this.btnDisable) return; //如果禁用了 禁止push
      if (number === "." && this.values.indexOf(number) !== -1) return;//处理有多个小数点的情况 禁止push
      if (Number(this.values.join("") + number) > this.maxMoney) return;//处理最大金额 禁止push
      if (this.values.join("") === "0") this.handleDelete();//处理首位纯为0的情况 循环删除 同时解决输入两个0 和 0和任意数字 的情况
      this.values.push(number);
    },
    isMoneyRule(money) {
      if (money === '.') this.values.unshift("0") //处理首字母为 . 的情况 改为 0.
      this.payDisable = !Boolean(Number(money)) //处理没有输入金额的情况 禁用支付按钮 0 或 0.0 或 0.00的情况
      this.btnDisable = (money.split(".")[1] || "").length >= 2; //处理小数点【>=】两位的情况 禁用键盘
      // let floatlast = money.split(".")[1];
      // floatlast && (this.btnDisable = floatlast.length >= 2);//处理小数点【>=】两位的情况 禁用键盘
      return money;
    },
    handleDelete() {
      this.values.pop();
    },
    touchstart(e) {
      this.timeOutEvent = setTimeout(this.longPress, 500);
      e.preventDefault();
    },
    touchmove() {
      clearTimeout(this.timeOutEvent);
      this.timeOutEvent = 0;
    },
    touchend() {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0) {
        this.handleDelete();
      }
      return false;
    },
    longPress() {
      this.timeOutEvent = setInterval(() => {
        this.handleDelete();
      }, 100)
    },
    confirm() {
      this.payDisable || this.$emit('confirmPay');
    },
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
}
</script>


<style lang="less" scoped>
.fixed {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: -100%;
}

.show {
  bottom: 0;
}

.Keyboard-box {
  background-color: #fff;
  display: flex;
  overflow: hidden;
  transition: bottom 0.5s linear;

  .numbers {
    flex: 1;
  }

  .btns {
    width: 25%;
  }

  button {
    float: left;
    width: 33.3333333333%;
    background: none;
    border: 0;
    height: 62px;
    line-height: 62px;
    text-align: center;
    font-size: 24px;
    border-right: 1px solid #d9d9d9;
    border-top: 1px solid #d9d9d9;
    touch-callout: none;
  }

  .full {
    width: 66.6666666666%;
  }

  .delete {
    font-size: 0;
    line-height: 0;
    overflow: hidden;
    height: 124px;
    width: 100%;
    border-right: 0;

    &::before {
      background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMjAwLjM5MDYyNSIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAyMDAuMzkwNjI1IDIwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4xOTUzMTI1LCAwLjE5NTMxMjUpIj48cGF0aCBkPSJNODc5LjcyMTYgODU1LjQ1NDQgMzQ3LjA1MTIgODU1LjQ1NDRjLTM4Ljk2MzIgMC03NS41OTM2LTE1LjA4OC0xMDMuMTQ3Mi00Mi40NzY4TDQ0LjQzNTIgNjE2LjM0NGMtMTQuMDIwOC0xMy45MjgtMjQuODIyNC0zMC4xNTA0LTMyLjE3Ni00OC4yNDY0LTE0LjE5NTItMzQuOTc2LTE0LjIxMTItNzMuNTA3Mi0wLjA1Ni0xMDguNTA3MiA3LjM2MTYtMTguMTkwNCAxOC4xODcyLTM0LjQ2ODggMzIuMTg0LTQ4LjM3MjggNy44NzItNy43Nzc2IDE5Mi4yOTc2LTE5MC4wOCAyMDYuNTAyNC0yMDIuNDYwOCAyNi41NzkyLTIzLjE5MDQgNjAuNzM2LTM1Ljk2OCA5Ni4xNjE2LTM1Ljk2OGw1MzIuNjcwNCAwYzgwLjQ0IDAgMTQ1Ljg3ODQgNjUuMDQ4IDE0NS44Nzg0IDE0NWwwIDM5Mi42NTkyYzAgNTkuNTA3Mi0zNS45NTIgMTEyLjMwODgtOTEuNTg1NiAxMzQuNTIzMkM5MTYuNTg0IDg1MS45MjMyIDg5OC4zMTY4IDg1NS40NTQ0IDg3OS43MjE2IDg1NS40NTQ0ek0zNDcuMDUxMiAyMDUuMjk2Yy0yNy40ODE2IDAtNTMuOTcyOCA5LjkwNC03NC41OTUyIDI3Ljg5NzYtMTEuMTYxNiA5LjcyMTYtMTUxLjc0NzIgMTQ4LjQyODgtMjA0Ljk3NzYgMjAxLjA0OC0xMC44MjcyIDEwLjc2MTYtMTkuMjI1NiAyMy4zODA4LTI0LjkzNDQgMzcuNDc2OC0xMC44MjcyIDI2Ljc2OTYtMTAuODExMiA1Ny40Njg4IDAuMDQgODQuMjE0NCA1LjcwMDggMTQuMDI0IDE0LjA4NDggMjYuNjAzMiAyNC45MjY0IDM3LjM4MDhsMTk5LjQ2NzIgMTk2LjYzNTJjMjEuNDI4OCAyMS4yOTQ0IDQ5Ljg0NDggMzMgODAuMDczNiAzM2w1MzIuNjcwNCAwYzE0LjQwMzIgMCAyOC41NjgtMi43Mzc2IDQyLjEwODgtOC4xNDI0IDQzLjE2OTYtMTcuMjM4NCA3MS4wNjcyLTU4LjE5ODQgNzEuMDY3Mi0xMDQuMzU2OEw5OTIuODk3NiAzMTcuNzg3MmMwLTYyLjAzMi01MC43NzEyLTExMi40OTI4LTExMy4xNzYtMTEyLjQ5MjhMMzQ3LjA1MTIgMjA1LjI5NDR6TTQ1OS40NDA5NjMgNjY3LjcxODQwNGwzMjQuMjYzNjE1LTMyNC4yNjM2MTUgMTcuMDY2NTY2IDE3LjA2NjU2Ni0zMjQuMjYzNjE1IDMyNC4yNjM2MTUtMTcuMDY2NTY2LTE3LjA2NjU2NlpNNzgzLjcxMjgwNCA2ODQuNzkxNTE3bC0zMjQuMjYzNjE1LTMyNC4yNjM2MTUgMTcuMDY2NTY2LTE3LjA2NjU2NiAzMjQuMjYzNjE1IDMyNC4yNjM2MTUtMTcuMDY2NTY2IDE3LjA2NjU2NloiIGZpbGw9IiM0NTQ3NTMiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==)
        50% no-repeat;
      background-size: 32px auto;
      content: "";
      display: block;
      width: 100%;
      height: 124px;
    }
  }

  .pay-btn {
    line-height: 1.2;
    height: 124px;
    background-color: #ff4242;
    color: #fff;
    width: 100%;
    border-right: 0;
  }

  .disable {
    background-color: #aaa;
  }
}
</style>



