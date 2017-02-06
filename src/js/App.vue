<template>
	<div class="container">

		<div class="header">
			<h1>Chosen</h1>			
			<chosen 
				v-on:changed="chosenChanged"
				:multiple="multiple"
				:options="options"
				:list="colors">
			</chosen>			
		</div>

		<div class="panel">
			<h1>Colors</h1>
			<colors 
				ref="colors"
				v-on:selected="colorsSelected"
				v-on:changed="colorsChanged" 
				:multiple="multiple">
			</colors>
		</div>
		<div class="panel">
			<h1>Options</h1>
			<options v-on:changed="optionsChanged"></options>	
		</div>
	</div>
</template>
<script>

	import Chosen from 'chosen-vue-component';
	import Options from './Options.vue';
	import Colors from './Colors.vue';
	import Vue from 'vue';

	import _ from 'lodash';
		

	export default {

		components: {
			'options': Options,
			'chosen' : Chosen,
			'colors': Colors,			
			
		},

		data() {
			return {
				multiple: false,
				options: {},
				colors: [],
			};
		},

		methods: {


			calculateColors(v){

				return _.transform(this.colors,(acc,color) => {

					var temp = {
						label : color.label,
						value: color.value,
						selected: false,
					};

					_.each(v,i => {
						var t = i.value || i;

						if(t === color.value){
							temp.selected = true;
						}
					});

					acc.push(temp);
				},[]);
			},

			optionsChanged({options,multiple}){
				this.multiple = multiple;
				this.options = options;
			},

			colorsChanged(v){
				this.colors = v;
			},

			colorsSelected(v){

				if(!v){
					v = [];
				}
				
				if(!this.multiple){
					v = [v];
				}

				this.colors = this.calculateColors(v);
			},

			chosenChanged(v){
				this.colors = this.calculateColors(v);
				this.$refs.colors.adjust(this.colors);
			}
		},
	}
</script>