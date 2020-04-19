using System.Threading.Tasks;

namespace TravelAgency.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        ITourRepository Tours { get; }
        IHotelRepository Hotels { get; }
        Task<int> SaveChanges();
    }
}
