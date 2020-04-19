import React, { Component } from 'react';
import { Pagination } from './SharedComponents/Pagination';
import { Search } from './SharedComponents/Search';
import { TableU } from './UserComponents/Hotel/Table';
import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let date = new Date(this.props.endDate);
        return (
            
            <div className="card shadow m-3">
                <div className="card-header text-center">
                    <h4>{date.toLocaleString()}</h4>
                </div>
                <div className="m-4">
                    <p><b>RESERVE PRICE: </b>{this.props.reservePrice}</p>
                    <p><b>CURRENT PRICE: </b>{this.props.currentPrice}</p>
                    <Link className="btn btn-block btn-outline-dark" to={`/auctionsU`}>AUCTIONS</Link>
                </div>
            </div>
        );
    }
}

export class HotelU extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            list: new Array(),
            tempList: [],
            listTest: [],
            auctions: [],
            pageSize: 5,
            pageCurrent: 1,
            pageTotal: 1,
            totalRecords: 0,
            imagePath:[]
        };

        this.filterList = this.filterList.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.changeSizePage = this.changeSizePage.bind(this);
    }

    filterList(text) {
        let list = this.state.list;

        if (list.length != 0) {
            var filteredList = list.filter(function (item) {
                return item.hotelName.toLowerCase().search(text.toLowerCase()) !== -1;
            });

            this.setState({ tempList: filteredList });
        }
    }

    firstPage = async function () {
        let pageCurrent = 1;
        let pageSize = this.state.pageSize;

        let url = "api/v1/hotelsTemp/" + +pageSize + '/' + +pageCurrent;

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(res => {
                this.setState({ list: res[0], tempList: res[0], totalRecords: res[1], pageCurrent: pageCurrent })
                let pageTotal = Math.ceil(this.state.totalRecords / this.state.pageSize);
                this.setState({ pageTotal: pageTotal })
            });
        }
        else {
            alert(response.status);
        }
    }

    nextPage = async function () {
        let pageSize = this.state.pageSize;
        let pageCurrent = this.state.pageCurrent;
        let pageTotal = this.state.pageTotal;

        pageCurrent++;

        if (pageCurrent <= pageTotal) {
            let url = "api/v1/hotelsTemp/" + +pageSize + '/' + +pageCurrent;
            let response = await fetch(url)

            if (response.ok) {
                let responseJson = response.json();
                responseJson.then(res => this.setState({ list: res[0], tempList: res[0], pageCurrent: pageCurrent }));
            }
            else {
                alert(response.status);
            }
        }
    }

    prevPage = async function () {
        let pageSize = this.state.pageSize;
        let pageCurrent = this.state.pageCurrent;

        pageCurrent--;

        if (pageCurrent >= 1) {
            let url = "api/v1/hotelsTemp/" + pageSize + '/' + pageCurrent;
            let response = await fetch(url);

            if (response.ok) {
                let responseJson = response.json();
                responseJson.then(res => this.setState({ list: res[0], tempList: res[0], pageCurrent: pageCurrent }));
            }
            else {
                alert(response.status);
            }
        }
    }

    lastPage = async function () {
        let pageSize = this.state.pageSize;
        let pageCurrent = this.state.pageCurrent;
        let pageTotal = this.state.pageTotal;

        if (pageCurrent !== pageTotal) {
            pageCurrent = pageTotal;

            let url = "api/v1/hotelsTemp/" + pageSize + '/' + pageCurrent;
            let response = await fetch(url);

            if (response.ok) {
                let responseJson = response.json();
                responseJson.then(res => this.setState({ list: res[0], tempList: res[0], pageCurrent: pageCurrent }));
            }
            else {
                alert(response.status);
            }
        }
    }

    changeSizePage = async function (e) {
        let pageSize = e.target.value;
        let pageCurrent = 1;

        let pageTotal = Math.ceil(this.state.totalRecords / pageSize);
        this.setState({ pageTotal: pageTotal });

        if (pageCurrent > pageTotal) {
            pageCurrent = pageTotal;
        }

        let url = "api/v1/hotelsTemp/" + pageSize + '/' + pageCurrent;
        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();
            responseJson.then(res => this.setState({ list: res[0], tempList: res[0], pageCurrent: pageCurrent, pageSize: pageSize }));
        }
        else {
            alert(response.status);
        }
    }

    async componentDidMount() {
        let status = 1;
        let url = "api/v1/auctionsLast/" + status;
        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();
            responseJson.then(res => this.setState({ auctions: res }));
        }
        else {
            alert(response.status);
        }

        await this.firstPage();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="jumbotron">
                            <h1 className="display-4">Hello, these are HOTELS</h1>
                            <p className="lead">Here you can see hotels! Choose something and let's go with us to travel.</p>
                        </div>
                        <div className="">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <Link className="breadcrumb-item" to={`/`}>Home</Link>
                                    <li className="breadcrumb-item active" aria-current="page">Hotels</li>
                                </ol>
                            </nav>
                        </div>
                        <div id="search">
                            <Search filter={this.filterList} />
                        </div>
                        <div id="chapters" className="mt-3">
                            <TableU data={this.state.tempList} />
                        </div>
                        <div id="pagination" className="mt-3 mb-3">
                            <Pagination
                                pageTotal={this.state.pageTotal}
                                pageCurrent={this.state.pageCurrent}
                                nextPage={this.nextPage}
                                firstPage={this.firstPage}
                                prevPage={this.prevPage}
                                lastPage={this.lastPage}
                                changeSizePage={this.changeSizePage}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header text-center">
                                <h2>AUCTION</h2>
                            </div>
                            <div className="card-body">
                                {
                                    this.state.auctions.map(function (item) {
                                        return <Item
                                            key={item.auctionId}
                                            id={item.auctionId}
                                            reservePrice={item.reservePrice}
                                            currentPrice={item.currentBiddingPrice}
                                            endDate={item.endDate}
                                        />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
