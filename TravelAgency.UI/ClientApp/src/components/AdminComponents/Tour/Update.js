import React, { Component } from 'react';

export class UpdateTour extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tourId: 0,
            name: "", nameIsValid: true,
            country: "", countryIsValid: true,
            duration: 0, durationIsValid: true,
            cost: 0, costIsValid: true,
            imagePath:[],
            dateStart: new Date(), dateStartIsValid: true,
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateName(name) {
        return name.length > 2 && name.length <= 70;
    }

    onChangeName(e) {
        let val = e.target.value;
        let valid = this.validateName(val);
        this.setState({ name: val, nameIsValid: valid });
    }

    validateCountry(country) {
        return country.length > 2 && country.length <= 70;
    }

    onChangeCountry(e) {
        let val = e.target.value;
        let valid = this.validateCountry(val);
        this.setState({ country: val, countryIsValid: valid });
    }

    validateDuration(duration) {
        return duration > 0 && duration <= 20;
    }

    onChangeDuration(e) {
        let val = e.target.value;
        let valid = this.validateDuration(val);
        this.setState({ duration: val, durationIsValid: valid });
    }

    validateCost(cost) {
        return cost > 0 && cost < 1000000;
    }

    onChangeCost(e) {
        let val = e.target.value;
        let valid = this.validateCost(val);
        this.setState({ cost: val, costIsValid: valid });
    }

    validateDate(date) {
        let currentDate = new Date();
        let selectedDate = new Date(date);
        return selectedDate.getTime() > currentDate.getTime();
    }

    onChangeDate(e) {
        let val = e.target.value;
        let valid = this.validateDate(val);
        this.setState({ dateStart: val, dateStartIsValid: valid });
    }

    setFile(e) {    
        var render = new FileReader();
        render.readAsDataURL(e.target.files[0]);
        let _this = this;
        render.onload = function(){
            _this.setState({ imagePath: btoa(render.result)});
           // _this.setState({ imagePath: window.btoa(unescape(encodeURIComponent(render.result)))});
        }     
       // this.setState({ imagePath: e.target.files[0]});
    }//btoa(render.result)

    async handleSubmit(e) {
        e.preventDefault();

        if (this.state.nameIsValid == true && this.state.costIsValid == true &&
            this.state.durationIsValid == true && this.state.dateStartIsValid == true &&
            this.state.countryIsValid == true) {

            let form = new FormData();
            form.append('tourId', this.state.tourId);
            form.append('tourName', this.state.name);
            form.append('country', this.state.country);
            form.append('dateStart', this.state.dateStart);
            form.append('cost', this.state.cost);
            form.append('duration', this.state.duration);
            form.append('imagePath', this.state.imagePath);

            let url = "api/v1/tours";
            let method = 'PUT';

            let response = await fetch(url, {
                method: method,
                mode: 'cors',
                body: form
            })

            if (response.ok) {
                alert("SUCCESS!!");
                this.props.history.push('/toursA');
            } else {
                alert("ERROR!!");
            }
        }
    }

    async loadData() {
        let url = "api/v1/tours/" + this.props.match.params.id;

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(results => this.setState({
                tourId: results.tourId,
                name: results.tourName,
                duration: results.duration,
                dateStart: results.dateStart,
                cost: results.cost,
                country: results.country,
                imagePath: results.imagePath
            }));
        }
    }

    async componentDidMount() {
        await this.loadData();
    }

    renderForm() {
        let nameColor = this.state.nameIsValid === true ? "green" : "red";
        let costColor = this.state.costIsValid === true ? "green" : "red";
        let durationColor = this.state.durationIsValid === true ? "green" : "red";
        let dateColor = this.state.dateStartIsValid === true ? "green" : "red";
        let countryColor = this.state.countryIsValid === true ? "green" : "red";

        return (
            <div className="card mb-3">
                <div className="card-header text-center">
                    <h2>UPDATE TOUR</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" value={this.state.name} placeholder="Tour" className="form-control" onChange={this.onChangeName} style={{ borderColor: nameColor }} />
                        </div>
                        <div className="form-group">
                            <input type="number" value={this.state.cost}  placeholder="Cost" className="form-control" onChange={this.onChangeCost} style={{ borderColor: costColor }} />
                        </div>
                        <div className="form-group">
                            <input type="number" value={this.state.duration} placeholder="Duration" className="form-control" onChange={this.onChangeDuration} style={{ borderColor: durationColor }} />
                        </div>
                        <div className="form-group">
                            <input type="date" value={this.state.dateStart}  placeholder="Date start" className="form-control" onChange={this.onChangeDate} style={{ borderColor: dateColor }} />
                        </div>
                        <div className="form-group">
                            <input type="text" value={this.state.country} placeholder="Country" className="form-control" onChange={this.onChangeCountry} style={{ borderColor: countryColor }} />
                        </div>
                        <div className="form-group">    
                            <div>  
                                <input type="file" name="imagePath"  onChange={e => this.setFile(e)} /> 
                            </div>    
                        </div> 
                        <input type="submit" value="Save" className="btn btn-success" />
                    </form>
                </div>
            </div>

        ); //multiple="multiple"
    }

    renderCard() {
        let date = new Date(this.state.dateStart)

        return (
            <div className="card">
                <div className="card-header text-center">
                    <h2>TOUR</h2>
                </div>
                <div className="card-body text-center">
                    <h3>{this.state.name}</h3>
                    <p>{this.state.cost}$</p>
                    <p>{date.toLocaleDateString()}</p>
                    <p>{this.state.country}</p>
                    <p>{this.state.duration} days</p>
                    <img style={{maxWidth: '100%'}} src={decodeURIComponent(escape(window.atob(this.state.imagePath)))} alt="image" />                    
                </div>
            </div>
        );
    }
    //<img style={{maxWidth: '100%'}} src={(atob(this.state.imagePath))} alt="image" />

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
