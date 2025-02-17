var Car_P, Roof_P
var hdrTexture, hdrTextureCity, hdrTextureStudio, hdrSkyboxMaterial, hdrSkybox, CanyonEnvTask, CityEnvTask, StudioEnvTask
var MesseCollidersLoaderTask, BottleLoaderTask
var wheelHolder_00 = []
var wheelHolder_01 = []
var metalText010203
function LoadAssets(scene, assetsManager) {


    //CanyonEnvTask
    CanyonEnvTask = assetsManager.addCubeTextureTask("CanyonEnvTask", "./assets/Runyon_Canyon_A_2k_cube_specular.dds");

    CanyonEnvTask.onSuccess = function (task) {
        hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData(task.texture.name, scene);
        //hdrTexture = task.texture
        hdrTexture.rotationY = 180 * (Math.PI / 180);
        hdrTexture.level = 1

        hdrSkyboxMaterial = new BABYLON.PBRMaterial("hdrSkyBox", scene);
        hdrSkyboxMaterial.backFaceCulling = false;
        hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
        hdrSkyboxMaterial.reflectionTexture.level = 0.1
        hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        hdrSkyboxMaterial.microSurface = 1.0;
        hdrSkyboxMaterial.disableLighting = false;
        // Create Skybox
        hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
        hdrSkybox.visibility = 1
        hdrSkybox.material = hdrSkyboxMaterial;
        hdrSkybox.infiniteDistance = false;

    }
    CanyonEnvTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    //CanyonEnvTask
    CityEnvTask = assetsManager.addCubeTextureTask("CityEnvTask", "./assets/environment.dds");

    CityEnvTask.onSuccess = function (task) {
        hdrTextureCity = new BABYLON.CubeTexture.CreateFromPrefilteredData(task.texture.name, scene);
        //hdrTexture = task.texture
        hdrTextureCity.rotationY = 180 * (Math.PI / 180);
        hdrTextureCity.level = 1

    }
    CityEnvTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    //StudioEnvTask
    StudioEnvTask = assetsManager.addCubeTextureTask("StudioEnvTask", "./assets/DivaStudioSpecularHDR2.dds");

    StudioEnvTask.onSuccess = function (task) {
        hdrTextureStudio = new BABYLON.CubeTexture.CreateFromPrefilteredData(task.texture.name, scene);
        //hdrTexture = task.texture
        hdrTextureStudio.rotationY = 300 * (Math.PI / 180);
        hdrTextureStudio.level = 0.4

    }
    CityEnvTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }


    Car_P = new BABYLON.TransformNode("Car_P");
    MesseLoaderTask = assetsManager.addMeshTask("", "", "./assets/car_web_LOD1.glb")

    MesseLoaderTask.onSuccess = function (task) {

        task.loadedMeshes[0].position.x = 0
        task.loadedMeshes[0].position.y = 0.001
        task.loadedMeshes[0].position.z = 0
        task.loadedMeshes[0].parent = Car_P
        Car_P.position.x = 0
        Car_P.position.y = 0
        Car_P.scaling = new BABYLON.Vector3(1, 1, 1)
        //task.loadedMeshes[0]._children[3]._children[4].rotationQuaternion = null

        //console.log(task.loadedMeshes[0]._children[3]._children)
        //get wheel set 0
        for (var wheelSet of task.loadedMeshes[0]._children[3]._children) {

            if (wheelSet.name.startsWith("0_Car03_Wheel")) {
                wheelSet.rotationQuaternion = null;
                wheelHolder_00.push(wheelSet)
            }
            else if (wheelSet.name.startsWith("1_Car03_Wheel")) {
                wheelSet.rotationQuaternion = null;
                //wheelSet.setEnabled(false)
                wheelHolder_01.push(wheelSet)
            }

        }
        console.log(wheelHolder_00)
        metalText010203 = new BABYLON.Texture("./assets/Car03_Wheel_Metallic01-03 SWAPPED.png", scene, true, false)

    }

    MesseLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    Roof_P = new BABYLON.TransformNode("Roof_P");
    WorldLoaderTask = assetsManager.addMeshTask("", "", "./assets/car_web_env2.glb")

    WorldLoaderTask.onSuccess = function (task) {

        task.loadedMeshes[0].position.x = 0
        task.loadedMeshes[0].position.y = 0
        task.loadedMeshes[0].position.z = 0
        task.loadedMeshes[0].parent = Roof_P
        Roof_P.position.x = 0
        Roof_P.position.y = 0
        Roof_P.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01)

    }

    WorldLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    //FINISH

    var pbr
    assetsManager.onFinish = function (task) {
        LoadTextures()
        ChangeMaterialProperties()
        readyForPosters = true
        AddGlow()
        EditMeshes();
        CreateLighting()
        BufferWheelAnim()
        //AddShadows();
        //PostEffects(scene)
        //AddSSAO()

    }
    //Asset Manager check
    assetsManager.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
        engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
        document.getElementsByClassName("text-progress")[0].innerHTML = 100 - remainingCount / totalCount * 100 + "%"

    };

    assetsManager.load();
}


