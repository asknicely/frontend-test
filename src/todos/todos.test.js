import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
import $ from "jquery";

import Todos from "./todos.vue";

const mockGetTodosList = [
  {
    id: "11",
    user_id: "1",
    description: "Test1",
    completed: "0",
    username: "user1",
  },
  {
    id: "12",
    user_id: "1",
    description: "Test2",
    completed: "1",
    username: "user1",
  },
  {
    id: "13",
    user_id: "1",
    description: "Test3",
    completed: "0",
    username: "user1",
  },
];

jest.spyOn(axios, "request").mockResolvedValue(mockGetTodosList);

global.$ = $;
global.$.fn.modal = jest.fn(() => $());

axios.request.mockImplementation(({ method, url }) => {
  console.log(method, url);

  if (method === "get" && url === "/todo") return { data: mockGetTodosList };

  if (method === "patch" && url === "/todo/11/complete") {
    return {
      data: mockGetTodosList.map((todo) => {
        todo.id === "11" ? { ...todo, completed: "1" } : todo;
      }),
    };
  }

  if (method === "delete" && url === "/todo/11") {
    return { data: mockGetTodosList.filter((todo) => todo.id !== "11") };
  }
});

describe("Todos", () => {
  test("should mount and load todos list", async () => {
    const wrapper = mount(Todos);

    await flushPromises();

    const todos = wrapper.findAll('[data-test="todo"]');

    expect(todos).toHaveLength(3);
    expect(todos[0].text()).toContain("Test1");
    expect(todos[1].text()).toContain("Test2");
    expect(todos[2].text()).toContain("Test3");
  });

  test("should delete a todo", async () => {
    const wrapper = mount(Todos);

    await flushPromises();

    let todos = wrapper.findAll('[data-test="todo"]');
    expect(todos).toHaveLength(3);

    wrapper.find('[data-test="deleteTodo"]').trigger("click");

    await flushPromises();

    todos = wrapper.findAll('[data-test="todo"]');
    expect(todos).toHaveLength(2);
  });
});
