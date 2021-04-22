using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Financials.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PreferredEarningController : ControllerBase
    {


        [HttpGet]
        public async Task<IEnumerable<PreferredEarning>> GetAsync()
        {
            List<PreferredEarning> info = new List<PreferredEarning>();
            DateTime date = DateTime.Now;

            
            using (var client = new HttpClient())
            {
                var url = "http://kwik-kards.com/FinancialServices/api/preferredearnings?actualEarningsDate=" + DateTime.Now.ToString("MM/dd/yyyy");

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
                        info = JsonConvert.DeserializeObject<List<PreferredEarning>>(responseString);
                    }
                    catch (Exception ex)
                    {

                    }
                    Console.WriteLine(responseString);
                }
            }

            return info.ToArray();
        }


    }
}
