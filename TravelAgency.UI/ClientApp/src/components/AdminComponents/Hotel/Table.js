import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td><b>{this.props.name}</b></td>
                <td>
                    <Link className="btn btn-warning" to={`/updateHotel/${this.props.id}`}>UPDATE</Link>
                </td>
                <td>
                    <Link className="btn btn-danger" to={`/deleteHotel/${this.props.id}`}>DELETE</Link>
                </td>
            </tr>
        );
    }
}

export class Table extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="text-center">
                <Link className="btn btn-success btn-block mb-3" to="/createHotel">CREATE</Link>

                <table className="table">
                    <thead>
                        <tr>
                            <th>HOTEL</th>
                            <th>UPDATE</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map(function (item) {
                                return <Item key={item.hotelId} id={item.hotelId} name={item.hotelName} />
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>HOTEL</th>
                            <th>UPDATE</th>
                            <th>DELETE</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}
