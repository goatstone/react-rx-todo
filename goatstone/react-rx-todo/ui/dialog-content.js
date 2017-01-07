import React from 'react'
import BuildIcon from 'material-ui/svg-icons/action/build'
import SettingsIcon from 'material-ui/svg-icons/action/settings'

const About = props => (
    <div>
      <BuildIcon />
      <h3>Todo</h3>
      <p> Create todo items with a title, description and importance level.</p>
    </div>
  )
const Settings = props => (
  <div>
    <SettingsIcon />
    <h3>Settings</h3>
  </div>
)
export {About, Settings}
