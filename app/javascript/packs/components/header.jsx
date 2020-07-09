import React,{ Component } from 'react'

export default class Header extends Component{

  render(){
    return(
      <nav className="navbar navbar-light bg-light">
        <div className='container'>
          <span className="navbar-brand mb-0 h1">
            MaiLet
          </span>
        </div>
      </nav>
    )
  }
}