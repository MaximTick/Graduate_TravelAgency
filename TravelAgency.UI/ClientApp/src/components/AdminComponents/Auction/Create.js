import React, { Component } from 'react';

export class CreateAuction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reservePrice: 0, reservePriceIsValid: false,
            endDate: new Date(), endDateIsValid: false,
            tourId: 0, tourIdIsValid: false,
            tourList: []
        }

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeReservePrice = this.onChangeReservePrice.bind(this);
        this.onChangeTour = this.onChangeTour.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateTour(val) {
        return val > 0;
    }

    onChangeTour(e) {
        let val = e.target.value;
        let valid = this.validateTour(val);
        this.setState({ tourId: val, tourIdIsValid: valid });
    }

    validateDate(val) {
        let currentDate = new Date();
        let selectedDate = new Date(val);
        return selectedDate.getTime() > currentDate.getTime();
    }

    onChangeDate(e) {
        let val = e.target.value;
        let valid = this.validateDate(val);
        this.setState({ endDate: val, endDateIsValid: valid });
    }

    validatePrice(val) {
        return val > 1;
    }

    onChangeReservePrice(e) {
        let val = e.target.value;
        let valid = this.validatePrice(val);
        this.setState({ reservePrice: val, reservePriceIsValid: valid });
    }


    async handleSubmit(e) {
        e.preventDefault();

        if (this.state.tourIdIsValid == true && this.state.endDateIsValid == true && this.state.reservePriceIsValid == true) {
            let form = new FormData();
            form.append('reservePrice', this.state.reservePrice);
            form.append('endDate', this.state.endDate);
            form.append('tourId', this.state.tourId);

            let url = "api/v1/auctions";
            let method = 'POST';

            let response = await fetch(url, {
                method: method,
                mode: 'cors',
                body: form
            })

            if (response.ok) {
                alert("SUCCESS!!!");
                this.props.history.push('/auctionsA');
            } else {
                alert("Error");
            }
        }
    }

    async loadData() {
        let url = "api/v1/tours";

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();
            responseJson.then(results => this.setState({ tourList: results }));
        }
    }

    async componentDidMount() {
        await this.loadData();
    }

    renderForm() {
        let reservePriceColor = this.state.reservePriceIsValid == true ? "green" : "red";
        let dateColor = this.state.endDateIsValid == true ? "green" : "red";
        let tourColor = this.state.tourIdIsValid == true ? "green" : "red";

        return (
            <div className="card mb-3">
                <div className="card-header text-center">
                    <h2>CREATE AUCTION</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="number" className="form-control" placeholder="RESERVE PRICE" onChange={this.onChangeReservePrice} style={{ borderColor: reservePriceColor }} />
                        </div>
                        <div className="form-group">
                            <input type="datetime-local" className="form-control" placeholder="END DATE" onChange={this.onChangeDate} style={{ borderColor: dateColor }} />
                        </div>
                        <div className="form-group">
                            <select className="form-control" onChange={this.onChangeTour} style={{ borderColor: tourColor }}>
                                <option value="0">Select tour</option>
                                {
                                    this.state.tourList.map(tour => {
                                        return <option key={tour.tourId} value={tour.tourId}>{tour.tourName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <input type="submit" value="Save" className="btn btn-success" />
                    </form>
                </div>
            </div>
        );
    }

    renderCard() {
        let date = new Date(this.state.endDate);

        return (
            <div className="card">
                <div className="card-header text-center">
                    <h2>AUCTION</h2>
                </div>
                <div className="card-body text-center">
                    <p>COST: {this.state.reservePrice}$</p>
                    <p>END DATE: {date.toLocaleDateString()}</p>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        {
                            this.renderForm()
                        }
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
