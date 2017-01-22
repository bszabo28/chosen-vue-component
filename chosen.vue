##########
# Készítette: Szabó Balázs
# Dátum: 2017.01.13.
#
# Leírás: 1.6.2 chosen jquery plugin vuejs komponense
# https://harvesthq.github.io/chosen/options.html
##########

<template>
	<!--
		Inline template segítségével lehet módosítani a kinézetén
		Bővebben: https://vuejs.org/v2/guide/components.html#Inline-Templates
	 -->
	<select
		:multiple="multiple_"
		:data-placeholder="dataPlaceholder">
		<option
			v-for="item in list_"
			:value="item.value"
			:label="item.label"
			:selected="item.selected"
			:disabled="item.disabled"
		>{{item.label}}</option>
	</select>
</template>

<script>

	import jQuery from 'jquery';
	import _ from 'lodash';

	window.jQuery = jQuery;

	require('chosen-js/chosen.css')
	require('chosen-js');

	// Alap szélesség
	// A chosen select html tag option nélküli állapotát veszi alapnak
	const defaultWidth = '100%';

	// Chosen által támogatott események
	const simpleEvents = [
		'ready',
		'maxselected',
		'showing_dropdown',
		'hiding_dropdown',
		'no_results',
	];

	// Chosen által támogatott triggerek
	const triggers = [
		'updated',
		'activate',
		'open',
		'close',
	];

	export default {

		props: [
			// Chosen beállító objektuma
			'options',
			'data-placeholder',
			'multiple',

			// Objektum lista, amiben az option
			// html tag által támogatott attributumok
			// adhatóak meg (value,selected,deselected,label)
			'list',
		],

		data() {

			return {
				// jQuery objektum
				select: null,
				// A kiválasztott elem value értékét
				// gyűjtöm ide, v-model nincs használva!!!
				current: [],
			};
		},

		watch: {
			// Lista változásakor le kell
			// futnia a chosen:updated triggernek
			list_(){
				this.updated();
			}
		},

		computed: {

			list_(){
				// Mivel objektumokról van szó, azok referenciaként
				// adódnak át, emiatt nincs értelme
				// pl .slice(0) -nek
				return this.list || [];
			},

			// true vagy false
			multiple_(){
				return !!this.multiple;
			},

			options_() {
				var options = this.options || {};

				options.width = options.width || defaultWidth;

				return options;
			}
		},

		methods: {

			changed(e,{selected,deselected}){

				if(selected){
					this.current.push(selected);
				}

				if(deselected){
					_.remove(this.current,i => i===deselected);
				}

				this.$emit('changed',this.current);
			},

			// Események
			...(_.transform(simpleEvents,(acc,e) => {
				acc[e] = function(){
					this.$emit(`chosen:${e}`,null);
				};
			},{})),

			// Triggerek
			...(_.transform(triggers,(acc,t) => {
				acc[t] = function(){
					this.$nextTick(() =>{
						this.select.trigger(`chosen:${t}`);
					});
				};
			},{})),
		},

		mounted() {

			this.select = jQuery(this.$el);

			this.select
				.on('change',(evt,params) => this.changed(evt,params));

			// Események
			_.each(simpleEvents,e => {
				this.select.on(`chosen:${e}`,() => this[e]());
			});

			// Chosen inicializálása
			this.select.chosen(this.options_);
		}
	};
</script>
