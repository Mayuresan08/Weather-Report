
 let displayOuter=document.querySelector("#displayOuter");
    let displayInner=document.querySelector(".displayInner");
    let size1=document.querySelector('#size1')
    let innerCard1=document.querySelector(".innerCard1")
  
    console.log(innerCard1)
    let city="chennai";

getWeather();

function weather(data)
{
    city=data;
    getWeather();
}

function search()
{
    city=document.getElementById("city").value
    document.getElementById("city").value=""
    getWeather();
}
function getWeather(){
    
 fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b8bfa3230a6aa312296f65bd45a4e0a3`)
 .then(data=>data.json())
 .then(data=>postWeather(data))
 .catch((error)=>{
     console.log(error)
    })
}

function postWeather(data)
{
    console.log(data)
 if(data.cod !== "200")
 {
     console.log(displayOuter,displayInner)
    displayInner.innerHTML =`<p class="d-flex justify-content-center ">The city you eneterd is not found, please try again.</h2>`;
 }
 else{
    lat=data.city.coord.lat
     lon=data.city.coord.lon
    displayInner.innerHTML=`<h2 class="text-center text-dark mb-4">Weather Report for ${city} city</h2>
    <div class="d-flex justify-content-center mb-3">
        <div><h4 class="text-dark">Latitude : ${lat} </div>
            <div><h4 class="text-dark ms-4">Longitude : ${lon} </div>
        </div>`
     for(i=1;i<=10;i++)
    {
        dateTime= new Date(data.list[i].dt_txt)
     hour =dateTime.getHours()
     date=dateTime.toDateString();
     temp=Math.round(data.list[i].main.temp-273)
     feels=Math.round(data.list[i].main.feels_like-273)
     humidity=data.list[i].main.humidity
     main_weather=data.list[i].weather[0].main
     min_temp=Math.round(data.list[i].main.temp_min-273)
     max_temp=Math.round(data.list[i].main.temp_max-273)
     pressure=data.list[i].main.pressure
     sea=data.list[i].main.sea_level
     weather_desc=data.list[i].weather[0].description
     wind_speed=data.list[i].wind.speed
     wind_rotation=data.list[i].wind.deg
     pop=data.list[i].pop
     country=data.city.country
     console.log(lat,lon,country)
     if(main_weather === 'Clouds') src=".\\icons\\clouds.png"
     else if(main_weather == "Rain") src=".\\icons\\rainy.png"
     else src=".\\icons\\sunny.png"
       displayInner.innerHTML +=`
       
        <div class="hourlyCards">
    <div class="hourlyCard">
        <div class="mainCard d-flex justify-content-between">
            <div class="d-flex flex-column">
            <div><p ><b>${hour} hour</b></p></div>
           <div><p >${date}</p></div>    
            </div>
            <di><h1>${temp}<sup class="degree">o</sup>c</h1></di>
            <div><img class="wIcons"src=${src}></div>
            <div><p class="text-muted">Feels like ${feels} <sup class="degree">o</sup>C</p></div>
            <div class="d-flex">
               <div> <img class="wIcons" src="icons/water-drop.png"></div>
               <h4 class="text-muted">${humidity}%</p>
            </div>
            <div><i class="fas fa-arrows-alt-v fIcons size1" onclick="resize(${i})"></i></div>
        </div>
        <div class='innerCard innerCard${i}  '  >
            <div class="d-flex justify-content-between">
                <div class="w-50 ">
                    <div class="itemBorder"> ${main_weather}</div>
                    <div class="d-flex justify-content-between itemBorder">
                       <div><p>min-temp</p></div> 
                       <div><p><b>${min_temp}</b></p></div>
                    </div>
                    <div class="d-flex justify-content-between itemBorder">
                        <div><p>max-temp</p></div> 
                        <div><p><b>${max_temp}</b></p></div>
                     </div>
                     <div class="d-flex justify-content-between itemBorder">
                        <div><p>pressure</p></div> 
                        <div class="d-flex"><p><b>${pressure}<p>mb</p></b></p></div>
                     </div>
                     <div class="d-flex justify-content-between itemBorder">
                        <div><p>humidity</p></div> 
                        <div class="d-flex"><p><b>${humidity}<p>%</p></b></p></div>
                     </div>
                </div>
                <div class="w-50 ms-4">
                    <div class="itemBorder">${weather_desc}</div>
                    <div class="d-flex justify-content-between itemBorder">
                        <div><p>sea-level</p></div> 
                        <div><p><b>${sea}</b></p></div>
                     </div>
                     <div class="d-flex justify-content-between itemBorder">
                        <div><p>wind-speed</p></div> 
                        <div class="d-flex"><p><b>${wind_speed} <p>km/hr</p></b></p></div>
                     </div>
                     <div class="d-flex justify-content-between itemBorder">
                        <div><p>wind-deg</p></div> 
                        <div class="d-flex"><p><b>${wind_rotation} <p>deg</p></b></p></div>
                     </div>
                     <div class="d-flex justify-content-between itemBorder">
                        <div><p>Pop</p></div> 
                        <div ><p><b>${pop} </b></p></div>
                     </div>
                </div>
            </div>
        </div>
    </div>
</div>`
    }
    for(i=2;i<=10;i++)
    {
        data="innerCard"+(i)
    document.getElementsByClassName(data)[0].style.display="none"

    }
 }
}

function resize(i)
{
    console.log("in")
     data="innerCard"+(i)
    innerCard=document.getElementsByClassName(data)[0]
    console.log(data,innerCard.style.display)
    if(innerCard.style.display === "none") 
    { 
        innerCard.style.display = 'block'; 
        innerCard.classList.add("animate")
     }
    else 
    {
        innerCard.style.display = 'none';
    }
}

