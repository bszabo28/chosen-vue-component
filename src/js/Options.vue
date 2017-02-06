<template>
	<div class="control">
		<ul>
			<li class="control-item">
				<input type="checkbox" id="multiple-checkbox" v-model="multiple" />
				<label for="multiple-checkbox">Multiple</label>
			</li>

			<li class="control-item" v-for="(value, key) in numOptions">
				<input type="number" :id="`chosen-${key}`" v-model="options[key]" />
				<label :for="`chosen-${key}`">
					<span>{{key}}</span>
					<span>{{value[0]}}</span>
				</label>
			</li>

			<li class="control-item" v-for="(value, key) in textOptions">
				<input type="text" :id="`chosen-${key}`" v-model="options[key]" />
				<label :for="`chosen-${key}`">
					<span>{{key}}</span>
					<span>{{value[0]}}</span>
				</label>
			</li>

			<li class="control-item" v-for="(value, key) in booleanOptions">
				<input type="checkbox" :id="`chosen-${key}`" v-model="options[key]" />
				<label :for="`chosen-${key}`">
					<span>{{key}}</span>
					<span>{{value[0]}}</span>
				</label>
			</li>
		</ul>
	</div>
</template>
<script>

	import _ from 'lodash';

	const numOptions = {
		disable_search_threshold: ['Hide the search input on single selects if there are n or fewer options.',0],
		max_shown_results: ['Only show the first (n) matching options in the results. This can be used to increase performance for selects with very many options.']
	};

	const textOptions = {
		no_results_text: ['The text to be displayed when no matching results are found. The current search is shown at the end of the text (e.g., No results match "Bad Search").', "No results match"],
		placeholder_text_multiple: ['The text to be displayed as a placeholder when no options are selected for a multiple select.', "Select Some Options"],
		placeholder_text_single: ['The text to be displayed as a placeholder when no options are selected for a single select.', "Select an Option"],
	};

	const booleanOptions = {
		allow_single_deselect: ["When set to true on a single select, Chosen adds a UI element which selects the first element (if it is blank).", false],
		disable_search: ["When set to true, Chosen will not display the search field (single selects only).", false],
		enable_split_word_search: ["By default, searching will match on any word within an option tag. Set this option to false if you want to only match on the entire text of an option tag.", true],
		inherit_select_classes: ["When set to true, Chosen will grab any classes on the original select field and add them to Chosen’s container div.", false],
		search_contains: ["By default, Chosen’s search matches starting at the beginning of a word. Setting this option to true allows matches starting from anywhere within a word. This is especially useful for options that include a lot of special characters or phrases in ()s and []s.", false],
		single_backstroke_delete: ["By default, pressing delete/backspace on multiple selects will remove a selected choice. When false, pressing delete/backspace will highlight the last choice, and a second press deselects it.", true],
		display_disabled_options: ["By default, Chosen includes disabled options in search results with a special styling. Setting this option to false will hide disabled results and exclude them from searches.", true],
		display_selected_options: ["By default, Chosen includes selected options in search results with a special styling. Setting this option to false will hide selected results and exclude them from searches.Note: this is for multiple selects only. In single selects, the selected result will always be displayed.", true],
		include_group_label_in_selected: ["By default, Chosen only shows the text of a selected option. Setting this option to  true will show the text and group (if any) of the selected option.", false],
		case_sensitive_search: ["By default Chosen's search is case-insensitive. Setting this option to true makes the search case-sensitive.", false],
	};

	export default {

		data() {
			return {
				multiple: false,
				numOptions: numOptions,
				textOptions: textOptions,
				booleanOptions: booleanOptions,

				options: {
					width: '100%',

					...(_.chain(booleanOptions)
						.extend(textOptions)
						.extend(numOptions)
						.transform((acc, value, key) => {
							acc[key] = value[1];
					}, {}).value()),
				}
			};
		},

		watch: {

			multiple(){
				this.$emit('changed',{
					options: this.options,
					multiple: this.multiple,
				});
			},

			options: {
				width: '100%',

				...(_.chain(booleanOptions)
					.extend(textOptions)
					.extend(numOptions)
					.transform((acc, value, key) => {
						acc[`options.${key}`] = function(){
							this.$emit('changed',{
								options: this.options,
								multiple: this.multiple,
							});
						};
				}, {}).value()),
			}
			
		}, 

		mounted(){
			this.$emit('changed',{
				options: this.options,
				multiple: this.multiple,
			});
		}
	}
</script>