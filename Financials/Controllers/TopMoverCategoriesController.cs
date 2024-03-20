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
using SecuritiesApi.Entities;

namespace Financials.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TopMoverCategoriesController : ControllerBase
    {



        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public TopMoverCategoriesController(IConfiguration configuration, IAuthentication authentication)
        {
            _configuration = configuration;
            _authentication = authentication;
        }

        [HttpGet]
        [Route("~/security/gettopmovercategories")]
        public async Task<IEnumerable<TopMoverCategory>> GetTopMoverCategories()
        {
            List<TopMoverCategory> info = new List<TopMoverCategory>();


           
            _authentication.AuthenticationToken(_configuration);

                

            using (var client = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "TopMoverCategories";
                


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
                       info = JsonConvert.DeserializeObject<List<TopMoverCategory>>(responseString);
                        
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
