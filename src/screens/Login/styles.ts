// import { StyleSheet, Text, View } from 'react-native'
// const styles = StyleSheet.create({
//     container:{
//         backgroundColor:'#f5d0f3',
//         flex:1,
      
//         alignItems:'center'
//     },
//     headerText:{
//         fontSize:50,
//         fontWeight:'500',
     
//     },
    
// })


// export default styles
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
        backgroundColor:'#f5d0f3',
       


  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 16,
  },
  button: {
  marginTop: 20,
  backgroundColor: '#6200EE',
  paddingVertical: 14,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
},

buttonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
},
});