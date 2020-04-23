import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from './UserComponents/Auction/Table';

export class AuctionU extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: new Array()
        };
    }

    async loadData() {
        let status = 1;

        let url = "api/v1/auctionsStatus/" + status;

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(res => {
                console.log(res);

                this.setState({ list: res });
            });
        }
        else {
            alert(response.status);
        }
    }

    async componentDidMount() {
        await this.loadData();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <Link className="breadcrumb-item" to={`/`}>Главная</Link>
                                <li className="breadcrumb-item active" aria-current="page">Аукционы</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <Table data={this.state.list} />
                    </div>
                    <div className="col-md-4">
                        <div className="card m-2">
                            <div className="card-header text-center">
                                <h1>Аукционы</h1>
                            </div>
                            <div className="card-body text-center">
                                <p style={{ fontSize: "22px" }}>Играют они - выигрываете Вы!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
