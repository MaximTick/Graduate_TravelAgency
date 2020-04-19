using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TravelAgency.DAL.Entities;
using TravelAgency.Model.ViewModels.Image;
using TravelAgency.DAL.Context;
using TravelAgency.UI.Contracts;


namespace TravelAgency.UI.Controllers
{

    [ApiController]
    public class ImageController : ControllerBase
    {
        //DatabaseContext _context;

        //[HttpGet(RoutesApi.Images.Create)]
        //public void CreateImage([FromForm] ImageVM img)
        //{
        //    Image image = new Image { FileName = img.FileName };
        //    if (img.Image != null)
        //    {
        //        byte[] imageData = null;
        //        using (var binaryReader = new BinaryReader(img.Image.OpenReadStream()))
        //        {
        //            imageData = binaryReader.ReadBytes((int)img.Image.Length);
        //        }
        //        image.Picture = imageData;
        //    }
        //    _context.Images.Add(image);
        //    _context.SaveChanges();
        //}

    }
}