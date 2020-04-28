import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Telega.css'
import './backgr.css'


class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let date = new Date(this.props.dateStart)
        return (
            
            <div className="card mb-3 shadow">
                <div className="card-header text-center">
                    <h2>{this.props.belTourName}</h2>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="text-justify col-lg-12">
                            <dl className="row">
                                <dt className="col-sm-4">Цена:</dt>
                                <dd className="col-sm-8">{this.props.cost} BYN</dd>
                                {this.props.sale > 0 ? <dt className="col-sm-4" style={{color: "red"}}>Цена с учетом скидки {this.props.sale} %:</dt> : <span className="col-sm-4"></span> }
                                {this.props.sale > 0 ? <dd className="col-sm-8" style={{color: "red", fontWeight: "bold"}}>{this.props.cost * (100 - this.props.sale) / 100} BYN</dd> : <span className="col-sm-8"></span>}
                                <dt className="col-sm-4">Дата отправления:</dt>
                                <dd className="col-sm-8">{date.toLocaleDateString()}</dd>      
                                <dt className="col-sm-4">Продолжительность:</dt>
                                <dd className="col-sm-8">{this.props.duration} часов</dd>
                                <dt className="col-sm-4">Место отправления:</dt>
                                <dd className="col-sm-8">{this.props.placeFrom}</dd>
                                <dt className="col-sm-4">Место прибытия:</dt>
                                <dd className="col-sm-8">{this.props.placeTo}</dd>
                                <dt className="col-sm-4">Транспорт:</dt>
                                <dd className="col-sm-8">{this.props.transport}</dd>                                
                            </dl>
                        <div>
                                <img style={{maxWidth: '100%'}} src={atob(this.props.imagePath)} />
                            </div>
                            <br></br>
                            <p className="col-sm-11">{this.props.aboutTour}</p>  
                    </div>
                      
                    </div>
                </div>
                <div className="tour_vkl">
					<p>&nbsp;</p>
		        <p className="desk_tel tel_sht">
			        <span id="stickcall" className="call-from-site on-mob">
				        <i id="stickcalli" className="fa fa-phone"></i>
			        </span>Звоните прямо сейчас!
	            <a href="tel:+375 29 295 06 07">+375 29 295 06 07</a> или 
                <a href="tel:+375 33 360 81 00">+375 33 360 81 00</a></p>
                <p className="mob_tel tel_sht">
	                <span id="stickcall" className="call-from-site on-mob">
                     <i id="stickcalli" className="fa fa-phone"></i>
                    </span>Звоните прямо сейчас! <br></br>
	               <a href="tel:+375 29 295 06 07">+375 29 295 06 07</a><br></br>
                   <a href="tel:+375 33 360 81 00">+375 33 360 81 00</a></p>
                    <p>&nbsp;</p>
				</div>
 
            </div>
        );
    }
}

export class TableBU extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (this.props.data.length == 0) {
            return (
                <div className="text-center">
                    <h1>У данного тура нет отеля(:</h1>
                </div>
            );
        }

        return (
            <div className="mt-2">
                {
                    this.props.data.map(function (item) {
                        return <Item
                        key={item.belTourId}
                        id={item.belTourId}
                        belTourName={item.belTourName}
                        duration={item.duration}
                        dateStart={item.dateStart}
                        cost={item.cost}
                        sale={item.sale}
                        placeFrom={item.placeFrom}
                        placeTo={item.placeTo}
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
