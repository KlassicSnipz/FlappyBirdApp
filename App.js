import { Canvas, Circle, Group, useImage, Image } from "@shopify/react-native-skia";
import { requireNativeModule } from "expo";
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { Easing, Extrapolation, interpolate, useDerivedValue, useFrameCallback, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';


const gravity = 1000;
const jumpforce = -500;

 
const App = () => {
  const {width, height} = useWindowDimensions(); // setting the hieght and width to the dimensions of my screen

  const bg = useImage(require('./assets/sprites/background-day.png')); //import the image for the background
  const bird = useImage(require('./assets/sprites/yellowbird-upflap.png')); // bird upwing
  const pipeBottom = useImage(require('./assets/sprites/pipe-green.png')); //green pipe
  const pipeTop = useImage(require('./assets/sprites/pipe-green-top.png')); //green pipe top
  const base = useImage(require('./assets/sprites/base.png')); //floor
  
  const x = useSharedValue(width);
  const birdY = useSharedValue(height / 3);
  const birdYVelocity= useSharedValue(0);
  const birdTransform = useDerivedValue(()=>{
    return [{rotate: interpolate(birdYVelocity.value,[-500,500], [-0.5,0.5], Extrapolation.CLAMP )}]
  })
  const birdOrgin = useDerivedValue(() => {
    return {x:width/4+32, y: birdY.value+24}
  })

useFrameCallback(({timeSincePreviousFrame: dt}) => {
  if (!dt){
    return;
  }
birdY.value = birdY.value + (birdYVelocity.value * dt) / 1000;
birdYVelocity.value = birdYVelocity.value + (gravity * dt) / 1000;
})

  useEffect(() => {
  x.value = withRepeat( withSequence( 
    withTiming(-150,{ duration: 3000, easing: Easing.linear}),
    withTiming(width, {duration: 0}),
    withTiming(-150,{ duration: 3000, easing: Easing.linear}),
    withTiming(width, {duration: 0}),
    withTiming(-150,{ duration: 3000, easing: Easing.linear}),
    withTiming(width, {duration: 0}),
    withTiming(-150,{ duration: 3000, easing: Easing.linear}),
    withTiming(width, {duration: 0}),
    withTiming(-150,{ duration: 3000, easing: Easing.linear}),
    withTiming(width, {duration: 0}),
    withTiming(-150,{ duration: 3000, easing: Easing.linear}),
    withTiming(width, {duration: 0}),
    withTiming(-150,{ duration: 3000, easing: Easing.linear}),
    withTiming(width, {duration: 0}),
    withTiming(-150,{ duration: 3000, easing: Easing.linear}),
    withTiming(width, {duration: 0}),
    withTiming(-150,{ duration: 3000, easing: Easing.linear}),
    withTiming(width, {duration: 0}),
    withTiming(-150,{ duration: 3000, easing: Easing.linear}),
    withTiming(width, {duration: 0}),
    
    ) /*-1*/ )},[])

  
    const gesture = Gesture.Tap().onStart(() => { //When tapping it jumps without error of hold
    birdYVelocity.value = jumpforce;
  })

  const pipeOffset = 0; //Moving the pipes by increasing and decreasing the number  

  
  

  return (
<GestureHandlerRootView style={{ flex: 1 }}>
  <GestureDetector gesture={gesture}>
    <Canvas style={{ width, height}}> 

      {/* Background */}
      <Image image={bg} width={width} height={height} fit={"cover"}></Image> 

      
      {/* Pipes */}
      <Image 
        image={pipeTop} 
        y={pipeOffset- 320} 
        x={x}  
        width={103} 
        height={640}>
      </Image> 
      
      <Image 
        image={pipeBottom} 
        y={height - 320 + pipeOffset} 
        x={x}  
        width={103 } 
        height={640}>
      </Image> 

      
      {/* Base */}
      <Image  image={base} width={width} height={150 } y={height-75} x={0} fit={"cover"}></Image>


    <Group transform={birdTransform} 
    origin={birdOrgin}
    >
      {/* Bird */}
      <Image 
      image={bird} 
      x={width/4 } 
      y={birdY} 
      width={64} 
      height={48}
      ></Image>
    </Group>

    </Canvas>
    </GestureDetector>
    </GestureHandlerRootView>
  );
};
 
export default App;
