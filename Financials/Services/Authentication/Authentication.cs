using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;

namespace Financials.Services.Authentication
{
    public class Authentication : IAuthentication
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public Authentication(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public void SetBearerToken(HttpClient client, IConfiguration configuration)
        {
            string bearerToken = _httpContextAccessor.HttpContext.Session.GetString("bearerToken");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearerToken);
        }

        public void SetBearerTokenRest(RestRequest request, IConfiguration configuration)
        {
            string bearerToken = _httpContextAccessor.HttpContext.Session.GetString("bearerToken");
            
            request.AddHeader("Authorization" ,"Bearer " + bearerToken);
        }

        public void AuthenticationToken(IConfiguration configuration)
        {

            Security securityRec = new Security();
            string details = "";
            string authInfo;
            var stringDetail = _httpContextAccessor.HttpContext.Session.GetString("bearerToken");
            int loopCheck=4;
            if (stringDetail == "Loading")
            {
                loopCheck = 0;
                while (stringDetail == "Loading" && loopCheck < 4)
                {
                    Thread.Sleep(1000);
                    stringDetail = _httpContextAccessor.HttpContext.Session.GetString("bearerToken");
                    loopCheck += 1;
                }
            }
                if (stringDetail == null)
            {
                _httpContextAccessor.HttpContext.Session.SetString("bearerToken", "Loading");
                authInfo = GetNewAuth(configuration);
                _httpContextAccessor.HttpContext.Session.SetString("bearerToken",authInfo);
            }
            else
            {
                using (var client = new HttpClient())
                {
                    details += "url ";
                    string apiUrl = configuration.GetValue<string>("APIURL");
                    var url = apiUrl + "securities/" + 251;
                    details += "urlHit";
                    SetBearerToken(client, configuration);
                    var response = client.GetAsync(url).Result;

                    if (response.IsSuccessStatusCode)
                    {

                    }
                    else if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                    {

                        authInfo = GetNewAuth(configuration);

                        _httpContextAccessor.HttpContext.Session.SetString("bearerToken", authInfo);

                        //var name = response2.Data.Name;



                        // var responseString = response.Content.ReadAsStringAsync().Result;

                        //   https://localhost:5001/api/signin?UserName=user-test&Password=Qwertyuiop01!
                    }
                }
            }






            
        }

        public string GetNewAuth(IConfiguration configuration)
        {
            string apiUrl = configuration.GetValue<string>("APIURL");
            var clientPost = new RestClient(apiUrl);
            // client.Authenticator = new HttpBasicAuthenticator(username, password);
            var request = new RestRequest("signin");
            request.AddParameter("Username", "user-test");
            request.AddParameter("Password", "Qwertyuiop01!");
            //request.AddHeader("Content-Type", "application/json");
            var responseString = clientPost.Post(request);
            var contentString = responseString.Content; // Raw content as string
            contentString = contentString.Replace("\"","");
            return contentString;
        }


    }
}
