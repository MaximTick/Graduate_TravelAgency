import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody
} from 'reactstrap';

import { Link } from 'react-router-dom';

export class Order extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: {},
            comments: [],
            message: "", messageIsValid: false
        }

        this.onChangeMessage = this.onChangeMessage.bind(this);

        this.modalOrder = this.modalOrder.bind(this);
        this.modalMessage = this.modalMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    validateMessage(message) {
        return message.length > 2;
    }

    onChangeMessage(e) {
        let val = e.target.value;
        let valid = this.validateMessage(val);
        this.setState({ message: val, messageIsValid: valid });
    }

    modalMessage() {
        this.setState({
            modalMessage: !this.state.modalMessage
        });
    }

    modalOrder() {
        this.setState({
            modalOrder: !this.state.modalOrder
        });
    }

    async handleSubmit() {
        let form = new FormData();
        form.append('cost', this.state.order.totalCost);
        form.append('hotelId', this.state.order.hotelId);

        let url = "api/v1/orders";
        let method = 'POST';

        let response = await fetch(url, {
            method: method,
            mode: 'cors',
            body: form
        })

        if (response.ok) {
            alert("SUCCESS!!!");
            this.props.history.push('/hotelsU');
        } else {
            this.props.history.push('/login');
        }
    }

    async handleSendMessage() {
        if (this.state.messageIsValid == true) {
            let form = new FormData();
            form.append('message', this.state.message);
            form.append('tourId', this.state.order.tourId);

            let url = "api/v1/comments";
            let method = 'POST';

            let response = await fetch(url, {
                method: method,
                mode: 'cors',
                body: form
            })

            if (response.ok) {
                alert("Message sent!");
            } else {
                this.props.history.push('/login');
            }
        }

    }

    async loadData() {
        let url = "api/v1/ordersInfo/" + this.props.match.params.id;
        let urlComments = "api/v1/comments/" + this.props.match.params.id;

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(results => {
                this.setState({ order: results })
            });
        }

        let responseComment = await fetch(urlComments);

        if (responseComment.ok) {
            let responseJson = responseComment.json();

            responseJson.then(results => {
                this.setState({ comments: results.result });
            })
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
                                <Link className="breadcrumb-item" to={`/hotelsU`}>Hotels</Link>
                                <li className="breadcrumb-item active" aria-current="page">Order</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="alert alert-info">
                            <span style={{ fontSize: "30px" }}><b>PRICE:</b> {this.state.order.totalCost}$</span>

                        </div>
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
                                        <img style={{maxWidth: '100%'}} src={(this.state.order.imagePathH)} alt="imagePathH"/>
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
                <div className="row">
                    <div className="col-md-12">
                        <div className="alert alert-success">
                            <input type="button" className="btn btn-success" value="ORDER" onClick={this.modalOrder} />
                        </div>
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-12">
                        <div className="text-center">
                            <h1 className="display-4">COMMENTS</h1>
                            <hr style={{ borderBottom: "1px solid black" }} />
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <input type="button" className="btn btn-primary" value="ADD COMMENT" onClick={this.modalMessage} />
                            </div>
                            <div className="card-body">
                                {
                                    this.state.comments.map(function (item) {
                                        let date = new Date(item.dateMessage);

                                        return (
                                            <div key={item.commentId} className="card mb-2">
                                                <div className="card-body">
                                                    <h4>{item.email}</h4>
                                                    <p>{item.message}</p>
                                                    <small style={{ color: "gray" }}>{date.toLocaleDateString()}</small>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.modalOrder} >
                    <ModalHeader toggle={this.modalOrder} >
                        ORDER
                        </ModalHeader>
                    <ModalBody>
                        <p>ARE YOU SURE THAT YOU WANT TO ORDER THIS TOUR?</p>
                        <button className="btn btn-outline-primary" onClick={this.handleSubmit}>ORDER</button>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalMessage} >
                    <ModalHeader toggle={this.modalMessage} >
                        COMMENT
                        </ModalHeader>
                    <ModalBody>
                        <input type="text" placeholder="Message" onChange={this.onChangeMessage} className="form-control" value={this.state.message} />
                        <small>Length message must be not less than 3 charecters</small>
                        <br />
                        <br />
                        <button className="btn btn-outline-primary" onClick={this.handleSendMessage}>SEND</button>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
