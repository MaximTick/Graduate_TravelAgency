import React, { Component } from 'react';
//import { Card, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let date = new Date(this.props.dateStart)

        return (
            <div className="card mb-3 shadow">
                <div className="card-header text-center">
                    <h2>{this.props.name}</h2>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-10">
                            <p>COST: {this.props.cost}$</p>
                            <p>DATE START: {date.toLocaleDateString()}</p>
                            <p>COUNTRY: {this.props.country}</p>
                            <p>DURATION: {this.props.duration} days</p>
                            <div>
                            <img style={{maxWidth: '100%'}} src={atob(this.props.imagePath)} />
                            </div>
                        </div>
                        <div className="col-md-2 text-center">
                            <Link className="btn btn-outline-warning" to={`/hotelsTour/${this.props.id}`}>SHOW HOTELS</Link>
                        </div>
                    </div>
                  
                </div>
            </div>
        );
    }
}

export class TableU extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="mt-2">
                {
                    this.props.data.map(function (item) {
                        return <Item
                            key={item.tourId}
                            id={item.tourId}
                            name={item.tourName}
                            duration={item.duration}
                            dateStart={item.dateStart}
                            cost={item.cost}
                            country={item.country}
                            imagePath={item.imagePath}
                        />
                    })
                }
            </div>
        );
    }
}
