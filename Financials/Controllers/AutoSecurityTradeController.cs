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

namespace Financials.Controllers
{
    public class AutoSecurityTradeController : Controller
    {

        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public AutoSecurityTradeController(IConfiguration configuration, IAuthentication authentication)
        {
            _configuration = configuration;
            _authentication = authentication;
        }

        [HttpGet()]
        [HttpHead]
        [Route("~/security/SearchAutoSecurityTrades")]
        public ActionResult<IEnumerable<AutoSecurityTradeSecurityDto>> GetAutoSecurityTrades([FromQuery] AutoSecurityTradesResourceParameters autoSecurityTradesResourceParameters)
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

            List<AutoSecurityTradeSecurityDto> info = new List<AutoSecurityTradeSecurityDto>();
            _authentication.AuthenticationToken(_configuration);

            string searchQuery = "";
      
            string apiUrl = _configuration.GetValue<string>("APIURL");


            /*
                 public DateTime rangePurchaseDateStart { get; set; }
        public DateTime rangePurchaseDateEnd { get; set; }
        public DateTime rangeSellDateStart { get; set; }
        public DateTime rangeSellDateEnd { get; set; }
        public bool? positionSold { get; set; }

        public int securityId { get; set; }
             */


            if (autoSecurityTradesResourceParameters.securityId != 0)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "securityId=" + autoSecurityTradesResourceParameters.securityId;
            }
            if (autoSecurityTradesResourceParameters.rangePurchaseDateStart != DateTime.MinValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "rangePurchaseDateStart=" + autoSecurityTradesResourceParameters.rangePurchaseDateStart;
            }
            if (autoSecurityTradesResourceParameters.rangePurchaseDateEnd != DateTime.MinValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "rangePurchaseDateEnd=" + autoSecurityTradesResourceParameters.rangePurchaseDateEnd.ToString("MM/dd/yyyy");
            }
            if (autoSecurityTradesResourceParameters.rangeSellDateStart != DateTime.MinValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "rangeSellDateStart=" + autoSecurityTradesResourceParameters.rangeSellDateStart.ToString("MM/dd/yyyy");
            }
            if (autoSecurityTradesResourceParameters.rangeSellDateEnd != DateTime.MinValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "rangeSellDateEnd=" + autoSecurityTradesResourceParameters.rangeSellDateEnd.ToString("MM/dd/yyyy");
            }
            if (autoSecurityTradesResourceParameters.positionSold.HasValue)
            {
                    searchQuery += searchQuery == "" ? "?" : "&";
                    searchQuery += "positionSold=" + autoSecurityTradesResourceParameters.positionSold.ToString().ToLower();
            }



            using (var client = new HttpClient())
            {
                var url = apiUrl + "securities/SearchAutoSecurityTrades" + searchQuery;
                /*
                 *   public DateTime rangePurchaseDateStart { get; set; }
        public DateTime rangePurchaseDateEnd { get; set; }
        public DateTime rangeSellDateStart { get; set; }
        public DateTime rangeSellDateEnd { get; set; }
        public bool? positionSold { get; set; }

        public int securityId { get; set; }
                */

           



                client.DefaultRequestHeaders
                   .Accept
                        .Add(new MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header

                _authentication.SetBearerToken(client,_configuration);
                var response = client.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    // by calling .Result you are performing a synchronous call
                    var responseContent = response.Content;

                    // by calling .Result you are synchronously reading the result
                    string responseString = responseContent.ReadAsStringAsync().Result;


                    try
                    {
                        info = JsonConvert.DeserializeObject<List<AutoSecurityTradeSecurityDto>>(responseString);

                    }
                    catch (Exception ex)
                    {

                    }
                    Console.WriteLine(responseString);
                }
            }


            return info;

        }
    }
}
