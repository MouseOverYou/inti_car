
var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };



/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    var assetsManager = new BABYLON.AssetsManager(scene)
    LoadAssets(scene, assetsManager)
    camera = new BABYLON.ArcRotateCamera("Camera", 65 * (Math.PI / 180), 80 * (Math.PI / 180), 5, new BABYLON.Vector3(0, 0.5, 0), scene);
    //camera = new BABYLON.ArcRotateCamera("Camera", 130 * (Math.PI / 180), 90 * (Math.PI / 180), 4, new BABYLON.Vector3(0, 0.5, 0), scene);
    camera.minZ = 1
    camera.panningDistanceLimit = 0;
    camera.pinchToPanMaxDistance = 0;
    camera.panningSensibility = 0
    camera.lowerRadiusLimit = 4
    camera.upperRadiusLimit = 8
    camera.upperBetaLimit = 90 * (Math.PI / 180)
    camera.angularSensibilityX = 3000
    camera.angularSensibilityy = 3000
    camera.wheelPrecision = 10
    camera.attachControl(canvas, true, true, false);

    var sphereGlass = BABYLON.Mesh.CreateSphere("sphereGlass", 48, 1.5, scene);
    sphereGlass.position.y = 2
    sphereGlass.visibility = 0;

    var glass = new BABYLON.PBRMaterial("glass", scene);
    glass.reflectionTexture = hdrTexture;
    glass.refractionTexture = hdrTexture;
    glass.linkRefractionWithTransparency = true;
    glass.indexOfRefraction = 0.52;
    glass.alpha = 0;
    glass.microSurface = 1;
    glass.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    glass.albedoColor = new BABYLON.Color3(0.85, 0.85, 0.85);
    sphereGlass.material = glass;

    scene.clearColor = new BABYLON.Color3(1, 1, 1);
    scene.ambientColor = new BABYLON.Color3(1, 1, 1);

    //var vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera:false});

    // Smoke
    /*
    BABYLON.ParticleHelper.CreateAsync("smoke", scene).then((set) => {
        set.start();
    });
    */

    scene.onPointerUp = function () {

        //htmlVideo.play()
    }

    return scene;
};
/******* End of the create scene function ******/

engine = createDefaultEngine();
if (!engine) throw 'engine should not be null.';
scene = createScene();;
sceneToRender = scene

let UpdateAnimRate = false
let readyForPosters = false
let AnimRate = 0
engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
    }
    if (UpdateAnimRate) {
        AnimRate += 0.01
        TurnLightsOn(AnimRate)
        //console.log(AnimRate)
    }
    if (readyForPosters) {

        PostersMat.emissiveTexture.vOffset -= 0.00025
        PostersMat.albedoTexture.vOffset -= 0.00025
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
