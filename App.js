import { Canvas, Circle, Group, useImage, Image } from "@shopify/react-native-skia";
import { requireNativeModule } from "expo";
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { Easing, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";


 
const App = () => {
  const {width, height} = useWindowDimensions(); // setting the hieght and width to the dimensions of my screen

  const bg = useImage(require('./assets/sprites/background-day.png')); //import the image for the background
  const bird = useImage(require('./assets/sprites/yellowbird-upflap.png')); // bird upwing
  const pipeBottom = useImage(require('./assets/sprites/pipe-green.png')); //green pipe
  const pipeTop = useImage(require('./assets/sprites/pipe-green-top.png')); //green pipe top
  const base = useImage(require('./assets/sprites/base.png')); //floor

  const x = useSharedValue(width);

  useEffect(() => {
  x.value = withRepeat( withSequence( 
    withTiming(-200,{ duration: 3000, easing: Easing.linear}),
    withTiming(width, {duration: 0})
    )1)
  },[]);

  const pipeOffset = 0; //Moving the pipes by increasing and decreasing the number  

  
  

  return (

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
      <Image image={base} width={width} height={150 } y={height-75} x={0} fit={"cover"}></Image>



      {/* Bird */}
      <Image image={bird} x={width/4 } y={height/2 } width={64} height={48}></Image>
    </Canvas>
  );
};
 
export default App;
