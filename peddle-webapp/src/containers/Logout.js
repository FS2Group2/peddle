import React, {Component} from 'react';
import '../css/Login.css'
import {changeUser, setLoggedIn} from "../actions/userActions";
import {loadWishList} from "../actions/wishListActions";
import connect from "react-redux/es/connect/connect";
import {loadPurchaceList} from "../actions/purchaceActions";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedOut: false
    }
  }

  logout = () => {
    const {history, setLoggedIn, changeUser, clearWishList, clearPurchaseList} = this.props;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('logged');
    localStorage.removeItem('usr');
    this.setState({loggedOut: true});

    setTimeout(() => {history.push('/login');
      setLoggedIn(false);
      changeUser({});
      clearWishList();
      clearPurchaseList();
    }, 2000);
  };

  render() {

    return (
      <div className="about-page-root">
        {this.state.loggedOut ? <p className='logout-msg'>Good buy,
          {this.props.userState.currentUser.name}! Waiting for you again!</p> :
        <input type="button" className="login-btn" value={'Log out'} onClick={() => this.logout()}/>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userState: state.userReducer
});

const mapDispatchToProps = dispatch => {
  return {
    setLoggedIn: isLogged => {
      dispatch(setLoggedIn(isLogged))
    },
    changeUser: user => {
      dispatch(changeUser(user))
    },
    clearWishList: () => {
      dispatch(loadWishList([]))
    },
    clearPurchaseList: () => {
      dispatch(loadPurchaceList([]))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);