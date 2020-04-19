﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);

        this.updateComment = this.updateComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    async updateComment() {
        let form = new FormData();
        form.append('commentId', this.props.id);

        let url = "api/v1/comments";
        let method = 'PUT';

        let response = await fetch(url, {
            method: method,
            mode: 'cors',
            body: form
        })

        if (response.ok) {
            alert("SUCCESS!!!");
        } else {
            alert("Error");
        }
    }

    async deleteComment() {
        let url = "api/v1/comments/" + this.props.id;
        let method = 'DELETE';

        let response = await fetch(url, {
            method: method,
            mode: 'cors'
        });

        if (response.ok) {
            alert('Success!!!');
        } else {
            alert("Error");
        }
    }

    render() {
        return (
            <tr>
                <td><b>{this.props.name}</b></td>
                <td>
                    <input type="button" value="ACCESS" className="btn btn-outline-warning" onClick={this.updateComment} />
                </td>
                <td>
                    <input type="button" value="DELETE" className="btn btn-outline-danger" onClick={this.deleteComment} />
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
                <table className="table">
                    <thead>
                        <tr>
                            <th>MESSAGE</th>
                            <th>UPDATE</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map(function (item) {
                                return <Item key={item.commentId} id={item.commentId} name={item.message} />
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>MESSAGE</th>
                            <th>UPDATE</th>
                            <th>DELETE</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}
