using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.DAL.Entities
{
   public  class Picture
    {
        public int Id { get; set; }
        public int TourId { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }

       // public virtual BelTour BelTour { get; set; }
    }
}
