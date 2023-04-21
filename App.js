import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView,Keyboard } from 'react-native';
import api from './src/services/api';


export default function App() {
  const [cep, setCep] = useState('')
  const inputRef = useRef(null)
  const [cepUser, setCepUser] = useState(null)

  function limpar() {
    setCep('')
    inputRef.current.focus();
    setCepUser(null)
  }
  
  async function buscar(){
    if(cep == ''){
      alert('Digite um cep valido')
      setCep('')
      return;
    }

try{
  const response = await api.get(`/${cep}/json`)
 // console.log(response.data)
 setCepUser(response.data)

  Keyboard.dismiss(); //vai fechar outomatico o teclado
}catch(error){
  console.log('ERROR:' + error)
}

    
  }

  return (

    <SafeAreaView style={styles.container}>

      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder='Ex: 55646255'
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity
          onPress={buscar}
          style={[styles.botao, { backgroundColor: '#1d75cd' }]}>
          <Text style={styles.baotaoText}>Buscar</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={limpar}
          ref={inputRef}
          onChangeText={(texto) => setCep(texto)}
          style={[styles.botao, { backgroundColor: '#cd3e1d' }]}>
          <Text style={styles.baotaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

{cepUser && 
      <View style={styles.resultado}>
        <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
        <Text style={styles.itemText}>Lougradouro: {cepUser.logradouro}</Text>
        <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
        <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
        <Text style={styles.itemText}>Habtantes: {cepUser.ibge}</Text>
        <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
      </View>

}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 25,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botao: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,

  },
  baotaoText: {
    fontSize: 19,
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 22
  }
});
