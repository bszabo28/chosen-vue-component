
import Vue from "vue";

import App from "./App.vue";
import "babel-polyfill";

const app = new Vue({
	el: "#app",
	components: {
		'App' : App
	},
	template: '<App/>',
});