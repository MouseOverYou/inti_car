let woodMat, LeuchteMat, wheelMatIn, wheelMatOut
let videoMats = []
let wheelAlbedo = []
var wheelMetal = []
let coatMat, PostersMat;
function ChangeMaterialProperties() {

    var redBay = new BABYLON.Color3.FromHexString("#ea1e1e");
    var blueBay = new BABYLON.Color3.FromHexString("#063c9d");
    var lightGrayBay = new BABYLON.Color3.FromHexString("#eeeeee");
    var darkGrayBay = new BABYLON.Color3.FromHexString("#323334");
    var blackBay = new BABYLON.Color3.FromHexString("#000000");

    var yellow = new BABYLON.Color3.FromHexString("#E19A00");

    let sceneMats = scene.materials;
    for (let mat of sceneMats) {
        if (mat.name == "hdrSkyBox" ) {
            continue;
        }

        mat.reflectionTexture = hdrTexture;
        if (mat.name == "Car03_Body_Mat01") {
            //mat.reflectionTexture = hdrTexture;
            coatMat = mat
            mat.albedoColor = yellow;
            mat.roughness = 0.3
            mat.metallic = 1
            mat.albedoTexture = mat.ambientTexture

            mat.clearCoat.isEnabled = true;
            mat.clearCoat.intensity = 1; // 0-1 defaults to 1
            mat.clearCoat.roughness = 0.1; // 0-1 defaults to 0
            //material.clearCoat.texture = texture; // R is storing intensity and G roughness

            //mat.clearCoat.isTintEnabled = true;
            //mat.clearCoat.tintColor = Color3.Teal();
            //mat.clearCoat.bumpTexture = texture; // dedicated bump texture for the coat
        }
        else if(mat.name == "Car03_LightsEmissive"){
            LeuchteMat = mat
            //mat.emissiveColor = new BABYLON.Color3.FromHexString("#FFFFFF")
        }
        else if(mat.name =="Car03_Glass_Mat"){
            mat.roughness = 0;
            mat.metallic = 1
        }
        else if(mat.name == "Car03_Wheel_Mat00"){
            wheelMatOut = mat
            mat.metallicTexture = metalText010203
            mat.metallic = 1
            mat.roughness = 0.15
            mat.useMetallnessFromMetallicTextureBlue = true
            mat.useRoughnessFromMetallicTextureAlpha = true
            mat.metallicF0Factor = 1

        }
        else if(mat.name == "Car03_Wheel_Mat01"){
            wheelMatIn = mat
            mat.metallicTexture = metalText010203
            mat.metallic = 1
            mat.roughness = 0.15
            mat.useMetallnessFromMetallicTextureBlue = true
            mat.useRoughnessFromMetallicTextureAlpha = true
            mat.metallicF0Factor = 1

        }
        else if(mat.name == "Car03_Interior_Mat01"){
            mat.alpha = 1
            mat.roughness = 0.5
            mat.bumpTexture.level = 0.3
        }

        else if(mat.name == "env_floor"){
            scaleText(mat.albedoTexture, 20, 20)
            scaleText(mat.bumpTexture, 20, 20, 0.4)
            //scaleText(mat.metallicTexture, 20, 20)
            mat.roughness = 0.3
            mat.metallic = 0.3
        }
        else if(mat.name == "env_walls"){
            scaleText(mat.albedoTexture, 100, 1, 1)
            scaleText(mat.bumpTexture, 100, 1, 1)
            mat.metallic = 0.1
            mat.roughness = 0.5
            mat.metallicF0Factor = 0
            var wallsAO = new BABYLON.Texture("./assets/Walls2Ambient_Occlusion.png", scene, true, false)
            mat.ambientTexture = wallsAO
        }
        else if(mat.name == "coll Mat"){
            mat.alpha = 0
            mat.transparencyMode = 2
        }
        else if(mat.name =="FloorAO"){
            var textAlpha = new BABYLON.Texture("./assets/FLoor Opacity.png", scene, true, false);
            textAlpha.getAlphaFromRGB = true
            mat.opacityTexture = textAlpha
            mat.albedoTexture = ""
            mat.albedoColor = blackBay
            mat.unlit = true
        }
        else if (mat.name == "Poster"){
            PostersMat = mat
            mat.metallic = 0
            mat.roughness = 0
            poster2 = new BABYLON.Texture("./assets/poster_inti.jpg", scene, true, false)
            mat.albedoTexture = poster2
            mat.emissiveTexture = poster2
        }

    }


}

function UpdateEnvReflections(hdr){
    let sceneMats = scene.materials;
    for (let mat of sceneMats) {
        if (mat.name == "hdrSkyBox" ) {
            continue;
        }

        mat.reflectionTexture = hdr;
    }

}

function LoadTextures(){
    //load albedos
    var wheelAlbedo01 = new BABYLON.Texture("./assets/Car03_Wheel_Albedo03.png", scene, true, false)
    wheelAlbedo.push(wheelAlbedo01)
    var wheelAlbedo02 = new BABYLON.Texture("./assets/Car03_Wheel_Albedo06.png", scene, true, false)
    wheelAlbedo.push(wheelAlbedo02)
    var wheelAlbedo03 = new BABYLON.Texture("./assets/Car03_Wheel_Albedo07b.png", scene, true, false)
    wheelAlbedo.push(wheelAlbedo03)
    var wheelAlbedo04 = new BABYLON.Texture("./assets/Car03_Wheel_Albedo10.png", scene, true, false)
    wheelAlbedo.push(wheelAlbedo04)
    //load metals
    var wheelMetal01 = new BABYLON.Texture("./assets/Car03_Wheel_Metallic01-03 SWAPPED.png", scene, true, false)
    wheelMetal.push(wheelMetal01)
    var wheelMetal03= new BABYLON.Texture("./assets/Car03_Wheel_Metallic05-08 SWAPPED.png", scene, true, false)
    wheelMetal.push(wheelMetal03)



}
function scaleText(text, uValue, vValue, strength){
    text.uScale = uValue
    text.vScale = vValue
    if(strength == null){
        return
    }
    text.level = strength
}

var colMat
function CreateCustomMaterials() {
    colMat = new BABYLON.StandardMaterial("colMat", scene)
    colMat.wireframe = false
    colMat.alpha = 0
}

function createVideoMat() {

    var videoMat = new BABYLON.PBRMaterial("videoMat", scene);
    videoMats.push(videoMat)
    var dotsText = new BABYLON.Texture("./assets/videoDots2.jpg", scene, true, false)
    var ambientScreen = new BABYLON.Texture("./assets/screenAmbient.jpg", scene, true, false)
    videoMat.ambientTexture = ambientScreen
    videoMat.bumpTexture = dotsText
    videoMat.bumpTexture.level = 0
    videoMat.bumpTexture.uScale = 1
    videoMat.bumpTexture.vScale = 1
    videoMat.emissiveColor = new BABYLON.Color3.FromHexString("#313131")
    videoMat.metallic = 0
    videoMat.roughness = 0

    return videoMat;
}

