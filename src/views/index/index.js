import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from "vuex";

import layout from "./layout/main.vue";
import h5Pay from "./pages/h5Pay.vue";
import initQuickPay from "./pages/initQuickPay.vue";
import query from "./pages/query.vue";
import refund from "./pages/refund.vue";
import refundQuery from "./pages/refundQuery.vue";
import scanPay from "./pages/scanPay.vue";

import App from 'assets/js/App';
import { axios, post, postJson, get } from "src/apis/http.js";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "src/assets/css/reset.css";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: layout,
      redirect: "/scanPay",
      children: [
        { path: '/h5Pay', component: h5Pay },
        { path: '/initQuickPay', component: initQuickPay },
        { path: '/query', component: query },
        { path: '/refund', component: refund },
        { path: '/refundQuery', component: refundQuery },
        { path: '/scanPay', component: scanPay },
      ]
    },

  ]
})

const store = new Vuex.Store({
  strict: false,
  state: {
    url: "http://118.190.149.38:8088/converge/native/service",
    urls: [],
    md5Key: "RSGUVWXYZ0123456",
    lastUpdateOrderNo: "",
    lastUpdateRefundOrderNo: "",
    dev: "false",
    publicParams: {
      version: "1.0.0",
      service: "",
      companyNo: "10077777",
      customerNo: "20034585",
      signData: ""
    }
  },
  mutations: {
    updateOrderNo(state, orderNo) {
      localStorage.setItem("交易", orderNo);
      state.lastUpdateOrderNo = orderNo || "";
    },
    updateRefundOrderNo(state, orderNo) {
      localStorage.setItem("退货", orderNo);
      state.lastUpdateRefundOrderNo = orderNo || "";
    }
  },
  actions: {

  },
  modules: {

  }
})

router.beforeEach((to, from, next) => {
  if (to.query["dev"] === "true") {
    store.state.dev = "true";
  }
  next();
})

Vue.prototype.getUrl = function () {
  let url = "http://47.94.3.28:8071/";
  if (store.state.dev === "true") url = store.state.url;
  this.svaeUrl();
  return url;
};

Vue.prototype.svaeUrl = function () {
  let urls = JSON.parse(localStorage.getItem("url")) || [];
  if (!urls.find(item => store.state.url == item)) {
    store.state.url && urls.push(store.state.url);
  }
  localStorage.setItem("url", JSON.stringify(urls));
}

Vue.prototype.getUrls = function () {
  return JSON.parse(localStorage.getItem("url")) || [];
}

Vue.prototype.removeUrl = function (index, cb) {
  let urls = this.getUrls();
  // u = urls.find(item => item == url);
  // console.log(u)
  let u = urls[index];
  urls.splice(index, 1);
  localStorage.setItem("url", JSON.stringify(urls));
  if (u == store.state.url) {
    store.state.url = urls[0] || "";
  }
  cb();

}

Vue.prototype.postJson = function (url, data, isLoading) {
  let options = {
    method: "post",
    url: url,
    // baseURL: baseURL,
    data: data,
    timeout: 10000,
    isLoading: isLoading == false ? false : true,
    headers: {
      // "X-requested-With": "XMLHttpRequest",
      //使用form表单进行数据交互
      "Content-Type": "application/json"
      // "x_real_ip": "http://118.190.149.38:8088/converge/online/quick/pay"
    }
  };
  if (store.state.dev === "false")
    options.headers["x_real_ip"] = store.state.url;
  return axios(options)
}

new Vue({
  router: router,
  store: store,

}).$mount('#app')
