import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class AuctionInfo extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: {}
        }
    }

    async loadData() {
        let url = "api/v1/ordersInfo/" + this.props.match.params.id;

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(results => {
                this.setState({ order: results })
            });
        }
    }

    async componentDidMount() {
        await this.loadData();
    }


    render() {
        let date = new Date(this.state.order.dateStart);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <Link className="breadcrumb-item" to={`/`}>Home</Link>
                                <Link className="breadcrumb-item" to={`/auctionsU`}>Auctions</Link>
                                <li className="breadcrumb-item active" aria-current="page">Auction Info</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="card shadow">
                            <div className="card-header text-center">
                                <h2 className="display-4">{this.state.order.tourName}</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-10" style={{ fontSize: "22px" }}>
                                        <p><b>DATE START:</b> {date.toLocaleDateString()}</p>
                                        <p><b>COUNTRY:</b> {this.state.order.country}</p>
                                        <p><b>DURATION:</b> {this.state.order.duration} days</p>
                                        <img style={{maxWidth: '100%'}} src={(this.state.order.imagePathT)} alt="imagePathT"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="card shadow">
                            <div className="card-header text-center">
                                <h2 className="display-4">{this.state.order.hotelName}</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-10" style={{ fontSize: "22px" }}>
                                        <p><b>CLASS:</b> {this.state.order.class}<span className="text-warning">★</span></p>
                                        <p><b>DESCRIPTION:</b> {this.state.order.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
