import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import MakeListToolbar from 'goatstone/react-rx-todo/ui/toolbar'
const expectedTitle = 'ABC'
const expectedMenuItem = 'XYZ'
let spy
let shallowWrapper

describe('Toolbar', function () {
    beforeEach(() => {
        sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
        spy = sinon.spy()
        shallowWrapper = shallow(<MakeListToolbar
            title={expectedTitle}
            menuItems={[expectedMenuItem]}
            actions={{
                dialogList: spy,
                dialogAbout: spy
            }}
        />)
    })
    afterEach(() => {
        spy.reset()
        console.error.restore()
    })
    it('should throw an error if the correct props are not supplied', () => {
        function testFunc () {
            shallow(<MakeListToolbar />)
        }
        expect(testFunc).to.throw(Error)
    })
    it('should have the title provided ', () => {
        expect(shallowWrapper.find('ToolbarTitle').props().text).to.equal(expectedTitle)
    })
    it('should have the menu item provided', () => {
        expect(shallowWrapper.find('MenuItem').props().primaryText).to.equal(expectedMenuItem)
    })
    it('should have at least 2 toolbar groups', () => {
        expect(shallowWrapper.find('ToolbarGroup').length).to.be.at.least(2)
    })
    describe('Action button touchtap', () => {
        it('should generate the correct event', () => {
            shallowWrapper.find('FloatingActionButton').simulate('touchTap')
            expect(spy.calledOnce).to.be.true
        })
    })
    describe('Menu item touchtap', () => {
        it('should generate the correct event', () => {
            shallowWrapper.find('MenuItem').simulate('touchTap', {preventDefault: () => {}})
            expect(spy.calledOnce).to.be.true
        })
    })
})
