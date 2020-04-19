import React, { Component } from 'react';
import { Table } from './Table';

export class AuctionA extends Component {
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
            <section>
                <div className="mt-3">
                    <Table data={this.state.list} />
                </div>
            </section>
        );
    }
}
