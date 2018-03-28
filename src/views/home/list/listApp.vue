<template>
<div id="app">
	<div>列表</div>
</div>
</template>

<script>

import App from 'assets/js/App';

export default {
	data() {
		return {

		}
	},
	//实例初始化最之前，无法获取到data里的数据
	beforeCreate() {


	},
	//在挂载开始之前被调用
	beforeMount() {


	},
	//已成功挂载，相当ready()
	mounted() {



	},
	//相关操作事件
	methods: {




	}
}
</script>

<style lang="less">
.note {
  color: #666;
  padding: 10px;
  font-size: 12px;
}
.note p {
  line-height: 25px;
}

.weui-cells {
  font-size: 14px !important;
}

/*
 * less 展示
 */
.lessTest {
  .listbox {
    border-radius: 10px;
    font-size: 14px;
  }
  .boxcontent {
    padding: 15px;
  }
}
</style>
