import React,{ Component } from 'react'

export default class EmailContainer extends Component{

  render(){
    return(
      <div className='container-fluid email-container text-white'>
        <div className='row justify-content-center'>
          <div className='col-6 mt-5 mb-5'>
            <div className='row justify-content-center m-3 p-3 email-div-row'>
              <div className='col-8 pr-0'>
                <div className='email-div rounded-pill m-3 p-3'>test@gmail.com</div>
              </div>
              <div className='col-2 pt-3 pl-0'>
                <span className='rounded-lg bg-dark p-3 justify-content-center'>
                    <i className="far fa-copy fa-2x text-secondary"></i>
                </span>
              </div>
            </div>
            <div className='row mb-2 mt-2 text-white'>
              <div className='col-12 p-0'>
                <div className='row mb-2 justify-content-center expire-counter'>
                  <div className='col-3 p-0'>
                    <p className='text-muted'>This Email will deleted after</p>
                  </div>
                  <div className='col-6'>
                    <div className='row justify-content-center'>
                      <div className='col-2 p-2 bg-light text-dark text-center rounded-lg m-2'>
                        <div className=''>2</div>
                      </div>
                      <div className='col-2 p-2 bg-light text-dark text-center rounded-lg m-2'>
                        <div className=''>0</div>
                      </div>
                      <span className='align-content-center'>:</span>
                      <div className='col-2 p-2 bg-light text-dark text-center rounded-lg m-2'>
                        <div className=''>0</div>
                      </div>
                      <div className='col-2 p-2 bg-light text-dark text-center rounded-lg m-2'>
                        <div className=''>0</div>
                      </div>
                    </div>
                  </div>
                  <div className='col-3'>
                    <p className='text-muted'>Minutes</p>
                  </div>
                </div>
                <div className='row justify-content-center mt-5'>
                  <div className='col-3'>
                    <div className='p-2 bg-secondary rounded-pill text-center'>
                      <span className='text-white'>Change Email</span>
                    </div>
                  </div>
                  <div className='col-3'>
                    <div className='p-2 bg-secondary rounded-pill text-center'>
                      <span className='text-white'>Delete Email</span>
                    </div>
                  </div>
                  <div className='col-3'>
                    <div className='p-2 bg-secondary rounded-pill text-center'>
                      <span className='text-white'>Send Email</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}