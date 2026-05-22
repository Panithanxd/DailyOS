(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(a){if(a.ep)return;a.ep=!0;const n=t(a);fetch(a.href,n)}})();const W=10*60*1e3;async function O(r,e={},t=W){const i=`api_cache_${r}`;if(!navigator.onLine){const n=localStorage.getItem(i);if(n){const{data:o}=JSON.parse(n);return console.log(`[API Cache] Offline mode: Served ${r} from cache.`),o}throw new Error("ระบบออฟไลน์และไม่มีข้อมูลสำรองสำหรับคำขอนี้")}const a=localStorage.getItem(i);if(a){const{data:n,timestamp:o}=JSON.parse(a);if(Date.now()-o<t)return n}try{const n=await fetch(r,e);if(!n.ok)throw new Error(`HTTP Error: ${n.status}`);const o=await n.json();return localStorage.setItem(i,JSON.stringify({data:o,timestamp:Date.now()})),o}catch(n){if(console.warn(`[API Cache] Fetch failed, fallback to cache for ${r}:`,n.message),a){const{data:o}=JSON.parse(a);return o}throw n}}const C={0:["☀️","CLEAR SKY","ท้องฟ้าแจ่มใส"],1:["🌤","MAINLY CLEAR","ท้องฟ้าโปร่ง"],2:["⛅","PARTLY CLOUDY","มีเมฆบางส่วน"],3:["☁️","OVERCAST","เมฆครึ้ม"],45:["🌫","FOGGY","หมอกลงจัด"],48:["🌫","RIME FOG","หมอกน้ำค้างแข็ง"],51:["🌦","LIGHT DRIZZLE","ฝนตกปรอยๆ เล็กน้อย"],53:["🌦","DRIZZLE","ฝนตกปรอยๆ"],55:["🌧","HEAVY DRIZZLE","ฝนตกปรอยหนาแน่น"],61:["🌧","LIGHT RAIN","ฝนตกเล็กน้อย"],63:["🌧","MODERATE RAIN","ฝนตกปานกลาง"],65:["🌧","HEAVY RAIN","ฝนตกชุกหนาแน่น"],80:["🌦","RAIN SHOWERS","ฝนตกกระจายตัว"],81:["⛈","STORM","พายุฝนฟ้าคะนอง"],82:["⛈","HEAVY STORM","พายุฝนคะนองรุนแรง"],95:["⛈","THUNDERSTORM","พายุฝนรุนแรงและฟ้าผ่า"],96:["⛈","HAIL STORM","พายุฝนฟ้าคะนองและลูกเห็บ"]},R=[{max:50,col:"#10b981",lbl:"ดีเยี่ยม (Good)",advice:"คุณภาพอากาศดีมาก เหมาะสำหรับทำกิจกรรมกลางแจ้ง"},{max:100,col:"#f59e0b",lbl:"ปานกลาง (Moderate)",advice:"คุณภาพอากาศปานกลาง กลุ่มเสี่ยงควรหลีกเลี่ยงกิจกรรมกลางแจ้งเป็นเวลานาน"},{max:150,col:"#ff9f43",lbl:"เริ่มมีผลกระทบ (Sensitive)",advice:"ควรสวมหน้ากากอนามัยเมื่ออยู่นอกอาคาร และลดการออกกำลังกายกลางแจ้ง"},{max:200,col:"#ef4444",lbl:"มีผลเสียต่อสุขภาพ (Unhealthy)",advice:"⚠️ สวมหน้ากาก PM2.5 ตลอดเวลาเมื่ออยู่กลางแจ้ง หลีกเลี่ยงกิจกรรมนอกอาคาร"},{max:300,col:"#b71c1c",lbl:"แย่อย่างยิ่ง (Very Unhealthy)",advice:"🚨 เป็นอันตรายต่อสุขภาพ! ควรอยู่ในอาคารที่ปิดมิดชิดและเปิดเครื่องฟอกอากาศ"},{max:500,col:"#7f1d1d",lbl:"อันตรายสูงสุด (Hazardous)",advice:"❌ วิกฤตคุณภาพอากาศร้ายแรง! ห้ามออกนอกอาคารโดยไม่จำเป็น"}];async function A(r,e){const t=`https://api.open-meteo.com/v1/forecast?latitude=${r}&longitude=${e}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max&timezone=Asia%2FBangkok`;return await O(t,{},5*60*1e3)}async function N(r,e){const t=`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${r}&longitude=${e}&current=us_aqi,pm2_5&timezone=Asia%2FBangkok`;return await O(t,{},10*60*1e3)}async function J(r){if(!r)return[];const e=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(r)}&count=5&language=th&format=json`;try{return(await(await fetch(e)).json()).results||[]}catch(t){return console.error("Location search failed:",t),[]}}function j(r,e){return[51,53,55,61,63,65,80,81,82,95,96].includes(r)||e>=40?{needed:!0,text:"☔ ควรพกร่มหรือเสื้อกันฝน! มีโอกาสเกิดฝนตกสูงในระหว่างวัน",color:"var(--cyan)"}:e>=15?{needed:!1,text:"🌤️ ฝนตกยาก แต่ท้องฟ้าอาจครึ้มๆ เล็กน้อย ไม่จำเป็นต้องพกร่ม",color:"var(--muted)"}:{needed:!1,text:"☀️ ท้องฟ้าแจ่มใส/แดดจัด เดินทางสะดวก ไม่จำเป็นต้องพกร่ม",color:"var(--green)"}}function G(r,e,t){return[51,53,55,61,63,65,80,81,82,95,96].includes(t)?"เสื้อผ้าแห้งไว (Quick-Dry) หรือเสื้อคลุมกันน้ำ หลีกเลี่ยงรองเท้าผ้าใบสีขาว":r>=35?"เสื้อผ้าฝ้ายบางเบา ระบายอากาศดีเยี่ยม หมวก แว่นกันแดด และควรทาครีมกันแดด":r>=28?"เสื้อผ้าสวมใส่สบาย เช่น เสื้อยืด แขนสั้น กางเกงขาสั้น/ระบายความร้อนได้ดี":r>=22?"เสื้อยืดแขนสั้น หรือเชิ้ตบางๆ สภาพอากาศกำลังเย็นสบายกำลังดี":"สวมเสื้อแขนยาว หรือเตรียมเสื้อแจ็คเก็ตบางๆ ไปด้วยเนื่องจากอากาศค่อนข้างเย็น"}function V(r){return r>=8?{text:"อันตรายระดับสูงมาก! หลีกเลี่ยงแสงแดดช่วง 10:00 - 16:00 ทากันแดด SPF 30+ สวมหมวกและแว่นกันแดด",color:"var(--red)"}:r>=6?{text:"ระดับสูง! ควรทาครีมกันแดด สวมหมวกปีกกว้าง และสวมแว่นกันแดดเมื่อออกกลางแดด",color:"var(--yellow)"}:r>=3?{text:"ระดับปานกลาง ควรกางร่มเมื่อเดินกลางแจ้งเป็นเวลานาน",color:"var(--cyan)"}:{text:"ระดับต่ำ ปลอดภัยต่อการออกแดดทั่วไป",color:"var(--green)"}}const K=[{name:"สายด่วนเจ็บป่วยฉุกเฉิน (สพฉ.)",number:"1669",category:"medical",desc:"กู้ชีพและอุบัติเหตุแพทย์ฉุกเฉิน"},{name:"เหตุด่วนเหตุร้าย (ตำรวจ)",number:"191",category:"police",desc:"แจ้งเหตุด่วนตำรวจหลัก"},{name:"สายด่วนข้อมูลการจราจร (บก.02)",number:"1197",category:"traffic",desc:"ศูนย์ควบคุมสั่งการจราจรกรุงเทพฯ"},{name:"ตำรวจทางหลวง",number:"1193",category:"traffic",desc:"เหตุบนมอเตอร์เวย์และทางหลวงแผ่นดิน"},{name:"แจ้งเหตุอัคคีภัย/ดับเพลิง",number:"199",category:"fire",desc:"นักดับเพลิงและกู้ภัยกรุงเทพฯ"},{name:"ศูนย์แพทย์ฉุกเฉินกทม. (ศูนย์เอราวัณ)",number:"1646",category:"medical",desc:"หน่วยแพทย์เคลื่อนที่กทม."},{name:"สายด่วนข้อมูลน้ำท่วมกทม.",number:"1555",category:"flood",desc:"ศูนย์ประสานงานน้ำท่วมกรุงเทพฯ"},{name:"สถานีวิทยุจราจรเพื่อการแจ้งเหตุ (จส.100)",number:"1137",category:"traffic",desc:"รายงานอุบัติเหตุและของหาย"}];function H(r){const e=[];return[61,63,65,80,81,82,95,96].includes(r)&&(e.push({id:"rain_alert",level:"warning",title:"🌧️ แจ้งเตือนฝนฟ้าคะนองในพื้นที่",text:"มีฝนตกชุกหนาแน่นและลมกรรโชกแรงในเขตกรุงเทพมหานครและปริมณฑล หลีกเลี่ยงการเดินทางกลางแจ้งหากไม่จำเป็น"}),r>=63&&e.push({id:"flood_alert",level:"danger",title:"🚨 พื้นที่เสี่ยงน้ำท่วมขังรอระบาย",text:"เนื่องจากมีปริมาณน้ำสะสมสูง พบปัญหาถนนน้ำขังระดับ 10-15 ซม. ที่ ถนนอโศกมนตรี (หน้า ตึก GMM), แยกรัชดา-ลาดพร้าว และซอยสุขุมวิท 39"})),e.push({id:"aqi_alert",level:"info",title:"😷 อัพเดทสถานการณ์ฝุ่น PM 2.5",text:"ค่าฝุ่นละออง PM 2.5 วันนี้มีแนวโน้มสะสมตัวเนื่องจากสภาพลมสงบ แนะนำตรวจเช็คดัชนีคุณภาพอากาศก่อนทำกิจกรรมกลางแจ้งทุกครั้ง"}),e}function Y(){const r=[],e=new Date,t=["ถนนลาดพร้าว ซอย 80 (งานปรับปรุงระบบจำหน่ายแรงสูงเพื่อความปลอดภัย)","ซอยสุขุมวิท 22 (ติดตั้งอุปกรณ์ตรวจวัดกระแสไฟฟ้าแรงสูง)","ถนนพระราม 9 ซอย 15 (ย้ายเสาพาดสายหลบแนวก่อสร้างทางรถไฟฟ้า)"];for(let i=0;i<3;i++){const a=new Date(e);a.setDate(e.getDate()+i+1),r.push({id:`outage_${i}`,title:`⚡ ประกาศดับไฟเพื่อบำรุงรักษา — ${t[i]}`,time:`${a.toLocaleDateString("th-TH",{day:"numeric",month:"short"})} | 08:30 น. - 15:30 น.`,status:"กำลังดำเนินการตามแผน"})}return r}class U{constructor(e,t){this.containerId=e,this.state=t}async init(){this.container=document.getElementById(this.containerId),this.container&&(this.renderSkeleton(),await this.fetchAndRender())}renderSkeleton(){this.container.innerHTML=`
      <div class="glass-card skeleton" style="height: 120px;"></div>
    `}async fetchAndRender(){try{const e=this.state.getCoords(),t=await A(e.lat,e.lon),i=await N(e.lat,e.lon),a=t.current.weather_code,n=H(a);this.render(t,i,n)}catch(e){console.warn("Commute insights fetch error:",e.message),this.container.innerHTML=""}}render(e,t,i){const a=e.current,n=t.current.us_aqi,s=new Date().getHours();let d="",l="🌟",c="เช้าอันสดใส เหมาะแก่การเดินทาง",p="var(--cyan)";const f=[61,63,65,80,81,82,95,96].includes(a.weather_code);i.some(w=>w.id==="flood_alert")?(d="<b>แจ้งเตือนภัยพิบัติ:</b> มีฝนตกหนักน้ำท่วมขังในบางพื้นที่และพบบีทีเอสขัดข้อง ดีเลย์ประมาณ 8 นาที แนะนำให้เผื่อเวลาอย่างน้อย 20-30 นาทีในการเดินทางช่วงนี้",l="🚨",c="แจ้งเตือน: การเดินทางมีความเสี่ยงสูง",p="var(--red)"):f?(d="<b>พยากรณ์ฝนตก:</b> ท้องฟ้าครึ้มฝนฟ้าคะนองในเขตกทม. แนะนำให้พกร่มและสวมใส่รองเท้าที่กันน้ำได้ การจราจรบนทางด่วนอาจชะลอตัวเนื่องจากทัศนวิสัยต่ำ",l="☔",c="เตือนภัย: มีฝนฟ้าคะนองในพื้นที่",p="var(--yellow)"):a.temperature_2m>=35?(d="<b>สภาพอากาศร้อนจัด:</b> อุณหภูมิพุ่งสูงถึง 36°C+ แนะนำให้สวมใส่เสื้อผ้าเบาสบาย ระบายอากาศได้ดี หลีกเลี่ยงแดดจัดช่วงเที่ยง-บ่าย และพกน้ำดื่มติดตัว",l="☀️",c="เตือนภัย: สภาพอากาศร้อนจัด (Extreme Heat)",p="#f59e0b"):n>150?(d="<b>มลพิษทางอากาศ:</b> ค่าฝุ่น PM 2.5 วันนี้สูงเกินมาตรฐาน (US AQI: "+n+") แนะนำให้สวมใส่หน้ากาก N95 ก่อนทำกิจกรรมกลางแจ้ง",l="😷",c="เตือนภัย: คุณภาพอากาศเป็นอันตราย",p="#a855f7"):(d="<b>สภาพอากาศเอื้ออำนวย:</b> อากาศปลอดโปร่ง ไม่มีรายงานดีเลย์รถไฟฟ้า การจราจรช่วงเช้านี้ไหลลื่นปกติ ขอให้คุณเดินทางด้วยความสุขความปลอดภัย!",l="✨",c="สถานการณ์ปกติ: เดินทางได้ราบรื่น",p="var(--cyan)");let u=30,m="เบาบาง (เดินทางสะดวก)",y="var(--green)";s>=7&&s<=9||s>=17&&s<=19?(u=85,m="หนาแน่นสูง (ชานชาลาแออัด)",y="var(--red)"):(s>=11&&s<=13||s>=16&&s<17)&&(u=55,m="ปานกลาง (มีผู้โดยสารพ้นเก้าอี้)",y="var(--yellow)");let b="07:00 น. หรือ หลัง 09:15 น.",x="16:30 น. หรือ หลัง 19:30 น.";f&&(b="เดินทางล่วงหน้าเร็วขึ้น 30 นาที",x="รอฝนซาหลัง 19:30 น."),this.container.innerHTML=`
      <div class="glass-card glow-card" style="margin-bottom: 24px; border-color: ${p}33; display: flex; flex-direction: column; gap: 16px; background: linear-gradient(135deg, ${p}05 0%, rgba(13, 20, 35, 0.4) 100%);">
        
        <!-- Header status -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border); padding-bottom: 12px;">
          <div style="display: flex; gap: 10px; align-items: center;">
            <div style="font-size: 1.5rem; line-height: 1;">${l}</div>
            <div>
              <div style="font-size: 0.85rem; font-weight: 600; color: ${p};">${c}</div>
              <div style="font-size: 0.65rem; color: var(--muted); margin-top: 1px; font-family: 'JetBrains Mono', monospace;">DAILY COMMUTE BRIEFING</div>
            </div>
          </div>
          
          <div style="font-size: 0.65rem; color: var(--muted); font-family: 'JetBrains Mono', monospace; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 6px; padding: 3px 8px;">
            AI SYNTHESIS
          </div>
        </div>

        <!-- Briefing text -->
        <div style="font-size: 0.8rem; line-height: 1.6; color: var(--text);">
          ${d}
        </div>

        <!-- Metrics Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 4px;">
          
          <!-- Best time to leave -->
          <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 6px;">
            <div style="font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; font-family: 'JetBrains Mono', monospace; display: flex; align-items: center; gap: 4px;">
              <i data-lucide="clock" style="width: 12px; height: 12px;"></i> ช่วงเวลาที่ควรเลี่ยง (เพื่อเลี่ยงรถติด)
            </div>
            <div style="font-size: 0.75rem; line-height: 1.4;">
              🏠 ไปทำงาน: <b style="color: var(--cyan);">${b}</b><br>
              💻 กลับบ้าน: <b style="color: var(--cyan);">${x}</b>
            </div>
          </div>

          <!-- Platform Crowding Index -->
          <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 6px;">
            <div style="font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; font-family: 'JetBrains Mono', monospace; display: flex; align-items: center; gap: 4px;">
              <i data-lucide="users" style="width: 12px; height: 12px;"></i> ความหนาแน่นของรถไฟฟ้า (BTS/MRT)
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px; margin-top: 2px;">
              <div style="flex-grow: 1;">
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 500; color: ${y};">
                  <span>${m}</span>
                  <span style="font-family: 'Outfit';">${u}%</span>
                </div>
                <div style="width: 100%; height: 4px; background: var(--muted2); border-radius: 99px; overflow: hidden; margin-top: 4px;">
                  <div style="width: ${u}%; height: 100%; background: ${y}; border-radius: 99px; box-shadow: 0 0 8px ${y};"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `,lucide.createIcons()}}class Q{constructor(e,t){this.container=document.getElementById(e),this.state=t,this.searchTimeout=null}async init(){this.renderSkeleton(),await this.fetchAndRender()}renderSkeleton(){this.container.innerHTML=`
      <div class="search-box-container">
        <div class="search-input-wrap">
          <i data-lucide="search"></i>
          <input type="text" id="weatherSearchInput" placeholder="ค้นหาชื่อเมือง อำเภอ หรือจังหวัด..." autocomplete="off">
        </div>
        <div class="suggestions-list" id="weatherSuggestions"></div>
      </div>
      <div class="glass-card skeleton" style="height: 180px; margin-bottom: 24px;"></div>
      <div class="weather-tiles">
        <div class="glass-card skeleton" style="height: 100px;"></div>
        <div class="glass-card skeleton" style="height: 100px;"></div>
      </div>
    `,lucide.createIcons()}async fetchAndRender(){var e;try{const t=this.state.getCoords(),i=await A(t.lat,t.lon),a=await N(t.lat,t.lon);this.render(i,a),this.setupSearchEvents()}catch(t){console.error(t),this.container.innerHTML=`
        <div class="glass-card glow-card-red" style="text-align: center; padding: 40px;">
          <i data-lucide="wifi-off" style="width: 48px; height: 48px; color: var(--red); margin-bottom: 16px;"></i>
          <h3 style="color: var(--red); margin-bottom: 10px;">เกิดข้อผิดพลาดในการดึงข้อมูลสภาพอากาศ</h3>
          <p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 20px;">${t.message}</p>
          <button class="btn btn-primary" id="retryWeatherBtn"><i data-lucide="refresh-cw"></i> ลองใหม่</button>
        </div>
      `,lucide.createIcons(),(e=document.getElementById("retryWeatherBtn"))==null||e.addEventListener("click",()=>this.init())}}render(e,t){const i=e.current,a=this.state.getCoords(),[n,o,s]=C[i.weather_code]||["🌡️","UNKNOWN","สภาพอากาศไม่ระบุ"],d=e.daily.sunrise[0].slice(11,16),l=e.daily.sunset[0].slice(11,16),c=new Date,p=c.getHours()*60+c.getMinutes(),v=parseInt(d.slice(0,2))*60+parseInt(d.slice(3,5)),f=parseInt(l.slice(0,2))*60+parseInt(l.slice(3,5)),g=Math.min(100,Math.max(0,(p-v)/(f-v)*100));j(i.weather_code,e.hourly.precipitation_probability[0]),G(i.temperature_2m,i.apparent_temperature,i.weather_code);const u=V(e.daily.uv_index_max[0]);this.state.triggerBackgroundAnimation(i.weather_code);const m=c.getHours();let y="";for(let h=0;h<16;h++){const T=(m+h)%24,S=Math.round(e.hourly.temperature_2m[m+h]),$=e.hourly.weather_code[m+h],_=e.hourly.precipitation_probability[m+h],B=(C[$]||["🌡️"])[0];y+=`
        <div class="hourly-item ${h===0?"now":""}">
          <div class="hourly-time">${h===0?"ตอนนี้":`${String(T).padStart(2,"0")}:00`}</div>
          <div class="hourly-icon">${B}</div>
          <div class="hourly-temp">${S}°C</div>
          ${_>20?`<div style="font-size:0.6rem; color:var(--cyan); margin-top:2px;">☔${_}%</div>`:""}
        </div>
      `}let b="";for(let h=0;h<7;h++){const T=new Date(e.daily.time[h]),S=T.toLocaleDateString("th-TH",{weekday:"short"}),$=T.toLocaleDateString("th-TH",{day:"numeric",month:"short"}),_=Math.round(e.daily.temperature_2m_max[h]),B=Math.round(e.daily.temperature_2m_min[h]),z=e.daily.precipitation_probability_max[h],q=(C[e.daily.weather_code[h]]||["🌡️"])[0];b+=`
        <div class="daily-item">
          <div class="daily-date">
            <span style="font-weight: 500;">${S}</span><br>
            <span style="font-size: 0.65rem; color: var(--muted);">${$}</span>
          </div>
          <div class="daily-icon-desc">
            <span class="daily-icon">${q}</span>
            ${z>20?`<span class="daily-rain-chance"><i data-lucide="droplet" style="width:10px;height:10px;"></i> ${z}%</span>`:'<span style="font-size: 0.7rem; color: var(--muted2);">ไม่มีฝน</span>'}
          </div>
          <div class="daily-temps">
            <span class="daily-temp-max">${_}°</span>
            <span class="daily-temp-min">${B}°</span>
          </div>
        </div>
      `}const x=t.current.us_aqi,w=t.current.pm2_5;let M="var(--muted)",k="ไม่มีข้อมูล";if(x!==void 0){for(const h of R)if(x<=h.max){M=h.col,k=h.lbl,h.advice;break}}this.container.innerHTML=`
      <!-- Location Search Bar -->
      <div class="search-box-container">
        <div class="search-input-wrap">
          <i data-lucide="search"></i>
          <input type="text" id="weatherSearchInput" placeholder="ค้นหาชื่อเมือง อำเภอ หรือจังหวัด..." autocomplete="off">
        </div>
        <div class="suggestions-list" id="weatherSuggestions"></div>
      </div>

      <div id="weatherDashboardContent">
        <!-- AI Morning Briefing & Commute Insights -->
        <div id="commuteBriefingContainer"></div>

        <!-- Core Weather Card Grid -->
        <div class="weather-grid">
          <!-- Glass Card Main details -->
          <div class="glass-card">
            <div style="font-size: 0.75rem; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; margin-bottom: 20px;">
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
          </div>

          <!-- Quick Stats Indicators -->
          <div class="weather-tiles">
            <div class="sub-tile">
              <div style="font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; font-family: 'JetBrains Mono', monospace;">ความชื้นสัมพัทธ์</div>
              <div style="font-size: 1.5rem; font-weight: 500; font-family: 'Outfit';">${i.relative_humidity_2m}%</div>
            </div>
            <div class="sub-tile">
              <div style="font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; font-family: 'JetBrains Mono', monospace;">ความเร็วลม</div>
              <div style="font-size: 1.5rem; font-weight: 500; font-family: 'Outfit';">${Math.round(i.wind_speed_10m)} <span style="font-size: 0.75rem; color: var(--muted);">กม./ชม.</span></div>
            </div>
            <div class="sub-tile">
              <div style="font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; font-family: 'JetBrains Mono', monospace;">ดัชนี UV วันนี้</div>
              <div style="font-size: 1.5rem; font-weight: 500; font-family: 'Outfit'; color: ${e.daily.uv_index_max[0]>=6?"var(--yellow)":"var(--text)"};">
                ${Math.round(e.daily.uv_index_max[0])}
              </div>
            </div>
            <div class="sub-tile">
              <div style="font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; font-family: 'JetBrains Mono', monospace;">ทัศนวิสัย</div>
              <div style="font-size: 1.5rem; font-weight: 500; font-family: 'Outfit';">${(i.visibility/1e3).toFixed(1)} <span style="font-size: 0.75rem; color: var(--muted);">กม.</span></div>
            </div>
          </div>
        </div>

        <!-- Hourly forecast -->
        <div class="weather-strip-title">
          <i data-lucide="clock"></i> พยากรณ์รายชั่วโมง (16 ชม. ล่วงหน้า)
        </div>
        <div class="hourly-container">
          ${y}
        </div>

        <!-- Weekly & Additional Details -->
        <div class="daily-forecast-container">
          <div class="daily-list">
            <div style="font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 2px; font-family: 'JetBrains Mono', monospace; margin-bottom: 8px; display:flex; align-items:center; gap:6px;">
              <i data-lucide="calendar" style="width:14px; height:14px;"></i> พยากรณ์อากาศล่วงหน้า 7 วัน
            </div>
            ${b}
          </div>

          <div class="weather-sub-cards">
            <!-- Solar Track card -->
            <div class="glass-card">
              <div style="font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 2px; font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; display:flex; align-items:center; gap:6px;">
                <i data-lucide="sun" style="width:14px; height:14px;"></i> วิถีแสงตะวัน (Solar Orbit)
              </div>
              
              <div class="solar-track-box">
                <div class="solar-track-header">
                  <span>🌅 ${d} น.</span>
                  <span>${l} น. 🌇</span>
                </div>
                <div class="solar-track-line">
                  <div class="solar-track-fill" style="width: ${g}%"></div>
                  <div class="solar-sun-dot" style="left: ${g}%">☀️</div>
                </div>
                <div class="solar-stats">
                  <div class="solar-stat-item">โอกาสเกิดฝนวันนี้<b>${e.daily.precipitation_probability_max[0]}%</b></div>
                  <div class="solar-stat-item">ดัชนีแสงแดด (UV)<b>${Math.round(e.daily.uv_index_max[0])}</b></div>
                </div>
              </div>
              
              <div style="font-size:0.7rem; color:var(--muted); line-height:1.4; border-top:1px solid var(--border); padding-top:12px; margin-top:12px;">
                <strong>ค่าแดดสูงสุด:</strong> ${u.text}
              </div>
            </div>

            <!-- AQI card -->
            <div class="glass-card" style="border-color: ${M}33;">
              <div style="font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 2px; font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; display:flex; align-items:center; gap:6px;">
                <i data-lucide="wind" style="width:14px; height:14px;"></i> ดัชนีคุณภาพอากาศ (US AQI)
              </div>
              
              <div class="aqi-row">
                <div>
                  <div class="aqi-number" style="color: ${M};">${x??"--"}</div>
                  <div class="aqi-label" style="color: ${M};">${k}</div>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 0.65rem; color: var(--muted);">ปริมาณฝุ่น PM 2.5</span><br>
                  <b style="font-size: 1.15rem; font-family: 'Outfit';">${(w==null?void 0:w.toFixed(1))??"--"} <span style="font-size: 0.7rem; font-weight: normal;">μg/m³</span></b>
                </div>
              </div>

              <!-- Colorful AQI Scale -->
              <div class="aqi-scale-bar">
                ${R.map((h,T)=>`<div class="aqi-scale-segment ${x!==void 0&&(T===0?x<=50:x>R[T-1].max&&x<=h.max)?"active":""}" style="background-color: ${h.col}; color: ${h.col};"></div>`).join("")}
              </div>
              <div style="display:flex; justify-content:space-between; font-size: 0.5rem; color: var(--muted); font-family: 'JetBrains Mono', monospace; margin-top: 6px;">
                <span>0</span><span>50</span><span>100</span><span>150</span><span>200</span><span>300+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,new U("commuteBriefingContainer",this.state).init(),lucide.createIcons()}setupSearchEvents(){const e=document.getElementById("weatherSearchInput"),t=document.getElementById("weatherSuggestions");e.addEventListener("input",()=>{const i=e.value.trim();if(this.searchTimeout&&clearTimeout(this.searchTimeout),!i){t.style.display="none";return}this.searchTimeout=setTimeout(async()=>{const a=await J(i);a&&a.length>0?(t.innerHTML=a.map(n=>`
            <div class="suggestion-item" data-lat="${n.latitude}" data-lon="${n.longitude}" data-name="${n.name}" data-country="${n.country_code||"TH"}">
              <i data-lucide="map-pin" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-right:6px; color:var(--cyan);"></i>
              <b>${n.name}</b> ${n.admin1?`, ${n.admin1}`:""} (${n.country||"ต่างประเทศ"})
            </div>
          `).join(""),t.style.display="block",lucide.createIcons(),t.querySelectorAll(".suggestion-item").forEach(n=>{n.addEventListener("click",()=>{const o=parseFloat(n.dataset.lat),s=parseFloat(n.dataset.lon),d=n.dataset.name,l=n.dataset.country;this.state.setCoords(o,s,d,l),e.value="",t.style.display="none",this.init()})})):(t.innerHTML='<div class="suggestion-item" style="color:var(--muted); cursor:default;">ไม่พบสถานที่ดังกล่าว...</div>',t.style.display="block")},350)}),document.addEventListener("click",i=>{!e.contains(i.target)&&!t.contains(i.target)&&(t.style.display="none")})}}const Z={bts_green:{name:"BTS สายสุขุมวิท",short:"BTS-S",color:"#22c55e",fareBase:17,farePerSt:4.5,fareMax:65,timePerSt:2,pax:{adult:1,student:.7,senior:.5}},bts_silom:{name:"BTS สายสีลม",short:"BTS-L",color:"#15803d",fareBase:17,farePerSt:4.5,fareMax:65,timePerSt:2,pax:{adult:1,student:.7,senior:.5}},mrt_blue:{name:"MRT สายสีน้ำเงิน",short:"MRT-B",color:"#2563eb",fareBase:17,farePerSt:3,fareMax:45,timePerSt:2.5,pax:{adult:1,student:.9,senior:.5}},mrt_purple:{name:"MRT สายสีม่วง",short:"MRT-P",color:"#9333ea",fareBase:14,farePerSt:3,fareMax:42,timePerSt:2.5,pax:{adult:1,student:.9,senior:.5}},mrt_yellow:{name:"MRT สายสีเหลือง",short:"MRT-Y",color:"#eab308",fareBase:15,farePerSt:3.2,fareMax:45,timePerSt:2,pax:{adult:1,student:.9,senior:.5}},arl:{name:"Airport Rail Link",short:"ARL",color:"#e11d48",fareBase:15,farePerSt:5,fareMax:45,timePerSt:3,pax:{adult:1,student:1,senior:1}}},F=[{id:"khu_khot",name:"คูคต",line:"bts_green",idx:0},{id:"saphan_mai",name:"สะพานใหม่",line:"bts_green",idx:4},{id:"kasetsart",name:"ม.เกษตรศาสตร์",line:"bts_green",idx:11},{id:"ha_yaek",name:"ห้าแยกลาดพร้าว",line:"bts_green",idx:15},{id:"mo_chit",name:"หมอชิต",line:"bts_green",idx:16},{id:"saphan_khwai",name:"สะพานควาย",line:"bts_green",idx:17},{id:"ari",name:"อารีย์",line:"bts_green",idx:19},{id:"victory",name:"อนุสาวรีย์ชัยฯ",line:"bts_green",idx:21},{id:"phaya_thai",name:"พญาไท",line:"bts_green",idx:22},{id:"siam",name:"สยาม",line:"bts_green",idx:24},{id:"chit_lom",name:"ชิดลม",line:"bts_green",idx:25},{id:"phloen_chit",name:"เพลินจิต",line:"bts_green",idx:26},{id:"nana",name:"นานา",line:"bts_green",idx:27},{id:"asok",name:"อโศก",line:"bts_green",idx:28},{id:"phrom_phong",name:"พร้อมพงษ์",line:"bts_green",idx:29},{id:"thong_lo",name:"ทองหล่อ",line:"bts_green",idx:30},{id:"ekkamai",name:"เอกมัย",line:"bts_green",idx:31},{id:"phra_khanong",name:"พระโขนง",line:"bts_green",idx:32},{id:"on_nut",name:"อ่อนนุช",line:"bts_green",idx:33},{id:"bang_chak",name:"บางจาก",line:"bts_green",idx:34},{id:"udom_suk",name:"อุดมสุข",line:"bts_green",idx:36},{id:"bang_na",name:"บางนา",line:"bts_green",idx:37},{id:"bearing",name:"แบริ่ง",line:"bts_green",idx:38},{id:"samrong_bts",name:"สำโรง (BTS)",line:"bts_green",idx:39},{id:"kheha",name:"เคหะฯ",line:"bts_green",idx:47},{id:"nat_stadium",name:"สนามกีฬาแห่งชาติ",line:"bts_silom",idx:0},{id:"siam_l",name:"สยาม (สายสีลม)",line:"bts_silom",idx:1},{id:"sala_daeng",name:"ศาลาแดง",line:"bts_silom",idx:3},{id:"chong_nonsi",name:"ช่องนนทรี",line:"bts_silom",idx:4},{id:"saphan_taksin",name:"สะพานตากสิน",line:"bts_silom",idx:7},{id:"wongwian_yai",name:"วงเวียนใหญ่",line:"bts_silom",idx:9},{id:"bang_wa",name:"บางหว้า",line:"bts_silom",idx:13},{id:"tha_phra",name:"ท่าพระ",line:"mrt_blue",idx:0},{id:"tao_poon",name:"เตาปูน",line:"mrt_blue",idx:9},{id:"bang_sue",name:"บางซื่อ",line:"mrt_blue",idx:10},{id:"chatuchak",name:"สวนจตุจักร",line:"mrt_blue",idx:12},{id:"phahon_mrt",name:"พหลโยธิน (MRT)",line:"mrt_blue",idx:13},{id:"lat_phrao_mrt",name:"ลาดพร้าว (MRT)",line:"mrt_blue",idx:14},{id:"ratchadaphisek",name:"รัชดาภิเษก",line:"mrt_blue",idx:15},{id:"huai_khwang",name:"ห้วยขวาง",line:"mrt_blue",idx:17},{id:"rama9",name:"พระราม 9",line:"mrt_blue",idx:19},{id:"phetchaburi",name:"เพชรบุรี",line:"mrt_blue",idx:20},{id:"sukhumvit_mrt",name:"สุขุมวิท (MRT)",line:"mrt_blue",idx:21},{id:"silom_mrt",name:"สีลม (MRT)",line:"mrt_blue",idx:25},{id:"hua_lamphong",name:"หัวลำโพง",line:"mrt_blue",idx:27},{id:"bang_wa_mrt",name:"บางหว้า (MRT)",line:"mrt_blue",idx:34},{id:"lak_song",name:"หลักสอง",line:"mrt_blue",idx:38},{id:"tao_poon_p",name:"เตาปูน (สายสีม่วง)",line:"mrt_purple",idx:14},{id:"wong_sawang",name:"วงศ์สว่าง",line:"mrt_purple",idx:12},{id:"nonthaburi_cc",name:"ศูนย์ราชการนนทบุรี",line:"mrt_purple",idx:9},{id:"bang_son",name:"บางซ่อน",line:"mrt_purple",idx:13},{id:"klang_bang_phai",name:"คลองบางไผ่",line:"mrt_purple",idx:0},{id:"lat_phrao_y",name:"ลาดพร้าว (สายสีเหลือง)",line:"mrt_yellow",idx:0},{id:"chokchai4",name:"โชคชัย 4",line:"mrt_yellow",idx:2},{id:"phatthanakan",name:"พัฒนาการ",line:"mrt_yellow",idx:13},{id:"si_nut",name:"สี่แยกอ่อนนุช",line:"mrt_yellow",idx:15},{id:"on_nut_y",name:"อ่อนนุช (สายสีเหลือง)",line:"mrt_yellow",idx:16},{id:"samrong_y",name:"สำโรง (สายสีเหลือง)",line:"mrt_yellow",idx:18},{id:"phaya_thai_arl",name:"พญาไท (ARL)",line:"arl",idx:0},{id:"ratchaprarop",name:"ราชปรารภ",line:"arl",idx:1},{id:"makkasan",name:"มักกะสัน",line:"arl",idx:2},{id:"ramkhamhaeng",name:"รามคำแหง",line:"arl",idx:3},{id:"hua_mak",name:"หัวหมาก",line:"arl",idx:4},{id:"lat_krabang",name:"ลาดกระบัง",line:"arl",idx:5},{id:"suvarnabhumi",name:"สุวรรณภูมิ",line:"arl",idx:6}],X={};F.forEach(r=>{X[r.id]=r});function ee(r,e,t,i="adult"){const a=Z[r];if(!a)return{fare:0,stationsCount:0,duration:0};const n=Math.abs(e-t);if(n===0)return{fare:0,stationsCount:0,duration:0};const o=Math.min(a.fareBase+n*a.farePerSt,a.fareMax);return{fare:Math.round(o*(a.pax[i]||1)),stationsCount:n,duration:Math.round(n*a.timePerSt)}}function te(r){const e=new Date,t=e.getHours(),i=e.getMinutes(),a=t*60+i,n={bts_green:{first:5*60+30,last:24*60+0,peakFreq:3,offFreq:7},bts_silom:{first:5*60+30,last:24*60+0,peakFreq:3,offFreq:7},mrt_blue:{first:5*60+30,last:24*60+0,peakFreq:4,offFreq:8},mrt_purple:{first:5*60+30,last:23*60+59,peakFreq:5,offFreq:10},mrt_yellow:{first:5*60+30,last:23*60+30,peakFreq:4,offFreq:8},arl:{first:6*60+0,last:24*60+0,peakFreq:10,offFreq:15}},o=n[r]||n.bts_green,s=t>=7&&t<9||t>=17&&t<20,d=s?o.peakFreq:o.offFreq;let l=a;if(a<o.first)l=o.first;else if(a>=o.last)l=o.first+24*60;else{const v=(a-o.first)%d;l=a+(v===0?0:d-v)}const c=l-a,p=v=>{const f=Math.floor(v%1440/60),g=v%60;return`${String(f).padStart(2,"0")}:${String(g).padStart(2,"0")} น.`};return{firstTrain:p(o.first),lastTrain:p(o.last),frequencyPeak:`${o.peakFreq}-${o.peakFreq+1} นาที/ขบวน`,frequencyOffPeak:`${o.offFreq}-${o.offFreq+1} นาที/ขบวน`,nextTrain:p(l),waitMinutes:c,isPeak:s,currentFreq:d}}const D=(()=>{const r={};return F.forEach(e=>{(r[e.line]=r[e.line]||[]).push({name:e.name,index:e.idx})}),Object.values(r).forEach(e=>e.sort((t,i)=>t.index-i.index)),r})();function ie(r,e,t){const i=[{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่จตุจักร/หมอชิต",kw:["หมอชิต","จตุจักร"]},{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่สุขุมวิท/อโศก",kw:["อโศก","สุขุมวิท"]},{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่สีลม/ศาลาแดง",kw:["ศาลาแดง","สีลม"]},{text:"เชื่อมต่อ Airport Rail Link ที่พญาไท",kw:["พญาไท"]},{text:"เชื่อมต่อ MRT สีม่วง ที่เตาปูน",kw:["เตาปูน"]},{text:"เชื่อมต่อ MRT สีเหลือง ที่ลาดพร้าว",kw:["ลาดพร้าว"]},{text:"เชื่อมต่อ MRT สีเหลือง/BTS ที่สำโรง",kw:["สำโรง"]}];for(const a of i)if(a.kw.some(n=>e.includes(n)||t.includes(n)))return`💡 ${a.text}`;return null}function P(){try{return JSON.parse(localStorage.getItem("commuter_fav_routes")||"[]")}catch{return[]}}function ae(r,e,t,i,a,n,o){const s=P();return s.push({id:Date.now(),name:r,start:{lat:e,lng:t,name:n},end:{lat:i,lng:a,name:o}}),localStorage.setItem("commuter_fav_routes",JSON.stringify(s)),s}function ne(r){const e=P().filter(t=>t.id!==r);return localStorage.setItem("commuter_fav_routes",JSON.stringify(e)),e}function se(r,e,t,i){const n=I(t-r),o=I(i-e),s=Math.sin(n/2)*Math.sin(n/2)+Math.cos(I(r))*Math.cos(I(t))*Math.sin(o/2)*Math.sin(o/2);return 6371*(2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s)))}function I(r){return r*(Math.PI/180)}class oe{constructor(e,t,i){this.trafficContainer=document.getElementById(e),this.transitContainer=document.getElementById(t),this.state=i,this.map=null,this.tileLayer=null,this.routePolyline=null,this.startMarker=null,this.endMarker=null,this.routePoints={start:null,end:null},this.cctvIntervals=[]}async init(){this.trafficContainer&&(this.renderTrafficTab(),this.initMap(),this.initCCTVs(),this.setupTrafficEvents()),this.renderTransitTab(),this.setupTransitEvents(),document.addEventListener("theme-changed",()=>this.updateMapTheme())}renderTrafficTab(){this.trafficContainer.innerHTML=`
      <div class="map-dashboard-grid">
        <div class="map-outer">
          <div id="trafficMap"></div>
          <div class="map-overlay-card">
            <h3><i data-lucide="navigation"></i> วางแผนการเดินทาง (BKK Route Planner)</h3>
            <div class="route-input-group">
              <div class="route-field" id="routeStartBtn" style="cursor: pointer;">
                <i data-lucide="circle-dot" style="color: var(--cyan);"></i>
                <span id="routeStartText" class="empty">จุดเริ่มต้น (คลิกเลือกในแผนที่)</span>
              </div>
              <div class="route-field" id="routeEndBtn" style="cursor: pointer;">
                <i data-lucide="map-pin" style="color: var(--red);"></i>
                <span id="routeEndText" class="empty">จุดหมายปลายทาง (คลิกเลือกในแผนที่)</span>
              </div>
            </div>
            <div class="route-actions">
              <button class="btn btn-primary" id="btnUseMyLocation" style="flex: 1; font-size: 0.75rem; padding: 8px 12px;">
                <i data-lucide="locate" style="width: 14px; height: 14px;"></i> ใช้พิกัดปัจจุบัน
              </button>
              <button class="btn" id="btnResetRoute" style="font-size: 0.75rem; padding: 8px 12px;">ล้างข้อมูล</button>
            </div>
            <div class="travel-stats" id="routeTravelStats">
              <div class="stat-row"><span>ระยะทาง:</span><b id="statDistance">-- กม.</b></div>
              <div class="stat-row"><span>เวลาเดินทางโดยประมาณ:</span><b id="statDuration">-- นาที</b></div>
              <div class="stat-row"><span>ความหนาแน่นจราจร:</span><span id="statTrafficBadge" class="traffic-status-pill traffic-pill-green">ราบรื่น</span></div>
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
              <i data-lucide="video" style="color: var(--red);"></i> กล้อง CCTV แยกสำคัญ (Live Simulation)
            </h3>
            <p style="font-size: 0.7rem; color: var(--muted); margin-bottom: 16px;">รายงานสถานะจราจรแบบเรียลไทม์จากระบบจำลองอัจฉริยะ</p>
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
                <div class="cctv-header"><span class="cctv-title">แยกสาทร-นราธิวาส</span><span class="cctv-live-dot">LIVE</span></div>
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
    `,lucide.createIcons()}initMap(){const e=this.state.getCoords();this.map=L.map("trafficMap",{zoomControl:!1}).setView([e.lat,e.lon],13),L.control.zoom({position:"bottomright"}).addTo(this.map),this.updateMapTheme(),this.map.on("click",t=>this.handleMapClick(t))}updateMapTheme(){if(!this.map)return;this.tileLayer&&this.map.removeLayer(this.tileLayer);const t=document.body.classList.contains("light-theme")?"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png":"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";this.tileLayer=L.tileLayer(t,{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'}).addTo(this.map)}handleMapClick(e){const{lat:t,lng:i}=e.latlng;this.routePoints.start?this.routePoints.end?(this.resetRouting(),this.setRouteStart(t,i,`พิกัด: ${t.toFixed(4)}, ${i.toFixed(4)}`)):(this.setRouteEnd(t,i,`พิกัด: ${t.toFixed(4)}, ${i.toFixed(4)}`),this.calculateRoute()):this.setRouteStart(t,i,`พิกัด: ${t.toFixed(4)}, ${i.toFixed(4)}`)}setRouteStart(e,t,i){this.routePoints.start={lat:e,lng:t,name:i};const a=document.getElementById("routeStartText");a.innerText=i,a.classList.remove("empty"),this.startMarker&&this.map.removeLayer(this.startMarker),this.startMarker=L.marker([e,t],{icon:L.divIcon({className:"custom-map-marker-start",html:'<div style="width:14px;height:14px;background:var(--cyan);border:2px solid white;border-radius:50%;box-shadow:0 0 10px var(--cyan);"></div>',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(this.map)}setRouteEnd(e,t,i){this.routePoints.end={lat:e,lng:t,name:i};const a=document.getElementById("routeEndText");a.innerText=i,a.classList.remove("empty"),this.endMarker&&this.map.removeLayer(this.endMarker),this.endMarker=L.marker([e,t],{icon:L.divIcon({className:"custom-map-marker-end",html:'<div style="width:14px;height:14px;background:var(--red);border:2px solid white;border-radius:50%;box-shadow:0 0 10px var(--red);"></div>',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(this.map)}async calculateRoute(){if(!this.routePoints.start||!this.routePoints.end)return;const e=this.routePoints.start,t=this.routePoints.end,i=`https://router.project-osrm.org/route/v1/driving/${e.lng},${e.lat};${t.lng},${t.lat}?overview=full&geometries=geojson`;try{const n=await(await fetch(i)).json();if(n.routes&&n.routes.length>0){const o=n.routes[0],s=o.geometry.coordinates.map(u=>[u[1],u[0]]);this.routePolyline&&this.map.removeLayer(this.routePolyline),this.routePolyline=L.polyline(s,{color:"var(--cyan)",weight:5,opacity:.85,className:"glowing-polyline"}).addTo(this.map),this.map.fitBounds(this.routePolyline.getBounds(),{padding:[40,40]});const d=(o.distance/1e3).toFixed(1),l=Math.round(o.duration/60);document.getElementById("statDistance").innerText=`${d} กม.`;const c=new Date().getHours();let p=1,v="การจราจรไหลลื่น (ราบรื่น)",f="traffic-pill-green";c>=7&&c<=9||c>=17&&c<=19?(p=1.6,v="รถติดขัดหนาแน่น (วิกฤต)",f="traffic-pill-red"):(c>=12&&c<=14||c>=16&&c<17)&&(p=1.25,v="รถหนาแน่นปานกลาง (ชะลอตัว)",f="traffic-pill-yellow"),document.getElementById("statDuration").innerText=`${Math.round(l*p)} นาที`;const g=document.getElementById("statTrafficBadge");g.innerText=v,g.className=`traffic-status-pill ${f}`,document.getElementById("routeTravelStats").style.display="block"}else throw new Error("no route")}catch{this.routePolyline&&this.map.removeLayer(this.routePolyline),this.routePolyline=L.polyline([[e.lat,e.lng],[t.lat,t.lng]],{color:"var(--cyan)",weight:4,dashArray:"5, 10",opacity:.7}).addTo(this.map);const n=se(e.lat,e.lng,t.lat,t.lng).toFixed(1);document.getElementById("statDistance").innerText=`${n} กม. (คาดการณ์)`,document.getElementById("statDuration").innerText=`${Math.round(n*2.5)} นาที`;const o=document.getElementById("statTrafficBadge");o.innerText="การจราจรไม่พร้อมแสดง (Offline Mode)",o.className="traffic-status-pill traffic-pill-yellow",document.getElementById("routeTravelStats").style.display="block"}}resetRouting(){this.routePoints.start=null,this.routePoints.end=null;const e=document.getElementById("routeStartText");e.innerText="จุดเริ่มต้น (คลิกเลือกในแผนที่)",e.classList.add("empty");const t=document.getElementById("routeEndText");t.innerText="จุดหมายปลายทาง (คลิกเลือกในแผนที่)",t.classList.add("empty"),this.startMarker&&this.map.removeLayer(this.startMarker),this.endMarker&&this.map.removeLayer(this.endMarker),this.routePolyline&&this.map.removeLayer(this.routePolyline),this.startMarker=null,this.endMarker=null,this.routePolyline=null,document.getElementById("routeTravelStats").style.display="none"}setupTrafficEvents(){var e,t,i;(e=document.getElementById("btnResetRoute"))==null||e.addEventListener("click",()=>this.resetRouting()),(t=document.getElementById("btnUseMyLocation"))==null||t.addEventListener("click",()=>{const a=this.state.getCoords();this.setRouteStart(a.lat,a.lon,`ตำแหน่งของฉัน (${a.name})`),this.routePoints.end&&this.calculateRoute()}),(i=document.getElementById("btnSaveFavRoute"))==null||i.addEventListener("click",()=>{const a=document.getElementById("favRouteNameInput"),n=a.value.trim()||`เส้นทาง ${new Date().toLocaleDateString("th-TH")}`,o=this.routePoints.start,s=this.routePoints.end;o&&s&&(ae(n,o.lat,o.lng,s.lat,s.lng,o.name,s.name),a.value="",this.renderSavedRoutes(),this.showToast("บันทึกสำเร็จ",`บันทึกเส้นทาง "${n}" เรียบร้อยแล้ว`))}),this.renderSavedRoutes()}renderSavedRoutes(){const e=document.getElementById("savedRoutesList");if(!e)return;const t=P();if(t.length===0){e.innerHTML='<div style="text-align:center;color:var(--muted2);font-size:0.75rem;padding:12px 0;">ไม่มีเส้นทางที่บันทึกไว้</div>';return}e.innerHTML=t.map(i=>`
      <div class="todo-item" style="padding:10px 12px;gap:8px;">
        <div style="flex-grow:1;cursor:pointer;text-align:left;" class="saved-route-trigger" data-id="${i.id}">
          <div style="font-weight:500;font-size:0.8rem;color:var(--cyan);">${i.name}</div>
          <div style="font-size:0.65rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:220px;">
            ${i.start.name.replace("พิกัด: ","")} ➔ ${i.end.name.replace("พิกัด: ","")}
          </div>
        </div>
        <button class="todo-del-btn route-del-btn" data-id="${i.id}" aria-label="ลบเส้นทาง">
          <i data-lucide="trash" style="width:13px;height:13px;"></i>
        </button>
      </div>
    `).join(""),lucide.createIcons(),e.querySelectorAll(".saved-route-trigger").forEach(i=>{i.addEventListener("click",()=>{const a=parseInt(i.dataset.id),n=t.find(o=>o.id===a);n&&(this.resetRouting(),this.setRouteStart(n.start.lat,n.start.lng,n.start.name),this.setRouteEnd(n.end.lat,n.end.lng,n.end.name),this.calculateRoute(),this.showToast("โหลดเส้นทาง",`แสดงเส้นทาง: ${n.name}`))})}),e.querySelectorAll(".route-del-btn").forEach(i=>{i.addEventListener("click",a=>{a.stopPropagation(),ne(parseInt(i.dataset.id)),this.renderSavedRoutes()})})}initCCTVs(){this.cctvIntervals.forEach(clearInterval),this.cctvIntervals=[];const e=t=>{const i=document.getElementById(t);if(!i)return;const a=i.getContext("2d");i.width=320,i.height=180;const n=Array.from({length:6},()=>({x:Math.random()*i.width,y:40+Math.random()*100,speed:1.5+Math.random()*2.5,color:["#00f2fe","#ffd740","#ff4d4d","#ffffff","#a855f7"][Math.floor(Math.random()*5)],size:5+Math.random()*8,dir:Math.random()>.5?1:-1})),o=()=>{a.fillStyle="#111827",a.fillRect(0,0,i.width,i.height),a.strokeStyle="rgba(255,255,255,0.08)",a.lineWidth=4,a.beginPath(),a.moveTo(0,90),a.lineTo(320,90),a.moveTo(160,0),a.lineTo(160,180),a.stroke(),a.strokeStyle="rgba(255,255,255,0.15)",a.lineWidth=1,a.setLineDash([8,8]),a.beginPath(),a.moveTo(0,65),a.lineTo(320,65),a.moveTo(0,115),a.lineTo(320,115),a.stroke(),a.setLineDash([]),n.forEach(s=>{s.x+=s.speed*s.dir,s.dir===1&&s.x>i.width+10&&(s.x=-10),s.dir===-1&&s.x<-10&&(s.x=i.width+10),a.fillStyle=s.color,a.beginPath(),a.roundRect(s.x,s.y,s.size*1.6,s.size,2),a.fill(),a.fillStyle=s.dir===1?"#ff4d4d":"#ffd740";const d=s.dir===1?s.x:s.x+s.size*1.6-2;a.fillRect(d,s.y+1,2,2),a.fillRect(d,s.y+s.size-3,2,2)}),a.fillStyle="rgba(0,242,254,0.03)";for(let s=0;s<i.height;s+=3)a.fillRect(0,s,i.width,1);Math.random()>.98&&(a.fillStyle="rgba(255,255,255,0.12)",a.fillRect(0,Math.random()*i.height,i.width,4)),a.fillStyle="#ffffff",a.font="7px monospace",a.fillText(new Date().toLocaleString("en-US"),200,172),a.fillStyle="var(--cyan)",a.fillText("REC ●",15,172)};this.cctvIntervals.push(setInterval(o,1e3/24))};e("cctvAsoke"),e("cctvRama9"),e("cctvSathorn")}renderTransitTab(){this.transitContainer.innerHTML=`
      <div class="transit-grid">
        <div>
          <!-- Status Board -->
          <div class="glass-card" style="margin-bottom: 24px;">
            <h3 style="font-size:0.85rem;display:flex;align-items:center;gap:8px;margin-bottom:16px;">
              <i data-lucide="radio" style="color:var(--cyan);"></i> สถานะระบบรางบีทีเอส-เอ็มอาร์ที
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
                  <div style="font-size:0.65rem;color:var(--muted);">🌅 ขบวนแรก</div>
                  <div id="firstTrainTime" style="font-size:1.15rem;font-weight:600;color:var(--cyan);margin-top:4px;">--:--</div>
                </div>
                <div class="sub-tile" style="background:rgba(255,255,255,0.01);">
                  <div style="font-size:0.65rem;color:var(--muted);">🌃 ขบวนสุดท้าย</div>
                  <div id="lastTrainTime" style="font-size:1.15rem;font-weight:600;color:var(--red);margin-top:4px;">--:--</div>
                </div>
                <div class="sub-tile" style="background:rgba(255,255,255,0.01);">
                  <div style="font-size:0.65rem;color:var(--muted);">🚇 ขบวนถัดไป</div>
                  <div id="nextTrainTime" style="font-size:1.15rem;font-weight:600;color:var(--yellow);margin-top:4px;">--:--</div>
                </div>
                <div class="sub-tile" style="background:rgba(255,255,255,0.01);">
                  <div style="font-size:0.65rem;color:var(--muted);">⏱ รอขบวน</div>
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
    `,lucide.createIcons()}setupTransitEvents(){var f;if(!this.transitContainer)return;this.refreshTransitStatus(),(f=document.getElementById("btnRefreshTransitStatus"))==null||f.addEventListener("click",()=>{this.refreshTransitStatus(),this.showToast("อัพเดทสำเร็จ","อัพเดทสถานะรถไฟฟ้าแล้ว")});const e=document.getElementById("timeSystemSelect"),t=document.getElementById("timeStationSelect"),i=(g,u)=>{const m=document.getElementById(g);m&&(m.innerText=u)},a=(g,u)=>{const m=document.getElementById(g);m&&(m.innerHTML=u)},n=()=>{const g=e.value,u=D[g]||[];t.innerHTML=u.map(m=>`<option value="${m.name}">${m.name}</option>`).join(""),o()},o=()=>{const g=e==null?void 0:e.value;if(!g)return;const u=te(g);i("firstTrainTime",u.firstTrain),i("lastTrainTime",u.lastTrain),i("nextTrainTime",u.nextTrain||"--:--"),i("freqPeak",u.frequencyPeak),i("freqOff",u.frequencyOffPeak),i("waitMinsText",u.waitMinutes!=null?u.waitMinutes===0?"กำลังจะถึง!":`อีก ${u.waitMinutes} นาที`:"--"),a("peakStatusText",u.isPeak?'<b style="color:var(--red);">⚡ ช่วงเร่งด่วน</b>':'<b style="color:var(--cyan);">✅ ช่วงปกติ</b>')};e.addEventListener("change",n),t.addEventListener("change",o),n();const s=document.getElementById("fareSystemSelect"),d=document.getElementById("fareOriginSelect"),l=document.getElementById("fareDestSelect"),c=document.getElementById("farePassengerSelect"),p=()=>{const g=s.value,u=D[g]||[],m=u.map(y=>`<option value="${y.index}">${y.name}</option>`).join("");d.innerHTML=m,l.innerHTML=m,u.length>1&&(l.selectedIndex=1),v()},v=()=>{var h,T;const g=s.value,u=parseInt(d.value),m=parseInt(l.value),y=c.value;if(isNaN(u)||isNaN(m))return;const b=ee(g,u,m,y);document.getElementById("fareVal").innerHTML=`${b.fare} <span>บาท</span>`,i("fareStationsCount",b.stationsCount),i("fareDuration",b.duration);const x=D[g]||[],w=((h=x.find(S=>S.index===u))==null?void 0:h.name)||"",M=((T=x.find(S=>S.index===m))==null?void 0:T.name)||"",k=ie(g,w,M),E=document.getElementById("interchangeAdvice");k?(E.innerHTML=`<i data-lucide="sparkles" style="width:14px;height:14px;flex-shrink:0;"></i> <span>${k}</span>`,E.style.display="flex",lucide.createIcons()):E.style.display="none",document.getElementById("fareResultDisplay").style.display="flex"};s.addEventListener("change",p),d.addEventListener("change",v),l.addEventListener("change",v),c.addEventListener("change",v),p()}refreshTransitStatus(){const e=document.getElementById("transitStatusContainer");if(!e)return;const t=new Date().getHours(),i=new Date().getMinutes(),a=t===8&&i>=15&&i<=35||t===18&&i>=20&&i<=45,n=t===8&&i>=30&&i<=55||t===18&&i>=10&&i<=30,o=[{name:"BTS สายสุขุมวิท (Green Line)",color:"#22c55e",delayed:a,delayNote:"ล่าช้า 3-5 นาที ขบวนหนาแน่นที่สยาม"},{name:"BTS สายสีลม (Silom Line)",color:"#15803d",delayed:!1},{name:"MRT สายเฉลิมรัชมงคล (Blue Line)",color:"#1e3a8a",delayed:n,delayNote:"ล่าช้า 8 นาที ระบบสัญญาณขัดข้องที่ห้วยขวาง"},{name:"MRT สายฉลองรัชธรรม (Purple Line)",color:"#7e22ce",delayed:!1},{name:"MRT สายสีเหลือง (Yellow Line)",color:"#ca8a04",delayed:!1},{name:"Airport Rail Link (ARL)",color:"#e11d48",delayed:!1}];e.innerHTML=o.map(s=>`
      <div class="transit-line">
        <div class="transit-line-info">
          <div class="transit-color-bar" style="background-color:${s.color};"></div>
          <div>
            <div class="transit-name">${s.name}</div>
            <div class="transit-desc">${s.delayed?`⚠️ ${s.delayNote}`:"🟢 บริการปกติความถี่คงที่"}</div>
          </div>
        </div>
        <div class="transit-status ${s.delayed?"delay":"normal"}">
          ${s.delayed?"🟡 ล่าช้า":"🟢 ปกติ"}
        </div>
      </div>
    `).join("")}showToast(e,t){const i=document.getElementById("toastContainer");if(!i)return;const a=document.createElement("div");a.className="toast-alert",a.innerHTML=`
      <div class="toast-icon" style="color:var(--cyan);"><i data-lucide="info" style="width:16px;height:16px;"></i></div>
      <div class="toast-content">
        <div class="toast-title" style="color:var(--cyan);">${e}</div>
        <div class="toast-msg">${t}</div>
      </div>
    `,i.appendChild(a),lucide.createIcons(),setTimeout(()=>{a.classList.add("dismissed"),setTimeout(()=>a.remove(),300)},4e3)}}class re{constructor(e,t){this.container=document.getElementById(e),this.state=t,this.pomoMinutes=25,this.pomoSeconds=0,this.pomoDuration=25*60,this.pomoTimer=null,this.pomoRunning=!1,this.pomoMode="work",this.waterGoal=8,this.waterCount=parseInt(localStorage.getItem("commuter_water_cups"))||0,this.audioCtx=null}async init(){this.render(),this.initTodo(),this.initWater(),this.initPomodoro(),this.initBattery(),this.initMemo(),this.initCalendar()}render(){this.container.innerHTML=`
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
    `,lucide.createIcons()}initTodo(){this.todoFilter="all",this.todos=JSON.parse(localStorage.getItem("commuter_todos"))||[{id:1,text:"หยิบร่มใส่กระเป๋า",category:"travel",checked:!1},{id:2,text:"เช็คสถานะการดีเลย์ของบีทีเอส",category:"travel",checked:!1},{id:3,text:"ตรวจความเรียบร้อยรอบบ้านก่อนออกเดินทาง",category:"home",checked:!0},{id:4,text:"ส่งรายงานประชุมเช้านี้",category:"work",checked:!1}],this.renderTodoItems();const e=document.getElementById("todoInput"),t=document.getElementById("btnTodoAdd"),i=()=>{const n=e.value.trim();if(!n)return;let o="work";const s=n.toLowerCase();s.includes("ร่ม")||s.includes("bts")||s.includes("รถ")||s.includes("ถนน")||s.includes("เดินทาง")?o="travel":(s.includes("บ้าน")||s.includes("ไฟ")||s.includes("น้ำ")||s.includes("แมว")||s.includes("หมา"))&&(o="home"),this.todos.push({id:Date.now(),text:n,category:o,checked:!1}),localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),e.value="",this.renderTodoItems()};t==null||t.addEventListener("click",i),e==null||e.addEventListener("keypress",n=>{n.key==="Enter"&&i()});const a=this.container.querySelectorAll(".todo-filter-btn");a.forEach(n=>{n.addEventListener("click",()=>{a.forEach(o=>{o.classList.remove("btn-primary"),o.classList.add("btn-secondary")}),n.classList.add("btn-primary"),n.classList.remove("btn-secondary"),this.todoFilter=n.dataset.filter,this.renderTodoItems()})})}renderTodoItems(){const e=document.getElementById("todoItemsContainer");if(!e)return;const t=this.todos.filter(i=>this.todoFilter==="all"?!0:i.category===this.todoFilter);if(t.length===0){e.innerHTML='<div style="text-align: center; font-size: 0.75rem; color: var(--muted2); padding: 24px 0;">ไม่มีรายการสิ่งที่จะทำในหมวดหมู่นี้</div>';return}e.innerHTML=t.map(i=>{const a=i.category==="work"?"💻":i.category==="travel"?"🚗":"🏠";return`
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
      `}).join(""),lucide.createIcons(),e.querySelectorAll(".todo-check-trigger").forEach(i=>{i.addEventListener("click",()=>{const a=parseInt(i.closest(".todo-item").dataset.id),n=this.todos.find(o=>o.id===a);n&&(n.checked=!n.checked,localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),this.renderTodoItems())})}),e.querySelectorAll(".todo-delete-trigger").forEach(i=>{i.addEventListener("click",a=>{a.stopPropagation();const n=parseInt(i.closest(".todo-item").dataset.id);this.todos=this.todos.filter(o=>o.id!==n),localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),this.renderTodoItems()})})}initWater(){var e,t;this.updateWaterDisplay(),(e=document.getElementById("btnWaterAdd"))==null||e.addEventListener("click",()=>{this.waterCount<16&&(this.waterCount++,localStorage.setItem("commuter_water_cups",this.waterCount),this.updateWaterDisplay())}),(t=document.getElementById("btnWaterSub"))==null||t.addEventListener("click",()=>{this.waterCount>0&&(this.waterCount--,localStorage.setItem("commuter_water_cups",this.waterCount),this.updateWaterDisplay())})}updateWaterDisplay(){const e=document.getElementById("waterWave"),t=document.getElementById("waterDisplay");if(!e||!t)return;const i=Math.min(100,Math.round(this.waterCount/this.waterGoal*100));e.style.height=`${i}%`,t.innerHTML=`${this.waterCount} / ${this.waterGoal} <span style="font-size: 0.85rem; color: var(--muted);">แก้ว (${this.waterCount*250} มล.)</span>`}initPomodoro(){var i,a,n;const e=document.getElementById("btnPomoStart"),t=document.getElementById("btnPomoReset");document.getElementById("pomoCircle"),e==null||e.addEventListener("click",()=>{this.pomoRunning?this.pausePomodoro():this.startPomodoro()}),t==null||t.addEventListener("click",()=>{this.resetPomodoro()}),(i=document.getElementById("btnPomoWork"))==null||i.addEventListener("click",()=>this.setPomoMode("work",25)),(a=document.getElementById("btnPomoShort"))==null||a.addEventListener("click",()=>this.setPomoMode("short_break",5)),(n=document.getElementById("btnPomoLong"))==null||n.addEventListener("click",()=>this.setPomoMode("long_break",15))}setPomoMode(e,t){this.pausePomodoro(),this.pomoMode=e,this.pomoMinutes=t,this.pomoSeconds=0,this.pomoDuration=t*60;const i=document.getElementById("pomoModeText"),a=document.getElementById("pomoCircle");i&&(e==="work"?(i.innerText="โฟกัสงาน (WORK MODE)",a&&(a.style.stroke="var(--cyan)")):e==="short_break"?(i.innerText="พักสั้น (SHORT BREAK)",a&&(a.style.stroke="var(--green)")):(i.innerText="พักยาว (LONG BREAK)",a&&(a.style.stroke="var(--purple)"))),this.updatePomoDisplay()}startPomodoro(){this.pomoRunning=!0;const e=document.getElementById("btnPomoStart");e&&(e.innerHTML='<i data-lucide="pause" style="width: 12px; height: 12px;"></i> หยุด',lucide.createIcons()),this.pomoTimer=setInterval(()=>{if(this.pomoSeconds===0){if(this.pomoMinutes===0){this.triggerPomoAlarm(),this.resetPomodoro();return}this.pomoMinutes--,this.pomoSeconds=59}else this.pomoSeconds--;this.updatePomoDisplay()},1e3)}pausePomodoro(){this.pomoRunning=!1,clearInterval(this.pomoTimer);const e=document.getElementById("btnPomoStart");e&&(e.innerHTML='<i data-lucide="play" style="width: 12px; height: 12px;"></i> เริ่ม',lucide.createIcons())}resetPomodoro(){this.pausePomodoro();const e=this.pomoMode==="work"?25:this.pomoMode==="short_break"?5:15;this.pomoMinutes=e,this.pomoSeconds=0,this.pomoDuration=e*60,this.updatePomoDisplay()}updatePomoDisplay(){const e=document.getElementById("pomoDisplay"),t=document.getElementById("pomoCircle");if(!e)return;const i=`${String(this.pomoMinutes).padStart(2,"0")}:${String(this.pomoSeconds).padStart(2,"0")}`;if(e.innerText=i,t){const o=283*(1-(this.pomoMinutes*60+this.pomoSeconds)/this.pomoDuration);t.style.strokeDashoffset=o}}triggerPomoAlarm(){try{this.audioCtx||(this.audioCtx=new(window.AudioContext||window.webkitAudioContext));const t=this.audioCtx.createOscillator(),i=this.audioCtx.createGain();t.connect(i),i.connect(this.audioCtx.destination),t.type="sine",t.frequency.setValueAtTime(659.25,this.audioCtx.currentTime),t.frequency.setValueAtTime(830.61,this.audioCtx.currentTime+.15),t.frequency.setValueAtTime(987.77,this.audioCtx.currentTime+.3),i.gain.setValueAtTime(0,this.audioCtx.currentTime),i.gain.linearRampToValueAtTime(.3,this.audioCtx.currentTime+.05),i.gain.exponentialRampToValueAtTime(.01,this.audioCtx.currentTime+.8),t.start(),t.stop(this.audioCtx.currentTime+.9)}catch(t){console.warn("Audio Context init failed (user interaction required):",t)}const e=this.pomoMode==="work"?"ครบเวลาแล้ว! ได้เวลาพักผ่อนแล้วพักสติ":"ได้เวลาลุยต่อแล้ว! เริ่มโฟกัสงานอีกครั้ง";alert(`🛎️ Pomodoro Alarm:
${e}`)}initBattery(){const e=document.getElementById("batteryLevelFill"),t=document.getElementById("batteryPct"),i=document.getElementById("batteryStatusText");if(!e||!t||!i)return;const a=n=>{const o=Math.round(n.level*100);t.innerText=`${o}%`,e.style.width=`${o}%`,o<=20&&!n.charging?(e.style.backgroundColor="var(--red)",e.style.boxShadow="0 0 10px var(--red)"):n.charging?(e.style.backgroundColor="var(--cyan)",e.style.boxShadow="0 0 10px var(--cyan)"):(e.style.backgroundColor="var(--green)",e.style.boxShadow="0 0 10px var(--green)"),i.innerText=n.charging?"กำลังชาร์จไฟพ่วงอยู่ (Charging)":`กำลังจ่ายกระแสไฟ (${Math.round(n.dischargingTime/60)||0} ชม. คงเหลือ)`};navigator.getBattery?navigator.getBattery().then(n=>{a(n),n.addEventListener("levelchange",()=>a(n)),n.addEventListener("chargingchange",()=>a(n))}):(t.innerText="92%",e.style.width="92%",i.innerText="ไม่มี Battery API รองรับ (โหมดเดสก์ท็อป)")}initMemo(){const e=document.getElementById("memoTextarea"),t=document.getElementById("memoSaveStatus");if(!e||!t)return;e.value=localStorage.getItem("commuter_memo")||"";let i;e.addEventListener("input",()=>{t.innerHTML='<i data-lucide="loader" style="width:12px;height:12px;animation:spin 1s linear infinite;"></i> กำลังบันทึกแบบร่าง...',lucide.createIcons(),i&&clearTimeout(i),i=setTimeout(()=>{localStorage.setItem("commuter_memo",e.value),t.innerHTML='<i data-lucide="check" style="width:12px;height:12px;"></i> บันทึกในบราวเซอร์สำเร็จแล้ว',lucide.createIcons()},800)})}initCalendar(){var i,a,n;this.calDate=new Date,this.calSelectedDay=this.calDate.getDate(),this.calendarNotes=JSON.parse(localStorage.getItem("commuter_calendar_notes"))||{};const e=()=>{const o=this.calDate.getFullYear(),s=this.calDate.getMonth(),d=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];document.getElementById("calendarMonthYear").innerText=`${d[s]} ${o+543}`;let c=["อา","จ","อ","พ","พฤ","ศ","ส"].map(m=>`<div style="font-weight:600; color:var(--muted); margin-bottom:6px;">${m}</div>`).join("");const p=new Date(o,s,1).getDay(),v=new Date(o,s+1,0).getDate();for(let m=0;m<p;m++)c+="<div></div>";const f=new Date,g=f.getFullYear()===o&&f.getMonth()===s;for(let m=1;m<=v;m++){const y=g&&f.getDate()===m,b=this.calSelectedDay===m,x=`${o}-${String(s+1).padStart(2,"0")}-${String(m).padStart(2,"0")}`,w=!!this.calendarNotes[x];c+=`
          <div class="calendar-day-tile ${y?"today":""} ${b?"selected":""}" 
               data-day="${m}"
               style="padding: 8px 4px; border-radius: 6px; cursor: pointer; position: relative; transition: var(--transition);
                      border: 1px solid ${b?"var(--cyan)":"transparent"};
                      background: ${y?"rgba(0, 242, 254, 0.1)":w?"rgba(0, 242, 254, 0.05)":"transparent"};">
            ${m}
            ${w?'<div style="position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; background: var(--cyan); border-radius: 50%;"></div>':""}
          </div>
        `}const u=document.getElementById("calendarGrid");u&&(u.innerHTML=c,u.querySelectorAll(".calendar-day-tile").forEach(m=>{m.addEventListener("click",()=>{u.querySelectorAll(".calendar-day-tile").forEach(y=>{y.style.borderColor="transparent"}),m.style.borderColor="var(--cyan)",this.calSelectedDay=parseInt(m.dataset.day),t()})}))},t=()=>{const o=this.calDate.getFullYear(),s=this.calDate.getMonth()+1,d=`${o}-${String(s).padStart(2,"0")}-${String(this.calSelectedDay).padStart(2,"0")}`;document.getElementById("calSelectedDayText").innerHTML=`<span>โน้ตตารางเวลาวันที่: ${this.calSelectedDay}/${s}/${o+543}</span>`,document.getElementById("calDayNoteInput").value=this.calendarNotes[d]||""};(i=document.getElementById("btnCalPrev"))==null||i.addEventListener("click",()=>{this.calDate.setMonth(this.calDate.getMonth()-1),this.calSelectedDay=1,e(),t()}),(a=document.getElementById("btnCalNext"))==null||a.addEventListener("click",()=>{this.calDate.setMonth(this.calDate.getMonth()+1),this.calSelectedDay=1,e(),t()}),(n=document.getElementById("btnSaveCalNote"))==null||n.addEventListener("click",()=>{const o=this.calDate.getFullYear(),s=this.calDate.getMonth()+1,d=`${o}-${String(s).padStart(2,"0")}-${String(this.calSelectedDay).padStart(2,"0")}`,l=document.getElementById("calDayNoteInput").value.trim();l?this.calendarNotes[d]=l:delete this.calendarNotes[d],localStorage.setItem("commuter_calendar_notes",JSON.stringify(this.calendarNotes)),e(),t();const c=document.getElementById("btnSaveCalNote");if(c){const p=c.innerHTML;c.innerHTML="✓ บันทึกแล้ว!",c.style.background="#22c55e",c.style.borderColor="#22c55e",setTimeout(()=>{c.innerHTML=p,c.style.background="",c.style.borderColor=""},1800)}}),e(),t()}}class de{constructor(e,t){this.container=document.getElementById(e),this.state=t}async init(){this.renderSkeleton(),await this.fetchAndRender()}renderSkeleton(){this.container.innerHTML=`
      <div class="emergency-grid">
        <div class="glass-card skeleton" style="height: 350px;"></div>
        <div class="glass-card skeleton" style="height: 350px;"></div>
      </div>
    `,lucide.createIcons()}async fetchAndRender(){var e;try{const t=this.state.getCoords();let i=0;try{i=(await A(t.lat,t.lon)).current.weather_code}catch(o){console.warn("Could not load weather for safety check, using normal code",o)}const a=H(i),n=Y();this.render(a,n),this.setupEvents()}catch(t){console.error(t),this.container.innerHTML=`
        <div class="glass-card glow-card-red" style="text-align: center; padding: 40px;">
          <i data-lucide="shield-alert" style="width: 48px; height: 48px; color: var(--red); margin-bottom: 16px;"></i>
          <h3 style="color: var(--red);">เกิดข้อผิดพลาดในการโหลดข้อมูลความปลอดภัย</h3>
          <p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 20px;">${t.message}</p>
          <button class="btn btn-primary" id="retryEmergencyBtn"><i data-lucide="refresh-cw"></i> ลองใหม่</button>
        </div>
      `,lucide.createIcons(),(e=document.getElementById("retryEmergencyBtn"))==null||e.addEventListener("click",()=>this.init())}}render(e,t){const i=this.state.getCoords(),a=e.map(s=>{s.level;const d=s.level==="danger"?"border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.06);":s.level==="warning"?"border-color: rgba(245,158,11,0.25); background: rgba(245,158,11,0.04);":"border-color: var(--border);",l=s.level==="danger"?"var(--red)":s.level==="warning"?"var(--yellow)":"var(--cyan)",c=s.level==="danger"?"shield-alert":s.level==="warning"?"alert-triangle":"info";return`
        <div class="safety-alert-card" style="${d}">
          <div class="safety-alert-icon" style="color: ${l}; background: ${l}15;">
            <i data-lucide="${c}"></i>
          </div>
          <div class="safety-alert-info">
            <h4 style="color: ${l};">${s.title}</h4>
            <p>${s.text}</p>
          </div>
        </div>
      `}).join(""),n=t.map(s=>`
      <div class="todo-item" style="padding: 12px; align-items: flex-start; flex-direction: column; gap: 4px;">
        <div style="font-size: 0.8rem; font-weight: 500; color: var(--text); text-align: left;">${s.title}</div>
        <div style="display: flex; justify-content: space-between; width: 100%; font-size: 0.65rem; color: var(--muted); margin-top: 2px;">
          <span>📅 ${s.time}</span>
          <span style="color: var(--cyan); font-weight: 500;">🟢 ${s.status}</span>
        </div>
      </div>
    `).join(""),o=K.map(s=>{let d="phone";return s.category==="medical"&&(d="ambulance"),s.category==="police"&&(d="shield"),s.category==="fire"&&(d="flame"),s.category==="flood"&&(d="droplet"),`
        <div class="emergency-contact-item">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,0.03); display: flex; align-items: center; justify-content: center; color: var(--cyan);">
              <i data-lucide="${d}" style="width: 14px; height: 14px;"></i>
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
    `,lucide.createIcons()}setupEvents(){var e;(e=document.getElementById("btnSOSShare"))==null||e.addEventListener("click",()=>{const t=this.state.getCoords(),i=`🚨 SOS EMERGENCY ALERT! ฉันต้องการความช่วยเหลือด่วน
ตำแหน่งของฉัน: ${t.name}
พิกัด GPS: ${t.lat.toFixed(6)}, ${t.lon.toFixed(6)}
แผนที่: https://maps.google.com/?q=${t.lat},${t.lon}`;navigator.share?navigator.share({title:"SOS Emergency Position",text:i,url:`https://maps.google.com/?q=${t.lat},${t.lon}`}).then(()=>{this.showToast("ส่งสำเร็จ","ส่งสัญญาน SOS แชร์ตำแหน่งเรียบร้อยแล้ว")}).catch(a=>{console.warn("Share failed, copying instead:",a),this.copySOSToClipboard(i)}):this.copySOSToClipboard(i)})}copySOSToClipboard(e){navigator.clipboard.writeText(e).then(()=>{this.showToast("คัดลอกสำเร็จ","คัดลอกข้อความพิกัด SOS ลงคลิปบอร์ดแล้ว คุณสามารถกดส่งไลน์หาผู้เกี่ยวข้องได้ทันที!")}).catch(t=>{console.error("Clipboard copy failed:",t)})}showToast(e,t){const i=document.getElementById("toastContainer");if(!i)return;const a=document.createElement("div");a.className="toast-alert",a.style.borderColor="var(--red)",a.innerHTML=`
      <div class="toast-icon" style="color: var(--red);">
        <i data-lucide="alert-circle" style="width:16px;height:16px;"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title" style="color: var(--red);">${e}</div>
        <div class="toast-msg">${t}</div>
      </div>
    `,i.appendChild(a),lucide.createIcons(),setTimeout(()=>{a.classList.add("dismissed"),setTimeout(()=>a.remove(),300)},4e3)}}class le{constructor(){const e=localStorage.getItem("commuter_coords");e?this.coords=JSON.parse(e):this.coords={lat:13.7462,lon:100.5348,name:"สยามสแควร์ (กรุงเทพฯ)",country:"TH"},this.widgets=[],this.thunderTimer=null}getCoords(){return this.coords}setCoords(e,t,i,a){this.coords={lat:e,lon:t,name:i,country:a},localStorage.setItem("commuter_coords",JSON.stringify(this.coords)),this.widgets.forEach(n=>{typeof n.fetchAndRender=="function"?n.fetchAndRender():typeof n.init=="function"&&n.init()})}registerWidget(e){this.widgets.push(e)}triggerBackgroundAnimation(e){const t=document.getElementById("weatherBgOverlay");if(!t)return;t.innerHTML="",this.thunderTimer&&(clearInterval(this.thunderTimer),this.thunderTimer=null);const i=[51,53,55,61,63,65,80,81,82,95,96],a=[2,3,45,48],n=[0,1];if(i.includes(e)){const o=document.createDocumentFragment();for(let s=0;s<40;s++){const d=document.createElement("div");d.className="rain-drop",d.style.left=`${Math.random()*100}vw`,d.style.top=`${-80-Math.random()*100}px`,d.style.animationDuration=`${.6+Math.random()*.6}s`,d.style.animationDelay=`${Math.random()*2}s`,o.appendChild(d)}t.appendChild(o),e>=95&&(this.thunderTimer=setInterval(()=>{Math.random()>.75&&(t.style.backgroundColor="rgba(255, 255, 255, 0.14)",setTimeout(()=>{t.style.backgroundColor="transparent"},60))},3500))}else if(a.includes(e)){const o=document.createDocumentFragment();for(let s=0;s<4;s++){const d=document.createElement("div");d.className="cloud-particle";const l=150+Math.random()*220;d.style.width=`${l}px`,d.style.height=`${l*.65}px`,d.style.top=`${Math.random()*60}%`,d.style.animationDuration=`${40+Math.random()*50}s`,d.style.animationDelay=`${-Math.random()*40}s`,o.appendChild(d)}t.appendChild(o)}else if(n.includes(e)){const o=document.createElement("div");o.className="sun-ray",t.appendChild(o)}}}function ce(r){return new Promise(e=>{if(!navigator.geolocation)return e();navigator.geolocation.getCurrentPosition(t=>{const{latitude:i,longitude:a}=t.coords;fetch(`https://nominatim.openstreetmap.org/reverse?lat=${i}&lon=${a}&format=json&accept-language=th`).then(n=>n.json()).then(n=>{var s,d,l,c,p,v;const o=((s=n.address)==null?void 0:s.city)||((d=n.address)==null?void 0:d.town)||((l=n.address)==null?void 0:l.suburb)||((c=n.address)==null?void 0:c.county)||"ตำแหน่งปัจจุบัน";r.setCoords(i,a,o,((v=(p=n.address)==null?void 0:p.country_code)==null?void 0:v.toUpperCase())||"TH")}).catch(()=>{r.setCoords(i,a,"ตำแหน่งปัจจุบัน","TH")}).finally(e)},()=>e(),{timeout:6e3,maximumAge:6e4})})}document.addEventListener("DOMContentLoaded",async()=>{const r=new le;me(),await ce(r);const e=new Q("tab-weather",r),t=new oe(null,"tab-transit",r),i=new re("tab-helper",r),a=new de("tab-emergency",r);r.registerWidget(e),r.registerWidget(t),r.registerWidget(i),r.registerWidget(a),await e.init(),await t.init(),await i.init(),await a.init(),ue(),pe(),he(),ge(),ve()});function me(){const r=document.getElementById("mainTime"),e=document.getElementById("mainDate");if(!r||!e)return;const t=()=>{const i=new Date;r.innerText=i.toLocaleTimeString("th-TH",{hour12:!1});const a=["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],n=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."],o=a[i.getDay()],s=i.getDate(),d=n[i.getMonth()],l=i.getFullYear()+543;e.innerText=`วัน${o}ที่ ${s} ${d} ${l}`};t(),setInterval(t,1e3)}function ue(){const r=document.getElementById("themeToggle"),e=document.getElementById("theme-icon-light"),t=document.getElementById("theme-icon-dark");if(!r)return;const i=n=>{n==="light"?(document.body.classList.add("light-theme"),e&&(e.style.display="none"),t&&(t.style.display="block")):(document.body.classList.remove("light-theme"),e&&(e.style.display="block"),t&&(t.style.display="none")),document.dispatchEvent(new CustomEvent("theme-changed"))},a=localStorage.getItem("commuter_theme")||"dark";i(a),r.addEventListener("click",()=>{const o=document.body.classList.contains("light-theme")?"dark":"light";localStorage.setItem("commuter_theme",o),i(o)})}function pe(r){const e=document.querySelectorAll(".nav-item"),t=document.querySelectorAll(".tab-content"),i=document.getElementById("headerTitle"),a=document.getElementById("headerSub"),n={weather:{main:"สภาพอากาศและการเตรียมตัว",sub:"BANGKOK METROPOLIS · TH"},transit:{main:"ตารางเวลารถไฟบีทีเอส-เอ็มอาร์ที",sub:"BANGKOK MASS TRANSIT HUB"},helper:{main:"สิ่งอำนวยความสะดวกในชีวิตประจำวัน",sub:"DAILY PRODUCTIVITY WIDGETS"},emergency:{main:"ศูนย์ความปลอดภัยและข้อมูลติดต่อด่วน",sub:"BANGKOK SAFETY BOARD & SOS"}};e.forEach(o=>{o.addEventListener("click",()=>{const s=o.dataset.tab;e.forEach(l=>l.classList.remove("active")),o.classList.add("active"),t.forEach(l=>l.classList.remove("active"));const d=document.getElementById(`tab-${s}`);d&&d.classList.add("active"),i&&a&&n[s]&&(i.innerText=n[s].main,a.innerText=n[s].sub)})})}function he(){const r=document.querySelector(".widgets-layout-grid");if(!r)return;const e=()=>{r.querySelectorAll(".glass-card").forEach(a=>{a.classList.add("draggable-widget"),a.setAttribute("draggable","true")})};e(),new MutationObserver(()=>{e()}).observe(r,{childList:!0});let i=null;r.addEventListener("dragstart",a=>{const n=a.target.closest(".draggable-widget");n&&(i=n,a.dataTransfer.effectAllowed="move",n.style.opacity="0.35")}),r.addEventListener("dragover",a=>{a.preventDefault();const n=a.target.closest(".draggable-widget");n&&n!==i&&n.classList.add("widget-drag-over")}),r.addEventListener("dragleave",a=>{const n=a.target.closest(".draggable-widget");n&&n.classList.remove("widget-drag-over")}),r.addEventListener("drop",a=>{a.preventDefault();const n=a.target.closest(".draggable-widget");if(n&&n!==i){n.classList.remove("widget-drag-over");const o=Array.from(r.children),s=o.indexOf(i),d=o.indexOf(n);s<d?r.insertBefore(i,n.nextSibling):r.insertBefore(i,n);const l=Array.from(r.children).map(c=>c.innerHTML.substring(0,30));localStorage.setItem("commuter_widget_order",JSON.stringify(l))}}),r.addEventListener("dragend",a=>{const n=a.target.closest(".draggable-widget");n&&(n.style.opacity="1"),r.querySelectorAll(".draggable-widget").forEach(o=>{o.classList.remove("widget-drag-over")})})}function ge(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(r=>console.log("Service Worker registered successfully:",r.scope)).catch(r=>console.error("Service Worker registration failed:",r))})}function ve(){const r=(e,t,i,a)=>{const n=document.getElementById("toastContainer");if(!n)return;const o=document.createElement("div");o.className="toast-alert",o.style.borderColor=i,o.innerHTML=`
      <div class="toast-icon" style="color: ${i};">
        <i data-lucide="${a}" style="width:16px;height:16px;"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title" style="color: ${i};">${e}</div>
        <div class="toast-msg">${t}</div>
      </div>
    `,n.appendChild(o),lucide.createIcons(),setTimeout(()=>{o.classList.add("dismissed"),setTimeout(()=>o.remove(),300)},4500)};window.addEventListener("online",()=>{r("การเชื่อมต่อกลับมาแล้ว","ระบบเปลี่ยนกลับเป็นโหมดออนไลน์อัตโนมัติ","var(--green)","wifi")}),window.addEventListener("offline",()=>{r("คุณออฟไลน์อยู่","ระบบสลับมาใช้ฐานข้อมูลและแคชออฟไลน์แล้ว","var(--yellow)","wifi-off")})}
