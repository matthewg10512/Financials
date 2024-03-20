using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Amazon.SimpleNotificationService;
using Amazon.SimpleNotificationService.Model;
using Financials.Models;
using Financials.ResourceParameters;
using Financials.Services;
using Financials.Services.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RestSharp;

namespace Financials.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TopMoversController : ControllerBase
    {



        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public TopMoversController(IConfiguration configuration, IAuthentication authentication)
        {
            _configuration = configuration;
            _authentication = authentication;
        }

        [HttpGet]
        [Route("~/security/gettopmovers")]
        public async Task<IEnumerable<TopMoverConcat>> GetTopMovers([FromQuery] TopMoversResourceParameters topMoverParams)
        {
            List<TopMoverConcat> info = new List<TopMoverConcat>();


           
            _authentication.AuthenticationToken(_configuration);

            string searchQuery = "";
            if (topMoverParams.securityid != null && topMoverParams.securityid != 0)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "securityid=" + topMoverParams.securityid;
            }

            if (topMoverParams.dateAddedMin != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "dateAddedMin=" + topMoverParams.dateAddedMin.Value.ToString("MM/dd/yyyy"); 
            }

                

            using (var client = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "TopMovers" + searchQuery;
                


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
                       info = JsonConvert.DeserializeObject<List<TopMoverConcat>>(responseString);
                        
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
