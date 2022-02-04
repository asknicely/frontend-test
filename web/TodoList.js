class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todoData: null,
            baseURL: props.baseURL,
            description: ""
        };
    }

    fetchTodoData = () => {
        const todoFetchURL = this.state.baseURL + "/todo";
        const xhttp = new XMLHttpRequest();
        const state = this; // Getting react state before this keyword is reserved for xhttp within onload

        xhttp.onload = function() {
            state.setState({      
                ...this.state,
                todoData: JSON.parse(this.responseText)
            });
        }
        xhttp.open("GET", todoFetchURL);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();        
    }

    // Fetch todo list data when component first renders
    componentDidMount() {
        this.fetchTodoData();
    }

    completeTodo = (todoID) => {
        const completeURL = this.state.baseURL + "/todo/complete/" + todoID;
        fetch(completeURL)
          .then(
            (result) => {
              this.fetchTodoData();
              toastr.success("Completed todo item!");
            },
            (error) => {
                console.log(error);
            }
          )
    }

    deleteTodo = (todoID) => {
        const deleteTodo = this.state.baseURL + "/todo/delete/" + todoID;
        fetch(deleteTodo)
          .then(
            (result) => {
              this.fetchTodoData();
              toastr.success("Removed todo item");
            },
            (error) => {
                console.log(error);
            }
          )
    }

    addTodo = () => {
        const addTodo = this.state.baseURL + "/todo/add";
        const description = "description=" + this.state.description;
        
        fetch(addTodo, {
            method: 'POST',
            body: description,
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
        })
          .then(
            (result) => {
                this.setState({
                    ...this.state,  
                    description: ""
                })
                this.fetchTodoData();
                toastr.success("Created new todo item!");
            },
            (error) => {
                console.log(error);
            }
          )
    }

    // Saves description text input into local state
    handleDescriptionChange = (event) => {
        this.setState({    
            ...this.state,  
            description: event.target.value
        });
    }

      render () {
          if (!this.state.todoData) {
              // Load temporary text while todo list data is fetched
            return (
                <h1 className="text-center">Loading...</h1>
            );
          } else {
            return (
                <div className="col-md-4 col-md-offset-4">
                    <h1>Todo List:</h1>
                    <table className="table table-striped">
                        <tbody>
                            <tr><th>#</th><th>User</th><th>Description</th><th></th><th></th></tr>
                            {this.state.todoData.map((todo) => {   
                                return (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.user_id}</td>
                                        <td>
                                            <a href={this.state.baseURL + "/todo/" + todo.id}>
                                                {todo.completed == 1 ? <del>{todo.description}</del> : todo.description}
                                            </a>
                                        </td>
                                        <td>
                                            {todo.completed == 0 && 
                                                <button type="submit" onClick={() => this.completeTodo(todo.id)} className="btn btn-xs btn-success"><span className="glyphicon glyphicon-ok glyphicon-white"></span></button>
                                            }
                                        </td>
                                        <td>
                                            <button type="button" onClick={() => this.deleteTodo(todo.id)} className="btn btn-xs btn-danger"><span className="glyphicon glyphicon-remove glyphicon-white"></span></button>
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td colSpan="5">
                                    <div className="add-todo-row">
                                        <input 
                                            type="textbox" 
                                            name="description" 
                                            value={this.state.description}
                                            onChange={this.handleDescriptionChange} 
                                            className="small-6 small-center" 
                                            placeholder="Description..." 
                                        />
                                        <button type="submit" className="btn btn-sm btn-primary" onClick={() => this.addTodo()}>Add</button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                    </table>
                </div>
            );
          }
      }
}

ReactDOM.render(
    React.createElement(TodoList, window.props),
    window.react_mount,
);