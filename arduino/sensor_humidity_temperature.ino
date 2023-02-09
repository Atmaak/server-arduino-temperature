#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT_Unified dht(DHTPIN, DHTTYPE);

double field[2];
String json;
void setup(){
  Serial.begin(9600);
  dht.begin();
}

void loop(){
  sensors_event_t event;
  dht.humidity().getEvent(&event);
  field[0] = (double)event.relative_humidity;
  dht.temperature().getEvent(&event);
  field[1] = (double)event.temperature;
  json = "{\"humidity\": \""+(String)field[0]+"\", \"temperature\": \""+(String)field[1]+"\"}";
  Serial.println(json);   
  delay(1000);    
}
