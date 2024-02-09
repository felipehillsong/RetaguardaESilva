using RetaguardaESilva.Persistence.Data;
using RetaguardaESilva.Persistence.Contratos;

namespace RetaguardaESilva.Persistence.Persistencias
{
    public class GeralPersist : IGeralPersist
    {
        private readonly RetaguardaESilvaContext _context;
        public GeralPersist(RetaguardaESilvaContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }        
    }
}
