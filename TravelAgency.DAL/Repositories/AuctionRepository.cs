using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelAgency.DAL.Context;
using TravelAgency.DAL.Entities;
using TravelAgency.DAL.Interfaces;

namespace TravelAgency.DAL.Repositories
{
    public class AuctionRepository : IAuctionRepository
    {
        private readonly DatabaseContext _context;

        public AuctionRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<bool> Create(Auction entity)
        {
            await _context.Auctions
                .AddAsync(entity);

            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<bool> Delete(Auction entity)
        {
            _context.Auctions
            .Remove(entity);

            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<Auction> GetById(int id)
        {
            return await _context.Auctions
                .FindAsync(id);
        }

        public IEnumerable<Auction> GetByStatus(int status)
        {
            return _context.Auctions
                .Where(x => x.AuctionStatus == status);
        }

        public async Task<bool> Update(Auction entity)
        {
            _context.Auctions
             .Update(entity);

            var result = await _context.SaveChangesAsync();

            return result > 0;
        }
    }
}
