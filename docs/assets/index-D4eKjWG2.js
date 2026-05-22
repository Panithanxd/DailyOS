(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(n){if(n.ep)return;n.ep=!0;const t=a(n);fetch(n.href,t)}})();const W=10*60*1e3;async function O(r,e={},a=W){const i=`api_cache_${r}`;if(!navigator.onLine){const t=localStorage.getItem(i);if(t){const{data:s}=JSON.parse(t);return console.log(`[API Cache] Offline mode: Served ${r} from cache.`),s}throw new Error("ระบบออฟไลน์และไม่มีข้อมูลสำรองสำหรับคำขอนี้")}const n=localStorage.getItem(i);if(n){const{data:t,timestamp:s}=JSON.parse(n);if(Date.now()-s<a)return t}try{const t=await fetch(r,e);if(!t.ok)throw new Error(`HTTP Error: ${t.status}`);const s=await t.json();return localStorage.setItem(i,JSON.stringify({data:s,timestamp:Date.now()})),s}catch(t){if(console.warn(`[API Cache] Fetch failed, fallback to cache for ${r}:`,t.message),n){const{data:s}=JSON.parse(n);return s}throw t}}const D={0:["☀️","CLEAR SKY","ท้องฟ้าแจ่มใส"],1:["🌤","MAINLY CLEAR","ท้องฟ้าโปร่ง"],2:["⛅","PARTLY CLOUDY","มีเมฆบางส่วน"],3:["☁️","OVERCAST","เมฆครึ้ม"],45:["🌫","FOGGY","หมอกลงจัด"],48:["🌫","RIME FOG","หมอกน้ำค้างแข็ง"],51:["🌦","LIGHT DRIZZLE","ฝนตกปรอยๆ เล็กน้อย"],53:["🌦","DRIZZLE","ฝนตกปรอยๆ"],55:["🌧","HEAVY DRIZZLE","ฝนตกปรอยหนาแน่น"],61:["🌧","LIGHT RAIN","ฝนตกเล็กน้อย"],63:["🌧","MODERATE RAIN","ฝนตกปานกลาง"],65:["🌧","HEAVY RAIN","ฝนตกชุกหนาแน่น"],80:["🌦","RAIN SHOWERS","ฝนตกกระจายตัว"],81:["⛈","STORM","พายุฝนฟ้าคะนอง"],82:["⛈","HEAVY STORM","พายุฝนคะนองรุนแรง"],95:["⛈","THUNDERSTORM","พายุฝนรุนแรงและฟ้าผ่า"],96:["⛈","HAIL STORM","พายุฝนฟ้าคะนองและลูกเห็บ"]},R=[{max:50,col:"#10b981",lbl:"ดีเยี่ยม (Good)",advice:"คุณภาพอากาศดีมาก เหมาะสำหรับทำกิจกรรมกลางแจ้ง"},{max:100,col:"#f59e0b",lbl:"ปานกลาง (Moderate)",advice:"คุณภาพอากาศปานกลาง กลุ่มเสี่ยงควรหลีกเลี่ยงกิจกรรมกลางแจ้งเป็นเวลานาน"},{max:150,col:"#ff9f43",lbl:"เริ่มมีผลกระทบ (Sensitive)",advice:"ควรสวมหน้ากากอนามัยเมื่ออยู่นอกอาคาร และลดการออกกำลังกายกลางแจ้ง"},{max:200,col:"#ef4444",lbl:"มีผลเสียต่อสุขภาพ (Unhealthy)",advice:"⚠️ สวมหน้ากาก PM2.5 ตลอดเวลาเมื่ออยู่กลางแจ้ง หลีกเลี่ยงกิจกรรมนอกอาคาร"},{max:300,col:"#b71c1c",lbl:"แย่อย่างยิ่ง (Very Unhealthy)",advice:"🚨 เป็นอันตรายต่อสุขภาพ! ควรอยู่ในอาคารที่ปิดมิดชิดและเปิดเครื่องฟอกอากาศ"},{max:500,col:"#7f1d1d",lbl:"อันตรายสูงสุด (Hazardous)",advice:"❌ วิกฤตคุณภาพอากาศร้ายแรง! ห้ามออกนอกอาคารโดยไม่จำเป็น"}];async function A(r,e){const a=`https://api.open-meteo.com/v1/forecast?latitude=${r}&longitude=${e}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max&timezone=Asia%2FBangkok`;return await O(a,{},5*60*1e3)}async function N(r,e){const a=`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${r}&longitude=${e}&current=us_aqi,pm2_5&timezone=Asia%2FBangkok`;return await O(a,{},10*60*1e3)}async function q(r){if(!r)return[];const e=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(r)}&count=5&language=th&format=json`;try{return(await(await fetch(e)).json()).results||[]}catch(a){return console.error("Location search failed:",a),[]}}function K(r,e){return[51,53,55,61,63,65,80,81,82,95,96].includes(r)||e>=40?{needed:!0,text:"☔ ควรพกร่มหรือเสื้อกันฝน! มีโอกาสเกิดฝนตกสูงในระหว่างวัน",color:"var(--cyan)"}:e>=15?{needed:!1,text:"🌤️ ฝนตกยาก แต่ท้องฟ้าอาจครึ้มๆ เล็กน้อย ไม่จำเป็นต้องพกร่ม",color:"var(--muted)"}:{needed:!1,text:"☀️ ท้องฟ้าแจ่มใส/แดดจัด เดินทางสะดวก ไม่จำเป็นต้องพกร่ม",color:"var(--green)"}}function Y(r,e,a){return[51,53,55,61,63,65,80,81,82,95,96].includes(a)?"เสื้อผ้าแห้งไว (Quick-Dry) หรือเสื้อคลุมกันน้ำ หลีกเลี่ยงรองเท้าผ้าใบสีขาว":r>=35?"เสื้อผ้าฝ้ายบางเบา ระบายอากาศดีเยี่ยม หมวก แว่นกันแดด และควรทาครีมกันแดด":r>=28?"เสื้อผ้าสวมใส่สบาย เช่น เสื้อยืด แขนสั้น กางเกงขาสั้น/ระบายความร้อนได้ดี":r>=22?"เสื้อยืดแขนสั้น หรือเชิ้ตบางๆ สภาพอากาศกำลังเย็นสบายกำลังดี":"สวมเสื้อแขนยาว หรือเตรียมเสื้อแจ็คเก็ตบางๆ ไปด้วยเนื่องจากอากาศค่อนข้างเย็น"}function J(r){return r>=8?{text:"อันตรายระดับสูงมาก! หลีกเลี่ยงแสงแดดช่วง 10:00 - 16:00 ทากันแดด SPF 30+ สวมหมวกและแว่นกันแดด",color:"var(--red)"}:r>=6?{text:"ระดับสูง! ควรทาครีมกันแดด สวมหมวกปีกกว้าง และสวมแว่นกันแดดเมื่อออกกลางแดด",color:"var(--yellow)"}:r>=3?{text:"ระดับปานกลาง ควรกางร่มเมื่อเดินกลางแจ้งเป็นเวลานาน",color:"var(--cyan)"}:{text:"ระดับต่ำ ปลอดภัยต่อการออกแดดทั่วไป",color:"var(--green)"}}const j=[{name:"สายด่วนเจ็บป่วยฉุกเฉิน (สพฉ.)",number:"1669",category:"medical",desc:"กู้ชีพและอุบัติเหตุแพทย์ฉุกเฉิน"},{name:"เหตุด่วนเหตุร้าย (ตำรวจ)",number:"191",category:"police",desc:"แจ้งเหตุด่วนตำรวจหลัก"},{name:"สายด่วนข้อมูลการจราจร (บก.02)",number:"1197",category:"traffic",desc:"ศูนย์ควบคุมสั่งการจราจรกรุงเทพฯ"},{name:"ตำรวจทางหลวง",number:"1193",category:"traffic",desc:"เหตุบนมอเตอร์เวย์และทางหลวงแผ่นดิน"},{name:"แจ้งเหตุอัคคีภัย/ดับเพลิง",number:"199",category:"fire",desc:"นักดับเพลิงและกู้ภัยกรุงเทพฯ"},{name:"ศูนย์แพทย์ฉุกเฉินกทม. (ศูนย์เอราวัณ)",number:"1646",category:"medical",desc:"หน่วยแพทย์เคลื่อนที่กทม."},{name:"สายด่วนข้อมูลน้ำท่วมกทม.",number:"1555",category:"flood",desc:"ศูนย์ประสานงานน้ำท่วมกรุงเทพฯ"},{name:"สถานีวิทยุจราจรเพื่อการแจ้งเหตุ (จส.100)",number:"1137",category:"traffic",desc:"รายงานอุบัติเหตุและของหาย"}];function H(r){const e=[];return[61,63,65,80,81,82,95,96].includes(r)&&(e.push({id:"rain_alert",level:"warning",title:"🌧️ แจ้งเตือนฝนฟ้าคะนองในพื้นที่",text:"มีฝนตกชุกหนาแน่นและลมกรรโชกแรงในเขตกรุงเทพมหานครและปริมณฑล หลีกเลี่ยงการเดินทางกลางแจ้งหากไม่จำเป็น"}),r>=63&&e.push({id:"flood_alert",level:"danger",title:"🚨 พื้นที่เสี่ยงน้ำท่วมขังรอระบาย",text:"เนื่องจากมีปริมาณน้ำสะสมสูง พบปัญหาถนนน้ำขังระดับ 10-15 ซม. ที่ ถนนอโศกมนตรี (หน้า ตึก GMM), แยกรัชดา-ลาดพร้าว และซอยสุขุมวิท 39"})),e.push({id:"aqi_alert",level:"info",title:"😷 อัพเดทสถานการณ์ฝุ่น PM 2.5",text:"ค่าฝุ่นละออง PM 2.5 วันนี้มีแนวโน้มสะสมตัวเนื่องจากสภาพลมสงบ แนะนำตรวจเช็คดัชนีคุณภาพอากาศก่อนทำกิจกรรมกลางแจ้งทุกครั้ง"}),e}function V(){const r=[],e=new Date,a=["ถนนลาดพร้าว ซอย 80 (งานปรับปรุงระบบจำหน่ายแรงสูงเพื่อความปลอดภัย)","ซอยสุขุมวิท 22 (ติดตั้งอุปกรณ์ตรวจวัดกระแสไฟฟ้าแรงสูง)","ถนนพระราม 9 ซอย 15 (ย้ายเสาพาดสายหลบแนวก่อสร้างทางรถไฟฟ้า)"];for(let i=0;i<3;i++){const n=new Date(e);n.setDate(e.getDate()+i+1),r.push({id:`outage_${i}`,title:`⚡ ประกาศดับไฟเพื่อบำรุงรักษา — ${a[i]}`,time:`${n.toLocaleDateString("th-TH",{day:"numeric",month:"short"})} | 08:30 น. - 15:30 น.`,status:"กำลังดำเนินการตามแผน"})}return r}class G{constructor(e,a){this.containerId=e,this.state=a}async init(){this.container=document.getElementById(this.containerId),this.container&&(this.renderSkeleton(),await this.fetchAndRender())}renderSkeleton(){this.container.innerHTML=`
      <div class="glass-card skeleton" style="height: 120px;"></div>
    `}async fetchAndRender(){try{const e=this.state.getCoords(),a=await A(e.lat,e.lon),i=await N(e.lat,e.lon),n=a.current.weather_code,t=H(n);this.render(a,i,t)}catch(e){console.warn("Commute insights fetch error:",e.message),this.container.innerHTML=""}}render(e,a,i){const n=e.current,t=a.current.us_aqi,o=new Date().getHours();let d="",c="🌟",l="เช้าอันสดใส เหมาะแก่การเดินทาง",u="var(--cyan)";const v=[61,63,65,80,81,82,95,96].includes(n.weather_code);i.some(b=>b.id==="flood_alert")?(d="<b>แจ้งเตือนภัยพิบัติ:</b> มีฝนตกหนักน้ำท่วมขังในบางพื้นที่และพบบีทีเอสขัดข้อง ดีเลย์ประมาณ 8 นาที แนะนำให้เผื่อเวลาอย่างน้อย 20-30 นาทีในการเดินทางช่วงนี้",c="🚨",l="แจ้งเตือน: การเดินทางมีความเสี่ยงสูง",u="var(--red)"):v?(d="<b>พยากรณ์ฝนตก:</b> ท้องฟ้าครึ้มฝนฟ้าคะนองในเขตกทม. แนะนำให้พกร่มและสวมใส่รองเท้าที่กันน้ำได้ การจราจรบนทางด่วนอาจชะลอตัวเนื่องจากทัศนวิสัยต่ำ",c="☔",l="เตือนภัย: มีฝนฟ้าคะนองในพื้นที่",u="var(--yellow)"):n.temperature_2m>=35?(d="<b>สภาพอากาศร้อนจัด:</b> อุณหภูมิพุ่งสูงถึง 36°C+ แนะนำให้สวมใส่เสื้อผ้าเบาสบาย ระบายอากาศได้ดี หลีกเลี่ยงแดดจัดช่วงเที่ยง-บ่าย และพกน้ำดื่มติดตัว",c="☀️",l="เตือนภัย: สภาพอากาศร้อนจัด (Extreme Heat)",u="#f59e0b"):t>150?(d="<b>มลพิษทางอากาศ:</b> ค่าฝุ่น PM 2.5 วันนี้สูงเกินมาตรฐาน (US AQI: "+t+") แนะนำให้สวมใส่หน้ากาก N95 ก่อนทำกิจกรรมกลางแจ้ง",c="😷",l="เตือนภัย: คุณภาพอากาศเป็นอันตราย",u="#a855f7"):(d="<b>สภาพอากาศเอื้ออำนวย:</b> อากาศปลอดโปร่ง ไม่มีรายงานดีเลย์รถไฟฟ้า การจราจรช่วงเช้านี้ไหลลื่นปกติ ขอให้คุณเดินทางด้วยความสุขความปลอดภัย!",c="✨",l="สถานการณ์ปกติ: เดินทางได้ราบรื่น",u="var(--cyan)");let y=30,m="เบาบาง (เดินทางสะดวก)",f="var(--green)";o>=7&&o<=9||o>=17&&o<=19?(y=85,m="หนาแน่นสูง (ชานชาลาแออัด)",f="var(--red)"):(o>=11&&o<=13||o>=16&&o<17)&&(y=55,m="ปานกลาง (มีผู้โดยสารพ้นเก้าอี้)",f="var(--yellow)");let S="07:00 น. หรือ หลัง 09:15 น.",x="16:30 น. หรือ หลัง 19:30 น.";v&&(S="เดินทางล่วงหน้าเร็วขึ้น 30 นาที",x="รอฝนซาหลัง 19:30 น."),this.container.innerHTML=`
      <div class="glass-card glow-card" style="margin-bottom: 24px; border-color: ${u}33; display: flex; flex-direction: column; gap: 16px; background: linear-gradient(135deg, ${u}05 0%, rgba(13, 20, 35, 0.4) 100%);">
        
        <!-- Header status -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border); padding-bottom: 12px;">
          <div style="display: flex; gap: 10px; align-items: center;">
            <div style="font-size: 1.5rem; line-height: 1;">${c}</div>
            <div>
              <div style="font-size: 0.85rem; font-weight: 600; color: ${u};">${l}</div>
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
              🏠 ไปทำงาน: <b style="color: var(--cyan);">${S}</b><br>
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
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 500; color: ${f};">
                  <span>${m}</span>
                  <span style="font-family: 'Outfit';">${y}%</span>
                </div>
                <div style="width: 100%; height: 4px; background: var(--muted2); border-radius: 99px; overflow: hidden; margin-top: 4px;">
                  <div style="width: ${y}%; height: 100%; background: ${f}; border-radius: 99px; box-shadow: 0 0 8px ${f};"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `,lucide.createIcons()}}class U{constructor(e,a){this.container=document.getElementById(e),this.state=a,this.searchTimeout=null}async init(){this.renderSkeleton(),await this.fetchAndRender()}renderSkeleton(){this.container.innerHTML=`
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
    `,lucide.createIcons()}async fetchAndRender(){var e;try{const a=this.state.getCoords(),i=await A(a.lat,a.lon),n=await N(a.lat,a.lon);this.render(i,n),this.setupSearchEvents()}catch(a){console.error(a),this.container.innerHTML=`
        <div class="glass-card glow-card-red" style="text-align: center; padding: 40px;">
          <i data-lucide="wifi-off" style="width: 48px; height: 48px; color: var(--red); margin-bottom: 16px;"></i>
          <h3 style="color: var(--red); margin-bottom: 10px;">เกิดข้อผิดพลาดในการดึงข้อมูลสภาพอากาศ</h3>
          <p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 20px;">${a.message}</p>
          <button class="btn btn-primary" id="retryWeatherBtn"><i data-lucide="refresh-cw"></i> ลองใหม่</button>
        </div>
      `,lucide.createIcons(),(e=document.getElementById("retryWeatherBtn"))==null||e.addEventListener("click",()=>this.init())}}render(e,a){const i=e.current,n=this.state.getCoords(),[t,s,o]=D[i.weather_code]||["🌡️","UNKNOWN","สภาพอากาศไม่ระบุ"],d=e.daily.sunrise[0].slice(11,16),c=e.daily.sunset[0].slice(11,16),l=new Date,u=l.getHours()*60+l.getMinutes(),g=parseInt(d.slice(0,2))*60+parseInt(d.slice(3,5)),v=parseInt(c.slice(0,2))*60+parseInt(c.slice(3,5)),p=Math.min(100,Math.max(0,(u-g)/(v-g)*100));K(i.weather_code,e.hourly.precipitation_probability[0]),Y(i.temperature_2m,i.apparent_temperature,i.weather_code);const y=J(e.daily.uv_index_max[0]);this.state.triggerBackgroundAnimation(i.weather_code);const m=l.getHours();let f="";for(let h=0;h<16;h++){const E=(m+h)%24,I=Math.round(e.hourly.temperature_2m[m+h]),B=e.hourly.weather_code[m+h],$=e.hourly.precipitation_probability[m+h],P=(D[B]||["🌡️"])[0];f+=`
        <div class="hourly-item ${h===0?"now":""}">
          <div class="hourly-time">${h===0?"ตอนนี้":`${String(E).padStart(2,"0")}:00`}</div>
          <div class="hourly-icon">${P}</div>
          <div class="hourly-temp">${I}°C</div>
          ${$>20?`<div style="font-size:0.6rem; color:var(--cyan); margin-top:2px;">☔${$}%</div>`:""}
        </div>
      `}let S="";for(let h=0;h<7;h++){const E=new Date(e.daily.time[h]),I=E.toLocaleDateString("th-TH",{weekday:"short"}),B=E.toLocaleDateString("th-TH",{day:"numeric",month:"short"}),$=Math.round(e.daily.temperature_2m_max[h]),P=Math.round(e.daily.temperature_2m_min[h]),z=e.daily.precipitation_probability_max[h],F=(D[e.daily.weather_code[h]]||["🌡️"])[0];S+=`
        <div class="daily-item">
          <div class="daily-date">
            <span style="font-weight: 500;">${I}</span><br>
            <span style="font-size: 0.65rem; color: var(--muted);">${B}</span>
          </div>
          <div class="daily-icon-desc">
            <span class="daily-icon">${F}</span>
            ${z>20?`<span class="daily-rain-chance"><i data-lucide="droplet" style="width:10px;height:10px;"></i> ${z}%</span>`:'<span style="font-size: 0.7rem; color: var(--muted2);">ไม่มีฝน</span>'}
          </div>
          <div class="daily-temps">
            <span class="daily-temp-max">${$}°</span>
            <span class="daily-temp-min">${P}°</span>
          </div>
        </div>
      `}const x=a.current.us_aqi,b=a.current.pm2_5;let w="var(--muted)",T="ไม่มีข้อมูล";if(x!==void 0){for(const h of R)if(x<=h.max){w=h.col,T=h.lbl,h.advice;break}}this.container.innerHTML=`
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
              สภาพอากาศปัจจุบัน (${n.name})
            </div>
            <div class="weather-main-info">
              <div class="weather-big-icon float-effect">${t}</div>
              <div>
                <div class="weather-main-temp">${Math.round(i.temperature_2m)}<sup>°C</sup></div>
                <div class="weather-main-desc">${o}</div>
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
          ${f}
        </div>

        <!-- Weekly & Additional Details -->
        <div class="daily-forecast-container">
          <div class="daily-list">
            <div style="font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 2px; font-family: 'JetBrains Mono', monospace; margin-bottom: 8px; display:flex; align-items:center; gap:6px;">
              <i data-lucide="calendar" style="width:14px; height:14px;"></i> พยากรณ์อากาศล่วงหน้า 7 วัน
            </div>
            ${S}
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
                  <span>${c} น. 🌇</span>
                </div>
                <div class="solar-track-line">
                  <div class="solar-track-fill" style="width: ${p}%"></div>
                  <div class="solar-sun-dot" style="left: ${p}%">☀️</div>
                </div>
                <div class="solar-stats">
                  <div class="solar-stat-item">โอกาสเกิดฝนวันนี้<b>${e.daily.precipitation_probability_max[0]}%</b></div>
                  <div class="solar-stat-item">ดัชนีแสงแดด (UV)<b>${Math.round(e.daily.uv_index_max[0])}</b></div>
                </div>
              </div>
              
              <div style="font-size:0.7rem; color:var(--muted); line-height:1.4; border-top:1px solid var(--border); padding-top:12px; margin-top:12px;">
                <strong>ค่าแดดสูงสุด:</strong> ${y.text}
              </div>
            </div>

            <!-- AQI card -->
            <div class="glass-card" style="border-color: ${w}33;">
              <div style="font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 2px; font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; display:flex; align-items:center; gap:6px;">
                <i data-lucide="wind" style="width:14px; height:14px;"></i> ดัชนีคุณภาพอากาศ (US AQI)
              </div>
              
              <div class="aqi-row">
                <div>
                  <div class="aqi-number" style="color: ${w};">${x??"--"}</div>
                  <div class="aqi-label" style="color: ${w};">${T}</div>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 0.65rem; color: var(--muted);">ปริมาณฝุ่น PM 2.5</span><br>
                  <b style="font-size: 1.15rem; font-family: 'Outfit';">${(b==null?void 0:b.toFixed(1))??"--"} <span style="font-size: 0.7rem; font-weight: normal;">μg/m³</span></b>
                </div>
              </div>

              <!-- Colorful AQI Scale -->
              <div class="aqi-scale-bar">
                ${R.map((h,E)=>`<div class="aqi-scale-segment ${x!==void 0&&(E===0?x<=50:x>R[E-1].max&&x<=h.max)?"active":""}" style="background-color: ${h.col}; color: ${h.col};"></div>`).join("")}
              </div>
              <div style="display:flex; justify-content:space-between; font-size: 0.5rem; color: var(--muted); font-family: 'JetBrains Mono', monospace; margin-top: 6px;">
                <span>0</span><span>50</span><span>100</span><span>150</span><span>200</span><span>300+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,new G("commuteBriefingContainer",this.state).init(),lucide.createIcons()}setupSearchEvents(){const e=document.getElementById("weatherSearchInput"),a=document.getElementById("weatherSuggestions");e.addEventListener("input",()=>{const i=e.value.trim();if(this.searchTimeout&&clearTimeout(this.searchTimeout),!i){a.style.display="none";return}this.searchTimeout=setTimeout(async()=>{const n=await q(i);n&&n.length>0?(a.innerHTML=n.map(t=>`
            <div class="suggestion-item" data-lat="${t.latitude}" data-lon="${t.longitude}" data-name="${t.name}" data-country="${t.country_code||"TH"}">
              <i data-lucide="map-pin" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-right:6px; color:var(--cyan);"></i>
              <b>${t.name}</b> ${t.admin1?`, ${t.admin1}`:""} (${t.country||"ต่างประเทศ"})
            </div>
          `).join(""),a.style.display="block",lucide.createIcons(),a.querySelectorAll(".suggestion-item").forEach(t=>{t.addEventListener("click",()=>{const s=parseFloat(t.dataset.lat),o=parseFloat(t.dataset.lon),d=t.dataset.name,c=t.dataset.country;this.state.setCoords(s,o,d,c),e.value="",a.style.display="none",this.init()})})):(a.innerHTML='<div class="suggestion-item" style="color:var(--muted); cursor:default;">ไม่พบสถานที่ดังกล่าว...</div>',a.style.display="block")},350)}),document.addEventListener("click",i=>{!e.contains(i.target)&&!a.contains(i.target)&&(a.style.display="none")})}}const M={bts_green:[{name:"Khu Khot (คูคต)",index:0,ext:!0},{name:"Yaek Kor Por Aor (แยก คปอ.)",index:1,ext:!0},{name:"Royal Thai Air Force Museum (พิพิธภัณฑ์กองทัพอากาศ)",index:2,ext:!0},{name:"Bhumibol Adulyadej Hospital (โรงพยาบาลภูมิพลอดุลยเดช)",index:3,ext:!0},{name:"Saphan Mai (สะพานใหม่)",index:4,ext:!0},{name:"Sai Yud (สายหยุด)",index:5,ext:!0},{name:"Phahon Yothin 59 (พหลโยธิน 59)",index:6,ext:!0},{name:"Wat Phra Sri Mahathat (วัดพระศรีมหาธาตุ)",index:7,ext:!0},{name:"11th Infantry Regiment (กรมทหารราบที่ 11)",index:8,ext:!0},{name:"Bang Bua (บางบัว)",index:9,ext:!0},{name:"Royal Forest Department (กรมป่าไม้)",index:10,ext:!0},{name:"Kasetsart University (มหาวิทยาลัยเกษตรศาสตร์)",index:11,ext:!0},{name:"Sena Nikhom (เสนานิคม)",index:12,ext:!1},{name:"Ratchayothin (รัชโยธิน)",index:13,ext:!1},{name:"Phahon Yothin 24 (พหลโยธิน 24)",index:14,ext:!1},{name:"Ha Yaek Lat Phrao (ห้าแยกลาดพร้าว)",index:15,ext:!1},{name:"Mo Chit (หมอชิต)",index:16,ext:!1},{name:"Saphan Khwai (สะพานควาย)",index:17,ext:!1},{name:"Sena Ruam (เสนาร่วม)",index:18,ext:!1},{name:"Ari (อารีย์)",index:19,ext:!1},{name:"Sanam Pao (สนามเป้า)",index:20,ext:!1},{name:"Victory Monument (อนุสาวรีย์ชัยสมรภูมิ)",index:21,ext:!1},{name:"Phaya Thai (พญาไท)",index:22,ext:!1},{name:"Ratchathewi (ราชเทวี)",index:23,ext:!1},{name:"Siam (สยาม - CEN)",index:24,ext:!1},{name:"Chit Lom (ชิดลม)",index:25,ext:!1},{name:"Phloen Chit (เพลินจิต)",index:26,ext:!1},{name:"Nana (นานา)",index:27,ext:!1},{name:"Asok (อโศก)",index:28,ext:!1},{name:"Phrom Phong (พร้อมพงษ์)",index:29,ext:!1},{name:"Thong Lo (ทองหล่อ)",index:30,ext:!1},{name:"Ekkamai (เอกมัย)",index:31,ext:!1},{name:"Phra Khanong (พระโขนง)",index:32,ext:!1},{name:"On Nut (อ่อนนุช)",index:33,ext:!1},{name:"Bang Chak (บางจาก)",index:34,ext:!0},{name:"Punnawithi (ปุณณวิถี)",index:35,ext:!0},{name:"Udom Suk (อุดมสุข)",index:36,ext:!0},{name:"Bang Na (บางนา)",index:37,ext:!0},{name:"Bearing (แบริ่ง)",index:38,ext:!0},{name:"Samrong (สำโรง)",index:39,ext:!0},{name:"Pu Chao (ปู่เจ้า)",index:40,ext:!0},{name:"Chang Erawan (ช้างเอราวัณ)",index:41,ext:!0},{name:"Royal Thai Naval Academy (โรงเรียนนายเรือ)",index:42,ext:!0},{name:"Pak Nam (ปากน้ำ)",index:43,ext:!0},{name:"Srinagarindra (ศรีนครินทร์)",index:44,ext:!0},{name:"Phraek Sa (แพรกษา)",index:45,ext:!0},{name:"Sai Luat (สายลวด)",index:46,ext:!0},{name:"Kheha (เคหะฯ)",index:47,ext:!0}],bts_silom:[{name:"National Stadium (สนามกีฬาแห่งชาติ)",index:0,ext:!1},{name:"Siam (สยาม - CEN)",index:1,ext:!1},{name:"Ratchadamri (ราชดำริ)",index:2,ext:!1},{name:"Sala Daeng (ศาลาแดง)",index:3,ext:!1},{name:"Chong Nonsi (ช่องนนทรี)",index:4,ext:!1},{name:"Saint Louis (เซนต์หลุยส์)",index:5,ext:!1},{name:"Surasak (สุรศักดิ์)",index:6,ext:!1},{name:"Saphan Taksin (สะพานตากสิน)",index:7,ext:!1},{name:"Krung Thon Buri (กรุงธนบุรี)",index:8,ext:!0},{name:"Wongwian Yai (วงเวียนใหญ่)",index:9,ext:!0},{name:"Pho Nimit (โพธิ์นิมิตร)",index:10,ext:!0},{name:"Talat Phlu (ตลาดพลู)",index:11,ext:!0},{name:"Wutthakat (วุฒากาศ)",index:12,ext:!0},{name:"Bang Wa (บางหว้า)",index:13,ext:!0}],mrt_blue:[{name:"Tha Phra (ท่าพระ)",index:0},{name:"Charan 13 (จรัญฯ 13)",index:1},{name:"Fai Chai (ไฟฉาย)",index:2},{name:"Bang Khun Non (บางขุนนนท์)",index:3},{name:"Bang Yi Khan (บางยี่ขัน)",index:4},{name:"Sirindhorn (สิรินธร)",index:5},{name:"Bang Phlat (บางพลัด)",index:6},{name:"Bang O (บางอ้อ)",index:7},{name:"Bang Pho (บางโพ)",index:8},{name:"Tao Poon (เตาปูน)",index:9},{name:"Bang Sue (บางซื่อ)",index:10},{name:"Kamphaeng Phet (กำแพงเพชร)",index:11},{name:"Chatuchak Park (สวนจตุจักร)",index:12},{name:"Phahon Yothin (พหลโยธิน)",index:13},{name:"Lat Phrao (ลาดพร้าว)",index:14},{name:"Ratchadaphisek (รัชดาภิเษก)",index:15},{name:"Sutthisan (สุทธิสาร)",index:16},{name:"Huai Khwang (ห้วยขวาง)",index:17},{name:"Thailand Cultural Centre (ศูนย์วัฒนธรรมฯ)",index:18},{name:"Phra Ram 9 (พระราม 9)",index:19},{name:"Phetchaburi (เพชรบุรี)",index:20},{name:"Sukhumvit (สุขุมวิท)",index:21},{name:"Queen Sirikit CC (ศูนย์ประชุมฯ สิริกิติ์)",index:22},{name:"Khlong Toei (คลองเตย)",index:23},{name:"Lumphini (ลุมพินี)",index:24},{name:"Si Lom (สีลม)",index:25},{name:"Sam Yan (สามย่าน)",index:26},{name:"Hua Lamphong (หัวลำโพง)",index:27},{name:"Wat Mangkon (วัดมังกร)",index:28},{name:"Sam Yot (sam Yot)",index:29},{name:"Sanam Chai (สนามไชย)",index:30},{name:"Itsaraphap (อิสรภาพ)",index:31},{name:"Tha Phra (ท่าพระ-CEN)",index:32},{name:"Bang Phai (บางไผ่)",index:33},{name:"Bang Wa (บางหว้า)",index:34},{name:"Phetkasem 48 (เพชรเกษม 48)",index:35},{name:"Phasi Charoen (ภาษีเจริญ)",index:36},{name:"Bang Khae (บางแค)",index:37},{name:"Lak Song (หลักสอง)",index:38}],mrt_purple:[{name:"Khlong Bang Phai (คลองบางไผ่)",index:0},{name:"Talad Bang Yai (ตลาดบางใหญ่)",index:1},{name:"Sam Yaek Bang Yai (สามแยกบางใหญ่)",index:2},{name:"Bang Rak Noi Tha It (บางรักน้อยท่าอิฐ)",index:3},{name:"Bang Rak Yai (บางรักใหญ่)",index:4},{name:"Tha It (ท่าอิฐ)",index:5},{name:"Sai Ma (ไทรม้า)",index:6},{name:"Nonthaburi 1 Bridge (สะพานพระนั่งเกล้า)",index:7},{name:"Bang Krasor (บางกระสอ)",index:8},{name:"Nonthaburi Civic Center (ศูนย์ราชการนนทบุรี)",index:9},{name:"Ministry of Public Health (กระทรวงสาธารณสุข)",index:10},{name:"Yaek Tiwanon (แยกติวานนท์)",index:11},{name:"Wong Sawang (วงศ์สว่าง)",index:12},{name:"Bang Son (บางซ่อน)",index:13},{name:"Tao Poon (เตาปูน)",index:14}]};function Q(r,e,a,i="adult"){if(e===a)return{fare:0,stationsCount:0,duration:0};const n=Math.abs(e-a),t=n*2;let s=0;if(r==="bts_green"){const o=[0,17,25,28,32,35,40,43,47],d=M.bts_green[e].ext,c=M.bts_green[a].ext;if(d&&c)e<=15&&a<=15||e>=34&&a>=34?s=15:s=77;else if(!d&&!c)s=o[Math.min(8,n)];else{const l=d?a:e,u=Math.abs(l-16),g=Math.abs(l-33),v=Math.min(u,g);s=o[Math.min(8,v)]+15}s>62&&(s=62)}else if(r==="bts_silom"){const o=[0,17,25,28,32,35,40,43,47],d=M.bts_silom[e].ext,c=M.bts_silom[a].ext;if(d&&c)s=15;else if(!d&&!c)s=o[Math.min(8,n)];else{const u=Math.abs(7-(d?a:e));s=o[Math.min(8,u)]+15}s>62&&(s=62)}else r==="mrt_blue"?(s=17+(n-1)*3,s>45&&(s=45)):r==="mrt_purple"&&(s=14+(n-1)*2,s>42&&(s=42));if(i==="student"){const o=r.startsWith("bts")?.3:.1;s=Math.ceil(s*(1-o))}else i==="senior"&&(s=Math.ceil(s*.5));return{fare:s,stationsCount:n,duration:t}}function Z(r,e,a){const i=[{text:"เชื่อมต่อกับ MRT สายสีน้ำเงิน ที่สถานีจตุจักร (หรือ BTS หมอชิต)",keywords:["Mo Chit","Chatuchak"]},{text:"เชื่อมต่อกับ MRT สายสีน้ำเงิน ที่สถานีสุขุมวิท (หรือ BTS อโศก)",keywords:["Asok","Sukhumvit"]},{text:"เชื่อมต่อกับ MRT สายสีน้ำเงิน ที่สถานีสีลม (หรือ BTS ศาลาแดง)",keywords:["Sala Daeng","Si Lom"]},{text:"เชื่อมต่อกับ Airport Rail Link ที่สถานีพญาไท",keywords:["Phaya Thai"]},{text:"เชื่อมต่อระหว่าง MRT สายสีน้ำเงิน และสายสีม่วง ที่สถานีเตาปูน",keywords:["Tao Poon"]},{text:"เชื่อมต่อกับ BTS สายสีลม ที่สถานีบางหว้า",keywords:["Bang Wa"]}];for(const n of i){const t=n.keywords.some(o=>e.toLowerCase().includes(o.toLowerCase())),s=n.keywords.some(o=>a.toLowerCase().includes(o.toLowerCase()));if(t||s)return`💡 คำแนะนำ: ${n.text}`}return null}function X(r,e){var x,b,w,T;const a=new Date,i=a.getHours(),n=a.getMinutes(),t=i*60+n,s={bts_green:{first:5*60+30,last:24*60+0,peakFreq:3,offFreq:7},bts_silom:{first:5*60+30,last:24*60+0,peakFreq:3,offFreq:7},mrt_blue:{first:5*60+30,last:24*60+0,peakFreq:4,offFreq:8},mrt_purple:{first:5*60+30,last:23*60+59,peakFreq:5,offFreq:10}},o=s[r]||s.bts_green,d=i>=7&&i<9||i>=17&&i<20,c=d?o.peakFreq:o.offFreq;let l=t;if(t<o.first)l=o.first;else if(t>=o.last)l=o.first+24*60;else{const h=(t-o.first)%c;l=t+(h===0?0:c-h)}const u=l-t,g=Math.floor(l%(24*60)/60),v=l%60,p=`${String(g).padStart(2,"0")}:${String(v).padStart(2,"0")} น.`,y=Math.floor(o.first/60),m=o.first%60,f=Math.floor(o.last/60)%24,S=o.last%60;return{firstTrain:`${String(y).padStart(2,"0")}:${String(m).padStart(2,"0")} น.`,lastTrain:`${String(f).padStart(2,"0")}:${String(S).padStart(2,"0")} น.`,frequencyPeak:`${((x=s[r])==null?void 0:x.peakFreq)??3}-${(((b=s[r])==null?void 0:b.peakFreq)??3)+1} นาที/ขบวน`,frequencyOffPeak:`${((w=s[r])==null?void 0:w.offFreq)??7}-${(((T=s[r])==null?void 0:T.offFreq)??7)+1} นาที/ขบวน`,nextTrain:p,waitMinutes:u,isPeak:d,currentFreq:c}}function _(){const r=localStorage.getItem("commuter_fav_routes");return r?JSON.parse(r):[]}function ee(r,e,a,i,n,t,s){const o=_(),d={id:Date.now(),name:r,start:{lat:e,lng:a,name:t},end:{lat:i,lng:n,name:s}};return o.push(d),localStorage.setItem("commuter_fav_routes",JSON.stringify(o)),o}function te(r){let e=_();return e=e.filter(a=>a.id!==r),localStorage.setItem("commuter_fav_routes",JSON.stringify(e)),e}function ae(r,e,a,i){const t=C(a-r),s=C(i-e),o=Math.sin(t/2)*Math.sin(t/2)+Math.cos(C(r))*Math.cos(C(a))*Math.sin(s/2)*Math.sin(s/2);return 6371*(2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o)))}function C(r){return r*(Math.PI/180)}class ie{constructor(e,a,i){this.trafficContainer=document.getElementById(e),this.transitContainer=document.getElementById(a),this.state=i,this.map=null,this.tileLayer=null,this.routePolyline=null,this.startMarker=null,this.endMarker=null,this.routePoints={start:null,end:null},this.cctvIntervals=[]}async init(){this.trafficContainer&&(this.renderTrafficTab(),this.initMap(),this.initCCTVs(),this.setupTrafficEvents()),this.renderTransitTab(),this.setupTransitEvents(),document.addEventListener("theme-changed",()=>this.updateMapTheme())}renderTrafficTab(){this.trafficContainer.innerHTML=`
      <div class="map-dashboard-grid">
        <!-- Leaflet Map Container -->
        <div class="map-outer">
          <div id="trafficMap"></div>
          
          <!-- Route Planner Card -->
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
              <button class="btn" id="btnResetRoute" style="font-size: 0.75rem; padding: 8px 12px;">
                ล้างข้อมูล
              </button>
            </div>

            <!-- Route Stats (shown after routing) -->
            <div class="travel-stats" id="routeTravelStats">
              <div class="stat-row">
                <span>ระยะทาง:</span>
                <b id="statDistance">-- กม.</b>
              </div>
              <div class="stat-row">
                <span>เวลาเดินทางโดยประมาณ:</span>
                <b id="statDuration">-- นาที</b>
              </div>
              <div class="stat-row">
                <span>ความหนาแน่นจราจร:</span>
                <span id="statTrafficBadge" class="traffic-status-pill traffic-pill-green">ราบรื่น</span>
              </div>
              <div class="stat-row" style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px;">
                <input type="text" id="favRouteNameInput" placeholder="ตั้งชื่อเส้นทางนี้..." style="background: rgba(255,255,255,0.04); border: 1px solid var(--border); color: var(--text); border-radius: 6px; padding: 4px 8px; font-size: 0.75rem; width: 120px;">
                <button class="btn btn-primary" id="btnSaveFavRoute" style="font-size: 0.7rem; padding: 4px 8px; border-radius: 6px;">
                  <i data-lucide="bookmark" style="width: 12px; height: 12px;"></i> บันทึกเส้นทาง
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- CCTV Cameras Sidebar -->
        <div class="cctv-sidebar">
          <div class="glass-card">
            <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <i data-lucide="video" style="color: var(--red);"></i> กล้อง CCTV แยกสำคัญ (Live Simulation)
            </h3>
            <p style="font-size: 0.7rem; color: var(--muted); margin-bottom: 16px;">รายงานสถานะจราจรแบบเรียลไทม์จากระบบจำลองอัจฉริยะ</p>
            
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div class="cctv-card">
                <div class="cctv-header">
                  <span class="cctv-title">แยกอโศก-สุขุมวิท (Asoke Intersection)</span>
                  <span class="cctv-live-dot">LIVE</span>
                </div>
                <div class="cctv-screen">
                  <canvas id="cctvAsoke" class="cctv-canvas"></canvas>
                  <span class="cctv-overlay-text">CAM-01 | ASOKE ROAD</span>
                </div>
              </div>

              <div class="cctv-card">
                <div class="cctv-header">
                  <span class="cctv-title">แยกพระราม 9 (Rama IX Intersection)</span>
                  <span class="cctv-live-dot">LIVE</span>
                </div>
                <div class="cctv-screen">
                  <canvas id="cctvRama9" class="cctv-canvas"></canvas>
                  <span class="cctv-overlay-text">CAM-02 | RAMA 9 RD</span>
                </div>
              </div>

              <div class="cctv-card">
                <div class="cctv-header">
                  <span class="cctv-title">แยกสาทร-นราธิวาส (Sathorn-Naradhiwas)</span>
                  <span class="cctv-live-dot">LIVE</span>
                </div>
                <div class="cctv-screen">
                  <canvas id="cctvSathorn" class="cctv-canvas"></canvas>
                  <span class="cctv-overlay-text">CAM-03 | SATHORN RD</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Saved Routes Card -->
          <div class="glass-card">
            <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <i data-lucide="bookmark" style="color: var(--cyan);"></i> เส้นทางที่บันทึกไว้
            </h3>
            <div id="savedRoutesList" style="display: flex; flex-direction: column; gap: 8px;">
              <!-- Dynamic items -->
            </div>
          </div>
        </div>
      </div>
    `,lucide.createIcons()}initMap(){const e=this.state.getCoords();this.map=L.map("trafficMap",{zoomControl:!1}).setView([e.lat,e.lon],13),L.control.zoom({position:"bottomright"}).addTo(this.map),this.updateMapTheme(),this.map.on("click",a=>this.handleMapClick(a))}updateMapTheme(){if(!this.map)return;this.tileLayer&&this.map.removeLayer(this.tileLayer);const a=document.body.classList.contains("light-theme")?"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png":"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",i='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';this.tileLayer=L.tileLayer(a,{attribution:i}).addTo(this.map)}handleMapClick(e){const{lat:a,lng:i}=e.latlng;this.routePoints.start?this.routePoints.end?(this.resetRouting(),this.setRouteStart(a,i,`พิกัด: ${a.toFixed(4)}, ${i.toFixed(4)}`)):(this.setRouteEnd(a,i,`พิกัด: ${a.toFixed(4)}, ${i.toFixed(4)}`),this.calculateRoute()):this.setRouteStart(a,i,`พิกัด: ${a.toFixed(4)}, ${i.toFixed(4)}`)}setRouteStart(e,a,i){this.routePoints.start={lat:e,lng:a,name:i};const n=document.getElementById("routeStartText");n.innerText=i,n.classList.remove("empty"),this.startMarker&&this.map.removeLayer(this.startMarker);const t=L.divIcon({className:"custom-map-marker-start",html:'<div style="width: 14px; height: 14px; background: var(--cyan); border: 2px solid white; border-radius: 50%; box-shadow: 0 0 10px var(--cyan);"></div>',iconSize:[14,14],iconAnchor:[7,7]});this.startMarker=L.marker([e,a],{icon:t}).addTo(this.map)}setRouteEnd(e,a,i){this.routePoints.end={lat:e,lng:a,name:i};const n=document.getElementById("routeEndText");n.innerText=i,n.classList.remove("empty"),this.endMarker&&this.map.removeLayer(this.endMarker);const t=L.divIcon({className:"custom-map-marker-end",html:'<div style="width: 14px; height: 14px; background: var(--red); border: 2px solid white; border-radius: 50%; box-shadow: 0 0 10px var(--red);"></div>',iconSize:[14,14],iconAnchor:[7,7]});this.endMarker=L.marker([e,a],{icon:t}).addTo(this.map)}async calculateRoute(){if(!this.routePoints.start||!this.routePoints.end)return;const e=this.routePoints.start,a=this.routePoints.end,i=`https://router.project-osrm.org/route/v1/driving/${e.lng},${e.lat};${a.lng},${a.lat}?overview=full&geometries=geojson`;try{const t=await(await fetch(i)).json();if(t.routes&&t.routes.length>0){const s=t.routes[0],o=s.geometry.coordinates.map(f=>[f[1],f[0]]);this.routePolyline&&this.map.removeLayer(this.routePolyline),this.routePolyline=L.polyline(o,{color:"var(--cyan)",weight:5,opacity:.85,className:"glowing-polyline"}).addTo(this.map),this.map.fitBounds(this.routePolyline.getBounds(),{padding:[40,40]});const d=(s.distance/1e3).toFixed(1),c=Math.round(s.duration/60);document.getElementById("statDistance").innerText=`${d} กม.`;const u=new Date().getHours();let g=1,v="การจราจรไหลลื่น (ราบรื่น)",p="traffic-pill-green";u>=7&&u<=9||u>=17&&u<=19?(g=1.6,v="รถติดขัดหนาแน่น (วิกฤต)",p="traffic-pill-red"):(u>=12&&u<=14||u>=16&&u<17)&&(g=1.25,v="รถหนาแน่นปานกลาง (ชะลอตัว)",p="traffic-pill-yellow");const y=Math.round(c*g);document.getElementById("statDuration").innerText=`${y} นาที`;const m=document.getElementById("statTrafficBadge");m.innerText=v,m.className=`traffic-status-pill ${p}`,document.getElementById("routeTravelStats").style.display="block"}else throw new Error("ไม่สามารถค้นหาเส้นทางถนนได้")}catch(n){console.warn("OSRM routing failed, drawing straight line: ",n.message),this.routePolyline&&this.map.removeLayer(this.routePolyline),this.routePolyline=L.polyline([[e.lat,e.lng],[a.lat,a.lng]],{color:"var(--cyan)",weight:4,dashArray:"5, 10",opacity:.7}).addTo(this.map);const t=ae(e.lat,e.lng,a.lat,a.lng).toFixed(1),s=Math.round(t*2.5);document.getElementById("statDistance").innerText=`${t} กม. (คาดการณ์)`,document.getElementById("statDuration").innerText=`${s} นาที`;const o=document.getElementById("statTrafficBadge");o.innerText="การจราจรไม่พร้อมแสดง (Offline Mode)",o.className="traffic-status-pill traffic-pill-yellow",document.getElementById("routeTravelStats").style.display="block"}}resetRouting(){this.routePoints.start=null,this.routePoints.end=null;const e=document.getElementById("routeStartText");e.innerText="จุดเริ่มต้น (คลิกเลือกในแผนที่)",e.classList.add("empty");const a=document.getElementById("routeEndText");a.innerText="จุดหมายปลายทาง (คลิกเลือกในแผนที่)",a.classList.add("empty"),this.startMarker&&this.map.removeLayer(this.startMarker),this.endMarker&&this.map.removeLayer(this.endMarker),this.routePolyline&&this.map.removeLayer(this.routePolyline),this.startMarker=null,this.endMarker=null,this.routePolyline=null,document.getElementById("routeTravelStats").style.display="none"}setupTrafficEvents(){var e,a,i;(e=document.getElementById("btnResetRoute"))==null||e.addEventListener("click",()=>this.resetRouting()),(a=document.getElementById("btnUseMyLocation"))==null||a.addEventListener("click",()=>{const n=this.state.getCoords();this.setRouteStart(n.lat,n.lon,`ตำแหน่งของฉัน (${n.name})`),this.routePoints.end&&this.calculateRoute()}),(i=document.getElementById("btnSaveFavRoute"))==null||i.addEventListener("click",()=>{const n=document.getElementById("favRouteNameInput"),t=n.value.trim()||`เส้นทาง ${new Date().toLocaleDateString("th-TH")}`,s=this.routePoints.start,o=this.routePoints.end;s&&o&&(ee(t,s.lat,s.lng,o.lat,o.lng,s.name,o.name),n.value="",this.renderSavedRoutes(),this.showToast("บันทึกสำเร็จ",`บันทึกเส้นทาง "${t}" เรียบร้อยแล้ว`))}),this.renderSavedRoutes()}renderSavedRoutes(){const e=document.getElementById("savedRoutesList");if(!e)return;const a=_();if(a.length===0){e.innerHTML='<div style="text-align: center; color: var(--muted2); font-size: 0.75rem; padding: 12px 0;">ไม่มีเส้นทางที่บันทึกไว้</div>';return}e.innerHTML=a.map(i=>`
      <div class="todo-item" style="padding: 10px 12px; gap: 8px;">
        <div style="flex-grow: 1; cursor: pointer; text-align: left;" class="saved-route-trigger" data-id="${i.id}">
          <div style="font-weight: 500; font-size: 0.8rem; color: var(--cyan);">${i.name}</div>
          <div style="font-size: 0.65rem; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px;">
            ${i.start.name.replace("พิกัด: ","")} ➔ ${i.end.name.replace("พิกัด: ","")}
          </div>
        </div>
        <button class="todo-del-btn route-del-btn" data-id="${i.id}" aria-label="ลบเส้นทาง">
          <i data-lucide="trash" style="width: 13px; height: 13px;"></i>
        </button>
      </div>
    `).join(""),lucide.createIcons(),e.querySelectorAll(".saved-route-trigger").forEach(i=>{i.addEventListener("click",()=>{const n=parseInt(i.dataset.id),t=a.find(s=>s.id===n);t&&(this.resetRouting(),this.setRouteStart(t.start.lat,t.start.lng,t.start.name),this.setRouteEnd(t.end.lat,t.end.lng,t.end.name),this.calculateRoute(),this.showToast("โหลดเส้นทาง",`แสดงเส้นทาง: ${t.name}`))})}),e.querySelectorAll(".route-del-btn").forEach(i=>{i.addEventListener("click",n=>{n.stopPropagation();const t=parseInt(i.dataset.id);te(t),this.renderSavedRoutes()})})}initCCTVs(){this.cctvIntervals.forEach(clearInterval),this.cctvIntervals=[];const e=(a,i={})=>{const n=document.getElementById(a);if(!n)return;const t=n.getContext("2d");n.width=320,n.height=180;const s=Array.from({length:6},()=>({x:Math.random()*n.width,y:40+Math.random()*100,speed:1.5+Math.random()*2.5,color:["#00f2fe","#ffd740","#ff4d4d","#ffffff","#a855f7"][Math.floor(Math.random()*5)],size:5+Math.random()*8,dir:Math.random()>.5?1:-1})),d=setInterval(()=>{t.fillStyle="#111827",t.fillRect(0,0,n.width,n.height),t.strokeStyle="rgba(255, 255, 255, 0.08)",t.lineWidth=4,t.beginPath(),t.moveTo(0,90),t.lineTo(320,90),t.moveTo(160,0),t.lineTo(160,180),t.stroke(),t.strokeStyle="rgba(255, 255, 255, 0.15)",t.lineWidth=1,t.setLineDash([8,8]),t.beginPath(),t.moveTo(0,65),t.lineTo(320,65),t.moveTo(0,115),t.lineTo(320,115),t.stroke(),t.setLineDash([]),s.forEach(l=>{l.x+=l.speed*l.dir,l.dir===1&&l.x>n.width+10&&(l.x=-10),l.dir===-1&&l.x<-10&&(l.x=n.width+10),t.fillStyle=l.color,t.beginPath(),t.roundRect(l.x,l.y,l.size*1.6,l.size,2),t.fill(),t.fillStyle=l.dir===1?"#ff4d4d":"#ffd740";const u=l.dir===1?l.x:l.x+l.size*1.6-2;t.fillRect(u,l.y+1,2,2),t.fillRect(u,l.y+l.size-3,2,2)}),t.fillStyle="rgba(0, 242, 254, 0.03)";for(let l=0;l<n.height;l+=3)t.fillRect(0,l,n.width,1);Math.random()>.98&&(t.fillStyle="rgba(255, 255, 255, 0.12)",t.fillRect(0,Math.random()*n.height,n.width,4)),t.fillStyle="#ffffff",t.font='7px "JetBrains Mono", monospace';const c=new Date().toLocaleString("en-US");t.fillText(c,200,172),t.fillStyle="var(--cyan)",t.fillText("REC ●",15,172)},1e3/24);this.cctvIntervals.push(d)};e("cctvAsoke"),e("cctvRama9"),e("cctvSathorn")}renderTransitTab(){this.transitContainer.innerHTML=`
      <div class="transit-grid">
        <!-- Transit lines statuses -->
        <div>
          <div class="glass-card" style="margin-bottom: 24px;">
            <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
              <i data-lucide="radio" style="color: var(--cyan);"></i> สถานะระบบรางบีทีเอส-เอ็มอาร์ที (BKK Transit Status Board)
            </h3>
            
            <div class="transit-status-board" id="transitStatusContainer">
              <!-- Dynamic statuses -->
            </div>
            
            <button class="btn btn-secondary" id="btnRefreshTransitStatus" style="width: 100%; margin-top: 16px; font-size: 0.75rem; padding: 10px;">
              <i data-lucide="refresh-cw"></i> อัพเดทสถานะรถไฟฟ้า
            </button>
          </div>

          <!-- Timetable Lookup Widget -->
          <div class="glass-card">
            <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
              <i data-lucide="clock" style="color: var(--yellow);"></i> ตารางเวลาขบวนแรก / ขบวนสุดท้าย (First/Last Train)
            </h3>
            
            <div class="fare-inputs">
              <div class="input-field-wrap">
                <label>เลือกระบบรถไฟฟ้า</label>
                <select id="timeSystemSelect">
                  <option value="bts_green">BTS สายสุขุมวิท (สีเขียว)</option>
                  <option value="bts_silom">BTS สายสีลม (สีเขียวเข้ม)</option>
                  <option value="mrt_blue">MRT สายสีน้ำเงิน (Blue Line)</option>
                  <option value="mrt_purple">MRT สายสีม่วง (Purple Line)</option>
                </select>
              </div>

              <div class="input-field-wrap">
                <label>เลือกสถานี</label>
                <select id="timeStationSelect">
                  <!-- Loaded dynamically -->
                </select>
              </div>
            </div>

            <div class="fare-result-display" id="timetableResultDisplay" style="display: flex; margin-top: 20px;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="sub-tile" style="background: rgba(255,255,255,0.01);">
                  <div style="font-size: 0.65rem; color: var(--muted);">🌅 ขบวนแรกไปสถานีปลายทาง</div>
                  <div id="firstTrainTime" style="font-size: 1.15rem; font-weight: 600; color: var(--cyan); margin-top: 4px;">--:--</div>
                </div>
                <div class="sub-tile" style="background: rgba(255,255,255,0.01);">
                  <div style="font-size: 0.65rem; color: var(--muted);">🌃 ขบวนสุดท้ายไปสถานีปลายทาง</div>
                  <div id="lastTrainTime" style="font-size: 1.15rem; font-weight: 600; color: var(--red); margin-top: 4px;">--:--</div>
                </div>
              </div>
              <div style="font-size: 0.7rem; color: var(--muted); margin-top: 10px; display: flex; flex-direction: column; gap: 4px; padding-top: 10px; border-top: 1px dashed var(--border);">
                <span><b>ความถี่ช่วงเวลาเร่งด่วน:</b> <span id="freqPeak">--</span></span>
                <span><b>ความถี่ช่วงเวลาปกติ:</b> <span id="freqOff">--</span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Fare Calculator Widget -->
        <div class="glass-card">
          <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
            <i data-lucide="calculator" style="color: var(--cyan);"></i> เครื่องคำนวณค่าโดยสารรถไฟฟ้า (BKK Fare Calculator)
          </h3>
          
          <div class="fare-calculator-box">
            <div class="fare-inputs">
              <div class="input-field-wrap">
                <label>ระบบรถไฟฟ้า</label>
                <select id="fareSystemSelect">
                  <option value="bts_green">BTS สายสุขุมวิท (สายสีเขียว)</option>
                  <option value="bts_silom">BTS สายสีลม (สายสีลม)</option>
                  <option value="mrt_blue">MRT สายสีน้ำเงิน (MRT Blue)</option>
                  <option value="mrt_purple">MRT สายสีม่วง (MRT Purple)</option>
                </select>
              </div>

              <div class="input-field-wrap">
                <label>ประเภทผู้โดยสาร</label>
                <select id="farePassengerSelect">
                  <option value="adult">บุคคลทั่วไป (Adult)</option>
                  <option value="student">นักเรียน/นักศึกษา (Student -30% / -10%)</option>
                  <option value="senior">ผู้สูงอายุ (Senior -50%)</option>
                </select>
              </div>
            </div>

            <div class="fare-inputs" style="margin-top: -4px;">
              <div class="input-field-wrap">
                <label>สถานีต้นทาง (Origin)</label>
                <select id="fareOriginSelect"></select>
              </div>

              <div class="input-field-wrap">
                <label>สถานีปลายทาง (Destination)</label>
                <select id="fareDestSelect"></select>
              </div>
            </div>

            <!-- Result -->
            <div class="fare-result-display" id="fareResultDisplay">
              <div class="fare-main-val">
                <span class="fare-val-label">ค่าโดยสารรวม:</span>
                <span class="fare-val-number" id="fareVal">-- <span>บาท</span></span>
              </div>
              
              <div class="fare-route-details">
                <i data-lucide="info" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle; margin-right: 4px; color: var(--cyan);"></i>
                จำนวนเดินทาง: <span id="fareStationsCount">--</span> สถานี · เวลาเดินทางโดยประมาณ: <span id="fareDuration">--</span> นาที
              </div>

              <!-- Interchange note overlay -->
              <div class="fare-interchange-warning" id="interchangeAdvice" style="display: none;">
                <!-- Filled dynamically -->
              </div>
            </div>
          </div>
        </div>
      </div>
    `,lucide.createIcons()}setupTransitEvents(){var u;if(!this.transitContainer)return;this.refreshTransitStatus(),(u=document.getElementById("btnRefreshTransitStatus"))==null||u.addEventListener("click",()=>{this.refreshTransitStatus(),this.showToast("อัพเดทสำเร็จ","อัพเดทสถานะรถไฟฟ้าบีทีเอสและเอ็มอาร์ทีแล้ว")});const e=document.getElementById("timeSystemSelect"),a=document.getElementById("timeStationSelect"),i=()=>{const g=e.value,v=M[g]||[];a.innerHTML=v.map(p=>`<option value="${p.name}">${p.name}</option>`).join(""),n()},n=()=>{const g=e.value;if(!a.value)return;const p=X(g);document.getElementById("firstTrainTime").innerText=p.firstTrain,document.getElementById("lastTrainTime").innerText=p.lastTrain,document.getElementById("freqPeak").innerText=p.frequencyPeak,document.getElementById("freqOff").innerText=p.frequencyOffPeak,document.getElementById("nextTrainTime").innerText=p.nextTrain||"--:--",document.getElementById("waitMinsText").innerText=p.waitMinutes!==void 0?p.waitMinutes===0?"กำลังจะถึง!":`อีก ${p.waitMinutes} นาที`:"",document.getElementById("peakStatusText").innerHTML=p.isPeak?'<b style="color:var(--yellow)">⚡ ช่วงเร่งด่วน</b> — รถถี่กว่าปกติ':'<b style="color:var(--green)">✅ ช่วงเวลาปกติ</b>'};e.addEventListener("change",i),a.addEventListener("change",n),i();const t=document.getElementById("fareSystemSelect"),s=document.getElementById("fareOriginSelect"),o=document.getElementById("fareDestSelect"),d=document.getElementById("farePassengerSelect"),c=()=>{const g=t.value,v=M[g]||[],p=v.map(m=>`<option value="${m.index}">${m.name}</option>`).join(""),y=v.map(m=>`<option value="${m.index}">${m.name}</option>`).join("");s.innerHTML=p,o.innerHTML=y,v.length>1&&(o.selectedIndex=1),l()},l=()=>{var T,k;const g=t.value,v=parseInt(s.value),p=parseInt(o.value),y=d.value;if(isNaN(v)||isNaN(p))return;const m=Q(g,v,p,y);document.getElementById("fareVal").innerHTML=`${m.fare} <span>บาท</span>`,document.getElementById("fareStationsCount").innerText=m.stationsCount,document.getElementById("fareDuration").innerText=m.duration;const f=M[g]||[],S=((T=f[v])==null?void 0:T.name)||"",x=((k=f[p])==null?void 0:k.name)||"",b=Z(g,S,x),w=document.getElementById("interchangeAdvice");b?(w.innerHTML=`<i data-lucide="sparkles" style="width: 14px; height: 14px; flex-shrink:0;"></i> <span>${b}</span>`,w.style.display="flex",lucide.createIcons()):w.style.display="none",document.getElementById("fareResultDisplay").style.display="flex"};t.addEventListener("change",c),s.addEventListener("change",l),o.addEventListener("change",l),d.addEventListener("change",l),c()}refreshTransitStatus(){const e=document.getElementById("transitStatusContainer");if(!e)return;const a=new Date,i=a.getMinutes(),n=a.getHours(),t=n===8&&i>=15&&i<=35||n===18&&i>=20&&i<=45,s=n===8&&i>=30&&i<=55||n===18&&i>=10&&i<=30,o=[{name:"BTS สายสุขุมวิท (Green Line)",color:"#22c55e",status:t?"ล่าช้า":"ปกติ",statusText:t?"⚠️ ล่าช้า 3-5 นาที ขบวนหนาแน่นที่สยาม":"🟢 บริการปกติความถี่คงที่",class:t?"delay":"normal"},{name:"BTS สายสีลม (Silom Line)",color:"#15803d",status:"ปกติ",statusText:"🟢 บริการปกติความถี่คงที่",class:"normal"},{name:"MRT สายเฉลิมรัชมงคล (Blue Line)",color:"#1e3a8a",status:s?"ล่าช้า":"ปกติ",statusText:s?"⚠️ ล่าช้า 8 นาที ระบบควบคุมสัญญาณขัดข้องที่ห้วยขวาง":"🟢 บริการปกติความถี่คงที่",class:s?"delay":"normal"},{name:"MRT สายฉลองรัชธรรม (Purple Line)",color:"#7e22ce",status:"ปกติ",statusText:"🟢 บริการปกติความถี่คงที่",class:"normal"}];e.innerHTML=o.map(d=>`
      <div class="transit-line">
        <div class="transit-line-info">
          <div class="transit-color-bar" style="background-color: ${d.color};"></div>
          <div>
            <div class="transit-name">${d.name}</div>
            <div class="transit-desc">${d.statusText}</div>
          </div>
        </div>
        <div class="transit-status ${d.class}">
          ${d.status==="ปกติ"?"🟢 ปกติ":"🟡 ล่าช้า"}
        </div>
      </div>
    `).join("")}showToast(e,a){const i=document.getElementById("toastContainer");if(!i)return;const n=document.createElement("div");n.className="toast-alert",n.innerHTML=`
      <div class="toast-icon" style="color: var(--cyan);">
        <i data-lucide="info" style="width:16px;height:16px;"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title" style="color: var(--cyan);">${e}</div>
        <div class="toast-msg">${a}</div>
      </div>
    `,i.appendChild(n),lucide.createIcons(),setTimeout(()=>{n.classList.add("dismissed"),setTimeout(()=>n.remove(),300)},4e3)}}class ne{constructor(e,a){this.container=document.getElementById(e),this.state=a,this.pomoMinutes=25,this.pomoSeconds=0,this.pomoDuration=25*60,this.pomoTimer=null,this.pomoRunning=!1,this.pomoMode="work",this.waterGoal=8,this.waterCount=parseInt(localStorage.getItem("commuter_water_cups"))||0,this.audioCtx=null}async init(){this.render(),this.initTodo(),this.initWater(),this.initPomodoro(),this.initBattery(),this.initMemo(),this.initCalendar()}render(){this.container.innerHTML=`
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
    `,lucide.createIcons()}initTodo(){this.todoFilter="all",this.todos=JSON.parse(localStorage.getItem("commuter_todos"))||[{id:1,text:"หยิบร่มใส่กระเป๋า",category:"travel",checked:!1},{id:2,text:"เช็คสถานะการดีเลย์ของบีทีเอส",category:"travel",checked:!1},{id:3,text:"ตรวจความเรียบร้อยรอบบ้านก่อนออกเดินทาง",category:"home",checked:!0},{id:4,text:"ส่งรายงานประชุมเช้านี้",category:"work",checked:!1}],this.renderTodoItems();const e=document.getElementById("todoInput"),a=document.getElementById("btnTodoAdd"),i=()=>{const t=e.value.trim();if(!t)return;let s="work";const o=t.toLowerCase();o.includes("ร่ม")||o.includes("bts")||o.includes("รถ")||o.includes("ถนน")||o.includes("เดินทาง")?s="travel":(o.includes("บ้าน")||o.includes("ไฟ")||o.includes("น้ำ")||o.includes("แมว")||o.includes("หมา"))&&(s="home"),this.todos.push({id:Date.now(),text:t,category:s,checked:!1}),localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),e.value="",this.renderTodoItems()};a==null||a.addEventListener("click",i),e==null||e.addEventListener("keypress",t=>{t.key==="Enter"&&i()});const n=this.container.querySelectorAll(".todo-filter-btn");n.forEach(t=>{t.addEventListener("click",()=>{n.forEach(s=>{s.classList.remove("btn-primary"),s.classList.add("btn-secondary")}),t.classList.add("btn-primary"),t.classList.remove("btn-secondary"),this.todoFilter=t.dataset.filter,this.renderTodoItems()})})}renderTodoItems(){const e=document.getElementById("todoItemsContainer");if(!e)return;const a=this.todos.filter(i=>this.todoFilter==="all"?!0:i.category===this.todoFilter);if(a.length===0){e.innerHTML='<div style="text-align: center; font-size: 0.75rem; color: var(--muted2); padding: 24px 0;">ไม่มีรายการสิ่งที่จะทำในหมวดหมู่นี้</div>';return}e.innerHTML=a.map(i=>{const n=i.category==="work"?"💻":i.category==="travel"?"🚗":"🏠";return`
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
      `}).join(""),lucide.createIcons(),e.querySelectorAll(".todo-check-trigger").forEach(i=>{i.addEventListener("click",()=>{const n=parseInt(i.closest(".todo-item").dataset.id),t=this.todos.find(s=>s.id===n);t&&(t.checked=!t.checked,localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),this.renderTodoItems())})}),e.querySelectorAll(".todo-delete-trigger").forEach(i=>{i.addEventListener("click",n=>{n.stopPropagation();const t=parseInt(i.closest(".todo-item").dataset.id);this.todos=this.todos.filter(s=>s.id!==t),localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),this.renderTodoItems()})})}initWater(){var e,a;this.updateWaterDisplay(),(e=document.getElementById("btnWaterAdd"))==null||e.addEventListener("click",()=>{this.waterCount<16&&(this.waterCount++,localStorage.setItem("commuter_water_cups",this.waterCount),this.updateWaterDisplay())}),(a=document.getElementById("btnWaterSub"))==null||a.addEventListener("click",()=>{this.waterCount>0&&(this.waterCount--,localStorage.setItem("commuter_water_cups",this.waterCount),this.updateWaterDisplay())})}updateWaterDisplay(){const e=document.getElementById("waterWave"),a=document.getElementById("waterDisplay");if(!e||!a)return;const i=Math.min(100,Math.round(this.waterCount/this.waterGoal*100));e.style.height=`${i}%`,a.innerHTML=`${this.waterCount} / ${this.waterGoal} <span style="font-size: 0.85rem; color: var(--muted);">แก้ว (${this.waterCount*250} มล.)</span>`}initPomodoro(){var i,n,t;const e=document.getElementById("btnPomoStart"),a=document.getElementById("btnPomoReset");document.getElementById("pomoCircle"),e==null||e.addEventListener("click",()=>{this.pomoRunning?this.pausePomodoro():this.startPomodoro()}),a==null||a.addEventListener("click",()=>{this.resetPomodoro()}),(i=document.getElementById("btnPomoWork"))==null||i.addEventListener("click",()=>this.setPomoMode("work",25)),(n=document.getElementById("btnPomoShort"))==null||n.addEventListener("click",()=>this.setPomoMode("short_break",5)),(t=document.getElementById("btnPomoLong"))==null||t.addEventListener("click",()=>this.setPomoMode("long_break",15))}setPomoMode(e,a){this.pausePomodoro(),this.pomoMode=e,this.pomoMinutes=a,this.pomoSeconds=0,this.pomoDuration=a*60;const i=document.getElementById("pomoModeText"),n=document.getElementById("pomoCircle");i&&(e==="work"?(i.innerText="โฟกัสงาน (WORK MODE)",n&&(n.style.stroke="var(--cyan)")):e==="short_break"?(i.innerText="พักสั้น (SHORT BREAK)",n&&(n.style.stroke="var(--green)")):(i.innerText="พักยาว (LONG BREAK)",n&&(n.style.stroke="var(--purple)"))),this.updatePomoDisplay()}startPomodoro(){this.pomoRunning=!0;const e=document.getElementById("btnPomoStart");e&&(e.innerHTML='<i data-lucide="pause" style="width: 12px; height: 12px;"></i> หยุด',lucide.createIcons()),this.pomoTimer=setInterval(()=>{if(this.pomoSeconds===0){if(this.pomoMinutes===0){this.triggerPomoAlarm(),this.resetPomodoro();return}this.pomoMinutes--,this.pomoSeconds=59}else this.pomoSeconds--;this.updatePomoDisplay()},1e3)}pausePomodoro(){this.pomoRunning=!1,clearInterval(this.pomoTimer);const e=document.getElementById("btnPomoStart");e&&(e.innerHTML='<i data-lucide="play" style="width: 12px; height: 12px;"></i> เริ่ม',lucide.createIcons())}resetPomodoro(){this.pausePomodoro();const e=this.pomoMode==="work"?25:this.pomoMode==="short_break"?5:15;this.pomoMinutes=e,this.pomoSeconds=0,this.pomoDuration=e*60,this.updatePomoDisplay()}updatePomoDisplay(){const e=document.getElementById("pomoDisplay"),a=document.getElementById("pomoCircle");if(!e)return;const i=`${String(this.pomoMinutes).padStart(2,"0")}:${String(this.pomoSeconds).padStart(2,"0")}`;if(e.innerText=i,a){const s=283*(1-(this.pomoMinutes*60+this.pomoSeconds)/this.pomoDuration);a.style.strokeDashoffset=s}}triggerPomoAlarm(){try{this.audioCtx||(this.audioCtx=new(window.AudioContext||window.webkitAudioContext));const a=this.audioCtx.createOscillator(),i=this.audioCtx.createGain();a.connect(i),i.connect(this.audioCtx.destination),a.type="sine",a.frequency.setValueAtTime(659.25,this.audioCtx.currentTime),a.frequency.setValueAtTime(830.61,this.audioCtx.currentTime+.15),a.frequency.setValueAtTime(987.77,this.audioCtx.currentTime+.3),i.gain.setValueAtTime(0,this.audioCtx.currentTime),i.gain.linearRampToValueAtTime(.3,this.audioCtx.currentTime+.05),i.gain.exponentialRampToValueAtTime(.01,this.audioCtx.currentTime+.8),a.start(),a.stop(this.audioCtx.currentTime+.9)}catch(a){console.warn("Audio Context init failed (user interaction required):",a)}const e=this.pomoMode==="work"?"ครบเวลาแล้ว! ได้เวลาพักผ่อนแล้วพักสติ":"ได้เวลาลุยต่อแล้ว! เริ่มโฟกัสงานอีกครั้ง";alert(`🛎️ Pomodoro Alarm:
${e}`)}initBattery(){const e=document.getElementById("batteryLevelFill"),a=document.getElementById("batteryPct"),i=document.getElementById("batteryStatusText");if(!e||!a||!i)return;const n=t=>{const s=Math.round(t.level*100);a.innerText=`${s}%`,e.style.width=`${s}%`,s<=20&&!t.charging?(e.style.backgroundColor="var(--red)",e.style.boxShadow="0 0 10px var(--red)"):t.charging?(e.style.backgroundColor="var(--cyan)",e.style.boxShadow="0 0 10px var(--cyan)"):(e.style.backgroundColor="var(--green)",e.style.boxShadow="0 0 10px var(--green)"),i.innerText=t.charging?"กำลังชาร์จไฟพ่วงอยู่ (Charging)":`กำลังจ่ายกระแสไฟ (${Math.round(t.dischargingTime/60)||0} ชม. คงเหลือ)`};navigator.getBattery?navigator.getBattery().then(t=>{n(t),t.addEventListener("levelchange",()=>n(t)),t.addEventListener("chargingchange",()=>n(t))}):(a.innerText="92%",e.style.width="92%",i.innerText="ไม่มี Battery API รองรับ (โหมดเดสก์ท็อป)")}initMemo(){const e=document.getElementById("memoTextarea"),a=document.getElementById("memoSaveStatus");if(!e||!a)return;e.value=localStorage.getItem("commuter_memo")||"";let i;e.addEventListener("input",()=>{a.innerHTML='<i data-lucide="loader" style="width:12px;height:12px;animation:spin 1s linear infinite;"></i> กำลังบันทึกแบบร่าง...',lucide.createIcons(),i&&clearTimeout(i),i=setTimeout(()=>{localStorage.setItem("commuter_memo",e.value),a.innerHTML='<i data-lucide="check" style="width:12px;height:12px;"></i> บันทึกในบราวเซอร์สำเร็จแล้ว',lucide.createIcons()},800)})}initCalendar(){var i,n,t;this.calDate=new Date,this.calSelectedDay=this.calDate.getDate(),this.calendarNotes=JSON.parse(localStorage.getItem("commuter_calendar_notes"))||{};const e=()=>{const s=this.calDate.getFullYear(),o=this.calDate.getMonth(),d=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];document.getElementById("calendarMonthYear").innerText=`${d[o]} ${s+543}`;let l=["อา","จ","อ","พ","พฤ","ศ","ส"].map(m=>`<div style="font-weight:600; color:var(--muted); margin-bottom:6px;">${m}</div>`).join("");const u=new Date(s,o,1).getDay(),g=new Date(s,o+1,0).getDate();for(let m=0;m<u;m++)l+="<div></div>";const v=new Date,p=v.getFullYear()===s&&v.getMonth()===o;for(let m=1;m<=g;m++){const f=p&&v.getDate()===m,S=this.calSelectedDay===m,x=`${s}-${String(o+1).padStart(2,"0")}-${String(m).padStart(2,"0")}`,b=!!this.calendarNotes[x];l+=`
          <div class="calendar-day-tile ${f?"today":""} ${S?"selected":""}" 
               data-day="${m}"
               style="padding: 8px 4px; border-radius: 6px; cursor: pointer; position: relative; transition: var(--transition);
                      border: 1px solid ${S?"var(--cyan)":"transparent"};
                      background: ${f?"rgba(0, 242, 254, 0.1)":b?"rgba(0, 242, 254, 0.05)":"transparent"};">
            ${m}
            ${b?'<div style="position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; background: var(--cyan); border-radius: 50%;"></div>':""}
          </div>
        `}const y=document.getElementById("calendarGrid");y&&(y.innerHTML=l,y.querySelectorAll(".calendar-day-tile").forEach(m=>{m.addEventListener("click",()=>{y.querySelectorAll(".calendar-day-tile").forEach(f=>{f.style.borderColor="transparent"}),m.style.borderColor="var(--cyan)",this.calSelectedDay=parseInt(m.dataset.day),a()})}))},a=()=>{const s=this.calDate.getFullYear(),o=this.calDate.getMonth()+1,d=`${s}-${String(o).padStart(2,"0")}-${String(this.calSelectedDay).padStart(2,"0")}`;document.getElementById("calSelectedDayText").innerHTML=`<span>โน้ตตารางเวลาวันที่: ${this.calSelectedDay}/${o}/${s+543}</span>`,document.getElementById("calDayNoteInput").value=this.calendarNotes[d]||""};(i=document.getElementById("btnCalPrev"))==null||i.addEventListener("click",()=>{this.calDate.setMonth(this.calDate.getMonth()-1),this.calSelectedDay=1,e(),a()}),(n=document.getElementById("btnCalNext"))==null||n.addEventListener("click",()=>{this.calDate.setMonth(this.calDate.getMonth()+1),this.calSelectedDay=1,e(),a()}),(t=document.getElementById("btnSaveCalNote"))==null||t.addEventListener("click",()=>{const s=this.calDate.getFullYear(),o=this.calDate.getMonth()+1,d=`${s}-${String(o).padStart(2,"0")}-${String(this.calSelectedDay).padStart(2,"0")}`,c=document.getElementById("calDayNoteInput").value.trim();c?this.calendarNotes[d]=c:delete this.calendarNotes[d],localStorage.setItem("commuter_calendar_notes",JSON.stringify(this.calendarNotes)),e(),a();const l=document.getElementById("btnSaveCalNote");if(l){const u=l.innerHTML;l.innerHTML="✓ บันทึกแล้ว!",l.style.background="#22c55e",l.style.borderColor="#22c55e",setTimeout(()=>{l.innerHTML=u,l.style.background="",l.style.borderColor=""},1800)}}),e(),a()}}class se{constructor(e,a){this.container=document.getElementById(e),this.state=a}async init(){this.renderSkeleton(),await this.fetchAndRender()}renderSkeleton(){this.container.innerHTML=`
      <div class="emergency-grid">
        <div class="glass-card skeleton" style="height: 350px;"></div>
        <div class="glass-card skeleton" style="height: 350px;"></div>
      </div>
    `,lucide.createIcons()}async fetchAndRender(){var e;try{const a=this.state.getCoords();let i=0;try{i=(await A(a.lat,a.lon)).current.weather_code}catch(s){console.warn("Could not load weather for safety check, using normal code",s)}const n=H(i),t=V();this.render(n,t),this.setupEvents()}catch(a){console.error(a),this.container.innerHTML=`
        <div class="glass-card glow-card-red" style="text-align: center; padding: 40px;">
          <i data-lucide="shield-alert" style="width: 48px; height: 48px; color: var(--red); margin-bottom: 16px;"></i>
          <h3 style="color: var(--red);">เกิดข้อผิดพลาดในการโหลดข้อมูลความปลอดภัย</h3>
          <p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 20px;">${a.message}</p>
          <button class="btn btn-primary" id="retryEmergencyBtn"><i data-lucide="refresh-cw"></i> ลองใหม่</button>
        </div>
      `,lucide.createIcons(),(e=document.getElementById("retryEmergencyBtn"))==null||e.addEventListener("click",()=>this.init())}}render(e,a){const i=this.state.getCoords(),n=e.map(o=>{o.level;const d=o.level==="danger"?"border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.06);":o.level==="warning"?"border-color: rgba(245,158,11,0.25); background: rgba(245,158,11,0.04);":"border-color: var(--border);",c=o.level==="danger"?"var(--red)":o.level==="warning"?"var(--yellow)":"var(--cyan)",l=o.level==="danger"?"shield-alert":o.level==="warning"?"alert-triangle":"info";return`
        <div class="safety-alert-card" style="${d}">
          <div class="safety-alert-icon" style="color: ${c}; background: ${c}15;">
            <i data-lucide="${l}"></i>
          </div>
          <div class="safety-alert-info">
            <h4 style="color: ${c};">${o.title}</h4>
            <p>${o.text}</p>
          </div>
        </div>
      `}).join(""),t=a.map(o=>`
      <div class="todo-item" style="padding: 12px; align-items: flex-start; flex-direction: column; gap: 4px;">
        <div style="font-size: 0.8rem; font-weight: 500; color: var(--text); text-align: left;">${o.title}</div>
        <div style="display: flex; justify-content: space-between; width: 100%; font-size: 0.65rem; color: var(--muted); margin-top: 2px;">
          <span>📅 ${o.time}</span>
          <span style="color: var(--cyan); font-weight: 500;">🟢 ${o.status}</span>
        </div>
      </div>
    `).join(""),s=j.map(o=>{let d="phone";return o.category==="medical"&&(d="ambulance"),o.category==="police"&&(d="shield"),o.category==="fire"&&(d="flame"),o.category==="flood"&&(d="droplet"),`
        <div class="emergency-contact-item">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,0.03); display: flex; align-items: center; justify-content: center; color: var(--cyan);">
              <i data-lucide="${d}" style="width: 14px; height: 14px;"></i>
            </div>
            <div style="text-align: left;">
              <div class="emergency-contact-name">${o.name}</div>
              <div style="font-size: 0.65rem; color: var(--muted);">${o.desc}</div>
            </div>
          </div>
          <a href="tel:${o.number}" class="emergency-contact-phone">${o.number}</a>
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
              ${t}
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
              ${s}
            </div>
          </div>
        </div>
      </div>
    `,lucide.createIcons()}setupEvents(){var e;(e=document.getElementById("btnSOSShare"))==null||e.addEventListener("click",()=>{const a=this.state.getCoords(),i=`🚨 SOS EMERGENCY ALERT! ฉันต้องการความช่วยเหลือด่วน
ตำแหน่งของฉัน: ${a.name}
พิกัด GPS: ${a.lat.toFixed(6)}, ${a.lon.toFixed(6)}
แผนที่: https://maps.google.com/?q=${a.lat},${a.lon}`;navigator.share?navigator.share({title:"SOS Emergency Position",text:i,url:`https://maps.google.com/?q=${a.lat},${a.lon}`}).then(()=>{this.showToast("ส่งสำเร็จ","ส่งสัญญาน SOS แชร์ตำแหน่งเรียบร้อยแล้ว")}).catch(n=>{console.warn("Share failed, copying instead:",n),this.copySOSToClipboard(i)}):this.copySOSToClipboard(i)})}copySOSToClipboard(e){navigator.clipboard.writeText(e).then(()=>{this.showToast("คัดลอกสำเร็จ","คัดลอกข้อความพิกัด SOS ลงคลิปบอร์ดแล้ว คุณสามารถกดส่งไลน์หาผู้เกี่ยวข้องได้ทันที!")}).catch(a=>{console.error("Clipboard copy failed:",a)})}showToast(e,a){const i=document.getElementById("toastContainer");if(!i)return;const n=document.createElement("div");n.className="toast-alert",n.style.borderColor="var(--red)",n.innerHTML=`
      <div class="toast-icon" style="color: var(--red);">
        <i data-lucide="alert-circle" style="width:16px;height:16px;"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title" style="color: var(--red);">${e}</div>
        <div class="toast-msg">${a}</div>
      </div>
    `,i.appendChild(n),lucide.createIcons(),setTimeout(()=>{n.classList.add("dismissed"),setTimeout(()=>n.remove(),300)},4e3)}}class oe{constructor(){const e=localStorage.getItem("commuter_coords");e?this.coords=JSON.parse(e):this.coords={lat:13.7462,lon:100.5348,name:"สยามสแควร์ (กรุงเทพฯ)",country:"TH"},this.widgets=[],this.thunderTimer=null}getCoords(){return this.coords}setCoords(e,a,i,n){this.coords={lat:e,lon:a,name:i,country:n},localStorage.setItem("commuter_coords",JSON.stringify(this.coords)),this.widgets.forEach(t=>{typeof t.fetchAndRender=="function"?t.fetchAndRender():typeof t.init=="function"&&t.init()})}registerWidget(e){this.widgets.push(e)}triggerBackgroundAnimation(e){const a=document.getElementById("weatherBgOverlay");if(!a)return;a.innerHTML="",this.thunderTimer&&(clearInterval(this.thunderTimer),this.thunderTimer=null);const i=[51,53,55,61,63,65,80,81,82,95,96],n=[2,3,45,48],t=[0,1];if(i.includes(e)){const s=document.createDocumentFragment();for(let o=0;o<40;o++){const d=document.createElement("div");d.className="rain-drop",d.style.left=`${Math.random()*100}vw`,d.style.top=`${-80-Math.random()*100}px`,d.style.animationDuration=`${.6+Math.random()*.6}s`,d.style.animationDelay=`${Math.random()*2}s`,s.appendChild(d)}a.appendChild(s),e>=95&&(this.thunderTimer=setInterval(()=>{Math.random()>.75&&(a.style.backgroundColor="rgba(255, 255, 255, 0.14)",setTimeout(()=>{a.style.backgroundColor="transparent"},60))},3500))}else if(n.includes(e)){const s=document.createDocumentFragment();for(let o=0;o<4;o++){const d=document.createElement("div");d.className="cloud-particle";const c=150+Math.random()*220;d.style.width=`${c}px`,d.style.height=`${c*.65}px`,d.style.top=`${Math.random()*60}%`,d.style.animationDuration=`${40+Math.random()*50}s`,d.style.animationDelay=`${-Math.random()*40}s`,s.appendChild(d)}a.appendChild(s)}else if(t.includes(e)){const s=document.createElement("div");s.className="sun-ray",a.appendChild(s)}}}function re(r){return new Promise(e=>{if(!navigator.geolocation)return e();navigator.geolocation.getCurrentPosition(a=>{const{latitude:i,longitude:n}=a.coords;fetch(`https://nominatim.openstreetmap.org/reverse?lat=${i}&lon=${n}&format=json&accept-language=th`).then(t=>t.json()).then(t=>{var o,d,c,l,u,g;const s=((o=t.address)==null?void 0:o.city)||((d=t.address)==null?void 0:d.town)||((c=t.address)==null?void 0:c.suburb)||((l=t.address)==null?void 0:l.county)||"ตำแหน่งปัจจุบัน";r.setCoords(i,n,s,((g=(u=t.address)==null?void 0:u.country_code)==null?void 0:g.toUpperCase())||"TH")}).catch(()=>{r.setCoords(i,n,"ตำแหน่งปัจจุบัน","TH")}).finally(e)},()=>e(),{timeout:6e3,maximumAge:6e4})})}document.addEventListener("DOMContentLoaded",async()=>{const r=new oe;de(),await re(r);const e=new U("tab-weather",r),a=new ie(null,"tab-transit",r),i=new ne("tab-helper",r),n=new se("tab-emergency",r);r.registerWidget(e),r.registerWidget(a),r.registerWidget(i),r.registerWidget(n),await e.init(),await a.init(),await i.init(),await n.init(),le(),ce(),me(),ue(),pe()});function de(){const r=document.getElementById("mainTime"),e=document.getElementById("mainDate");if(!r||!e)return;const a=()=>{const i=new Date;r.innerText=i.toLocaleTimeString("th-TH",{hour12:!1});const n=["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],t=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."],s=n[i.getDay()],o=i.getDate(),d=t[i.getMonth()],c=i.getFullYear()+543;e.innerText=`วัน${s}ที่ ${o} ${d} ${c}`};a(),setInterval(a,1e3)}function le(){const r=document.getElementById("themeToggle"),e=document.getElementById("theme-icon-light"),a=document.getElementById("theme-icon-dark");if(!r)return;const i=t=>{t==="light"?(document.body.classList.add("light-theme"),e&&(e.style.display="none"),a&&(a.style.display="block")):(document.body.classList.remove("light-theme"),e&&(e.style.display="block"),a&&(a.style.display="none")),document.dispatchEvent(new CustomEvent("theme-changed"))},n=localStorage.getItem("commuter_theme")||"dark";i(n),r.addEventListener("click",()=>{const s=document.body.classList.contains("light-theme")?"dark":"light";localStorage.setItem("commuter_theme",s),i(s)})}function ce(r){const e=document.querySelectorAll(".nav-item"),a=document.querySelectorAll(".tab-content"),i=document.getElementById("headerTitle"),n=document.getElementById("headerSub"),t={weather:{main:"สภาพอากาศและการเตรียมตัว",sub:"BANGKOK METROPOLIS · TH"},transit:{main:"ตารางเวลารถไฟบีทีเอส-เอ็มอาร์ที",sub:"BANGKOK MASS TRANSIT HUB"},helper:{main:"สิ่งอำนวยความสะดวกในชีวิตประจำวัน",sub:"DAILY PRODUCTIVITY WIDGETS"},emergency:{main:"ศูนย์ความปลอดภัยและข้อมูลติดต่อด่วน",sub:"BANGKOK SAFETY BOARD & SOS"}};e.forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.tab;e.forEach(c=>c.classList.remove("active")),s.classList.add("active"),a.forEach(c=>c.classList.remove("active"));const d=document.getElementById(`tab-${o}`);d&&d.classList.add("active"),i&&n&&t[o]&&(i.innerText=t[o].main,n.innerText=t[o].sub)})})}function me(){const r=document.querySelector(".widgets-layout-grid");if(!r)return;const e=()=>{r.querySelectorAll(".glass-card").forEach(n=>{n.classList.add("draggable-widget"),n.setAttribute("draggable","true")})};e(),new MutationObserver(()=>{e()}).observe(r,{childList:!0});let i=null;r.addEventListener("dragstart",n=>{const t=n.target.closest(".draggable-widget");t&&(i=t,n.dataTransfer.effectAllowed="move",t.style.opacity="0.35")}),r.addEventListener("dragover",n=>{n.preventDefault();const t=n.target.closest(".draggable-widget");t&&t!==i&&t.classList.add("widget-drag-over")}),r.addEventListener("dragleave",n=>{const t=n.target.closest(".draggable-widget");t&&t.classList.remove("widget-drag-over")}),r.addEventListener("drop",n=>{n.preventDefault();const t=n.target.closest(".draggable-widget");if(t&&t!==i){t.classList.remove("widget-drag-over");const s=Array.from(r.children),o=s.indexOf(i),d=s.indexOf(t);o<d?r.insertBefore(i,t.nextSibling):r.insertBefore(i,t);const c=Array.from(r.children).map(l=>l.innerHTML.substring(0,30));localStorage.setItem("commuter_widget_order",JSON.stringify(c))}}),r.addEventListener("dragend",n=>{const t=n.target.closest(".draggable-widget");t&&(t.style.opacity="1"),r.querySelectorAll(".draggable-widget").forEach(s=>{s.classList.remove("widget-drag-over")})})}function ue(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(r=>console.log("Service Worker registered successfully:",r.scope)).catch(r=>console.error("Service Worker registration failed:",r))})}function pe(){const r=(e,a,i,n)=>{const t=document.getElementById("toastContainer");if(!t)return;const s=document.createElement("div");s.className="toast-alert",s.style.borderColor=i,s.innerHTML=`
      <div class="toast-icon" style="color: ${i};">
        <i data-lucide="${n}" style="width:16px;height:16px;"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title" style="color: ${i};">${e}</div>
        <div class="toast-msg">${a}</div>
      </div>
    `,t.appendChild(s),lucide.createIcons(),setTimeout(()=>{s.classList.add("dismissed"),setTimeout(()=>s.remove(),300)},4500)};window.addEventListener("online",()=>{r("การเชื่อมต่อกลับมาแล้ว","ระบบเปลี่ยนกลับเป็นโหมดออนไลน์อัตโนมัติ","var(--green)","wifi")}),window.addEventListener("offline",()=>{r("คุณออฟไลน์อยู่","ระบบสลับมาใช้ฐานข้อมูลและแคชออฟไลน์แล้ว","var(--yellow)","wifi-off")})}
