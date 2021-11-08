using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Financials.ResourceParameters;
using Financials.Services.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Financials.Models;
using RestSharp;

namespace Financials.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class InvestmentProjectionController : ControllerBase
    {
        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public InvestmentProjectionController(IConfiguration configuration, IAuthentication authentication)
        {

            _configuration = configuration;
            _authentication = authentication;
        }

        [HttpDelete("{investmentProjectionId}", Name = "DeleteInvestmentProjection")]
        public async Task<IActionResult> DeleteInvestmentProjection(int investmentProjectionId)
        {

              _authentication.AuthenticationToken(_configuration);

            string apiUrl = _configuration.GetValue<string>("APIURL");
            var url = apiUrl + "investmentprojections/" + investmentProjectionId.ToString();


            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.DELETE);
            request.AddHeader("Accept", "application/json");

            request.AddHeader("Content-Type", "application/json");
            _authentication.SetBearerTokenRest(request, _configuration);
            request.AddParameter("application/json", "{\"investmentProjectionId\":" + investmentProjectionId.ToString() + "}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);

            return Ok();
        }

            [HttpGet]
        public async Task<IEnumerable<InvestmentProjection>> GetInvestmentProjections([FromQuery] InvestmentProjectionsResourceParameters investmentProjectionsResourceParameters)
        {
            List<InvestmentProjection> info = new List<InvestmentProjection>();



            _authentication.AuthenticationToken(_configuration);

            string searchQuery = "";
            if (investmentProjectionsResourceParameters.UserId != 0)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "userid=" + investmentProjectionsResourceParameters.UserId;
            }
           


            using (var client = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "InvestmentProjections" + searchQuery;



                client.DefaultRequestHeaders
                   .Accept
                        .Add(new MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header
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
                        info = JsonConvert.DeserializeObject<List<InvestmentProjection>>(responseString);

                    }
                    catch (Exception ex)
                    {

                    }
                    Console.WriteLine(responseString);
                }
            }


            return info;
        }

        //([FromRoute] int investmentProjectionId, [FromBody] InvestmentProjectionForUpdateDto investmentProjection)
        [HttpPost]
        public async Task<IActionResult> AddInvestmentProjection(InvestmentProjectionForCreationDto investmentProjection)
        {
            _authentication.AuthenticationToken(_configuration);

            string apiUrl = _configuration.GetValue<string>("APIURL");
            var url = apiUrl + "investmentprojections" ;


            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Accept", "application/json");

            request.AddHeader("Content-Type", "application/json");
            _authentication.SetBearerTokenRest(request, _configuration);
            request.AddParameter("application/json", JsonConvert.SerializeObject(investmentProjection), ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);


            return Ok(response.Content);
        }

            //([FromRoute] int investmentProjectionId, [FromBody] InvestmentProjectionForUpdateDto investmentProjection)
            [HttpPut("{investmentProjectionId}")]
        public async Task<IActionResult> PutInvestmentProjection([FromRoute] int investmentProjectionId, [FromBody] InvestmentProjectionForUpdateDto investmentProjection)
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
                var url = apiUrl + "investmentprojections/" + investmentProjectionId.ToString() ;


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
                request.AddParameter("application/json", JsonConvert.SerializeObject(investmentProjection), ParameterType.RequestBody);
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
