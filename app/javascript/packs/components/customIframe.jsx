import React, { Component } from 'react'

export default class CustomIframe extends  Component {
  render() {
    return (
     <iframe srcDoc={this.props.content} className='custom-iframe'/>
    )
  }
};