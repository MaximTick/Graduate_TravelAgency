using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TravelAgency.DAL.Entities
{
    public class Tour
    {
        public Tour()
        {
            Hotels = new HashSet<Hotel>();
            Comments = new HashSet<Comment>();
            Auctions = new HashSet<Auction>();
        }

        [Key]
        public int TourId { get; set; }

        [Required]
        [StringLength(70)]
        public string TourName { get; set; }

        [Required]
        [StringLength(70)]
        public string Country { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        public int Cost { get; set; }
        public string ImagePath { get; set; }

        [StringLength(2000)]
        public string AboutTour { get; set; }

        [StringLength(30)]
        public string Transport { get; set; }

        [Required]
        public DateTime DateStart { get; set; }

        public virtual ICollection<Hotel> Hotels { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Auction> Auctions { get; set; }
    }
}
