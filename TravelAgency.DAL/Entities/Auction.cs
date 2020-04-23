using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TravelAgency.DAL.Entities
{
    public class Auction
    {
        public Auction()
        {
        }

        [Key]
        public int AuctionId { get; set; }
        [Required]
        public int ReservePrice { get; set; }

        [Required]
        public int BuyoutPrice { get; set; }

        public int CurrentBiddingPrice { get; set; }

        [Required]
        public DateTime UploadedDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public int AuctionStatus { get; set; }

        [Required]
        public int TourId { get; set; }
       // public string UserId { get; set; }
        public virtual Tour Tour { get; set; }
       // public virtual User User { get; set; }


    }
}
