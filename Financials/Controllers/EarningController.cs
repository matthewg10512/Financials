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
    public class EarningController :ControllerBase
    {

        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public EarningController(IConfiguration configuration, IAuthentication authentication)
        {
            _configuration = configuration;
            _authentication = authentication;
        }


        [HttpGet]
        public async Task<IEnumerable<Earning>> GetEarnings(int securityId)
        {
            List<Earning> info = new List<Earning>();
            /*
            var url = "http" + "://kwik-kards.com/FinancialServices/api/securities/" + securityId.ToString() + "/earnings";
            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddParameter("application/json", "{\"securityId\":" + securityId.ToString() + "}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);


            return NoContent();

            */
            _authentication.AuthenticationToken(_configuration);
            using (var client = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "securities/ " + securityId.ToString() + "/earnings";


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
                        info = JsonConvert.DeserializeObject<List<Earning>>(responseString);

                    }
                    catch (Exception ex)
                    {

                    }
                    Console.WriteLine(responseString);
                }

               
            }
            return info;
        }


        [HttpGet]
        [Route("~/security/EarningsPercentage")]
        public ActionResult<IEnumerable<EarningSecurityPercentage>> GetEarningsSecurityPercentage(int securityId)
        {
            List<EarningSecurityPercentage> info = new List<EarningSecurityPercentage>();
            _authentication.AuthenticationToken(_configuration);
            using (var client = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "securities/EarningsPercentage?securityid=" + securityId.ToString();


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
                        info = JsonConvert.DeserializeObject<List<EarningSecurityPercentage>>(responseString);

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
        [Route("~/security/SearchEarnings")]
        public ActionResult<IEnumerable<EarningSecurityDto>> GetEarnings([FromQuery] EarningsResourceParameters earningsResourceParameters)
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
            List<EarningSecurityDto> info = new List<EarningSecurityDto>();

            
            string searchQuery = "";
            if (earningsResourceParameters.securityId != 0)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "securityId=" + earningsResourceParameters.securityId;
            }
            if (earningsResourceParameters.actualEarningsDate != DateTime.MinValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "actualEarningsDate=" + earningsResourceParameters.actualEarningsDate;
            }
            if (earningsResourceParameters.rangeStartEarningsDate != DateTime.MinValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "rangeStartEarningsDate=" + earningsResourceParameters.rangeStartEarningsDate.ToString("MM/dd/yyyy");
            }
            if (earningsResourceParameters.rangeEndEarningsDate != DateTime.MinValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "rangeEndEarningsDate=" + earningsResourceParameters.rangeEndEarningsDate.ToString("MM/dd/yyyy");
            }
            if (earningsResourceParameters.searchQuery != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "searchQuery=" + earningsResourceParameters.searchQuery;
            }




            using (var client = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "securities/SearchEarnings" + searchQuery;


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
                        info = JsonConvert.DeserializeObject<List<EarningSecurityDto>>(responseString);

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
        public async Task<IActionResult> UpdateEarnings(int securityId)
        {
            _authentication.AuthenticationToken(_configuration);
            string apiUrl = _configuration.GetValue<string>("APIURL");
            var url = apiUrl + "securities/" + securityId.ToString() + "/earnings";
            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.PUT);
            _authentication.SetBearerTokenRest(request, _configuration);
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Content-Type", "application/json");
              request.AddParameter("application/json", "{\"securityId\":" + securityId.ToString() + "}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);


            return NoContent();
        }



        [Route("~/security/futureearnings")]
        [HttpPut]
        public async Task<IActionResult> UpdateFutureEarnings()
        {
            _authentication.AuthenticationToken(_configuration);
            string apiUrl = _configuration.GetValue<string>("APIURL");
            var url = apiUrl + "securities/" + "futureearnings";
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
