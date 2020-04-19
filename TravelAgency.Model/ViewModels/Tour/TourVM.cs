using System;

namespace TravelAgency.Model.ViewModels.Tour
{
    public class TourVM
    {
        public int TourId { get; set; }
        public string TourName { get; set; }
        public string Country { get; set; }
        public int Duration { get; set; }
        public int Cost { get; set; }
        public string ImagePath { get; set; }
        public DateTime DateStart { get; set; }
    }
}
