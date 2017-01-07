import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import App from 'goatstone/react-rx-todo/main-component'
import Rx from 'rx'
import events from 'events'
const eventEmitter = new events.EventEmitter()
const dialogStream = Rx.Observable.fromEvent(eventEmitter, 'dialog')
const messageStream = Rx.Observable.fromEvent(eventEmitter, 'message')
const listStream = Rx.Observable.fromEvent(eventEmitter, 'list')
let shallowWrapper

describe('App', function () {
    beforeEach(() => {
        shallowWrapper = shallow(<App
          eventEmitter={eventEmitter}
          dialogStream={dialogStream}
          messageStream={messageStream}
          listStream={listStream}
        />)
    })
    describe('UI elements', () => {
        it('should have a toolbar', () => {
            expect(shallowWrapper.find('MakeListToolbar').length).to.equal(1)
        })
        it('should have a list of items', () => {
            expect(shallowWrapper.find('ListMake').length).to.equal(1)
        })
    })
})
