import React, { Component } from 'react';

export class DeleteAuction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            auction: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();

        let url = "api/v1/auctions/" + this.props.match.params.id;
        let method = 'DELETE';

        let response = await fetch(url, {
            method: method,
            mode: 'cors'
        });

        if (response.ok) {
            alert('УСПЕШНО!!!');
            this.props.history.push('/auctionsA');
        }
    }

    async loadData() {
        let url = "api/v1/auctions/" + this.props.match.params.id;

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(results => this.setState({
                auction: results
            }))
        }
    }

    async componentDidMount() {
        await this.loadData();
    }

    renderCard() {
        console.log(this.state.auction);
        let endDate = new Date(this.state.auction.endDate)
        let uploadedDate = new Date(this.state.auction.uploadedDate);

        return (
            <div className="card shadow">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-10">
                            <p><b>RESERVER PRICE: </b>{this.state.auction.reservePrice}</p>
                            <p><b>CURRENT PRICE: </b>{this.state.auction.currentBiddingPrice}</p>
                            <p><b>END DATE: </b>{endDate.toLocaleDateString()}</p>
                            <p><b>UPLOADED DATE: </b>{uploadedDate.toLocaleDateString()}</p>
                        </div>                       
                            <input type="button" className="btn btn-outline-danger" onClick={this.handleSubmit} value="Удалить" />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="display-4">Вы действительно хотите удалить данный аукцион?</h3>
                    </div>
                    <div className="col-md-6">
                        {
                            this.renderCard()
                        }
                    </div>
                </div>
            </div>
        );
    }
}
