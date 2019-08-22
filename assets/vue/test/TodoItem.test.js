import { shallowMount } from "@vue/test-utils";
import TodoItem from "../src/components/TodoItem";

describe("TodoItem", () => {
  describe("todo is incompleted", () => {
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        id: "1",
        user_id: "1",
        description: "Write a test script.",
        completed: "0",
        baseurl: "https://localhost:1337/",
        isActive: false
      }
    });

    it("renders the correct markup", () => {
      expect(wrapper.html()).toContain('<tr class="todo">');
    });

    it("expect properties", () => {
      expect(wrapper.vm.id).toBe("1");
      expect(wrapper.vm.user_id).toBe("1");
      expect(wrapper.vm.description).toBe("Write a test script.");
      expect(wrapper.vm.completed).toBe("0");
      expect(wrapper.vm.baseurl).toBe("https://localhost:1337/");
      expect(wrapper.vm.isActive).toBe(false);
    });

    it("has todo form fields", () => {
      expect(wrapper.contains("button")).toBe(true);
      expect(wrapper.contains("input[type=checkbox]#btn-1")).toBe(true);
      expect(wrapper.contains('label[for="btn-1"]')).toBe(true);
    });

    it("renders todo as incompleted", () => {
      expect(wrapper.find("input[type=checkbox]:checked").exists()).toBe(false);
    });
  });

  describe("todo is completed", () => {
    const factory = propsData => {
      return shallowMount(TodoItem, {
        propsData: {
          ...propsData
        }
      });
    };
    it("renders todo as completed", () => {
      const wrapper = factory({
        completed: "1",
        description: "Write a test script."
      });
      expect(wrapper.find("input[type=checkbox]:checked").exists()).toBe(true);
    });
  });
});
