'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Loader() {
  return React.createElement(
    "div",
    { className: "loader" },
    React.createElement("div", { className: "loader-dash loader-dash--one" }),
    React.createElement("div", { className: "loader-dash loader-dash--two" }),
    React.createElement("div", { className: "loader-dash loader-dash--three" }),
    React.createElement("div", { className: "loader-dash loader-dash--four" })
  );
}

function TodoList(props) {
  var list = props.list;
  var listItems = Object.keys(list).map(function (key) {
    return React.createElement(
      "tr",
      { key: list[key].id },
      React.createElement(
        "td",
        null,
        list[key].id
      ),
      React.createElement(
        "td",
        null,
        list[key].user_id
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "a",
          { href: "/todo/" + list[key].id },
          list[key].description
        )
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "form",
          { method: "post", action: "/todo/delete/{ list[key].id }" },
          React.createElement(
            "button",
            { type: "submit", className: "btn btn-xs btn-danger" },
            React.createElement("span", { className: "glyphicon glyphicon-remove glyphicon-white" })
          )
        )
      )
    );
  });
  return listItems;
}

var TodoListApp = function (_React$Component) {
  _inherits(TodoListApp, _React$Component);

  function TodoListApp(props) {
    _classCallCheck(this, TodoListApp);

    var _this = _possibleConstructorReturn(this, (TodoListApp.__proto__ || Object.getPrototypeOf(TodoListApp)).call(this, props));

    _this.fetchTodoList = function () {
      fetch('/todo', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(function (results) {
        return results.json();
      }).then(function (results) {
        _this.setState({
          todoList: results,
          loading: false
        });
      }).catch(function (err) {
        return alert('Network error, please try refreshing page manually.');
      });
    };

    _this.componentDidMount = function () {
      _this.fetchTodoList();
    };

    _this.state = {
      todoList: {},
      loading: true
    };
    return _this;
  }

  _createClass(TodoListApp, [{
    key: "render",
    value: function render() {
      var _state = this.state,
          todoList = _state.todoList,
          loading = _state.loading;


      if (loading) {
        return React.createElement(Loader, null);
      }

      return React.createElement(
        "section",
        {
          className: "col-md-8 col-md-offset-2",
          role: "application",
          "aria-roledescription": "To Do List App",
          "aria-describedby": "Displays the list of tasks by user"
        },
        React.createElement(
          "h1",
          null,
          "List of tasks"
        ),
        React.createElement(
          "table",
          { className: "table table-striped" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                null,
                "#"
              ),
              React.createElement(
                "th",
                null,
                "User"
              ),
              React.createElement(
                "th",
                null,
                "Description"
              ),
              React.createElement("th", null)
            )
          ),
          React.createElement(
            "tbody",
            null,
            todoList.length >= 1 && React.createElement(TodoList, { list: todoList })
          ),
          React.createElement(
            "tfoot",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                { colSpan: "4" },
                React.createElement(
                  "form",
                  {
                    method: "post",
                    action: "/todo/add",
                    "aria-label": "Add a todo task"
                  },
                  React.createElement(
                    "label",
                    { htmlFor: "description" },
                    "Type a new task"
                  ),
                  React.createElement("input", {
                    id: "description",
                    type: "textbox",
                    name: "description",
                    className: "small-6 small-center",
                    placeholder: "e.g: Eat Donuts :)"
                  }),
                  React.createElement(
                    "button",
                    { type: "submit", className: "btn btn-sm btn-primary" },
                    "Add"
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return TodoListApp;
}(React.Component);

var domContainer = document.querySelector('#todo-app');
ReactDOM.render(React.createElement(TodoListApp, null), domContainer);