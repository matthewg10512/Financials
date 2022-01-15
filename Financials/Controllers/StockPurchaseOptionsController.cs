using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Financials.Models;
using Financials.ResourceParameters;
using Financials.Services.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Financials.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class StockPurchaseOptionsController : ControllerBase
    {


        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public StockPurchaseOptionsController(IConfiguration configuration, IAuthentication authentication)
        {
            _configuration = configuration;
            _authentication = authentication;
        }


        [HttpGet]
        public async Task<IEnumerable<StockPurchaseOptionDto>> GetStockPurchaseOptions([FromQuery] StockPurchaseOptionsResourceParameters stockPurOptionResourceParameters)
        {
            List<StockPurchaseOptionDto> info = new List<StockPurchaseOptionDto>();
         
            _authentication.AuthenticationToken(_configuration);
            string queryString = GetQueryString(stockPurOptionResourceParameters);
            using (var client = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "StockPurchaseOptions" + queryString;


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
                        info = JsonConvert.DeserializeObject<List<StockPurchaseOptionDto>>(responseString);

                    }
                    catch (Exception ex)
                    {

                    }
                    Console.WriteLine(responseString);
                }


            }
            return info;
        }

        private string GetQueryString(StockPurchaseOptionsResourceParameters stockPurOptionResourceParameters)
        {
            string searchQuery = "";
            if (stockPurOptionResourceParameters.priorPurchaseEstimateSharesRangeLow.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "priorPurchaseEstimateSharesRangeLow=" + stockPurOptionResourceParameters.priorPurchaseEstimateSharesRangeLow;
            }

            if (stockPurOptionResourceParameters.securityVolumeRangeLow.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "securityVolumeRangeLow=" + stockPurOptionResourceParameters.securityVolumeRangeLow;
            }


            if (stockPurOptionResourceParameters.securityLastModifiedRangeLow.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "securityLastModifiedRangeLow=" + stockPurOptionResourceParameters.securityLastModifiedRangeLow.Value.ToString("MM/dd/yyyy");
            }

            if (stockPurOptionResourceParameters.securitypercentChangeRangeHigh.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "securitypercentChangeRangeHigh=" + stockPurOptionResourceParameters.securitypercentChangeRangeHigh;
            }

            if (stockPurOptionResourceParameters.priorPurchaseEstimateYearlyPercentRangeLow.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "priorPurchaseEstimateYearlyPercentRangeLow=" + stockPurOptionResourceParameters.priorPurchaseEstimateYearlyPercentRangeLow;
            }

            if (stockPurOptionResourceParameters.securityPercentDropperType != null && stockPurOptionResourceParameters.securityPercentDropperType != "")
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "securityPercentDropperType=" + stockPurOptionResourceParameters.securityPercentDropperType;
            }
            /*



        public decimal? priorPurchaseEstimateYearlyPercentRangeLow { get; set; }

        public string securityPercentDropperType { get; set; } 
             
             */
            return searchQuery;
        }



    }
}
