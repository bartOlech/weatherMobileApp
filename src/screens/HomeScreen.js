import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import { Text, Card, Button, Icon, Input } from 'react-native-elements';
import cloudImage from '../cloud.png'


export default function HomeScreen () {
  const [isShowWeather, setIsShowWeather] = useState(false);
  const [weatherDesc, setWeatherDesc] = useState('');
  const [weatherIco, setWeatherIco] = useState('');
  const [weatherName, setWeatherName] = useState('');
  const [weatherTemp, setWeatherTemp] = useState('');

  function getWeather (values) {
    setIsShowWeather(true)

    fetch('https://weather-api-agh.herokuapp.com/')
    .then(response => response.json())
    .then(json => {
      json.map(el => {
        if (el.name.toUpperCase() == values.title.toUpperCase()) {
          setWeatherDesc(el.description)
          setWeatherIco(el.icon)
          setWeatherName(el.name)
          setWeatherTemp(el.temp)
        } 
        // else {
        //   setWeatherName('Spróbuj wyszukać jeszcze raz')
        //   setWeatherDesc('Nie znaleziono miasta')
        //   setWeatherIco()
        //   setWeatherTemp()
        // }
      })
    })
  }

  return (
    <View>
      <Formik
        initialValues={{title: ''}}
        onSubmit={getWeather}
      >
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={style.container}>
            <Text style={style.formTitle} h4>Wprowadź miasto</Text>
            <Input 
              placeholder="Np. Krakow" 
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              style={style.input}
            />
            <Button title="Sprawdź" onPress={handleSubmit} style={style.button} />
          </View>
        )}
      </Formik>
      {isShowWeather ? (
        <Card>
          <Card.Title>{weatherName}</Card.Title>
          <Card.Divider />
          <View>
            <Image
              style={style.image}
              resizeMode="cover"
              source={cloudImage }
            />
            <Text style={style.name}>{weatherDesc}</Text>
            <Text style={style.name}>{weatherTemp}</Text>
          </View>
        </Card>
      ) : null}
      
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
  },
  input: {
    marginTop: 10
  },
  button: {
    backgroundColor: '#1B1725',
    marginTop: 5,
  },
  formTitle: {
    marginLeft: 13
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
})