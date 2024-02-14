import {
  View,
  Text,
  Button,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import tw from 'twrnc';
import {debounce} from 'lodash';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {MapPinIcon} from 'react-native-heroicons/solid';
import {fetchLocations, fetchWeatherForecast} from '../api/weather';
import {getData, storeData} from '../utils/asyncStorage';

const HomeScreen = ({navigation}) => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Raipur';

    if (myCity) cityName = myCity;

    fetchWeatherForecast({
      cityName,
      days: '7',
    }).then(data => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleLocation = loc => {
    console.log('locations', loc);
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then(data => {
      setWeather(data);
      setLoading(false);
      storeData('city', loc.name);
      console.log('got forecast', data);
    });
  };

  const handleSearch = value => {
    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => {
        // console.log('got location', data);
        setLocations(data);
      });
    }
    console.log('value', value);
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1000), []);

  const {current, location} = weather;

  if (loading) {
    return (
      <View style={tw`flex-1 flex items-center justify-center bg-yellow-100`}>
        <Text style={tw`text-black`}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1  bg-yellow-100 text-black`}>
      <SafeAreaView>
        <View style={tw` mx-4  mt-10 `}>
          <View style={tw`flex  items-center rounded-full text-black`}>
            {showSearch ? (
              <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Search City"
                placeholderTextColor="gray"
                style={tw`text-black border w-60 bg-gray-100 rounded-full px-5 `}
              />
            ) : null}
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              style={tw`ml-5`}>
              <Text style={tw`text-black border p-2 rounded bg-gray-100 mt-5`}>
                search
              </Text>
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <View style={tw`w-full bg-gray-300 top-16 rounded-3xl`}>
              {locations.map((loc, index) => {
                let showBorder = index + 1 != locations.length;
                let borderClass = showBorder
                  ? 'border-b-2 border-b-gray-400'
                  : '';
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    style={tw`flex-row items-center text-black border-0 p-3 px-4 mb-1 ${borderClass} `}>
                    <MapPinIcon color="gray" size={20} />
                    <Text style={tw`text-black text-lg ml-2`}>
                      {loc?.name}, {loc?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        <View
          style={tw`mx-4  mb-2 mt-30 flex   justify-center items-center gap-2`}>
          <View style={tw`flex flex-row items-center justify-center`}>
            <Text style={tw`text-black text-lg text-center font-bold`}>
              {location?.name} ,
            </Text>
            <Text style={tw`text-black text-center font-bold`}>
              {location?.country}
            </Text>
          </View>
          <View style={tw``}>
            <Image
              source={{uri: 'https:' + current?.condition.icon}}
              ImageBackground
              style={tw`h-28 w-28`}
            />
          </View>
        </View>
        <View style={tw`flex items-center my-5`}>
          <Text style={tw`text-black text-3xl font-bold `}>
            {' '}
            {current?.temp_c}&#176;
          </Text>
          <Text style={tw`text-black text-sm tracking-widest font-bold `}>
            {' '}
            {current?.condition?.text}
          </Text>
        </View>

        <View style={tw`flex flex-row justify-center items-center my-5 gap-5`}>
          <View style={tw`flex items-center my-5`}>
            <Text style={tw`text-black text-xl font-bold `}> Wind</Text>
            <Text style={tw`text-black text-sm tracking-widest font-bold `}>
              {current?.wind_kph} km/h
            </Text>
          </View>
          <View style={tw`flex items-center my-5`}>
            <Text style={tw`text-black text-xl font-bold `}> Drop</Text>
            <Text style={tw`text-black text-sm tracking-widest font-bold `}>
              {current?.humidity}%
            </Text>
          </View>
          {/* <View style={tw`flex items-center my-5`}>
            <Text style={tw`text-black text-xl font-bold `}> time</Text>
            <Text style={tw`text-black text-sm tracking-widest font-bold `}>
              6.05 PM
            </Text>
          </View> */}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
