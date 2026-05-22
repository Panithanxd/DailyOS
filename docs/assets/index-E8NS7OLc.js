(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=e(n);fetch(n.href,a)}})();const U=10*60*1e3;async function F(r,t={},e=U){const i=`api_cache_${r}`;if(!navigator.onLine){const a=localStorage.getItem(i);if(a){const{data:o}=JSON.parse(a);return console.log(`[API Cache] Offline mode: Served ${r} from cache.`),o}throw new Error("ระบบออฟไลน์และไม่มีข้อมูลสำรองสำหรับคำขอนี้")}const n=localStorage.getItem(i);if(n){const{data:a,timestamp:o}=JSON.parse(n);if(Date.now()-o<e)return a}try{const a=await fetch(r,t);if(!a.ok)throw new Error(`HTTP Error: ${a.status}`);const o=await a.json();return localStorage.setItem(i,JSON.stringify({data:o,timestamp:Date.now()})),o}catch(a){if(console.warn(`[API Cache] Fetch failed, fallback to cache for ${r}:`,a.message),n){const{data:o}=JSON.parse(n);return o}throw a}}const D={0:["☀️","CLEAR SKY","ท้องฟ้าแจ่มใส"],1:["🌤","MAINLY CLEAR","ท้องฟ้าโปร่ง"],2:["⛅","PARTLY CLOUDY","มีเมฆบางส่วน"],3:["☁️","OVERCAST","เมฆครึ้ม"],45:["🌫","FOGGY","หมอกลงจัด"],48:["🌫","RIME FOG","หมอกน้ำค้างแข็ง"],51:["🌦","LIGHT DRIZZLE","ฝนตกปรอยๆ เล็กน้อย"],53:["🌦","DRIZZLE","ฝนตกปรอยๆ"],55:["🌧","HEAVY DRIZZLE","ฝนตกปรอยหนาแน่น"],61:["🌧","LIGHT RAIN","ฝนตกเล็กน้อย"],63:["🌧","MODERATE RAIN","ฝนตกปานกลาง"],65:["🌧","HEAVY RAIN","ฝนตกชุกหนาแน่น"],80:["🌦","RAIN SHOWERS","ฝนตกกระจายตัว"],81:["⛈","STORM","พายุฝนฟ้าคะนอง"],82:["⛈","HEAVY STORM","พายุฝนคะนองรุนแรง"],95:["⛈","THUNDERSTORM","พายุฝนรุนแรงและฟ้าผ่า"],96:["⛈","HAIL STORM","พายุฝนฟ้าคะนองและลูกเห็บ"]},R=[{max:50,col:"#10b981",lbl:"ดีเยี่ยม (Good)",advice:"คุณภาพอากาศดีมาก เหมาะสำหรับทำกิจกรรมกลางแจ้ง"},{max:100,col:"#f59e0b",lbl:"ปานกลาง (Moderate)",advice:"คุณภาพอากาศปานกลาง กลุ่มเสี่ยงควรหลีกเลี่ยงกิจกรรมกลางแจ้งเป็นเวลานาน"},{max:150,col:"#ff9f43",lbl:"เริ่มมีผลกระทบ (Sensitive)",advice:"ควรสวมหน้ากากอนามัยเมื่ออยู่นอกอาคาร และลดการออกกำลังกายกลางแจ้ง"},{max:200,col:"#ef4444",lbl:"มีผลเสียต่อสุขภาพ (Unhealthy)",advice:"⚠️ สวมหน้ากาก PM2.5 ตลอดเวลาเมื่ออยู่กลางแจ้ง หลีกเลี่ยงกิจกรรมนอกอาคาร"},{max:300,col:"#b71c1c",lbl:"แย่อย่างยิ่ง (Very Unhealthy)",advice:"🚨 เป็นอันตรายต่อสุขภาพ! ควรอยู่ในอาคารที่ปิดมิดชิดและเปิดเครื่องฟอกอากาศ"},{max:500,col:"#7f1d1d",lbl:"อันตรายสูงสุด (Hazardous)",advice:"❌ วิกฤตคุณภาพอากาศร้ายแรง! ห้ามออกนอกอาคารโดยไม่จำเป็น"}];function j(r,t){const e=new Date,i=e.getHours(),n=i>=6&&i<10?1:i>=10&&i<14?2:i>=14&&i<18?3:0,a=Array.from({length:24},(l,c)=>{const d=new Date(e);return d.setHours(c,0,0,0),d.toISOString()}),o=Array.from({length:7},(l,c)=>{const d=new Date(e);return d.setDate(d.getDate()+c),d.toISOString().split("T")[0]}),s=Array.from({length:24},(l,c)=>30+Math.round(Math.sin((c-6)*Math.PI/12)*5));return{current:{temperature_2m:33,apparent_temperature:38,relative_humidity_2m:72,weather_code:n,wind_speed_10m:12,wind_direction_10m:180,surface_pressure:1009,visibility:9e3},hourly:{time:a,temperature_2m:s,weather_code:Array(24).fill(n),precipitation_probability:Array(24).fill(10)},daily:{time:o,weather_code:[1,2,3,63,1,2,0],temperature_2m_max:[35,34,33,30,36,35,37],temperature_2m_min:[26,25,25,24,27,26,27],sunrise:o.map(l=>l+"T06:08"),sunset:o.map(l=>l+"T18:32"),uv_index_max:[10,9,7,4,11,10,12],precipitation_sum:[0,0,2,15,0,0,0],precipitation_probability_max:[5,10,30,80,5,10,5]},latitude:r,longitude:t,_isMock:!0}}function J(r,t){return{current:{us_aqi:78,pm2_5:22.4},latitude:r,longitude:t,_isMock:!0}}async function N(r,t){const e=`https://api.open-meteo.com/v1/forecast?latitude=${r}&longitude=${t}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max&timezone=Asia%2FBangkok`,i=`api_cache_${e}`;try{const n=localStorage.getItem(i);if(n){const{timestamp:a}=JSON.parse(n);Date.now()-a>10*60*1e3&&localStorage.removeItem(i)}}catch{localStorage.removeItem(i)}try{return await F(e,{},6e5)}catch{return j(r,t)}}async function K(r,t){const e=`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${r}&longitude=${t}&current=us_aqi,pm2_5&timezone=Asia%2FBangkok`;try{return await F(e,{},10*60*1e3)}catch{return J(r,t)}}async function V(r){if(!r)return[];const t=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(r)}&count=5&language=th&format=json`;try{return(await(await fetch(t)).json()).results||[]}catch{return[]}}function Q(r,t){return[51,53,55,61,63,65,80,81,82,95,96].includes(r)||t>=40?{needed:!0,text:"☔ ควรพกร่มหรือเสื้อกันฝน! มีโอกาสเกิดฝนตกสูงในระหว่างวัน",color:"var(--cyan)"}:t>=15?{needed:!1,text:"🌤️ ฝนตกยาก แต่ท้องฟ้าอาจครึ้มๆ ไม่จำเป็นต้องพกร่ม",color:"var(--muted)"}:{needed:!1,text:"☀️ ท้องฟ้าแจ่มใส/แดดจัด เดินทางสะดวก ไม่จำเป็นต้องพกร่ม",color:"var(--green)"}}function Z(r,t,e){return[51,53,55,61,63,65,80,81,82,95,96].includes(e)?"เสื้อผ้าแห้งไว (Quick-Dry) หรือเสื้อคลุมกันน้ำ หลีกเลี่ยงรองเท้าผ้าใบสีขาว":r>=35?"เสื้อผ้าฝ้ายบางเบา ระบายอากาศดีเยี่ยม หมวก แว่นกันแดด และควรทาครีมกันแดด":r>=28?"เสื้อผ้าสวมใส่สบาย เช่น เสื้อยืด แขนสั้น กางเกงขาสั้น/ระบายความร้อนได้ดี":r>=22?"เสื้อยืดแขนสั้น หรือเชิ้ตบางๆ สภาพอากาศกำลังเย็นสบายกำลังดี":"สวมเสื้อแขนยาว หรือเตรียมเสื้อแจ็คเก็ตบางๆ เนื่องจากอากาศค่อนข้างเย็น"}function X(r){return r>=8?{text:"อันตรายระดับสูงมาก! หลีกเลี่ยงแสงแดดช่วง 10:00-16:00 ทากันแดด SPF 30+",color:"var(--red)"}:r>=6?{text:"ระดับสูง! ควรทาครีมกันแดด สวมหมวกปีกกว้าง และสวมแว่นกันแดด",color:"var(--yellow)"}:r>=3?{text:"ระดับปานกลาง ควรกางร่มเมื่อเดินกลางแจ้งเป็นเวลานาน",color:"var(--cyan)"}:{text:"ระดับต่ำ ปลอดภัยต่อการออกแดดทั่วไป",color:"var(--green)"}}const tt=[{name:"สายด่วนเจ็บป่วยฉุกเฉิน (สพฉ.)",number:"1669",category:"medical",desc:"กู้ชีพและอุบัติเหตุแพทย์ฉุกเฉิน"},{name:"เหตุด่วนเหตุร้าย (ตำรวจ)",number:"191",category:"police",desc:"แจ้งเหตุด่วนตำรวจหลัก"},{name:"สายด่วนข้อมูลการจราจร (บก.02)",number:"1197",category:"traffic",desc:"ศูนย์ควบคุมสั่งการจราจรกรุงเทพฯ"},{name:"ตำรวจทางหลวง",number:"1193",category:"traffic",desc:"เหตุบนมอเตอร์เวย์และทางหลวงแผ่นดิน"},{name:"แจ้งเหตุอัคคีภัย/ดับเพลิง",number:"199",category:"fire",desc:"นักดับเพลิงและกู้ภัยกรุงเทพฯ"},{name:"ศูนย์แพทย์ฉุกเฉินกทม. (ศูนย์เอราวัณ)",number:"1646",category:"medical",desc:"หน่วยแพทย์เคลื่อนที่กทม."},{name:"สายด่วนข้อมูลน้ำท่วมกทม.",number:"1555",category:"flood",desc:"ศูนย์ประสานงานน้ำท่วมกรุงเทพฯ"},{name:"สถานีวิทยุจราจรเพื่อการแจ้งเหตุ (จส.100)",number:"1137",category:"traffic",desc:"รายงานอุบัติเหตุและของหาย"}];function q(r){const t=[];return[61,63,65,80,81,82,95,96].includes(r)&&(t.push({id:"rain_alert",level:"warning",title:"🌧️ แจ้งเตือนฝนฟ้าคะนองในพื้นที่",text:"มีฝนตกชุกหนาแน่นและลมกรรโชกแรงในเขตกรุงเทพมหานครและปริมณฑล หลีกเลี่ยงการเดินทางกลางแจ้งหากไม่จำเป็น"}),r>=63&&t.push({id:"flood_alert",level:"danger",title:"🚨 พื้นที่เสี่ยงน้ำท่วมขังรอระบาย",text:"เนื่องจากมีปริมาณน้ำสะสมสูง พบปัญหาถนนน้ำขังระดับ 10-15 ซม. ที่ ถนนอโศกมนตรี (หน้า ตึก GMM), แยกรัชดา-ลาดพร้าว และซอยสุขุมวิท 39"})),t.push({id:"aqi_alert",level:"info",title:"😷 อัพเดทสถานการณ์ฝุ่น PM 2.5",text:"ค่าฝุ่นละออง PM 2.5 วันนี้มีแนวโน้มสะสมตัวเนื่องจากสภาพลมสงบ แนะนำตรวจเช็คดัชนีคุณภาพอากาศก่อนทำกิจกรรมกลางแจ้งทุกครั้ง"}),t}function et(){const r=[],t=new Date,e=["ถนนลาดพร้าว ซอย 80 (งานปรับปรุงระบบจำหน่ายแรงสูงเพื่อความปลอดภัย)","ซอยสุขุมวิท 22 (ติดตั้งอุปกรณ์ตรวจวัดกระแสไฟฟ้าแรงสูง)","ถนนพระราม 9 ซอย 15 (ย้ายเสาพาดสายหลบแนวก่อสร้างทางรถไฟฟ้า)"];for(let i=0;i<3;i++){const n=new Date(t);n.setDate(t.getDate()+i+1),r.push({id:`outage_${i}`,title:`⚡ ประกาศดับไฟเพื่อบำรุงรักษา — ${e[i]}`,time:`${n.toLocaleDateString("th-TH",{day:"numeric",month:"short"})} | 08:30 น. - 15:30 น.`,status:"กำลังดำเนินการตามแผน"})}return r}class it{constructor(t,e){this.containerId=t,this.state=e}async init(){this.container=document.getElementById(this.containerId),this.container&&(this.renderSkeleton(),await this.fetchAndRender())}renderSkeleton(){this.container.innerHTML=`
      <div class="glass-card skeleton" style="height: 120px;"></div>
    `}async fetchAndRender(){try{const t=this.state.getCoords(),e=await N(t.lat,t.lon),i=await K(t.lat,t.lon),n=e.current.weather_code,a=q(n);this.render(e,i,a)}catch(t){console.warn("Commute insights fetch error:",t.message),this.container.innerHTML=""}}render(t,e,i){const n=t.current,a=e.current.us_aqi,s=new Date().getHours();let l="",c="🌟",d="เช้าอันสดใส เหมาะแก่การเดินทาง",p="var(--cyan)";const y=[61,63,65,80,81,82,95,96].includes(n.weather_code);i.some(T=>T.id==="flood_alert")?(l="<b>แจ้งเตือนภัยพิบัติ:</b> มีฝนตกหนักน้ำท่วมขังในบางพื้นที่และพบบีทีเอสขัดข้อง ดีเลย์ประมาณ 8 นาที แนะนำให้เผื่อเวลาอย่างน้อย 20-30 นาทีในการเดินทางช่วงนี้",c="🚨",d="แจ้งเตือน: การเดินทางมีความเสี่ยงสูง",p="var(--red)"):y?(l="<b>พยากรณ์ฝนตก:</b> ท้องฟ้าครึ้มฝนฟ้าคะนองในเขตกทม. แนะนำให้พกร่มและสวมใส่รองเท้าที่กันน้ำได้ การจราจรบนทางด่วนอาจชะลอตัวเนื่องจากทัศนวิสัยต่ำ",c="☔",d="เตือนภัย: มีฝนฟ้าคะนองในพื้นที่",p="var(--yellow)"):n.temperature_2m>=35?(l="<b>สภาพอากาศร้อนจัด:</b> อุณหภูมิพุ่งสูงถึง 36°C+ แนะนำให้สวมใส่เสื้อผ้าเบาสบาย ระบายอากาศได้ดี หลีกเลี่ยงแดดจัดช่วงเที่ยง-บ่าย และพกน้ำดื่มติดตัว",c="☀️",d="เตือนภัย: สภาพอากาศร้อนจัด (Extreme Heat)",p="#f59e0b"):a>150?(l="<b>มลพิษทางอากาศ:</b> ค่าฝุ่น PM 2.5 วันนี้สูงเกินมาตรฐาน (US AQI: "+a+") แนะนำให้สวมใส่หน้ากาก N95 ก่อนทำกิจกรรมกลางแจ้ง",c="😷",d="เตือนภัย: คุณภาพอากาศเป็นอันตราย",p="#a855f7"):(l="<b>สภาพอากาศเอื้ออำนวย:</b> อากาศปลอดโปร่ง ไม่มีรายงานดีเลย์รถไฟฟ้า การจราจรช่วงเช้านี้ไหลลื่นปกติ ขอให้คุณเดินทางด้วยความสุขความปลอดภัย!",c="✨",d="สถานการณ์ปกติ: เดินทางได้ราบรื่น",p="var(--cyan)");let m=30,u="เบาบาง (เดินทางสะดวก)",f="var(--green)";s>=7&&s<=9||s>=17&&s<=19?(m=85,u="หนาแน่นสูง (ชานชาลาแออัด)",f="var(--red)"):(s>=11&&s<=13||s>=16&&s<17)&&(m=55,u="ปานกลาง (มีผู้โดยสารพ้นเก้าอี้)",f="var(--yellow)");let x="07:00 น. หรือ หลัง 09:15 น.",b="16:30 น. หรือ หลัง 19:30 น.";y&&(x="เดินทางล่วงหน้าเร็วขึ้น 30 นาที",b="รอฝนซาหลัง 19:30 น."),this.container.innerHTML=`
      <div class="glass-card glow-card" style="margin-bottom: 24px; border-color: ${p}33; display: flex; flex-direction: column; gap: 16px; background: linear-gradient(135deg, ${p}05 0%, rgba(13, 20, 35, 0.4) 100%);">
        
        <!-- Header status -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border); padding-bottom: 12px;">
          <div style="display: flex; gap: 10px; align-items: center;">
            <div style="font-size: 1.5rem; line-height: 1;">${c}</div>
            <div>
              <div style="font-size: 0.85rem; font-weight: 600; color: ${p};">${d}</div>
              <div style="font-size: 0.65rem; color: var(--muted); margin-top: 1px; font-family: 'JetBrains Mono', monospace;">DAILY COMMUTE BRIEFING</div>
            </div>
          </div>
          
          <div style="font-size: 0.65rem; color: var(--muted); font-family: 'JetBrains Mono', monospace; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; padding: 3px 8px;">
            AI SYNTHESIS
          </div>
        </div>

        <!-- Briefing text -->
        <div style="font-size: 0.8rem; line-height: 1.6; color: var(--text);">
          ${l}
        </div>

        <!-- Metrics Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 4px;">
          
          <!-- Best time to leave -->
          <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 6px;">
            <div style="font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; font-family: 'JetBrains Mono', monospace; display: flex; align-items: center; gap: 4px;">
              <i data-lucide="clock" style="width: 12px; height: 12px;"></i> ช่วงเวลาที่ควรเลี่ยง (เพื่อเลี่ยงรถติด)
            </div>
            <div style="font-size: 0.75rem; line-height: 1.4;">
              🏠 ไปทำงาน: <b style="color: var(--cyan);">${x}</b><br>
              💻 กลับบ้าน: <b style="color: var(--cyan);">${b}</b>
            </div>
          </div>

          <!-- Platform Crowding Index -->
          <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 6px;">
            <div style="font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; font-family: 'JetBrains Mono', monospace; display: flex; align-items: center; gap: 4px;">
              <i data-lucide="users" style="width: 12px; height: 12px;"></i> ความหนาแน่นของรถไฟฟ้า (BTS/MRT)
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px; margin-top: 2px;">
              <div style="flex-grow: 1;">
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 500; color: ${f};">
                  <span>${u}</span>
                  <span style="font-family: 'Outfit';">${m}%</span>
                </div>
                <div style="width: 100%; height: 4px; background: var(--muted2); border-radius: 99px; overflow: hidden; margin-top: 4px;">
                  <div style="width: ${m}%; height: 100%; background: ${f}; border-radius: 99px; box-shadow: 0 0 8px ${f};"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `,lucide.createIcons()}}class nt{constructor(t,e){this.container=document.getElementById(t),this.state=e,this.searchTimeout=null}async init(){await this.fetchAndRender()}async fetchAndRender(){var t;try{const e=this.state.getCoords(),i=await N(e.lat,e.lon),n=await K(e.lat,e.lon);this.render(i,n),this.setupSearchEvents()}catch(e){console.error(e),this.container.innerHTML=`
        <div class="glass-card glow-card-red" style="text-align:center;padding:40px;">
          <i data-lucide="wifi-off" style="width:48px;height:48px;color:var(--red);margin-bottom:16px;"></i>
          <h3 style="color:var(--red);margin-bottom:10px;">เกิดข้อผิดพลาดในการดึงข้อมูลสภาพอากาศ</h3>
          <p style="font-size:0.85rem;color:var(--muted);margin-bottom:20px;">${e.message}</p>
          <button class="btn btn-primary" id="retryWeatherBtn"><i data-lucide="refresh-cw"></i> ลองใหม่</button>
        </div>`,lucide.createIcons(),(t=document.getElementById("retryWeatherBtn"))==null||t.addEventListener("click",()=>this.init())}}render(t,e){const i=t.current,n=this.state.getCoords(),[a,o,s]=D[i.weather_code]||["🌡️","UNKNOWN","สภาพอากาศไม่ระบุ"],l=t.daily.sunrise[0].slice(11,16),c=t.daily.sunset[0].slice(11,16),d=new Date,p=d.getHours()*60+d.getMinutes(),h=parseInt(l.slice(0,2))*60+parseInt(l.slice(3,5)),y=parseInt(c.slice(0,2))*60+parseInt(c.slice(3,5)),g=Math.min(100,Math.max(0,(p-h)/(y-h)*100)),m=Q(i.weather_code,t.hourly.precipitation_probability[0]),u=Z(i.temperature_2m,i.apparent_temperature,i.weather_code),f=X(t.daily.uv_index_max[0]);this.state.setWeatherCode(i.weather_code),this.state.triggerBackgroundAnimation(i.weather_code);const x=d.getHours();let b="";for(let v=0;v<16;v++){const k=(x+v)%24,M=Math.round(t.hourly.temperature_2m[x+v]),C=t.hourly.weather_code[x+v],B=t.hourly.precipitation_probability[x+v],A=(D[C]||["🌡️"])[0];b+=`
        <div class="hourly-item ${v===0?"now":""}">
          <div class="hourly-time">${v===0?"ตอนนี้":`${String(k).padStart(2,"0")}:00`}</div>
          <div class="hourly-icon">${A}</div>
          <div class="hourly-temp">${M}°C</div>
          ${B>20?`<div style="font-size:0.6rem;color:var(--cyan);margin-top:2px;">💧${B}%</div>`:""}
        </div>`}let T="";for(let v=0;v<7;v++){const k=new Date(t.daily.time[v]),M=k.toLocaleDateString("th-TH",{weekday:"short"}),C=k.toLocaleDateString("th-TH",{day:"numeric",month:"short"}),B=Math.round(t.daily.temperature_2m_max[v]),A=Math.round(t.daily.temperature_2m_min[v]),W=t.daily.precipitation_probability_max[v],Y=(D[t.daily.weather_code[v]]||["🌡️"])[0];T+=`
        <div class="daily-item">
          <div class="daily-date">
            <span style="font-weight:500;">${M}</span><br>
            <span style="font-size:0.65rem;color:var(--muted);">${C}</span>
          </div>
          <div class="daily-icon-desc">
            <span class="daily-icon">${Y}</span>
            ${W>20?`<span class="daily-rain-chance"><i data-lucide="droplet" style="width:10px;height:10px;"></i> ${W}%</span>`:'<span style="font-size:0.7rem;color:var(--muted2);">ไม่มีฝน</span>'}
          </div>
          <div class="daily-temps">
            <span class="daily-temp-max">${B}°</span>
            <span class="daily-temp-min">${A}°</span>
          </div>
        </div>`}const S=e.current.us_aqi,_=e.current.pm2_5;let I="var(--muted)",E="ไม่มีข้อมูล";if(S!==void 0){for(const v of R)if(S<=v.max){I=v.col,E=v.lbl,v.advice;break}}this.container.innerHTML=`
      <div class="search-box-container">
        <div class="search-input-wrap">
          <i data-lucide="search"></i>
          <input type="text" id="weatherSearchInput" placeholder="ค้นหาชื่อเมือง อำเภอ หรือจังหวัด..." autocomplete="off">
        </div>
        <div class="suggestions-list" id="weatherSuggestions"></div>
      </div>

      <div id="weatherDashboardContent">
        <div id="commuteBriefingContainer"></div>

        <div class="weather-grid">
          <div class="glass-card">
            <div style="font-size:0.75rem;color:var(--muted);letter-spacing:2px;text-transform:uppercase;font-family:'JetBrains Mono',monospace;margin-bottom:20px;">
              สภาพอากาศปัจจุบัน (${n.name})
            </div>
            <div class="weather-main-info">
              <div class="weather-big-icon float-effect">${a}</div>
              <div>
                <div class="weather-main-temp">${Math.round(i.temperature_2m)}<sup>°C</sup></div>
                <div class="weather-main-desc">${s}</div>
                <div class="weather-feels-like">รู้สึกเหมือนจริงประมาณ ${Math.round(i.apparent_temperature)}°C</div>
              </div>
            </div>
            <div style="margin-top:16px;padding:12px;background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid var(--border);">
              <div style="font-size:0.72rem;color:${m.color};line-height:1.5;">${m.text}</div>
              <div style="font-size:0.72rem;color:var(--muted);margin-top:6px;line-height:1.5;">👔 ${u}</div>
            </div>
          </div>

          <div class="weather-tiles">
            <div class="sub-tile">
              <div style="font-size:0.65rem;color:var(--muted);text-transform:uppercase;letter-spacing:1.5px;font-family:'JetBrains Mono',monospace;">ความชื้นสัมพัทธ์</div>
              <div style="font-size:1.5rem;font-weight:500;font-family:'Outfit';">${i.relative_humidity_2m}%</div>
            </div>
            <div class="sub-tile">
              <div style="font-size:0.65rem;color:var(--muted);text-transform:uppercase;letter-spacing:1.5px;font-family:'JetBrains Mono',monospace;">ความเร็วลม</div>
              <div style="font-size:1.5rem;font-weight:500;font-family:'Outfit';">${Math.round(i.wind_speed_10m)} <span style="font-size:0.75rem;color:var(--muted);">กม./ชม.</span></div>
            </div>
            <div class="sub-tile">
              <div style="font-size:0.65rem;color:var(--muted);text-transform:uppercase;letter-spacing:1.5px;font-family:'JetBrains Mono',monospace;">ดัชนี UV วันนี้</div>
              <div style="font-size:1.5rem;font-weight:500;font-family:'Outfit';color:${t.daily.uv_index_max[0]>=6?"var(--yellow)":"var(--text)"};">
                ${Math.round(t.daily.uv_index_max[0])}
              </div>
            </div>
            <div class="sub-tile">
              <div style="font-size:0.65rem;color:var(--muted);text-transform:uppercase;letter-spacing:1.5px;font-family:'JetBrains Mono',monospace;">ทัศนวิสัย</div>
              <div style="font-size:1.5rem;font-weight:500;font-family:'Outfit';">${(i.visibility/1e3).toFixed(1)} <span style="font-size:0.75rem;color:var(--muted);">กม.</span></div>
            </div>
          </div>
        </div>

        <div class="weather-strip-title">
          <i data-lucide="clock"></i> พยากรณ์รายชั่วโมง (16 ชม. ล่วงหน้า)
        </div>
        <div class="hourly-container">${b}</div>

        <div class="daily-forecast-container">
          <div class="daily-list">
            <div style="font-size:0.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:2px;font-family:'JetBrains Mono',monospace;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              <i data-lucide="calendar" style="width:14px;height:14px;"></i> พยากรณ์อากาศล่วงหน้า 7 วัน
            </div>
            ${T}
          </div>

          <div class="weather-sub-cards">
            <div class="glass-card">
              <div style="font-size:0.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:2px;font-family:'JetBrains Mono',monospace;margin-bottom:12px;display:flex;align-items:center;gap:6px;">
                <i data-lucide="sun" style="width:14px;height:14px;"></i> วิถีดวงอาทิตย์ (Solar Orbit)
              </div>
              <div class="solar-track-box">
                <div class="solar-track-header">
                  <span>🌅 ${l} น.</span>
                  <span>${c} น. 🌇</span>
                </div>
                <div class="solar-track-line">
                  <div class="solar-track-fill" style="width:${g}%"></div>
                  <div class="solar-sun-dot" style="left:${g}%">☀️</div>
                </div>
                <div class="solar-stats">
                  <div class="solar-stat-item">โอกาสเกิดฝนวันนี้<b>${t.daily.precipitation_probability_max[0]}%</b></div>
                  <div class="solar-stat-item">ดัชนีแสงแดด (UV)<b>${Math.round(t.daily.uv_index_max[0])}</b></div>
                </div>
              </div>
              <div style="font-size:0.7rem;color:var(--muted);line-height:1.4;border-top:1px solid var(--border);padding-top:12px;margin-top:12px;">
                <strong>ค่าแดดสูงสุด:</strong> ${f.text}
              </div>
            </div>

            <div class="glass-card" style="border-color:${I}33;">
              <div style="font-size:0.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:2px;font-family:'JetBrains Mono',monospace;margin-bottom:12px;display:flex;align-items:center;gap:6px;">
                <i data-lucide="wind" style="width:14px;height:14px;"></i> ดัชนีคุณภาพอากาศ (US AQI)
              </div>
              <div class="aqi-row">
                <div>
                  <div class="aqi-number" style="color:${I};">${S??"--"}</div>
                  <div class="aqi-label" style="color:${I};">${E}</div>
                </div>
                <div style="text-align:right;">
                  <span style="font-size:0.65rem;color:var(--muted);">ปริมาณฝุ่น PM 2.5</span><br>
                  <b style="font-size:1.15rem;font-family:'Outfit';">${(_==null?void 0:_.toFixed(1))??"--"} <span style="font-size:0.7rem;font-weight:normal;">μg/m³</span></b>
                </div>
              </div>
              <div class="aqi-scale-bar">
                ${R.map((v,k)=>`<div class="aqi-scale-segment ${S!==void 0&&(k===0?S<=50:S>R[k-1].max&&S<=v.max)?"active":""}" style="background-color:${v.col};"></div>`).join("")}
              </div>
              <div style="display:flex;justify-content:space-between;font-size:0.5rem;color:var(--muted);font-family:'JetBrains Mono',monospace;margin-top:6px;">
                <span>0</span><span>50</span><span>100</span><span>150</span><span>200</span><span>300+</span>
              </div>
            </div>
          </div>
        </div>
      </div>`,new it("commuteBriefingContainer",this.state).init(),lucide.createIcons()}setupSearchEvents(){const t=document.getElementById("weatherSearchInput"),e=document.getElementById("weatherSuggestions");t&&(t.addEventListener("input",()=>{const i=t.value.trim();if(this.searchTimeout&&clearTimeout(this.searchTimeout),!i){e.style.display="none";return}this.searchTimeout=setTimeout(async()=>{const n=await V(i);n&&n.length>0?(e.innerHTML=n.map(a=>`
            <div class="suggestion-item" data-lat="${a.latitude}" data-lon="${a.longitude}" data-name="${a.name}" data-country="${a.country_code||"TH"}">
              <i data-lucide="map-pin" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:6px;color:var(--cyan);"></i>
              <b>${a.name}</b>${a.admin1?`, ${a.admin1}`:""} (${a.country||"ต่างประเทศ"})
            </div>`).join(""),e.style.display="block",lucide.createIcons(),e.querySelectorAll(".suggestion-item").forEach(a=>{a.addEventListener("click",()=>{const o=parseFloat(a.dataset.lat),s=parseFloat(a.dataset.lon),l=a.dataset.name,c=a.dataset.country;this.state.setCoords(o,s,l,c),t.value="",e.style.display="none",this.init()})})):(e.innerHTML='<div class="suggestion-item" style="color:var(--muted);cursor:default;">ไม่พบสถานที่ดังกล่าว...</div>',e.style.display="block")},350)}),document.addEventListener("click",i=>{!t.contains(i.target)&&!e.contains(i.target)&&(e.style.display="none")}))}}const at={bts_green:{name:"BTS สายสุขุมวิท",short:"BTS-S",color:"#22c55e",fareBase:17,farePerSt:4.5,fareMax:65,timePerSt:2,pax:{adult:1,student:.7,senior:.5}},bts_silom:{name:"BTS สายสีลม",short:"BTS-L",color:"#15803d",fareBase:17,farePerSt:4.5,fareMax:65,timePerSt:2,pax:{adult:1,student:.7,senior:.5}},mrt_blue:{name:"MRT สายสีน้ำเงิน",short:"MRT-B",color:"#2563eb",fareBase:17,farePerSt:3,fareMax:45,timePerSt:2.5,pax:{adult:1,student:.9,senior:.5}},mrt_purple:{name:"MRT สายสีม่วง",short:"MRT-P",color:"#9333ea",fareBase:14,farePerSt:3,fareMax:42,timePerSt:2.5,pax:{adult:1,student:.9,senior:.5}},mrt_yellow:{name:"MRT สายสีเหลือง",short:"MRT-Y",color:"#eab308",fareBase:15,farePerSt:3.2,fareMax:45,timePerSt:2,pax:{adult:1,student:.9,senior:.5}},arl:{name:"Airport Rail Link",short:"ARL",color:"#e11d48",fareBase:15,farePerSt:5,fareMax:45,timePerSt:3,pax:{adult:1,student:1,senior:1}}},G=[{id:"khu_khot",name:"คูคต",line:"bts_green",idx:0},{id:"saphan_mai",name:"สะพานใหม่",line:"bts_green",idx:4},{id:"kasetsart",name:"ม.เกษตรศาสตร์",line:"bts_green",idx:11},{id:"ha_yaek",name:"ห้าแยกลาดพร้าว",line:"bts_green",idx:15},{id:"mo_chit",name:"หมอชิต",line:"bts_green",idx:16},{id:"saphan_khwai",name:"สะพานควาย",line:"bts_green",idx:17},{id:"ari",name:"อารีย์",line:"bts_green",idx:19},{id:"victory",name:"อนุสาวรีย์ชัยฯ",line:"bts_green",idx:21},{id:"phaya_thai",name:"พญาไท",line:"bts_green",idx:22},{id:"siam",name:"สยาม",line:"bts_green",idx:24},{id:"chit_lom",name:"ชิดลม",line:"bts_green",idx:25},{id:"phloen_chit",name:"เพลินจิต",line:"bts_green",idx:26},{id:"nana",name:"นานา",line:"bts_green",idx:27},{id:"asok",name:"อโศก",line:"bts_green",idx:28},{id:"phrom_phong",name:"พร้อมพงษ์",line:"bts_green",idx:29},{id:"thong_lo",name:"ทองหล่อ",line:"bts_green",idx:30},{id:"ekkamai",name:"เอกมัย",line:"bts_green",idx:31},{id:"phra_khanong",name:"พระโขนง",line:"bts_green",idx:32},{id:"on_nut",name:"อ่อนนุช",line:"bts_green",idx:33},{id:"bang_chak",name:"บางจาก",line:"bts_green",idx:34},{id:"udom_suk",name:"อุดมสุข",line:"bts_green",idx:36},{id:"bang_na",name:"บางนา",line:"bts_green",idx:37},{id:"bearing",name:"แบริ่ง",line:"bts_green",idx:38},{id:"samrong_bts",name:"สำโรง (BTS)",line:"bts_green",idx:39},{id:"kheha",name:"เคหะฯ",line:"bts_green",idx:47},{id:"nat_stadium",name:"สนามกีฬาแห่งชาติ",line:"bts_silom",idx:0},{id:"siam_l",name:"สยาม (สายสีลม)",line:"bts_silom",idx:1},{id:"sala_daeng",name:"ศาลาแดง",line:"bts_silom",idx:3},{id:"chong_nonsi",name:"ช่องนนทรี",line:"bts_silom",idx:4},{id:"saphan_taksin",name:"สะพานตากสิน",line:"bts_silom",idx:7},{id:"wongwian_yai",name:"วงเวียนใหญ่",line:"bts_silom",idx:9},{id:"bang_wa",name:"บางหว้า",line:"bts_silom",idx:13},{id:"tha_phra",name:"ท่าพระ",line:"mrt_blue",idx:0},{id:"tao_poon",name:"เตาปูน",line:"mrt_blue",idx:9},{id:"bang_sue",name:"บางซื่อ",line:"mrt_blue",idx:10},{id:"chatuchak",name:"สวนจตุจักร",line:"mrt_blue",idx:12},{id:"phahon_mrt",name:"พหลโยธิน (MRT)",line:"mrt_blue",idx:13},{id:"lat_phrao_mrt",name:"ลาดพร้าว (MRT)",line:"mrt_blue",idx:14},{id:"ratchadaphisek",name:"รัชดาภิเษก",line:"mrt_blue",idx:15},{id:"huai_khwang",name:"ห้วยขวาง",line:"mrt_blue",idx:17},{id:"rama9",name:"พระราม 9",line:"mrt_blue",idx:19},{id:"phetchaburi",name:"เพชรบุรี",line:"mrt_blue",idx:20},{id:"sukhumvit_mrt",name:"สุขุมวิท (MRT)",line:"mrt_blue",idx:21},{id:"silom_mrt",name:"สีลม (MRT)",line:"mrt_blue",idx:25},{id:"hua_lamphong",name:"หัวลำโพง",line:"mrt_blue",idx:27},{id:"bang_wa_mrt",name:"บางหว้า (MRT)",line:"mrt_blue",idx:34},{id:"lak_song",name:"หลักสอง",line:"mrt_blue",idx:38},{id:"tao_poon_p",name:"เตาปูน (สายสีม่วง)",line:"mrt_purple",idx:14},{id:"wong_sawang",name:"วงศ์สว่าง",line:"mrt_purple",idx:12},{id:"nonthaburi_cc",name:"ศูนย์ราชการนนทบุรี",line:"mrt_purple",idx:9},{id:"bang_son",name:"บางซ่อน",line:"mrt_purple",idx:13},{id:"klang_bang_phai",name:"คลองบางไผ่",line:"mrt_purple",idx:0},{id:"lat_phrao_y",name:"ลาดพร้าว (สายสีเหลือง)",line:"mrt_yellow",idx:0},{id:"chokchai4",name:"โชคชัย 4",line:"mrt_yellow",idx:2},{id:"phatthanakan",name:"พัฒนาการ",line:"mrt_yellow",idx:13},{id:"si_nut",name:"สี่แยกอ่อนนุช",line:"mrt_yellow",idx:15},{id:"on_nut_y",name:"อ่อนนุช (สายสีเหลือง)",line:"mrt_yellow",idx:16},{id:"samrong_y",name:"สำโรง (สายสีเหลือง)",line:"mrt_yellow",idx:18},{id:"phaya_thai_arl",name:"พญาไท (ARL)",line:"arl",idx:0},{id:"ratchaprarop",name:"ราชปรารภ",line:"arl",idx:1},{id:"makkasan",name:"มักกะสัน",line:"arl",idx:2},{id:"ramkhamhaeng",name:"รามคำแหง",line:"arl",idx:3},{id:"hua_mak",name:"หัวหมาก",line:"arl",idx:4},{id:"lat_krabang",name:"ลาดกระบัง",line:"arl",idx:5},{id:"suvarnabhumi",name:"สุวรรณภูมิ",line:"arl",idx:6}],ot={};G.forEach(r=>{ot[r.id]=r});function st(r,t,e,i="adult"){const n=at[r];if(!n)return{fare:0,stationsCount:0,duration:0};const a=Math.abs(t-e);if(a===0)return{fare:0,stationsCount:0,duration:0};const o=Math.min(n.fareBase+a*n.farePerSt,n.fareMax);return{fare:Math.round(o*(n.pax[i]||1)),stationsCount:a,duration:Math.round(a*n.timePerSt)}}function rt(r){const t=new Date,e=t.getHours(),i=t.getMinutes(),n=e*60+i,a={bts_green:{first:5*60+30,last:24*60+0,peakFreq:3,offFreq:7},bts_silom:{first:5*60+30,last:24*60+0,peakFreq:3,offFreq:7},mrt_blue:{first:5*60+30,last:24*60+0,peakFreq:4,offFreq:8},mrt_purple:{first:5*60+30,last:23*60+59,peakFreq:5,offFreq:10},mrt_yellow:{first:5*60+30,last:23*60+30,peakFreq:4,offFreq:8},arl:{first:6*60+0,last:24*60+0,peakFreq:10,offFreq:15}},o=a[r]||a.bts_green,s=e>=7&&e<9||e>=17&&e<20,l=s?o.peakFreq:o.offFreq;let c=n;if(n<o.first)c=o.first;else if(n>=o.last)c=o.first+24*60;else{const h=(n-o.first)%l;c=n+(h===0?0:l-h)}const d=c-n,p=h=>{const y=Math.floor(h%1440/60),g=h%60;return`${String(y).padStart(2,"0")}:${String(g).padStart(2,"0")} น.`};return{firstTrain:p(o.first),lastTrain:p(o.last),frequencyPeak:`${o.peakFreq}-${o.peakFreq+1} นาที/ขบวน`,frequencyOffPeak:`${o.offFreq}-${o.offFreq+1} นาที/ขบวน`,nextTrain:p(c),waitMinutes:d,isPeak:s,currentFreq:l}}const P=(()=>{const r={};return G.forEach(t=>{(r[t.line]=r[t.line]||[]).push({name:t.name,index:t.idx})}),Object.values(r).forEach(t=>t.sort((e,i)=>e.index-i.index)),r})();function lt(r,t,e){const i=[{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่จตุจักร/หมอชิต",kw:["หมอชิต","จตุจักร"]},{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่สุขุมวิท/อโศก",kw:["อโศก","สุขุมวิท"]},{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่สีลม/ศาลาแดง",kw:["ศาลาแดง","สีลม"]},{text:"เชื่อมต่อ Airport Rail Link ที่พญาไท",kw:["พญาไท"]},{text:"เชื่อมต่อ MRT สีม่วง ที่เตาปูน",kw:["เตาปูน"]},{text:"เชื่อมต่อ MRT สีเหลือง ที่ลาดพร้าว",kw:["ลาดพร้าว"]},{text:"เชื่อมต่อ MRT สีเหลือง/BTS ที่สำโรง",kw:["สำโรง"]}];for(const n of i)if(n.kw.some(a=>t.includes(a)||e.includes(a)))return`💡 ${n.text}`;return null}function z(){try{return JSON.parse(localStorage.getItem("commuter_fav_routes")||"[]")}catch{return[]}}function dt(r,t,e,i,n,a,o){const s=z();return s.push({id:Date.now(),name:r,start:{lat:t,lng:e,name:a},end:{lat:i,lng:n,name:o}}),localStorage.setItem("commuter_fav_routes",JSON.stringify(s)),s}function ct(r){const t=z().filter(e=>e.id!==r);return localStorage.setItem("commuter_fav_routes",JSON.stringify(t)),t}function mt(r,t,e,i){const a=$(e-r),o=$(i-t),s=Math.sin(a/2)*Math.sin(a/2)+Math.cos($(r))*Math.cos($(e))*Math.sin(o/2)*Math.sin(o/2);return 6371*(2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s)))}function $(r){return r*(Math.PI/180)}const w={bts_sukhumvit:{name:"BTS สายสุขุมวิท",shortName:"BTS Sukhumvit",color:"#22c55e",avgSpeedKmh:35,stations:[{id:"N24",name:"คูคต",nameTH:"คูคต",lat:13.9518,lon:100.6086},{id:"N23",name:"ลำลูกกา คลอง 1",nameTH:"ลำลูกกา คลอง 1",lat:13.9358,lon:100.6098},{id:"N22",name:"โพธิ์แก้ว",nameTH:"โพธิ์แก้ว",lat:13.9202,lon:100.606},{id:"N21",name:"สะพานใหม่",nameTH:"สะพานใหม่",lat:13.905,lon:100.5987},{id:"N20",name:"วัดพระศรีมหาธาตุ",nameTH:"วัดพระศรีมหาธาตุ",lat:13.8954,lon:100.5969},{id:"N19",name:"กรมทหารราบที่ 11",nameTH:"กรมทหารราบที่ 11",lat:13.8824,lon:100.5938},{id:"N18",name:"ม.เกษตรศาสตร์",nameTH:"ม.เกษตรศาสตร์",lat:13.8716,lon:100.5934},{id:"N17",name:"ห้าแยกลาดพร้าว",nameTH:"ห้าแยกลาดพร้าว",lat:13.8199,lon:100.5629},{id:"N16",name:"พหลโยธิน 59",nameTH:"พหลโยธิน 59",lat:13.8135,lon:100.5576},{id:"N15",name:"ตลาดยิ่งเจริญ",nameTH:"ตลาดยิ่งเจริญ",lat:13.8059,lon:100.5538},{id:"N14",name:"มิตรสัมพันธ์",nameTH:"มิตรสัมพันธ์",lat:13.7987,lon:100.5503},{id:"N13",name:"สะพานควาย",nameTH:"สะพานควาย",lat:13.7921,lon:100.5476},{id:"N12",name:"อารีย์",nameTH:"อารีย์",lat:13.7843,lon:100.544},{id:"N11",name:"สนามเป้า",nameTH:"สนามเป้า",lat:13.7762,lon:100.5406},{id:"N10",name:"อนุสาวรีย์ชัยสมรภูมิ",nameTH:"อนุสาวรีย์ชัยสมรภูมิ",lat:13.7636,lon:100.5365},{id:"N9",name:"สยาม",nameTH:"สยาม",lat:13.7457,lon:100.5331},{id:"N8",name:"ชิดลม",nameTH:"ชิดลม",lat:13.744,lon:100.5408},{id:"N7",name:"เพลินจิต",nameTH:"เพลินจิต",lat:13.7426,lon:100.5465},{id:"N6",name:"นานา",nameTH:"นานา",lat:13.7411,lon:100.556},{id:"N5",name:"อโศก",nameTH:"อโศก",lat:13.737,lon:100.5608},{id:"N4",name:"พร้อมพงษ์",nameTH:"พร้อมพงษ์",lat:13.7307,lon:100.5678},{id:"N3",name:"ทองหล่อ",nameTH:"ทองหล่อ",lat:13.7295,lon:100.5786},{id:"N2",name:"เอกมัย",nameTH:"เอกมัย",lat:13.7193,lon:100.5853},{id:"N1",name:"พระโขนง",nameTH:"พระโขนง",lat:13.7098,lon:100.5998},{id:"E1",name:"อ่อนนุช",nameTH:"อ่อนนุช",lat:13.7012,lon:100.6094},{id:"E2",name:"บางจาก",nameTH:"บางจาก",lat:13.6913,lon:100.6178},{id:"E3",name:"ปุณณวิถี",nameTH:"ปุณณวิถี",lat:13.6849,lon:100.6264},{id:"E4",name:"อุดมสุข",nameTH:"อุดมสุข",lat:13.6825,lon:100.6385},{id:"E5",name:"บางนา",nameTH:"บางนา",lat:13.6802,lon:100.652},{id:"E6",name:"แบริ่ง",nameTH:"แบริ่ง",lat:13.6701,lon:100.6678},{id:"E7",name:"สำโรง",nameTH:"สำโรง",lat:13.6594,lon:100.6832},{id:"E8",name:"ปู่เจ้า",nameTH:"ปู่เจ้า",lat:13.6506,lon:100.6919},{id:"E9",name:"ช้างเอราวัณ",nameTH:"ช้างเอราวัณ",lat:13.6421,lon:100.7024},{id:"E10",name:"โรงเรียนนายเรือ",nameTH:"โรงเรียนนายเรือ",lat:13.635,lon:100.711},{id:"E11",name:"ปากน้ำ",nameTH:"ปากน้ำ",lat:13.6277,lon:100.7184},{id:"E12",name:"ศรีนครินทร์",nameTH:"ศรีนครินทร์",lat:13.6256,lon:100.7296},{id:"E13",name:"แพรกษา",nameTH:"แพรกษา",lat:13.6201,lon:100.743},{id:"E14",name:"สายลวด",nameTH:"สาย​ลวด",lat:13.6183,lon:100.7557},{id:"E15",name:"เคหะสมุทรปราการ",nameTH:"เคหะสมุทรปราการ",lat:13.6136,lon:100.7652}]},bts_silom:{name:"BTS สายสีลม",shortName:"BTS Silom",color:"#15803d",avgSpeedKmh:33,stations:[{id:"W1",name:"บางหว้า",nameTH:"บางหว้า",lat:13.7225,lon:100.4753},{id:"W2",name:"เพชรเกษม 48",nameTH:"เพชรเกษม 48",lat:13.7239,lon:100.4862},{id:"W3",name:"ภาษีเจริญ",nameTH:"ภาษีเจริญ",lat:13.7186,lon:100.4993},{id:"W4",name:"วุฒากาศ",nameTH:"วุฒากาศ",lat:13.7095,lon:100.5053},{id:"CEN",name:"สยาม",nameTH:"สยาม",lat:13.7457,lon:100.5331},{id:"S1",name:"ราชดำริ",nameTH:"ราชดำริ",lat:13.7405,lon:100.5283},{id:"S2",name:"ศาลาแดง",nameTH:"ศาลาแดง",lat:13.727,lon:100.5293},{id:"S3",name:"ช่องนนทรี",nameTH:"ช่องนนทรี",lat:13.7198,lon:100.5249},{id:"S4",name:"เซนต์หลุยส์",nameTH:"เซนต์หลุยส์",lat:13.7148,lon:100.5198},{id:"S5",name:"สุรศักดิ์",nameTH:"สุรศักดิ์",lat:13.7118,lon:100.5134},{id:"S6",name:"สะพานตากสิน",nameTH:"สะพานตากสิน",lat:13.7186,lon:100.5078},{id:"S7",name:"กรุงธนบุรี",nameTH:"กรุงธนบุรี",lat:13.7225,lon:100.5013},{id:"S8",name:"วงเวียนใหญ่",nameTH:"วงเวียนใหญ่",lat:13.7225,lon:100.4897},{id:"S9",name:"โพธิ์นิมิตร",nameTH:"โพธิ์นิมิตร",lat:13.7204,lon:100.4811},{id:"S10",name:"ตลาดพลู",nameTH:"ตลาดพลู",lat:13.7178,lon:100.4761},{id:"S11",name:"วุฒากาศ",nameTH:"วุฒากาศ",lat:13.7095,lon:100.5053}]},mrt_blue:{name:"MRT สายสีน้ำเงิน",shortName:"MRT Blue",color:"#3b82f6",avgSpeedKmh:32,stations:[{id:"BL01",name:"ท่าพระ",nameTH:"ท่าพระ",lat:13.7225,lon:100.4786},{id:"BL02",name:"บางไผ่",nameTH:"บางไผ่",lat:13.7295,lon:100.4694},{id:"BL03",name:"บางหว้า",nameTH:"บางหว้า",lat:13.7225,lon:100.4754},{id:"BL04",name:"เพชรเกษม 48",nameTH:"เพชรเกษม 48",lat:13.7187,lon:100.4838},{id:"BL05",name:"ภาษีเจริญ",nameTH:"ภาษีเจริญ",lat:13.713,lon:100.4928},{id:"BL06",name:"บางแค",nameTH:"บางแค",lat:13.6987,lon:100.4986},{id:"BL07",name:"หลักสอง",nameTH:"หลักสอง",lat:13.685,lon:100.5012},{id:"BL08",name:"ลาดพร้าว",nameTH:"ลาดพร้าว",lat:13.8191,lon:100.5662},{id:"BL09",name:"รัชดาภิเษก",nameTH:"รัชดาภิเษก",lat:13.8065,lon:100.5657},{id:"BL10",name:"ห้วยขวาง",nameTH:"ห้วยขวาง",lat:13.7873,lon:100.5724},{id:"BL11",name:"ศูนย์วัฒนธรรม",nameTH:"ศูนย์วัฒนธรรม",lat:13.7756,lon:100.5698},{id:"BL12",name:"พระราม 9",nameTH:"พระราม 9",lat:13.7582,lon:100.5657},{id:"BL13",name:"สามย่าน",nameTH:"สามย่าน",lat:13.7318,lon:100.5294},{id:"BL14",name:"สีลม",nameTH:"สีลม",lat:13.7254,lon:100.528},{id:"BL15",name:"ลุมพินี",nameTH:"ลุมพินี",lat:13.7262,lon:100.5408},{id:"BL16",name:"คลองเตย",nameTH:"คลองเตย",lat:13.7224,lon:100.557},{id:"BL17",name:"ศูนย์การประชุมแห่งชาติสิริกิติ์",nameTH:"ศูนย์ฯ สิริกิติ์",lat:13.7219,lon:100.562},{id:"BL18",name:"สุขุมวิท",nameTH:"สุขุมวิท",lat:13.737,lon:100.5608},{id:"BL19",name:"เพชรบุรี",nameTH:"เพชรบุรี",lat:13.7512,lon:100.5636},{id:"BL20",name:"พระราม 9",nameTH:"พระราม 9",lat:13.7582,lon:100.5657},{id:"BL21",name:"ศาลาว่าการ",nameTH:"ศาลาว่าการ",lat:13.7508,lon:100.5229},{id:"BL22",name:"สนามไชย",nameTH:"สนามไชย",lat:13.7448,lon:100.4963},{id:"BL23",name:"อิสรภาพ",nameTH:"อิสรภาพ",lat:13.7356,lon:100.4851},{id:"BL24",name:"ท่าพระ",nameTH:"ท่าพระ",lat:13.7225,lon:100.4786}]},mrt_yellow:{name:"MRT สายสีเหลือง",shortName:"MRT Yellow",color:"#eab308",avgSpeedKmh:36,stations:[{id:"YL01",name:"ลาดพร้าว",nameTH:"ลาดพร้าว",lat:13.8191,lon:100.5662},{id:"YL02",name:"ภาวนา",nameTH:"ภาวนา",lat:13.8084,lon:100.5795},{id:"YL03",name:"โชคชัย 4",nameTH:"โชคชัย 4",lat:13.7974,lon:100.5901},{id:"YL04",name:"ลาดพร้าว 71",nameTH:"ลาดพร้าว 71",lat:13.7885,lon:100.5964},{id:"YL05",name:"ลาดพร้าว 83",nameTH:"ลาดพร้าว 83",lat:13.7841,lon:100.6012},{id:"YL06",name:"มหาดไทย",nameTH:"มหาดไทย",lat:13.7769,lon:100.6083},{id:"YL07",name:"ลาดพร้าว 101",nameTH:"ลาดพร้าว 101",lat:13.7695,lon:100.6152},{id:"YL08",name:"บางกะปิ",nameTH:"บางกะปิ",lat:13.762,lon:100.6218},{id:"YL09",name:"แยกลำสาลี",nameTH:"แยกลำสาลี",lat:13.7548,lon:100.6272},{id:"YL10",name:"ศรีกรีฑา",nameTH:"ศรีกรีฑา",lat:13.7451,lon:100.6401},{id:"YL11",name:"หัวหมาก",nameTH:"หัวหมาก",lat:13.738,lon:100.6488},{id:"YL12",name:"ลำสาลี",nameTH:"ลำสาลี",lat:13.7286,lon:100.6543},{id:"YL13",name:"ศรีนุช",nameTH:"ศรีนุช",lat:13.7203,lon:100.6618},{id:"YL14",name:"เฉลิมพระเกียรติ ร.9",nameTH:"เฉลิมพระเกียรติ ร.9",lat:13.7095,lon:100.6721},{id:"YL15",name:"สวนหลวง ร.9",nameTH:"สวนหลวง ร.9",lat:13.7001,lon:100.6812},{id:"YL16",name:"พัฒนาการ",nameTH:"พัฒนาการ",lat:13.6928,lon:100.6892},{id:"YL17",name:"ศรีนครินทร์ 38",nameTH:"ศรีนครินทร์ 38",lat:13.6852,lon:100.6977},{id:"YL18",name:"ศรีนครินทร์",nameTH:"ศรีนครินทร์",lat:13.6782,lon:100.7052},{id:"YL19",name:"ศรีด่าน",nameTH:"ศรีด่าน",lat:13.6708,lon:100.7138},{id:"YL20",name:"แบริ่ง",nameTH:"แบริ่ง",lat:13.6658,lon:100.7205},{id:"YL21",name:"สำโรง",nameTH:"สำโรง",lat:13.6579,lon:100.7287},{id:"YL23",name:"ทิพวัล",nameTH:"ทิพวัล",lat:13.6471,lon:100.7404},{id:"YL24",name:"ศรีเอี่ยม",nameTH:"ศรีเอี่ยม",lat:13.6391,lon:100.7491},{id:"YL25",name:"เทพารักษ์",nameTH:"เทพารักษ์",lat:13.6289,lon:100.7578},{id:"YL26",name:"สำโรง",nameTH:"สำโรง (ใต้)",lat:13.6211,lon:100.7651}]},arl:{name:"Airport Rail Link",shortName:"ARL",color:"#e11d48",avgSpeedKmh:90,stations:[{id:"A1",name:"พญาไท",nameTH:"พญาไท",lat:13.7646,lon:100.534},{id:"A2",name:"ราชปรารภ",nameTH:"ราชปรารภ",lat:13.76,lon:100.5481},{id:"A3",name:"มักกะสัน",nameTH:"มักกะสัน",lat:13.7539,lon:100.5614},{id:"A4",name:"รามคำแหง",nameTH:"รามคำแหง",lat:13.7511,lon:100.6017},{id:"A5",name:"หัวหมาก",nameTH:"หัวหมาก",lat:13.7417,lon:100.6397},{id:"A6",name:"บ้านทับช้าง",nameTH:"บ้านทับช้าง",lat:13.7322,lon:100.6786},{id:"A7",name:"ลาดกระบัง",nameTH:"ลาดกระบัง",lat:13.7258,lon:100.715},{id:"A8",name:"สุวรรณภูมิ",nameTH:"สุวรรณภูมิ",lat:13.6921,lon:100.7467}]}};function O(r,t,e,i){const a=(e-r)*Math.PI/180,o=(i-t)*Math.PI/180,s=Math.sin(a/2)**2+Math.cos(r*Math.PI/180)*Math.cos(e*Math.PI/180)*Math.sin(o/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s))}function ut(r,t,e){const i=w[e];if(!i)return null;let n=null,a=1/0;return i.stations.forEach((o,s)=>{const l=O(r,t,o.lat,o.lon);l<a&&(a=l,n={...o,lineKey:e,idx:s,distance:l})}),n}function pt(r,t){let e=null,i=1/0;return Object.keys(w).forEach(n=>{const a=ut(r,t,n);a&&a.distance<i&&(i=a.distance,e=a)}),e}class ht{constructor(){this.lat=null,this.lon=null,this.variance=-1,this.minAccuracy=1}process(t,e,i,n){if(i<1&&(i=1),this.variance<0)this.lat=t,this.lon=e,this.variance=i*i;else{const a=n?n-this._lastTs:1e3;a>0&&(this.variance+=a/1e3*3*3);const o=this.variance/(this.variance+i*i);this.lat+=o*(t-this.lat),this.lon+=o*(e-this.lon),this.variance=(1-o)*this.variance}return this._lastTs=n,{lat:this.lat,lon:this.lon}}reset(){this.lat=null,this.lon=null,this.variance=-1}}function gt(r){if(r.length<2)return{isOnTrain:!1,speedKmh:0};const t=r[r.length-2],e=r[r.length-1],i=O(t.lat,t.lon,e.lat,e.lon),n=(e.ts-t.ts)/1e3;if(n<=0)return{isOnTrain:!1,speedKmh:0};const a=i/n*3.6;return{isOnTrain:a>=10&&a<=100,speedKmh:Math.round(a*10)/10}}function vt(r,t,e){if(!r||!t)return null;const i=w[e];if(!i)return null;const n=i.stations.findIndex(o=>o.id===r.id),a=i.stations.findIndex(o=>o.id===t.id);return n<0||a<0||n===a?null:a>n?"forward":"backward"}function yt(r,t,e,i){const n=w[e];if(!n)return null;const a=n.stations,o=t>r?1:-1;let s=0;for(let d=r;d!==t;d+=o){const p=a[d],h=a[d+o];if(!p||!h)break;s+=O(p.lat,p.lon,h.lat,h.lon)/1e3}const l=i>10?i:n.avgSpeedKmh,c=s/l*60;return{stationsRemaining:Math.abs(t-r),distanceKm:Math.round(s*10)/10,etaMinutes:Math.round(c)}}class ft{constructor(t){this.onUpdate=t,this.watchId=null,this.kalman=new ht,this.positions=[],this.currentStation=null,this.prevStation=null,this.lineKey=null,this.direction=null,this.routeLocked=!1,this.stationHistory=[],this.destStationIdx=null,this.destLineKey=null,this.isTracking=!1,this.lastKnownState=null,this.GEOFENCE_RADIUS_M=180}setDestination(t,e){this.destLineKey=t,this.destStationIdx=e,this._emit()}start(){if(!this.isTracking){if(!navigator.geolocation){this._emitError("GPS ไม่รองรับบนอุปกรณ์นี้");return}this.isTracking=!0,this.kalman.reset(),this.positions=[],this.stationHistory=[],this.routeLocked=!1,this.direction=null,this.watchId=navigator.geolocation.watchPosition(t=>this._onGPS(t),t=>this._emitError(xt(t)),{enableHighAccuracy:!0,timeout:1e4,maximumAge:2e3}),this._pollInterval=setInterval(()=>{navigator.geolocation.getCurrentPosition(t=>this._onGPS(t),()=>{},{enableHighAccuracy:!0,timeout:5e3,maximumAge:3e3})},3e3)}}stop(){this.watchId!==null&&navigator.geolocation.clearWatch(this.watchId),this._pollInterval&&clearInterval(this._pollInterval),this.isTracking=!1,this.watchId=null,this._pollInterval=null}_onGPS(t){const e={lat:t.coords.latitude,lon:t.coords.longitude,acc:t.coords.accuracy,ts:t.timestamp};e.acc>80&&this._emitWarning("GPS สัญญาณอ่อน (ความแม่นยำ "+Math.round(e.acc)+"m)");const i=this.kalman.process(e.lat,e.lon,e.acc,e.ts),n={lat:i.lat,lon:i.lon,acc:e.acc,ts:e.ts};this.positions.push(n),this.positions.length>10&&this.positions.shift();const a=pt(n.lat,n.lon),o=gt(this.positions);if(a&&a.distance<this.GEOFENCE_RADIUS_M&&(!this.currentStation||this.currentStation.id!==a.id)){if(this.prevStation=this.currentStation,this.currentStation=a,this.stationHistory.push(a),this.stationHistory.length>5&&this.stationHistory.shift(),this.stationHistory.length>=2){const l=this.stationHistory[this.stationHistory.length-2],c=this.stationHistory[this.stationHistory.length-1];l.lineKey===c.lineKey&&(this.lineKey=c.lineKey,this.direction=vt(l,c,this.lineKey),!this.routeLocked&&this.stationHistory.length>=3&&(this.routeLocked=!0))}if(this.destStationIdx!==null&&this.destLineKey&&a.lineKey===this.destLineKey){const l=Math.abs(a.idx-this.destStationIdx);l===1&&this._triggerArrivalAlert(),l===0&&this._triggerArrivedAlert()}}this._emit({motion:o,nearest:a,accuracy:e.acc})}_triggerArrivalAlert(){var t,e;if(navigator.vibrate&&navigator.vibrate([300,100,300,100,600]),Notification.permission==="granted"){const i=this.destStationIdx!==null&&((e=(t=w[this.destLineKey])==null?void 0:t.stations[this.destStationIdx])==null?void 0:e.nameTH)||"ปลายทาง";new Notification("🚉 ใกล้ถึงปลายทางแล้ว!",{body:`อีก 1 สถานีจะถึง ${i}`,icon:"/favicon.ico",badge:"/favicon.ico",tag:"train-alert",vibrate:[300,100,300]})}window.dispatchEvent(new CustomEvent("trainArrivalWarning",{detail:{stationsLeft:1,dest:this.destStationIdx}}))}_triggerArrivedAlert(){var t,e;if(navigator.vibrate&&navigator.vibrate([500,200,500]),Notification.permission==="granted"){const i=this.destStationIdx!==null&&((e=(t=w[this.destLineKey])==null?void 0:t.stations[this.destStationIdx])==null?void 0:e.nameTH)||"ปลายทาง";new Notification("🎉 ถึงปลายทางแล้ว!",{body:`คุณถึง ${i} แล้ว`,icon:"/favicon.ico",tag:"train-arrived"})}window.dispatchEvent(new CustomEvent("trainArrived",{detail:{dest:this.destStationIdx}}))}_emit(t={}){var l,c,d,p,h;const e=this.lineKey?w[this.lineKey]:null,i=(e==null?void 0:e.stations)||[],n=((l=this.currentStation)==null?void 0:l.idx)??null;let a=null;if(this.direction&&this.currentStation&&n!==null){const y=this.direction==="forward"?n+1:n-1;a=i[y]||null}let o=null;this.destStationIdx!==null&&n!==null&&this.destLineKey&&(o=yt(n,this.destStationIdx,this.destLineKey,((c=t.motion)==null?void 0:c.speedKmh)||0));const s={isTracking:this.isTracking,currentStation:this.currentStation,nextStation:a,prevStation:this.prevStation,lineKey:this.lineKey,lineName:(e==null?void 0:e.name)||null,lineColor:(e==null?void 0:e.color)||null,direction:this.direction,routeLocked:this.routeLocked,destStationIdx:this.destStationIdx,destLineKey:this.destLineKey,eta:o,speedKmh:((d=t.motion)==null?void 0:d.speedKmh)||0,isOnTrain:((p=t.motion)==null?void 0:p.isOnTrain)||!1,nearestStation:t.nearest||null,nearestDistance:((h=t.nearest)==null?void 0:h.distance)||null,gpsAccuracy:t.accuracy||null,warning:null,...t};this.lastKnownState=s,typeof this.onUpdate=="function"&&this.onUpdate(s)}_emitError(t){typeof this.onUpdate=="function"&&this.onUpdate({isTracking:!1,error:t})}_emitWarning(t){const e={...this.lastKnownState||{},warning:t};typeof this.onUpdate=="function"&&this.onUpdate(e)}requestNotificationPermission(){"Notification"in window&&Notification.permission==="default"&&Notification.requestPermission()}}function xt(r){switch(r.code){case 1:return"ไม่ได้รับอนุญาต GPS กรุณาเปิดสิทธิ์ใน Browser";case 2:return"GPS หาตำแหน่งไม่ได้ (สัญญาณอ่อน/ใต้ดิน)";case 3:return"GPS หมดเวลา — กำลังลองใหม่...";default:return"GPS Error"}}class bt{constructor(t,e){this.container=document.getElementById(t),this.state=e,this.tracker=null,this.trackerState=null,this.alertShown=!1,this.selectedLine="bts_sukhumvit",this.selectedDestIdx=null}init(){this.container&&(this._renderUI(),this._setupEvents(),window.addEventListener("trainArrivalWarning",t=>this._showArrivalPopup(t.detail)),window.addEventListener("trainArrived",t=>this._showArrivedPopup(t.detail)))}_renderUI(){this.container.innerHTML=`
      <div class="train-tracker-panel glass-card" style="position:relative;overflow:hidden;">

        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <h3 style="font-size:0.85rem;display:flex;align-items:center;gap:8px;margin:0;">
            <i data-lucide="train-front" style="color:var(--cyan);width:16px;height:16px;"></i>
            ติดตามรถไฟฟ้า Realtime
          </h3>
          <div style="display:flex;gap:6px;align-items:center;">
            <div id="ttGpsSignal" class="tt-signal-dot off" title="GPS Signal"></div>
            <span id="ttGpsLabel" style="font-size:0.65rem;color:var(--muted);">GPS ปิด</span>
          </div>
        </div>

        <!-- Line + Destination Selector -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
          <div class="input-field-wrap">
            <label style="font-size:0.65rem;">สายรถไฟฟ้า</label>
            <select id="ttLineSelect" style="font-size:0.75rem;">
              <option value="bts_sukhumvit">BTS สายสุขุมวิท</option>
              <option value="bts_silom">BTS สายสีลม</option>
              <option value="mrt_blue">MRT Blue Line</option>
              <option value="mrt_yellow">MRT Yellow Line</option>
              <option value="arl">Airport Rail Link</option>
            </select>
          </div>
          <div class="input-field-wrap">
            <label style="font-size:0.65rem;">สถานีปลายทาง</label>
            <select id="ttDestSelect" style="font-size:0.75rem;"></select>
          </div>
        </div>

        <!-- Start/Stop Button -->
        <button id="ttStartBtn" class="btn btn-primary" style="width:100%;margin-bottom:16px;font-size:0.8rem;padding:10px;gap:8px;display:flex;align-items:center;justify-content:center;">
          <i data-lucide="navigation" style="width:14px;height:14px;"></i>
          <span>เริ่มติดตาม</span>
        </button>

        <!-- Status Panel -->
        <div id="ttStatusPanel" style="display:none;">

          <!-- Train map strip -->
          <div id="ttMapStrip" style="margin-bottom:14px;overflow-x:auto;padding-bottom:4px;"></div>

          <!-- Info Grid -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
            <div class="sub-tile" style="background:rgba(255,255,255,0.02);">
              <div style="font-size:0.6rem;color:var(--muted);margin-bottom:4px;">📍 สถานีปัจจุบัน</div>
              <div id="ttCurrentStation" style="font-size:0.9rem;font-weight:600;color:var(--cyan);">--</div>
              <div id="ttCurrentLine" style="font-size:0.62rem;color:var(--muted2);margin-top:2px;"></div>
            </div>
            <div class="sub-tile" style="background:rgba(255,255,255,0.02);">
              <div style="font-size:0.6rem;color:var(--muted);margin-bottom:4px;">⏭ สถานีถัดไป</div>
              <div id="ttNextStation" style="font-size:0.9rem;font-weight:600;color:var(--yellow);">--</div>
              <div id="ttDirectionLabel" style="font-size:0.62rem;color:var(--muted2);margin-top:2px;"></div>
            </div>
            <div class="sub-tile" style="background:rgba(255,255,255,0.02);">
              <div style="font-size:0.6rem;color:var(--muted);margin-bottom:4px;">🏁 ปลายทาง</div>
              <div id="ttDestName" style="font-size:0.85rem;font-weight:600;color:var(--text);">--</div>
              <div id="ttStationsLeft" style="font-size:0.62rem;color:var(--muted2);margin-top:2px;"></div>
            </div>
            <div class="sub-tile" style="background:rgba(255,255,255,0.02);">
              <div style="font-size:0.6rem;color:var(--muted);margin-bottom:4px;">⏱ ETA</div>
              <div id="ttETA" style="font-size:1.1rem;font-weight:700;color:var(--green);">--</div>
              <div id="ttSpeedLabel" style="font-size:0.62rem;color:var(--muted2);margin-top:2px;"></div>
            </div>
          </div>

          <!-- GPS & Motion Info -->
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
            <div id="ttOnTrainBadge" class="tt-badge gray">ตรวจสอบ...</div>
            <div id="ttRouteLock" class="tt-badge gray">Route: ยังไม่ล็อก</div>
            <div id="ttGpsAccBadge" class="tt-badge gray">GPS --m</div>
          </div>

          <!-- Warning -->
          <div id="ttWarning" style="display:none;font-size:0.72rem;color:var(--yellow);background:rgba(234,179,8,0.08);border:1px solid rgba(234,179,8,0.2);border-radius:8px;padding:6px 10px;margin-bottom:8px;"></div>

        </div>

        <!-- Idle State -->
        <div id="ttIdleState" style="text-align:center;padding:16px 0;color:var(--muted);font-size:0.75rem;">
          <i data-lucide="satellite" style="width:32px;height:32px;color:var(--border);margin-bottom:8px;display:block;margin-left:auto;margin-right:auto;"></i>
          เลือกสาย + ปลายทาง แล้วกด "เริ่มติดตาม"<br>
          <span style="font-size:0.65rem;color:var(--muted2);">ระบบจะตรวจจับสถานีอัตโนมัติจาก GPS</span>
        </div>

        <!-- Arrival Alert Popup (hidden by default) -->
        <div id="ttAlertPopup" style="display:none;position:absolute;inset:0;background:rgba(0,0,0,0.85);z-index:100;display:none;align-items:center;justify-content:center;border-radius:inherit;flex-direction:column;gap:12px;">
          <div style="font-size:2rem;">🚉</div>
          <div id="ttAlertTitle" style="font-size:1.1rem;font-weight:700;color:var(--yellow);text-align:center;"></div>
          <div id="ttAlertBody" style="font-size:0.8rem;color:var(--text);text-align:center;"></div>
          <button id="ttAlertDismiss" class="btn btn-primary" style="margin-top:8px;">รับทราบ</button>
        </div>
      </div>

      <style>
        .tt-signal-dot { width:10px;height:10px;border-radius:50%;flex-shrink:0; }
        .tt-signal-dot.off { background:var(--border); }
        .tt-signal-dot.searching { background:var(--yellow);animation:pulse 1s infinite; }
        .tt-signal-dot.good { background:var(--green);animation:pulse 1.5s infinite; }
        .tt-signal-dot.weak { background:var(--red);animation:pulse 0.8s infinite; }

        .tt-badge { font-size:0.65rem;padding:3px 8px;border-radius:100px;border:1px solid var(--border);color:var(--muted);white-space:nowrap; }
        .tt-badge.green { background:rgba(34,197,94,0.12);border-color:rgba(34,197,94,0.3);color:#22c55e; }
        .tt-badge.yellow { background:rgba(234,179,8,0.12);border-color:rgba(234,179,8,0.3);color:#eab308; }
        .tt-badge.red { background:rgba(239,68,68,0.12);border-color:rgba(239,68,68,0.3);color:#ef4444; }
        .tt-badge.gray { background:rgba(255,255,255,0.04);border-color:var(--border);color:var(--muted); }
        .tt-badge.cyan { background:rgba(0,242,254,0.1);border-color:rgba(0,242,254,0.3);color:var(--cyan); }

        .tt-station-dot { width:10px;height:10px;border-radius:50%;border:2px solid; flex-shrink:0; }
        .tt-strip-wrap { display:flex;align-items:center;gap:0;min-width:max-content; }
        .tt-strip-segment { width:24px;height:3px;background:var(--border); }
        .tt-strip-label { font-size:0.55rem;color:var(--muted);margin-top:3px;max-width:48px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
        .tt-strip-item { display:flex;flex-direction:column;align-items:center; }
      </style>
    `,lucide.createIcons(),this._populateDestinations()}_populateDestinations(){const t=document.getElementById("ttDestSelect");if(!t)return;const e=w[this.selectedLine];e&&(t.innerHTML=e.stations.map((i,n)=>`<option value="${n}">${i.nameTH||i.name}</option>`).join(""),t.selectedIndex=e.stations.length-1,this.selectedDestIdx=e.stations.length-1)}_setupEvents(){var t,e,i,n;(t=document.getElementById("ttLineSelect"))==null||t.addEventListener("change",a=>{if(this.selectedLine=a.target.value,this._populateDestinations(),this.tracker){const o=document.getElementById("ttDestSelect");this.tracker.setDestination(this.selectedLine,parseInt((o==null?void 0:o.value)||0))}}),(e=document.getElementById("ttDestSelect"))==null||e.addEventListener("change",a=>{this.selectedDestIdx=parseInt(a.target.value),this.tracker&&this.tracker.setDestination(this.selectedLine,this.selectedDestIdx)}),(i=document.getElementById("ttStartBtn"))==null||i.addEventListener("click",()=>{!this.tracker||!this.tracker.isTracking?this._startTracking():this._stopTracking()}),(n=document.getElementById("ttAlertDismiss"))==null||n.addEventListener("click",()=>{const a=document.getElementById("ttAlertPopup");a&&(a.style.display="none")})}_startTracking(){const t=document.getElementById("ttStartBtn"),e=document.getElementById("ttDestSelect");this.selectedDestIdx=parseInt((e==null?void 0:e.value)||0),"Notification"in window&&Notification.permission==="default"&&Notification.requestPermission(),this.tracker=new ft(i=>this._onTrackerUpdate(i)),this.tracker.setDestination(this.selectedLine,this.selectedDestIdx),this.tracker.start(),t&&(t.innerHTML='<i data-lucide="stop-circle" style="width:14px;height:14px;"></i><span>หยุดติดตาม</span>',t.style.background="rgba(239,68,68,0.15)",t.style.borderColor="rgba(239,68,68,0.3)",lucide.createIcons()),document.getElementById("ttIdleState").style.display="none",document.getElementById("ttStatusPanel").style.display="block",this._setGpsSignal("searching","กำลังหา GPS...")}_stopTracking(){this.tracker&&(this.tracker.stop(),this.tracker=null);const t=document.getElementById("ttStartBtn");t&&(t.innerHTML='<i data-lucide="navigation" style="width:14px;height:14px;"></i><span>เริ่มติดตาม</span>',t.style.background="",t.style.borderColor="",lucide.createIcons()),document.getElementById("ttStatusPanel").style.display="none",document.getElementById("ttIdleState").style.display="block",this._setGpsSignal("off","GPS ปิด")}_onTrackerUpdate(t){var s;if(this.trackerState=t,t.error){this._setGpsSignal("weak",t.error),document.getElementById("ttWarning").textContent=t.error,document.getElementById("ttWarning").style.display="block";return}const e=t.gpsAccuracy;e===null?this._setGpsSignal("searching","กำลังหา GPS..."):e>50?this._setGpsSignal("weak",`GPS ±${Math.round(e)}m (อ่อน)`):this._setGpsSignal("good",`GPS ±${Math.round(e)}m`);const i=t.currentStation;document.getElementById("ttCurrentStation").textContent=i?i.nameTH||i.name:t.nearestStation?`ใกล้ ${t.nearestStation.nameTH||t.nearestStation.name}`:"กำลังตรวจหาสถานี...",document.getElementById("ttCurrentLine").textContent=t.lineName||(t.nearestStation?(s=w[t.nearestStation.lineKey])==null?void 0:s.name:"")||"";const n=t.nextStation;document.getElementById("ttNextStation").textContent=n?n.nameTH||n.name:"--",document.getElementById("ttDirectionLabel").textContent=t.direction==="forward"?"→ ทิศทางปลายสาย":t.direction==="backward"?"← ทิศทางต้นสาย":"ยังไม่ทราบทิศทาง";const a=t.destLineKey?w[t.destLineKey]:null,o=a&&t.destStationIdx!==null?a.stations[t.destStationIdx]:null;document.getElementById("ttDestName").textContent=o?o.nameTH||o.name:"--",t.eta?(document.getElementById("ttStationsLeft").textContent=`เหลืออีก ${t.eta.stationsRemaining} สถานี · ${t.eta.distanceKm} กม.`,document.getElementById("ttETA").textContent=`${t.eta.etaMinutes} นาที`):(document.getElementById("ttStationsLeft").textContent="",document.getElementById("ttETA").textContent="--"),document.getElementById("ttSpeedLabel").textContent=t.speedKmh>0?`ความเร็ว ${t.speedKmh} กม./ชม.`:"",document.getElementById("ttOnTrainBadge").textContent=t.isOnTrain?"🚆 อยู่บนรถไฟ":"🚶 ยังไม่พบรถไฟ",document.getElementById("ttOnTrainBadge").className=`tt-badge ${t.isOnTrain?"green":"gray"}`,document.getElementById("ttRouteLock").textContent=t.routeLocked?"🔒 Route ล็อกแล้ว":"Route: ยังไม่ล็อก",document.getElementById("ttRouteLock").className=`tt-badge ${t.routeLocked?"cyan":"gray"}`,document.getElementById("ttGpsAccBadge").textContent=e!==null?`GPS ±${Math.round(e)}m`:"GPS --",document.getElementById("ttGpsAccBadge").className=`tt-badge ${e===null?"gray":e>50?"yellow":"green"}`,t.warning?(document.getElementById("ttWarning").textContent="⚠ "+t.warning,document.getElementById("ttWarning").style.display="block"):document.getElementById("ttWarning").style.display="none",this._renderMapStrip(t)}_renderMapStrip(t){var y,g;const e=document.getElementById("ttMapStrip");if(!e)return;const i=t.lineKey||((y=t.nearestStation)==null?void 0:y.lineKey)||this.selectedLine,n=w[i];if(!n)return;const a=n.stations,o=((g=t.currentStation)==null?void 0:g.idx)??-1,s=t.destStationIdx!==null&&t.destLineKey===i?t.destStationIdx:-1,l=n.color,c=7;let d=Math.max(0,o-3),p=Math.min(a.length-1,d+c-1);p-d<c-1&&(d=Math.max(0,p-c+1));let h='<div class="tt-strip-wrap">';for(let m=d;m<=p;m++){const u=a[m],f=m===o,x=m===s,b=o>=0&&m<o,T=f?l:x?"#f59e0b":b?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.4)",S=b?"rgba(255,255,255,0.15)":l;m>d&&(h+=`<div class="tt-strip-segment" style="background:${S};"></div>`),h+=`
        <div class="tt-strip-item">
          <div class="tt-station-dot" style="border-color:${T};background:${f?T:"transparent"};${f?"box-shadow:0 0 8px "+T+";":""}${x?"box-shadow:0 0 6px #f59e0b;":""}"></div>
          <div class="tt-strip-label" style="color:${f?l:x?"#f59e0b":"var(--muted)"};">${u.nameTH||u.name}</div>
          ${f?'<div style="font-size:0.5rem;color:var(--cyan);">▲ คุณ</div>':""}
          ${x&&!f?'<div style="font-size:0.5rem;color:#f59e0b;">🏁</div>':""}
        </div>
      `}h+="</div>",e.innerHTML=h}_showArrivalPopup(t){var i,n;const e=this.selectedDestIdx!==null&&((n=(i=w[this.selectedLine])==null?void 0:i.stations[this.selectedDestIdx])==null?void 0:n.nameTH)||"ปลายทาง";this._showPopup("🚉 ใกล้ถึงแล้ว!",`อีก 1 สถานีจะถึง
${e}
เตรียมตัวลงได้เลย`)}_showArrivedPopup(t){var i,n;const e=this.selectedDestIdx!==null&&((n=(i=w[this.selectedLine])==null?void 0:i.stations[this.selectedDestIdx])==null?void 0:n.nameTH)||"ปลายทาง";this._showPopup("🎉 ถึงแล้ว!",`คุณถึงสถานี ${e} แล้ว`),this._stopTracking()}_showPopup(t,e){const i=document.getElementById("ttAlertPopup");i&&(document.getElementById("ttAlertTitle").textContent=t,document.getElementById("ttAlertBody").textContent=e,i.style.display="flex")}_setGpsSignal(t,e){const i=document.getElementById("ttGpsSignal"),n=document.getElementById("ttGpsLabel");i&&(i.className=`tt-signal-dot ${t}`),n&&(n.textContent=e)}}class Tt{constructor(t,e,i){this.trafficContainer=document.getElementById(t),this.transitContainer=document.getElementById(e),this.state=i,this.map=null,this.tileLayer=null,this.routePolyline=null,this.startMarker=null,this.endMarker=null,this.routePoints={start:null,end:null},this.cctvIntervals=[],this.trainTrackerWidget=null}async init(){this.trafficContainer&&(this.renderTrafficTab(),this.initMap(),this.initCCTVs(),this.setupTrafficEvents()),this.renderTransitTab(),this.setupTransitEvents(),document.addEventListener("theme-changed",()=>this.updateMapTheme())}renderTrafficTab(){this.trafficContainer.innerHTML=`
      <div class="map-dashboard-grid">
        <div class="map-outer">
          <div id="trafficMap"></div>
          <div class="map-overlay-card">
            <h3><i data-lucide="navigation"></i> วางแผนการเดินทาง (BKK Route Planner)</h3>
            <div class="route-input-group">
              <div class="route-field" id="routeStartBtn" style="cursor: pointer;">
                <i data-lucide="circle-dot" style="color: var(--cyan);"></i>
                <span id="routeStartText" class="empty">จุดเริ่มต้น (คลิกเลือกบนแผนที่)</span>
              </div>
              <div class="route-field" id="routeEndBtn" style="cursor: pointer;">
                <i data-lucide="map-pin" style="color: var(--red);"></i>
                <span id="routeEndText" class="empty">จุดหมายปลายทาง (คลิกเลือกบนแผนที่)</span>
              </div>
            </div>
            <div class="route-actions">
              <button class="btn btn-primary" id="btnUseMyLocation" style="flex: 1; font-size: 0.75rem; padding: 8px 12px;">
                <i data-lucide="locate" style="width: 14px; height: 14px;"></i> ใช้ตำแหน่งปัจจุบัน
              </button>
              <button class="btn" id="btnResetRoute" style="font-size: 0.75rem; padding: 8px 12px;">ล้างข้อมูล</button>
            </div>
            <div class="travel-stats" id="routeTravelStats">
              <div class="stat-row"><span>ระยะทาง:</span><b id="statDistance">-- กม.</b></div>
              <div class="stat-row"><span>เวลาเดินทางโดยประมาณ:</span><b id="statDuration">-- นาที</b></div>
              <div class="stat-row"><span>ความหนาแน่นการจราจร:</span><span id="statTrafficBadge" class="traffic-status-pill traffic-pill-green">ราบรื่น</span></div>
              <div class="stat-row" style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px;">
                <input type="text" id="favRouteNameInput" placeholder="ตั้งชื่อเส้นทางนี้..." style="background: rgba(255,255,255,0.04); border: 1px solid var(--border); color: var(--text); border-radius: 6px; padding: 4px 8px; font-size: 0.75rem; width: 120px;">
                <button class="btn btn-primary" id="btnSaveFavRoute" style="font-size: 0.7rem; padding: 4px 8px; border-radius: 6px;">
                  <i data-lucide="bookmark" style="width: 12px; height: 12px;"></i> บันทึกเส้นทาง
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="cctv-sidebar">
          <div class="glass-card">
            <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <i data-lucide="video" style="color: var(--red);"></i> กล้อง CCTV จุดสำคัญ (Live Simulation)
            </h3>
            <p style="font-size: 0.7rem; color: var(--muted); margin-bottom: 16px;">รายงานสถานะการจราจรแบบเรียลไทม์จากระบบจำลองอัจฉริยะ</p>
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div class="cctv-card">
                <div class="cctv-header"><span class="cctv-title">แยกอโศก-สุขุมวิท</span><span class="cctv-live-dot">LIVE</span></div>
                <div class="cctv-screen"><canvas id="cctvAsoke" class="cctv-canvas"></canvas><span class="cctv-overlay-text">CAM-01 | ASOKE ROAD</span></div>
              </div>
              <div class="cctv-card">
                <div class="cctv-header"><span class="cctv-title">แยกพระราม 9</span><span class="cctv-live-dot">LIVE</span></div>
                <div class="cctv-screen"><canvas id="cctvRama9" class="cctv-canvas"></canvas><span class="cctv-overlay-text">CAM-02 | RAMA 9 RD</span></div>
              </div>
              <div class="cctv-card">
                <div class="cctv-header"><span class="cctv-title">แยกสาทร-กรุงธนบุรี</span><span class="cctv-live-dot">LIVE</span></div>
                <div class="cctv-screen"><canvas id="cctvSathorn" class="cctv-canvas"></canvas><span class="cctv-overlay-text">CAM-03 | SATHORN RD</span></div>
              </div>
            </div>
          </div>
          <div class="glass-card">
            <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <i data-lucide="bookmark" style="color: var(--cyan);"></i> เส้นทางที่บันทึกไว้
            </h3>
            <div id="savedRoutesList" style="display: flex; flex-direction: column; gap: 8px;"></div>
          </div>
        </div>
      </div>
    `,lucide.createIcons()}initMap(){const t=this.state.getCoords();this.map=L.map("trafficMap",{zoomControl:!1}).setView([t.lat,t.lon],13),L.control.zoom({position:"bottomright"}).addTo(this.map),this.updateMapTheme(),this.map.on("click",e=>this.handleMapClick(e))}updateMapTheme(){if(!this.map)return;this.tileLayer&&this.map.removeLayer(this.tileLayer);const e=document.body.classList.contains("light-theme")?"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png":"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";this.tileLayer=L.tileLayer(e,{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'}).addTo(this.map)}handleMapClick(t){const{lat:e,lng:i}=t.latlng;this.routePoints.start?this.routePoints.end?(this.resetRouting(),this.setRouteStart(e,i,`พิกัด: ${e.toFixed(4)}, ${i.toFixed(4)}`)):(this.setRouteEnd(e,i,`พิกัด: ${e.toFixed(4)}, ${i.toFixed(4)}`),this.calculateRoute()):this.setRouteStart(e,i,`พิกัด: ${e.toFixed(4)}, ${i.toFixed(4)}`)}setRouteStart(t,e,i){this.routePoints.start={lat:t,lng:e,name:i};const n=document.getElementById("routeStartText");n.innerText=i,n.classList.remove("empty"),this.startMarker&&this.map.removeLayer(this.startMarker),this.startMarker=L.marker([t,e],{icon:L.divIcon({className:"custom-map-marker-start",html:'<div style="width:14px;height:14px;background:var(--cyan);border:2px solid white;border-radius:50%;box-shadow:0 0 10px var(--cyan);"></div>',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(this.map)}setRouteEnd(t,e,i){this.routePoints.end={lat:t,lng:e,name:i};const n=document.getElementById("routeEndText");n.innerText=i,n.classList.remove("empty"),this.endMarker&&this.map.removeLayer(this.endMarker),this.endMarker=L.marker([t,e],{icon:L.divIcon({className:"custom-map-marker-end",html:'<div style="width:14px;height:14px;background:var(--red);border:2px solid white;border-radius:50%;box-shadow:0 0 10px var(--red);"></div>',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(this.map)}async calculateRoute(){if(!this.routePoints.start||!this.routePoints.end)return;const t=this.routePoints.start,e=this.routePoints.end,i=`https://router.project-osrm.org/route/v1/driving/${t.lng},${t.lat};${e.lng},${e.lat}?overview=full&geometries=geojson`;try{const a=await(await fetch(i)).json();if(a.routes&&a.routes.length>0){const o=a.routes[0],s=o.geometry.coordinates.map(m=>[m[1],m[0]]);this.routePolyline&&this.map.removeLayer(this.routePolyline),this.routePolyline=L.polyline(s,{color:"var(--cyan)",weight:5,opacity:.85,className:"glowing-polyline"}).addTo(this.map),this.map.fitBounds(this.routePolyline.getBounds(),{padding:[40,40]});const l=(o.distance/1e3).toFixed(1),c=Math.round(o.duration/60);document.getElementById("statDistance").innerText=`${l} กม.`;const d=new Date().getHours();let p=1,h="การจราจรไหลลื่น (ราบรื่น)",y="traffic-pill-green";d>=7&&d<=9||d>=17&&d<=19?(p=1.6,h="รถติดขัดหนาแน่น (วิกฤต)",y="traffic-pill-red"):(d>=12&&d<=14||d>=16&&d<17)&&(p=1.25,h="รถหนาแน่นปานกลาง (ระลอกตัว)",y="traffic-pill-yellow"),document.getElementById("statDuration").innerText=`${Math.round(c*p)} นาที`;const g=document.getElementById("statTrafficBadge");g.innerText=h,g.className=`traffic-status-pill ${y}`,document.getElementById("routeTravelStats").style.display="block"}else throw new Error("no route")}catch{this.routePolyline&&this.map.removeLayer(this.routePolyline),this.routePolyline=L.polyline([[t.lat,t.lng],[e.lat,e.lng]],{color:"var(--cyan)",weight:4,dashArray:"5, 10",opacity:.7}).addTo(this.map);const a=mt(t.lat,t.lng,e.lat,e.lng).toFixed(1);document.getElementById("statDistance").innerText=`${a} กม. (โดยตรง)`,document.getElementById("statDuration").innerText=`${Math.round(a*2.5)} นาที`;const o=document.getElementById("statTrafficBadge");o.innerText="การจราจรไม่พร้อมแสดง (Offline Mode)",o.className="traffic-status-pill traffic-pill-yellow",document.getElementById("routeTravelStats").style.display="block"}}resetRouting(){this.routePoints.start=null,this.routePoints.end=null;const t=document.getElementById("routeStartText");t.innerText="จุดเริ่มต้น (คลิกเลือกบนแผนที่)",t.classList.add("empty");const e=document.getElementById("routeEndText");e.innerText="จุดหมายปลายทาง (คลิกเลือกบนแผนที่)",e.classList.add("empty"),this.startMarker&&this.map.removeLayer(this.startMarker),this.endMarker&&this.map.removeLayer(this.endMarker),this.routePolyline&&this.map.removeLayer(this.routePolyline),this.startMarker=null,this.endMarker=null,this.routePolyline=null,document.getElementById("routeTravelStats").style.display="none"}setupTrafficEvents(){var t,e,i;(t=document.getElementById("btnResetRoute"))==null||t.addEventListener("click",()=>this.resetRouting()),(e=document.getElementById("btnUseMyLocation"))==null||e.addEventListener("click",()=>{const n=this.state.getCoords();this.setRouteStart(n.lat,n.lon,`ตำแหน่งของฉัน (${n.name})`),this.routePoints.end&&this.calculateRoute()}),(i=document.getElementById("btnSaveFavRoute"))==null||i.addEventListener("click",()=>{const n=document.getElementById("favRouteNameInput"),a=n.value.trim()||`เส้นทาง ${new Date().toLocaleDateString("th-TH")}`,o=this.routePoints.start,s=this.routePoints.end;o&&s&&(dt(a,o.lat,o.lng,s.lat,s.lng,o.name,s.name),n.value="",this.renderSavedRoutes(),this.showToast("บันทึกสำเร็จ",`บันทึกเส้นทาง "${a}" เรียบร้อยแล้ว`))}),this.renderSavedRoutes()}renderSavedRoutes(){const t=document.getElementById("savedRoutesList");if(!t)return;const e=z();if(e.length===0){t.innerHTML='<div style="text-align:center;color:var(--muted2);font-size:0.75rem;padding:12px 0;">ไม่มีเส้นทางที่บันทึกไว้</div>';return}t.innerHTML=e.map(i=>`
      <div class="todo-item" style="padding:10px 12px;gap:8px;">
        <div style="flex-grow:1;cursor:pointer;text-align:left;" class="saved-route-trigger" data-id="${i.id}">
          <div style="font-weight:500;font-size:0.8rem;color:var(--cyan);">${i.name}</div>
          <div style="font-size:0.65rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:220px;">
            ${i.start.name.replace("พิกัด: ","")} → ${i.end.name.replace("พิกัด: ","")}
          </div>
        </div>
        <button class="todo-del-btn route-del-btn" data-id="${i.id}" aria-label="ลบเส้นทาง">
          <i data-lucide="trash" style="width:13px;height:13px;"></i>
        </button>
      </div>
    `).join(""),lucide.createIcons(),t.querySelectorAll(".saved-route-trigger").forEach(i=>{i.addEventListener("click",()=>{const n=parseInt(i.dataset.id),a=e.find(o=>o.id===n);a&&(this.resetRouting(),this.setRouteStart(a.start.lat,a.start.lng,a.start.name),this.setRouteEnd(a.end.lat,a.end.lng,a.end.name),this.calculateRoute(),this.showToast("โหลดเส้นทาง",`แสดงเส้นทาง: ${a.name}`))})}),t.querySelectorAll(".route-del-btn").forEach(i=>{i.addEventListener("click",n=>{n.stopPropagation(),ct(parseInt(i.dataset.id)),this.renderSavedRoutes()})})}initCCTVs(){this.cctvIntervals.forEach(clearInterval),this.cctvIntervals=[],this.trainTrackerWidget=null;const t=e=>{const i=document.getElementById(e);if(!i)return;const n=i.getContext("2d");i.width=320,i.height=180;const a=Array.from({length:6},()=>({x:Math.random()*i.width,y:40+Math.random()*100,speed:1.5+Math.random()*2.5,color:["#00f2fe","#ffd740","#ff4d4d","#ffffff","#a855f7"][Math.floor(Math.random()*5)],size:5+Math.random()*8,dir:Math.random()>.5?1:-1})),o=()=>{n.fillStyle="#111827",n.fillRect(0,0,i.width,i.height),n.strokeStyle="rgba(255,255,255,0.08)",n.lineWidth=4,n.beginPath(),n.moveTo(0,90),n.lineTo(320,90),n.moveTo(160,0),n.lineTo(160,180),n.stroke(),n.strokeStyle="rgba(255,255,255,0.15)",n.lineWidth=1,n.setLineDash([8,8]),n.beginPath(),n.moveTo(0,65),n.lineTo(320,65),n.moveTo(0,115),n.lineTo(320,115),n.stroke(),n.setLineDash([]),a.forEach(s=>{s.x+=s.speed*s.dir,s.dir===1&&s.x>i.width+10&&(s.x=-10),s.dir===-1&&s.x<-10&&(s.x=i.width+10),n.fillStyle=s.color,n.beginPath(),n.roundRect(s.x,s.y,s.size*1.6,s.size,2),n.fill(),n.fillStyle=s.dir===1?"#ff4d4d":"#ffd740";const l=s.dir===1?s.x:s.x+s.size*1.6-2;n.fillRect(l,s.y+1,2,2),n.fillRect(l,s.y+s.size-3,2,2)}),n.fillStyle="rgba(0,242,254,0.03)";for(let s=0;s<i.height;s+=3)n.fillRect(0,s,i.width,1);Math.random()>.98&&(n.fillStyle="rgba(255,255,255,0.12)",n.fillRect(0,Math.random()*i.height,i.width,4)),n.fillStyle="#ffffff",n.font="7px monospace",n.fillText(new Date().toLocaleString("en-US"),200,172),n.fillStyle="var(--cyan)",n.fillText("REC ◉",15,172)};this.cctvIntervals.push(setInterval(o,1e3/24))};t("cctvAsoke"),t("cctvRama9"),t("cctvSathorn")}renderTransitTab(){this.transitContainer.innerHTML=`
      <div id="trainTrackerMount" style="margin-bottom:24px;"></div>
      <div class="transit-grid">
        <div>
          <!-- Status Board -->
          <div class="glass-card" style="margin-bottom: 24px;">
            <h3 style="font-size:0.85rem;display:flex;align-items:center;gap:8px;margin-bottom:16px;">
              <i data-lucide="radio" style="color:var(--cyan);"></i> สถานะระบบรถไฟฟ้า BTS-MRT-ARL
            </h3>
            <div class="transit-status-board" id="transitStatusContainer"></div>
            <button class="btn btn-secondary" id="btnRefreshTransitStatus" style="width:100%;margin-top:16px;font-size:0.75rem;padding:10px;">
              <i data-lucide="refresh-cw"></i> อัพเดทสถานะรถไฟฟ้า
            </button>
          </div>

          <!-- Timetable -->
          <div class="glass-card">
            <h3 style="font-size:0.85rem;display:flex;align-items:center;gap:8px;margin-bottom:16px;">
              <i data-lucide="clock" style="color:var(--yellow);"></i> ตารางเวลาขบวนแรก / ขบวนสุดท้าย
            </h3>
            <div class="fare-inputs">
              <div class="input-field-wrap">
                <label>เลือกระบบรถไฟฟ้า</label>
                <select id="timeSystemSelect">
                  <option value="bts_green">BTS สายสุขุมวิท (สีเขียว)</option>
                  <option value="bts_silom">BTS สายสีลม (สีเขียวเข้ม)</option>
                  <option value="mrt_blue">MRT สายสีน้ำเงิน (Blue Line)</option>
                  <option value="mrt_purple">MRT สายสีม่วง (Purple Line)</option>
                  <option value="mrt_yellow">MRT สายสีเหลือง (Yellow Line)</option>
                  <option value="arl">Airport Rail Link (ARL)</option>
                </select>
              </div>
              <div class="input-field-wrap">
                <label>เลือกสถานี</label>
                <select id="timeStationSelect"></select>
              </div>
            </div>
            <div class="fare-result-display" id="timetableResultDisplay" style="display:flex;margin-top:20px;">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <div class="sub-tile" style="background:rgba(255,255,255,0.01);">
                  <div style="font-size:0.65rem;color:var(--muted);">🚉 ขบวนแรก</div>
                  <div id="firstTrainTime" style="font-size:1.15rem;font-weight:600;color:var(--cyan);margin-top:4px;">--:--</div>
                </div>
                <div class="sub-tile" style="background:rgba(255,255,255,0.01);">
                  <div style="font-size:0.65rem;color:var(--muted);">🏁 ขบวนสุดท้าย</div>
                  <div id="lastTrainTime" style="font-size:1.15rem;font-weight:600;color:var(--red);margin-top:4px;">--:--</div>
                </div>
                <div class="sub-tile" style="background:rgba(255,255,255,0.01);">
                  <div style="font-size:0.65rem;color:var(--muted);">🚆 ขบวนถัดไป</div>
                  <div id="nextTrainTime" style="font-size:1.15rem;font-weight:600;color:var(--yellow);margin-top:4px;">--:--</div>
                </div>
                <div class="sub-tile" style="background:rgba(255,255,255,0.01);">
                  <div style="font-size:0.65rem;color:var(--muted);">⏱ รอกี่นาที</div>
                  <div id="waitMinsText" style="font-size:1rem;font-weight:600;color:var(--text);margin-top:4px;">--</div>
                </div>
              </div>
              <div style="font-size:0.7rem;color:var(--muted);margin-top:10px;display:flex;flex-direction:column;gap:4px;padding-top:10px;border-top:1px dashed var(--border);">
                <span id="peakStatusText">--</span>
                <span><b>ความถี่ช่วงเร่งด่วน:</b> <span id="freqPeak">--</span></span>
                <span><b>ความถี่ช่วงปกติ:</b> <span id="freqOff">--</span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Fare Calculator -->
        <div class="glass-card">
          <h3 style="font-size:0.85rem;display:flex;align-items:center;gap:8px;margin-bottom:20px;">
            <i data-lucide="calculator" style="color:var(--cyan);"></i> เครื่องคำนวณค่าโดยสารรถไฟฟ้า
          </h3>
          <div class="fare-calculator-box">
            <div class="fare-inputs">
              <div class="input-field-wrap">
                <label>ระบบรถไฟฟ้า</label>
                <select id="fareSystemSelect">
                  <option value="bts_green">BTS สายสุขุมวิท (สีเขียว)</option>
                  <option value="bts_silom">BTS สายสีลม</option>
                  <option value="mrt_blue">MRT สายสีน้ำเงิน</option>
                  <option value="mrt_purple">MRT สายสีม่วง</option>
                  <option value="mrt_yellow">MRT สายสีเหลือง</option>
                  <option value="arl">Airport Rail Link (ARL)</option>
                </select>
              </div>
              <div class="input-field-wrap">
                <label>ประเภทผู้โดยสาร</label>
                <select id="farePassengerSelect">
                  <option value="adult">บุคคลทั่วไป</option>
                  <option value="student">นักเรียน/นักศึกษา (-30%)</option>
                  <option value="senior">ผู้สูงอายุ (-50%)</option>
                </select>
              </div>
            </div>
            <div class="fare-inputs" style="margin-top:-4px;">
              <div class="input-field-wrap">
                <label>สถานีต้นทาง</label>
                <select id="fareOriginSelect"></select>
              </div>
              <div class="input-field-wrap">
                <label>สถานีปลายทาง</label>
                <select id="fareDestSelect"></select>
              </div>
            </div>
            <div class="fare-result-display" id="fareResultDisplay">
              <div class="fare-main-val">
                <span class="fare-val-label">ค่าโดยสารรวม:</span>
                <span class="fare-val-number" id="fareVal">-- <span>บาท</span></span>
              </div>
              <div class="fare-route-details">
                <i data-lucide="info" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:4px;color:var(--cyan);"></i>
                จำนวน: <span id="fareStationsCount">--</span> สถานี · เวลา: <span id="fareDuration">--</span> นาที
              </div>
              <div class="fare-interchange-warning" id="interchangeAdvice" style="display:none;"></div>
            </div>
          </div>
        </div>
      </div>
    `,lucide.createIcons()}setupTransitEvents(){var y;if(!this.transitContainer)return;this.trainTrackerWidget=new bt("trainTrackerMount",this.state),this.trainTrackerWidget.init(),this.refreshTransitStatus(),(y=document.getElementById("btnRefreshTransitStatus"))==null||y.addEventListener("click",()=>{this.refreshTransitStatus(),this.showToast("อัพเดทสำเร็จ","อัพเดทสถานะรถไฟฟ้าแล้ว")});const t=document.getElementById("timeSystemSelect"),e=document.getElementById("timeStationSelect"),i=(g,m)=>{const u=document.getElementById(g);u&&(u.innerText=m)},n=(g,m)=>{const u=document.getElementById(g);u&&(u.innerHTML=m)},a=()=>{const g=t.value,m=P[g]||[];e.innerHTML=m.map(u=>`<option value="${u.name}">${u.name}</option>`).join(""),o()},o=()=>{const g=t==null?void 0:t.value;if(!g)return;const m=rt(g);i("firstTrainTime",m.firstTrain),i("lastTrainTime",m.lastTrain),i("nextTrainTime",m.nextTrain||"--:--"),i("freqPeak",m.frequencyPeak),i("freqOff",m.frequencyOffPeak),i("waitMinsText",m.waitMinutes!=null?m.waitMinutes===0?"กำลังจะถึง!":`อีก ${m.waitMinutes} นาที`:"--"),n("peakStatusText",m.isPeak?'<b style="color:var(--red);">⚡ ช่วงเร่งด่วน</b>':'<b style="color:var(--cyan);">🌙 ช่วงปกติ</b>')};t.addEventListener("change",a),e.addEventListener("change",o),a();const s=document.getElementById("fareSystemSelect"),l=document.getElementById("fareOriginSelect"),c=document.getElementById("fareDestSelect"),d=document.getElementById("farePassengerSelect"),p=()=>{const g=s.value,m=P[g]||[],u=m.map(f=>`<option value="${f.index}">${f.name}</option>`).join("");l.innerHTML=u,c.innerHTML=u,m.length>1&&(c.selectedIndex=1),h()},h=()=>{var E,H;const g=s.value,m=parseInt(l.value),u=parseInt(c.value),f=d.value;if(isNaN(m)||isNaN(u))return;const x=st(g,m,u,f);document.getElementById("fareVal").innerHTML=`${x.fare} <span>บาท</span>`,i("fareStationsCount",x.stationsCount),i("fareDuration",x.duration);const b=P[g]||[],T=((E=b.find(v=>v.index===m))==null?void 0:E.name)||"",S=((H=b.find(v=>v.index===u))==null?void 0:H.name)||"",_=lt(g,T,S),I=document.getElementById("interchangeAdvice");_?(I.innerHTML=`<i data-lucide="sparkles" style="width:14px;height:14px;flex-shrink:0;"></i> <span>${_}</span>`,I.style.display="flex",lucide.createIcons()):I.style.display="none",document.getElementById("fareResultDisplay").style.display="flex"};s.addEventListener("change",p),l.addEventListener("change",h),c.addEventListener("change",h),d.addEventListener("change",h),p()}refreshTransitStatus(){var g,m;const t=document.getElementById("transitStatusContainer");if(!t)return;const e=new Date().getHours(),i=new Date().getMinutes(),n=e===8&&i>=15&&i<=35||e===18&&i>=20&&i<=45,a=e===8&&i>=30&&i<=55||e===18&&i>=10&&i<=30,o=((m=(g=this.state)==null?void 0:g.getWeatherCode)==null?void 0:m.call(g))??null,s=[51,53,55,61,63,65,80,81,82,95,96],l=[65,81,82,95,96],c=o!==null&&s.includes(o),d=o!==null&&l.includes(o);let p="";d?p="ฝนตกหนัก — อาจเกิดความล่าช้าเพิ่มเติมทุกสาย":c&&(p="ฝนตก — ผู้โดยสารหนาแน่นกว่าปกติ");const h=[{name:"BTS สายสุขุมวิท (Green Line)",color:"#22c55e",delayed:n||d,delayNote:n?"ล่าช้า 3-5 นาที ขบวนหนาแน่นที่สยาม":"ล่าช้าเนื่องจากฝนตกหนัก"},{name:"BTS สายสีลม (Silom Line)",color:"#15803d",delayed:d,delayNote:"ล่าช้าเนื่องจากฝนตกหนัก"},{name:"MRT สายเฉลิมรัชมงคล (Blue Line)",color:"#1e3a8a",delayed:a,delayNote:"ล่าช้า 8 นาที ระบบสัญญาณขัดข้องที่ห้วยขวาง"},{name:"MRT สายฉลองรัชธรรม (Purple Line)",color:"#7e22ce",delayed:!1},{name:"MRT สายสีเหลือง (Yellow Line)",color:"#ca8a04",delayed:!1},{name:"Airport Rail Link (ARL)",color:"#e11d48",delayed:!1}],y=p?`<div style="font-size:0.72rem;color:var(--yellow);background:rgba(234,179,8,0.08);border:1px solid rgba(234,179,8,0.2);border-radius:8px;padding:8px 12px;margin-bottom:12px;">${d?"🌧 ":"🌦 "}${p}</div>`:"";t.innerHTML=y+h.map(u=>`<div class="transit-line"><div class="transit-line-info"><div class="transit-color-bar" style="background-color:${u.color};"></div><div><div class="transit-name">${u.name}</div><div class="transit-desc">${u.delayed?"⚠️ "+u.delayNote:"🟢 บริการปกติความถี่คงที่"}</div></div></div><div class="transit-status ${u.delayed?"delay":"normal"}">${u.delayed?"🟡 ล่าช้า":"🟢 ปกติ"}</div></div>`).join("")}showToast(t,e){const i=document.getElementById("toastContainer");if(!i)return;const n=document.createElement("div");n.className="toast-alert",n.innerHTML=`
      <div class="toast-icon" style="color:var(--cyan);"><i data-lucide="info" style="width:16px;height:16px;"></i></div>
      <div class="toast-content">
        <div class="toast-title" style="color:var(--cyan);">${t}</div>
        <div class="toast-msg">${e}</div>
      </div>
    `,i.appendChild(n),lucide.createIcons(),setTimeout(()=>{n.classList.add("dismissed"),setTimeout(()=>n.remove(),300)},4e3)}}class wt{constructor(t,e){this.container=document.getElementById(t),this.state=e,this.pomoMinutes=25,this.pomoSeconds=0,this.pomoDuration=25*60,this.pomoTimer=null,this.pomoRunning=!1,this.pomoMode="work",this.waterGoal=8,this.waterCount=parseInt(localStorage.getItem("commuter_water_cups"))||0,this.audioCtx=null}async init(){this.render(),this.initTodo(),this.initWater(),this.initPomodoro(),this.initBattery(),this.initMemo(),this.initCalendar()}render(){this.container.innerHTML=`
      <div class="widgets-layout-grid">
        <!-- 1. POMODORO FOCUS TIMER -->
        <div class="glass-card">
          <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
            <i data-lucide="timer" style="color: var(--cyan);"></i> สมาธิการทำงาน (Pomodoro Focus)
          </h3>
          <div class="pomodoro-box">
            <div class="pomodoro-ring-wrap">
              <svg class="pomodoro-svg">
                <circle class="pomodoro-circle-bg" cx="50" cy="50" r="45"></circle>
                <circle class="pomodoro-circle-fill" id="pomoCircle" cx="50" cy="50" r="45"></circle>
              </svg>
              <div class="pomodoro-time-text" id="pomoDisplay">25:00</div>
            </div>
            
            <div class="pomodoro-actions">
              <div style="font-size: 0.65rem; color: var(--muted); margin-bottom: 4px; font-family: 'JetBrains Mono', monospace;" id="pomoModeText">โฟกัสงาน (WORK MODE)</div>
              <div style="display: flex; gap: 6px;">
                <button class="btn btn-primary" id="btnPomoStart" style="flex: 1; font-size: 0.75rem; padding: 6px 10px;">
                  <i data-lucide="play" style="width: 12px; height: 12px;"></i> เริ่ม
                </button>
                <button class="btn" id="btnPomoReset" style="font-size: 0.75rem; padding: 6px 10px;">
                  รีเซ็ต
                </button>
              </div>
              <div style="display: flex; gap: 4px; margin-top: 4px;">
                <button class="btn" id="btnPomoWork" style="font-size: 0.6rem; padding: 4px 6px; flex: 1;">งาน</button>
                <button class="btn" id="btnPomoShort" style="font-size: 0.6rem; padding: 4px 6px; flex: 1;">พักสั้น</button>
                <button class="btn" id="btnPomoLong" style="font-size: 0.6rem; padding: 4px 6px; flex: 1;">พักยาว</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. WATER INTAKE TRACKER -->
        <div class="glass-card">
          <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
            <i data-lucide="droplets" style="color: #38bdf8;"></i> ปริมาณน้ำดื่ม (Water Tracker)
          </h3>
          <div class="water-tracker-container">
            <div class="water-glass-display">
              <div class="water-wave" id="waterWave"></div>
            </div>
            
            <div class="water-tracker-controls">
              <div class="water-count" id="waterDisplay">0 / 8 <span style="font-size: 0.85rem; color: var(--muted);">แก้ว</span></div>
              <div style="font-size: 0.65rem; color: var(--muted); margin-bottom: 8px;">เป้าหมายวันนี้: 2 ลิตร (8 แก้ว)</div>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-primary" id="btnWaterAdd" style="flex: 1; padding: 6px 10px; font-size: 0.75rem; background: #0284c7; border-color: #0284c7;">
                  <i data-lucide="plus" style="width: 14px; height: 14px;"></i> ดื่ม 1 แก้ว
                </button>
                <button class="btn" id="btnWaterSub" style="padding: 6px 10px; font-size: 0.75rem;">
                  -
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. TO-DO LISTS -->
        <div class="glass-card" style="grid-row: span 2;">
          <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
            <i data-lucide="check-square" style="color: var(--cyan);"></i> งานและรายการสิ่งที่จะทำ (Task To-do)
          </h3>
          
          <div class="todo-section">
            <div style="display: flex; gap: 4px; margin-bottom: 4px;">
              <button class="btn btn-primary todo-filter-btn" data-filter="all" style="font-size: 0.65rem; padding: 4px 8px; flex: 1;">ทั้งหมด</button>
              <button class="btn todo-filter-btn" data-filter="work" style="font-size: 0.65rem; padding: 4px 8px; flex: 1;">💻 งาน</button>
              <button class="btn todo-filter-btn" data-filter="travel" style="font-size: 0.65rem; padding: 4px 8px; flex: 1;">🚗 เดินทาง</button>
              <button class="btn todo-filter-btn" data-filter="home" style="font-size: 0.65rem; padding: 4px 8px; flex: 1;">🏠 บ้าน</button>
            </div>

            <div class="todo-input-wrap">
              <input type="text" id="todoInput" placeholder="เพิ่มงานใหม่ที่จะทำวันนี้..." autocomplete="off">
              <button class="btn btn-primary" id="btnTodoAdd" style="font-size: 0.75rem; padding: 10px 14px;">
                <i data-lucide="plus"></i>
              </button>
            </div>

            <div class="todo-list-items" id="todoItemsContainer">
              <!-- Filled Dynamically -->
            </div>
          </div>
        </div>

        <!-- 4. INTERACTIVE CALENDAR & PLANNER -->
        <div class="glass-card" style="grid-row: span 2;">
          <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <i data-lucide="calendar" style="color: var(--cyan);"></i> ปฏิทินและบันทึกกำหนดการ (Schedule & Calendar)
          </h3>
          <div id="calendarHeader" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 0.8rem; font-weight: 500;">
            <span id="calendarMonthYear">พฤษภาคม 2569</span>
            <div style="display: flex; gap: 4px;">
              <button class="btn" id="btnCalPrev" style="padding: 2px 6px; font-size: 0.75rem;"><i data-lucide="chevron-left" style="width: 12px; height: 12px;"></i></button>
              <button class="btn" id="btnCalNext" style="padding: 2px 6px; font-size: 0.75rem;"><i data-lucide="chevron-right" style="width: 12px; height: 12px;"></i></button>
            </div>
          </div>
          
          <!-- Month Grid -->
          <div id="calendarGrid" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; text-align: center; font-size: 0.7rem;">
            <!-- Rendered in JS -->
          </div>

          <!-- Selected day schedule detail -->
          <div style="margin-top: 14px; border-top: 1px solid var(--border); padding-top: 12px;">
            <div style="font-size: 0.7rem; color: var(--muted); font-weight: 500; margin-bottom: 6px; display: flex; justify-content: space-between;" id="calSelectedDayText">
              <span>โน้ตตารางเวลาวันที่: --</span>
            </div>
            <textarea id="calDayNoteInput" placeholder="ป้อนบันทึก/ตารางนัดหมายของวันนี้..." style="width:100%; height:60px; background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:8px; padding:6px; color:var(--text); font-size:0.75rem; outline:none; resize:none;"></textarea>
            <button class="btn btn-primary" id="btnSaveCalNote" style="font-size: 0.7rem; padding: 4px 8px; border-radius: 6px; margin-top: 4px; float: right;">
              บันทึกนัดหมาย
            </button>
          </div>
        </div>

        <!-- 5. OFFLINE MEMO PAD (STICKY NOTES) -->
        <div class="glass-card sticky-note-pad">
          <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <i data-lucide="edit-3" style="color: #fef08a;"></i> สมุดโน้ตส่วนตัว (Memo Sticky Note)
          </h3>
          <textarea class="notes-textarea" id="memoTextarea" placeholder="พิมพ์สิ่งสำคัญที่นี่... ข้อมูลจะบันทึกอัตโนมัติแบบออฟไลน์"></textarea>
          <div class="notes-status" id="memoSaveStatus">
            <i data-lucide="check" style="width: 12px; height: 12px;"></i> บันทึกแล้วอัตโนมัติ
          </div>
        </div>

        <!-- 6. LIVE BATTERY STATUS -->
        <div class="glass-card">
          <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
            <i data-lucide="battery" style="color: var(--green);"></i> พลังงานแบตเตอรี่ (Battery Sync)
          </h3>
          <div class="battery-tracker-box">
            <div class="battery-icon-container">
              <div class="battery-level-fill" id="batteryLevelFill"></div>
            </div>
            <div class="battery-text-info">
              <div style="font-family: 'Outfit'; font-size: 1.6rem; font-weight: 600; line-height: 1;" id="batteryPct">100%</div>
              <div style="font-size: 0.65rem; color: var(--muted); margin-top: 4px;" id="batteryStatusText">กำลังใช้งานแบตเตอรี่</div>
            </div>
          </div>
        </div>
      </div>
    `,lucide.createIcons()}initTodo(){this.todoFilter="all",this.todos=JSON.parse(localStorage.getItem("commuter_todos"))||[{id:1,text:"หยิบร่มใส่กระเป๋า",category:"travel",checked:!1},{id:2,text:"เช็คสถานะการดีเลย์ของบีทีเอส",category:"travel",checked:!1},{id:3,text:"ตรวจความเรียบร้อยรอบบ้านก่อนออกเดินทาง",category:"home",checked:!0},{id:4,text:"ส่งรายงานประชุมเช้านี้",category:"work",checked:!1}],this.renderTodoItems();const t=document.getElementById("todoInput"),e=document.getElementById("btnTodoAdd"),i=()=>{const a=t.value.trim();if(!a)return;let o="work";const s=a.toLowerCase();s.includes("ร่ม")||s.includes("bts")||s.includes("รถ")||s.includes("ถนน")||s.includes("เดินทาง")?o="travel":(s.includes("บ้าน")||s.includes("ไฟ")||s.includes("น้ำ")||s.includes("แมว")||s.includes("หมา"))&&(o="home"),this.todos.push({id:Date.now(),text:a,category:o,checked:!1}),localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),t.value="",this.renderTodoItems()};e==null||e.addEventListener("click",i),t==null||t.addEventListener("keypress",a=>{a.key==="Enter"&&i()});const n=this.container.querySelectorAll(".todo-filter-btn");n.forEach(a=>{a.addEventListener("click",()=>{n.forEach(o=>{o.classList.remove("btn-primary"),o.classList.add("btn-secondary")}),a.classList.add("btn-primary"),a.classList.remove("btn-secondary"),this.todoFilter=a.dataset.filter,this.renderTodoItems()})})}renderTodoItems(){const t=document.getElementById("todoItemsContainer");if(!t)return;const e=this.todos.filter(i=>this.todoFilter==="all"?!0:i.category===this.todoFilter);if(e.length===0){t.innerHTML='<div style="text-align: center; font-size: 0.75rem; color: var(--muted2); padding: 24px 0;">ไม่มีรายการสิ่งที่จะทำในหมวดหมู่นี้</div>';return}t.innerHTML=e.map(i=>{const n=i.category==="work"?"💻":i.category==="travel"?"🚗":"🏠";return`
        <div class="todo-item ${i.checked?"checked":""}" data-id="${i.id}">
          <div class="todo-item-left todo-check-trigger">
            <div class="todo-checkbox">
              <i data-lucide="check"></i>
            </div>
            <span class="todo-text">${n} ${i.text}</span>
          </div>
          <button class="todo-del-btn todo-delete-trigger">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
          </button>
        </div>
      `}).join(""),lucide.createIcons(),t.querySelectorAll(".todo-check-trigger").forEach(i=>{i.addEventListener("click",()=>{const n=parseInt(i.closest(".todo-item").dataset.id),a=this.todos.find(o=>o.id===n);a&&(a.checked=!a.checked,localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),this.renderTodoItems())})}),t.querySelectorAll(".todo-delete-trigger").forEach(i=>{i.addEventListener("click",n=>{n.stopPropagation();const a=parseInt(i.closest(".todo-item").dataset.id);this.todos=this.todos.filter(o=>o.id!==a),localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),this.renderTodoItems()})})}initWater(){var t,e;this.updateWaterDisplay(),(t=document.getElementById("btnWaterAdd"))==null||t.addEventListener("click",()=>{this.waterCount<16&&(this.waterCount++,localStorage.setItem("commuter_water_cups",this.waterCount),this.updateWaterDisplay())}),(e=document.getElementById("btnWaterSub"))==null||e.addEventListener("click",()=>{this.waterCount>0&&(this.waterCount--,localStorage.setItem("commuter_water_cups",this.waterCount),this.updateWaterDisplay())})}updateWaterDisplay(){const t=document.getElementById("waterWave"),e=document.getElementById("waterDisplay");if(!t||!e)return;const i=Math.min(100,Math.round(this.waterCount/this.waterGoal*100));t.style.height=`${i}%`,e.innerHTML=`${this.waterCount} / ${this.waterGoal} <span style="font-size: 0.85rem; color: var(--muted);">แก้ว (${this.waterCount*250} มล.)</span>`}initPomodoro(){var i,n,a;const t=document.getElementById("btnPomoStart"),e=document.getElementById("btnPomoReset");document.getElementById("pomoCircle"),t==null||t.addEventListener("click",()=>{this.pomoRunning?this.pausePomodoro():this.startPomodoro()}),e==null||e.addEventListener("click",()=>{this.resetPomodoro()}),(i=document.getElementById("btnPomoWork"))==null||i.addEventListener("click",()=>this.setPomoMode("work",25)),(n=document.getElementById("btnPomoShort"))==null||n.addEventListener("click",()=>this.setPomoMode("short_break",5)),(a=document.getElementById("btnPomoLong"))==null||a.addEventListener("click",()=>this.setPomoMode("long_break",15))}setPomoMode(t,e){this.pausePomodoro(),this.pomoMode=t,this.pomoMinutes=e,this.pomoSeconds=0,this.pomoDuration=e*60;const i=document.getElementById("pomoModeText"),n=document.getElementById("pomoCircle");i&&(t==="work"?(i.innerText="โฟกัสงาน (WORK MODE)",n&&(n.style.stroke="var(--cyan)")):t==="short_break"?(i.innerText="พักสั้น (SHORT BREAK)",n&&(n.style.stroke="var(--green)")):(i.innerText="พักยาว (LONG BREAK)",n&&(n.style.stroke="var(--purple)"))),this.updatePomoDisplay()}startPomodoro(){this.pomoRunning=!0;const t=document.getElementById("btnPomoStart");t&&(t.innerHTML='<i data-lucide="pause" style="width: 12px; height: 12px;"></i> หยุด',lucide.createIcons()),this.pomoTimer=setInterval(()=>{if(this.pomoSeconds===0){if(this.pomoMinutes===0){this.triggerPomoAlarm(),this.resetPomodoro();return}this.pomoMinutes--,this.pomoSeconds=59}else this.pomoSeconds--;this.updatePomoDisplay()},1e3)}pausePomodoro(){this.pomoRunning=!1,clearInterval(this.pomoTimer);const t=document.getElementById("btnPomoStart");t&&(t.innerHTML='<i data-lucide="play" style="width: 12px; height: 12px;"></i> เริ่ม',lucide.createIcons())}resetPomodoro(){this.pausePomodoro();const t=this.pomoMode==="work"?25:this.pomoMode==="short_break"?5:15;this.pomoMinutes=t,this.pomoSeconds=0,this.pomoDuration=t*60,this.updatePomoDisplay()}updatePomoDisplay(){const t=document.getElementById("pomoDisplay"),e=document.getElementById("pomoCircle");if(!t)return;const i=`${String(this.pomoMinutes).padStart(2,"0")}:${String(this.pomoSeconds).padStart(2,"0")}`;if(t.innerText=i,e){const o=283*(1-(this.pomoMinutes*60+this.pomoSeconds)/this.pomoDuration);e.style.strokeDashoffset=o}}triggerPomoAlarm(){try{this.audioCtx||(this.audioCtx=new(window.AudioContext||window.webkitAudioContext));const e=this.audioCtx.createOscillator(),i=this.audioCtx.createGain();e.connect(i),i.connect(this.audioCtx.destination),e.type="sine",e.frequency.setValueAtTime(659.25,this.audioCtx.currentTime),e.frequency.setValueAtTime(830.61,this.audioCtx.currentTime+.15),e.frequency.setValueAtTime(987.77,this.audioCtx.currentTime+.3),i.gain.setValueAtTime(0,this.audioCtx.currentTime),i.gain.linearRampToValueAtTime(.3,this.audioCtx.currentTime+.05),i.gain.exponentialRampToValueAtTime(.01,this.audioCtx.currentTime+.8),e.start(),e.stop(this.audioCtx.currentTime+.9)}catch(e){console.warn("Audio Context init failed (user interaction required):",e)}const t=this.pomoMode==="work"?"ครบเวลาแล้ว! ได้เวลาพักผ่อนแล้วพักสติ":"ได้เวลาลุยต่อแล้ว! เริ่มโฟกัสงานอีกครั้ง";alert(`🛎️ Pomodoro Alarm:
${t}`)}initBattery(){const t=document.getElementById("batteryLevelFill"),e=document.getElementById("batteryPct"),i=document.getElementById("batteryStatusText");if(!t||!e||!i)return;const n=a=>{const o=Math.round(a.level*100);e.innerText=`${o}%`,t.style.width=`${o}%`,o<=20&&!a.charging?(t.style.backgroundColor="var(--red)",t.style.boxShadow="0 0 10px var(--red)"):a.charging?(t.style.backgroundColor="var(--cyan)",t.style.boxShadow="0 0 10px var(--cyan)"):(t.style.backgroundColor="var(--green)",t.style.boxShadow="0 0 10px var(--green)"),i.innerText=a.charging?"กำลังชาร์จไฟพ่วงอยู่ (Charging)":`กำลังจ่ายกระแสไฟ (${Math.round(a.dischargingTime/60)||0} ชม. คงเหลือ)`};navigator.getBattery?navigator.getBattery().then(a=>{n(a),a.addEventListener("levelchange",()=>n(a)),a.addEventListener("chargingchange",()=>n(a))}):(e.innerText="92%",t.style.width="92%",i.innerText="ไม่มี Battery API รองรับ (โหมดเดสก์ท็อป)")}initMemo(){const t=document.getElementById("memoTextarea"),e=document.getElementById("memoSaveStatus");if(!t||!e)return;t.value=localStorage.getItem("commuter_memo")||"";let i;t.addEventListener("input",()=>{e.innerHTML='<i data-lucide="loader" style="width:12px;height:12px;animation:spin 1s linear infinite;"></i> กำลังบันทึกแบบร่าง...',lucide.createIcons(),i&&clearTimeout(i),i=setTimeout(()=>{localStorage.setItem("commuter_memo",t.value),e.innerHTML='<i data-lucide="check" style="width:12px;height:12px;"></i> บันทึกในบราวเซอร์สำเร็จแล้ว',lucide.createIcons()},800)})}initCalendar(){var i,n,a;this.calDate=new Date,this.calSelectedDay=this.calDate.getDate(),this.calendarNotes=JSON.parse(localStorage.getItem("commuter_calendar_notes"))||{};const t=()=>{const o=this.calDate.getFullYear(),s=this.calDate.getMonth(),l=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];document.getElementById("calendarMonthYear").innerText=`${l[s]} ${o+543}`;let d=["อา","จ","อ","พ","พฤ","ศ","ส"].map(u=>`<div style="font-weight:600; color:var(--muted); margin-bottom:6px;">${u}</div>`).join("");const p=new Date(o,s,1).getDay(),h=new Date(o,s+1,0).getDate();for(let u=0;u<p;u++)d+="<div></div>";const y=new Date,g=y.getFullYear()===o&&y.getMonth()===s;for(let u=1;u<=h;u++){const f=g&&y.getDate()===u,x=this.calSelectedDay===u,b=`${o}-${String(s+1).padStart(2,"0")}-${String(u).padStart(2,"0")}`,T=!!this.calendarNotes[b];d+=`
          <div class="calendar-day-tile ${f?"today":""} ${x?"selected":""}" 
               data-day="${u}"
               style="padding: 8px 4px; border-radius: 6px; cursor: pointer; position: relative; transition: var(--transition);
                      border: 1px solid ${x?"var(--cyan)":"transparent"};
                      background: ${f?"rgba(0, 242, 254, 0.1)":T?"rgba(0, 242, 254, 0.05)":"transparent"};">
            ${u}
            ${T?'<div style="position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; background: var(--cyan); border-radius: 50%;"></div>':""}
          </div>
        `}const m=document.getElementById("calendarGrid");m&&(m.innerHTML=d,m.querySelectorAll(".calendar-day-tile").forEach(u=>{u.addEventListener("click",()=>{m.querySelectorAll(".calendar-day-tile").forEach(f=>{f.style.borderColor="transparent"}),u.style.borderColor="var(--cyan)",this.calSelectedDay=parseInt(u.dataset.day),e()})}))},e=()=>{const o=this.calDate.getFullYear(),s=this.calDate.getMonth()+1,l=`${o}-${String(s).padStart(2,"0")}-${String(this.calSelectedDay).padStart(2,"0")}`;document.getElementById("calSelectedDayText").innerHTML=`<span>โน้ตตารางเวลาวันที่: ${this.calSelectedDay}/${s}/${o+543}</span>`,document.getElementById("calDayNoteInput").value=this.calendarNotes[l]||""};(i=document.getElementById("btnCalPrev"))==null||i.addEventListener("click",()=>{this.calDate.setMonth(this.calDate.getMonth()-1),this.calSelectedDay=1,t(),e()}),(n=document.getElementById("btnCalNext"))==null||n.addEventListener("click",()=>{this.calDate.setMonth(this.calDate.getMonth()+1),this.calSelectedDay=1,t(),e()}),(a=document.getElementById("btnSaveCalNote"))==null||a.addEventListener("click",()=>{const o=this.calDate.getFullYear(),s=this.calDate.getMonth()+1,l=`${o}-${String(s).padStart(2,"0")}-${String(this.calSelectedDay).padStart(2,"0")}`,c=document.getElementById("calDayNoteInput").value.trim();c?this.calendarNotes[l]=c:delete this.calendarNotes[l],localStorage.setItem("commuter_calendar_notes",JSON.stringify(this.calendarNotes)),t(),e();const d=document.getElementById("btnSaveCalNote");if(d){const p=d.innerHTML;d.innerHTML="✓ บันทึกแล้ว!",d.style.background="#22c55e",d.style.borderColor="#22c55e",setTimeout(()=>{d.innerHTML=p,d.style.background="",d.style.borderColor=""},1800)}}),t(),e()}}class St{constructor(t,e){this.container=document.getElementById(t),this.state=e}async init(){this.renderSkeleton(),await this.fetchAndRender()}renderSkeleton(){this.container.innerHTML=`
      <div class="emergency-grid">
        <div class="glass-card skeleton" style="height: 350px;"></div>
        <div class="glass-card skeleton" style="height: 350px;"></div>
      </div>
    `,lucide.createIcons()}async fetchAndRender(){var t;try{const e=this.state.getCoords();let i=0;try{i=(await N(e.lat,e.lon)).current.weather_code}catch(o){console.warn("Could not load weather for safety check, using normal code",o)}const n=q(i),a=et();this.render(n,a),this.setupEvents()}catch(e){console.error(e),this.container.innerHTML=`
        <div class="glass-card glow-card-red" style="text-align: center; padding: 40px;">
          <i data-lucide="shield-alert" style="width: 48px; height: 48px; color: var(--red); margin-bottom: 16px;"></i>
          <h3 style="color: var(--red);">เกิดข้อผิดพลาดในการโหลดข้อมูลความปลอดภัย</h3>
          <p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 20px;">${e.message}</p>
          <button class="btn btn-primary" id="retryEmergencyBtn"><i data-lucide="refresh-cw"></i> ลองใหม่</button>
        </div>
      `,lucide.createIcons(),(t=document.getElementById("retryEmergencyBtn"))==null||t.addEventListener("click",()=>this.init())}}render(t,e){const i=this.state.getCoords(),n=t.map(s=>{s.level;const l=s.level==="danger"?"border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.06);":s.level==="warning"?"border-color: rgba(245,158,11,0.25); background: rgba(245,158,11,0.04);":"border-color: var(--border);",c=s.level==="danger"?"var(--red)":s.level==="warning"?"var(--yellow)":"var(--cyan)",d=s.level==="danger"?"shield-alert":s.level==="warning"?"alert-triangle":"info";return`
        <div class="safety-alert-card" style="${l}">
          <div class="safety-alert-icon" style="color: ${c}; background: ${c}15;">
            <i data-lucide="${d}"></i>
          </div>
          <div class="safety-alert-info">
            <h4 style="color: ${c};">${s.title}</h4>
            <p>${s.text}</p>
          </div>
        </div>
      `}).join(""),a=e.map(s=>`
      <div class="todo-item" style="padding: 12px; align-items: flex-start; flex-direction: column; gap: 4px;">
        <div style="font-size: 0.8rem; font-weight: 500; color: var(--text); text-align: left;">${s.title}</div>
        <div style="display: flex; justify-content: space-between; width: 100%; font-size: 0.65rem; color: var(--muted); margin-top: 2px;">
          <span>📅 ${s.time}</span>
          <span style="color: var(--cyan); font-weight: 500;">🟢 ${s.status}</span>
        </div>
      </div>
    `).join(""),o=tt.map(s=>{let l="phone";return s.category==="medical"&&(l="ambulance"),s.category==="police"&&(l="shield"),s.category==="fire"&&(l="flame"),s.category==="flood"&&(l="droplet"),`
        <div class="emergency-contact-item">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,0.03); display: flex; align-items: center; justify-content: center; color: var(--cyan);">
              <i data-lucide="${l}" style="width: 14px; height: 14px;"></i>
            </div>
            <div style="text-align: left;">
              <div class="emergency-contact-name">${s.name}</div>
              <div style="font-size: 0.65rem; color: var(--muted);">${s.desc}</div>
            </div>
          </div>
          <a href="tel:${s.number}" class="emergency-contact-phone">${s.number}</a>
        </div>
      `}).join("");this.container.innerHTML=`
      <div class="emergency-grid">
        <!-- Warnings and Safety updates -->
        <div class="emergency-alert-panel">
          <div class="glass-card">
            <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 16px; color: var(--red);">
              <i data-lucide="shield-alert"></i> ศูนย์แจ้งข่าวสารและเตือนภัยพิบัติ (BKK Safety Board)
            </h3>
            
            <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
              ${n||'<div style="text-align:center; color:var(--muted); font-size:0.75rem; padding:20px;">🟢 ทุกพื้นที่สถานการณ์ปกติ ไม่มีรายงานภัยพิบัติขัดข้อง</div>'}
            </div>

            <!-- SOS Share panel -->
            <div style="background: rgba(239, 68, 68, 0.08); border: 1px dashed var(--red); border-radius: 16px; padding: 20px; text-align: center;">
              <h4 style="color: var(--red); font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 6px;">
                <i data-lucide="alert-octagon"></i> ปุ่มส่งสัญญาณขอความช่วยเหลือฉุกเฉิน (SOS)
              </h4>
              <p style="font-size: 0.7rem; color: var(--muted); margin-bottom: 16px;">
                เมื่อเกิดเหตุฉุกเฉิน กดปุ่มด้านล่างเพื่อคัดลอกพิกัด GPS ปัจจุบันและส่งแชร์ตำแหน่งของคุณไปยังผู้ติดต่อหลักทันที
              </p>
              
              <div style="font-size: 0.7rem; font-family: 'JetBrains Mono', monospace; color: var(--text); background: rgba(0,0,0,0.2); padding: 8px; border-radius: 8px; margin-bottom: 12px; display: inline-block;">
                📍 พิกัดของฉัน: <b>${i.lat.toFixed(6)}, ${i.lon.toFixed(6)}</b> (${i.name})
              </div>
              <br>
              <button class="btn" id="btnSOSShare" style="background: var(--red); border-color: var(--red); color: white; width: 100%; font-size: 0.8rem; padding: 12px;">
                <i data-lucide="share-2"></i> ส่งแชร์พิกัดฉุกเฉิน (SOS Broadcast)
              </button>
            </div>
          </div>

          <!-- MEA Outages announcement card -->
          <div class="glass-card">
            <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
              <i data-lucide="zap" style="color: var(--yellow);"></i> ตารางบำรุงรักษาดับกระแสไฟฟ้า (MEA Power Maintenance)
            </h3>
            <p style="font-size: 0.7rem; color: var(--muted); margin-bottom: 16px;">แผนงานปรับปรุงและย้ายเสาแรงสูงของการไฟฟ้านครหลวงในเขตกทม.</p>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${a}
            </div>
          </div>
        </div>

        <!-- Emergency Hotlines Contacts -->
        <div>
          <div class="glass-card">
            <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
              <i data-lucide="phone-call" style="color: var(--cyan);"></i> เบอร์ติดต่อฉุกเฉินและสาธารณูปโภค (BKK Hotlines)
            </h3>
            <p style="font-size: 0.7rem; color: var(--muted); margin-bottom: 16px;">กดที่หมายเลขโทรศัพท์เพื่อต่อสายติดต่อหน่วยงานหลักได้ทันที</p>
            
            <div class="emergency-contacts-list">
              ${o}
            </div>
          </div>
        </div>
      </div>
    `,lucide.createIcons()}setupEvents(){var t;(t=document.getElementById("btnSOSShare"))==null||t.addEventListener("click",()=>{const e=this.state.getCoords(),i=`🚨 SOS EMERGENCY ALERT! ฉันต้องการความช่วยเหลือด่วน
ตำแหน่งของฉัน: ${e.name}
พิกัด GPS: ${e.lat.toFixed(6)}, ${e.lon.toFixed(6)}
แผนที่: https://maps.google.com/?q=${e.lat},${e.lon}`;navigator.share?navigator.share({title:"SOS Emergency Position",text:i,url:`https://maps.google.com/?q=${e.lat},${e.lon}`}).then(()=>{this.showToast("ส่งสำเร็จ","ส่งสัญญาน SOS แชร์ตำแหน่งเรียบร้อยแล้ว")}).catch(n=>{console.warn("Share failed, copying instead:",n),this.copySOSToClipboard(i)}):this.copySOSToClipboard(i)})}copySOSToClipboard(t){navigator.clipboard.writeText(t).then(()=>{this.showToast("คัดลอกสำเร็จ","คัดลอกข้อความพิกัด SOS ลงคลิปบอร์ดแล้ว คุณสามารถกดส่งไลน์หาผู้เกี่ยวข้องได้ทันที!")}).catch(e=>{console.error("Clipboard copy failed:",e)})}showToast(t,e){const i=document.getElementById("toastContainer");if(!i)return;const n=document.createElement("div");n.className="toast-alert",n.style.borderColor="var(--red)",n.innerHTML=`
      <div class="toast-icon" style="color: var(--red);">
        <i data-lucide="alert-circle" style="width:16px;height:16px;"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title" style="color: var(--red);">${t}</div>
        <div class="toast-msg">${e}</div>
      </div>
    `,i.appendChild(n),lucide.createIcons(),setTimeout(()=>{n.classList.add("dismissed"),setTimeout(()=>n.remove(),300)},4e3)}}class It{constructor(){const t=localStorage.getItem("commuter_coords");t?this.coords=JSON.parse(t):this.coords={lat:13.7462,lon:100.5348,name:"สยามสแควร์ (กรุงเทพฯ)",country:"TH"},this.widgets=[],this.thunderTimer=null,this.weatherCode=null}getWeatherCode(){return this.weatherCode}setWeatherCode(t){this.weatherCode=t}getCoords(){return this.coords}setCoords(t,e,i,n){this.coords={lat:t,lon:e,name:i,country:n},localStorage.setItem("commuter_coords",JSON.stringify(this.coords)),this.widgets.forEach(a=>{typeof a.fetchAndRender=="function"?a.fetchAndRender():typeof a.init=="function"&&a.init()})}registerWidget(t){this.widgets.push(t)}triggerBackgroundAnimation(t){const e=document.getElementById("weatherBgOverlay");if(!e)return;e.innerHTML="",this.thunderTimer&&(clearInterval(this.thunderTimer),this.thunderTimer=null);const i=[51,53,55,61,63,65,80,81,82,95,96],n=[2,3,45,48],a=[0,1];if(i.includes(t)){const o=document.createDocumentFragment();for(let s=0;s<40;s++){const l=document.createElement("div");l.className="rain-drop",l.style.left=`${Math.random()*100}vw`,l.style.top=`${-80-Math.random()*100}px`,l.style.animationDuration=`${.6+Math.random()*.6}s`,l.style.animationDelay=`${Math.random()*2}s`,o.appendChild(l)}e.appendChild(o),t>=95&&(this.thunderTimer=setInterval(()=>{Math.random()>.75&&(e.style.backgroundColor="rgba(255, 255, 255, 0.14)",setTimeout(()=>{e.style.backgroundColor="transparent"},60))},3500))}else if(n.includes(t)){const o=document.createDocumentFragment();for(let s=0;s<4;s++){const l=document.createElement("div");l.className="cloud-particle";const c=150+Math.random()*220;l.style.width=`${c}px`,l.style.height=`${c*.65}px`,l.style.top=`${Math.random()*60}%`,l.style.animationDuration=`${40+Math.random()*50}s`,l.style.animationDelay=`${-Math.random()*40}s`,o.appendChild(l)}e.appendChild(o)}else if(a.includes(t)){const o=document.createElement("div");o.className="sun-ray",e.appendChild(o)}}}function kt(r){return new Promise(t=>{if(!navigator.geolocation)return t();navigator.geolocation.getCurrentPosition(e=>{const{latitude:i,longitude:n}=e.coords;fetch(`https://nominatim.openstreetmap.org/reverse?lat=${i}&lon=${n}&format=json&accept-language=th`).then(a=>a.json()).then(a=>{var s,l,c,d,p,h;const o=((s=a.address)==null?void 0:s.city)||((l=a.address)==null?void 0:l.town)||((c=a.address)==null?void 0:c.suburb)||((d=a.address)==null?void 0:d.county)||"ตำแหน่งปัจจุบัน";r.setCoords(i,n,o,((h=(p=a.address)==null?void 0:p.country_code)==null?void 0:h.toUpperCase())||"TH")}).catch(()=>{r.setCoords(i,n,"ตำแหน่งปัจจุบัน","TH")}).finally(t)},()=>t(),{timeout:6e3,maximumAge:6e4})})}document.addEventListener("DOMContentLoaded",async()=>{const r=new It;_t(),await kt(r);const t=new nt("tab-weather",r),e=new Tt(null,"tab-transit",r),i=new wt("tab-helper",r),n=new St("tab-emergency",r);r.registerWidget(t),r.registerWidget(e),r.registerWidget(i),r.registerWidget(n),await t.init(),await e.init(),await i.init(),await n.init(),Et(),Lt(),Mt(),Bt(),$t()});function _t(){const r=document.getElementById("mainTime"),t=document.getElementById("mainDate");if(!r||!t)return;const e=()=>{const i=new Date;r.innerText=i.toLocaleTimeString("th-TH",{hour12:!1});const n=["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],a=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."],o=n[i.getDay()],s=i.getDate(),l=a[i.getMonth()],c=i.getFullYear()+543;t.innerText=`วัน${o}ที่ ${s} ${l} ${c}`};e(),setInterval(e,1e3)}function Et(){const r=document.getElementById("themeToggle"),t=document.getElementById("theme-icon-light"),e=document.getElementById("theme-icon-dark");if(!r)return;const i=a=>{a==="light"?(document.body.classList.add("light-theme"),t&&(t.style.display="none"),e&&(e.style.display="block")):(document.body.classList.remove("light-theme"),t&&(t.style.display="block"),e&&(e.style.display="none")),document.dispatchEvent(new CustomEvent("theme-changed"))},n=localStorage.getItem("commuter_theme")||"dark";i(n),r.addEventListener("click",()=>{const o=document.body.classList.contains("light-theme")?"dark":"light";localStorage.setItem("commuter_theme",o),i(o)})}function Lt(r){const t=document.querySelectorAll(".nav-item"),e=document.querySelectorAll(".tab-content"),i=document.getElementById("headerTitle"),n=document.getElementById("headerSub"),a={weather:{main:"สภาพอากาศและการเตรียมตัว",sub:"BANGKOK METROPOLIS · TH"},transit:{main:"ตารางเวลารถไฟบีทีเอส-เอ็มอาร์ที",sub:"BANGKOK MASS TRANSIT HUB"},helper:{main:"สิ่งอำนวยความสะดวกในชีวิตประจำวัน",sub:"DAILY PRODUCTIVITY WIDGETS"},emergency:{main:"ศูนย์ความปลอดภัยและข้อมูลติดต่อด่วน",sub:"BANGKOK SAFETY BOARD & SOS"}};t.forEach(o=>{o.addEventListener("click",()=>{const s=o.dataset.tab;t.forEach(c=>c.classList.remove("active")),o.classList.add("active"),e.forEach(c=>c.classList.remove("active"));const l=document.getElementById(`tab-${s}`);l&&l.classList.add("active"),i&&n&&a[s]&&(i.innerText=a[s].main,n.innerText=a[s].sub)})})}function Mt(){const r=document.querySelector(".widgets-layout-grid");if(!r)return;const t=()=>{r.querySelectorAll(".glass-card").forEach(n=>{n.classList.add("draggable-widget"),n.setAttribute("draggable","true")})};t(),new MutationObserver(()=>{t()}).observe(r,{childList:!0});let i=null;r.addEventListener("dragstart",n=>{const a=n.target.closest(".draggable-widget");a&&(i=a,n.dataTransfer.effectAllowed="move",a.style.opacity="0.35")}),r.addEventListener("dragover",n=>{n.preventDefault();const a=n.target.closest(".draggable-widget");a&&a!==i&&a.classList.add("widget-drag-over")}),r.addEventListener("dragleave",n=>{const a=n.target.closest(".draggable-widget");a&&a.classList.remove("widget-drag-over")}),r.addEventListener("drop",n=>{n.preventDefault();const a=n.target.closest(".draggable-widget");if(a&&a!==i){a.classList.remove("widget-drag-over");const o=Array.from(r.children),s=o.indexOf(i),l=o.indexOf(a);s<l?r.insertBefore(i,a.nextSibling):r.insertBefore(i,a);const c=Array.from(r.children).map(d=>d.innerHTML.substring(0,30));localStorage.setItem("commuter_widget_order",JSON.stringify(c))}}),r.addEventListener("dragend",n=>{const a=n.target.closest(".draggable-widget");a&&(a.style.opacity="1"),r.querySelectorAll(".draggable-widget").forEach(o=>{o.classList.remove("widget-drag-over")})})}function Bt(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(r=>console.log("Service Worker registered successfully:",r.scope)).catch(r=>console.error("Service Worker registration failed:",r))})}function $t(){const r=(t,e,i,n)=>{const a=document.getElementById("toastContainer");if(!a)return;const o=document.createElement("div");o.className="toast-alert",o.style.borderColor=i,o.innerHTML=`
      <div class="toast-icon" style="color: ${i};">
        <i data-lucide="${n}" style="width:16px;height:16px;"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title" style="color: ${i};">${t}</div>
        <div class="toast-msg">${e}</div>
      </div>
    `,a.appendChild(o),lucide.createIcons(),setTimeout(()=>{o.classList.add("dismissed"),setTimeout(()=>o.remove(),300)},4500)};window.addEventListener("online",()=>{r("การเชื่อมต่อกลับมาแล้ว","ระบบเปลี่ยนกลับเป็นโหมดออนไลน์อัตโนมัติ","var(--green)","wifi")}),window.addEventListener("offline",()=>{r("คุณออฟไลน์อยู่","ระบบสลับมาใช้ฐานข้อมูลและแคชออฟไลน์แล้ว","var(--yellow)","wifi-off")})}
