(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}})();const U=10*60*1e3;async function W(r,t={},e=U){const i=`api_cache_${r}`;if(!navigator.onLine){const n=localStorage.getItem(i);if(n){const{data:o}=JSON.parse(n);return console.log(`[API Cache] Offline mode: Served ${r} from cache.`),o}throw new Error("ระบบออฟไลน์และไม่มีข้อมูลสำรองสำหรับคำขอนี้")}const a=localStorage.getItem(i);if(a){const{data:n,timestamp:o}=JSON.parse(a);if(Date.now()-o<e)return n}try{const n=await fetch(r,t);if(!n.ok)throw new Error(`HTTP Error: ${n.status}`);const o=await n.json();return localStorage.setItem(i,JSON.stringify({data:o,timestamp:Date.now()})),o}catch(n){if(console.warn(`[API Cache] Fetch failed, fallback to cache for ${r}:`,n.message),a){const{data:o}=JSON.parse(a);return o}throw n}}const A={0:["☀️","CLEAR SKY","ท้องฟ้าแจ่มใส"],1:["🌤","MAINLY CLEAR","ท้องฟ้าโปร่ง"],2:["⛅","PARTLY CLOUDY","มีเมฆบางส่วน"],3:["☁️","OVERCAST","เมฆครึ้ม"],45:["🌫","FOGGY","หมอกลงจัด"],48:["🌫","RIME FOG","หมอกน้ำค้างแข็ง"],51:["🌦","LIGHT DRIZZLE","ฝนตกปรอยๆ เล็กน้อย"],53:["🌦","DRIZZLE","ฝนตกปรอยๆ"],55:["🌧","HEAVY DRIZZLE","ฝนตกปรอยหนาแน่น"],61:["🌧","LIGHT RAIN","ฝนตกเล็กน้อย"],63:["🌧","MODERATE RAIN","ฝนตกปานกลาง"],65:["🌧","HEAVY RAIN","ฝนตกชุกหนาแน่น"],80:["🌦","RAIN SHOWERS","ฝนตกกระจายตัว"],81:["⛈","STORM","พายุฝนฟ้าคะนอง"],82:["⛈","HEAVY STORM","พายุฝนคะนองรุนแรง"],95:["⛈","THUNDERSTORM","พายุฝนรุนแรงและฟ้าผ่า"],96:["⛈","HAIL STORM","พายุฝนฟ้าคะนองและลูกเห็บ"]},D=[{max:50,col:"#10b981",lbl:"ดีเยี่ยม (Good)",advice:"คุณภาพอากาศดีมาก เหมาะสำหรับทำกิจกรรมกลางแจ้ง"},{max:100,col:"#f59e0b",lbl:"ปานกลาง (Moderate)",advice:"คุณภาพอากาศปานกลาง กลุ่มเสี่ยงควรหลีกเลี่ยงกิจกรรมกลางแจ้งเป็นเวลานาน"},{max:150,col:"#ff9f43",lbl:"เริ่มมีผลกระทบ (Sensitive)",advice:"ควรสวมหน้ากากอนามัยเมื่ออยู่นอกอาคาร และลดการออกกำลังกายกลางแจ้ง"},{max:200,col:"#ef4444",lbl:"มีผลเสียต่อสุขภาพ (Unhealthy)",advice:"⚠️ สวมหน้ากาก PM2.5 ตลอดเวลาเมื่ออยู่กลางแจ้ง หลีกเลี่ยงกิจกรรมนอกอาคาร"},{max:300,col:"#b71c1c",lbl:"แย่อย่างยิ่ง (Very Unhealthy)",advice:"🚨 เป็นอันตรายต่อสุขภาพ! ควรอยู่ในอาคารที่ปิดมิดชิดและเปิดเครื่องฟอกอากาศ"},{max:500,col:"#7f1d1d",lbl:"อันตรายสูงสุด (Hazardous)",advice:"❌ วิกฤตคุณภาพอากาศร้ายแรง! ห้ามออกนอกอาคารโดยไม่จำเป็น"}];function j(r,t){const e=new Date,i=e.getHours(),a=i>=6&&i<10?1:i>=10&&i<14?2:i>=14&&i<18?3:0,n=Array.from({length:24},(l,c)=>{const d=new Date(e);return d.setHours(c,0,0,0),d.toISOString()}),o=Array.from({length:7},(l,c)=>{const d=new Date(e);return d.setDate(d.getDate()+c),d.toISOString().split("T")[0]}),s=Array.from({length:24},(l,c)=>30+Math.round(Math.sin((c-6)*Math.PI/12)*5));return{current:{temperature_2m:33,apparent_temperature:38,relative_humidity_2m:72,weather_code:a,wind_speed_10m:12,wind_direction_10m:180,surface_pressure:1009,visibility:9e3},hourly:{time:n,temperature_2m:s,weather_code:Array(24).fill(a),precipitation_probability:Array(24).fill(10)},daily:{time:o,weather_code:[1,2,3,63,1,2,0],temperature_2m_max:[35,34,33,30,36,35,37],temperature_2m_min:[26,25,25,24,27,26,27],sunrise:o.map(l=>l+"T06:08"),sunset:o.map(l=>l+"T18:32"),uv_index_max:[10,9,7,4,11,10,12],precipitation_sum:[0,0,2,15,0,0,0],precipitation_probability_max:[5,10,30,80,5,10,5]},latitude:r,longitude:t,_isMock:!0}}function J(r,t){return{current:{us_aqi:78,pm2_5:22.4},latitude:r,longitude:t,_isMock:!0}}async function z(r,t){const e=`https://api.open-meteo.com/v1/forecast?latitude=${r}&longitude=${t}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max&timezone=Asia%2FBangkok`,i=`api_cache_${e}`;try{const a=localStorage.getItem(i);if(a){const{timestamp:n}=JSON.parse(a);Date.now()-n>10*60*1e3&&localStorage.removeItem(i)}}catch{localStorage.removeItem(i)}try{return await W(e,{},6e5)}catch{return j(r,t)}}async function F(r,t){const e=`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${r}&longitude=${t}&current=us_aqi,pm2_5&timezone=Asia%2FBangkok`;try{return await W(e,{},10*60*1e3)}catch{return J(r,t)}}async function V(r){if(!r)return[];const t=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(r)}&count=5&language=th&format=json`;try{return(await(await fetch(t)).json()).results||[]}catch{return[]}}function Q(r,t){return[51,53,55,61,63,65,80,81,82,95,96].includes(r)||t>=40?{needed:!0,text:"☔ ควรพกร่มหรือเสื้อกันฝน! มีโอกาสเกิดฝนตกสูงในระหว่างวัน",color:"var(--cyan)"}:t>=15?{needed:!1,text:"🌤️ ฝนตกยาก แต่ท้องฟ้าอาจครึ้มๆ ไม่จำเป็นต้องพกร่ม",color:"var(--muted)"}:{needed:!1,text:"☀️ ท้องฟ้าแจ่มใส/แดดจัด เดินทางสะดวก ไม่จำเป็นต้องพกร่ม",color:"var(--green)"}}function Z(r,t,e){return[51,53,55,61,63,65,80,81,82,95,96].includes(e)?"เสื้อผ้าแห้งไว (Quick-Dry) หรือเสื้อคลุมกันน้ำ หลีกเลี่ยงรองเท้าผ้าใบสีขาว":r>=35?"เสื้อผ้าฝ้ายบางเบา ระบายอากาศดีเยี่ยม หมวก แว่นกันแดด และควรทาครีมกันแดด":r>=28?"เสื้อผ้าสวมใส่สบาย เช่น เสื้อยืด แขนสั้น กางเกงขาสั้น/ระบายความร้อนได้ดี":r>=22?"เสื้อยืดแขนสั้น หรือเชิ้ตบางๆ สภาพอากาศกำลังเย็นสบายกำลังดี":"สวมเสื้อแขนยาว หรือเตรียมเสื้อแจ็คเก็ตบางๆ เนื่องจากอากาศค่อนข้างเย็น"}function X(r){return r>=8?{text:"อันตรายระดับสูงมาก! หลีกเลี่ยงแสงแดดช่วง 10:00-16:00 ทากันแดด SPF 30+",color:"var(--red)"}:r>=6?{text:"ระดับสูง! ควรทาครีมกันแดด สวมหมวกปีกกว้าง และสวมแว่นกันแดด",color:"var(--yellow)"}:r>=3?{text:"ระดับปานกลาง ควรกางร่มเมื่อเดินกลางแจ้งเป็นเวลานาน",color:"var(--cyan)"}:{text:"ระดับต่ำ ปลอดภัยต่อการออกแดดทั่วไป",color:"var(--green)"}}const tt=[{name:"สายด่วนเจ็บป่วยฉุกเฉิน (สพฉ.)",number:"1669",category:"medical",desc:"กู้ชีพและอุบัติเหตุแพทย์ฉุกเฉิน"},{name:"เหตุด่วนเหตุร้าย (ตำรวจ)",number:"191",category:"police",desc:"แจ้งเหตุด่วนตำรวจหลัก"},{name:"สายด่วนข้อมูลการจราจร (บก.02)",number:"1197",category:"traffic",desc:"ศูนย์ควบคุมสั่งการจราจรกรุงเทพฯ"},{name:"ตำรวจทางหลวง",number:"1193",category:"traffic",desc:"เหตุบนมอเตอร์เวย์และทางหลวงแผ่นดิน"},{name:"แจ้งเหตุอัคคีภัย/ดับเพลิง",number:"199",category:"fire",desc:"นักดับเพลิงและกู้ภัยกรุงเทพฯ"},{name:"ศูนย์แพทย์ฉุกเฉินกทม. (ศูนย์เอราวัณ)",number:"1646",category:"medical",desc:"หน่วยแพทย์เคลื่อนที่กทม."},{name:"สายด่วนข้อมูลน้ำท่วมกทม.",number:"1555",category:"flood",desc:"ศูนย์ประสานงานน้ำท่วมกรุงเทพฯ"},{name:"สถานีวิทยุจราจรเพื่อการแจ้งเหตุ (จส.100)",number:"1137",category:"traffic",desc:"รายงานอุบัติเหตุและของหาย"}];function q(r){const t=[];return[61,63,65,80,81,82,95,96].includes(r)&&(t.push({id:"rain_alert",level:"warning",title:"🌧️ แจ้งเตือนฝนฟ้าคะนองในพื้นที่",text:"มีฝนตกชุกหนาแน่นและลมกรรโชกแรงในเขตกรุงเทพมหานครและปริมณฑล หลีกเลี่ยงการเดินทางกลางแจ้งหากไม่จำเป็น"}),r>=63&&t.push({id:"flood_alert",level:"danger",title:"🚨 พื้นที่เสี่ยงน้ำท่วมขังรอระบาย",text:"เนื่องจากมีปริมาณน้ำสะสมสูง พบปัญหาถนนน้ำขังระดับ 10-15 ซม. ที่ ถนนอโศกมนตรี (หน้า ตึก GMM), แยกรัชดา-ลาดพร้าว และซอยสุขุมวิท 39"})),t.push({id:"aqi_alert",level:"info",title:"😷 อัพเดทสถานการณ์ฝุ่น PM 2.5",text:"ค่าฝุ่นละออง PM 2.5 วันนี้มีแนวโน้มสะสมตัวเนื่องจากสภาพลมสงบ แนะนำตรวจเช็คดัชนีคุณภาพอากาศก่อนทำกิจกรรมกลางแจ้งทุกครั้ง"}),t}function et(){const r=[],t=new Date,e=["ถนนลาดพร้าว ซอย 80 (งานปรับปรุงระบบจำหน่ายแรงสูงเพื่อความปลอดภัย)","ซอยสุขุมวิท 22 (ติดตั้งอุปกรณ์ตรวจวัดกระแสไฟฟ้าแรงสูง)","ถนนพระราม 9 ซอย 15 (ย้ายเสาพาดสายหลบแนวก่อสร้างทางรถไฟฟ้า)"];for(let i=0;i<3;i++){const a=new Date(t);a.setDate(t.getDate()+i+1),r.push({id:`outage_${i}`,title:`⚡ ประกาศดับไฟเพื่อบำรุงรักษา — ${e[i]}`,time:`${a.toLocaleDateString("th-TH",{day:"numeric",month:"short"})} | 08:30 น. - 15:30 น.`,status:"กำลังดำเนินการตามแผน"})}return r}class it{constructor(t,e){this.containerId=t,this.state=e}async init(){this.container=document.getElementById(this.containerId),this.container&&(this.renderSkeleton(),await this.fetchAndRender())}renderSkeleton(){this.container.innerHTML=`
      <div class="glass-card skeleton" style="height: 120px;"></div>
    `}async fetchAndRender(){try{const t=this.state.getCoords(),e=await z(t.lat,t.lon),i=await F(t.lat,t.lon),a=e.current.weather_code,n=q(a);this.render(e,i,n)}catch(t){console.warn("Commute insights fetch error:",t.message),this.container.innerHTML=""}}render(t,e,i){const a=t.current,n=e.current.us_aqi,s=new Date().getHours();let l="",c="🌟",d="เช้าอันสดใส เหมาะแก่การเดินทาง",p="var(--cyan)";const v=[61,63,65,80,81,82,95,96].includes(a.weather_code);i.some(T=>T.id==="flood_alert")?(l="<b>แจ้งเตือนภัยพิบัติ:</b> มีฝนตกหนักน้ำท่วมขังในบางพื้นที่และพบบีทีเอสขัดข้อง ดีเลย์ประมาณ 8 นาที แนะนำให้เผื่อเวลาอย่างน้อย 20-30 นาทีในการเดินทางช่วงนี้",c="🚨",d="แจ้งเตือน: การเดินทางมีความเสี่ยงสูง",p="var(--red)"):v?(l="<b>พยากรณ์ฝนตก:</b> ท้องฟ้าครึ้มฝนฟ้าคะนองในเขตกทม. แนะนำให้พกร่มและสวมใส่รองเท้าที่กันน้ำได้ การจราจรบนทางด่วนอาจชะลอตัวเนื่องจากทัศนวิสัยต่ำ",c="☔",d="เตือนภัย: มีฝนฟ้าคะนองในพื้นที่",p="var(--yellow)"):a.temperature_2m>=35?(l="<b>สภาพอากาศร้อนจัด:</b> อุณหภูมิพุ่งสูงถึง 36°C+ แนะนำให้สวมใส่เสื้อผ้าเบาสบาย ระบายอากาศได้ดี หลีกเลี่ยงแดดจัดช่วงเที่ยง-บ่าย และพกน้ำดื่มติดตัว",c="☀️",d="เตือนภัย: สภาพอากาศร้อนจัด (Extreme Heat)",p="#f59e0b"):n>150?(l="<b>มลพิษทางอากาศ:</b> ค่าฝุ่น PM 2.5 วันนี้สูงเกินมาตรฐาน (US AQI: "+n+") แนะนำให้สวมใส่หน้ากาก N95 ก่อนทำกิจกรรมกลางแจ้ง",c="😷",d="เตือนภัย: คุณภาพอากาศเป็นอันตราย",p="#a855f7"):(l="<b>สภาพอากาศเอื้ออำนวย:</b> อากาศปลอดโปร่ง ไม่มีรายงานดีเลย์รถไฟฟ้า การจราจรช่วงเช้านี้ไหลลื่นปกติ ขอให้คุณเดินทางด้วยความสุขความปลอดภัย!",c="✨",d="สถานการณ์ปกติ: เดินทางได้ราบรื่น",p="var(--cyan)");let m=30,u="เบาบาง (เดินทางสะดวก)",f="var(--green)";s>=7&&s<=9||s>=17&&s<=19?(m=85,u="หนาแน่นสูง (ชานชาลาแออัด)",f="var(--red)"):(s>=11&&s<=13||s>=16&&s<17)&&(m=55,u="ปานกลาง (มีผู้โดยสารพ้นเก้าอี้)",f="var(--yellow)");let x="07:00 น. หรือ หลัง 09:15 น.",b="16:30 น. หรือ หลัง 19:30 น.";v&&(x="เดินทางล่วงหน้าเร็วขึ้น 30 นาที",b="รอฝนซาหลัง 19:30 น."),this.container.innerHTML=`
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
    `,lucide.createIcons()}}class at{constructor(t,e){this.container=document.getElementById(t),this.state=e,this.searchTimeout=null}async init(){await this.fetchAndRender()}async fetchAndRender(){var t;try{const e=this.state.getCoords(),i=await z(e.lat,e.lon),a=await F(e.lat,e.lon);this.render(i,a),this.setupSearchEvents()}catch(e){console.error(e),this.container.innerHTML=`
        <div class="glass-card glow-card-red" style="text-align:center;padding:40px;">
          <i data-lucide="wifi-off" style="width:48px;height:48px;color:var(--red);margin-bottom:16px;"></i>
          <h3 style="color:var(--red);margin-bottom:10px;">เกิดข้อผิดพลาดในการดึงข้อมูลสภาพอากาศ</h3>
          <p style="font-size:0.85rem;color:var(--muted);margin-bottom:20px;">${e.message}</p>
          <button class="btn btn-primary" id="retryWeatherBtn"><i data-lucide="refresh-cw"></i> ลองใหม่</button>
        </div>`,lucide.createIcons(),(t=document.getElementById("retryWeatherBtn"))==null||t.addEventListener("click",()=>this.init())}}render(t,e){const i=t.current,a=this.state.getCoords(),[n,o,s]=A[i.weather_code]||["🌡️","UNKNOWN","สภาพอากาศไม่ระบุ"],l=t.daily.sunrise[0].slice(11,16),c=t.daily.sunset[0].slice(11,16),d=new Date,p=d.getHours()*60+d.getMinutes(),g=parseInt(l.slice(0,2))*60+parseInt(l.slice(3,5)),v=parseInt(c.slice(0,2))*60+parseInt(c.slice(3,5)),h=Math.min(100,Math.max(0,(p-g)/(v-g)*100)),m=Q(i.weather_code,t.hourly.precipitation_probability[0]),u=Z(i.temperature_2m,i.apparent_temperature,i.weather_code),f=X(t.daily.uv_index_max[0]);this.state.setWeatherCode(i.weather_code),this.state.triggerBackgroundAnimation(i.weather_code);const x=d.getHours();let b="";for(let y=0;y<16;y++){const k=(x+y)%24,M=Math.round(t.hourly.temperature_2m[x+y]),H=t.hourly.weather_code[x+y],B=t.hourly.precipitation_probability[x+y],P=(A[H]||["🌡️"])[0];b+=`
        <div class="hourly-item ${y===0?"now":""}">
          <div class="hourly-time">${y===0?"ตอนนี้":`${String(k).padStart(2,"0")}:00`}</div>
          <div class="hourly-icon">${P}</div>
          <div class="hourly-temp">${M}°C</div>
          ${B>20?`<div style="font-size:0.6rem;color:var(--cyan);margin-top:2px;">💧${B}%</div>`:""}
        </div>`}let T="";for(let y=0;y<7;y++){const k=new Date(t.daily.time[y]),M=k.toLocaleDateString("th-TH",{weekday:"short"}),H=k.toLocaleDateString("th-TH",{day:"numeric",month:"short"}),B=Math.round(t.daily.temperature_2m_max[y]),P=Math.round(t.daily.temperature_2m_min[y]),K=t.daily.precipitation_probability_max[y],Y=(A[t.daily.weather_code[y]]||["🌡️"])[0];T+=`
        <div class="daily-item">
          <div class="daily-date">
            <span style="font-weight:500;">${M}</span><br>
            <span style="font-size:0.65rem;color:var(--muted);">${H}</span>
          </div>
          <div class="daily-icon-desc">
            <span class="daily-icon">${Y}</span>
            ${K>20?`<span class="daily-rain-chance"><i data-lucide="droplet" style="width:10px;height:10px;"></i> ${K}%</span>`:'<span style="font-size:0.7rem;color:var(--muted2);">ไม่มีฝน</span>'}
          </div>
          <div class="daily-temps">
            <span class="daily-temp-max">${B}°</span>
            <span class="daily-temp-min">${P}°</span>
          </div>
        </div>`}const w=e.current.us_aqi,I=e.current.pm2_5;let _="var(--muted)",E="ไม่มีข้อมูล";if(w!==void 0){for(const y of D)if(w<=y.max){_=y.col,E=y.lbl,y.advice;break}}this.container.innerHTML=`
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
              สภาพอากาศปัจจุบัน (${a.name})
            </div>
            <div class="weather-main-info">
              <div class="weather-big-icon float-effect">${n}</div>
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
                  <div class="solar-track-fill" style="width:${h}%"></div>
                  <div class="solar-sun-dot" style="left:${h}%">☀️</div>
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

            <div class="glass-card" style="border-color:${_}33;">
              <div style="font-size:0.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:2px;font-family:'JetBrains Mono',monospace;margin-bottom:12px;display:flex;align-items:center;gap:6px;">
                <i data-lucide="wind" style="width:14px;height:14px;"></i> ดัชนีคุณภาพอากาศ (US AQI)
              </div>
              <div class="aqi-row">
                <div>
                  <div class="aqi-number" style="color:${_};">${w??"--"}</div>
                  <div class="aqi-label" style="color:${_};">${E}</div>
                </div>
                <div style="text-align:right;">
                  <span style="font-size:0.65rem;color:var(--muted);">ปริมาณฝุ่น PM 2.5</span><br>
                  <b style="font-size:1.15rem;font-family:'Outfit';">${(I==null?void 0:I.toFixed(1))??"--"} <span style="font-size:0.7rem;font-weight:normal;">μg/m³</span></b>
                </div>
              </div>
              <div class="aqi-scale-bar">
                ${D.map((y,k)=>`<div class="aqi-scale-segment ${w!==void 0&&(k===0?w<=50:w>D[k-1].max&&w<=y.max)?"active":""}" style="background-color:${y.col};"></div>`).join("")}
              </div>
              <div style="display:flex;justify-content:space-between;font-size:0.5rem;color:var(--muted);font-family:'JetBrains Mono',monospace;margin-top:6px;">
                <span>0</span><span>50</span><span>100</span><span>150</span><span>200</span><span>300+</span>
              </div>
            </div>
          </div>
        </div>
      </div>`,new it("commuteBriefingContainer",this.state).init(),lucide.createIcons()}setupSearchEvents(){const t=document.getElementById("weatherSearchInput"),e=document.getElementById("weatherSuggestions");t&&(t.addEventListener("input",()=>{const i=t.value.trim();if(this.searchTimeout&&clearTimeout(this.searchTimeout),!i){e.style.display="none";return}this.searchTimeout=setTimeout(async()=>{const a=await V(i);a&&a.length>0?(e.innerHTML=a.map(n=>`
            <div class="suggestion-item" data-lat="${n.latitude}" data-lon="${n.longitude}" data-name="${n.name}" data-country="${n.country_code||"TH"}">
              <i data-lucide="map-pin" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:6px;color:var(--cyan);"></i>
              <b>${n.name}</b>${n.admin1?`, ${n.admin1}`:""} (${n.country||"ต่างประเทศ"})
            </div>`).join(""),e.style.display="block",lucide.createIcons(),e.querySelectorAll(".suggestion-item").forEach(n=>{n.addEventListener("click",()=>{const o=parseFloat(n.dataset.lat),s=parseFloat(n.dataset.lon),l=n.dataset.name,c=n.dataset.country;this.state.setCoords(o,s,l,c),t.value="",e.style.display="none",this.init()})})):(e.innerHTML='<div class="suggestion-item" style="color:var(--muted);cursor:default;">ไม่พบสถานที่ดังกล่าว...</div>',e.style.display="block")},350)}),document.addEventListener("click",i=>{!t.contains(i.target)&&!e.contains(i.target)&&(e.style.display="none")}))}}const nt={bts_green:{name:"BTS สายสุขุมวิท",short:"BTS-S",color:"#22c55e",fareBase:17,farePerSt:4.5,fareMax:65,timePerSt:2,pax:{adult:1,student:.7,senior:.5}},bts_silom:{name:"BTS สายสีลม",short:"BTS-L",color:"#15803d",fareBase:17,farePerSt:4.5,fareMax:65,timePerSt:2,pax:{adult:1,student:.7,senior:.5}},mrt_blue:{name:"MRT สายสีน้ำเงิน",short:"MRT-B",color:"#2563eb",fareBase:17,farePerSt:3,fareMax:45,timePerSt:2.5,pax:{adult:1,student:.9,senior:.5}},mrt_purple:{name:"MRT สายสีม่วง",short:"MRT-P",color:"#9333ea",fareBase:14,farePerSt:3,fareMax:42,timePerSt:2.5,pax:{adult:1,student:.9,senior:.5}},mrt_yellow:{name:"MRT สายสีเหลือง",short:"MRT-Y",color:"#eab308",fareBase:15,farePerSt:3.2,fareMax:45,timePerSt:2,pax:{adult:1,student:.9,senior:.5}},arl:{name:"Airport Rail Link",short:"ARL",color:"#e11d48",fareBase:15,farePerSt:5,fareMax:45,timePerSt:3,pax:{adult:1,student:1,senior:1}}},G=[{id:"khu_khot",name:"คูคต",line:"bts_green",idx:0},{id:"saphan_mai",name:"สะพานใหม่",line:"bts_green",idx:4},{id:"kasetsart",name:"ม.เกษตรศาสตร์",line:"bts_green",idx:11},{id:"ha_yaek",name:"ห้าแยกลาดพร้าว",line:"bts_green",idx:15},{id:"mo_chit",name:"หมอชิต",line:"bts_green",idx:16},{id:"saphan_khwai",name:"สะพานควาย",line:"bts_green",idx:17},{id:"ari",name:"อารีย์",line:"bts_green",idx:19},{id:"victory",name:"อนุสาวรีย์ชัยฯ",line:"bts_green",idx:21},{id:"phaya_thai",name:"พญาไท",line:"bts_green",idx:22},{id:"siam",name:"สยาม",line:"bts_green",idx:24},{id:"chit_lom",name:"ชิดลม",line:"bts_green",idx:25},{id:"phloen_chit",name:"เพลินจิต",line:"bts_green",idx:26},{id:"nana",name:"นานา",line:"bts_green",idx:27},{id:"asok",name:"อโศก",line:"bts_green",idx:28},{id:"phrom_phong",name:"พร้อมพงษ์",line:"bts_green",idx:29},{id:"thong_lo",name:"ทองหล่อ",line:"bts_green",idx:30},{id:"ekkamai",name:"เอกมัย",line:"bts_green",idx:31},{id:"phra_khanong",name:"พระโขนง",line:"bts_green",idx:32},{id:"on_nut",name:"อ่อนนุช",line:"bts_green",idx:33},{id:"bang_chak",name:"บางจาก",line:"bts_green",idx:34},{id:"udom_suk",name:"อุดมสุข",line:"bts_green",idx:36},{id:"bang_na",name:"บางนา",line:"bts_green",idx:37},{id:"bearing",name:"แบริ่ง",line:"bts_green",idx:38},{id:"samrong_bts",name:"สำโรง (BTS)",line:"bts_green",idx:39},{id:"kheha",name:"เคหะฯ",line:"bts_green",idx:47},{id:"nat_stadium",name:"สนามกีฬาแห่งชาติ",line:"bts_silom",idx:0},{id:"siam_l",name:"สยาม (สายสีลม)",line:"bts_silom",idx:1},{id:"sala_daeng",name:"ศาลาแดง",line:"bts_silom",idx:3},{id:"chong_nonsi",name:"ช่องนนทรี",line:"bts_silom",idx:4},{id:"saphan_taksin",name:"สะพานตากสิน",line:"bts_silom",idx:7},{id:"wongwian_yai",name:"วงเวียนใหญ่",line:"bts_silom",idx:9},{id:"bang_wa",name:"บางหว้า",line:"bts_silom",idx:13},{id:"tha_phra",name:"ท่าพระ",line:"mrt_blue",idx:0},{id:"tao_poon",name:"เตาปูน",line:"mrt_blue",idx:9},{id:"bang_sue",name:"บางซื่อ",line:"mrt_blue",idx:10},{id:"chatuchak",name:"สวนจตุจักร",line:"mrt_blue",idx:12},{id:"phahon_mrt",name:"พหลโยธิน (MRT)",line:"mrt_blue",idx:13},{id:"lat_phrao_mrt",name:"ลาดพร้าว (MRT)",line:"mrt_blue",idx:14},{id:"ratchadaphisek",name:"รัชดาภิเษก",line:"mrt_blue",idx:15},{id:"huai_khwang",name:"ห้วยขวาง",line:"mrt_blue",idx:17},{id:"rama9",name:"พระราม 9",line:"mrt_blue",idx:19},{id:"phetchaburi",name:"เพชรบุรี",line:"mrt_blue",idx:20},{id:"sukhumvit_mrt",name:"สุขุมวิท (MRT)",line:"mrt_blue",idx:21},{id:"silom_mrt",name:"สีลม (MRT)",line:"mrt_blue",idx:25},{id:"hua_lamphong",name:"หัวลำโพง",line:"mrt_blue",idx:27},{id:"bang_wa_mrt",name:"บางหว้า (MRT)",line:"mrt_blue",idx:34},{id:"lak_song",name:"หลักสอง",line:"mrt_blue",idx:38},{id:"tao_poon_p",name:"เตาปูน (สายสีม่วง)",line:"mrt_purple",idx:14},{id:"wong_sawang",name:"วงศ์สว่าง",line:"mrt_purple",idx:12},{id:"nonthaburi_cc",name:"ศูนย์ราชการนนทบุรี",line:"mrt_purple",idx:9},{id:"bang_son",name:"บางซ่อน",line:"mrt_purple",idx:13},{id:"klang_bang_phai",name:"คลองบางไผ่",line:"mrt_purple",idx:0},{id:"lat_phrao_y",name:"ลาดพร้าว (สายสีเหลือง)",line:"mrt_yellow",idx:0},{id:"chokchai4",name:"โชคชัย 4",line:"mrt_yellow",idx:2},{id:"phatthanakan",name:"พัฒนาการ",line:"mrt_yellow",idx:13},{id:"si_nut",name:"สี่แยกอ่อนนุช",line:"mrt_yellow",idx:15},{id:"on_nut_y",name:"อ่อนนุช (สายสีเหลือง)",line:"mrt_yellow",idx:16},{id:"samrong_y",name:"สำโรง (สายสีเหลือง)",line:"mrt_yellow",idx:18},{id:"phaya_thai_arl",name:"พญาไท (ARL)",line:"arl",idx:0},{id:"ratchaprarop",name:"ราชปรารภ",line:"arl",idx:1},{id:"makkasan",name:"มักกะสัน",line:"arl",idx:2},{id:"ramkhamhaeng",name:"รามคำแหง",line:"arl",idx:3},{id:"hua_mak",name:"หัวหมาก",line:"arl",idx:4},{id:"lat_krabang",name:"ลาดกระบัง",line:"arl",idx:5},{id:"suvarnabhumi",name:"สุวรรณภูมิ",line:"arl",idx:6}],ot={};G.forEach(r=>{ot[r.id]=r});function st(r,t,e,i="adult"){const a=nt[r];if(!a)return{fare:0,stationsCount:0,duration:0};const n=Math.abs(t-e);if(n===0)return{fare:0,stationsCount:0,duration:0};const o=Math.min(a.fareBase+n*a.farePerSt,a.fareMax);return{fare:Math.round(o*(a.pax[i]||1)),stationsCount:n,duration:Math.round(n*a.timePerSt)}}function rt(r){const t=new Date,e=t.getHours(),i=t.getMinutes(),a=e*60+i,n={bts_green:{first:5*60+30,last:24*60+0,peakFreq:3,offFreq:7},bts_silom:{first:5*60+30,last:24*60+0,peakFreq:3,offFreq:7},mrt_blue:{first:5*60+30,last:24*60+0,peakFreq:4,offFreq:8},mrt_purple:{first:5*60+30,last:23*60+59,peakFreq:5,offFreq:10},mrt_yellow:{first:5*60+30,last:23*60+30,peakFreq:4,offFreq:8},arl:{first:6*60+0,last:24*60+0,peakFreq:10,offFreq:15}},o=n[r]||n.bts_green,s=e>=7&&e<9||e>=17&&e<20,l=s?o.peakFreq:o.offFreq;let c=a;if(a<o.first)c=o.first;else if(a>=o.last)c=o.first+24*60;else{const g=(a-o.first)%l;c=a+(g===0?0:l-g)}const d=c-a,p=g=>{const v=Math.floor(g%1440/60),h=g%60;return`${String(v).padStart(2,"0")}:${String(h).padStart(2,"0")} น.`};return{firstTrain:p(o.first),lastTrain:p(o.last),frequencyPeak:`${o.peakFreq}-${o.peakFreq+1} นาที/ขบวน`,frequencyOffPeak:`${o.offFreq}-${o.offFreq+1} นาที/ขบวน`,nextTrain:p(c),waitMinutes:d,isPeak:s,currentFreq:l}}const R=(()=>{const r={};return G.forEach(t=>{(r[t.line]=r[t.line]||[]).push({name:t.name,index:t.idx})}),Object.values(r).forEach(t=>t.sort((e,i)=>e.index-i.index)),r})();function lt(r,t,e){const i=[{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่จตุจักร/หมอชิต",kw:["หมอชิต","จตุจักร"]},{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่สุขุมวิท/อโศก",kw:["อโศก","สุขุมวิท"]},{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่สีลม/ศาลาแดง",kw:["ศาลาแดง","สีลม"]},{text:"เชื่อมต่อ Airport Rail Link ที่พญาไท",kw:["พญาไท"]},{text:"เชื่อมต่อ MRT สีม่วง ที่เตาปูน",kw:["เตาปูน"]},{text:"เชื่อมต่อ MRT สีเหลือง ที่ลาดพร้าว",kw:["ลาดพร้าว"]},{text:"เชื่อมต่อ MRT สีเหลือง/BTS ที่สำโรง",kw:["สำโรง"]}];for(const a of i)if(a.kw.some(n=>t.includes(n)||e.includes(n)))return`💡 ${a.text}`;return null}function N(){try{return JSON.parse(localStorage.getItem("commuter_fav_routes")||"[]")}catch{return[]}}function dt(r,t,e,i,a,n,o){const s=N();return s.push({id:Date.now(),name:r,start:{lat:t,lng:e,name:n},end:{lat:i,lng:a,name:o}}),localStorage.setItem("commuter_fav_routes",JSON.stringify(s)),s}function ct(r){const t=N().filter(e=>e.id!==r);return localStorage.setItem("commuter_fav_routes",JSON.stringify(t)),t}function mt(r,t,e,i){const n=$(e-r),o=$(i-t),s=Math.sin(n/2)*Math.sin(n/2)+Math.cos($(r))*Math.cos($(e))*Math.sin(o/2)*Math.sin(o/2);return 6371*(2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s)))}function $(r){return r*(Math.PI/180)}const S={bts_sukhumvit:{name:"BTS สายสุขุมวิท",shortName:"BTS Sukhumvit",color:"#22c55e",textColor:"#fff",avgSpeedKmh:35,type:"elevated",stations:[{id:"N24",name:"Khu Khot",nameTH:"คูคต",lat:13.9518,lon:100.6086},{id:"N23",name:"Lam Luk Ka Khlong 1",nameTH:"ลำลูกกา คลอง 1",lat:13.9358,lon:100.6098},{id:"N22",name:"Pho Kaeo",nameTH:"โพธิ์แก้ว",lat:13.9202,lon:100.606},{id:"N21",name:"Saphan Mai",nameTH:"สะพานใหม่",lat:13.905,lon:100.5987},{id:"N20",name:"Wat Phra Si Mahathat",nameTH:"วัดพระศรีมหาธาตุ",lat:13.8954,lon:100.5969},{id:"N19",name:"Krom Luang Chumphon",nameTH:"กรมทหารราบที่ 11",lat:13.8824,lon:100.5938},{id:"N18",name:"Kasetsart University",nameTH:"ม.เกษตรศาสตร์",lat:13.8716,lon:100.5934},{id:"N17",name:"Ha Yaek Lat Phrao",nameTH:"ห้าแยกลาดพร้าว",lat:13.8199,lon:100.5629},{id:"N16",name:"Phahon Yothin 59",nameTH:"พหลโยธิน 59",lat:13.8135,lon:100.5576},{id:"N15",name:"Talat Yot Charoen",nameTH:"ตลาดยิ่งเจริญ",lat:13.8059,lon:100.5538},{id:"N14",name:"Mit Samphan",nameTH:"มิตรสัมพันธ์",lat:13.7987,lon:100.5503},{id:"N13",name:"Saphan Khwai",nameTH:"สะพานควาย",lat:13.7921,lon:100.5476},{id:"N12",name:"Ari",nameTH:"อารีย์",lat:13.7843,lon:100.544},{id:"N11",name:"Sanam Pao",nameTH:"สนามเป้า",lat:13.7762,lon:100.5406},{id:"N10",name:"Victory Monument",nameTH:"อนุสาวรีย์ชัยสมรภูมิ",lat:13.7636,lon:100.5365},{id:"CEN",name:"Siam",nameTH:"สยาม",lat:13.7457,lon:100.5331,isInterchange:!0},{id:"E1",name:"Chit Lom",nameTH:"ชิดลม",lat:13.744,lon:100.5408},{id:"E2",name:"Phloenchit",nameTH:"เพลินจิต",lat:13.7426,lon:100.5465},{id:"E3",name:"Nana",nameTH:"นานา",lat:13.7411,lon:100.556},{id:"E4",name:"Asok",nameTH:"อโศก",lat:13.737,lon:100.5608,isInterchange:!0},{id:"E5",name:"Phrom Phong",nameTH:"พร้อมพงษ์",lat:13.7307,lon:100.5678},{id:"E6",name:"Thong Lo",nameTH:"ทองหล่อ",lat:13.7295,lon:100.5786},{id:"E7",name:"Ekkamai",nameTH:"เอกมัย",lat:13.7193,lon:100.5853},{id:"E8",name:"Phra Khanong",nameTH:"พระโขนง",lat:13.7098,lon:100.5998},{id:"E9",name:"On Nut",nameTH:"อ่อนนุช",lat:13.7012,lon:100.6094},{id:"E10",name:"Bang Chak",nameTH:"บางจาก",lat:13.6913,lon:100.6178},{id:"E11",name:"Punnawithi",nameTH:"ปุณณวิถี",lat:13.6849,lon:100.6264},{id:"E12",name:"Udom Suk",nameTH:"อุดมสุข",lat:13.6825,lon:100.6385},{id:"E13",name:"Bang Na",nameTH:"บางนา",lat:13.6802,lon:100.652},{id:"E14",name:"Bearing",nameTH:"แบริ่ง",lat:13.6701,lon:100.6678},{id:"E15",name:"Samrong",nameTH:"สำโรง",lat:13.6594,lon:100.6832},{id:"E16",name:"Pu Chao",nameTH:"ปู่เจ้า",lat:13.6506,lon:100.6919},{id:"E17",name:"Chang Erawan",nameTH:"ช้างเอราวัณ",lat:13.6421,lon:100.7024},{id:"E18",name:"Royal Thai Naval Academy",nameTH:"โรงเรียนนายเรือ",lat:13.635,lon:100.711},{id:"E19",name:"Pak Nam",nameTH:"ปากน้ำ",lat:13.6277,lon:100.7184},{id:"E20",name:"Srinagarindra",nameTH:"ศรีนครินทร์",lat:13.6256,lon:100.7296},{id:"E21",name:"Phraek Sa",nameTH:"แพรกษา",lat:13.6201,lon:100.743},{id:"E22",name:"Sai Luat",nameTH:"สายลวด",lat:13.6183,lon:100.7557},{id:"E23",name:"Kheha Samut Prakan",nameTH:"เคหะสมุทรปราการ",lat:13.6136,lon:100.7652}]},bts_silom:{name:"BTS สายสีลม",shortName:"BTS Silom",color:"#16a34a",textColor:"#fff",avgSpeedKmh:33,type:"elevated",stations:[{id:"W4",name:"Bang Wa",nameTH:"บางหว้า",lat:13.7225,lon:100.4753},{id:"W3",name:"Phetkasem 48",nameTH:"เพชรเกษม 48",lat:13.7239,lon:100.4862},{id:"W2",name:"Phasi Charoen",nameTH:"ภาษีเจริญ",lat:13.7186,lon:100.4993},{id:"W1",name:"Wutthakat",nameTH:"วุฒากาศ",lat:13.7095,lon:100.5053},{id:"CEN",name:"Siam",nameTH:"สยาม",lat:13.7457,lon:100.5331,isInterchange:!0},{id:"S1",name:"Ratchadamri",nameTH:"ราชดำริ",lat:13.7405,lon:100.5283},{id:"S2",name:"Sala Daeng",nameTH:"ศาลาแดง",lat:13.727,lon:100.5293,isInterchange:!0},{id:"S3",name:"Chong Nonsi",nameTH:"ช่องนนทรี",lat:13.7198,lon:100.5249},{id:"S4",name:"Saint Louis",nameTH:"เซนต์หลุยส์",lat:13.7148,lon:100.5198},{id:"S5",name:"Surasak",nameTH:"สุรศักดิ์",lat:13.7118,lon:100.5134},{id:"S6",name:"Saphan Taksin",nameTH:"สะพานตากสิน",lat:13.7186,lon:100.5078},{id:"S7",name:"Krung Thon Buri",nameTH:"กรุงธนบุรี",lat:13.7225,lon:100.5013},{id:"S8",name:"Wongwian Yai",nameTH:"วงเวียนใหญ่",lat:13.7225,lon:100.4897},{id:"S9",name:"Pho Nimit",nameTH:"โพธิ์นิมิตร",lat:13.7204,lon:100.4811},{id:"S10",name:"Talat Phlu",nameTH:"ตลาดพลู",lat:13.7178,lon:100.4761}]},mrt_blue:{name:"MRT สายสีน้ำเงิน",shortName:"MRT Blue",color:"#3b82f6",textColor:"#fff",avgSpeedKmh:32,type:"underground",stations:[{id:"BL01",name:"Tha Phra",nameTH:"ท่าพระ",lat:13.7225,lon:100.4786},{id:"BL02",name:"Bang Phai",nameTH:"บางไผ่",lat:13.7295,lon:100.4694},{id:"BL03",name:"Bang Wa",nameTH:"บางหว้า",lat:13.7225,lon:100.4754,isInterchange:!0},{id:"BL04",name:"Phetkasem 48",nameTH:"เพชรเกษม 48",lat:13.7187,lon:100.4838},{id:"BL05",name:"Phasi Charoen",nameTH:"ภาษีเจริญ",lat:13.713,lon:100.4928},{id:"BL06",name:"Bang Khae",nameTH:"บางแค",lat:13.6987,lon:100.4986},{id:"BL07",name:"Lak Song",nameTH:"หลักสอง",lat:13.685,lon:100.5012},{id:"BL08",name:"Lat Phrao",nameTH:"ลาดพร้าว",lat:13.8191,lon:100.5662,isInterchange:!0},{id:"BL09",name:"Ratchadaphisek",nameTH:"รัชดาภิเษก",lat:13.8065,lon:100.5657},{id:"BL10",name:"Huai Khwang",nameTH:"ห้วยขวาง",lat:13.7873,lon:100.5724},{id:"BL11",name:"Cultural Centre",nameTH:"ศูนย์วัฒนธรรม",lat:13.7756,lon:100.5698},{id:"BL12",name:"Phetchaburi",nameTH:"เพชรบุรี",lat:13.7512,lon:100.5636},{id:"BL13",name:"Sukhumvit",nameTH:"สุขุมวิท",lat:13.737,lon:100.5608,isInterchange:!0},{id:"BL14",name:"Queen Sirikit",nameTH:"ศูนย์ฯ สิริกิติ์",lat:13.7219,lon:100.562},{id:"BL15",name:"Khlong Toei",nameTH:"คลองเตย",lat:13.7224,lon:100.557},{id:"BL16",name:"Lumphini",nameTH:"ลุมพินี",lat:13.7262,lon:100.5408},{id:"BL17",name:"Silom",nameTH:"สีลม",lat:13.7254,lon:100.528,isInterchange:!0},{id:"BL18",name:"Sam Yan",nameTH:"สามย่าน",lat:13.7318,lon:100.5294},{id:"BL19",name:"Hua Lamphong",nameTH:"หัวลำโพง",lat:13.738,lon:100.5151},{id:"BL20",name:"Wat Mangkon",nameTH:"วัดมังกร",lat:13.7413,lon:100.5083},{id:"BL21",name:"Sam Yot",nameTH:"สามยอด",lat:13.7463,lon:100.5025},{id:"BL22",name:"Sanam Chai",nameTH:"สนามไชย",lat:13.7448,lon:100.4963},{id:"BL23",name:"Itsaraphap",nameTH:"อิสรภาพ",lat:13.7356,lon:100.4851}]},mrt_yellow:{name:"MRT สายสีเหลือง",shortName:"MRT Yellow",color:"#eab308",textColor:"#000",avgSpeedKmh:36,type:"elevated",stations:[{id:"YL01",name:"Lat Phrao",nameTH:"ลาดพร้าว",lat:13.8191,lon:100.5662,isInterchange:!0},{id:"YL02",name:"Phawana",nameTH:"ภาวนา",lat:13.8084,lon:100.5795},{id:"YL03",name:"Chokchai 4",nameTH:"โชคชัย 4",lat:13.7974,lon:100.5901},{id:"YL04",name:"Lat Phrao 71",nameTH:"ลาดพร้าว 71",lat:13.7885,lon:100.5964},{id:"YL05",name:"Lat Phrao 83",nameTH:"ลาดพร้าว 83",lat:13.7841,lon:100.6012},{id:"YL06",name:"Mahadthai",nameTH:"มหาดไทย",lat:13.7769,lon:100.6083},{id:"YL07",name:"Lat Phrao 101",nameTH:"ลาดพร้าว 101",lat:13.7695,lon:100.6152},{id:"YL08",name:"Bang Kapi",nameTH:"บางกะปิ",lat:13.762,lon:100.6218},{id:"YL09",name:"Yaek Lam Sali",nameTH:"แยกลำสาลี",lat:13.7548,lon:100.6272},{id:"YL10",name:"Si Kritha",nameTH:"ศรีกรีฑา",lat:13.7451,lon:100.6401},{id:"YL11",name:"Hua Mak",nameTH:"หัวหมาก",lat:13.738,lon:100.6488,isInterchange:!0},{id:"YL12",name:"Lam Sali",nameTH:"ลำสaลี",lat:13.7286,lon:100.6543},{id:"YL13",name:"Si Nut",nameTH:"ศรีนุช",lat:13.7203,lon:100.6618},{id:"YL14",name:"Chaloem Phrakiat R.9",nameTH:"เฉลิมพระเกียรติ ร.9",lat:13.7095,lon:100.6721},{id:"YL15",name:"Suan Luang R.9",nameTH:"สวนหลวง ร.9",lat:13.7001,lon:100.6812},{id:"YL16",name:"Phatthana Kan",nameTH:"พัฒนาการ",lat:13.6928,lon:100.6892},{id:"YL17",name:"Srinagarindra 38",nameTH:"ศรีนครินทร์ 38",lat:13.6852,lon:100.6977},{id:"YL18",name:"Srinagarindra",nameTH:"ศรีนครินทร์",lat:13.6782,lon:100.7052},{id:"YL19",name:"Si Dan",nameTH:"ศรีด่าน",lat:13.6708,lon:100.7138},{id:"YL20",name:"Bearing",nameTH:"แบริ่ง",lat:13.6658,lon:100.7205,isInterchange:!0},{id:"YL21",name:"Samrong",nameTH:"สำโรง",lat:13.6579,lon:100.7287,isInterchange:!0},{id:"YL22",name:"Thiphawan",nameTH:"ทิพวัล",lat:13.6471,lon:100.7404},{id:"YL23",name:"Si Iam",nameTH:"ศรีเอี่ยม",lat:13.6391,lon:100.7491},{id:"YL24",name:"Thepharak",nameTH:"เทพารักษ์",lat:13.6289,lon:100.7578},{id:"YL25",name:"Samrong South",nameTH:"สำโรง (ใต้)",lat:13.6211,lon:100.7651}]},arl:{name:"Airport Rail Link",shortName:"ARL",color:"#e11d48",textColor:"#fff",avgSpeedKmh:90,type:"elevated",stations:[{id:"A1",name:"Phaya Thai",nameTH:"พญาไท",lat:13.7646,lon:100.534,isInterchange:!0},{id:"A2",name:"Ratchaprarop",nameTH:"ราชปรารภ",lat:13.76,lon:100.5481},{id:"A3",name:"Makkasan",nameTH:"มักกะสัน",lat:13.7539,lon:100.5614},{id:"A4",name:"Ramkhamhaeng",nameTH:"รามคำแหง",lat:13.7511,lon:100.6017},{id:"A5",name:"Hua Mak",nameTH:"หัวหมาก",lat:13.7417,lon:100.6397},{id:"A6",name:"Ban Thap Chang",nameTH:"บ้านทับช้าง",lat:13.7322,lon:100.6786},{id:"A7",name:"Lat Krabang",nameTH:"ลาดกระบัง",lat:13.7258,lon:100.715},{id:"A8",name:"Suvarnabhumi",nameTH:"สุวรรณภูมิ",lat:13.6921,lon:100.7467}]}};function O(r,t,e,i){const n=(e-r)*Math.PI/180,o=(i-t)*Math.PI/180,s=Math.sin(n/2)**2+Math.cos(r*Math.PI/180)*Math.cos(e*Math.PI/180)*Math.sin(o/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s))}class ut{constructor(t=3){this.lat=null,this.lon=null,this.variance=-1,this._lastTs=null,this._Q=t}process(t,e,i,a){if(i<1&&(i=1),this.variance<0)this.lat=t,this.lon=e,this.variance=i*i,this._lastTs=a;else{const o=(a&&this._lastTs?Math.max((a-this._lastTs)/1e3,0):1)*this._Q*this._Q;this.variance+=o;const s=this.variance/(this.variance+i*i);this.lat+=s*(t-this.lat),this.lon+=s*(e-this.lon),this.variance*=1-s,this._lastTs=a}return{lat:this.lat,lon:this.lon}}reset(){this.lat=null,this.lon=null,this.variance=-1,this._lastTs=null}}function pt(r){if(r.length<2)return 0;const t=r.slice(-5);let e=0,i=0;for(let a=1;a<t.length;a++)e+=O(t[a-1].lat,t[a-1].lon,t[a].lat,t[a].lon),i+=(t[a].ts-t[a-1].ts)/1e3;return i<=0?0:e/i*3.6}function ht(r,t){const e=pt(r),i=e>=8&&e<=110,a=e>=2&&e<8,n=e<2;let o="unknown";n?o="stationary":a?o="walking":i?o="on_train":e>110&&(o="vehicle_other");let s=0;if(t&&t.length>0){const l=t.slice(-10),c=gt(l.map(d=>Math.sqrt(d.x**2+d.y**2+d.z**2)));c>.5&&c<8&&(s=.8)}return{speedKmh:Math.round(e*10)/10,isOnTrain:i,isWalking:a,isStationary:n,activity:o,accelConfidence:s}}function gt(r){if(!r.length)return 0;const t=r.reduce((e,i)=>e+i,0)/r.length;return r.reduce((e,i)=>e+(i-t)**2,0)/r.length}function vt(r,t,e){const i=S[e];if(!i)return null;let a=null,n=1/0;return i.stations.forEach((o,s)=>{const l=O(r,t,o.lat,o.lon);l<n&&(n=l,a={...o,lineKey:e,idx:s,distance:l})}),a}function yt(r,t,e=500){let i=null,a=1/0;return Object.keys(S).forEach(n=>{const o=vt(r,t,n);o&&o.distance<a&&o.distance<e&&(a=o.distance,i=o)}),i}function ft(r,t,e){if(!r||!t||r.id===t.id)return null;const i=S[e];if(!i)return null;const a=i.stations.findIndex(o=>o.id===r.id),n=i.stations.findIndex(o=>o.id===t.id);return a<0||n<0?null:n>a?"forward":"backward"}function xt(r,t,e,i){const a=S[e];if(!a||r===t)return{stationsRemaining:0,distanceKm:0,etaMinutes:0};const n=a.stations,o=t>r?1:-1;let s=0;const l=Math.abs(t-r);for(let v=r;v!==t;v+=o){const h=n[v],m=n[v+o];if(!h||!m)break;s+=O(h.lat,h.lon,m.lat,m.lon)/1e3}const c=i>=15&&i<=110?i:a.avgSpeedKmh,d=s/c*60,p=(l-1)*.5,g=Math.max(1,Math.round(d+p));return{stationsRemaining:l,distanceKm:Math.round(s*10)/10,etaMinutes:g}}class bt{constructor(t){this.onUpdate=t,this.watchId=null,this._pollInterval=null,this._accelInterval=null,this.kalman=new ut(3),this.positions=[],this.accelerometerData=[],this.currentStation=null,this.prevStation=null,this.lineKey=null,this.direction=null,this.routeLocked=!1,this.stationHistory=[],this.destStationIdx=null,this.destLineKey=null,this.isTracking=!1,this.lastKnownState=null,this.GEOFENCE_RADIUS_M=200,this._alertedStationsLeft=new Set,this._motionState=null,this._undergroundMode=!1,this._lastGoodGPS=null}setDestination(t,e){this.destLineKey=t,this.destStationIdx=parseInt(e),this._alertedStationsLeft.clear(),this._emitCurrent()}start(){if(!this.isTracking){if(!navigator.geolocation){this._emitError("GPS ไม่รองรับบนอุปกรณ์นี้");return}this.isTracking=!0,this.kalman.reset(),this.positions=[],this.stationHistory=[],this.routeLocked=!1,this.direction=null,this.currentStation=null,this.prevStation=null,this._alertedStationsLeft.clear(),this._undergroundMode=!1,"Notification"in window&&Notification.permission==="default"&&Notification.requestPermission(),this.watchId=navigator.geolocation.watchPosition(t=>this._onGPS(t),t=>this._handleGPSError(t),{enableHighAccuracy:!0,timeout:15e3,maximumAge:2e3}),this._pollInterval=setInterval(()=>{navigator.geolocation.getCurrentPosition(t=>this._onGPS(t),()=>{},{enableHighAccuracy:!0,timeout:6e3,maximumAge:3e3})},3e3),this._startAccelerometer()}}stop(){this.watchId!==null&&(navigator.geolocation.clearWatch(this.watchId),this.watchId=null),this._pollInterval&&(clearInterval(this._pollInterval),this._pollInterval=null),this._accelInterval&&(clearInterval(this._accelInterval),this._accelInterval=null),window.removeEventListener("devicemotion",this._onDeviceMotion),this.isTracking=!1}_startAccelerometer(){"DeviceMotionEvent"in window&&(this._onDeviceMotion=t=>{const e=t.accelerationIncludingGravity;e&&(this.accelerometerData.push({x:e.x||0,y:e.y||0,z:e.z||0,ts:Date.now()}),this.accelerometerData.length>20&&this.accelerometerData.shift())},window.addEventListener("devicemotion",this._onDeviceMotion,{passive:!0}))}_onGPS(t){const e={lat:t.coords.latitude,lon:t.coords.longitude,acc:t.coords.accuracy,ts:t.timestamp||Date.now()};if(!(e.acc>80))this._lastGoodGPS=e,this._undergroundMode=!1;else if(this._undergroundMode=!0,this._lastGoodGPS){this._emitWithExtra({warning:`GPS อ่อน ±${Math.round(e.acc)}m (ใต้ดิน/อาคาร)`,gpsAccuracy:e.acc});return}const a=this.kalman.process(e.lat,e.lon,e.acc,e.ts),n={lat:a.lat,lon:a.lon,acc:e.acc,ts:e.ts};this.positions.push(n),this.positions.length>20&&this.positions.shift(),this._processPosition(n,e.acc)}_processPosition(t,e){const i=yt(t.lat,t.lon,400),a=ht(this.positions,this.accelerometerData);if(this._motionState=a,i&&i.distance<this.GEOFENCE_RADIUS_M&&(!this.currentStation||this.currentStation.id!==i.id)){if(this.prevStation=this.currentStation,this.currentStation=i,this.stationHistory.push({...i,arrivedAt:Date.now()}),this.stationHistory.length>10&&this.stationHistory.shift(),this.stationHistory.length>=2){const o=this.stationHistory,s=o[o.length-2],l=o[o.length-1];s.lineKey===l.lineKey&&(this.lineKey=l.lineKey,this.direction=ft(s,l,this.lineKey),!this.routeLocked&&o.filter(c=>c.lineKey===this.lineKey).length>=3&&(this.routeLocked=!0))}this._checkArrivalAlert()}this._emitFull({motion:a,nearest:i,accuracy:e,warning:null})}_checkArrivalAlert(){if(this.destStationIdx===null||!this.destLineKey||!this.currentStation||this.currentStation.lineKey!==this.destLineKey)return;const t=Math.abs(this.currentStation.idx-this.destStationIdx);t===1&&!this._alertedStationsLeft.has(1)?(this._alertedStationsLeft.add(1),this._triggerAlert("warning")):t===0&&!this._alertedStationsLeft.has(0)&&(this._alertedStationsLeft.add(0),this._triggerAlert("arrived"))}_triggerAlert(t){var a;const e=S[this.destLineKey],i=((a=e==null?void 0:e.stations[this.destStationIdx])==null?void 0:a.nameTH)||"ปลายทาง";if(navigator.vibrate&&(t==="warning"?navigator.vibrate([300,100,300,100,600]):navigator.vibrate([500,150,500,150,1e3])),Notification.permission==="granted"){const n=t==="warning"?"🚉 ใกล้ถึงปลายทางแล้ว!":"🎉 ถึงปลายทาง!",o=t==="warning"?`อีก 1 สถานีถึง ${i} — เตรียมตัวลงได้เลย`:`คุณถึง ${i} แล้ว`;try{new Notification(n,{body:o,icon:"/favicon.ico",badge:"/favicon.ico",tag:"train-alert-"+t,requireInteraction:t==="arrived"})}catch{}}window.dispatchEvent(new CustomEvent(t==="warning"?"trainArrivalWarning":"trainArrived",{detail:{destName:i,destLineKey:this.destLineKey,destStationIdx:this.destStationIdx}}))}_emitFull(t={}){var l,c,d,p,g;const e=this.lineKey?S[this.lineKey]:null,i=(e==null?void 0:e.stations)||[],a=((l=this.currentStation)==null?void 0:l.idx)??-1;let n=null;if(this.direction&&a>=0){const v=this.direction==="forward"?a+1:a-1;n=i[v]||null}let o=null;this.destStationIdx!==null&&a>=0&&this.destLineKey&&(o=xt(a,this.destStationIdx,this.destLineKey,((c=t.motion)==null?void 0:c.speedKmh)||0));const s={isTracking:this.isTracking,currentStation:this.currentStation,nextStation:n,prevStation:this.prevStation,lineKey:this.lineKey,lineName:(e==null?void 0:e.name)||null,lineColor:(e==null?void 0:e.color)||null,lineType:(e==null?void 0:e.type)||null,direction:this.direction,routeLocked:this.routeLocked,destStationIdx:this.destStationIdx,destLineKey:this.destLineKey,eta:o,speedKmh:((d=t.motion)==null?void 0:d.speedKmh)||0,activity:((p=t.motion)==null?void 0:p.activity)||"unknown",isOnTrain:((g=t.motion)==null?void 0:g.isOnTrain)||!1,nearestStation:t.nearest||null,gpsAccuracy:t.accuracy||null,undergroundMode:this._undergroundMode,warning:t.warning||null,stationHistory:[...this.stationHistory]};this.lastKnownState=s,typeof this.onUpdate=="function"&&this.onUpdate(s)}_emitWithExtra(t){if(this.lastKnownState){const e={...this.lastKnownState,...t};typeof this.onUpdate=="function"&&this.onUpdate(e)}}_emitCurrent(){this.lastKnownState&&this._emitFull({motion:{speedKmh:this.lastKnownState.speedKmh,activity:this.lastKnownState.activity,isOnTrain:this.lastKnownState.isOnTrain}})}_emitError(t){typeof this.onUpdate=="function"&&this.onUpdate({isTracking:!1,error:t})}_handleGPSError(t){const i={1:"ไม่ได้รับอนุญาต GPS — กรุณาเปิดสิทธิ์ Location ใน Browser",2:"หา GPS ไม่ได้ (สัญญาณอ่อน/ใต้ดิน)",3:"GPS หมดเวลา — กำลังลองใหม่..."}[t.code]||"GPS Error";t.code!==3?this._emitError(i):this._emitWithExtra({warning:i})}}class Tt{constructor(t,e){this.container=document.getElementById(t),this.state=e,this.tracker=null,this.trackerState=null,this.alertShown=!1,this.selectedLine="bts_sukhumvit",this.selectedDestIdx=null}init(){this.container&&(this._renderUI(),this._setupEvents(),window.addEventListener("trainArrivalWarning",t=>this._showArrivalPopup(t.detail)),window.addEventListener("trainArrived",t=>this._showArrivedPopup(t.detail)))}_renderUI(){this.container.innerHTML=`
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
    `,lucide.createIcons(),this._populateDestinations()}_populateDestinations(){const t=document.getElementById("ttDestSelect");if(!t)return;const e=S[this.selectedLine];e&&(t.innerHTML=e.stations.map((i,a)=>`<option value="${a}">${i.nameTH||i.name}</option>`).join(""),t.selectedIndex=e.stations.length-1,this.selectedDestIdx=e.stations.length-1)}_setupEvents(){var t,e,i,a;(t=document.getElementById("ttLineSelect"))==null||t.addEventListener("change",n=>{if(this.selectedLine=n.target.value,this._populateDestinations(),this.tracker){const o=document.getElementById("ttDestSelect");this.tracker.setDestination(this.selectedLine,parseInt((o==null?void 0:o.value)||0))}}),(e=document.getElementById("ttDestSelect"))==null||e.addEventListener("change",n=>{this.selectedDestIdx=parseInt(n.target.value),this.tracker&&this.tracker.setDestination(this.selectedLine,this.selectedDestIdx)}),(i=document.getElementById("ttStartBtn"))==null||i.addEventListener("click",()=>{!this.tracker||!this.tracker.isTracking?this._startTracking():this._stopTracking()}),(a=document.getElementById("ttAlertDismiss"))==null||a.addEventListener("click",()=>{const n=document.getElementById("ttAlertPopup");n&&(n.style.display="none")})}_startTracking(){const t=document.getElementById("ttStartBtn"),e=document.getElementById("ttDestSelect");this.selectedDestIdx=parseInt((e==null?void 0:e.value)||0),"Notification"in window&&Notification.permission==="default"&&Notification.requestPermission(),this.tracker=new bt(i=>this._onTrackerUpdate(i)),this.tracker.setDestination(this.selectedLine,this.selectedDestIdx),this.tracker.start(),t&&(t.innerHTML='<i data-lucide="stop-circle" style="width:14px;height:14px;"></i><span>หยุดติดตาม</span>',t.style.background="rgba(239,68,68,0.15)",t.style.borderColor="rgba(239,68,68,0.3)",lucide.createIcons()),document.getElementById("ttIdleState").style.display="none",document.getElementById("ttStatusPanel").style.display="block",this._setGpsSignal("searching","กำลังหา GPS...")}_stopTracking(){this.tracker&&(this.tracker.stop(),this.tracker=null);const t=document.getElementById("ttStartBtn");t&&(t.innerHTML='<i data-lucide="navigation" style="width:14px;height:14px;"></i><span>เริ่มติดตาม</span>',t.style.background="",t.style.borderColor="",lucide.createIcons()),document.getElementById("ttStatusPanel").style.display="none",document.getElementById("ttIdleState").style.display="block",this._setGpsSignal("off","GPS ปิด")}_onTrackerUpdate(t){var s;if(this.trackerState=t,t.error){this._setGpsSignal("weak",t.error),document.getElementById("ttWarning").textContent=t.error,document.getElementById("ttWarning").style.display="block";return}const e=t.gpsAccuracy;e===null?this._setGpsSignal("searching","กำลังหา GPS..."):e>50?this._setGpsSignal("weak",`GPS ±${Math.round(e)}m (อ่อน)`):this._setGpsSignal("good",`GPS ±${Math.round(e)}m`);const i=t.currentStation;document.getElementById("ttCurrentStation").textContent=i?i.nameTH||i.name:t.nearestStation?`ใกล้ ${t.nearestStation.nameTH||t.nearestStation.name}`:"กำลังตรวจหาสถานี...",document.getElementById("ttCurrentLine").textContent=t.lineName||(t.nearestStation?(s=S[t.nearestStation.lineKey])==null?void 0:s.name:"")||"";const a=t.nextStation;document.getElementById("ttNextStation").textContent=a?a.nameTH||a.name:"--",document.getElementById("ttDirectionLabel").textContent=t.direction==="forward"?"→ ทิศทางปลายสาย":t.direction==="backward"?"← ทิศทางต้นสาย":"ยังไม่ทราบทิศทาง";const n=t.destLineKey?S[t.destLineKey]:null,o=n&&t.destStationIdx!==null?n.stations[t.destStationIdx]:null;document.getElementById("ttDestName").textContent=o?o.nameTH||o.name:"--",t.eta?(document.getElementById("ttStationsLeft").textContent=`เหลืออีก ${t.eta.stationsRemaining} สถานี · ${t.eta.distanceKm} กม.`,document.getElementById("ttETA").textContent=`${t.eta.etaMinutes} นาที`):(document.getElementById("ttStationsLeft").textContent="",document.getElementById("ttETA").textContent="--"),document.getElementById("ttSpeedLabel").textContent=t.speedKmh>0?`ความเร็ว ${t.speedKmh} กม./ชม.`:"",document.getElementById("ttOnTrainBadge").textContent=t.isOnTrain?"🚆 อยู่บนรถไฟ":"🚶 ยังไม่พบรถไฟ",document.getElementById("ttOnTrainBadge").className=`tt-badge ${t.isOnTrain?"green":"gray"}`,document.getElementById("ttRouteLock").textContent=t.routeLocked?"🔒 Route ล็อกแล้ว":"Route: ยังไม่ล็อก",document.getElementById("ttRouteLock").className=`tt-badge ${t.routeLocked?"cyan":"gray"}`,document.getElementById("ttGpsAccBadge").textContent=e!==null?`GPS ±${Math.round(e)}m`:"GPS --",document.getElementById("ttGpsAccBadge").className=`tt-badge ${e===null?"gray":e>50?"yellow":"green"}`,t.warning?(document.getElementById("ttWarning").textContent="⚠ "+t.warning,document.getElementById("ttWarning").style.display="block"):document.getElementById("ttWarning").style.display="none",this._renderMapStrip(t)}_renderMapStrip(t){var v,h;const e=document.getElementById("ttMapStrip");if(!e)return;const i=t.lineKey||((v=t.nearestStation)==null?void 0:v.lineKey)||this.selectedLine,a=S[i];if(!a)return;const n=a.stations,o=((h=t.currentStation)==null?void 0:h.idx)??-1,s=t.destStationIdx!==null&&t.destLineKey===i?t.destStationIdx:-1,l=a.color,c=7;let d=Math.max(0,o-3),p=Math.min(n.length-1,d+c-1);p-d<c-1&&(d=Math.max(0,p-c+1));let g='<div class="tt-strip-wrap">';for(let m=d;m<=p;m++){const u=n[m],f=m===o,x=m===s,b=o>=0&&m<o,T=f?l:x?"#f59e0b":b?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.4)",w=b?"rgba(255,255,255,0.15)":l;m>d&&(g+=`<div class="tt-strip-segment" style="background:${w};"></div>`),g+=`
        <div class="tt-strip-item">
          <div class="tt-station-dot" style="border-color:${T};background:${f?T:"transparent"};${f?"box-shadow:0 0 8px "+T+";":""}${x?"box-shadow:0 0 6px #f59e0b;":""}"></div>
          <div class="tt-strip-label" style="color:${f?l:x?"#f59e0b":"var(--muted)"};">${u.nameTH||u.name}</div>
          ${f?'<div style="font-size:0.5rem;color:var(--cyan);">▲ คุณ</div>':""}
          ${x&&!f?'<div style="font-size:0.5rem;color:#f59e0b;">🏁</div>':""}
        </div>
      `}g+="</div>",e.innerHTML=g}_showArrivalPopup(t){var i,a;const e=this.selectedDestIdx!==null&&((a=(i=S[this.selectedLine])==null?void 0:i.stations[this.selectedDestIdx])==null?void 0:a.nameTH)||"ปลายทาง";this._showPopup("🚉 ใกล้ถึงแล้ว!",`อีก 1 สถานีจะถึง
${e}
เตรียมตัวลงได้เลย`)}_showArrivedPopup(t){var i,a;const e=this.selectedDestIdx!==null&&((a=(i=S[this.selectedLine])==null?void 0:i.stations[this.selectedDestIdx])==null?void 0:a.nameTH)||"ปลายทาง";this._showPopup("🎉 ถึงแล้ว!",`คุณถึงสถานี ${e} แล้ว`),this._stopTracking()}_showPopup(t,e){const i=document.getElementById("ttAlertPopup");i&&(document.getElementById("ttAlertTitle").textContent=t,document.getElementById("ttAlertBody").textContent=e,i.style.display="flex")}_setGpsSignal(t,e){const i=document.getElementById("ttGpsSignal"),a=document.getElementById("ttGpsLabel");i&&(i.className=`tt-signal-dot ${t}`),a&&(a.textContent=e)}}class St{constructor(t,e,i){this.trafficContainer=document.getElementById(t),this.transitContainer=document.getElementById(e),this.state=i,this.map=null,this.tileLayer=null,this.routePolyline=null,this.startMarker=null,this.endMarker=null,this.routePoints={start:null,end:null},this.cctvIntervals=[],this.trainTrackerWidget=null}async init(){this.trafficContainer&&(this.renderTrafficTab(),this.initMap(),this.initCCTVs(),this.setupTrafficEvents()),this.renderTransitTab(),this.setupTransitEvents(),document.addEventListener("theme-changed",()=>this.updateMapTheme())}renderTrafficTab(){this.trafficContainer.innerHTML=`
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
    `,lucide.createIcons()}initMap(){const t=this.state.getCoords();this.map=L.map("trafficMap",{zoomControl:!1}).setView([t.lat,t.lon],13),L.control.zoom({position:"bottomright"}).addTo(this.map),this.updateMapTheme(),this.map.on("click",e=>this.handleMapClick(e))}updateMapTheme(){if(!this.map)return;this.tileLayer&&this.map.removeLayer(this.tileLayer);const e=document.body.classList.contains("light-theme")?"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png":"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";this.tileLayer=L.tileLayer(e,{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'}).addTo(this.map)}handleMapClick(t){const{lat:e,lng:i}=t.latlng;this.routePoints.start?this.routePoints.end?(this.resetRouting(),this.setRouteStart(e,i,`พิกัด: ${e.toFixed(4)}, ${i.toFixed(4)}`)):(this.setRouteEnd(e,i,`พิกัด: ${e.toFixed(4)}, ${i.toFixed(4)}`),this.calculateRoute()):this.setRouteStart(e,i,`พิกัด: ${e.toFixed(4)}, ${i.toFixed(4)}`)}setRouteStart(t,e,i){this.routePoints.start={lat:t,lng:e,name:i};const a=document.getElementById("routeStartText");a.innerText=i,a.classList.remove("empty"),this.startMarker&&this.map.removeLayer(this.startMarker),this.startMarker=L.marker([t,e],{icon:L.divIcon({className:"custom-map-marker-start",html:'<div style="width:14px;height:14px;background:var(--cyan);border:2px solid white;border-radius:50%;box-shadow:0 0 10px var(--cyan);"></div>',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(this.map)}setRouteEnd(t,e,i){this.routePoints.end={lat:t,lng:e,name:i};const a=document.getElementById("routeEndText");a.innerText=i,a.classList.remove("empty"),this.endMarker&&this.map.removeLayer(this.endMarker),this.endMarker=L.marker([t,e],{icon:L.divIcon({className:"custom-map-marker-end",html:'<div style="width:14px;height:14px;background:var(--red);border:2px solid white;border-radius:50%;box-shadow:0 0 10px var(--red);"></div>',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(this.map)}async calculateRoute(){if(!this.routePoints.start||!this.routePoints.end)return;const t=this.routePoints.start,e=this.routePoints.end,i=`https://router.project-osrm.org/route/v1/driving/${t.lng},${t.lat};${e.lng},${e.lat}?overview=full&geometries=geojson`;try{const n=await(await fetch(i)).json();if(n.routes&&n.routes.length>0){const o=n.routes[0],s=o.geometry.coordinates.map(m=>[m[1],m[0]]);this.routePolyline&&this.map.removeLayer(this.routePolyline),this.routePolyline=L.polyline(s,{color:"var(--cyan)",weight:5,opacity:.85,className:"glowing-polyline"}).addTo(this.map),this.map.fitBounds(this.routePolyline.getBounds(),{padding:[40,40]});const l=(o.distance/1e3).toFixed(1),c=Math.round(o.duration/60);document.getElementById("statDistance").innerText=`${l} กม.`;const d=new Date().getHours();let p=1,g="การจราจรไหลลื่น (ราบรื่น)",v="traffic-pill-green";d>=7&&d<=9||d>=17&&d<=19?(p=1.6,g="รถติดขัดหนาแน่น (วิกฤต)",v="traffic-pill-red"):(d>=12&&d<=14||d>=16&&d<17)&&(p=1.25,g="รถหนาแน่นปานกลาง (ระลอกตัว)",v="traffic-pill-yellow"),document.getElementById("statDuration").innerText=`${Math.round(c*p)} นาที`;const h=document.getElementById("statTrafficBadge");h.innerText=g,h.className=`traffic-status-pill ${v}`,document.getElementById("routeTravelStats").style.display="block"}else throw new Error("no route")}catch{this.routePolyline&&this.map.removeLayer(this.routePolyline),this.routePolyline=L.polyline([[t.lat,t.lng],[e.lat,e.lng]],{color:"var(--cyan)",weight:4,dashArray:"5, 10",opacity:.7}).addTo(this.map);const n=mt(t.lat,t.lng,e.lat,e.lng).toFixed(1);document.getElementById("statDistance").innerText=`${n} กม. (โดยตรง)`,document.getElementById("statDuration").innerText=`${Math.round(n*2.5)} นาที`;const o=document.getElementById("statTrafficBadge");o.innerText="การจราจรไม่พร้อมแสดง (Offline Mode)",o.className="traffic-status-pill traffic-pill-yellow",document.getElementById("routeTravelStats").style.display="block"}}resetRouting(){this.routePoints.start=null,this.routePoints.end=null;const t=document.getElementById("routeStartText");t.innerText="จุดเริ่มต้น (คลิกเลือกบนแผนที่)",t.classList.add("empty");const e=document.getElementById("routeEndText");e.innerText="จุดหมายปลายทาง (คลิกเลือกบนแผนที่)",e.classList.add("empty"),this.startMarker&&this.map.removeLayer(this.startMarker),this.endMarker&&this.map.removeLayer(this.endMarker),this.routePolyline&&this.map.removeLayer(this.routePolyline),this.startMarker=null,this.endMarker=null,this.routePolyline=null,document.getElementById("routeTravelStats").style.display="none"}setupTrafficEvents(){var t,e,i;(t=document.getElementById("btnResetRoute"))==null||t.addEventListener("click",()=>this.resetRouting()),(e=document.getElementById("btnUseMyLocation"))==null||e.addEventListener("click",()=>{const a=this.state.getCoords();this.setRouteStart(a.lat,a.lon,`ตำแหน่งของฉัน (${a.name})`),this.routePoints.end&&this.calculateRoute()}),(i=document.getElementById("btnSaveFavRoute"))==null||i.addEventListener("click",()=>{const a=document.getElementById("favRouteNameInput"),n=a.value.trim()||`เส้นทาง ${new Date().toLocaleDateString("th-TH")}`,o=this.routePoints.start,s=this.routePoints.end;o&&s&&(dt(n,o.lat,o.lng,s.lat,s.lng,o.name,s.name),a.value="",this.renderSavedRoutes(),this.showToast("บันทึกสำเร็จ",`บันทึกเส้นทาง "${n}" เรียบร้อยแล้ว`))}),this.renderSavedRoutes()}renderSavedRoutes(){const t=document.getElementById("savedRoutesList");if(!t)return;const e=N();if(e.length===0){t.innerHTML='<div style="text-align:center;color:var(--muted2);font-size:0.75rem;padding:12px 0;">ไม่มีเส้นทางที่บันทึกไว้</div>';return}t.innerHTML=e.map(i=>`
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
    `).join(""),lucide.createIcons(),t.querySelectorAll(".saved-route-trigger").forEach(i=>{i.addEventListener("click",()=>{const a=parseInt(i.dataset.id),n=e.find(o=>o.id===a);n&&(this.resetRouting(),this.setRouteStart(n.start.lat,n.start.lng,n.start.name),this.setRouteEnd(n.end.lat,n.end.lng,n.end.name),this.calculateRoute(),this.showToast("โหลดเส้นทาง",`แสดงเส้นทาง: ${n.name}`))})}),t.querySelectorAll(".route-del-btn").forEach(i=>{i.addEventListener("click",a=>{a.stopPropagation(),ct(parseInt(i.dataset.id)),this.renderSavedRoutes()})})}initCCTVs(){this.cctvIntervals.forEach(clearInterval),this.cctvIntervals=[],this.trainTrackerWidget=null;const t=e=>{const i=document.getElementById(e);if(!i)return;const a=i.getContext("2d");i.width=320,i.height=180;const n=Array.from({length:6},()=>({x:Math.random()*i.width,y:40+Math.random()*100,speed:1.5+Math.random()*2.5,color:["#00f2fe","#ffd740","#ff4d4d","#ffffff","#a855f7"][Math.floor(Math.random()*5)],size:5+Math.random()*8,dir:Math.random()>.5?1:-1})),o=()=>{a.fillStyle="#111827",a.fillRect(0,0,i.width,i.height),a.strokeStyle="rgba(255,255,255,0.08)",a.lineWidth=4,a.beginPath(),a.moveTo(0,90),a.lineTo(320,90),a.moveTo(160,0),a.lineTo(160,180),a.stroke(),a.strokeStyle="rgba(255,255,255,0.15)",a.lineWidth=1,a.setLineDash([8,8]),a.beginPath(),a.moveTo(0,65),a.lineTo(320,65),a.moveTo(0,115),a.lineTo(320,115),a.stroke(),a.setLineDash([]),n.forEach(s=>{s.x+=s.speed*s.dir,s.dir===1&&s.x>i.width+10&&(s.x=-10),s.dir===-1&&s.x<-10&&(s.x=i.width+10),a.fillStyle=s.color,a.beginPath(),a.roundRect(s.x,s.y,s.size*1.6,s.size,2),a.fill(),a.fillStyle=s.dir===1?"#ff4d4d":"#ffd740";const l=s.dir===1?s.x:s.x+s.size*1.6-2;a.fillRect(l,s.y+1,2,2),a.fillRect(l,s.y+s.size-3,2,2)}),a.fillStyle="rgba(0,242,254,0.03)";for(let s=0;s<i.height;s+=3)a.fillRect(0,s,i.width,1);Math.random()>.98&&(a.fillStyle="rgba(255,255,255,0.12)",a.fillRect(0,Math.random()*i.height,i.width,4)),a.fillStyle="#ffffff",a.font="7px monospace",a.fillText(new Date().toLocaleString("en-US"),200,172),a.fillStyle="var(--cyan)",a.fillText("REC ◉",15,172)};this.cctvIntervals.push(setInterval(o,1e3/24))};t("cctvAsoke"),t("cctvRama9"),t("cctvSathorn")}renderTransitTab(){this.transitContainer.innerHTML=`
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
    `,lucide.createIcons()}setupTransitEvents(){var v;if(!this.transitContainer)return;this.trainTrackerWidget=new Tt("trainTrackerMount",this.state),this.trainTrackerWidget.init(),this.refreshTransitStatus(),(v=document.getElementById("btnRefreshTransitStatus"))==null||v.addEventListener("click",()=>{this.refreshTransitStatus(),this.showToast("อัพเดทสำเร็จ","อัพเดทสถานะรถไฟฟ้าแล้ว")});const t=document.getElementById("timeSystemSelect"),e=document.getElementById("timeStationSelect"),i=(h,m)=>{const u=document.getElementById(h);u&&(u.innerText=m)},a=(h,m)=>{const u=document.getElementById(h);u&&(u.innerHTML=m)},n=()=>{const h=t.value,m=R[h]||[];e.innerHTML=m.map(u=>`<option value="${u.name}">${u.name}</option>`).join(""),o()},o=()=>{const h=t==null?void 0:t.value;if(!h)return;const m=rt(h);i("firstTrainTime",m.firstTrain),i("lastTrainTime",m.lastTrain),i("nextTrainTime",m.nextTrain||"--:--"),i("freqPeak",m.frequencyPeak),i("freqOff",m.frequencyOffPeak),i("waitMinsText",m.waitMinutes!=null?m.waitMinutes===0?"กำลังจะถึง!":`อีก ${m.waitMinutes} นาที`:"--"),a("peakStatusText",m.isPeak?'<b style="color:var(--red);">⚡ ช่วงเร่งด่วน</b>':'<b style="color:var(--cyan);">🌙 ช่วงปกติ</b>')};t.addEventListener("change",n),e.addEventListener("change",o),n();const s=document.getElementById("fareSystemSelect"),l=document.getElementById("fareOriginSelect"),c=document.getElementById("fareDestSelect"),d=document.getElementById("farePassengerSelect"),p=()=>{const h=s.value,m=R[h]||[],u=m.map(f=>`<option value="${f.index}">${f.name}</option>`).join("");l.innerHTML=u,c.innerHTML=u,m.length>1&&(c.selectedIndex=1),g()},g=()=>{var E,C;const h=s.value,m=parseInt(l.value),u=parseInt(c.value),f=d.value;if(isNaN(m)||isNaN(u))return;const x=st(h,m,u,f);document.getElementById("fareVal").innerHTML=`${x.fare} <span>บาท</span>`,i("fareStationsCount",x.stationsCount),i("fareDuration",x.duration);const b=R[h]||[],T=((E=b.find(y=>y.index===m))==null?void 0:E.name)||"",w=((C=b.find(y=>y.index===u))==null?void 0:C.name)||"",I=lt(h,T,w),_=document.getElementById("interchangeAdvice");I?(_.innerHTML=`<i data-lucide="sparkles" style="width:14px;height:14px;flex-shrink:0;"></i> <span>${I}</span>`,_.style.display="flex",lucide.createIcons()):_.style.display="none",document.getElementById("fareResultDisplay").style.display="flex"};s.addEventListener("change",p),l.addEventListener("change",g),c.addEventListener("change",g),d.addEventListener("change",g),p()}refreshTransitStatus(){var h,m;const t=document.getElementById("transitStatusContainer");if(!t)return;const e=new Date().getHours(),i=new Date().getMinutes(),a=e===8&&i>=15&&i<=35||e===18&&i>=20&&i<=45,n=e===8&&i>=30&&i<=55||e===18&&i>=10&&i<=30,o=((m=(h=this.state)==null?void 0:h.getWeatherCode)==null?void 0:m.call(h))??null,s=[51,53,55,61,63,65,80,81,82,95,96],l=[65,81,82,95,96],c=o!==null&&s.includes(o),d=o!==null&&l.includes(o);let p="";d?p="ฝนตกหนัก — อาจเกิดความล่าช้าเพิ่มเติมทุกสาย":c&&(p="ฝนตก — ผู้โดยสารหนาแน่นกว่าปกติ");const g=[{name:"BTS สายสุขุมวิท (Green Line)",color:"#22c55e",delayed:a||d,delayNote:a?"ล่าช้า 3-5 นาที ขบวนหนาแน่นที่สยาม":"ล่าช้าเนื่องจากฝนตกหนัก"},{name:"BTS สายสีลม (Silom Line)",color:"#15803d",delayed:d,delayNote:"ล่าช้าเนื่องจากฝนตกหนัก"},{name:"MRT สายเฉลิมรัชมงคล (Blue Line)",color:"#1e3a8a",delayed:n,delayNote:"ล่าช้า 8 นาที ระบบสัญญาณขัดข้องที่ห้วยขวาง"},{name:"MRT สายฉลองรัชธรรม (Purple Line)",color:"#7e22ce",delayed:!1},{name:"MRT สายสีเหลือง (Yellow Line)",color:"#ca8a04",delayed:!1},{name:"Airport Rail Link (ARL)",color:"#e11d48",delayed:!1}],v=p?`<div style="font-size:0.72rem;color:var(--yellow);background:rgba(234,179,8,0.08);border:1px solid rgba(234,179,8,0.2);border-radius:8px;padding:8px 12px;margin-bottom:12px;">${d?"🌧 ":"🌦 "}${p}</div>`:"";t.innerHTML=v+g.map(u=>`<div class="transit-line"><div class="transit-line-info"><div class="transit-color-bar" style="background-color:${u.color};"></div><div><div class="transit-name">${u.name}</div><div class="transit-desc">${u.delayed?"⚠️ "+u.delayNote:"🟢 บริการปกติความถี่คงที่"}</div></div></div><div class="transit-status ${u.delayed?"delay":"normal"}">${u.delayed?"🟡 ล่าช้า":"🟢 ปกติ"}</div></div>`).join("")}showToast(t,e){const i=document.getElementById("toastContainer");if(!i)return;const a=document.createElement("div");a.className="toast-alert",a.innerHTML=`
      <div class="toast-icon" style="color:var(--cyan);"><i data-lucide="info" style="width:16px;height:16px;"></i></div>
      <div class="toast-content">
        <div class="toast-title" style="color:var(--cyan);">${t}</div>
        <div class="toast-msg">${e}</div>
      </div>
    `,i.appendChild(a),lucide.createIcons(),setTimeout(()=>{a.classList.add("dismissed"),setTimeout(()=>a.remove(),300)},4e3)}}class wt{constructor(t,e){this.container=document.getElementById(t),this.state=e,this.pomoMinutes=25,this.pomoSeconds=0,this.pomoDuration=25*60,this.pomoTimer=null,this.pomoRunning=!1,this.pomoMode="work",this.waterGoal=8,this.waterCount=parseInt(localStorage.getItem("commuter_water_cups"))||0,this.audioCtx=null}async init(){this.render(),this.initTodo(),this.initWater(),this.initPomodoro(),this.initBattery(),this.initMemo(),this.initCalendar()}render(){this.container.innerHTML=`
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
    `,lucide.createIcons()}initTodo(){this.todoFilter="all",this.todos=JSON.parse(localStorage.getItem("commuter_todos"))||[{id:1,text:"หยิบร่มใส่กระเป๋า",category:"travel",checked:!1},{id:2,text:"เช็คสถานะการดีเลย์ของบีทีเอส",category:"travel",checked:!1},{id:3,text:"ตรวจความเรียบร้อยรอบบ้านก่อนออกเดินทาง",category:"home",checked:!0},{id:4,text:"ส่งรายงานประชุมเช้านี้",category:"work",checked:!1}],this.renderTodoItems();const t=document.getElementById("todoInput"),e=document.getElementById("btnTodoAdd"),i=()=>{const n=t.value.trim();if(!n)return;let o="work";const s=n.toLowerCase();s.includes("ร่ม")||s.includes("bts")||s.includes("รถ")||s.includes("ถนน")||s.includes("เดินทาง")?o="travel":(s.includes("บ้าน")||s.includes("ไฟ")||s.includes("น้ำ")||s.includes("แมว")||s.includes("หมา"))&&(o="home"),this.todos.push({id:Date.now(),text:n,category:o,checked:!1}),localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),t.value="",this.renderTodoItems()};e==null||e.addEventListener("click",i),t==null||t.addEventListener("keypress",n=>{n.key==="Enter"&&i()});const a=this.container.querySelectorAll(".todo-filter-btn");a.forEach(n=>{n.addEventListener("click",()=>{a.forEach(o=>{o.classList.remove("btn-primary"),o.classList.add("btn-secondary")}),n.classList.add("btn-primary"),n.classList.remove("btn-secondary"),this.todoFilter=n.dataset.filter,this.renderTodoItems()})})}renderTodoItems(){const t=document.getElementById("todoItemsContainer");if(!t)return;const e=this.todos.filter(i=>this.todoFilter==="all"?!0:i.category===this.todoFilter);if(e.length===0){t.innerHTML='<div style="text-align: center; font-size: 0.75rem; color: var(--muted2); padding: 24px 0;">ไม่มีรายการสิ่งที่จะทำในหมวดหมู่นี้</div>';return}t.innerHTML=e.map(i=>{const a=i.category==="work"?"💻":i.category==="travel"?"🚗":"🏠";return`
        <div class="todo-item ${i.checked?"checked":""}" data-id="${i.id}">
          <div class="todo-item-left todo-check-trigger">
            <div class="todo-checkbox">
              <i data-lucide="check"></i>
            </div>
            <span class="todo-text">${a} ${i.text}</span>
          </div>
          <button class="todo-del-btn todo-delete-trigger">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
          </button>
        </div>
      `}).join(""),lucide.createIcons(),t.querySelectorAll(".todo-check-trigger").forEach(i=>{i.addEventListener("click",()=>{const a=parseInt(i.closest(".todo-item").dataset.id),n=this.todos.find(o=>o.id===a);n&&(n.checked=!n.checked,localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),this.renderTodoItems())})}),t.querySelectorAll(".todo-delete-trigger").forEach(i=>{i.addEventListener("click",a=>{a.stopPropagation();const n=parseInt(i.closest(".todo-item").dataset.id);this.todos=this.todos.filter(o=>o.id!==n),localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),this.renderTodoItems()})})}initWater(){var t,e;this.updateWaterDisplay(),(t=document.getElementById("btnWaterAdd"))==null||t.addEventListener("click",()=>{this.waterCount<16&&(this.waterCount++,localStorage.setItem("commuter_water_cups",this.waterCount),this.updateWaterDisplay())}),(e=document.getElementById("btnWaterSub"))==null||e.addEventListener("click",()=>{this.waterCount>0&&(this.waterCount--,localStorage.setItem("commuter_water_cups",this.waterCount),this.updateWaterDisplay())})}updateWaterDisplay(){const t=document.getElementById("waterWave"),e=document.getElementById("waterDisplay");if(!t||!e)return;const i=Math.min(100,Math.round(this.waterCount/this.waterGoal*100));t.style.height=`${i}%`,e.innerHTML=`${this.waterCount} / ${this.waterGoal} <span style="font-size: 0.85rem; color: var(--muted);">แก้ว (${this.waterCount*250} มล.)</span>`}initPomodoro(){var i,a,n;const t=document.getElementById("btnPomoStart"),e=document.getElementById("btnPomoReset");document.getElementById("pomoCircle"),t==null||t.addEventListener("click",()=>{this.pomoRunning?this.pausePomodoro():this.startPomodoro()}),e==null||e.addEventListener("click",()=>{this.resetPomodoro()}),(i=document.getElementById("btnPomoWork"))==null||i.addEventListener("click",()=>this.setPomoMode("work",25)),(a=document.getElementById("btnPomoShort"))==null||a.addEventListener("click",()=>this.setPomoMode("short_break",5)),(n=document.getElementById("btnPomoLong"))==null||n.addEventListener("click",()=>this.setPomoMode("long_break",15))}setPomoMode(t,e){this.pausePomodoro(),this.pomoMode=t,this.pomoMinutes=e,this.pomoSeconds=0,this.pomoDuration=e*60;const i=document.getElementById("pomoModeText"),a=document.getElementById("pomoCircle");i&&(t==="work"?(i.innerText="โฟกัสงาน (WORK MODE)",a&&(a.style.stroke="var(--cyan)")):t==="short_break"?(i.innerText="พักสั้น (SHORT BREAK)",a&&(a.style.stroke="var(--green)")):(i.innerText="พักยาว (LONG BREAK)",a&&(a.style.stroke="var(--purple)"))),this.updatePomoDisplay()}startPomodoro(){this.pomoRunning=!0;const t=document.getElementById("btnPomoStart");t&&(t.innerHTML='<i data-lucide="pause" style="width: 12px; height: 12px;"></i> หยุด',lucide.createIcons()),this.pomoTimer=setInterval(()=>{if(this.pomoSeconds===0){if(this.pomoMinutes===0){this.triggerPomoAlarm(),this.resetPomodoro();return}this.pomoMinutes--,this.pomoSeconds=59}else this.pomoSeconds--;this.updatePomoDisplay()},1e3)}pausePomodoro(){this.pomoRunning=!1,clearInterval(this.pomoTimer);const t=document.getElementById("btnPomoStart");t&&(t.innerHTML='<i data-lucide="play" style="width: 12px; height: 12px;"></i> เริ่ม',lucide.createIcons())}resetPomodoro(){this.pausePomodoro();const t=this.pomoMode==="work"?25:this.pomoMode==="short_break"?5:15;this.pomoMinutes=t,this.pomoSeconds=0,this.pomoDuration=t*60,this.updatePomoDisplay()}updatePomoDisplay(){const t=document.getElementById("pomoDisplay"),e=document.getElementById("pomoCircle");if(!t)return;const i=`${String(this.pomoMinutes).padStart(2,"0")}:${String(this.pomoSeconds).padStart(2,"0")}`;if(t.innerText=i,e){const o=283*(1-(this.pomoMinutes*60+this.pomoSeconds)/this.pomoDuration);e.style.strokeDashoffset=o}}triggerPomoAlarm(){try{this.audioCtx||(this.audioCtx=new(window.AudioContext||window.webkitAudioContext));const e=this.audioCtx.createOscillator(),i=this.audioCtx.createGain();e.connect(i),i.connect(this.audioCtx.destination),e.type="sine",e.frequency.setValueAtTime(659.25,this.audioCtx.currentTime),e.frequency.setValueAtTime(830.61,this.audioCtx.currentTime+.15),e.frequency.setValueAtTime(987.77,this.audioCtx.currentTime+.3),i.gain.setValueAtTime(0,this.audioCtx.currentTime),i.gain.linearRampToValueAtTime(.3,this.audioCtx.currentTime+.05),i.gain.exponentialRampToValueAtTime(.01,this.audioCtx.currentTime+.8),e.start(),e.stop(this.audioCtx.currentTime+.9)}catch(e){console.warn("Audio Context init failed (user interaction required):",e)}const t=this.pomoMode==="work"?"ครบเวลาแล้ว! ได้เวลาพักผ่อนแล้วพักสติ":"ได้เวลาลุยต่อแล้ว! เริ่มโฟกัสงานอีกครั้ง";alert(`🛎️ Pomodoro Alarm:
${t}`)}initBattery(){const t=document.getElementById("batteryLevelFill"),e=document.getElementById("batteryPct"),i=document.getElementById("batteryStatusText");if(!t||!e||!i)return;const a=n=>{const o=Math.round(n.level*100);e.innerText=`${o}%`,t.style.width=`${o}%`,o<=20&&!n.charging?(t.style.backgroundColor="var(--red)",t.style.boxShadow="0 0 10px var(--red)"):n.charging?(t.style.backgroundColor="var(--cyan)",t.style.boxShadow="0 0 10px var(--cyan)"):(t.style.backgroundColor="var(--green)",t.style.boxShadow="0 0 10px var(--green)"),i.innerText=n.charging?"กำลังชาร์จไฟพ่วงอยู่ (Charging)":`กำลังจ่ายกระแสไฟ (${Math.round(n.dischargingTime/60)||0} ชม. คงเหลือ)`};navigator.getBattery?navigator.getBattery().then(n=>{a(n),n.addEventListener("levelchange",()=>a(n)),n.addEventListener("chargingchange",()=>a(n))}):(e.innerText="92%",t.style.width="92%",i.innerText="ไม่มี Battery API รองรับ (โหมดเดสก์ท็อป)")}initMemo(){const t=document.getElementById("memoTextarea"),e=document.getElementById("memoSaveStatus");if(!t||!e)return;t.value=localStorage.getItem("commuter_memo")||"";let i;t.addEventListener("input",()=>{e.innerHTML='<i data-lucide="loader" style="width:12px;height:12px;animation:spin 1s linear infinite;"></i> กำลังบันทึกแบบร่าง...',lucide.createIcons(),i&&clearTimeout(i),i=setTimeout(()=>{localStorage.setItem("commuter_memo",t.value),e.innerHTML='<i data-lucide="check" style="width:12px;height:12px;"></i> บันทึกในบราวเซอร์สำเร็จแล้ว',lucide.createIcons()},800)})}initCalendar(){var i,a,n;this.calDate=new Date,this.calSelectedDay=this.calDate.getDate(),this.calendarNotes=JSON.parse(localStorage.getItem("commuter_calendar_notes"))||{};const t=()=>{const o=this.calDate.getFullYear(),s=this.calDate.getMonth(),l=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];document.getElementById("calendarMonthYear").innerText=`${l[s]} ${o+543}`;let d=["อา","จ","อ","พ","พฤ","ศ","ส"].map(u=>`<div style="font-weight:600; color:var(--muted); margin-bottom:6px;">${u}</div>`).join("");const p=new Date(o,s,1).getDay(),g=new Date(o,s+1,0).getDate();for(let u=0;u<p;u++)d+="<div></div>";const v=new Date,h=v.getFullYear()===o&&v.getMonth()===s;for(let u=1;u<=g;u++){const f=h&&v.getDate()===u,x=this.calSelectedDay===u,b=`${o}-${String(s+1).padStart(2,"0")}-${String(u).padStart(2,"0")}`,T=!!this.calendarNotes[b];d+=`
          <div class="calendar-day-tile ${f?"today":""} ${x?"selected":""}" 
               data-day="${u}"
               style="padding: 8px 4px; border-radius: 6px; cursor: pointer; position: relative; transition: var(--transition);
                      border: 1px solid ${x?"var(--cyan)":"transparent"};
                      background: ${f?"rgba(0, 242, 254, 0.1)":T?"rgba(0, 242, 254, 0.05)":"transparent"};">
            ${u}
            ${T?'<div style="position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; background: var(--cyan); border-radius: 50%;"></div>':""}
          </div>
        `}const m=document.getElementById("calendarGrid");m&&(m.innerHTML=d,m.querySelectorAll(".calendar-day-tile").forEach(u=>{u.addEventListener("click",()=>{m.querySelectorAll(".calendar-day-tile").forEach(f=>{f.style.borderColor="transparent"}),u.style.borderColor="var(--cyan)",this.calSelectedDay=parseInt(u.dataset.day),e()})}))},e=()=>{const o=this.calDate.getFullYear(),s=this.calDate.getMonth()+1,l=`${o}-${String(s).padStart(2,"0")}-${String(this.calSelectedDay).padStart(2,"0")}`;document.getElementById("calSelectedDayText").innerHTML=`<span>โน้ตตารางเวลาวันที่: ${this.calSelectedDay}/${s}/${o+543}</span>`,document.getElementById("calDayNoteInput").value=this.calendarNotes[l]||""};(i=document.getElementById("btnCalPrev"))==null||i.addEventListener("click",()=>{this.calDate.setMonth(this.calDate.getMonth()-1),this.calSelectedDay=1,t(),e()}),(a=document.getElementById("btnCalNext"))==null||a.addEventListener("click",()=>{this.calDate.setMonth(this.calDate.getMonth()+1),this.calSelectedDay=1,t(),e()}),(n=document.getElementById("btnSaveCalNote"))==null||n.addEventListener("click",()=>{const o=this.calDate.getFullYear(),s=this.calDate.getMonth()+1,l=`${o}-${String(s).padStart(2,"0")}-${String(this.calSelectedDay).padStart(2,"0")}`,c=document.getElementById("calDayNoteInput").value.trim();c?this.calendarNotes[l]=c:delete this.calendarNotes[l],localStorage.setItem("commuter_calendar_notes",JSON.stringify(this.calendarNotes)),t(),e();const d=document.getElementById("btnSaveCalNote");if(d){const p=d.innerHTML;d.innerHTML="✓ บันทึกแล้ว!",d.style.background="#22c55e",d.style.borderColor="#22c55e",setTimeout(()=>{d.innerHTML=p,d.style.background="",d.style.borderColor=""},1800)}}),t(),e()}}class _t{constructor(t,e){this.container=document.getElementById(t),this.state=e}async init(){this.renderSkeleton(),await this.fetchAndRender()}renderSkeleton(){this.container.innerHTML=`
      <div class="emergency-grid">
        <div class="glass-card skeleton" style="height: 350px;"></div>
        <div class="glass-card skeleton" style="height: 350px;"></div>
      </div>
    `,lucide.createIcons()}async fetchAndRender(){var t;try{const e=this.state.getCoords();let i=0;try{i=(await z(e.lat,e.lon)).current.weather_code}catch(o){console.warn("Could not load weather for safety check, using normal code",o)}const a=q(i),n=et();this.render(a,n),this.setupEvents()}catch(e){console.error(e),this.container.innerHTML=`
        <div class="glass-card glow-card-red" style="text-align: center; padding: 40px;">
          <i data-lucide="shield-alert" style="width: 48px; height: 48px; color: var(--red); margin-bottom: 16px;"></i>
          <h3 style="color: var(--red);">เกิดข้อผิดพลาดในการโหลดข้อมูลความปลอดภัย</h3>
          <p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 20px;">${e.message}</p>
          <button class="btn btn-primary" id="retryEmergencyBtn"><i data-lucide="refresh-cw"></i> ลองใหม่</button>
        </div>
      `,lucide.createIcons(),(t=document.getElementById("retryEmergencyBtn"))==null||t.addEventListener("click",()=>this.init())}}render(t,e){const i=this.state.getCoords(),a=t.map(s=>{s.level;const l=s.level==="danger"?"border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.06);":s.level==="warning"?"border-color: rgba(245,158,11,0.25); background: rgba(245,158,11,0.04);":"border-color: var(--border);",c=s.level==="danger"?"var(--red)":s.level==="warning"?"var(--yellow)":"var(--cyan)",d=s.level==="danger"?"shield-alert":s.level==="warning"?"alert-triangle":"info";return`
        <div class="safety-alert-card" style="${l}">
          <div class="safety-alert-icon" style="color: ${c}; background: ${c}15;">
            <i data-lucide="${d}"></i>
          </div>
          <div class="safety-alert-info">
            <h4 style="color: ${c};">${s.title}</h4>
            <p>${s.text}</p>
          </div>
        </div>
      `}).join(""),n=e.map(s=>`
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
              ${a||'<div style="text-align:center; color:var(--muted); font-size:0.75rem; padding:20px;">🟢 ทุกพื้นที่สถานการณ์ปกติ ไม่มีรายงานภัยพิบัติขัดข้อง</div>'}
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
              ${n}
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
แผนที่: https://maps.google.com/?q=${e.lat},${e.lon}`;navigator.share?navigator.share({title:"SOS Emergency Position",text:i,url:`https://maps.google.com/?q=${e.lat},${e.lon}`}).then(()=>{this.showToast("ส่งสำเร็จ","ส่งสัญญาน SOS แชร์ตำแหน่งเรียบร้อยแล้ว")}).catch(a=>{console.warn("Share failed, copying instead:",a),this.copySOSToClipboard(i)}):this.copySOSToClipboard(i)})}copySOSToClipboard(t){navigator.clipboard.writeText(t).then(()=>{this.showToast("คัดลอกสำเร็จ","คัดลอกข้อความพิกัด SOS ลงคลิปบอร์ดแล้ว คุณสามารถกดส่งไลน์หาผู้เกี่ยวข้องได้ทันที!")}).catch(e=>{console.error("Clipboard copy failed:",e)})}showToast(t,e){const i=document.getElementById("toastContainer");if(!i)return;const a=document.createElement("div");a.className="toast-alert",a.style.borderColor="var(--red)",a.innerHTML=`
      <div class="toast-icon" style="color: var(--red);">
        <i data-lucide="alert-circle" style="width:16px;height:16px;"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title" style="color: var(--red);">${t}</div>
        <div class="toast-msg">${e}</div>
      </div>
    `,i.appendChild(a),lucide.createIcons(),setTimeout(()=>{a.classList.add("dismissed"),setTimeout(()=>a.remove(),300)},4e3)}}class kt{constructor(){const t=localStorage.getItem("commuter_coords");t?this.coords=JSON.parse(t):this.coords={lat:13.7462,lon:100.5348,name:"สยามสแควร์ (กรุงเทพฯ)",country:"TH"},this.widgets=[],this.thunderTimer=null,this.weatherCode=null}getWeatherCode(){return this.weatherCode}setWeatherCode(t){this.weatherCode=t}getCoords(){return this.coords}setCoords(t,e,i,a){this.coords={lat:t,lon:e,name:i,country:a},localStorage.setItem("commuter_coords",JSON.stringify(this.coords)),this.widgets.forEach(n=>{typeof n.fetchAndRender=="function"?n.fetchAndRender():typeof n.init=="function"&&n.init()})}registerWidget(t){this.widgets.push(t)}triggerBackgroundAnimation(t){const e=document.getElementById("weatherBgOverlay");if(!e)return;e.innerHTML="",this.thunderTimer&&(clearInterval(this.thunderTimer),this.thunderTimer=null);const i=[51,53,55,61,63,65,80,81,82,95,96],a=[2,3,45,48],n=[0,1];if(i.includes(t)){const o=document.createDocumentFragment();for(let s=0;s<40;s++){const l=document.createElement("div");l.className="rain-drop",l.style.left=`${Math.random()*100}vw`,l.style.top=`${-80-Math.random()*100}px`,l.style.animationDuration=`${.6+Math.random()*.6}s`,l.style.animationDelay=`${Math.random()*2}s`,o.appendChild(l)}e.appendChild(o),t>=95&&(this.thunderTimer=setInterval(()=>{Math.random()>.75&&(e.style.backgroundColor="rgba(255, 255, 255, 0.14)",setTimeout(()=>{e.style.backgroundColor="transparent"},60))},3500))}else if(a.includes(t)){const o=document.createDocumentFragment();for(let s=0;s<4;s++){const l=document.createElement("div");l.className="cloud-particle";const c=150+Math.random()*220;l.style.width=`${c}px`,l.style.height=`${c*.65}px`,l.style.top=`${Math.random()*60}%`,l.style.animationDuration=`${40+Math.random()*50}s`,l.style.animationDelay=`${-Math.random()*40}s`,o.appendChild(l)}e.appendChild(o)}else if(n.includes(t)){const o=document.createElement("div");o.className="sun-ray",e.appendChild(o)}}}function It(r){return new Promise(t=>{if(!navigator.geolocation)return t();navigator.geolocation.getCurrentPosition(e=>{const{latitude:i,longitude:a}=e.coords;fetch(`https://nominatim.openstreetmap.org/reverse?lat=${i}&lon=${a}&format=json&accept-language=th`).then(n=>n.json()).then(n=>{var s,l,c,d,p,g;const o=((s=n.address)==null?void 0:s.city)||((l=n.address)==null?void 0:l.town)||((c=n.address)==null?void 0:c.suburb)||((d=n.address)==null?void 0:d.county)||"ตำแหน่งปัจจุบัน";r.setCoords(i,a,o,((g=(p=n.address)==null?void 0:p.country_code)==null?void 0:g.toUpperCase())||"TH")}).catch(()=>{r.setCoords(i,a,"ตำแหน่งปัจจุบัน","TH")}).finally(t)},()=>t(),{timeout:6e3,maximumAge:6e4})})}document.addEventListener("DOMContentLoaded",async()=>{const r=new kt;Lt(),await It(r);const t=new at("tab-weather",r),e=new St(null,"tab-transit",r),i=new wt("tab-helper",r),a=new _t("tab-emergency",r);r.registerWidget(t),r.registerWidget(e),r.registerWidget(i),r.registerWidget(a),await t.init(),await e.init(),await i.init(),await a.init(),Et(),Mt(),Bt(),$t(),Ct()});function Lt(){const r=document.getElementById("mainTime"),t=document.getElementById("mainDate");if(!r||!t)return;const e=()=>{const i=new Date;r.innerText=i.toLocaleTimeString("th-TH",{hour12:!1});const a=["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],n=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."],o=a[i.getDay()],s=i.getDate(),l=n[i.getMonth()],c=i.getFullYear()+543;t.innerText=`วัน${o}ที่ ${s} ${l} ${c}`};e(),setInterval(e,1e3)}function Et(){const r=document.getElementById("themeToggle"),t=document.getElementById("theme-icon-light"),e=document.getElementById("theme-icon-dark");if(!r)return;const i=n=>{n==="light"?(document.body.classList.add("light-theme"),t&&(t.style.display="none"),e&&(e.style.display="block")):(document.body.classList.remove("light-theme"),t&&(t.style.display="block"),e&&(e.style.display="none")),document.dispatchEvent(new CustomEvent("theme-changed"))},a=localStorage.getItem("commuter_theme")||"dark";i(a),r.addEventListener("click",()=>{const o=document.body.classList.contains("light-theme")?"dark":"light";localStorage.setItem("commuter_theme",o),i(o)})}function Mt(r){const t=document.querySelectorAll(".nav-item"),e=document.querySelectorAll(".tab-content"),i=document.getElementById("headerTitle"),a=document.getElementById("headerSub"),n={weather:{main:"สภาพอากาศและการเตรียมตัว",sub:"BANGKOK METROPOLIS · TH"},transit:{main:"ตารางเวลารถไฟบีทีเอส-เอ็มอาร์ที",sub:"BANGKOK MASS TRANSIT HUB"},helper:{main:"สิ่งอำนวยความสะดวกในชีวิตประจำวัน",sub:"DAILY PRODUCTIVITY WIDGETS"},emergency:{main:"ศูนย์ความปลอดภัยและข้อมูลติดต่อด่วน",sub:"BANGKOK SAFETY BOARD & SOS"}};t.forEach(o=>{o.addEventListener("click",()=>{const s=o.dataset.tab;t.forEach(c=>c.classList.remove("active")),o.classList.add("active"),e.forEach(c=>c.classList.remove("active"));const l=document.getElementById(`tab-${s}`);l&&l.classList.add("active"),i&&a&&n[s]&&(i.innerText=n[s].main,a.innerText=n[s].sub)})})}function Bt(){const r=document.querySelector(".widgets-layout-grid");if(!r)return;const t=()=>{r.querySelectorAll(".glass-card").forEach(a=>{a.classList.add("draggable-widget"),a.setAttribute("draggable","true")})};t(),new MutationObserver(()=>{t()}).observe(r,{childList:!0});let i=null;r.addEventListener("dragstart",a=>{const n=a.target.closest(".draggable-widget");n&&(i=n,a.dataTransfer.effectAllowed="move",n.style.opacity="0.35")}),r.addEventListener("dragover",a=>{a.preventDefault();const n=a.target.closest(".draggable-widget");n&&n!==i&&n.classList.add("widget-drag-over")}),r.addEventListener("dragleave",a=>{const n=a.target.closest(".draggable-widget");n&&n.classList.remove("widget-drag-over")}),r.addEventListener("drop",a=>{a.preventDefault();const n=a.target.closest(".draggable-widget");if(n&&n!==i){n.classList.remove("widget-drag-over");const o=Array.from(r.children),s=o.indexOf(i),l=o.indexOf(n);s<l?r.insertBefore(i,n.nextSibling):r.insertBefore(i,n);const c=Array.from(r.children).map(d=>d.innerHTML.substring(0,30));localStorage.setItem("commuter_widget_order",JSON.stringify(c))}}),r.addEventListener("dragend",a=>{const n=a.target.closest(".draggable-widget");n&&(n.style.opacity="1"),r.querySelectorAll(".draggable-widget").forEach(o=>{o.classList.remove("widget-drag-over")})})}function $t(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(r=>console.log("Service Worker registered successfully:",r.scope)).catch(r=>console.error("Service Worker registration failed:",r))})}function Ct(){const r=(t,e,i,a)=>{const n=document.getElementById("toastContainer");if(!n)return;const o=document.createElement("div");o.className="toast-alert",o.style.borderColor=i,o.innerHTML=`
      <div class="toast-icon" style="color: ${i};">
        <i data-lucide="${a}" style="width:16px;height:16px;"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title" style="color: ${i};">${t}</div>
        <div class="toast-msg">${e}</div>
      </div>
    `,n.appendChild(o),lucide.createIcons(),setTimeout(()=>{o.classList.add("dismissed"),setTimeout(()=>o.remove(),300)},4500)};window.addEventListener("online",()=>{r("การเชื่อมต่อกลับมาแล้ว","ระบบเปลี่ยนกลับเป็นโหมดออนไลน์อัตโนมัติ","var(--green)","wifi")}),window.addEventListener("offline",()=>{r("คุณออฟไลน์อยู่","ระบบสลับมาใช้ฐานข้อมูลและแคชออฟไลน์แล้ว","var(--yellow)","wifi-off")})}
