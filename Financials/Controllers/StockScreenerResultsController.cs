using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Threading.Tasks;
using Financials.Models;
using Financials.ResourceParameters;
using Financials.Services.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RestSharp;

namespace Financials.Controllers
{
    [Route("stockscreener/{stockScreenerId}/[controller]")]
    public class StockScreenerResultsController : Controller
    {
        readonly IConfiguration _configuration;
        readonly IAuthentication _authentication;
        public StockScreenerResultsController(IConfiguration configuration, IAuthentication authentication)
        {
            _configuration = configuration;
            _authentication = authentication;
        }





        // [Authorize]
        [HttpGet]
        public ActionResult<List<StockPurchaseOptionDto>> GetStockScreenerResults(int stockScreenerId)
        {


            List<StockPurchaseOptionDto> purchaseOptions = new List<StockPurchaseOptionDto>();

            _authentication.AuthenticationToken(_configuration);
            using (var client = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                var url = apiUrl + "stockscreener/ " + stockScreenerId.ToString() + "/StockScreenerResults";


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
                        purchaseOptions = JsonConvert.DeserializeObject<List<StockPurchaseOptionDto>>(responseString);

                    }
                    catch (Exception ex)
                    {

                    }
                    Console.WriteLine(responseString);
                }


            }
            return purchaseOptions;




        }


        // [Authorize]
        [HttpGet]
        [HttpHead]
        [Route("~/stockscreener/GetStockScreenerResults")]
        public ActionResult<List<StockPurchaseOptionDto>> GetStockScreenerResultsFromScreener([FromQuery] StockScreenerSearchResourceParameters screenerCriterias)
        {

            List<StockPurchaseOptionDto> purchaseOptions = new List<StockPurchaseOptionDto>();
            var boolvalue = bool.Parse("true");


            _authentication.AuthenticationToken(_configuration);


            PropertyInfo[] properties = typeof(StockScreenerSearchResourceParameters).GetProperties();
            int counter = 0;
            string searchQuery = "";
            foreach (PropertyInfo property in properties)
            {

               string value =  GetPropertyValue(property, screenerCriterias);

                if(value != null && value != "")
                {
                    searchQuery += counter == 0 ? "?" : "&";
                    searchQuery += property.Name + "=" + value;
                    counter += 1;
                }

            }


            using (var clients = new HttpClient())
            {
                string apiUrl = _configuration.GetValue<string>("APIURL");
                string fullUrl = apiUrl + "stockscreener/GetStockScreenerResults" + searchQuery;
                var client = new RestClient(fullUrl);
                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                _authentication.SetBearerTokenRest(request, _configuration);

                IRestResponse response = client.Execute(request);
                string responseString = response.Content;
                purchaseOptions = JsonConvert.DeserializeObject<List<StockPurchaseOptionDto>>(responseString);


            }


            return purchaseOptions;






        }

        public string GetPropertyValue(PropertyInfo property, object screenerCriterias)
        {
            string valueRec = "";
            var propertyValue = property.GetValue(screenerCriterias, null);

            if (propertyValue == null)
            {
                valueRec = "";
            }
            else
            {
                var propertyType = property.PropertyType.Name;
                switch (propertyType)
                {
                    case "Int32":
                        int recValueInt = (Int32)propertyValue;
                        valueRec = recValueInt.ToString();
                        break;
                    case "String":
                        string recValueStr = (string)propertyValue;
                        valueRec =  recValueStr;
                        break;
                    case "DateTime":
                        string recValuestr = ((DateTime)propertyValue).ToString("MM/dd/yyyy");
                        valueRec = "" + recValuestr + "";
                        break;
                    case "Decimal":
                        decimal recValueDec = (decimal)propertyValue;
                        valueRec = recValueDec.ToString();

                        break;
                    case "Boolean":
                        bool recValueBool = (bool)propertyValue;
                        valueRec = recValueBool ? "true" : "false";
                        break;
                    case "Nullable`1":
                        var recValueNull = propertyValue;
                        if (recValueNull == null)
                        {
                            valueRec = "";
                            break;
                        }

                        var genericTypes = property.PropertyType.GenericTypeArguments;
                        string nullableTypeName = "";
                        foreach (var genericType in genericTypes)
                        {
                            nullableTypeName = genericType.Name;
                        }
                        if (nullableTypeName != string.Empty)
                        {
                            valueRec = NullGetFieldAndValue(nullableTypeName, propertyValue);
                        }
                        break;
                }
            }

            return valueRec;
        }

        public string NullGetFieldAndValue(string nullableTypeName, object propertyValue)
        {
            string valueRec = "";
            switch (nullableTypeName)
            {

                case "Int32":
                    int recValueInt = (Int32)propertyValue;
                    valueRec = recValueInt.ToString();
                    break;
                case "String":
                    string recValueStr = (string)propertyValue;
                    if (recValueStr == null)
                    {
                        return "";
                    }
                    valueRec = "'" + recValueStr.Replace("'", "''") + "'";
                    break;
                case "DateTime":

                    string recValuestr = ((DateTime)propertyValue).ToString("MM/dd/yyyy");
                    valueRec = "" + recValuestr + "";
                    break;
                case "Decimal":
                    decimal recValueDec = (decimal)propertyValue;
                    valueRec = recValueDec.ToString();
                    break;
                case "Boolean":
                    bool recValueBool = (bool)propertyValue;
                    valueRec = recValueBool ? "true" : "false";
                    break;

            }




            return valueRec;
        }
    }
}
