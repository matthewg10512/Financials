using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Financials.Models;
using Financials.Services.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Financials.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StockScreenerAlertTypesController : ControllerBase
    {

        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public StockScreenerAlertTypesController(IConfiguration configuration, IAuthentication authentication)
        {
            _configuration = configuration;
            _authentication = authentication;
        }


        
        public async Task<List<StockScreenerAlertTypeDto>> GetAsync()
        {

            _authentication.AuthenticationToken(_configuration);
            List< StockScreenerAlertTypeDto> stockScreenerAlertTypes = new List<StockScreenerAlertTypeDto>();
            string details = "";

            using (var client = new HttpClient())
            {
                details += "url ";
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "StockScreenerAlertTypes";
                details += "urlHit";
                _authentication.SetBearerToken(client, _configuration);
                var response = client.GetAsync(url).Result;

                if (response.IsSuccessStatusCode)
                {
                    // by calling .Result you are performing a synchronous call
                    var responseContent = response.Content;

                    // by calling .Result you are synchronously reading the result
                    string responseString = responseContent.ReadAsStringAsync().Result;


                    try
                    {

                        stockScreenerAlertTypes =
                              JsonConvert.DeserializeObject<List<StockScreenerAlertTypeDto>>(responseString);

                    }
                    catch (Exception ex)
                    {
                        details += " ex error" + ex.Message;
                    }
                    Console.WriteLine(responseString);
                }
                else
                {
                    details += " urlfailure";
                }
            }


            return stockScreenerAlertTypes;


        }
    }
}
