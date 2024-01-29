var wheelAnimOut = gsap.timeline({paused: true})

async function BufferWheelAnim(){
    for(var i = 0; i<wheelHolder_00.length; i++){
        //right: 1,3; left: 0,2
        if(i==0 || i== 1)
            await AddWheelOut(wheelHolder_00[i], -1)
        else
            await AddWheelOut(wheelHolder_00[i], 1)
    }

    for(var i = 0; i<wheelHolder_00.length; i++){
        //right: 1,3; left: 0,2
        if(i==0 || i== 1)
            await AddWheelIn(wheelHolder_01[i], 1)
        else
            await AddWheelIn(wheelHolder_01[i], 1)
    }

}
//apply out only for clones
function AddWheelOut(wheel, pos){
    wheelAnimOut.to(wheel.position, {x: 1*pos, duration: 2.5/25}, 0)
    wheelAnimOut.to(wheel.position, {x: 0.76*pos, duration: 7.5/25}, ">")
    wheelAnimOut.to(wheel.scaling, {x: 0.0, y: 0.0, z:0.0, ease:"back.in(2)", duration: 10/25}, 0)
    wheelAnimOut.to(wheel.rotation, {y:  90*pos * (Math.PI / 180), duration: 10/25}, 0)
}

function AddWheelIn(wheel, pos){
    wheelAnimOut.fromTo(wheel.scaling, {x: 0.0, y: 0.0, z:0.0}, {x: 0.01, y: 0.01, z:0.01, ease: "back.out(1.7)", delay: 10/25, duration: 10/25}, 0)
    wheelAnimOut.fromTo(wheel.rotation, {z:  90 * (Math.PI / 180)}, {z:  0 * (Math.PI / 180), delay: 10/25, duration: 10/25}, 0)
    wheelAnimOut.fromTo(wheel.rotation, {x:  -90 * (Math.PI / 180)}, {x:  0 * (Math.PI / 180), delay: 10/25, duration: 10/25}, 0)
}
function TurnLightsOff(){
    spotLightL.diffuse = new BABYLON.Color3(0, 0, 0)
    spotLightR.diffuse = new BABYLON.Color3(0, 0, 0)
    godrays.exposure = 0

    LeuchteMat.emissiveColor = new BABYLON.Color3(0, 0, 0)
}

function TurnLightsOn(rate) {
    rate = rate * 2
    //spots
    spotLightL.diffuse = new BABYLON.Color3(rate, rate, rate)
    spotLightR.diffuse = new BABYLON.Color3(rate, rate, rate)

    //general
    LeuchteMat.emissiveColor = new BABYLON.Color3(255 / 255 * rate, 255 / 255 * rate, 255 / 255 * rate)
    godrays.exposure = rate/4


    if (rate > 0.99) {
        UpdateAnimRate = false
        AnimRate = 0;
    }
}