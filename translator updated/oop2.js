    let input
    let id
    function read(id){
        return document.getElementById(id).value;
    }

    async function Translate(){
        if(read("input-text")!=''){
            try{
            
                input = read("input-text")
                const inp_lang = read("inp_lang")
                const out_lang = read("out_lang")
                const res = await fetch('https://libretranslate.de/translate',{
                    method:"POST",
                    body: JSON.stringify({
                        q: input,
                        source: inp_lang,
                        target: out_lang,
                        format: 'text',
                    }),
                    headers:{
                        "Content-Type": "application/json"
                    },
                });
                const data = await res.json();
                document.getElementById('output-inner').innerText = data.translatedText
                console.log("data:",data)
            } catch(err){
                console.log('err:',err)
            }
        }
    }

let controls = document.getElementById('controls')

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

if(SpeechRecognition){
    console.log("working")
    controls.insertAdjacentHTML("beforeend",'<button id="micbtn"><i id="mic" class="fa-solid fa-microphone"></i></button>')
    const recognition = new SpeechRecognition();
    recognition.continuous = true;

    let mic = document.getElementById('mic')
    let micbtn = document.getElementById('micbtn')

    micbtn.addEventListener('click',() => {
        if(mic.style.color =="red"){
            mic.style.color ="black"
            recognition.stop()
        }
        else{
            mic.style.color ="red";
            recognition.lang = inp.value;
            recognition.start();
        }
    })
    recognition.addEventListener('start',()=>{
        console.log('start')
    })
    recognition.addEventListener('end',()=>{
        console.log('end')
    })
    recognition.addEventListener('result',(event)=>{
        document.querySelector('#input-text').value =null
        document.querySelector('#output-inner').innerText =null
        document.querySelector('#input-text').value = event.results[0][0].transcript
        
        setTimeout(()=>{
            Translate();
            recognition.stop();
            mic.style.color ="black";
        },250)
    })
}
else{
    console.log("not working")
}



//swap button
let middle = document.querySelector('#middle')
let inp = document.querySelector('#inp_lang')
let out = document.querySelector('#out_lang')
let inptext = document.querySelector('#input-text')
let outtext = document.querySelector('#output-inner')
let temp1
let temp2

middle.addEventListener('click',()=>{
    temp1 = inp.value
    inp.value  = out.value
    out.value = temp1

    temp2 = inptext.value
    inptext.value  = outtext.innerText
    outtext.innerText = temp2
})

// de-bouncing

async function main(){
    let data =await Translate();
}


function debounce(func, delay){
    if(id){
        clearTimeout(id)
    }
    id= setTimeout(()=>{
        func()
    },delay)
}