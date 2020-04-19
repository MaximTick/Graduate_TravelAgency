import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Modal, ModalHeader, ModalBody
} from 'reactstrap';

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cost: 0, costIsValid: false
        }

        this.modalCost = this.modalCost.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateCost(val) {
        return val > this.props.reservePrice && val > this.props.currentPrice;
    }

    onChangeCost(e) {
        let val = e.target.value;
        let valid = this.validateCost(val);
        this.setState({ cost: val, costIsValid: valid });
    }

    modalCost() {
        this.setState({
            modalCost: !this.state.modalCost
        });
    }

    async handleSubmit(e) {
        if (this.state.costIsValid == true) {
            let form = new FormData();
            form.append('auctionId', this.props.id);
            form.append('currentBiddingPrice', this.state.cost);

            let url = "api/v1/auctions";
            let method = 'PUT';

            let response = await fetch(url, {
                method: method,
                mode: 'cors',
                body: form
            })

            if (response.ok) {
                alert("SUCCESS!!!");
                window.location.reload();
            } else {
                alert("You need authorize!");
            }
        }
    }

    render() {
        let endDate = new Date(this.props.endDate);

        let costColor = this.state.costIsValid == true ? "green" : "gray";

        return (
            <div className="card shadow m-2">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-10">
                            <p><b>RESERVER PRICE: </b>{this.props.reservePrice}</p>
                            <p><b>CURRENT PRICE: </b>{this.props.currentPrice}</p>
                            <p><b>END DATE: </b>{endDate.toLocaleString()}</p>
                        </div>
                        <div className="col-md-2">
                            <Link className="btn btn-outline-info m-1" to={`/infoAuction/${this.props.tourId}`}>INFO</Link>
                            <input type="button" className="btn btn-primary m-1" value="BUY" onClick={this.modalCost} />
                        </div>
                    </div>
                </div>

                <Modal isOpen={this.state.modalCost} >
                    <ModalHeader toggle={this.modalCost} >
                        COST
                        </ModalHeader>
                    <ModalBody>
                        <form >                          
                            <div className="form-group">
                                <input type="number" placeholder="Cost" className="form-control" onChange={this.onChangeCost} style={{ borderColor: costColor }} />
                            </div>

                            <input type="button" value="Buy" onClick={this.handleSubmit} className="btn btn-success" />
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export class Table extends Component {
    constructor(props) {
        super(props);

    }

    renderContent() {
        return (
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
                    imagePath={item.imagePath}
                    tourId={item.tourId}
                />
            })
        );
    }

    render() {
        let content = "EMPTY....";

        if (this.props.data.length != 0) {
            content = this.renderContent();
        }
        return (
            <div className="">
                <div>
                    {
                        content
                    }
                </div>
            </div>
        );
    }
}
