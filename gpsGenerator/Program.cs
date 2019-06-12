using System;
using System.IO;
using System.Net;
using System.Text;
using Newtonsoft.Json;


namespace gpsGenerator
{
    public class GPSCoordinatesResource
    {
        public int Id { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public int Speed { get; set; }
        public DateTime TimeStamp { get; set; }
        public int CarId { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var carId = 1002;
            var rnd = new Random();
            var resolution = 0.003;
            string responseText = String.Empty;
            GPSCoordinatesResource gps;
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://localhost:5000/api/GPS/last/"+ carId);
            using (HttpWebResponse response = (HttpWebResponse)httpWebRequest.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                responseText = reader.ReadToEnd();
                gps=Newtonsoft.Json.JsonConvert.DeserializeObject<GPSCoordinatesResource>(responseText);
            }

            Console.WriteLine(responseText);
            Console.WriteLine(gps.Latitude);
            //double lat = 52.4 + rnd.NextDouble() - 0.5;
            double lat = gps.Latitude;
            //double lon = 16.9 + rnd.NextDouble()-0.5;
            double lon = gps.Longitude;
            int speed = 0;
            Console.WriteLine("Generuję dane dla samochodu " + carId);
            Console.WriteLine("Wcisnij klawisz aby zaczac wysylac!");
            Console.ReadKey();
            double headingx = rnd.NextDouble() - 0.5;
            double headingy = rnd.NextDouble() - 0.5;
            for (int i = 0; i < 20; i++)
            {
                if (i<10) speed = speed + 10;
                else speed = speed - 10;
                if (speed < 0) speed = 0;

                
                double offset = (rnd.NextDouble() - 0.5) * 0.0005;
                lat = lat + resolution * headingx + offset;
                lon = lon + resolution * headingy + offset;

                Console.WriteLine("Latitude: " + lat + ", Longitude: " + lon);

                httpWebRequest = (HttpWebRequest)WebRequest.Create("http://localhost:5000/api/GPS");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var gpsCoordinates = new
                    {
                        longitude = lon,
                        latitude = lat,
                        CarId = carId,
                        speed = speed

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
                System.Threading.Thread.Sleep(5000);





















            }

            Console.ReadKey();
        }
    }
}
