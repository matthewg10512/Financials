using Microsoft.Extensions.Configuration;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Financials.Services.Authentication
{
   public interface IAuthentication
    {

        public void AuthenticationToken(IConfiguration configuration);

        public void SetBearerToken(HttpClient client, IConfiguration configuration);

        public  void SetBearerTokenRest(RestRequest request, IConfiguration configuration);
    }
}
