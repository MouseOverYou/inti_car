// https://doc.babylonjs.com/api/classes/babylon.defaultrenderingpipeline
var defaultPipeline;
function PostEffects(scene) {
    defaultPipeline = new BABYLON.DefaultRenderingPipeline(
        "DefaultRenderingPipeline",
        true, // is HDR?
        scene,
        scene.cameras
    );
    if (defaultPipeline.isSupported) {
        /* MSAA */
        defaultPipeline.samples = 4; // 1 by default
        /* sharpen */
        defaultPipeline.sharpenEnabled = false;
        if (defaultPipeline.sharpenEnabled) {
            defaultPipeline.sharpen.adaptScaleToCurrentViewport = false; // false by default
            defaultPipeline.sharpen.edgeAmount = 0.3; // 0.3 by default
            defaultPipeline.sharpen.colorAmount = 1; // 1 by default
        }
    }
}
 function AddSSAO(){
             // Create SSAO and configure all properties (for the example)
             var ssaoRatio = {
                ssaoRatio: 0.5, // Ratio of the SSAO post-process, in a lower resolution
                combineRatio: 1.0 // Ratio of the combine post-process (combines the SSAO and the scene)
            };
    
            var ssao = new BABYLON.SSAORenderingPipeline("ssao", scene, ssaoRatio);
            ssao.fallOff = 0.000001;
            ssao.area = 1;
            ssao.radius = 0.0001;
            ssao.totalStrength = 1.0;
            ssao.base = 0.55;
    
            // Attach camera to the SSAO render pipeline
            scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssao", camera);
 }

 function AddSSAO(){
    // Create SSAO and configure all properties (for the example)
    var ssaoRatio = {
       ssaoRatio: 0.5, // Ratio of the SSAO post-process, in a lower resolution
       combineRatio: 1.0 // Ratio of the combine post-process (combines the SSAO and the scene)
   };

   var ssao = new BABYLON.SSAORenderingPipeline("ssao", scene, ssaoRatio);
   ssao.fallOff = 0.000001;
   ssao.area = 1;
   ssao.radius = 0.0001;
   ssao.totalStrength = 1.0;
   ssao.base = 0.55;

   // Attach camera to the SSAO render pipeline
   scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssao", camera);
   //scene.postProcessRenderPipelineManager.disableEffectInPipeline("ssaopipeline", ssao.SSAOCombineRenderEffect, camera);
}