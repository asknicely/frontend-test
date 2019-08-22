import { mount } from "@vue/test-utils";
import Todos from "../src/views/Todos";

describe("Todos", () => {
  const wrapper = mount(Todos);

  it("renders the correct markup", () => {
    expect(wrapper.html()).toContain(
      '<table class="table table-striped todos-list">'
    );
  });

  it("has a button", () => {
    expect(wrapper.contains("button")).toBe(true);
  });
});
