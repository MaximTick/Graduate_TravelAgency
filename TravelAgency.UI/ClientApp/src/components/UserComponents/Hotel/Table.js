import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="card mb-3 shadow">
                <div className="card-header text-center">
                    <h2>{this.props.name}</h2>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-10">
                            <p>COST: {this.props.cost}$</p>
                            <p>CLASS: {this.props.class}</p>
                            <p>DESCRIPTION: {this.props.description}</p>
                            <div>
                            <p>PHOTOS:</p>
                            <img style={{maxWidth: '100%'}} src={atob(this.props.imagePath)} />
                            </div>
                            
                        </div>
                        <div className="col-md-2 text-center">
                            <Link className="btn btn-outline-success" to={`/orders/${this.props.id}`}>ORDER</Link>
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
        if (this.props.data.length == 0) {
            return (
                <div className="text-center">
                    <h1>THIS TOUR DOESN'T HAVE HOTELS</h1>
                </div>
            );
        }

        return (
            <div className="mt-2">
                {
                    this.props.data.map(function (item) {
                        return <Item
                            key={item.hotelId}
                            id={item.hotelId}
                            name={item.hotelName}
                            class={item.class}
                            cost={item.cost}
                            description={item.description}
                            imagePath={item.imagePath}
                        />
                    })
                }
            </div>
        );
    }
}
