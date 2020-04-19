﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TravelAgency.DAL.Entities
{
    public class Hotel
    {
        public Hotel()
        {
            Orders = new HashSet<Orderr>();
        }

        [Key]
        public int HotelId { get; set; }

        [Required]
        [StringLength(50)]
        public string HotelName { get; set; }

        [Required]
        public int Cost { get; set; }

        [Required]
        [Range(1, 6)]
        public int Class { get; set; }

        [Required]
        [StringLength(500)]
        public string Description { get; set; }

        //public byte[] ImagePath { get; set; }
        public string ImagePath { get; set; }

        [Required]
        public int TourId { get; set; }
        public virtual Tour Tour { get; set; }

        public virtual ICollection<Orderr> Orders { get; set; }

    }
}
