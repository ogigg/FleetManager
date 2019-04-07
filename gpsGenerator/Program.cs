using System;
using System.IO;
using System.Net;
using System.Text;
using Newtonsoft.Json;


namespace gpsGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            var carId = 1007;
            var rnd = new Random();
            var resolution = 0.03;
            double lat = 52.4 + rnd.NextDouble() - 0.5;
            double lon = 16.9 + rnd.NextDouble()-0.5;
            Console.WriteLine("Generuję dane dla samochodu " + carId);
            for (int i = 0; i < 50; i++)
            {
                double headingx = rnd.NextDouble() - 0.5;
                double headingy = rnd.NextDouble() - 0.5;

                lat = lat + resolution * headingx;
                lon = lon + resolution * headingy;

                Console.WriteLine("Latitude: " + lat + ", Longitude: " + lon);

                var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://localhost:9220/api/GPS");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var gpsCoordinates = new
                    {
                        longitude = lon,
                        latitude = lat,
                        CarId = carId

                    };
                    var strGps = JsonConvert.SerializeObject(gpsCoordinates);
                    streamWriter.Write(strGps);
                    streamWriter.Flush();
                    streamWriter.Close();
                    Console.WriteLine(strGps);
                }

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    Console.WriteLine(result);
                }






















            }

            Console.ReadKey();
        }
    }
}
