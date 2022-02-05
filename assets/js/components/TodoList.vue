<template>
	<div id="todo" class="col">
<!--		<table class="table table-striped">-->
<!--			<thead>-->
<!--				<tr>-->
<!--					<th scope="col">#</th>-->
<!--					<th scope="col">User</th>-->
<!--					<th scope="col">Description</th>-->
<!--				</tr>-->
<!--			</thead>-->
<!--			<tbody>-->
<!--				<tr v-for="(item, index) in todoList" :key="index">-->
<!--					<td scope="row">{{ item.id }}</td>-->
<!--					<td>{{ item.user_id }}</td>-->
<!--					<td>-->
<!--	&lt;!&ndash;					<a href="{{ global.request.baseurl }}/todo/{{ todo.id }}">&ndash;&gt;-->
<!--	&lt;!&ndash;						{{ todo.description }}&ndash;&gt;-->
<!--	&lt;!&ndash;					</a>&ndash;&gt;-->
<!--						<a href="">-->
<!--							{{ item.description }}-->
<!--						</a>-->
<!--					</td>-->
<!--					<td class="list-action">-->
<!--						<button type="button"-->
<!--						        class="btn btn-success mx-1"-->
<!--						        data-bs-toggle="modal"-->
<!--						        data-bs-target="#exampleModal">-->
<!--							<i class="bi bi-check-circle-fill text-light"></i> Complete-->
<!--						</button>-->
<!--						<button type="button" class="btn btn-danger mx-1">-->
<!--							<i class="bi bi-trash text-light"></i> Delete-->
<!--						</button>-->
<!--						<button type="submit" class="btn btn-xs btn-danger">-->
<!--							<span class="glyphicon glyphicon-ok glyphicon-white"></span>-->
<!--						</button>-->
	<!--					<form method="post" action="{{ global.request.baseurl }}/todo/delete/{{ todo.id }}">-->
	<!--						<button type="submit" class="btn btn-xs btn-danger"><span class="glyphicon glyphicon-remove glyphicon-white"></span></button>-->
	<!--					</form>-->
<!--					</td>-->
<!--				</tr>-->
<!--				<tr>-->
<!--					<form method="post">-->
<!--						<td colspan="3">-->
<!--							<input type="textbox" name="description" class="small-6 small-center" placeholder="Description...">-->
<!--						</td>-->
<!--						<td>-->
<!--							<button type="submit" class="btn btn-sm btn-primary">Add</button>-->
<!--						</td>-->
<!--					</form>-->
<!--				</tr>-->
<!--			</tbody>-->
<!--		</table>-->

		<b-table :items="todoList" :fields="fields" striped responsive="sm">
			<template #cell(action)="task">

				<div class="list-action">
					<b-button
							:disabled="isCompleted(task.item.completed)"
							:variant="isCompleted(task.item.completed) ? 'success' : 'outline-success'"
							class="mx-1"
							@click="onCompleteClick(task)"
					>
						<b-icon :icon="isCompleted(task.item.completed) ? 'check2-all' : 'check2-circle'"></b-icon> Complete
					</b-button>

					<b-button variant="danger" class="mx-1">
						<b-icon icon="trash"></b-icon> Delete
					</b-button>
				</div>
			</template>
		</b-table>

		<Confirm :task="modal" ref="confirm" @confirmed="completeTask"></Confirm>
	</div>
</template>

<script>
import { axiosRequest } from "../utils/fetch.utils";
import Confirm from "./Confirm";

export default {
	name : "Todo",

	created () {
		this.getTodoList();
	},

	components: {
		Confirm,
	},

	methods : {
		isCompleted (status) {
			return status !== '0'
		},

		getTodoList () {
			axiosRequest('GET', '/api/list', {}, true)
				.then(([error, data]) => {
					if (error) {
						console.log(error)
					} else {
						this.todoList = data;
						console.log(this.todoList);
					}
				})
		},
		onCompleteClick (taskObj) {
			if (!taskObj.item) return false;
			this.modal.title = 'Complete task';
			this.modal.data = taskObj.item;
			this.modal.confirmText = 'Confirm';


			this.$refs['confirm'].showModal();

		},
		completeTask (taskId) {
			axiosRequest('POST', `/api/todo/complete/${taskId}`, {}, true)
				.then(([error, data]) => {
					if (error) {
						console.log(error)
					} else {
						this.getTodoList();
					}
				})
		}
	},

	data () {
		return {
			todoList    : [],
			fields      : [
				{
					key         : 'id',
					label       : '#',
				},
				{
					key         : 'user_id',
					label       : 'User',
				},
				{
					key         : 'description',
					label       : 'Description',
				},
				{
					key         : 'action',
					label       : ''
				}
			],
			modal: {
				title           : '',
				data            : null,
				confirmText     : ''
			}
		}
	}
}
</script>

<style lang="scss">
	.list-action {
		display: flex;
		justify-content: flex-end;
		button {

		}
	}
</style>
