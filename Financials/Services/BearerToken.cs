using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Financials.Services
{
    public static class BearerToken
    {

       public static void SetBearerToken(HttpClient client, IConfiguration configuration)
        {
            string bearerToken = configuration.GetValue<string>("BearerKey");

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearerToken);

        }
        
        

        public static void SetBearerTokenRest(RestRequest request, IConfiguration configuration)
        {
            string bearerToken = configuration.GetValue<string>("BearerKey");
            request.AddHeader("Bearer", bearerToken);
        }

        public static bool AuthenticationToken(IConfiguration configuration)
        {

            Security securityRec = new Security();
            string details = "";

            
            

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
                else if (response.StatusCode ==System.Net.HttpStatusCode.Unauthorized)
                {

                   

                    var content = new FormUrlEncodedContent(values);

                    //var tokenID =  client.PostAsync(apiUrl + "signin?UserName=user-test&Password=Qwertyuiop01!", content).Result;


                    var clientPost = new RestClient(apiUrl);
                    // client.Authenticator = new HttpBasicAuthenticator(username, password);
                    var request = new RestRequest("signin");
               
                    request.AddHeader("header", "value");
                    var responseString = clientPost.Post(request);
                    var contentString = responseString.Content; // Raw content as string
                    
                    //var name = response2.Data.Name;



                    // var responseString = response.Content.ReadAsStringAsync().Result;

                    //   https://localhost:5001/api/signin?UserName=user-test&Password=Qwertyuiop01!
                }
            }







            return false;
        }


    }
}
