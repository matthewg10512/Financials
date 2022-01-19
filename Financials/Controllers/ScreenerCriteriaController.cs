using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Financials.Models;
using Financials.Services.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Financials.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScreenerCriteriaController : Controller
    {

        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public ScreenerCriteriaController(IConfiguration configuration, IAuthentication authentication)
        {
            _configuration = configuration;
            _authentication = authentication;
        }


        [HttpGet]
        [Route("GetAllScreenerCriterias")]
        public ActionResult<List<ScreenerCriteriaDto>> GetScreenerCritieras()
        {
            _authentication.AuthenticationToken(_configuration);



            List<ScreenerCriteriaDto> info = new List<ScreenerCriteriaDto>();
            string apiUrl = _configuration.GetValue<string>("APIURL");


            using (var client = new HttpClient())
            {
                var url = apiUrl + "GetAllScreenerCriterias";


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
                        info = JsonConvert.DeserializeObject<List<ScreenerCriteriaDto>>(responseString);

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
