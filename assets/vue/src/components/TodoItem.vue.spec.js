import '@unit/globals'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'

import todoItem from './TodoItem.vue'

describe('todoItem component', function () {
  beforeEach(function () {
    this.localVue = createLocalVue()

    this.mounttodoItem = function (options) {
      let wrapper = mount(todoItem, { localVue: this.localVue, ...options })
      return new todoItemPageObj(wrapper)
    }
  })

  it('should render properly', function () {
    let todoItem = this.mounttodoItem()
    expect(todoItem.exists()).to.be.true
  })
})
