import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let endDate = new Date(this.props.endDate);
        let uploadedDate = new Date(this.props.uploadedDate);

        return (
            <div className="card shadow m-2">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-10">
                            <p><b>RESERVER PRICE: </b>{this.props.reservePrice}</p>
                            <p><b>CURRENT PRICE: </b>{this.props.currentBiddingPrice}</p>
                            <p><b>END DATE: </b>{endDate.toLocaleString()}</p>
                            <p><b>UPLOADED DATE: </b>{uploadedDate.toLocaleDateString()}</p>
                            <p><b>AUCTION STATUS: </b>{this.props.auctionStatus}</p>
                        </div>
                        <div className="col-md-2">
                            <Link className="btn btn-outline-danger" to={`/deleteAuction/${this.props.id}`}>DELETE</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class Table extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="">
                <Link className="btn btn-success" to={`/createAuction`}>CREATE</Link>

                <div>
                    {
                        this.props.data.map(function (item) {
                            return <Item
                                key={item.auctionId}
                                id={item.auctionId}
                                reservePrice={item.reservePrice}
                                buyoutPrice={item.buyoutPrice}
                                currentPrice={item.currentBiddingPrice}
                                uploadedDate={item.uploadedDate}
                                endDate={item.endDate}
                                auctionStatus={item.auctionStatus}
                            />
                        })
                    }
                </div>
            </div>
        );
    }
}
