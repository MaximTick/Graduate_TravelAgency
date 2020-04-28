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
                            <dt className="col-sm-4">Цена:</dt>
                            <dd className="col-sm-8">{this.props.cost}$</dd>
                            <dt className="col-sm-4">Дата отаправления:</dt>
                            <dd className="col-sm-8">{date.toLocaleDateString()}</dd>
                            <dt className="col-sm-4">Длительность:</dt>
                            <dd className="col-sm-8">{this.props.duration} дней</dd>
                            <dt className="col-sm-4">Место отправления:</dt>
                            <dd className="col-sm-8">{this.props.countryFrom}</dd>
                            <dt className="col-sm-4">Место прибытия:</dt>
                            <dd className="col-sm-8">{this.props.countryTo}</dd>
                            <dt className="col-sm-4">Транспорт:</dt>
                            <dd className="col-sm-8">{this.props.transport}</dd>
                            <dt className="col-sm-4">Описание тура:</dt>
                            <dd className="col-sm-8">{this.props.aboutTour}</dd>
                        </dl>
                    </div>
                    <div className="col-md-2 text-center">
                         <Link className="btn btn-outline-warning" to={`/hotelsTour/${this.props.id}`}>Выбрать отель</Link>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}> 
                            <div style={{maxWidth: '80%'}}>
                                <img style={{width: '100%', display: 'block', marginRight: 'auto', marginLeft: 'auto'}} style={{maxWidth: '100%'}} src={atob(this.props.imagePath)} />
                            </div> 
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
                            sale={item.sale}
                            countryFrom={item.countryFrom}
                            countryTo={item.countryTo}
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
