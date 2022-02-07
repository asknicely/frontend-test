<template>
	<div id="todo" class="col">
		<h1 class="text-center">Todo List</h1>
		<BTable
			striped
			:items="sortList"
			:fields="fields"
			responsive="sm"
			:no-provider-paging="true"
			:per-page="pagination.perPage"
			:current-page="pagination.currentPage"
		>
			<template #head(id)>
				<div class="list-title" @click="sortBy('id')">
					<span>#</span>
					<BIconCaretDownFill font-scale="0.6"
					                    :class="{ 'desc' : sorting.direction === 'desc' }">
					</BIconCaretDownFill>
				</div>
			</template>
			<template #head(user_id)>
				<div class="list-title" @click="sortBy('user_id')">
					<span>User</span>
					<BIconCaretDownFill font-scale="0.6"
					                    :class="{ 'desc' : sorting.direction === 'desc' }">
					</BIconCaretDownFill>
				</div>
			</template>
			<template #head(description)>
				<div class="list-title" @click="sortBy('description')">
					<span>Description</span>
					<BIconCaretDownFill font-scale="0.6"
					                    :class="{ 'desc' : sorting.direction === 'desc' }">
					</BIconCaretDownFill>
				</div>
			</template>
      <template #head(completed)>
        <div class="list-title" @click="sortBy('completed')">
          <span>Status</span>
          <BIconCaretDownFill font-scale="0.6"
                              :class="{ 'desc' : sorting.direction === 'desc' }">
          </BIconCaretDownFill>
        </div>
      </template>
			<template #cell(description)="task">
				<span :class="{ 'completed' : task.item.completed }">{{ task.item.description || '' }}</span>
			</template>
      <template #cell(completed)="task">
        <div class="list-status">
          <BBadge variant="primary" pill class="p-2" v-if="task.item.completed">Completed</BBadge>
          <BBadge variant="warning" pill class="p-2" v-else>Todo</BBadge>
        </div>
      </template>
			<template #cell(action)="task">
				<div class="list-action">
					<BButton
							v-if="!task.item.completed"
							variant="outline-primary"
							class="mx-1"
              :class="{ 'complete-btn' : !is_mobile }"
							pill
							@click="onCompleteClick(task)"
					>
						<BIconCheck2All></BIconCheck2All>
            <span>Mark as done</span>
					</BButton>

					<BButton variant="danger" pill class="mx-1" @click="onDeleteClick(task)">
						<BIconTrash></BIconTrash>
					</BButton>
				</div>
			</template>
		</BTable>
		<div class="list-footer">
			<BPagination
				pills
				v-model="pagination.currentPage"
				:total-rows="todoList.length"
				:per-page="pagination.perPage"
				aria-controls="todoList"
				align="center"
			></BPagination>

			<BButton variant="warning" class="mx-1 add-btn" @click="onAddTaskClick">
				<BIconFileEarmarkPlus></BIconFileEarmarkPlus> Add Task
			</BButton>
		</div>
		<Confirm :modal="modal" ref="confirm"></Confirm>
		<AddTask ref="addTask" @submitted="submitNewTask"></AddTask>
	</div>
</template>

<script>
import {
    BTable,
    BButton,
    BBadge,
    BIconCheck2All,
    BIconTrash,
    BIconFileEarmarkPlus,
    BPagination,
    BFormCheckbox,
    BIconCaretDownFill
} from 'bootstrap-vue';
import { axiosRequest } from "../utils/fetch.utils";
import Confirm from "../components/Confirm";
import AddTask from "../components/AddTask.vue"

export default {
	name : "Todo",
	created () {
		this.getTodoList();
	},
	components: {
		Confirm,
		AddTask,
		BTable,
		BButton,
    BBadge,
		BIconCheck2All,
		BIconTrash,
		BIconFileEarmarkPlus,
		BPagination,
		BFormCheckbox,
		BIconCaretDownFill
	},
	computed: {
		sortList () {
			return this.todoList.sort((a,b) => {
				let modifier = 1;
				if(this.sorting.direction === 'desc') modifier = -1;
				if(a[this.sorting.currentSort] < b[this.sorting.currentSort]) return -1 * modifier;
				if(a[this.sorting.currentSort] > b[this.sorting.currentSort]) return modifier;
				return 0;
			})
		}
	},
	methods : {
		getTodoList () {
			axiosRequest('GET', '/api/list')
				.then(([error, data]) => {
					if (error) {
						this.showError(error)
					} else {
						this.todoList = data.map(item => {
							if (item.id) {
								item.id = parseInt(item.id)
							}
							if (item.user_id) {
								item.user_id = parseInt(item.user_id)
							}
							if (item.completed) {
								item.completed = parseInt(item.completed)
							}
								return item
							});
						}
				})
		},
		onCompleteClick (taskObj) {
			if (!taskObj.item) return false;
			this.modal.title = 'Complete task';
			this.modal.body = "Mark this task as completed?";
			this.modal.data = taskObj.item;
			this.modal.confirmText = 'Confirm';
			this.modal.callback = this.completeTask;

			this.$refs['confirm'].showModal();
		},
		completeTask (taskId) {
			axiosRequest('POST', `/api/todo/complete/${taskId}`)
				.then(([error, data]) => {
					if (error) {
            this.showError(error)
					} else {
            const toast = {
              message : `Task ID: ${taskId} has marked as Completed!`,
              title   : 'Success'
            }
            this.onFetchCompleted(toast)
					}
				})
		},
		onDeleteClick (taskObj) {
			if (!taskObj.item) return false;
			this.modal.title = 'Delete Task';
			this.modal.body = "Permanently delete this task? You can't undo this.";
			this.modal.data = taskObj.item;
			this.modal.confirmText = 'Delete';
			this.modal.callback = this.deleteTask;

			this.$refs['confirm'].showModal();
		},
		deleteTask (taskId) {
			axiosRequest('POST', `/api/todo/delete/${taskId}`)
				.then(([error, data]) => {
					if (error) {
            this.showError(error)
					} else {
            const toast = {
              message : `Task ID: ${taskId} successfully deleted`,
              title   : 'Success'
            }
						this.onFetchCompleted(toast)
					}
				})
		},
		onAddTaskClick () {
			this.$refs['addTask'].showModal();
		},
		submitNewTask (taskDesc) {
			axiosRequest(
				'POST',
				'/api/todo/add',
				 { description : taskDesc }
			)
				.then(([error, data]) => {
					if (error) {
            this.showError(error)
					} else {
            const toast = {
              message : 'Your task has been created.',
              title   : 'Create success'
            }
            this.onFetchCompleted(toast)
          }
				})
		},
		sortBy (key) {
			if (key === this.sorting.currentSort) {
				this.sorting.direction = this.sorting.direction === 'asc' ? 'desc' : 'asc';
			} else {
				this.sorting.currentSort = key;
				this.sorting.direction = 'desc'
			}
		},
    onFetchCompleted (toastData) {
      this.getTodoList();
      this.showToast(toastData, 'primary')
    }
	},
	data () {
		return {
			todoList    : [],
			fields      : [
				{
					key         : 'id',
					tdClass     : 'list-td'
				},
				{
					key         : 'user_id',
				  	tdClass     : 'list-td'
				},
				{
					key         : 'description',
				  	tdClass     : 'desc-td list-td'
				},
				{
				  	key         : 'completed',
				  	tdClass     : 'list-td'
				},
				{
					key         : 'action',
					label       : '',
				  	tdClass     : 'action-td list-td'
				}
			],
			modal: {
				title           : '',
				data            : null,
				body            : '',
				confirmText     : '',
				callback		: ''
			},
			pagination : {
				currentPage: 1,
				perPage: 10
			},
			sorting : {
				currentSort : 'id',
				direction   : 'asc'
			}
		}
	}
}
</script>

<style lang="scss">
	#todo {
		th[role="columnheader"] {
			padding: 0
		}
		.completed {
			text-decoration: line-through;
			opacity: 0.5;
		}
    .list-td {
      vertical-align: middle;
    }
		.list-title {
			cursor: pointer;
			padding: 0.75rem;
			transition: all .05s linear;
			display: flex;
			align-items: center;
			gap: 3px;
			svg {
				transition: transform .1s;
				&.desc {
					transform: rotate(-180deg);
				}
			}
			&:hover {
				background-color: rgba(0, 0, 0, 0.05);
			}
		}
    .list-status {
      span {
        min-width: 85px;
      }
    }
		.list-action {
			display: flex;
			justify-content: flex-end;
			.action-btn {
				border-radius: 50%;
			}
		}
		.list-footer {
			position: relative;
			.add-btn {
				position: absolute;
				right: 0;
				top: 0;
			}
		}
    .action-td {
      min-width: 250px;
    }
    .btn {
      &.complete-btn {
        span {
          max-width: 0;
          display: inline-flex;
          white-space: nowrap;
          transition: max-width 0.5s;
          overflow: hidden;
        }
        &:hover, &:focus {
          span {
            max-width: 100px;
          }
        }
      }
    }
	}
  @media screen and (min-width: 780px) {
    .desc-td {
      min-width: 250px;
    }
  }
</style>
