<template>
  <div>
  	<hb-head headfont="有变化！！"></hb-head>
		<div style="padding: 25px 10px;color:red;text-align: center;">
  	注意看浏览器地址的变化！！
  	</div>
		<router-link to='/add'>
  		<x-button type="warn">点我再切换回来度试呗</x-button>
  	</router-link>
		
  </div>
</template>

<script>

import App from 'assets/js/App';

import { XButton } from 'vux'

import HbHead from 'components/HbHead';

export default {
  components: {
    HbHead, XButton
  },
  data() {
    return {

    }
  },
  methods: {


  }
}
</script>

<style lang="less">

</style>
