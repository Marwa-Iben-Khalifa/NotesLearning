import React from 'react';
import { View,Text,Image } from 'react-native';

export default function Card({children, title,text }: {
  title: string;
  text: string;
  children: React.ReactNode
}): JSX.Element
{
  const urlPhoto =  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
  return (
    <View>
      <Image style={{height:50, width:50}} source={require('../../assets/No_image.png')}/>
      <Text>{title}</Text>
      <Text>{text}</Text>

    </View>
  )
}
