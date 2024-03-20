using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Financials.Models;
using Financials.Services.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RestSharp;

namespace Financials.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StockScreenerController : ControllerBase
    {

        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public StockScreenerController(IConfiguration configuration, IAuthentication authentication)
        {
            _configuration = configuration;
            _authentication = authentication;
        }


        
        [HttpGet()]
        //  [HttpHead]
        [Route("~/StockScreener/SearchStockScreeners")]
        [HttpGet(Name = "SearchStockScreeners")]
        public async Task<List<StockScreener>> SearchStockScreeners()
        {
            
            _authentication.AuthenticationToken(_configuration);
            List<StockScreener> stockScreeners = new List<StockScreener>();
        string details = "";

            using (var client = new HttpClient())
            {
                details += "url ";
                string apiUrl = _configuration.GetValue<string>("APIURL");
    
                var url = apiUrl + "SearchStockScreeners";
    
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

                        stockScreeners =
                              JsonConvert.DeserializeObject<List<StockScreener>>(responseString);

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


            return stockScreeners;
        }

        [HttpGet("{stockScreenerId}")]
        public async Task<StockScreenerRecordDto> GetAsync(int stockScreenerId)
        {

            _authentication.AuthenticationToken(_configuration);
            StockScreenerRecordDto stockScreenerRecord = new StockScreenerRecordDto();
            string details = "";

            using (var client = new HttpClient())
            {
                details += "url ";
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "StockScreener/" + stockScreenerId.ToString();
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

                        stockScreenerRecord =
                              JsonConvert.DeserializeObject<StockScreenerRecordDto>(responseString);

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


            return stockScreenerRecord;


        }


        [HttpPut]
        public async Task<IActionResult> PutAsync(StockScreenerRecordDto stockScreenerRecord)
        {
            _authentication.AuthenticationToken(_configuration);
            string apiUrl = _configuration.GetValue<string>("APIURL");

            var url = apiUrl + "StockScreener";
            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.PUT);
            request.AddHeader("Accept", "application/json");
            _authentication.SetBearerTokenRest(request, _configuration);
            request.AddHeader("Content-Type", "application/json");
            //request.AddParameter("application/json", "{\"securityId\":" + securityId.ToString() + "}", ParameterType.RequestBody);
            request.AddParameter("application/json; charset=utf-8", JsonConvert.SerializeObject(stockScreenerRecord), ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);


            return NoContent();
        }


        [HttpDelete("{stockScreenerId}", Name = "DeleteStockScreener")]
        public async Task<IActionResult> DeleteStockScreener(int stockScreenerId)
        {

            _authentication.AuthenticationToken(_configuration);

            string apiUrl = _configuration.GetValue<string>("APIURL");
            var url = apiUrl + "StockScreener/" + stockScreenerId.ToString();


            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.DELETE);
            request.AddHeader("Accept", "application/json");

            request.AddHeader("Content-Type", "application/json");
            _authentication.SetBearerTokenRest(request, _configuration);
            request.AddParameter("application/json", "{\"stockScreenerId\":" + stockScreenerId.ToString() + "}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);

            return Ok();
        }






    }
}
