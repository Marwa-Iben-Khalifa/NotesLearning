import React from 'react';
import { View,Text,Image } from 'react-native';
import { INote } from '../utils/types';

export default function Card({children, note}: {
  note:INote
  children: React.ReactNode
})
{
  const urlPhoto = note.image ? note.image :  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
  return (
    <View style={{ backgroundColor: "#48B5D6", margin: 15, borderRadius: 25,padding:10 }}>
      <Image style={{height:50, width:50, position:'relative',margin:10}} source={require('../../assets/No_image.png')}/>
      <Text style={{margin:10}}>{note.title}</Text>
      <Text style={{ margin: 10 }}>{note.text}</Text>
      <Text style={{ margin: 10 }}>{note.creation_date}</Text>

    </View>
  )
}
