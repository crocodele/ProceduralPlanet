import * as THREE from 'three'
import vertShader from 'shaders/texture.vert'
import fragShader from 'shaders/textureMap.frag'
import Map from 'views/Map.js'

class TextureMap extends Map {

  constructor() {
    super();
    this.setup();
    super.setup();
  }

  setup() {
    this.mats = [];

    for (let i = 0; i < 6; i++) {
      this.mats[i] = new THREE.ShaderMaterial({
        uniforms: {
          biomeMap: {type: "t", value: new THREE.Texture()},
          heightMap: { type: "t", value: new THREE.Texture() },
          moistureMap: { type: "t", value: new THREE.Texture() },
          temperatureMap: { type: "t", value: new THREE.Texture() },
          iceCutoff: { type: "f", value: 0.2 }
        },
        vertexShader: vertShader,
        fragmentShader: fragShader,
        transparent: true,
        depthWrite: false
      });
    }
  }

  render(props) {
    // props.resolution
    // props.biomeMap
    // props.heightMaps[]
    // props.moistureMaps[]
    // props.temperatureMaps[]
    // props.iceCutoff

    for (let i = 0; i < 6; i++) {

      this.mats[i].uniforms.biomeMap.value = props.biomeMap;
      this.mats[i].uniforms.heightMap.value = props.heightMaps[i];
      this.mats[i].uniforms.moistureMap.value = props.moistureMaps[i];
      this.mats[i].uniforms.temperatureMap.value = props.temperatureMaps[i];
      this.mats[i].uniforms.iceCutoff = props.iceCutoff;  //this is somehow not passed to the shader
      this.mats[i].needsUpdate = true;
    }

    super.render(props);
  }

}

export default TextureMap;
