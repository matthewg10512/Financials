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
    [Route("/security/{securityid}/[controller]")]
    public class SecurityAnalyticController : ControllerBase
    {



        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public SecurityAnalyticController(IConfiguration configuration, IAuthentication authentication)
        {
            _configuration = configuration;
            _authentication = authentication;
        }

        [HttpGet]
        [Route("~/security/FullSecurityAnalytics")]
        public async Task<IEnumerable<FullSecurityAnalyticDto>> GetFullSecurityAnalytics()
        {
            List<FullSecurityAnalyticDto> info = new List<FullSecurityAnalyticDto>();


           
            _authentication.AuthenticationToken(_configuration);


            using (var client = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "securities/GetFullSecurityAnalytics" ;
                


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
                       info = JsonConvert.DeserializeObject<List<FullSecurityAnalyticDto>>(responseString);
                        
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
