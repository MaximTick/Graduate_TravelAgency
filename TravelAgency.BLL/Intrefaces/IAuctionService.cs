using System.Collections.Generic;
using System.Threading.Tasks;
using TravelAgency.Model.ViewModels.Auction;

namespace TravelAgency.BLL.Intrefaces
{
    public interface IAuctionService
    {
        Task<bool> Create(AuctionVM model);
        Task<bool> Delete(int id);
        Task<bool> Update(AuctionVM model);
        Task<AuctionVM> GetById(int id);
        IEnumerable<AuctionVM> GetByStatus(int status);
        IEnumerable<AuctionVM> GetByLastThree(int status);
        Task<bool> Buy(AuctionVM model);
    }
}
