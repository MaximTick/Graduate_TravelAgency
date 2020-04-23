using System;

namespace TravelAgency.Model.ViewModels.Auction
{
    public class AuctionVM
    {
        public int AuctionId { get; set; }
        public int ReservePrice { get; set; }
        public int BuyoutPrice { get; set; }
        public int CurrentBiddingPrice { get; set; }
        public DateTime UploadedDate { get; set; }
        public DateTime EndDate { get; set; }
        public int AuctionStatus { get; set; }
        public int TourId { get; set; }
        public string UserId { get; set; }
    }
}
