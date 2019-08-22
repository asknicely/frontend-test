import { shallowMount } from "@vue/test-utils";
import Todos from "../src/views/Todos";
import TodoItem from "../src/components/TodoItem";

describe("Todos", () => {
  const todos = [
    {
      id: "0",
      user_id: "1",
      description: "Testing",
      completed: "1",
      baseurl: "http://localhost:1337/"
    }
  ];
  const wrapper = shallowMount(Todos, {
    data() {
      return {
        todos: todos
      };
    }
  });

  it("renders the correct markup", () => {
    expect(wrapper.html()).toContain(
      '<table class="table table-striped todos-list table-borderless">'
    );
  });

  it("renders a TodoItem component", () => {
    expect(wrapper.find(TodoItem).exists()).toBe(true);
  });

  it("has a button", () => {
    expect(wrapper.contains("button")).toBe(true);
  });
});
