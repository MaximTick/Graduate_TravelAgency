import React, { Component } from 'react';

export class Pagination extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="form-inline">
                    <span className="btn btn-dark mr-1 disabled pagination-info">Page <span id="page-index-info">{this.props.pageCurrent}</span> of <span id="page-total">{this.props.pageTotal}</span></span>
                    <input type="button" className="btn mr-1 btn-outline-dark first-button" value="FIRST" onClick={this.props.firstPage} />
                    <input type="button" className="btn mr-1 btn-outline-dark second-button" value="PREVIOUS" onClick={this.props.prevPage} />
                    <input type="button" className="btn mr-1 btn-dark pagination-info" id="page-index" value={this.props.pageCurrent} disabled />
                    <input type="button" className="btn mr-1 btn-outline-dark second-button " value="NEXT" onClick={this.props.nextPage} />
                    <input type="button" className="btn mr-1 btn-outline-dark first-button" value="LAST" onClick={this.props.lastPage} />
                    <select className="form-control" id="page-size" style={{ width: "70px" }} onClick={this.props.changeSizePage}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
            </div>
        );
    }
}
