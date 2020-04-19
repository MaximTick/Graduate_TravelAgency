using System.Collections.Generic;
using System.Threading.Tasks;
using TravelAgency.DAL.Entities;

namespace TravelAgency.DAL.Interfaces
{
    public interface IAuctionRepository
    {
        Task<bool> Create(Auction entity);
        Task<bool> Delete(Auction entity);
        Task<bool> Update(Auction entity);
        Task<Auction> GetById(int id);
        IEnumerable<Auction> GetByStatus(int status);
    }
}
