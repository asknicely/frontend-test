import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import ToDosComponent from '@/components/ToDosComponent.vue';
import ToDoComponent from '@/components/ToDoComponent.vue';

describe('ToDosComponent.vue', () => {
  it('has a created hook', () => {
    expect(typeof ToDosComponent.created).to.eq('function');
  });

  it('sets the correct default data', () => {
    expect(typeof ToDosComponent.data).to.eq('function');
    const defaultData = ToDosComponent.data();
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
    expect(wrapper.text()).to.include(todo.id);
    expect(wrapper.text()).to.include(todo.user_id);
    expect(wrapper.text()).to.include(todo.description);
  });
});
