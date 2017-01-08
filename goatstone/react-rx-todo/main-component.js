import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
// goatstone imports
import ListMake from 'goatstone/ui/list-make'
import MakeListToolbar from 'goatstone/react-rx-todo/ui/toolbar'
import {About, Settings} from 'goatstone/react-rx-todo/ui/dialog-content.js'
import MakeListControl from 'goatstone/react-rx-todo/ui/control.js'
const log = require('goatstone/log/log.js')

class App extends React.Component {
    constructor (props) {
        super(props)
        this.arr = []
        this.count = 0
        this.state = {
            mainList: [],
            isOpenSnackBar: true,
            isOpenDialog: false,
            msg: 'Welcome To Make A List!',
            dialogContent: <About />
        }
    }
    componentDidMount () {
        // listStream
        this.props.listStream
        .filter(x => x.action === 'add')
        .map(x => x.item)
        .subscribe(item => {
            item.id = this.count++
            this.arr.push(item)
            this.setState({
                mainList: this.arr,
                isOpenDialog: false,
                isOpenSnackBar: true,
                msg: 'Item added'
            })
        }, err => log('e', err), () => log('c'))
        this.props.listStream
        .filter(x => x.action === 'delete')
        .map(x => x.id)
        .subscribe(id => {
            const i = this.arr.findIndex(x => x.id === id)
            this.arr.splice(i, 1)
            this.setState({
                mainList: this.arr,
                isOpenSnackBar: true,
                msg: 'Item removed'
            })
        }, err => log('e', err), () => log('c'))
        // generate some list items
        this.props.eventEmitter.emit('list', {
            action: 'add',
            item: {title: 'Click on the plus symbol and make some todo items', description: 'try to do this soon', importance: 0}
        })
        this.props.eventEmitter.emit('list', {
            action: 'add',
            item: {title: 'Make list items', description: 'OK', importance: 1}
        })
        this.props.eventEmitter.emit('list', {
            action: 'add',
            item: {title: 'Delete some list items when done', description: 'This should not take too long', importance: 2}
        })
        // dialogStream
        this.props.dialogStream.filter(x => x.content === 'settings')
        .subscribe(x => {
            this.setState({
                dialogContent: <Settings />,
                isOpenDialog: true
            })
        }, err => log('e', err), () => log('c'))
        this.props.dialogStream.filter(x => x.content === 'list')
        .subscribe(x => {
            const makeListControl = <MakeListControl
                eventEmitter={this.props.eventEmitter}
                text={{
                    title: 'Add a todo',
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
            />
            this.setState({
                dialogContent: makeListControl,
                isOpenDialog: true
            })
        }, err => log('e', err), () => log('c'))
        this.props.dialogStream.filter(x => x.content === 'about')
        .subscribe(x => {
            this.setState({
                dialogContent: <About />,
                isOpenDialog: true
            })
        }, err => log('e', err), () => log('c'))
    }
    render () {
        const actions = [
            <FlatButton
             label="Close"
             primary={true}
             onTouchTap={x => {
                 this.setState({isOpenDialog: false})
             }}
            />
        ]
        return (
          <MuiThemeProvider>
          <div>
            <MakeListToolbar
              title={'TODO'}
              menuItems={['About']}
              actions={{
                  dialogList: e => {
                      e.preventDefault() // This prevents ghost click.
                      this.props.eventEmitter.emit('dialog',
                      {content: 'list'})
                  },
                  dialogAbout: e => {
                      e.preventDefault() // This prevents ghost click.
                      this.props.eventEmitter.emit('dialog',
                      {content: 'about'})
                  }
              }}
            />
            <ListMake
              arr={this.state.mainList}
              eventEmitter={this.props.eventEmitter} />
            <Dialog
              actions={actions}
              modal={false}
              open={this.state.isOpenDialog}
              onRequestClose={x => {
                  this.setState({isOpenDialog: false})
              }}
            >
              {this.state.dialogContent}
            </Dialog>
            <Snackbar
              open={this.state.isOpenSnackBar}
              message={this.state.msg}
              autoHideDuration={3000}
              onRequestClose={x => {
                  this.setState({isOpenSnackBar: false})
              }}
            />
          </div>
          </MuiThemeProvider>
        )
    }
}
App.propTypes = {
    eventEmitter: React.PropTypes.object.isRequired,
    dialogStream: React.PropTypes.object.isRequired,
    messageStream: React.PropTypes.object.isRequired,
    listStream: React.PropTypes.object.isRequired
}
export default App
