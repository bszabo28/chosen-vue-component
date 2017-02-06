<template>
	<ul class="colors">
		<li v-for="(color,index) in colors">

			<!-- v-model does not support dynamic input types. Use v-if branches instead. -->
			<input v-if="type === 'radio'" type="radio" :id="`color-${index}`" :value="color" v-model="selected" />

			<input v-else type="checkbox" :id="`color-${index}`" :value="color" v-model="selected" />

			<label :for="`color-${index}`" :style="`background-color: ${color.label};color:white;`">
				{{color.label}}
			</label>
		</li>
	</ul>
</template>
<script>

	const colors = {
		black: "#000000",
		blue: "#0000ff",
		brown: "#a52a2a",
		darkblue: "#00008b",
		darkcyan: "#008b8b",
		darkgrey: "#a9a9a9",
		darkgreen: "#006400",
		darkkhaki: "#bdb76b",
		darkmagenta: "#8b008b",
		darkolivegreen: "#556b2f",
		darkorange: "#ff8c00",
		darkorchid: "#9932cc",
		darkred: "#8b0000",
		darksalmon: "#e9967a",
		darkviolet: "#9400d3",
		fuchsia: "#ff00ff",
		gold: "#ffd700",
		green: "#008000",
		indigo: "#4b0082",
		khaki: "#f0e68c",
		lightblue: "#add8e6",
		lightgreen: "#90ee90",
		lightgrey: "#d3d3d3",
		lightpink: "#ffb6c1",
		lime: "#00ff00",
		magenta: "#ff00ff",
		maroon: "#800000",
		navy: "#000080",
		olive: "#808000",
		orange: "#ffa500",
		pink: "#ffc0cb",
		purple: "#800080",
		violet: "#800080",
		red: "#ff0000",
		silver: "#c0c0c0",
	};


	import _ from 'lodash';

	export default {

		props: ['multiple'],

		data() {
			return {
				colors: null,
				selected: [],
			};
		},

		watch: {
			colors() {
				this.$emit('changed', this.colors);
			},

			selected() {
				this.$emit('selected', this.selected);
			}
		},

		computed: {

			type() {
				if (this.multiple) {
					this.selected = [];
					return 'checkbox'
				}
				else {
					return 'radio';
				}
			},

			colors_() {
				return _
					.chain(colors)
					.transform((acc, v, color) => {

						acc.push({
							value: color,
							label: color,
						})

					}, [])
					.sortBy('label')
					.value();
			},
		},

		methods: {
			adjust(colors) {

				if (this.multiple) {
					this.selected = _.filter(colors, i => i.selected);
				}
				else {
					this.selected = _.chain(colors)
						.filter(i => i.selected)
						.first()
						.value();
				}

				this.colors = colors;
			},
		},

		mounted() {
			this.colors = this.colors_;
		}
	};
</script>