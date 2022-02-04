(function (Vue) {
	new Vue({
		el: '#test',
		delimiters: ['${', '}'],
		created () {

		},
		data: {
			hello: 'hello world'
		}
	})

})(Vue, axios);
