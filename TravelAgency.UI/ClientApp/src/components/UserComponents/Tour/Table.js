import React, { Component } from 'react';
//import { Card, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let date = new Date(this.props.dateStart)

        return (
            <div className="card mb-3 shadow">
                <div className="card-header text-center">
                    <h2>{this.props.name}</h2>
                </div>
                <div className="card-body">
                <div className="row"> 
                    <div className="col-md-10">                   
                        <dl className="row">
                            <dt className="col-sm-3">Цена:</dt>
                            <dd className="col-sm-9">{this.props.cost}$</dd>
                            <dt className="col-sm-3">Дата отаправления:</dt>
                            <dd className="col-sm-9">{date.toLocaleDateString()}</dd>
                            <dt className="col-sm-3">Страна:</dt>
                            <dd className="col-sm-9">{this.props.country}</dd>
                            <dt className="col-sm-3">Транспорт:</dt>
                            <dd className="col-sm-9">{this.props.transport}</dd>
                            <dt className="col-sm-3">Описание тура:</dt>
                            <dd className="col-sm-9">{this.props.aboutTour}</dd>
                        </dl>
                        <div>
                            <img style={{maxWidth: '100%'}} src={atob(this.props.imagePath)} />
                        </div>
                    </div>
                    <div className="col-md-2 text-center">
                            <Link className="btn btn-outline-warning" to={`/hotelsTour/${this.props.id}`}>Просмотр отелей</Link>
                    </div>
                 </div>                               
                </div>
            </div>
        );
    }
}

export class TableU extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="mt-2">
                {
                    this.props.data.map(function (item) {
                        return <Item
                            key={item.tourId}
                            id={item.tourId}
                            name={item.tourName}
                            duration={item.duration}
                            dateStart={item.dateStart}
                            cost={item.cost}
                            country={item.country}
                            transport={item.transport}
                            aboutTour={item.aboutTour}
                            imagePath={item.imagePath}
                        />
                    })
                }
            </div>
        );
    }
}
