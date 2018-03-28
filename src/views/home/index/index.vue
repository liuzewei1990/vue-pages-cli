<template>
	<div>
		<a href="../router/details.html#/add?name=123">前往单页多路由页面</a>
		<money-input :value="value" :focus="focus"></money-input>
		<Keyboard
			ref="Keyboard"
			:fixed="true"
			v-model="value"
		></Keyboard>
	</div>
</template>

<script>

import Keyboard from "@/components/Keyboard";
import MoneyInput from "@/components/Keyboard/MoneyInput";
import { XButton } from 'vux'
import { setTimeout } from 'timers';
import App from 'assets/js/App';
export default {
	mixins: [App.vueMixins.testMixin2],
	components: { Keyboard, XButton, MoneyInput },
	data() {
		return {
			value: "",
			focus: false
		}
	},
	mounted() {
		setTimeout(() => {

			this.openKey();
		}, 10)
	},
	methods: {
		openKey() {
			this.$refs.Keyboard.open();
			this.focus = true;
		}
	}
}
</script>

<style>

</style>
