/*
  Repeating WiFi Web Client

 This sketch connects to a a web server and makes a request
 using an Arduino WiFi shield.

 Circuit:
 * WiFi shield attached to pins SPI pins and pin 7

 created 23 April 2012
 modified 31 May 2012
 by Tom Igoe
 modified 13 Jan 2014
 by Federico Vanzati

 http://arduino.cc/en/Tutorial/WiFiWebClientRepeating
 This code is in the public domain.
 */

#include <SPI.h>
#include <WiFi101.h>

#include "arduino_secrets.h" 
///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = SECRET_SSID;        // your network SSID (name)
char pass[] = SECRET_PASS;    // your network password (use for WPA, or use as key for WEP)
int keyIndex = 0;    
// your network key Index number (needed only for WEP)
String drecibido = String();

int status = WL_IDLE_STATUS;

// Initialize the WiFi client library
WiFiClient client;

// server address:
//char server[] = "example.org";
IPAddress server(192,168,43,37);

unsigned long lastConnectionTime = 0;            // last time you connected to the server, in milliseconds
const unsigned long postingInterval = 10L * 1000L; // delay between updates, in milliseconds
int x=0, i=0;

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  Serial1.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }

  // attempt to connect to WiFi network:
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }
  // you're connected now, so print out the status:
  printWiFiStatus();
}

void loop() {
  
  if(Serial1.available()>0){
      char c = Serial1.read();
      //Serial.print("se recibe:");
      Serial.println(c);
      httpRequest(c);
   }
   else{
    Serial.println("No se reciben datos");
    delay(2000);
   }
   
 
  /*for(i; i<12; i+=4){

    
    x = i;
    httpRequest(x);
    Serial.println("Enviando");
    delay(5000);
  }
  Serial.println("Nada");
  delay(5000);*/
}

// this method makes a HTTP connection to the server:
void httpRequest( char data ) {
  // close any connection before send a new request.
  // This will free the socket on the WiFi shield
  client.stop();
  //String dato =String(data);
  String x= String("GET /datos/");
  String y = (String)data;
  String z= String("  HTTP/1.1");
  String request = x+y+z;
  Serial.print("funcion request:");
  Serial.println(request);
  // if there's a successful connection:
  if (client.connect(server, 80)) {
    Serial.println("connecting... ");
    // send the HTTP PUT request:
    client.println(request);
    client.println("Connection: close");
    client.println();

    // note the time that the connection was made:
    lastConnectionTime = millis();
  }
  else {
    // if you couldn't make a connection:
    Serial.println("connection failed");
  }

  
}


void printWiFiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
