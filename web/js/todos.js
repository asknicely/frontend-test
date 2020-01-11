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
		// fetch todo list
		getTodos() {
			axios({
				method: 'get',
				url: '/todo',
				data: {}
			})
				.then((response) => {
					console.log(response.data);
					this.todoList = response.data;
				})
				.catch((error) => {
					console.log(error);
					this.isError = true;
				})
				.finally(() => (this.loading = false));
		},
		// add new todo
		addTodo() {
			if (!this.newTodo) {
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
					// have to fetch todo list again, since the API doesn't return the added todo with id. *future improvement
					this.getTodos();
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => (this.newTodo = ''));
		},
		// delete todo
		deleteTodo(todo) {
			axios({
				method: 'post',
				url: '/todo/delete/' + todo.id,
				data: {}
			})
				.then((response) => {
					// filter out the deleted todo from the list
					this.todoList = this.todoList.filter((item) => item.id !== todo.id);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		// toggle todo completed property
		toggleTodo(todo) {
			axios({
				method: 'post',
				url: '/todo/complete/' + todo.id,
				data: {
					completed: todo.completed
				}
			})
				.then((response) => {})
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
