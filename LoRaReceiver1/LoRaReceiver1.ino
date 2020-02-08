#include <SPI.h>
#include <LoRa.h>


void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);
  while (!Serial);

  Serial.println("LoRa Receiver");

  if (!LoRa.begin(915E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
}

void loop() {
  // try to parse packet
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    // received a packet
    Serial.print("Recibido:");

    // read packet
    while (LoRa.available()) {
     char  c= (char)LoRa.read();
     Serial1.println(c);
     Serial.println(c);
      delay(500);
    }


  }
}
