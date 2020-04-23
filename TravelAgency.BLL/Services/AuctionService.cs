using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.DAL.Entities;
using TravelAgency.DAL.Interfaces;
using TravelAgency.Model.ViewModels.Auction;

namespace TravelAgency.BLL.Services
{
    public class AuctionService : IAuctionService
    {
        private readonly IAuctionRepository _auctionRepository;

        public AuctionService(IAuctionRepository auctionRepository)
        {
            _auctionRepository = auctionRepository;
        }

        public async Task<bool> Buy(AuctionVM model)
        {
            var auction = await _auctionRepository
                .GetById(model.AuctionId);

            if (auction == null)
            {
                return false;
            }

            auction.AuctionStatus = 2;
            auction.BuyoutPrice = model.CurrentBiddingPrice;

            var updated = await _auctionRepository
                .Update(auction);

            return updated;
        }

        public async Task<bool> Create(AuctionVM model)
        {
            return await _auctionRepository.Create(new Auction()
            {
                AuctionStatus = 1,
                BuyoutPrice = model.ReservePrice,
                CurrentBiddingPrice = model.ReservePrice,
                ReservePrice = model.ReservePrice,
                EndDate = model.EndDate,
                TourId = model.TourId,
               // UserId = model.UserId,
                UploadedDate = DateTime.Now
            });
        }

        public async Task<bool> Delete(int id)
        {
            var auction = await _auctionRepository.GetById(id);

            if (auction == null)
            {
                return false;
            }

            return await _auctionRepository
                .Delete(auction);
        }

        public async Task<AuctionVM> GetById(int id)
        {
            var auction = await _auctionRepository.GetById(id);

            if (auction == null)
            {
                return new AuctionVM();
            }

            return new AuctionVM()
            {
                AuctionId = auction.AuctionId,
                AuctionStatus = auction.AuctionStatus,
                BuyoutPrice = auction.BuyoutPrice,
                CurrentBiddingPrice = auction.CurrentBiddingPrice,
                EndDate = auction.EndDate,
                UploadedDate = auction.UploadedDate,
                ReservePrice = auction.ReservePrice,
               // UserId = auction.UserId,
                TourId = auction.TourId
            };
        }

        public IEnumerable<AuctionVM> GetByLastThree(int status)
        {
            return _auctionRepository.GetByStatus(status)
               .Select(x => new AuctionVM()
               {
                   AuctionId = x.AuctionId,
                   AuctionStatus = x.AuctionStatus,
                   BuyoutPrice = x.BuyoutPrice,
                   CurrentBiddingPrice = x.CurrentBiddingPrice,
                   EndDate = x.EndDate,
                   ReservePrice = x.ReservePrice,
                   TourId = x.TourId,
                   //UserId = x.UserId,
                   UploadedDate = x.UploadedDate
               }).OrderByDescending(x => x.AuctionId)
                 .Take(3);
        }

        public IEnumerable<AuctionVM> GetByStatus(int status)
        {
            return _auctionRepository.GetByStatus(status)
                .Select(x => new AuctionVM()
                {
                    AuctionId = x.AuctionId,
                    AuctionStatus = x.AuctionStatus,
                    BuyoutPrice = x.BuyoutPrice,
                    CurrentBiddingPrice = x.CurrentBiddingPrice,
                    EndDate = x.EndDate,
                    ReservePrice = x.ReservePrice,
                    TourId = x.TourId,
                   // UserId = x.UserId,
                    UploadedDate = x.UploadedDate
                });
        }

        public async Task<bool> Update(AuctionVM model)
        {
            var auction = await _auctionRepository
               .GetById(model.AuctionId);

            if (auction == null)
            {
                return false;
            }

            auction.AuctionStatus = 1;
            auction.CurrentBiddingPrice = model.CurrentBiddingPrice;

            var updated = await _auctionRepository
                .Update(auction);

            return updated;
        }
    }
}
