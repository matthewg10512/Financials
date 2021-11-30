﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Financials.Models;
using Financials.ResourceParameters;
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
    public class PeakRangeDetailsController : ControllerBase
    {
        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public PeakRangeDetailsController(IConfiguration configuration, IAuthentication authentication)
        {
            _configuration = configuration;
            _authentication = authentication;
        }

        [HttpGet]
        public async Task<IEnumerable<PeakRangeDetail>> GetPeakRangeDetails(int securityId, [FromQuery] PeakRangeDetailsResourceParameters peakRangeDetailsResourceParameters)
        {
            List<PeakRangeDetail> info = new List<PeakRangeDetail>();


            _authentication.AuthenticationToken(_configuration);

            string searchQuery = "";
        


            using (var clients = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                string fullUrl = apiUrl + "securities/" + securityId.ToString() + "/peakrangedetails" + searchQuery;
                var client = new RestClient(fullUrl);
                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                _authentication.SetBearerTokenRest(request, _configuration);
                IRestResponse response = client.Execute(request);
                string responseString = response.Content;
                info = JsonConvert.DeserializeObject<List<PeakRangeDetail>>(responseString);

                /*
                var client = new RestClient("http://kwik-kards.com/FinancialServices/api/securities/" + securityId.ToString() + "/historicalprices?" + searchQuery);

                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                request.AddHeader("Content-Type", "text/plain");
                request.AddParameter("text/plain", "{\"securityId\": "+ securityId.ToString() +"}", ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                string responseString = response.Content;
                info = JsonConvert.DeserializeObject<List<HistoricalPrice>>(responseString);
                */

            }


            return info.ToList();
        }

    }
}
