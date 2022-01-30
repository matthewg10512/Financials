using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Financials.Models;
using Financials.ResourceParameters;
using Financials.Services.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Financials.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StockScreenerAlertsHistoryController : ControllerBase
    {
        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public StockScreenerAlertsHistoryController(IConfiguration configuration, IAuthentication authentication)
        {
            _configuration = configuration;
            _authentication = authentication;
        }


        //

        [HttpGet()]
        //  [HttpHead]
       
        public async Task<List<StockScreenerAlertsHistoryDto>> SearchStockScreenerAlerts([FromQuery] StockScreenerAlertsHistorySearchResourceParameters screenerHistorySearchResourceParams)
        {

            _authentication.AuthenticationToken(_configuration);
            List<StockScreenerAlertsHistoryDto> stockScreenersAlertsHistory = new List<StockScreenerAlertsHistoryDto>();
            string details = "";

            using (var client = new HttpClient())
            {
                details += "url ";
                string apiUrl = _configuration.GetValue<string>("APIURL");

                string searchQuery = "";

                if (screenerHistorySearchResourceParams.StockScreenerId.HasValue)
                {
                    searchQuery += searchQuery == "" ? "?" : "&";
                    searchQuery += "StockScreenerId=" + screenerHistorySearchResourceParams.StockScreenerId;
                }


                if (screenerHistorySearchResourceParams.AlertDate.HasValue)
                {
                    searchQuery += searchQuery == "" ? "?" : "&";
                    searchQuery += "AlertDate=" + screenerHistorySearchResourceParams.AlertDate.Value.ToString("MM/dd/yyyy");
                }

                if (screenerHistorySearchResourceParams.AlertDateRangeEnd.HasValue)
                {
                    searchQuery += searchQuery == "" ? "?" : "&";
                    searchQuery += "AlertDateRangeEnd=" + screenerHistorySearchResourceParams.AlertDateRangeEnd.Value.ToString("MM/dd/yyyy");
                }

                if (screenerHistorySearchResourceParams.AlertDateRangeStart.HasValue)
                {
                    searchQuery += searchQuery == "" ? "?" : "&";
                    searchQuery += "AlertDateRangeStart=" + screenerHistorySearchResourceParams.AlertDateRangeStart.Value.ToString("MM/dd/yyyy");
                }




                var url = apiUrl + "StockScreenerAlertsHistory" + searchQuery;

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

                        stockScreenersAlertsHistory =
                              JsonConvert.DeserializeObject<List<StockScreenerAlertsHistoryDto>>(responseString);

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


            return stockScreenersAlertsHistory;
        }

    }
}
