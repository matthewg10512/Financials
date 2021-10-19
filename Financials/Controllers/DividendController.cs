using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
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
    public class DividendController : ControllerBase
    {


        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public DividendController(IConfiguration configuration, IAuthentication authentication)
        {
            _configuration = configuration;
            _authentication = authentication;
        }


        [HttpGet]
        public ActionResult<IEnumerable<Dividend>> GetDividend(int securityId)
        {

            _authentication.AuthenticationToken(_configuration);



            List<Dividend> info = new List<Dividend>();
            string apiUrl = _configuration.GetValue<string>("APIURL");


            using (var client = new HttpClient())
            {
                var url = apiUrl + "securities/ " + securityId.ToString()+"/dividends";


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
                        info = JsonConvert.DeserializeObject<List<Dividend>>(responseString);

                    }
                    catch (Exception ex)
                    {

                    }
                    Console.WriteLine(responseString);
                }
            }


            return info;

        }



        [HttpGet()]
        [HttpHead]
        [Route("~/security/SearchDividends")]
        public ActionResult<IEnumerable<DividendSecurityDto>> GetDividends([FromQuery] DividendsResourceParameters earningsResourceParameters)
        {
            // var earningsFromRepo = _securityRepository.GetEarnings(earningsResourceParameters);

            //return Ok(_mapper.Map<IEnumerable<EarningDto>>(earningsFromRepo));
            /*
            foreach (var author in authorsFromRepo)
            {
                authors.Add(new AuthorDto()
                {
                    Id = author.Id,
                    Name = $"{author.FirstName} {author.LastName}",
                    MainCategory = author.MainCategory,
                    Age = author.DateOfBirth.GetCurrentAge()
                }
                ) ;
            }
            */
            // return  Ok(authors);

            _authentication.AuthenticationToken(_configuration);

            List<DividendSecurityDto> info = new List<DividendSecurityDto>();


            string searchQuery = "";
            if (earningsResourceParameters.securityId != 0)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "securityId=" + earningsResourceParameters.securityId;
            }
            if (earningsResourceParameters.exDividendDate != DateTime.MinValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "exDividendDate=" + earningsResourceParameters.exDividendDate;
            }
            if (earningsResourceParameters.rangeExDividendDateEnd != DateTime.MinValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "rangeExDividendDateEnd=" + earningsResourceParameters.rangeExDividendDateEnd.ToString("MM/dd/yyyy");
            }
            if (earningsResourceParameters.rangeExDividendDateStart != DateTime.MinValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "rangeExDividendDateStart=" + earningsResourceParameters.rangeExDividendDateStart.ToString("MM/dd/yyyy");
            }
            if (earningsResourceParameters.searchQuery != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "searchQuery=" + earningsResourceParameters.searchQuery;
            }


            string apiUrl = _configuration.GetValue<string>("APIURL");

            using (var client = new HttpClient())
            {
                var url = apiUrl + "securities/SearchDividends" + searchQuery;


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
                        info = JsonConvert.DeserializeObject<List<DividendSecurityDto>>(responseString);

                    }
                    catch (Exception ex)
                    {

                    }
                    Console.WriteLine(responseString);
                }
            }


            return info;

        }

        [HttpPut]
        public async Task<IActionResult> UpdateDividends(int securityId, Dividend dividend)
        {
            _authentication.AuthenticationToken(_configuration);
            string apiUrl = _configuration.GetValue<string>("APIURL");

            var url = apiUrl + "securities/" + securityId.ToString()+ "/dividends";
            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.PUT);
            request.AddHeader("Accept", "application/json");
            _authentication.SetBearerTokenRest(request, _configuration);
            request.AddHeader("Content-Type", "application/json");
              request.AddParameter("application/json", "{\"securityId\":" + securityId.ToString() + "}", ParameterType.RequestBody);
            request.AddParameter("application/json; charset=utf-8", JsonConvert.SerializeObject(dividend), ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);


            return NoContent();
        }


        [Route("~/security/futuredividends")]
        [HttpPut]
        public async Task<IActionResult> UpdateFutureDividends()
        {
            _authentication.AuthenticationToken(_configuration);
            string apiUrl = _configuration.GetValue<string>("APIURL");
            var url = apiUrl + "securities/" + "futuredividends";

            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.PUT);
            _authentication.SetBearerTokenRest(request, _configuration);
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Content-Type", "application/json");
            //  request.AddParameter("application/json", "{\"securityId\":" + 251.ToString() + "}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);


            return NoContent();
        }


    }
}
