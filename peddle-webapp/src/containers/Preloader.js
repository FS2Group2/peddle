import React, {Component} from 'react';
import '../css/preloader.css';

class Preloader extends Component{
  render(){
    return(
        <div className='preloader'>
          <div className="preloader-1">
            <div className='load'>Loading</div>
            <span className="line line-1"/>
            <span className="line line-2"/>
            <span className="line line-3"/>
            <span className="line line-4"/>
            <span className="line line-5"/>
            <span className="line line-6"/>
            <span className="line line-7"/>
            <span className="line line-8"/>
            <span className="line line-9"/>
          </div>
        </div>
    )
  }
}

export default Preloader;