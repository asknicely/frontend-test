var app = new Vue({
	el: '#todos',
	data: {
		todoList: [],
		newTodo: '',
		loading: true,
		isError: false
	},
	mounted() {
		this.getTodos();
	},
	methods: {
		getTodos() {
			axios({
				method: 'get',
				url: '/todo',
				data: {}
			})
				.then((response) => {
					this.todoList = response.data;
				})
				.catch((error) => {
					console.log(error);
					this.isError = true;
				})
				.finally(() => (this.loading = false));
		},
		addTodo() {
			const value = this.newTodo && this.newTodo.trim();
			if (!value) {
				return;
			}
			axios({
				method: 'post',
				url: '/todo/add',
				data: {
					description: this.newTodo
				}
			})
				.then((response) => {
					this.getTodos();
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => (this.newTodo = ''));
		},
		deleteTodo(todo) {
			axios({
				method: 'post',
				url: '/todo/delete/' + todo.id,
				data: {}
			})
				.then((response) => {
					this.todoList = this.todoList.filter((item) => item.id !== todo.id);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		// navigate to todo detail
		navigateToDetail(todo) {
			window.location.href = '/todo/' + todo.id;
		}
	}
});
