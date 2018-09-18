import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchDataFromApi} from "../actions/fetchDataActions";
import {transfersBackward, transfersForward} from "../constants/queryTypes";

class Transfers extends Component {

  arrivalTime = (dTime, duration) => {
    let t = new Date(dTime);
    t.setHours(t.getHours() + duration);
    return t;
  };

  fetchTransfer() {
    const {transferType, transferProps, loadTransfers} = this.props;
    let cityFrom, cityTo, dateFrom, dateTo, queryType;
    if (transferType === 'FORWARD') {
      cityFrom = transferProps.cityTransferDepartToEvent;
      cityTo = transferProps.eventCity;
      dateFrom = transferProps.dateTransferToEvent1;
      dateTo = transferProps.dateTransferToEvent2;
      queryType = transfersForward;
    } else if (transferType === 'BACKWARD') {
      cityFrom = transferProps.eventCity;
      cityTo = transferProps.cityTransferArrivalFromEvent;
      dateFrom = transferProps.dateTransferFromEvent1;
      dateTo = transferProps.dateTransferFromEvent2;
      queryType = transfersBackward;
    }
    const query = {
      cityFrom: cityFrom,
      cityTo: cityTo,
      dateFrom: dateFrom,
      dateTo: dateTo
    };
    loadTransfers(queryType, query)
  }

  componentDidMount() {
    this.fetchTransfer()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.transferProps.cityTransferDepartToEvent !== this.props.transferProps.cityTransferDepartToEvent ||
      prevProps.transferProps.cityTransferArrivalFromEvent !== this.props.transferProps.cityTransferArrivalFromEvent ||
      prevProps.loggedUser.currentUser.cityName !== this.props.loggedUser.currentUser.cityName
    ) {
      this.fetchTransfer()
    }
  }


  render() {
    const {addTransfer, transferProps, transferType} = this.props;
    let transfers = [];

    let cityFrom, cityTo;
    if (transferType === 'FORWARD') {
      cityFrom = transferProps.cityTransferDepartToEvent;
      cityTo = transferProps.eventCity;
      transfers = transferProps.transfersForward;
    } else if (transferType === 'BACKWARD') {
      cityFrom = transferProps.eventCity;
      cityTo = transferProps.cityTransferArrivalFromEvent;
      transfers = transferProps.transfersBackward;
    }

    return (
      <div>
        {/*<input type="button" onClick={() => this.fetchTransfers()} value={'Find transfers'}/>*/}
        <p className='container-header-p'>Transfer from {cityFrom} to {cityTo}</p>
        {transfers[0] && transfers.map(t =>
          <div key={transfers.id} className='transfer-item'>
            <div className='transportTypeName'>
              <p>
                <span className='transfer-item-header'>Type: </span> {t.transportTypeName}
              </p>
            </div>
            <div className='transfer-time'>
              <p><span className='transfer-item-header'>Depart: </span>{new Date(t.departTime).toLocaleString()}</p>
            </div>
            <div className='transfer-time'>
              <p><span
                className='transfer-item-header'>Arrival: </span>{this.arrivalTime(t.departTime, t.duration).toLocaleString()}
              </p>
            </div>

            <div className='transfer-duration'>
              <p>
                <span className='transfer-item-header'>Travel time: </span>{t.duration}h
              </p>
            </div>
            <div className='depart-city'>
              <p>
                <span className='transfer-item-header'>Depart. city: </span>{t.fromCityName}
              </p>
            </div>
            <div className='arrival-city'>
              <p>
                <span className='transfer-item-header'>Arriv. city: </span>{t.toCityName}
              </p>
            </div>
            <div className='transfer-number'>
              <p>
                <span className='transfer-item-header'> #: </span>{t.number}
              </p>
            </div>
            <div className='transfer-price'>
              <p>
                <span className='transfer-item-header'>Ticket price: </span>${t.price}
              </p>
            </div>
            <input type="button" className='btn purchase-btn transfer-btn' value='Buy ticket'
                   onClick={() => addTransfer(t)}/>
          </div>
        )}
      </div>
    )
  }
}

const
  mapStateToProps = (state) => {
    return {
      isLogged: state.userReducer.loggedIn,
      loggedUser: state.userReducer,
      transferProps: state.transferReducer
    }
  };

const
  mapDispatchToProps = (dispatch) => {
    return {
      loadTransfers: (queryType, query) => {
        dispatch(fetchDataFromApi(queryType, query))
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)

(
  Transfers
)
;