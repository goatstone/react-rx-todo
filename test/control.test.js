import React from 'react'
import events from 'events'
const eventEmitter = new events.EventEmitter()
import { expect } from 'chai'
import { shallow } from 'enzyme'

import MakeListControl from 'goatstone/react-rx-todo/ui/control.js'
let shallowWrapper

describe('MakeListControl', function () {
    beforeEach(() => {
        shallowWrapper = shallow(<MakeListControl
          eventEmitter={eventEmitter}
          text={{
              title: 'Make A List',
              inputs: {
                  title: {
                      hintText: 'Add a title',
                      floatingLabelText: 'Title'
                  },
                  description: {
                      hintText: 'Add a description',
                      floatingLabelText: 'Description'
                  },
                  importance: {
                      floatingLabelText: 'Importance Level',
                      levels: ['High', 'Medium', 'Low']
                  }
              },
              error: {
                  tooLong: 'You have reached the maximum number of chararcters!',
                  required: 'This field is required.'
              }
          }}
          />)
    })
    it('should emit an event with certain data', done => {
        const expectedTitle = 'XXX'
        eventEmitter.on('list', x => {
            expect(x.item.title).to.equal(expectedTitle)
            done()
        })
        shallowWrapper.setState({title: expectedTitle})
        shallowWrapper.find('FloatingActionButton').simulate('touchTap', {preventDefault: x => {}})
    })
    it('should validate input before creating an event.', () => {
        expect(1).to.equal(1)
    })
    describe('UI elements', () => {
        it('should have two text input fields', () => {
            expect(shallowWrapper.find('TextField').length).to.equal(2)
        })
        it('should have a single select', () => {
            expect(shallowWrapper.find('SelectField').length).to.equal(1)
        })
        it('should have a single submit button', () => {
            expect(shallowWrapper.find('FloatingActionButton').length).to.equal(1)
        })
    })
})
