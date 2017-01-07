import React from 'react'
import events from 'events'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import injectTapEventPlugin from 'react-tap-event-plugin'
// injectTapEventPlugin()
const eventEmitter = new events.EventEmitter()
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import ListMake from 'goatstone/ui/list-make'

let spy
let shallowWrapper
let deepWrapper
const expectedItem = {
    id: 0,
    title: 'a',
    description: 'b',
    importance: 0
}
describe('ListMake', function () {
    beforeEach(() => {
        // sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
        spy = sinon.spy()
        const item = {
            id: 1,
            title: 'a',
            description: 'b',
            importance: 0
        }
        shallowWrapper = shallow(
          <ListMake
            eventEmitter={eventEmitter}
            arr={[item]}
        />)
        deepWrapper = mount(
          <MuiThemeProvider>
          <ListMake
            eventEmitter={eventEmitter}
            arr={[expectedItem]}
        />
        </MuiThemeProvider>
      )
    })
    afterEach(() => {
        spy.reset()
    })
    it('should display a row for each array item', () => {
        expect(shallowWrapper.find('ListItem').length).to.be.at.least(1)
    })
    describe('should generate events on touchtap of "clear" icon', () => {
        it('should generate the correct event', done => {
            eventEmitter.on('list', x => {
                expect(x.id).to.equal(expectedItem.id)
                expect(x.action).to.equal('delete')
                done()
            })
            deepWrapper.find('ListItem').props().rightIcon.props.onTouchTap({id: 'eee'})
        })
    })
})
