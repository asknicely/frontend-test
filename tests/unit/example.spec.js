import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import ToDoListComponent from '@/components/ToDoListComponent.vue';
import ToDoComponent from '@/components/ToDoComponent.vue';

describe('ToDoListComponent.vue', () => {
  it('has a created hook', () => {
    expect(typeof ToDoListComponent.created).to.eq('function');
  });

  it('sets the correct default data', () => {
    expect(typeof ToDoListComponent.data).to.eq('function');
    const defaultData = ToDoListComponent.data();
    expect(defaultData.loading).to.eq(false);
    expect(defaultData.description).to.eq('');
  });
});

describe('ToDoComponent.vue', () => {
  it('has a created hook', () => {
    expect(typeof ToDoComponent.created).to.eq('function');
  });

  it('sets the correct default data', () => {
    expect(typeof ToDoComponent.data).to.eq('function');
    const defaultData = ToDoComponent.data();
    expect(defaultData.loading).to.eq(false);
    expect(defaultData.individualMode).to.eq(false);
  });

  it('renders props.todo when passed', () => {
    const todo = {
      id: 1,
      user_id: 1,
      description: 'Vivamus tempus',
      completed: 0,
    };
    const wrapper = shallowMount(ToDoComponent, {
      propsData: { todo },
    });
    expect(wrapper.text()).to.include(todo.description);
  });
});
