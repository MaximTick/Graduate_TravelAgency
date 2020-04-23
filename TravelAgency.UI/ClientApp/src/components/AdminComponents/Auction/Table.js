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
                            <p><b>Зарезервированная цена: </b>{this.props.reservePrice}</p>
                            <p><b>Текущая цена: </b>{this.props.currentBiddingPrice}</p>
                            <p><b>Дествителен до: </b>{endDate.toLocaleString()}</p>
                            <p><b>Дата начала: </b>{uploadedDate.toLocaleDateString()}</p>
                            <p><b>Статус: </b>{this.props.auctionStatus}</p>
                        </div>
                        <div className="col-md-2">
                            <Link className="btn btn-outline-danger" to={`/deleteAuction/${this.props.id}`}>Удалить</Link>
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
                <Link className="btn btn-success" to={`/createAuction`}>Создать</Link>

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
