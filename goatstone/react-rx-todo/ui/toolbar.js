import React from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {MenuItem} from 'material-ui/Menu'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import Divider from 'material-ui/Divider'

const MakeListToolbar = props => {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle text={props.title} style={{marginLeft: '20px'}} />
        </ToolbarGroup>
        <ToolbarGroup>
            <FloatingActionButton style={{marginRight: '20px'}} mini={true}
                onTouchTap={props.actions.dialogList}>
              <ContentAdd />
            </FloatingActionButton>
            <Divider />
             <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                  <MenuItem primaryText={props.menuItems[0]}
                      onTouchTap={props.actions.dialogAbout}
                  />
              </IconMenu>
            </ToolbarGroup>
        </Toolbar>
    )
}
MakeListToolbar.propTypes = {
    title: React.PropTypes.string.isRequired,
    menuItems: React.PropTypes.array.isRequired,
    actions: React.PropTypes.objectOf(React.PropTypes.func)
}

export default MakeListToolbar
