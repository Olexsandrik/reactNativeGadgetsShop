import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
const pnuCoords = {
  latitude: 48.922268,
  longitude: 24.711026,
};

const centerCoords = {
  latitude: 48.92263,
  longitude: 24.71052,
};

const parkCoords = {
  latitude: 48.918453,
  longitude: 24.714305,
};

const ZOOM_LEVEL = 18;
const ANIMATION_DURATION = 3000;

export default function LocationMap() {
  const [index, setIndex] = useState(0);
  const mapsRef = useRef<MapView>(null);

  const [locations, setLocations] = useState([
    {
      latitude: 48.922268,
      longitude: 24.711026,
    },
    {
      latitude: 48.92263,
      longitude: 24.71052,
    },
    {
      latitude: 48.918453,
      longitude: 24.714305,
    },
  ]);
  const handleNext = () => {
    if (mapsRef.current) {
      mapsRef.current.animateCamera(
        {
          center: {
            latitude: locations[index].latitude,
            longitude: locations[index].longitude,
          },
          zoom: ZOOM_LEVEL,
        },
        {
          duration: ANIMATION_DURATION,
        }
      );
    }
  };
  const handlePrev = () => {
    if (mapsRef.current) {
      mapsRef.current.animateCamera(
        {
          center: {
            latitude: locations[index].latitude,
            longitude: locations[index].longitude,
          },
          zoom: ZOOM_LEVEL,
        },
        {
          duration: ANIMATION_DURATION,
        }
      );
    }
  };

  useEffect(() => {
    (async () => {
      const location = await Location.geocodeAsync("ivano-frankivsk");

      console.log(location);

      if (mapsRef.current) {
        mapsRef.current.animateCamera(
          {
            center: {
              latitude: 48.92263,
              longitude: 24.71052,
            },
            zoom: ZOOM_LEVEL,
          },
          {
            duration: ANIMATION_DURATION,
          }
        );
      }
    })();
  }, []);
  return (
    <>
      <MapView ref={mapsRef} provider={PROVIDER_GOOGLE} style={styles.map}>
        <Marker
          coordinate={{
            latitude: parkCoords.latitude,
            longitude: parkCoords.longitude,
          }}
        />
        <Marker
          coordinate={{
            latitude: centerCoords.latitude,
            longitude: centerCoords.longitude,
          }}
        />
        <Marker
          coordinate={{
            latitude: pnuCoords.latitude,
            longitude: pnuCoords.longitude,
          }}
        />
      </MapView>

      <View style={styles.btnContainer}>
        <Pressable onPress={handleNext}>
          <Text>Next</Text>
        </Pressable>
        <Pressable onPress={handlePrev}>
          <Text>Prev</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
    height: "96%",
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: "5%",
    backgroundColor: "white",
  },

  btnStyled: {
    width: "10%",
  },
});
