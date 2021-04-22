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
using Financials.ResourceParameters;
using Financials.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RestSharp;

namespace Financials.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SecurityController : ControllerBase
    {
     

        [HttpGet]
        public async Task<IEnumerable<Security>> GetSecurities([FromQuery] SecuritiesResourceParameters securitiesResourceParameters)
        {
            List<Security> info = new List<Security>();


            string searchQuery = "";
            if (securitiesResourceParameters.symbol != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "symbol=" + securitiesResourceParameters.symbol;
            }
            if (securitiesResourceParameters.sector != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "sector=" + securitiesResourceParameters.sector;
            }
            if (securitiesResourceParameters.industry != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "industry=" + securitiesResourceParameters.industry;
            }
            if (securitiesResourceParameters.searchQuery != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "searchQuery=" + securitiesResourceParameters.searchQuery;
            }
            if (securitiesResourceParameters.preferred.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "preferred=" + securitiesResourceParameters.preferred.Value.ToString();
            }

            if (securitiesResourceParameters.lastModifiedPrior.HasValue)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "lastModifiedPrior=" + securitiesResourceParameters.lastModifiedPrior.Value.ToString();
            }
            if (securitiesResourceParameters.filtertype != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "filtertype=" + securitiesResourceParameters.filtertype;
            }

            if (securitiesResourceParameters.perChangeLow != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "perChangeLow=" + securitiesResourceParameters.perChangeLow;
            }

            if (securitiesResourceParameters.perChangeHigh != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "perChangeHigh=" + securitiesResourceParameters.perChangeHigh;
            }


            if (securitiesResourceParameters.perFrom52WeekHigh != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "perFrom52WeekHigh=" + securitiesResourceParameters.perFrom52WeekHigh;
            }

            if (securitiesResourceParameters.perFrom52WeekLow != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "perFrom52WeekLow=" + securitiesResourceParameters.perFrom52WeekLow;
            }

            if (securitiesResourceParameters.minVolume != null)
            {
                searchQuery += searchQuery == "" ? "?" : "&";
                searchQuery += "minVolume=" + securitiesResourceParameters.minVolume;
            }



            using (var client = new HttpClient())
            {
                var url = "http://kwik-kards.com/FinancialServices/api/securities" + searchQuery;
                


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
                       info = JsonConvert.DeserializeObject<List<Security>>(responseString);
                        
                    }
                    catch (Exception ex)
                    {

                    }
                    Console.WriteLine(responseString);
                }
            }

           
            return info;
        }


        [HttpPut("UpdateAllSecurities")]
        public async Task<IActionResult> UpdateAllSecurities()
        {
           
                var url = "http://kwik-kards.com/FinancialServices/api/" + "UpdateAllSecurities";

        


            var client = new RestClient(url);
                client.Timeout = -1;
                var request = new RestRequest(Method.PUT);
                request.AddHeader("Accept", "application/json");
                request.AddHeader("Content-Type", "application/json");
                request.AddParameter("application/json", "", ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);


            /*
            IConfiguration config = new ConfigurationBuilder()
              .AddJsonFile("appsettings.json", true, true)
              .Build();
            var options = config.GetAWSOptions();
            var snsClient = options.CreateServiceClient<IAmazonSimpleNotificationService>();
            var detail = new PublishRequest
            {
                Message = $"Test at {DateTime.UtcNow.ToLongTimeString()}",
                TopicArn = "arn:aws:sns:us-east-2:930271955226:Watchlist-Mover",
                //"arn:aws:sns:us-east-2:xxxxxxxxx:IaCStack-SNSCDKTopic5427996C-1GCQIX0GC8ICE",
            };
            await snsClient.PublishAsync(detail);
            Console.WriteLine("Message sent");
            */

            return NoContent();
        }



            [HttpPut("{securityId}")]
        public async Task<IActionResult> PutSecurity([FromRoute]int securityId, [FromBody] SecurityForUpdateDto security)
        {


            //  var httpClient = new HttpClient()

            //  return httpClient.PutAsync(_endpoint, requestMessage.Content).ContinueWith(httpResponseMessage =>
            //{
            //  return httpResponseMessage.Result.Content.ReadAsStringAsync();
            //});
            

                var url = "http://kwik-kards.com/FinancialServices/api/securities/" + securityId.ToString();



                var client = new RestClient(url);
                client.Timeout = -1;
                var request = new RestRequest(Method.PUT);
                request.AddHeader("Accept", "application/json");
                request.AddHeader("Content-Type", "application/json");
               request.AddParameter("securityId" , securityId.ToString());
              request.AddParameter("application/json; charset=utf-8", JsonConvert.SerializeObject(security), ParameterType.RequestBody);

            IRestResponse response = client.Execute(request);
                Console.WriteLine(response.Content);



                //  string json = JsonConvert.SerializeObject(security);
                //var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
                //var httpResponse = await client.PostAsync(url, httpContent);
        
            


            return NoContent();
        }




        
            
        [HttpGet("{securityId}")]
        public async Task<Security> GetAsync(int securityId)
        {
           Security securityRec = new Security();
            string details = "";
         
            using (var client = new HttpClient())
            {
                details += "url ";
                var url = "http://kwik-kards.com/FinancialServices/api/securities/" + securityId.ToString();
                details += "urlHit";
                var response = client.GetAsync(url).Result;

                if (response.IsSuccessStatusCode)
                {
                    // by calling .Result you are performing a synchronous call
                    var responseContent = response.Content;

                    // by calling .Result you are synchronously reading the result
                    string responseString = responseContent.ReadAsStringAsync().Result;


                    try
                    {

                        securityRec =
                              JsonConvert.DeserializeObject<Security>(responseString);

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

            /*

            info.Add(new Security
            {

                //Id	SecurityType	Name	Symbol	Dividend	DividendDate	EarningsDate	CurrentPrice	IPOYear	Sector	Industry	YearLow	YearHigh	Volume	DayLow	DayHigh	LastModified
                //251 Nasdaq  Apple Inc.  AAPL    0.82    2020-11-06 1900-01-01   1980    Technology  Computer Manufacturing  53.15   138.79  61495820    135.51  138.79  2020-12-29 11:50:07.490
                Id = 251,
                SecurityType = "Nasdaq",
                Name = "Apple Inc.",
                Symbol = "AAPL",
                Dividend = (decimal?)0.82,
                DividendDate = DateTime.Now.AddDays(10),
                EarningsDate = DateTime.Now.AddDays(-10),
                LastModified = DateTime.Now.AddDays(20),
                CurrentPrice = (decimal)137.27,
                IPOYear = 1980,
                Sector = "Technology",
                Industry = "Computer Manufacturing",
                YearLow = (decimal?)53.15,
                YearHigh = (decimal?)138.79,
                Volume = 61495820,
                DayLow = (decimal?)135.51,
                DayHigh = (decimal?)138.79
            });
            */
            if(securityRec.Name == null || securityRec.Name == "")
            {
                securityRec.Name = details;
            }
            return securityRec;
        }
        




    }
    class PostSecurity
    {
        public int securityId { get; set; }
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
