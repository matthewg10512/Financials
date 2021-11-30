using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Financials.Models;
using Financials.ResourceParameters;
using Financials.Services;
using Financials.Services.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RestSharp;

namespace Financials.Controllers
{
    [ApiController]
    [Route("/security/{securityid}/[controller]")]
    public class HistoricalPriceController : ControllerBase
    {



        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public HistoricalPriceController(IConfiguration configuration, IAuthentication authentication)
        {

            _configuration = configuration;
            _authentication = authentication;
        }


        [HttpGet]
        public async Task<IEnumerable<HistoricalPrice>> GetSecurities(int securityId , [FromQuery] HistoricalPricesResourceParameters historicalPricesResourceParameters)
        {
            List<HistoricalPrice> info = new List<HistoricalPrice>();


            _authentication.AuthenticationToken(_configuration);

            string searchQuery = "";
            if (historicalPricesResourceParameters.HistoricDateHigh != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "HistoricDateHigh=" + historicalPricesResourceParameters.HistoricDateHigh.ToString("MM/dd/yyyy");
            }
            if (historicalPricesResourceParameters.HistoricDateLow != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "HistoricDateLow=" + historicalPricesResourceParameters.HistoricDateLow.ToString("MM/dd/yyyy");
            }
            


            using (var clients = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                string fullUrl = apiUrl + "securities/" + securityId.ToString() + "/historicalprices" + searchQuery;
                var client = new RestClient(fullUrl);
                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                _authentication.SetBearerTokenRest(request, _configuration);
                IRestResponse response = client.Execute(request);
                string responseString = response.Content;
                info = JsonConvert.DeserializeObject<List<HistoricalPrice>>(responseString);

                /*
                var client = new RestClient("http://kwik-kards.com/FinancialServices/api/securities/" + securityId.ToString() + "/historicalprices?" + searchQuery);

                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                request.AddHeader("Content-Type", "text/plain");
                request.AddParameter("text/plain", "{\"securityId\": "+ securityId.ToString() +"}", ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                string responseString = response.Content;
                info = JsonConvert.DeserializeObject<List<HistoricalPrice>>(responseString);
                */
              
            }


            return info.OrderBy(x=>x.HistoricDate).ToList();
        }








        public async Task<IActionResult> PutSecurity([FromRoute] int securityId, [FromBody] SecurityForUpdateDto security)
        {


            //  var httpClient = new HttpClient()

            //  return httpClient.PutAsync(_endpoint, requestMessage.Content).ContinueWith(httpResponseMessage =>
            //{
            //  return httpResponseMessage.Result.Content.ReadAsStringAsync();
            //});

            _authentication.AuthenticationToken(_configuration);

            using (var client2 = new HttpClient())
            {
                //api/securities/251/historicalprices
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "securities/" + securityId.ToString() + "/historicalprices";


                /*

                string data;

                var mediaType = new MediaTypeHeaderValue("application/json");

                var jsonString = "{\"securityId\""+ securityId.ToString() + "}";
                var httpContent = new StringContent(jsonString, Encoding.UTF8, "application/json");


                client.DefaultRequestHeaders
                   .Accept
                        .Add(new MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header
                var response = client.PutAsync(url, httpContent).Result;
                */

                /*
                PostSecurity postObject = new PostSecurity
                {
                    securityId = securityId
                };

                var myContent = JsonConvert.SerializeObject(postObject);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var builder = new UriBuilder(new Uri(url));

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, builder.Uri);
                request.Content = new StringContent(myContent, Encoding.UTF8, "application/json");//CONTENT-TYPE header

                HttpResponseMessage response = await client.SendAsync(request);

               
                */

                var client = new RestClient(url);
                client.Timeout = -1;
                var request = new RestRequest(Method.PUT);
                request.AddHeader("Accept", "application/json");
                
                request.AddHeader("Content-Type", "application/json");
                _authentication.SetBearerTokenRest(request, _configuration);
                request.AddParameter("application/json", "{\"securityId\":" + securityId.ToString() + "}", ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                Console.WriteLine(response.Content);



                //  string json = JsonConvert.SerializeObject(security);
                //var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
                //var httpResponse = await client.PostAsync(url, httpContent);

            }


            return NoContent();
        }





    }
}
