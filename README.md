# goatstone.react-rx-todo

## Another Todo list in React

The purpose of this repository is to provide an example of a certain kind of architecture using React JS, Reactive Rx, the Material-UI component library and ES6.  It can be used as a starting point or a reference for similar projects. It can be used in order to test these technologies out in order to help you make decisions concerning future projects. It should be a documentation of best practices.

## [React](https://facebook.github.io/react/)

There are many ways to approach React. In this case, functional stateless components are favored over components with state. The only components with state are the top level component and Material-UI components which function as inputs for the user. For the most part the top level React component is reacting to events fired from streams.

## [ReactiveX](http://reactivex.io/) Streams

Much of the application logic can be thought of as events being fired from streams resulting in actions being triggered in listeners to those events. The streams are created at the top level script with the fromEvent method of the Rx.Observable object. The events themselves are NodeJS events.
A user action creates a Synthetic Event, which in turn generate a Node event. The application consists of 4 main streams

#### List Stream
 Creates and deletes list items.

#### Message Stream
 Use for the Display of messages.

#### Dialog Stream
 Controls the opening and closing and content of the dialog component.

#### Log Stream
Streams are merged into the log stream. Any event that occurs in a stream becomes easily loggable.

## [Material-UI](http://www.material-ui.com/) Component Library
One of the main reasons of using a library like React is to be able to use any widget that have been created with it. After reviewing several component libraries I choose Material-UI www.material-ui.com/. It seems to solve best, the problem spaces I have been working with most commonly. One of the main points of this library is that it follows guidelines documented at the [Material Design website](https://material.io/).

## [ES6](https://github.com/rse/es6-features)
This repository is provided as an example of ES6 best practices.

## Install

`git clone https://github.com/goatstone/react-rx-todo.git`

`npm install`

Enable absolute path namespace with a sym link

`ln -s PATH_TO_PROJECT/react-rx-todo/goatstone PATH_TO_PROJECT/react-rx-todo/node_modules/goatstone`

On my Linux system it looks like this:

`ln -s /home/goat/projects/react-rx-todo/goatstone /home/goat/projects/react-rx-todo/node_modules/goatstone`

`cd react-rx-todo`

`gulp`

Browser Sync

`PATH_TO_PROJECT/react-rx-todo/node_modules/browser-sync/bin/browser-sync.js start -f PATH_TO_PROJECT/react-rx-todo/dist/js`

On my Linux system it looks like this:

`/home/goat/projects/react-rx-todo/node_modules/browser-sync/bin/browser-sync.js start -f /home/goat/projects/react-rx-todo/dist/js`

## Namespace

The top level of the namespace it Goatstone. This is a name that is unique to the organization Goatstone. I have the organization name on github as well as the domain goatstone.com. This is my claim to the name and the namespace. You can be reasonably assured that this namespace will not collide with name spaces you may be using in the future.

## TODO:
* Complete test coverage
* I18n
