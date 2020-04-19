using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.Model.ViewModels.Auction;
using TravelAgency.UI.Contracts;

namespace TravelAgency.UI.Controllers
{
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionService _auctionService;

        public AuctionController(IAuctionService auctionService)
        {
            _auctionService = auctionService;
        }

        [HttpPost(RoutesApi.Auction.Create)]
        public async Task<IActionResult> Create([FromForm]AuctionVM model)
        {
            var result = await _auctionService.Create(model);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut(RoutesApi.Auction.Update)]
        public async Task<IActionResult> Update([FromForm]AuctionVM model)
        {
            string email = User.Identity.Name;

            if (email != null)
            {
                var result = await _auctionService.Update(model);

                if (result)
                {
                    return Ok();
                }
            }

            return BadRequest();
        }

        [HttpPut(RoutesApi.Auction.Buy)]
        public async Task<IActionResult> Buy([FromForm]AuctionVM model)
        {
            var result = await _auctionService.Buy(model);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete(RoutesApi.Auction.Delete)]
        public async Task<IActionResult> Delete(int auctionId)
        {
            var result = await _auctionService.Delete(auctionId);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpGet(RoutesApi.Auction.GetById)]
        public async Task<IActionResult> GetById(int auctionId)
        {
            var auction = await _auctionService.GetById(auctionId);

            return Ok(auction);
        }

        [HttpGet(RoutesApi.Auction.GetByStatus)]
        public async Task<IActionResult> GetByStatus(int status)
        {
            var auctions = _auctionService.GetByStatus(status);

            return Ok(auctions);
        }

        [HttpGet(RoutesApi.Auction.GetByLast)]
        public async Task<IActionResult> GetByLast(int status)
        {
            var auctions = _auctionService.GetByLastThree(status);

            return Ok(auctions);
        }
    }
}