import React from 'react';
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css';
import {login} from '../api/ClientApi'
import '../assets/styles/pos.css'
import Menu from '../components/Menu'
import KeyPad from '../components/KeyPad'
import commands from '../assets/pictures/commands.png'

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginState:"please login",
            button: "login"
        };

         this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

       this.props.router.push('/login');

        let loginInput = this.refs.login;
        console.log(this.refs.login.value);
        login("1","1").then(respone => {
            console.log(respone);
            if(respone.data.access_token)
            {
            }
        })
    }

  render() {
    let state = this.state.loginState;
    return (
        <div className="pos">
            <Menu/>
                     <div className="box">
                         <KeyPad/>
                     </div>
                    <div className="commads">
                     </div>


        </div>

    );
  }
}

export default Main;
