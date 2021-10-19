using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Financials.Services;
using Financials.Services.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Financials.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PreferredSecurityController : ControllerBase
    {


        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public PreferredSecurityController(IConfiguration configuration, IAuthentication authentication)
        {
            _configuration = configuration;
            _authentication = authentication;
        }

        [HttpGet]
        public async Task<IEnumerable<PreferredSecurity>> GetAsync()
        {
            List<PreferredSecurity> info = new List<PreferredSecurity>();
            _authentication.AuthenticationToken(_configuration);

            using (var client = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "preferredsecurities";
                _authentication.SetBearerToken(client, _configuration);
                client.DefaultRequestHeaders
                   .Accept
                        .Add(new MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header
                var response = client.GetAsync(url).Result;

                if (response.IsSuccessStatusCode)
                {
                    // by calling .Result you are performing a synchronous call
                    var responseContent = response.Content;

                    // by calling .Result you are synchronously reading the result
                    string responseString = responseContent.ReadAsStringAsync().Result;


                    try
                    {

                        
                             info=  JsonConvert.DeserializeObject<List<PreferredSecurity>>(responseString);
                        
                    }
                    catch (Exception ex)
                    {

                    }
                    Console.WriteLine(responseString);
                }
            }

            return info.ToArray();
        }
    }
}
