import React from 'react';
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css';



class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoding: false,
            hello: "Max Ha Zoem"
        };
    }


    


  render() {
    
    
    return (
      <div>
        <h1>Main</h1>
      </div>
    );
  }
}

export default Main;


