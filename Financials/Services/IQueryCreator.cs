using Financials.ResourceParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Services
{
    public interface IQueryCreator
    {
       string ProcessQuery(IResourceParameter resoureParameter);

    }
}
