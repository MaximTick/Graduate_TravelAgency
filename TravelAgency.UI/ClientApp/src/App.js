import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Profile } from './components/UserComponents/Profile/Profile';
import { Login } from './components/Login';
import { Register } from './components/Registration';
import { TourA } from './components/AdminComponents/Tour/Index';
import { TourU } from './components/Tour';
import { TourHotel } from './components/UserComponents/Tour/Hotel';
import { CreateTour } from './components/AdminComponents/Tour/Create';
import { UpdateTour } from './components/AdminComponents/Tour/Update';
import { DeleteTour } from './components/AdminComponents/Tour/Delete';
import { HotelA } from './components/AdminComponents/Hotel/Index';
import { HotelU } from './components/Hotel';
import { CreateHotel } from './components/AdminComponents/Hotel/Create';
import { UpdateHotel } from './components/AdminComponents/Hotel/Update';
import { DeleteHotel } from './components/AdminComponents/Hotel/Delete';
import { Order } from './components/UserComponents/Order/Order';
import { Comment } from './components/AdminComponents/Comment/Index';
import { AuctionA } from './components/AdminComponents/Auction/Index';
import { AuctionU } from './components/Auction';
import { AuctionInfo } from './components/UserComponents/Auction/Info';
import { CreateAuction } from './components/AdminComponents/Auction/Create';
import { DeleteAuction } from './components/AdminComponents/Auction/Delete';
import { ShowOrder } from './components/UserComponents/Order/ShowOrder';
import { DeleteOrder } from './components/UserComponents/Order/DeleteOrder';



export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/profile' component={Profile} />

                <Route path='/toursA' component={TourA} />
                <Route path='/hotelsTour/:id' component={TourHotel} />
                <Route path='/toursU' component={TourU} />
                <Route path='/toursB' component={TourU} />
                <Route path='/createTour' component={CreateTour} />
                <Route path='/updateTour/:id' component={UpdateTour} />
                <Route path='/deleteTour/:id' component={DeleteTour} />

                <Route path='/comments' component={Comment} />

                <Route path='/hotelsA' component={HotelA} />
                <Route path='/hotelsU' component={HotelU} />
                <Route path='/createHotel' component={CreateHotel} />
                <Route path='/updateHotel/:id' component={UpdateHotel} />
                <Route path='/deleteHotel/:id' component={DeleteHotel} />

                <Route path='/auctionsA' component={AuctionA} />
                <Route path='/auctionsU' component={AuctionU} />
                <Route path='/infoAuction/:id' component={AuctionInfo} />
                <Route path='/createAuction' component={CreateAuction} />
                <Route path='/deleteAuction/:id' component={DeleteAuction} />

                <Route path='/orders/:id' component={Order} />
                <Route path='/showOrders/:id' component={ShowOrder} />
                <Route path='/deleteOrders/:id' component={DeleteOrder} />
            </Layout>
        );
    }
}
