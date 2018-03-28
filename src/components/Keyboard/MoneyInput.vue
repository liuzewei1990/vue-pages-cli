<template>
  <div class="money-input-box">
    <div class="title">消费金额：<span>￥</span></div>
    <div class="ipt">
      <span class="value-box">
        <span>
          {{value}}
          <em v-if="focus" class="cursor"></em>
        </span>
      </span>
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
    focus: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes cursor {
  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

.money-input-box {
  display: flex;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  border-radius: 5px;
  font-size: 16px;
  color: #999;
  padding: 0 20px 0 15px;
  // margin-top: 25px;

  .title {
    display: block;
    line-height: 70px;

    span {
      font-size: 20px;
      color: #040404;
      position: relative;
      top: 2px;
    }
  }

  .ipt {
    flex: 1;
    box-flex: 1;
    -webkit-box-flex: 1;
    font-size: 20px;
    color: #040404;
    line-height: 72px;
    vertical-align: middle;
    overflow: hidden;

    .value-box {
      position: relative;
      font-size: 26px;
      font-weight: 400;
      color: #040404;
      width: 100%;
      padding: 24px 0 23px;
      vertical-align: top;
      padding-right: 3px;
      box-sizing: border-box;

      span {
        display: inline-block;
        font-size: 26px;
        font-weight: 400;
        color: #040404;

        &::before {
          content: "0";
          width: 0;
          display: inline-block;
          overflow: hidden;
          font-size: 0;
          line-height: 0;
        }
      }

      em {
        position: absolute;
        right: 0;
        top: 24px;
        bottom: 23px;
        width: 1px;
        font-size: 0;
        overflow: hidden;
        background-color: #000;
        font-style: normal;
        display: none;
      }

      .cursor {
        animation: cursor 1s infinite step-start;
        display: block;
      }
    }
  }
}
</style>
