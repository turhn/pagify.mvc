using System;
using System.Linq;
using System.Linq.Expressions;

namespace Pagify.Mvc.Extensions
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> OrderByField<T>(this IQueryable<T> q, string sortField, string sortType)
        {
            var param = Expression.Parameter(typeof (T), "p");
            var prop = Expression.Property(param, sortField);
            var exp = Expression.Lambda(prop, param);
            Type[] types = {q.ElementType, exp.Body.Type};
            var mce = Expression.Call(typeof (Queryable), sortType, types, q.Expression, exp);
            return q.Provider.CreateQuery<T>(mce);
        }
    }
}