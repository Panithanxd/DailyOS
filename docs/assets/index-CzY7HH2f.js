(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function i(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(a){if(a.ep)return;a.ep=!0;const n=i(a);fetch(a.href,n)}})();const W=10*60*1e3;async function O(r,e={},i=W){const t=`api_cache_${r}`;if(!navigator.onLine){const n=localStorage.getItem(t);if(n){const{data:s}=JSON.parse(n);return console.log(`[API Cache] Offline mode: Served ${r} from cache.`),s}throw new Error("ระบบออฟไลน์และไม่มีข้อมูลสำรองสำหรับคำขอนี้")}const a=localStorage.getItem(t);if(a){const{data:n,timestamp:s}=JSON.parse(a);if(Date.now()-s<i)return n}try{const n=await fetch(r,e);if(!n.ok)throw new Error(`HTTP Error: ${n.status}`);const s=await n.json();return localStorage.setItem(t,JSON.stringify({data:s,timestamp:Date.now()})),s}catch(n){if(console.warn(`[API Cache] Fetch failed, fallback to cache for ${r}:`,n.message),a){const{data:s}=JSON.parse(a);return s}throw n}}const B={0:["☀️","CLEAR SKY","ท้องฟ้าแจ่มใส"],1:["🌤","MAINLY CLEAR","ท้องฟ้าโปร่ง"],2:["⛅","PARTLY CLOUDY","มีเมฆบางส่วน"],3:["☁️","OVERCAST","เมฆครึ้ม"],45:["🌫","FOGGY","หมอกลงจัด"],48:["🌫","RIME FOG","หมอกน้ำค้างแข็ง"],51:["🌦","LIGHT DRIZZLE","ฝนตกปรอยๆ เล็กน้อย"],53:["🌦","DRIZZLE","ฝนตกปรอยๆ"],55:["🌧","HEAVY DRIZZLE","ฝนตกปรอยหนาแน่น"],61:["🌧","LIGHT RAIN","ฝนตกเล็กน้อย"],63:["🌧","MODERATE RAIN","ฝนตกปานกลาง"],65:["🌧","HEAVY RAIN","ฝนตกชุกหนาแน่น"],80:["🌦","RAIN SHOWERS","ฝนตกกระจายตัว"],81:["⛈","STORM","พายุฝนฟ้าคะนอง"],82:["⛈","HEAVY STORM","พายุฝนคะนองรุนแรง"],95:["⛈","THUNDERSTORM","พายุฝนรุนแรงและฟ้าผ่า"],96:["⛈","HAIL STORM","พายุฝนฟ้าคะนองและลูกเห็บ"]},R=[{max:50,col:"#10b981",lbl:"ดีเยี่ยม (Good)",advice:"คุณภาพอากาศดีมาก เหมาะสำหรับทำกิจกรรมกลางแจ้ง"},{max:100,col:"#f59e0b",lbl:"ปานกลาง (Moderate)",advice:"คุณภาพอากาศปานกลาง กลุ่มเสี่ยงควรหลีกเลี่ยงกิจกรรมกลางแจ้งเป็นเวลานาน"},{max:150,col:"#ff9f43",lbl:"เริ่มมีผลกระทบ (Sensitive)",advice:"ควรสวมหน้ากากอนามัยเมื่ออยู่นอกอาคาร และลดการออกกำลังกายกลางแจ้ง"},{max:200,col:"#ef4444",lbl:"มีผลเสียต่อสุขภาพ (Unhealthy)",advice:"⚠️ สวมหน้ากาก PM2.5 ตลอดเวลาเมื่ออยู่กลางแจ้ง หลีกเลี่ยงกิจกรรมนอกอาคาร"},{max:300,col:"#b71c1c",lbl:"แย่อย่างยิ่ง (Very Unhealthy)",advice:"🚨 เป็นอันตรายต่อสุขภาพ! ควรอยู่ในอาคารที่ปิดมิดชิดและเปิดเครื่องฟอกอากาศ"},{max:500,col:"#7f1d1d",lbl:"อันตรายสูงสุด (Hazardous)",advice:"❌ วิกฤตคุณภาพอากาศร้ายแรง! ห้ามออกนอกอาคารโดยไม่จำเป็น"}];async function A(r,e){const i=`https://api.open-meteo.com/v1/forecast?latitude=${r}&longitude=${e}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max&timezone=Asia%2FBangkok`,t=`api_cache_${i}`,a=localStorage.getItem(t);if(a)try{const{timestamp:n}=JSON.parse(a);Date.now()-n>10*60*1e3&&localStorage.removeItem(t)}catch{localStorage.removeItem(t)}return await O(i,{},10*60*1e3)}async function N(r,e){const i=`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${r}&longitude=${e}&current=us_aqi,pm2_5&timezone=Asia%2FBangkok`;return await O(i,{},10*60*1e3)}async function J(r){if(!r)return[];const e=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(r)}&count=5&language=th&format=json`;try{return(await(await fetch(e)).json()).results||[]}catch(i){return console.error("Location search failed:",i),[]}}function j(r,e){return[51,53,55,61,63,65,80,81,82,95,96].includes(r)||e>=40?{needed:!0,text:"☔ ควรพกร่มหรือเสื้อกันฝน! มีโอกาสเกิดฝนตกสูงในระหว่างวัน",color:"var(--cyan)"}:e>=15?{needed:!1,text:"🌤️ ฝนตกยาก แต่ท้องฟ้าอาจครึ้มๆ เล็กน้อย ไม่จำเป็นต้องพกร่ม",color:"var(--muted)"}:{needed:!1,text:"☀️ ท้องฟ้าแจ่มใส/แดดจัด เดินทางสะดวก ไม่จำเป็นต้องพกร่ม",color:"var(--green)"}}function G(r,e,i){return[51,53,55,61,63,65,80,81,82,95,96].includes(i)?"เสื้อผ้าแห้งไว (Quick-Dry) หรือเสื้อคลุมกันน้ำ หลีกเลี่ยงรองเท้าผ้าใบสีขาว":r>=35?"เสื้อผ้าฝ้ายบางเบา ระบายอากาศดีเยี่ยม หมวก แว่นกันแดด และควรทาครีมกันแดด":r>=28?"เสื้อผ้าสวมใส่สบาย เช่น เสื้อยืด แขนสั้น กางเกงขาสั้น/ระบายความร้อนได้ดี":r>=22?"เสื้อยืดแขนสั้น หรือเชิ้ตบางๆ สภาพอากาศกำลังเย็นสบายกำลังดี":"สวมเสื้อแขนยาว หรือเตรียมเสื้อแจ็คเก็ตบางๆ ไปด้วยเนื่องจากอากาศค่อนข้างเย็น"}function V(r){return r>=8?{text:"อันตรายระดับสูงมาก! หลีกเลี่ยงแสงแดดช่วง 10:00 - 16:00 ทากันแดด SPF 30+ สวมหมวกและแว่นกันแดด",color:"var(--red)"}:r>=6?{text:"ระดับสูง! ควรทาครีมกันแดด สวมหมวกปีกกว้าง และสวมแว่นกันแดดเมื่อออกกลางแดด",color:"var(--yellow)"}:r>=3?{text:"ระดับปานกลาง ควรกางร่มเมื่อเดินกลางแจ้งเป็นเวลานาน",color:"var(--cyan)"}:{text:"ระดับต่ำ ปลอดภัยต่อการออกแดดทั่วไป",color:"var(--green)"}}const K=[{name:"สายด่วนเจ็บป่วยฉุกเฉิน (สพฉ.)",number:"1669",category:"medical",desc:"กู้ชีพและอุบัติเหตุแพทย์ฉุกเฉิน"},{name:"เหตุด่วนเหตุร้าย (ตำรวจ)",number:"191",category:"police",desc:"แจ้งเหตุด่วนตำรวจหลัก"},{name:"สายด่วนข้อมูลการจราจร (บก.02)",number:"1197",category:"traffic",desc:"ศูนย์ควบคุมสั่งการจราจรกรุงเทพฯ"},{name:"ตำรวจทางหลวง",number:"1193",category:"traffic",desc:"เหตุบนมอเตอร์เวย์และทางหลวงแผ่นดิน"},{name:"แจ้งเหตุอัคคีภัย/ดับเพลิง",number:"199",category:"fire",desc:"นักดับเพลิงและกู้ภัยกรุงเทพฯ"},{name:"ศูนย์แพทย์ฉุกเฉินกทม. (ศูนย์เอราวัณ)",number:"1646",category:"medical",desc:"หน่วยแพทย์เคลื่อนที่กทม."},{name:"สายด่วนข้อมูลน้ำท่วมกทม.",number:"1555",category:"flood",desc:"ศูนย์ประสานงานน้ำท่วมกรุงเทพฯ"},{name:"สถานีวิทยุจราจรเพื่อการแจ้งเหตุ (จส.100)",number:"1137",category:"traffic",desc:"รายงานอุบัติเหตุและของหาย"}];function H(r){const e=[];return[61,63,65,80,81,82,95,96].includes(r)&&(e.push({id:"rain_alert",level:"warning",title:"🌧️ แจ้งเตือนฝนฟ้าคะนองในพื้นที่",text:"มีฝนตกชุกหนาแน่นและลมกรรโชกแรงในเขตกรุงเทพมหานครและปริมณฑล หลีกเลี่ยงการเดินทางกลางแจ้งหากไม่จำเป็น"}),r>=63&&e.push({id:"flood_alert",level:"danger",title:"🚨 พื้นที่เสี่ยงน้ำท่วมขังรอระบาย",text:"เนื่องจากมีปริมาณน้ำสะสมสูง พบปัญหาถนนน้ำขังระดับ 10-15 ซม. ที่ ถนนอโศกมนตรี (หน้า ตึก GMM), แยกรัชดา-ลาดพร้าว และซอยสุขุมวิท 39"})),e.push({id:"aqi_alert",level:"info",title:"😷 อัพเดทสถานการณ์ฝุ่น PM 2.5",text:"ค่าฝุ่นละออง PM 2.5 วันนี้มีแนวโน้มสะสมตัวเนื่องจากสภาพลมสงบ แนะนำตรวจเช็คดัชนีคุณภาพอากาศก่อนทำกิจกรรมกลางแจ้งทุกครั้ง"}),e}function Y(){const r=[],e=new Date,i=["ถนนลาดพร้าว ซอย 80 (งานปรับปรุงระบบจำหน่ายแรงสูงเพื่อความปลอดภัย)","ซอยสุขุมวิท 22 (ติดตั้งอุปกรณ์ตรวจวัดกระแสไฟฟ้าแรงสูง)","ถนนพระราม 9 ซอย 15 (ย้ายเสาพาดสายหลบแนวก่อสร้างทางรถไฟฟ้า)"];for(let t=0;t<3;t++){const a=new Date(e);a.setDate(e.getDate()+t+1),r.push({id:`outage_${t}`,title:`⚡ ประกาศดับไฟเพื่อบำรุงรักษา — ${i[t]}`,time:`${a.toLocaleDateString("th-TH",{day:"numeric",month:"short"})} | 08:30 น. - 15:30 น.`,status:"กำลังดำเนินการตามแผน"})}return r}class U{constructor(e,i){this.containerId=e,this.state=i}async init(){this.container=document.getElementById(this.containerId),this.container&&(this.renderSkeleton(),await this.fetchAndRender())}renderSkeleton(){this.container.innerHTML=`
      <div class="glass-card skeleton" style="height: 120px;"></div>
    `}async fetchAndRender(){try{const e=this.state.getCoords(),i=await A(e.lat,e.lon),t=await N(e.lat,e.lon),a=i.current.weather_code,n=H(a);this.render(i,t,n)}catch(e){console.warn("Commute insights fetch error:",e.message),this.container.innerHTML=""}}render(e,i,t){const a=e.current,n=i.current.us_aqi,o=new Date().getHours();let d="",l="🌟",c="เช้าอันสดใส เหมาะแก่การเดินทาง",p="var(--cyan)";const y=[61,63,65,80,81,82,95,96].includes(a.weather_code);t.some(w=>w.id==="flood_alert")?(d="<b>แจ้งเตือนภัยพิบัติ:</b> มีฝนตกหนักน้ำท่วมขังในบางพื้นที่และพบบีทีเอสขัดข้อง ดีเลย์ประมาณ 8 นาที แนะนำให้เผื่อเวลาอย่างน้อย 20-30 นาทีในการเดินทางช่วงนี้",l="🚨",c="แจ้งเตือน: การเดินทางมีความเสี่ยงสูง",p="var(--red)"):y?(d="<b>พยากรณ์ฝนตก:</b> ท้องฟ้าครึ้มฝนฟ้าคะนองในเขตกทม. แนะนำให้พกร่มและสวมใส่รองเท้าที่กันน้ำได้ การจราจรบนทางด่วนอาจชะลอตัวเนื่องจากทัศนวิสัยต่ำ",l="☔",c="เตือนภัย: มีฝนฟ้าคะนองในพื้นที่",p="var(--yellow)"):a.temperature_2m>=35?(d="<b>สภาพอากาศร้อนจัด:</b> อุณหภูมิพุ่งสูงถึง 36°C+ แนะนำให้สวมใส่เสื้อผ้าเบาสบาย ระบายอากาศได้ดี หลีกเลี่ยงแดดจัดช่วงเที่ยง-บ่าย และพกน้ำดื่มติดตัว",l="☀️",c="เตือนภัย: สภาพอากาศร้อนจัด (Extreme Heat)",p="#f59e0b"):n>150?(d="<b>มลพิษทางอากาศ:</b> ค่าฝุ่น PM 2.5 วันนี้สูงเกินมาตรฐาน (US AQI: "+n+") แนะนำให้สวมใส่หน้ากาก N95 ก่อนทำกิจกรรมกลางแจ้ง",l="😷",c="เตือนภัย: คุณภาพอากาศเป็นอันตราย",p="#a855f7"):(d="<b>สภาพอากาศเอื้ออำนวย:</b> อากาศปลอดโปร่ง ไม่มีรายงานดีเลย์รถไฟฟ้า การจราจรช่วงเช้านี้ไหลลื่นปกติ ขอให้คุณเดินทางด้วยความสุขความปลอดภัย!",l="✨",c="สถานการณ์ปกติ: เดินทางได้ราบรื่น",p="var(--cyan)");let u=30,m="เบาบาง (เดินทางสะดวก)",f="var(--green)";o>=7&&o<=9||o>=17&&o<=19?(u=85,m="หนาแน่นสูง (ชานชาลาแออัด)",f="var(--red)"):(o>=11&&o<=13||o>=16&&o<17)&&(u=55,m="ปานกลาง (มีผู้โดยสารพ้นเก้าอี้)",f="var(--yellow)");let b="07:00 น. หรือ หลัง 09:15 น.",x="16:30 น. หรือ หลัง 19:30 น.";y&&(b="เดินทางล่วงหน้าเร็วขึ้น 30 นาที",x="รอฝนซาหลัง 19:30 น."),this.container.innerHTML=`
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
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 500; color: ${f};">
                  <span>${m}</span>
                  <span style="font-family: 'Outfit';">${u}%</span>
                </div>
                <div style="width: 100%; height: 4px; background: var(--muted2); border-radius: 99px; overflow: hidden; margin-top: 4px;">
                  <div style="width: ${u}%; height: 100%; background: ${f}; border-radius: 99px; box-shadow: 0 0 8px ${f};"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `,lucide.createIcons()}}class Q{constructor(e,i){this.container=document.getElementById(e),this.state=i,this.searchTimeout=null}async init(){this.renderSkeleton(),await this.fetchAndRender()}renderSkeleton(){this.container.innerHTML=`
      <div class="search-box-container">
        <div class="search-input-wrap">
          <i data-lucide="search"></i>
          <input type="text" id="weatherSearchInput" placeholder="เธเนเธเธซเธฒเธเธทเนเธญเน€เธกเธทเธญเธ เธญเธณเน€เธ เธญ เธซเธฃเธทเธญเธเธฑเธเธซเธงเธฑเธ”..." autocomplete="off">
        </div>
        <div class="suggestions-list" id="weatherSuggestions"></div>
      </div>
      <div class="glass-card skeleton" style="height: 180px; margin-bottom: 24px;"></div>
      <div class="weather-tiles">
        <div class="glass-card skeleton" style="height: 100px;"></div>
        <div class="glass-card skeleton" style="height: 100px;"></div>
      </div>
    `,lucide.createIcons()}async fetchAndRender(){var e;try{const i=this.state.getCoords(),t=await A(i.lat,i.lon),a=await N(i.lat,i.lon);this.render(t,a),this.setupSearchEvents()}catch(i){console.error(i),this.container.innerHTML=`
        <div class="glass-card glow-card-red" style="text-align: center; padding: 40px;">
          <i data-lucide="wifi-off" style="width: 48px; height: 48px; color: var(--red); margin-bottom: 16px;"></i>
          <h3 style="color: var(--red); margin-bottom: 10px;">เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃเธ”เธถเธเธเนเธญเธกเธนเธฅเธชเธ เธฒเธเธญเธฒเธเธฒเธจ</h3>
          <p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 20px;">${i.message}</p>
          <button class="btn btn-primary" id="retryWeatherBtn"><i data-lucide="refresh-cw"></i> เธฅเธญเธเนเธซเธกเน</button>
        </div>
      `,lucide.createIcons(),(e=document.getElementById("retryWeatherBtn"))==null||e.addEventListener("click",()=>this.init())}}render(e,i){const t=e.current,a=this.state.getCoords(),[n,s,o]=B[t.weather_code]||["๐ก๏ธ","UNKNOWN","เธชเธ เธฒเธเธญเธฒเธเธฒเธจเนเธกเนเธฃเธฐเธเธธ"],d=e.daily.sunrise[0].slice(11,16),l=e.daily.sunset[0].slice(11,16),c=new Date,p=c.getHours()*60+c.getMinutes(),v=parseInt(d.slice(0,2))*60+parseInt(d.slice(3,5)),y=parseInt(l.slice(0,2))*60+parseInt(l.slice(3,5)),h=Math.min(100,Math.max(0,(p-v)/(y-v)*100));j(t.weather_code,e.hourly.precipitation_probability[0]),G(t.temperature_2m,t.apparent_temperature,t.weather_code);const u=V(e.daily.uv_index_max[0]);this.state.setWeatherCode(t.weather_code),this.state.triggerBackgroundAnimation(t.weather_code);const m=c.getHours();let f="";for(let g=0;g<16;g++){const T=(m+g)%24,S=Math.round(e.hourly.temperature_2m[m+g]),$=e.hourly.weather_code[m+g],_=e.hourly.precipitation_probability[m+g],C=(B[$]||["๐ก๏ธ"])[0];f+=`
        <div class="hourly-item ${g===0?"now":""}">
          <div class="hourly-time">${g===0?"เธ•เธญเธเธเธตเน":`${String(T).padStart(2,"0")}:00`}</div>
          <div class="hourly-icon">${C}</div>
          <div class="hourly-temp">${S}ยฐC</div>
          ${_>20?`<div style="font-size:0.6rem; color:var(--cyan); margin-top:2px;">โ”${_}%</div>`:""}
        </div>
      `}let b="";for(let g=0;g<7;g++){const T=new Date(e.daily.time[g]),S=T.toLocaleDateString("th-TH",{weekday:"short"}),$=T.toLocaleDateString("th-TH",{day:"numeric",month:"short"}),_=Math.round(e.daily.temperature_2m_max[g]),C=Math.round(e.daily.temperature_2m_min[g]),z=e.daily.precipitation_probability_max[g],q=(B[e.daily.weather_code[g]]||["๐ก๏ธ"])[0];b+=`
        <div class="daily-item">
          <div class="daily-date">
            <span style="font-weight: 500;">${S}</span><br>
            <span style="font-size: 0.65rem; color: var(--muted);">${$}</span>
          </div>
          <div class="daily-icon-desc">
            <span class="daily-icon">${q}</span>
            ${z>20?`<span class="daily-rain-chance"><i data-lucide="droplet" style="width:10px;height:10px;"></i> ${z}%</span>`:'<span style="font-size: 0.7rem; color: var(--muted2);">เนเธกเนเธกเธตเธเธ</span>'}
          </div>
          <div class="daily-temps">
            <span class="daily-temp-max">${_}ยฐ</span>
            <span class="daily-temp-min">${C}ยฐ</span>
          </div>
        </div>
      `}const x=i.current.us_aqi,w=i.current.pm2_5;let M="var(--muted)",k="เนเธกเนเธกเธตเธเนเธญเธกเธนเธฅ";if(x!==void 0){for(const g of R)if(x<=g.max){M=g.col,k=g.lbl,g.advice;break}}this.container.innerHTML=`
      <!-- Location Search Bar -->
      <div class="search-box-container">
        <div class="search-input-wrap">
          <i data-lucide="search"></i>
          <input type="text" id="weatherSearchInput" placeholder="เธเนเธเธซเธฒเธเธทเนเธญเน€เธกเธทเธญเธ เธญเธณเน€เธ เธญ เธซเธฃเธทเธญเธเธฑเธเธซเธงเธฑเธ”..." autocomplete="off">
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
              เธชเธ เธฒเธเธญเธฒเธเธฒเธจเธเธฑเธเธเธธเธเธฑเธ (${a.name})
            </div>
            <div class="weather-main-info">
              <div class="weather-big-icon float-effect">${n}</div>
              <div>
                <div class="weather-main-temp">${Math.round(t.temperature_2m)}<sup>ยฐC</sup></div>
                <div class="weather-main-desc">${o}</div>
                <div class="weather-feels-like">เธฃเธนเนเธชเธถเธเน€เธซเธกเธทเธญเธเธเธฃเธดเธเธเธฃเธฐเธกเธฒเธ“ ${Math.round(t.apparent_temperature)}ยฐC</div>
              </div>
            </div>
          </div>

          <!-- Quick Stats Indicators -->
          <div class="weather-tiles">
            <div class="sub-tile">
              <div style="font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; font-family: 'JetBrains Mono', monospace;">เธเธงเธฒเธกเธเธทเนเธเธชเธฑเธกเธเธฑเธ—เธเน</div>
              <div style="font-size: 1.5rem; font-weight: 500; font-family: 'Outfit';">${t.relative_humidity_2m}%</div>
            </div>
            <div class="sub-tile">
              <div style="font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; font-family: 'JetBrains Mono', monospace;">เธเธงเธฒเธกเน€เธฃเนเธงเธฅเธก</div>
              <div style="font-size: 1.5rem; font-weight: 500; font-family: 'Outfit';">${Math.round(t.wind_speed_10m)} <span style="font-size: 0.75rem; color: var(--muted);">เธเธก./เธเธก.</span></div>
            </div>
            <div class="sub-tile">
              <div style="font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; font-family: 'JetBrains Mono', monospace;">เธ”เธฑเธเธเธต UV เธงเธฑเธเธเธตเน</div>
              <div style="font-size: 1.5rem; font-weight: 500; font-family: 'Outfit'; color: ${e.daily.uv_index_max[0]>=6?"var(--yellow)":"var(--text)"};">
                ${Math.round(e.daily.uv_index_max[0])}
              </div>
            </div>
            <div class="sub-tile">
              <div style="font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; font-family: 'JetBrains Mono', monospace;">เธ—เธฑเธจเธเธงเธดเธชเธฑเธข</div>
              <div style="font-size: 1.5rem; font-weight: 500; font-family: 'Outfit';">${(t.visibility/1e3).toFixed(1)} <span style="font-size: 0.75rem; color: var(--muted);">เธเธก.</span></div>
            </div>
          </div>
        </div>

        <!-- Hourly forecast -->
        <div class="weather-strip-title">
          <i data-lucide="clock"></i> เธเธขเธฒเธเธฃเธ“เนเธฃเธฒเธขเธเธฑเนเธงเนเธกเธ (16 เธเธก. เธฅเนเธงเธเธซเธเนเธฒ)
        </div>
        <div class="hourly-container">
          ${f}
        </div>

        <!-- Weekly & Additional Details -->
        <div class="daily-forecast-container">
          <div class="daily-list">
            <div style="font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 2px; font-family: 'JetBrains Mono', monospace; margin-bottom: 8px; display:flex; align-items:center; gap:6px;">
              <i data-lucide="calendar" style="width:14px; height:14px;"></i> เธเธขเธฒเธเธฃเธ“เนเธญเธฒเธเธฒเธจเธฅเนเธงเธเธซเธเนเธฒ 7 เธงเธฑเธ
            </div>
            ${b}
          </div>

          <div class="weather-sub-cards">
            <!-- Solar Track card -->
            <div class="glass-card">
              <div style="font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 2px; font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; display:flex; align-items:center; gap:6px;">
                <i data-lucide="sun" style="width:14px; height:14px;"></i> เธงเธดเธ–เธตเนเธชเธเธ•เธฐเธงเธฑเธ (Solar Orbit)
              </div>
              
              <div class="solar-track-box">
                <div class="solar-track-header">
                  <span>๐… ${d} เธ.</span>
                  <span>${l} เธ. ๐</span>
                </div>
                <div class="solar-track-line">
                  <div class="solar-track-fill" style="width: ${h}%"></div>
                  <div class="solar-sun-dot" style="left: ${h}%">โ€๏ธ</div>
                </div>
                <div class="solar-stats">
                  <div class="solar-stat-item">เนเธญเธเธฒเธชเน€เธเธดเธ”เธเธเธงเธฑเธเธเธตเน<b>${e.daily.precipitation_probability_max[0]}%</b></div>
                  <div class="solar-stat-item">เธ”เธฑเธเธเธตเนเธชเธเนเธ”เธ” (UV)<b>${Math.round(e.daily.uv_index_max[0])}</b></div>
                </div>
              </div>
              
              <div style="font-size:0.7rem; color:var(--muted); line-height:1.4; border-top:1px solid var(--border); padding-top:12px; margin-top:12px;">
                <strong>เธเนเธฒเนเธ”เธ”เธชเธนเธเธชเธธเธ”:</strong> ${u.text}
              </div>
            </div>

            <!-- AQI card -->
            <div class="glass-card" style="border-color: ${M}33;">
              <div style="font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 2px; font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; display:flex; align-items:center; gap:6px;">
                <i data-lucide="wind" style="width:14px; height:14px;"></i> เธ”เธฑเธเธเธตเธเธธเธ“เธ เธฒเธเธญเธฒเธเธฒเธจ (US AQI)
              </div>
              
              <div class="aqi-row">
                <div>
                  <div class="aqi-number" style="color: ${M};">${x??"--"}</div>
                  <div class="aqi-label" style="color: ${M};">${k}</div>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 0.65rem; color: var(--muted);">เธเธฃเธดเธกเธฒเธ“เธเธธเนเธ PM 2.5</span><br>
                  <b style="font-size: 1.15rem; font-family: 'Outfit';">${(w==null?void 0:w.toFixed(1))??"--"} <span style="font-size: 0.7rem; font-weight: normal;">ฮผg/mยณ</span></b>
                </div>
              </div>

              <!-- Colorful AQI Scale -->
              <div class="aqi-scale-bar">
                ${R.map((g,T)=>`<div class="aqi-scale-segment ${x!==void 0&&(T===0?x<=50:x>R[T-1].max&&x<=g.max)?"active":""}" style="background-color: ${g.col}; color: ${g.col};"></div>`).join("")}
              </div>
              <div style="display:flex; justify-content:space-between; font-size: 0.5rem; color: var(--muted); font-family: 'JetBrains Mono', monospace; margin-top: 6px;">
                <span>0</span><span>50</span><span>100</span><span>150</span><span>200</span><span>300+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,new U("commuteBriefingContainer",this.state).init(),lucide.createIcons()}setupSearchEvents(){const e=document.getElementById("weatherSearchInput"),i=document.getElementById("weatherSuggestions");e.addEventListener("input",()=>{const t=e.value.trim();if(this.searchTimeout&&clearTimeout(this.searchTimeout),!t){i.style.display="none";return}this.searchTimeout=setTimeout(async()=>{const a=await J(t);a&&a.length>0?(i.innerHTML=a.map(n=>`
            <div class="suggestion-item" data-lat="${n.latitude}" data-lon="${n.longitude}" data-name="${n.name}" data-country="${n.country_code||"TH"}">
              <i data-lucide="map-pin" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-right:6px; color:var(--cyan);"></i>
              <b>${n.name}</b> ${n.admin1?`, ${n.admin1}`:""} (${n.country||"เธ•เนเธฒเธเธเธฃเธฐเน€เธ—เธจ"})
            </div>
          `).join(""),i.style.display="block",lucide.createIcons(),i.querySelectorAll(".suggestion-item").forEach(n=>{n.addEventListener("click",()=>{const s=parseFloat(n.dataset.lat),o=parseFloat(n.dataset.lon),d=n.dataset.name,l=n.dataset.country;this.state.setCoords(s,o,d,l),e.value="",i.style.display="none",this.init()})})):(i.innerHTML='<div class="suggestion-item" style="color:var(--muted); cursor:default;">เนเธกเนเธเธเธชเธ–เธฒเธเธ—เธตเนเธ”เธฑเธเธเธฅเนเธฒเธง...</div>',i.style.display="block")},350)}),document.addEventListener("click",t=>{!e.contains(t.target)&&!i.contains(t.target)&&(i.style.display="none")})}}const Z={bts_green:{name:"BTS สายสุขุมวิท",short:"BTS-S",color:"#22c55e",fareBase:17,farePerSt:4.5,fareMax:65,timePerSt:2,pax:{adult:1,student:.7,senior:.5}},bts_silom:{name:"BTS สายสีลม",short:"BTS-L",color:"#15803d",fareBase:17,farePerSt:4.5,fareMax:65,timePerSt:2,pax:{adult:1,student:.7,senior:.5}},mrt_blue:{name:"MRT สายสีน้ำเงิน",short:"MRT-B",color:"#2563eb",fareBase:17,farePerSt:3,fareMax:45,timePerSt:2.5,pax:{adult:1,student:.9,senior:.5}},mrt_purple:{name:"MRT สายสีม่วง",short:"MRT-P",color:"#9333ea",fareBase:14,farePerSt:3,fareMax:42,timePerSt:2.5,pax:{adult:1,student:.9,senior:.5}},mrt_yellow:{name:"MRT สายสีเหลือง",short:"MRT-Y",color:"#eab308",fareBase:15,farePerSt:3.2,fareMax:45,timePerSt:2,pax:{adult:1,student:.9,senior:.5}},arl:{name:"Airport Rail Link",short:"ARL",color:"#e11d48",fareBase:15,farePerSt:5,fareMax:45,timePerSt:3,pax:{adult:1,student:1,senior:1}}},F=[{id:"khu_khot",name:"คูคต",line:"bts_green",idx:0},{id:"saphan_mai",name:"สะพานใหม่",line:"bts_green",idx:4},{id:"kasetsart",name:"ม.เกษตรศาสตร์",line:"bts_green",idx:11},{id:"ha_yaek",name:"ห้าแยกลาดพร้าว",line:"bts_green",idx:15},{id:"mo_chit",name:"หมอชิต",line:"bts_green",idx:16},{id:"saphan_khwai",name:"สะพานควาย",line:"bts_green",idx:17},{id:"ari",name:"อารีย์",line:"bts_green",idx:19},{id:"victory",name:"อนุสาวรีย์ชัยฯ",line:"bts_green",idx:21},{id:"phaya_thai",name:"พญาไท",line:"bts_green",idx:22},{id:"siam",name:"สยาม",line:"bts_green",idx:24},{id:"chit_lom",name:"ชิดลม",line:"bts_green",idx:25},{id:"phloen_chit",name:"เพลินจิต",line:"bts_green",idx:26},{id:"nana",name:"นานา",line:"bts_green",idx:27},{id:"asok",name:"อโศก",line:"bts_green",idx:28},{id:"phrom_phong",name:"พร้อมพงษ์",line:"bts_green",idx:29},{id:"thong_lo",name:"ทองหล่อ",line:"bts_green",idx:30},{id:"ekkamai",name:"เอกมัย",line:"bts_green",idx:31},{id:"phra_khanong",name:"พระโขนง",line:"bts_green",idx:32},{id:"on_nut",name:"อ่อนนุช",line:"bts_green",idx:33},{id:"bang_chak",name:"บางจาก",line:"bts_green",idx:34},{id:"udom_suk",name:"อุดมสุข",line:"bts_green",idx:36},{id:"bang_na",name:"บางนา",line:"bts_green",idx:37},{id:"bearing",name:"แบริ่ง",line:"bts_green",idx:38},{id:"samrong_bts",name:"สำโรง (BTS)",line:"bts_green",idx:39},{id:"kheha",name:"เคหะฯ",line:"bts_green",idx:47},{id:"nat_stadium",name:"สนามกีฬาแห่งชาติ",line:"bts_silom",idx:0},{id:"siam_l",name:"สยาม (สายสีลม)",line:"bts_silom",idx:1},{id:"sala_daeng",name:"ศาลาแดง",line:"bts_silom",idx:3},{id:"chong_nonsi",name:"ช่องนนทรี",line:"bts_silom",idx:4},{id:"saphan_taksin",name:"สะพานตากสิน",line:"bts_silom",idx:7},{id:"wongwian_yai",name:"วงเวียนใหญ่",line:"bts_silom",idx:9},{id:"bang_wa",name:"บางหว้า",line:"bts_silom",idx:13},{id:"tha_phra",name:"ท่าพระ",line:"mrt_blue",idx:0},{id:"tao_poon",name:"เตาปูน",line:"mrt_blue",idx:9},{id:"bang_sue",name:"บางซื่อ",line:"mrt_blue",idx:10},{id:"chatuchak",name:"สวนจตุจักร",line:"mrt_blue",idx:12},{id:"phahon_mrt",name:"พหลโยธิน (MRT)",line:"mrt_blue",idx:13},{id:"lat_phrao_mrt",name:"ลาดพร้าว (MRT)",line:"mrt_blue",idx:14},{id:"ratchadaphisek",name:"รัชดาภิเษก",line:"mrt_blue",idx:15},{id:"huai_khwang",name:"ห้วยขวาง",line:"mrt_blue",idx:17},{id:"rama9",name:"พระราม 9",line:"mrt_blue",idx:19},{id:"phetchaburi",name:"เพชรบุรี",line:"mrt_blue",idx:20},{id:"sukhumvit_mrt",name:"สุขุมวิท (MRT)",line:"mrt_blue",idx:21},{id:"silom_mrt",name:"สีลม (MRT)",line:"mrt_blue",idx:25},{id:"hua_lamphong",name:"หัวลำโพง",line:"mrt_blue",idx:27},{id:"bang_wa_mrt",name:"บางหว้า (MRT)",line:"mrt_blue",idx:34},{id:"lak_song",name:"หลักสอง",line:"mrt_blue",idx:38},{id:"tao_poon_p",name:"เตาปูน (สายสีม่วง)",line:"mrt_purple",idx:14},{id:"wong_sawang",name:"วงศ์สว่าง",line:"mrt_purple",idx:12},{id:"nonthaburi_cc",name:"ศูนย์ราชการนนทบุรี",line:"mrt_purple",idx:9},{id:"bang_son",name:"บางซ่อน",line:"mrt_purple",idx:13},{id:"klang_bang_phai",name:"คลองบางไผ่",line:"mrt_purple",idx:0},{id:"lat_phrao_y",name:"ลาดพร้าว (สายสีเหลือง)",line:"mrt_yellow",idx:0},{id:"chokchai4",name:"โชคชัย 4",line:"mrt_yellow",idx:2},{id:"phatthanakan",name:"พัฒนาการ",line:"mrt_yellow",idx:13},{id:"si_nut",name:"สี่แยกอ่อนนุช",line:"mrt_yellow",idx:15},{id:"on_nut_y",name:"อ่อนนุช (สายสีเหลือง)",line:"mrt_yellow",idx:16},{id:"samrong_y",name:"สำโรง (สายสีเหลือง)",line:"mrt_yellow",idx:18},{id:"phaya_thai_arl",name:"พญาไท (ARL)",line:"arl",idx:0},{id:"ratchaprarop",name:"ราชปรารภ",line:"arl",idx:1},{id:"makkasan",name:"มักกะสัน",line:"arl",idx:2},{id:"ramkhamhaeng",name:"รามคำแหง",line:"arl",idx:3},{id:"hua_mak",name:"หัวหมาก",line:"arl",idx:4},{id:"lat_krabang",name:"ลาดกระบัง",line:"arl",idx:5},{id:"suvarnabhumi",name:"สุวรรณภูมิ",line:"arl",idx:6}],X={};F.forEach(r=>{X[r.id]=r});function ee(r,e,i,t="adult"){const a=Z[r];if(!a)return{fare:0,stationsCount:0,duration:0};const n=Math.abs(e-i);if(n===0)return{fare:0,stationsCount:0,duration:0};const s=Math.min(a.fareBase+n*a.farePerSt,a.fareMax);return{fare:Math.round(s*(a.pax[t]||1)),stationsCount:n,duration:Math.round(n*a.timePerSt)}}function te(r){const e=new Date,i=e.getHours(),t=e.getMinutes(),a=i*60+t,n={bts_green:{first:5*60+30,last:24*60+0,peakFreq:3,offFreq:7},bts_silom:{first:5*60+30,last:24*60+0,peakFreq:3,offFreq:7},mrt_blue:{first:5*60+30,last:24*60+0,peakFreq:4,offFreq:8},mrt_purple:{first:5*60+30,last:23*60+59,peakFreq:5,offFreq:10},mrt_yellow:{first:5*60+30,last:23*60+30,peakFreq:4,offFreq:8},arl:{first:6*60+0,last:24*60+0,peakFreq:10,offFreq:15}},s=n[r]||n.bts_green,o=i>=7&&i<9||i>=17&&i<20,d=o?s.peakFreq:s.offFreq;let l=a;if(a<s.first)l=s.first;else if(a>=s.last)l=s.first+24*60;else{const v=(a-s.first)%d;l=a+(v===0?0:d-v)}const c=l-a,p=v=>{const y=Math.floor(v%1440/60),h=v%60;return`${String(y).padStart(2,"0")}:${String(h).padStart(2,"0")} น.`};return{firstTrain:p(s.first),lastTrain:p(s.last),frequencyPeak:`${s.peakFreq}-${s.peakFreq+1} นาที/ขบวน`,frequencyOffPeak:`${s.offFreq}-${s.offFreq+1} นาที/ขบวน`,nextTrain:p(l),waitMinutes:c,isPeak:o,currentFreq:d}}const D=(()=>{const r={};return F.forEach(e=>{(r[e.line]=r[e.line]||[]).push({name:e.name,index:e.idx})}),Object.values(r).forEach(e=>e.sort((i,t)=>i.index-t.index)),r})();function ie(r,e,i){const t=[{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่จตุจักร/หมอชิต",kw:["หมอชิต","จตุจักร"]},{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่สุขุมวิท/อโศก",kw:["อโศก","สุขุมวิท"]},{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่สีลม/ศาลาแดง",kw:["ศาลาแดง","สีลม"]},{text:"เชื่อมต่อ Airport Rail Link ที่พญาไท",kw:["พญาไท"]},{text:"เชื่อมต่อ MRT สีม่วง ที่เตาปูน",kw:["เตาปูน"]},{text:"เชื่อมต่อ MRT สีเหลือง ที่ลาดพร้าว",kw:["ลาดพร้าว"]},{text:"เชื่อมต่อ MRT สีเหลือง/BTS ที่สำโรง",kw:["สำโรง"]}];for(const a of t)if(a.kw.some(n=>e.includes(n)||i.includes(n)))return`💡 ${a.text}`;return null}function P(){try{return JSON.parse(localStorage.getItem("commuter_fav_routes")||"[]")}catch{return[]}}function ae(r,e,i,t,a,n,s){const o=P();return o.push({id:Date.now(),name:r,start:{lat:e,lng:i,name:n},end:{lat:t,lng:a,name:s}}),localStorage.setItem("commuter_fav_routes",JSON.stringify(o)),o}function ne(r){const e=P().filter(i=>i.id!==r);return localStorage.setItem("commuter_fav_routes",JSON.stringify(e)),e}function se(r,e,i,t){const n=I(i-r),s=I(t-e),o=Math.sin(n/2)*Math.sin(n/2)+Math.cos(I(r))*Math.cos(I(i))*Math.sin(s/2)*Math.sin(s/2);return 6371*(2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o)))}function I(r){return r*(Math.PI/180)}class oe{constructor(e,i,t){this.trafficContainer=document.getElementById(e),this.transitContainer=document.getElementById(i),this.state=t,this.map=null,this.tileLayer=null,this.routePolyline=null,this.startMarker=null,this.endMarker=null,this.routePoints={start:null,end:null},this.cctvIntervals=[]}async init(){this.trafficContainer&&(this.renderTrafficTab(),this.initMap(),this.initCCTVs(),this.setupTrafficEvents()),this.renderTransitTab(),this.setupTransitEvents(),document.addEventListener("theme-changed",()=>this.updateMapTheme())}renderTrafficTab(){this.trafficContainer.innerHTML=`
      <div class="map-dashboard-grid">
        <div class="map-outer">
          <div id="trafficMap"></div>
          <div class="map-overlay-card">
            <h3><i data-lucide="navigation"></i> เธงเธฒเธเนเธเธเธเธฒเธฃเน€เธ”เธดเธเธ—เธฒเธ (BKK Route Planner)</h3>
            <div class="route-input-group">
              <div class="route-field" id="routeStartBtn" style="cursor: pointer;">
                <i data-lucide="circle-dot" style="color: var(--cyan);"></i>
                <span id="routeStartText" class="empty">เธเธธเธ”เน€เธฃเธดเนเธกเธ•เนเธ (เธเธฅเธดเธเน€เธฅเธทเธญเธเนเธเนเธเธเธ—เธตเน)</span>
              </div>
              <div class="route-field" id="routeEndBtn" style="cursor: pointer;">
                <i data-lucide="map-pin" style="color: var(--red);"></i>
                <span id="routeEndText" class="empty">เธเธธเธ”เธซเธกเธฒเธขเธเธฅเธฒเธขเธ—เธฒเธ (เธเธฅเธดเธเน€เธฅเธทเธญเธเนเธเนเธเธเธ—เธตเน)</span>
              </div>
            </div>
            <div class="route-actions">
              <button class="btn btn-primary" id="btnUseMyLocation" style="flex: 1; font-size: 0.75rem; padding: 8px 12px;">
                <i data-lucide="locate" style="width: 14px; height: 14px;"></i> เนเธเนเธเธดเธเธฑเธ”เธเธฑเธเธเธธเธเธฑเธ
              </button>
              <button class="btn" id="btnResetRoute" style="font-size: 0.75rem; padding: 8px 12px;">เธฅเนเธฒเธเธเนเธญเธกเธนเธฅ</button>
            </div>
            <div class="travel-stats" id="routeTravelStats">
              <div class="stat-row"><span>เธฃเธฐเธขเธฐเธ—เธฒเธ:</span><b id="statDistance">-- เธเธก.</b></div>
              <div class="stat-row"><span>เน€เธงเธฅเธฒเน€เธ”เธดเธเธ—เธฒเธเนเธ”เธขเธเธฃเธฐเธกเธฒเธ“:</span><b id="statDuration">-- เธเธฒเธ—เธต</b></div>
              <div class="stat-row"><span>เธเธงเธฒเธกเธซเธเธฒเนเธเนเธเธเธฃเธฒเธเธฃ:</span><span id="statTrafficBadge" class="traffic-status-pill traffic-pill-green">เธฃเธฒเธเธฃเธทเนเธ</span></div>
              <div class="stat-row" style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px;">
                <input type="text" id="favRouteNameInput" placeholder="เธ•เธฑเนเธเธเธทเนเธญเน€เธชเนเธเธ—เธฒเธเธเธตเน..." style="background: rgba(255,255,255,0.04); border: 1px solid var(--border); color: var(--text); border-radius: 6px; padding: 4px 8px; font-size: 0.75rem; width: 120px;">
                <button class="btn btn-primary" id="btnSaveFavRoute" style="font-size: 0.7rem; padding: 4px 8px; border-radius: 6px;">
                  <i data-lucide="bookmark" style="width: 12px; height: 12px;"></i> เธเธฑเธเธ—เธถเธเน€เธชเนเธเธ—เธฒเธ
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="cctv-sidebar">
          <div class="glass-card">
            <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <i data-lucide="video" style="color: var(--red);"></i> เธเธฅเนเธญเธ CCTV เนเธขเธเธชเธณเธเธฑเธ (Live Simulation)
            </h3>
            <p style="font-size: 0.7rem; color: var(--muted); margin-bottom: 16px;">เธฃเธฒเธขเธเธฒเธเธชเธ–เธฒเธเธฐเธเธฃเธฒเธเธฃเนเธเธเน€เธฃเธตเธขเธฅเนเธ—เธกเนเธเธฒเธเธฃเธฐเธเธเธเธณเธฅเธญเธเธญเธฑเธเธเธฃเธดเธขเธฐ</p>
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div class="cctv-card">
                <div class="cctv-header"><span class="cctv-title">เนเธขเธเธญเนเธจเธ-เธชเธธเธเธธเธกเธงเธดเธ—</span><span class="cctv-live-dot">LIVE</span></div>
                <div class="cctv-screen"><canvas id="cctvAsoke" class="cctv-canvas"></canvas><span class="cctv-overlay-text">CAM-01 | ASOKE ROAD</span></div>
              </div>
              <div class="cctv-card">
                <div class="cctv-header"><span class="cctv-title">เนเธขเธเธเธฃเธฐเธฃเธฒเธก 9</span><span class="cctv-live-dot">LIVE</span></div>
                <div class="cctv-screen"><canvas id="cctvRama9" class="cctv-canvas"></canvas><span class="cctv-overlay-text">CAM-02 | RAMA 9 RD</span></div>
              </div>
              <div class="cctv-card">
                <div class="cctv-header"><span class="cctv-title">เนเธขเธเธชเธฒเธ—เธฃ-เธเธฃเธฒเธเธดเธงเธฒเธช</span><span class="cctv-live-dot">LIVE</span></div>
                <div class="cctv-screen"><canvas id="cctvSathorn" class="cctv-canvas"></canvas><span class="cctv-overlay-text">CAM-03 | SATHORN RD</span></div>
              </div>
            </div>
          </div>
          <div class="glass-card">
            <h3 style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <i data-lucide="bookmark" style="color: var(--cyan);"></i> เน€เธชเนเธเธ—เธฒเธเธ—เธตเนเธเธฑเธเธ—เธถเธเนเธงเน
            </h3>
            <div id="savedRoutesList" style="display: flex; flex-direction: column; gap: 8px;"></div>
          </div>
        </div>
      </div>
    `,lucide.createIcons()}initMap(){const e=this.state.getCoords();this.map=L.map("trafficMap",{zoomControl:!1}).setView([e.lat,e.lon],13),L.control.zoom({position:"bottomright"}).addTo(this.map),this.updateMapTheme(),this.map.on("click",i=>this.handleMapClick(i))}updateMapTheme(){if(!this.map)return;this.tileLayer&&this.map.removeLayer(this.tileLayer);const i=document.body.classList.contains("light-theme")?"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png":"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";this.tileLayer=L.tileLayer(i,{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'}).addTo(this.map)}handleMapClick(e){const{lat:i,lng:t}=e.latlng;this.routePoints.start?this.routePoints.end?(this.resetRouting(),this.setRouteStart(i,t,`เธเธดเธเธฑเธ”: ${i.toFixed(4)}, ${t.toFixed(4)}`)):(this.setRouteEnd(i,t,`เธเธดเธเธฑเธ”: ${i.toFixed(4)}, ${t.toFixed(4)}`),this.calculateRoute()):this.setRouteStart(i,t,`เธเธดเธเธฑเธ”: ${i.toFixed(4)}, ${t.toFixed(4)}`)}setRouteStart(e,i,t){this.routePoints.start={lat:e,lng:i,name:t};const a=document.getElementById("routeStartText");a.innerText=t,a.classList.remove("empty"),this.startMarker&&this.map.removeLayer(this.startMarker),this.startMarker=L.marker([e,i],{icon:L.divIcon({className:"custom-map-marker-start",html:'<div style="width:14px;height:14px;background:var(--cyan);border:2px solid white;border-radius:50%;box-shadow:0 0 10px var(--cyan);"></div>',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(this.map)}setRouteEnd(e,i,t){this.routePoints.end={lat:e,lng:i,name:t};const a=document.getElementById("routeEndText");a.innerText=t,a.classList.remove("empty"),this.endMarker&&this.map.removeLayer(this.endMarker),this.endMarker=L.marker([e,i],{icon:L.divIcon({className:"custom-map-marker-end",html:'<div style="width:14px;height:14px;background:var(--red);border:2px solid white;border-radius:50%;box-shadow:0 0 10px var(--red);"></div>',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(this.map)}async calculateRoute(){if(!this.routePoints.start||!this.routePoints.end)return;const e=this.routePoints.start,i=this.routePoints.end,t=`https://router.project-osrm.org/route/v1/driving/${e.lng},${e.lat};${i.lng},${i.lat}?overview=full&geometries=geojson`;try{const n=await(await fetch(t)).json();if(n.routes&&n.routes.length>0){const s=n.routes[0],o=s.geometry.coordinates.map(u=>[u[1],u[0]]);this.routePolyline&&this.map.removeLayer(this.routePolyline),this.routePolyline=L.polyline(o,{color:"var(--cyan)",weight:5,opacity:.85,className:"glowing-polyline"}).addTo(this.map),this.map.fitBounds(this.routePolyline.getBounds(),{padding:[40,40]});const d=(s.distance/1e3).toFixed(1),l=Math.round(s.duration/60);document.getElementById("statDistance").innerText=`${d} เธเธก.`;const c=new Date().getHours();let p=1,v="เธเธฒเธฃเธเธฃเธฒเธเธฃเนเธซเธฅเธฅเธทเนเธ (เธฃเธฒเธเธฃเธทเนเธ)",y="traffic-pill-green";c>=7&&c<=9||c>=17&&c<=19?(p=1.6,v="เธฃเธ–เธ•เธดเธ”เธเธฑเธ”เธซเธเธฒเนเธเนเธ (เธงเธดเธเธคเธ•)",y="traffic-pill-red"):(c>=12&&c<=14||c>=16&&c<17)&&(p=1.25,v="เธฃเธ–เธซเธเธฒเนเธเนเธเธเธฒเธเธเธฅเธฒเธ (เธเธฐเธฅเธญเธ•เธฑเธง)",y="traffic-pill-yellow"),document.getElementById("statDuration").innerText=`${Math.round(l*p)} เธเธฒเธ—เธต`;const h=document.getElementById("statTrafficBadge");h.innerText=v,h.className=`traffic-status-pill ${y}`,document.getElementById("routeTravelStats").style.display="block"}else throw new Error("no route")}catch{this.routePolyline&&this.map.removeLayer(this.routePolyline),this.routePolyline=L.polyline([[e.lat,e.lng],[i.lat,i.lng]],{color:"var(--cyan)",weight:4,dashArray:"5, 10",opacity:.7}).addTo(this.map);const n=se(e.lat,e.lng,i.lat,i.lng).toFixed(1);document.getElementById("statDistance").innerText=`${n} เธเธก. (เธเธฒเธ”เธเธฒเธฃเธ“เน)`,document.getElementById("statDuration").innerText=`${Math.round(n*2.5)} เธเธฒเธ—เธต`;const s=document.getElementById("statTrafficBadge");s.innerText="เธเธฒเธฃเธเธฃเธฒเธเธฃเนเธกเนเธเธฃเนเธญเธกเนเธชเธ”เธ (Offline Mode)",s.className="traffic-status-pill traffic-pill-yellow",document.getElementById("routeTravelStats").style.display="block"}}resetRouting(){this.routePoints.start=null,this.routePoints.end=null;const e=document.getElementById("routeStartText");e.innerText="เธเธธเธ”เน€เธฃเธดเนเธกเธ•เนเธ (เธเธฅเธดเธเน€เธฅเธทเธญเธเนเธเนเธเธเธ—เธตเน)",e.classList.add("empty");const i=document.getElementById("routeEndText");i.innerText="เธเธธเธ”เธซเธกเธฒเธขเธเธฅเธฒเธขเธ—เธฒเธ (เธเธฅเธดเธเน€เธฅเธทเธญเธเนเธเนเธเธเธ—เธตเน)",i.classList.add("empty"),this.startMarker&&this.map.removeLayer(this.startMarker),this.endMarker&&this.map.removeLayer(this.endMarker),this.routePolyline&&this.map.removeLayer(this.routePolyline),this.startMarker=null,this.endMarker=null,this.routePolyline=null,document.getElementById("routeTravelStats").style.display="none"}setupTrafficEvents(){var e,i,t;(e=document.getElementById("btnResetRoute"))==null||e.addEventListener("click",()=>this.resetRouting()),(i=document.getElementById("btnUseMyLocation"))==null||i.addEventListener("click",()=>{const a=this.state.getCoords();this.setRouteStart(a.lat,a.lon,`เธ•เธณเนเธซเธเนเธเธเธญเธเธเธฑเธ (${a.name})`),this.routePoints.end&&this.calculateRoute()}),(t=document.getElementById("btnSaveFavRoute"))==null||t.addEventListener("click",()=>{const a=document.getElementById("favRouteNameInput"),n=a.value.trim()||`เน€เธชเนเธเธ—เธฒเธ ${new Date().toLocaleDateString("th-TH")}`,s=this.routePoints.start,o=this.routePoints.end;s&&o&&(ae(n,s.lat,s.lng,o.lat,o.lng,s.name,o.name),a.value="",this.renderSavedRoutes(),this.showToast("เธเธฑเธเธ—เธถเธเธชเธณเน€เธฃเนเธ",`เธเธฑเธเธ—เธถเธเน€เธชเนเธเธ—เธฒเธ "${n}" เน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง`))}),this.renderSavedRoutes()}renderSavedRoutes(){const e=document.getElementById("savedRoutesList");if(!e)return;const i=P();if(i.length===0){e.innerHTML='<div style="text-align:center;color:var(--muted2);font-size:0.75rem;padding:12px 0;">เนเธกเนเธกเธตเน€เธชเนเธเธ—เธฒเธเธ—เธตเนเธเธฑเธเธ—เธถเธเนเธงเน</div>';return}e.innerHTML=i.map(t=>`
      <div class="todo-item" style="padding:10px 12px;gap:8px;">
        <div style="flex-grow:1;cursor:pointer;text-align:left;" class="saved-route-trigger" data-id="${t.id}">
          <div style="font-weight:500;font-size:0.8rem;color:var(--cyan);">${t.name}</div>
          <div style="font-size:0.65rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:220px;">
            ${t.start.name.replace("เธเธดเธเธฑเธ”: ","")} โ” ${t.end.name.replace("เธเธดเธเธฑเธ”: ","")}
          </div>
        </div>
        <button class="todo-del-btn route-del-btn" data-id="${t.id}" aria-label="เธฅเธเน€เธชเนเธเธ—เธฒเธ">
          <i data-lucide="trash" style="width:13px;height:13px;"></i>
        </button>
      </div>
    `).join(""),lucide.createIcons(),e.querySelectorAll(".saved-route-trigger").forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.dataset.id),n=i.find(s=>s.id===a);n&&(this.resetRouting(),this.setRouteStart(n.start.lat,n.start.lng,n.start.name),this.setRouteEnd(n.end.lat,n.end.lng,n.end.name),this.calculateRoute(),this.showToast("เนเธซเธฅเธ”เน€เธชเนเธเธ—เธฒเธ",`เนเธชเธ”เธเน€เธชเนเธเธ—เธฒเธ: ${n.name}`))})}),e.querySelectorAll(".route-del-btn").forEach(t=>{t.addEventListener("click",a=>{a.stopPropagation(),ne(parseInt(t.dataset.id)),this.renderSavedRoutes()})})}initCCTVs(){this.cctvIntervals.forEach(clearInterval),this.cctvIntervals=[];const e=i=>{const t=document.getElementById(i);if(!t)return;const a=t.getContext("2d");t.width=320,t.height=180;const n=Array.from({length:6},()=>({x:Math.random()*t.width,y:40+Math.random()*100,speed:1.5+Math.random()*2.5,color:["#00f2fe","#ffd740","#ff4d4d","#ffffff","#a855f7"][Math.floor(Math.random()*5)],size:5+Math.random()*8,dir:Math.random()>.5?1:-1})),s=()=>{a.fillStyle="#111827",a.fillRect(0,0,t.width,t.height),a.strokeStyle="rgba(255,255,255,0.08)",a.lineWidth=4,a.beginPath(),a.moveTo(0,90),a.lineTo(320,90),a.moveTo(160,0),a.lineTo(160,180),a.stroke(),a.strokeStyle="rgba(255,255,255,0.15)",a.lineWidth=1,a.setLineDash([8,8]),a.beginPath(),a.moveTo(0,65),a.lineTo(320,65),a.moveTo(0,115),a.lineTo(320,115),a.stroke(),a.setLineDash([]),n.forEach(o=>{o.x+=o.speed*o.dir,o.dir===1&&o.x>t.width+10&&(o.x=-10),o.dir===-1&&o.x<-10&&(o.x=t.width+10),a.fillStyle=o.color,a.beginPath(),a.roundRect(o.x,o.y,o.size*1.6,o.size,2),a.fill(),a.fillStyle=o.dir===1?"#ff4d4d":"#ffd740";const d=o.dir===1?o.x:o.x+o.size*1.6-2;a.fillRect(d,o.y+1,2,2),a.fillRect(d,o.y+o.size-3,2,2)}),a.fillStyle="rgba(0,242,254,0.03)";for(let o=0;o<t.height;o+=3)a.fillRect(0,o,t.width,1);Math.random()>.98&&(a.fillStyle="rgba(255,255,255,0.12)",a.fillRect(0,Math.random()*t.height,t.width,4)),a.fillStyle="#ffffff",a.font="7px monospace",a.fillText(new Date().toLocaleString("en-US"),200,172),a.fillStyle="var(--cyan)",a.fillText("REC โ—",15,172)};this.cctvIntervals.push(setInterval(s,1e3/24))};e("cctvAsoke"),e("cctvRama9"),e("cctvSathorn")}renderTransitTab(){this.transitContainer.innerHTML=`
      <div class="transit-grid">
        <div>
          <!-- Status Board -->
          <div class="glass-card" style="margin-bottom: 24px;">
            <h3 style="font-size:0.85rem;display:flex;align-items:center;gap:8px;margin-bottom:16px;">
              <i data-lucide="radio" style="color:var(--cyan);"></i> เธชเธ–เธฒเธเธฐเธฃเธฐเธเธเธฃเธฒเธเธเธตเธ—เธตเน€เธญเธช-เน€เธญเนเธกเธญเธฒเธฃเนเธ—เธต
            </h3>
            <div class="transit-status-board" id="transitStatusContainer"></div>
            <button class="btn btn-secondary" id="btnRefreshTransitStatus" style="width:100%;margin-top:16px;font-size:0.75rem;padding:10px;">
              <i data-lucide="refresh-cw"></i> เธญเธฑเธเน€เธ”เธ—เธชเธ–เธฒเธเธฐเธฃเธ–เนเธเธเนเธฒ
            </button>
          </div>

          <!-- Timetable -->
          <div class="glass-card">
            <h3 style="font-size:0.85rem;display:flex;align-items:center;gap:8px;margin-bottom:16px;">
              <i data-lucide="clock" style="color:var(--yellow);"></i> เธ•เธฒเธฃเธฒเธเน€เธงเธฅเธฒเธเธเธงเธเนเธฃเธ / เธเธเธงเธเธชเธธเธ”เธ—เนเธฒเธข
            </h3>
            <div class="fare-inputs">
              <div class="input-field-wrap">
                <label>เน€เธฅเธทเธญเธเธฃเธฐเธเธเธฃเธ–เนเธเธเนเธฒ</label>
                <select id="timeSystemSelect">
                  <option value="bts_green">BTS เธชเธฒเธขเธชเธธเธเธธเธกเธงเธดเธ— (เธชเธตเน€เธเธตเธขเธง)</option>
                  <option value="bts_silom">BTS เธชเธฒเธขเธชเธตเธฅเธก (เธชเธตเน€เธเธตเธขเธงเน€เธเนเธก)</option>
                  <option value="mrt_blue">MRT เธชเธฒเธขเธชเธตเธเนเธณเน€เธเธดเธ (Blue Line)</option>
                  <option value="mrt_purple">MRT เธชเธฒเธขเธชเธตเธกเนเธงเธ (Purple Line)</option>
                  <option value="mrt_yellow">MRT เธชเธฒเธขเธชเธตเน€เธซเธฅเธทเธญเธ (Yellow Line)</option>
                  <option value="arl">Airport Rail Link (ARL)</option>
                </select>
              </div>
              <div class="input-field-wrap">
                <label>เน€เธฅเธทเธญเธเธชเธ–เธฒเธเธต</label>
                <select id="timeStationSelect"></select>
              </div>
            </div>
            <div class="fare-result-display" id="timetableResultDisplay" style="display:flex;margin-top:20px;">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <div class="sub-tile" style="background:rgba(255,255,255,0.01);">
                  <div style="font-size:0.65rem;color:var(--muted);">๐… เธเธเธงเธเนเธฃเธ</div>
                  <div id="firstTrainTime" style="font-size:1.15rem;font-weight:600;color:var(--cyan);margin-top:4px;">--:--</div>
                </div>
                <div class="sub-tile" style="background:rgba(255,255,255,0.01);">
                  <div style="font-size:0.65rem;color:var(--muted);">๐ เธเธเธงเธเธชเธธเธ”เธ—เนเธฒเธข</div>
                  <div id="lastTrainTime" style="font-size:1.15rem;font-weight:600;color:var(--red);margin-top:4px;">--:--</div>
                </div>
                <div class="sub-tile" style="background:rgba(255,255,255,0.01);">
                  <div style="font-size:0.65rem;color:var(--muted);">๐ เธเธเธงเธเธ–เธฑเธ”เนเธ</div>
                  <div id="nextTrainTime" style="font-size:1.15rem;font-weight:600;color:var(--yellow);margin-top:4px;">--:--</div>
                </div>
                <div class="sub-tile" style="background:rgba(255,255,255,0.01);">
                  <div style="font-size:0.65rem;color:var(--muted);">โฑ เธฃเธญเธเธเธงเธ</div>
                  <div id="waitMinsText" style="font-size:1rem;font-weight:600;color:var(--text);margin-top:4px;">--</div>
                </div>
              </div>
              <div style="font-size:0.7rem;color:var(--muted);margin-top:10px;display:flex;flex-direction:column;gap:4px;padding-top:10px;border-top:1px dashed var(--border);">
                <span id="peakStatusText">--</span>
                <span><b>เธเธงเธฒเธกเธ–เธตเนเธเนเธงเธเน€เธฃเนเธเธ”เนเธงเธ:</b> <span id="freqPeak">--</span></span>
                <span><b>เธเธงเธฒเธกเธ–เธตเนเธเนเธงเธเธเธเธ•เธด:</b> <span id="freqOff">--</span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Fare Calculator -->
        <div class="glass-card">
          <h3 style="font-size:0.85rem;display:flex;align-items:center;gap:8px;margin-bottom:20px;">
            <i data-lucide="calculator" style="color:var(--cyan);"></i> เน€เธเธฃเธทเนเธญเธเธเธณเธเธงเธ“เธเนเธฒเนเธ”เธขเธชเธฒเธฃเธฃเธ–เนเธเธเนเธฒ
          </h3>
          <div class="fare-calculator-box">
            <div class="fare-inputs">
              <div class="input-field-wrap">
                <label>เธฃเธฐเธเธเธฃเธ–เนเธเธเนเธฒ</label>
                <select id="fareSystemSelect">
                  <option value="bts_green">BTS เธชเธฒเธขเธชเธธเธเธธเธกเธงเธดเธ— (เธชเธตเน€เธเธตเธขเธง)</option>
                  <option value="bts_silom">BTS เธชเธฒเธขเธชเธตเธฅเธก</option>
                  <option value="mrt_blue">MRT เธชเธฒเธขเธชเธตเธเนเธณเน€เธเธดเธ</option>
                  <option value="mrt_purple">MRT เธชเธฒเธขเธชเธตเธกเนเธงเธ</option>
                  <option value="mrt_yellow">MRT เธชเธฒเธขเธชเธตเน€เธซเธฅเธทเธญเธ</option>
                  <option value="arl">Airport Rail Link (ARL)</option>
                </select>
              </div>
              <div class="input-field-wrap">
                <label>เธเธฃเธฐเน€เธ เธ—เธเธนเนเนเธ”เธขเธชเธฒเธฃ</label>
                <select id="farePassengerSelect">
                  <option value="adult">เธเธธเธเธเธฅเธ—เธฑเนเธงเนเธ</option>
                  <option value="student">เธเธฑเธเน€เธฃเธตเธขเธ/เธเธฑเธเธจเธถเธเธฉเธฒ (-30%)</option>
                  <option value="senior">เธเธนเนเธชเธนเธเธญเธฒเธขเธธ (-50%)</option>
                </select>
              </div>
            </div>
            <div class="fare-inputs" style="margin-top:-4px;">
              <div class="input-field-wrap">
                <label>เธชเธ–เธฒเธเธตเธ•เนเธเธ—เธฒเธ</label>
                <select id="fareOriginSelect"></select>
              </div>
              <div class="input-field-wrap">
                <label>เธชเธ–เธฒเธเธตเธเธฅเธฒเธขเธ—เธฒเธ</label>
                <select id="fareDestSelect"></select>
              </div>
            </div>
            <div class="fare-result-display" id="fareResultDisplay">
              <div class="fare-main-val">
                <span class="fare-val-label">เธเนเธฒเนเธ”เธขเธชเธฒเธฃเธฃเธงเธก:</span>
                <span class="fare-val-number" id="fareVal">-- <span>เธเธฒเธ—</span></span>
              </div>
              <div class="fare-route-details">
                <i data-lucide="info" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:4px;color:var(--cyan);"></i>
                เธเธณเธเธงเธ: <span id="fareStationsCount">--</span> เธชเธ–เธฒเธเธต ยท เน€เธงเธฅเธฒ: <span id="fareDuration">--</span> เธเธฒเธ—เธต
              </div>
              <div class="fare-interchange-warning" id="interchangeAdvice" style="display:none;"></div>
            </div>
          </div>
        </div>
      </div>
    `,lucide.createIcons()}setupTransitEvents(){var y;if(!this.transitContainer)return;this.refreshTransitStatus(),(y=document.getElementById("btnRefreshTransitStatus"))==null||y.addEventListener("click",()=>{this.refreshTransitStatus(),this.showToast("เธญเธฑเธเน€เธ”เธ—เธชเธณเน€เธฃเนเธ","เธญเธฑเธเน€เธ”เธ—เธชเธ–เธฒเธเธฐเธฃเธ–เนเธเธเนเธฒเนเธฅเนเธง")});const e=document.getElementById("timeSystemSelect"),i=document.getElementById("timeStationSelect"),t=(h,u)=>{const m=document.getElementById(h);m&&(m.innerText=u)},a=(h,u)=>{const m=document.getElementById(h);m&&(m.innerHTML=u)},n=()=>{const h=e.value,u=D[h]||[];i.innerHTML=u.map(m=>`<option value="${m.name}">${m.name}</option>`).join(""),s()},s=()=>{const h=e==null?void 0:e.value;if(!h)return;const u=te(h);t("firstTrainTime",u.firstTrain),t("lastTrainTime",u.lastTrain),t("nextTrainTime",u.nextTrain||"--:--"),t("freqPeak",u.frequencyPeak),t("freqOff",u.frequencyOffPeak),t("waitMinsText",u.waitMinutes!=null?u.waitMinutes===0?"เธเธณเธฅเธฑเธเธเธฐเธ–เธถเธ!":`เธญเธตเธ ${u.waitMinutes} เธเธฒเธ—เธต`:"--"),a("peakStatusText",u.isPeak?'<b style="color:var(--red);">โก เธเนเธงเธเน€เธฃเนเธเธ”เนเธงเธ</b>':'<b style="color:var(--cyan);">โ… เธเนเธงเธเธเธเธ•เธด</b>')};e.addEventListener("change",n),i.addEventListener("change",s),n();const o=document.getElementById("fareSystemSelect"),d=document.getElementById("fareOriginSelect"),l=document.getElementById("fareDestSelect"),c=document.getElementById("farePassengerSelect"),p=()=>{const h=o.value,u=D[h]||[],m=u.map(f=>`<option value="${f.index}">${f.name}</option>`).join("");d.innerHTML=m,l.innerHTML=m,u.length>1&&(l.selectedIndex=1),v()},v=()=>{var g,T;const h=o.value,u=parseInt(d.value),m=parseInt(l.value),f=c.value;if(isNaN(u)||isNaN(m))return;const b=ee(h,u,m,f);document.getElementById("fareVal").innerHTML=`${b.fare} <span>เธเธฒเธ—</span>`,t("fareStationsCount",b.stationsCount),t("fareDuration",b.duration);const x=D[h]||[],w=((g=x.find(S=>S.index===u))==null?void 0:g.name)||"",M=((T=x.find(S=>S.index===m))==null?void 0:T.name)||"",k=ie(h,w,M),E=document.getElementById("interchangeAdvice");k?(E.innerHTML=`<i data-lucide="sparkles" style="width:14px;height:14px;flex-shrink:0;"></i> <span>${k}</span>`,E.style.display="flex",lucide.createIcons()):E.style.display="none",document.getElementById("fareResultDisplay").style.display="flex"};o.addEventListener("change",p),d.addEventListener("change",v),l.addEventListener("change",v),c.addEventListener("change",v),p()}refreshTransitStatus(){var h,u;const e=document.getElementById("transitStatusContainer");if(!e)return;const i=new Date().getHours(),t=new Date().getMinutes(),a=i===8&&t>=15&&t<=35||i===18&&t>=20&&t<=45,n=i===8&&t>=30&&t<=55||i===18&&t>=10&&t<=30,s=((u=(h=this.state)==null?void 0:h.getWeatherCode)==null?void 0:u.call(h))??null,o=[51,53,55,61,63,65,80,81,82,95,96],d=[65,81,82,95,96],l=s!==null&&o.includes(s),c=s!==null&&d.includes(s);let p="";c?p="ฝนตกหนัก — อาจเกิดความล่าช้าเพิ่มเติมทุกสาย":l&&(p="ฝนตก — ผู้โดยสารหนาแน่นกว่าปกติ");const v=[{name:"BTS สายสุขุมวิท (Green Line)",color:"#22c55e",delayed:a||c,delayNote:a?"ล่าช้า 3-5 นาที ขบวนหนาแน่นที่สยาม":"ล่าช้าเนื่องจากฝนตกหนัก"},{name:"BTS สายสีลม (Silom Line)",color:"#15803d",delayed:c,delayNote:"ล่าช้าเนื่องจากฝนตกหนัก"},{name:"MRT สายเฉลิมรัชมงคล (Blue Line)",color:"#1e3a8a",delayed:n,delayNote:"ล่าช้า 8 นาที ระบบสัญญาณขัดข้องที่ห้วยขวาง"},{name:"MRT สายฉลองรัชธรรม (Purple Line)",color:"#7e22ce",delayed:!1},{name:"MRT สายสีเหลือง (Yellow Line)",color:"#ca8a04",delayed:!1},{name:"Airport Rail Link (ARL)",color:"#e11d48",delayed:!1}],y=p?'<div style="font-size:0.72rem;color:var(--yellow);background:rgba(234,179,8,0.08);border:1px solid rgba(234,179,8,0.2);border-radius:8px;padding:8px 12px;margin-bottom:12px;">'+(c?"🌧 ":"🌦 ")+p+"</div>":"";e.innerHTML=y+v.map(m=>'<div class="transit-line"><div class="transit-line-info"><div class="transit-color-bar" style="background-color:'+m.color+';"></div><div><div class="transit-name">'+m.name+'</div><div class="transit-desc">'+(m.delayed?"⚠️ "+m.delayNote:"🟢 บริการปกติความถี่คงที่")+'</div></div></div><div class="transit-status '+(m.delayed?"delay":"normal")+'">'+(m.delayed?"🟡 ล่าช้า":"🟢 ปกติ")+"</div></div>").join("")}showToast(e,i){const t=document.getElementById("toastContainer");if(!t)return;const a=document.createElement("div");a.className="toast-alert",a.innerHTML=`
      <div class="toast-icon" style="color:var(--cyan);"><i data-lucide="info" style="width:16px;height:16px;"></i></div>
      <div class="toast-content">
        <div class="toast-title" style="color:var(--cyan);">${e}</div>
        <div class="toast-msg">${i}</div>
      </div>
    `,t.appendChild(a),lucide.createIcons(),setTimeout(()=>{a.classList.add("dismissed"),setTimeout(()=>a.remove(),300)},4e3)}}class re{constructor(e,i){this.container=document.getElementById(e),this.state=i,this.pomoMinutes=25,this.pomoSeconds=0,this.pomoDuration=25*60,this.pomoTimer=null,this.pomoRunning=!1,this.pomoMode="work",this.waterGoal=8,this.waterCount=parseInt(localStorage.getItem("commuter_water_cups"))||0,this.audioCtx=null}async init(){this.render(),this.initTodo(),this.initWater(),this.initPomodoro(),this.initBattery(),this.initMemo(),this.initCalendar()}render(){this.container.innerHTML=`
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
    `,lucide.createIcons()}initTodo(){this.todoFilter="all",this.todos=JSON.parse(localStorage.getItem("commuter_todos"))||[{id:1,text:"หยิบร่มใส่กระเป๋า",category:"travel",checked:!1},{id:2,text:"เช็คสถานะการดีเลย์ของบีทีเอส",category:"travel",checked:!1},{id:3,text:"ตรวจความเรียบร้อยรอบบ้านก่อนออกเดินทาง",category:"home",checked:!0},{id:4,text:"ส่งรายงานประชุมเช้านี้",category:"work",checked:!1}],this.renderTodoItems();const e=document.getElementById("todoInput"),i=document.getElementById("btnTodoAdd"),t=()=>{const n=e.value.trim();if(!n)return;let s="work";const o=n.toLowerCase();o.includes("ร่ม")||o.includes("bts")||o.includes("รถ")||o.includes("ถนน")||o.includes("เดินทาง")?s="travel":(o.includes("บ้าน")||o.includes("ไฟ")||o.includes("น้ำ")||o.includes("แมว")||o.includes("หมา"))&&(s="home"),this.todos.push({id:Date.now(),text:n,category:s,checked:!1}),localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),e.value="",this.renderTodoItems()};i==null||i.addEventListener("click",t),e==null||e.addEventListener("keypress",n=>{n.key==="Enter"&&t()});const a=this.container.querySelectorAll(".todo-filter-btn");a.forEach(n=>{n.addEventListener("click",()=>{a.forEach(s=>{s.classList.remove("btn-primary"),s.classList.add("btn-secondary")}),n.classList.add("btn-primary"),n.classList.remove("btn-secondary"),this.todoFilter=n.dataset.filter,this.renderTodoItems()})})}renderTodoItems(){const e=document.getElementById("todoItemsContainer");if(!e)return;const i=this.todos.filter(t=>this.todoFilter==="all"?!0:t.category===this.todoFilter);if(i.length===0){e.innerHTML='<div style="text-align: center; font-size: 0.75rem; color: var(--muted2); padding: 24px 0;">ไม่มีรายการสิ่งที่จะทำในหมวดหมู่นี้</div>';return}e.innerHTML=i.map(t=>{const a=t.category==="work"?"💻":t.category==="travel"?"🚗":"🏠";return`
        <div class="todo-item ${t.checked?"checked":""}" data-id="${t.id}">
          <div class="todo-item-left todo-check-trigger">
            <div class="todo-checkbox">
              <i data-lucide="check"></i>
            </div>
            <span class="todo-text">${a} ${t.text}</span>
          </div>
          <button class="todo-del-btn todo-delete-trigger">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
          </button>
        </div>
      `}).join(""),lucide.createIcons(),e.querySelectorAll(".todo-check-trigger").forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.closest(".todo-item").dataset.id),n=this.todos.find(s=>s.id===a);n&&(n.checked=!n.checked,localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),this.renderTodoItems())})}),e.querySelectorAll(".todo-delete-trigger").forEach(t=>{t.addEventListener("click",a=>{a.stopPropagation();const n=parseInt(t.closest(".todo-item").dataset.id);this.todos=this.todos.filter(s=>s.id!==n),localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),this.renderTodoItems()})})}initWater(){var e,i;this.updateWaterDisplay(),(e=document.getElementById("btnWaterAdd"))==null||e.addEventListener("click",()=>{this.waterCount<16&&(this.waterCount++,localStorage.setItem("commuter_water_cups",this.waterCount),this.updateWaterDisplay())}),(i=document.getElementById("btnWaterSub"))==null||i.addEventListener("click",()=>{this.waterCount>0&&(this.waterCount--,localStorage.setItem("commuter_water_cups",this.waterCount),this.updateWaterDisplay())})}updateWaterDisplay(){const e=document.getElementById("waterWave"),i=document.getElementById("waterDisplay");if(!e||!i)return;const t=Math.min(100,Math.round(this.waterCount/this.waterGoal*100));e.style.height=`${t}%`,i.innerHTML=`${this.waterCount} / ${this.waterGoal} <span style="font-size: 0.85rem; color: var(--muted);">แก้ว (${this.waterCount*250} มล.)</span>`}initPomodoro(){var t,a,n;const e=document.getElementById("btnPomoStart"),i=document.getElementById("btnPomoReset");document.getElementById("pomoCircle"),e==null||e.addEventListener("click",()=>{this.pomoRunning?this.pausePomodoro():this.startPomodoro()}),i==null||i.addEventListener("click",()=>{this.resetPomodoro()}),(t=document.getElementById("btnPomoWork"))==null||t.addEventListener("click",()=>this.setPomoMode("work",25)),(a=document.getElementById("btnPomoShort"))==null||a.addEventListener("click",()=>this.setPomoMode("short_break",5)),(n=document.getElementById("btnPomoLong"))==null||n.addEventListener("click",()=>this.setPomoMode("long_break",15))}setPomoMode(e,i){this.pausePomodoro(),this.pomoMode=e,this.pomoMinutes=i,this.pomoSeconds=0,this.pomoDuration=i*60;const t=document.getElementById("pomoModeText"),a=document.getElementById("pomoCircle");t&&(e==="work"?(t.innerText="โฟกัสงาน (WORK MODE)",a&&(a.style.stroke="var(--cyan)")):e==="short_break"?(t.innerText="พักสั้น (SHORT BREAK)",a&&(a.style.stroke="var(--green)")):(t.innerText="พักยาว (LONG BREAK)",a&&(a.style.stroke="var(--purple)"))),this.updatePomoDisplay()}startPomodoro(){this.pomoRunning=!0;const e=document.getElementById("btnPomoStart");e&&(e.innerHTML='<i data-lucide="pause" style="width: 12px; height: 12px;"></i> หยุด',lucide.createIcons()),this.pomoTimer=setInterval(()=>{if(this.pomoSeconds===0){if(this.pomoMinutes===0){this.triggerPomoAlarm(),this.resetPomodoro();return}this.pomoMinutes--,this.pomoSeconds=59}else this.pomoSeconds--;this.updatePomoDisplay()},1e3)}pausePomodoro(){this.pomoRunning=!1,clearInterval(this.pomoTimer);const e=document.getElementById("btnPomoStart");e&&(e.innerHTML='<i data-lucide="play" style="width: 12px; height: 12px;"></i> เริ่ม',lucide.createIcons())}resetPomodoro(){this.pausePomodoro();const e=this.pomoMode==="work"?25:this.pomoMode==="short_break"?5:15;this.pomoMinutes=e,this.pomoSeconds=0,this.pomoDuration=e*60,this.updatePomoDisplay()}updatePomoDisplay(){const e=document.getElementById("pomoDisplay"),i=document.getElementById("pomoCircle");if(!e)return;const t=`${String(this.pomoMinutes).padStart(2,"0")}:${String(this.pomoSeconds).padStart(2,"0")}`;if(e.innerText=t,i){const s=283*(1-(this.pomoMinutes*60+this.pomoSeconds)/this.pomoDuration);i.style.strokeDashoffset=s}}triggerPomoAlarm(){try{this.audioCtx||(this.audioCtx=new(window.AudioContext||window.webkitAudioContext));const i=this.audioCtx.createOscillator(),t=this.audioCtx.createGain();i.connect(t),t.connect(this.audioCtx.destination),i.type="sine",i.frequency.setValueAtTime(659.25,this.audioCtx.currentTime),i.frequency.setValueAtTime(830.61,this.audioCtx.currentTime+.15),i.frequency.setValueAtTime(987.77,this.audioCtx.currentTime+.3),t.gain.setValueAtTime(0,this.audioCtx.currentTime),t.gain.linearRampToValueAtTime(.3,this.audioCtx.currentTime+.05),t.gain.exponentialRampToValueAtTime(.01,this.audioCtx.currentTime+.8),i.start(),i.stop(this.audioCtx.currentTime+.9)}catch(i){console.warn("Audio Context init failed (user interaction required):",i)}const e=this.pomoMode==="work"?"ครบเวลาแล้ว! ได้เวลาพักผ่อนแล้วพักสติ":"ได้เวลาลุยต่อแล้ว! เริ่มโฟกัสงานอีกครั้ง";alert(`🛎️ Pomodoro Alarm:
${e}`)}initBattery(){const e=document.getElementById("batteryLevelFill"),i=document.getElementById("batteryPct"),t=document.getElementById("batteryStatusText");if(!e||!i||!t)return;const a=n=>{const s=Math.round(n.level*100);i.innerText=`${s}%`,e.style.width=`${s}%`,s<=20&&!n.charging?(e.style.backgroundColor="var(--red)",e.style.boxShadow="0 0 10px var(--red)"):n.charging?(e.style.backgroundColor="var(--cyan)",e.style.boxShadow="0 0 10px var(--cyan)"):(e.style.backgroundColor="var(--green)",e.style.boxShadow="0 0 10px var(--green)"),t.innerText=n.charging?"กำลังชาร์จไฟพ่วงอยู่ (Charging)":`กำลังจ่ายกระแสไฟ (${Math.round(n.dischargingTime/60)||0} ชม. คงเหลือ)`};navigator.getBattery?navigator.getBattery().then(n=>{a(n),n.addEventListener("levelchange",()=>a(n)),n.addEventListener("chargingchange",()=>a(n))}):(i.innerText="92%",e.style.width="92%",t.innerText="ไม่มี Battery API รองรับ (โหมดเดสก์ท็อป)")}initMemo(){const e=document.getElementById("memoTextarea"),i=document.getElementById("memoSaveStatus");if(!e||!i)return;e.value=localStorage.getItem("commuter_memo")||"";let t;e.addEventListener("input",()=>{i.innerHTML='<i data-lucide="loader" style="width:12px;height:12px;animation:spin 1s linear infinite;"></i> กำลังบันทึกแบบร่าง...',lucide.createIcons(),t&&clearTimeout(t),t=setTimeout(()=>{localStorage.setItem("commuter_memo",e.value),i.innerHTML='<i data-lucide="check" style="width:12px;height:12px;"></i> บันทึกในบราวเซอร์สำเร็จแล้ว',lucide.createIcons()},800)})}initCalendar(){var t,a,n;this.calDate=new Date,this.calSelectedDay=this.calDate.getDate(),this.calendarNotes=JSON.parse(localStorage.getItem("commuter_calendar_notes"))||{};const e=()=>{const s=this.calDate.getFullYear(),o=this.calDate.getMonth(),d=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];document.getElementById("calendarMonthYear").innerText=`${d[o]} ${s+543}`;let c=["อา","จ","อ","พ","พฤ","ศ","ส"].map(m=>`<div style="font-weight:600; color:var(--muted); margin-bottom:6px;">${m}</div>`).join("");const p=new Date(s,o,1).getDay(),v=new Date(s,o+1,0).getDate();for(let m=0;m<p;m++)c+="<div></div>";const y=new Date,h=y.getFullYear()===s&&y.getMonth()===o;for(let m=1;m<=v;m++){const f=h&&y.getDate()===m,b=this.calSelectedDay===m,x=`${s}-${String(o+1).padStart(2,"0")}-${String(m).padStart(2,"0")}`,w=!!this.calendarNotes[x];c+=`
          <div class="calendar-day-tile ${f?"today":""} ${b?"selected":""}" 
               data-day="${m}"
               style="padding: 8px 4px; border-radius: 6px; cursor: pointer; position: relative; transition: var(--transition);
                      border: 1px solid ${b?"var(--cyan)":"transparent"};
                      background: ${f?"rgba(0, 242, 254, 0.1)":w?"rgba(0, 242, 254, 0.05)":"transparent"};">
            ${m}
            ${w?'<div style="position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; background: var(--cyan); border-radius: 50%;"></div>':""}
          </div>
        `}const u=document.getElementById("calendarGrid");u&&(u.innerHTML=c,u.querySelectorAll(".calendar-day-tile").forEach(m=>{m.addEventListener("click",()=>{u.querySelectorAll(".calendar-day-tile").forEach(f=>{f.style.borderColor="transparent"}),m.style.borderColor="var(--cyan)",this.calSelectedDay=parseInt(m.dataset.day),i()})}))},i=()=>{const s=this.calDate.getFullYear(),o=this.calDate.getMonth()+1,d=`${s}-${String(o).padStart(2,"0")}-${String(this.calSelectedDay).padStart(2,"0")}`;document.getElementById("calSelectedDayText").innerHTML=`<span>โน้ตตารางเวลาวันที่: ${this.calSelectedDay}/${o}/${s+543}</span>`,document.getElementById("calDayNoteInput").value=this.calendarNotes[d]||""};(t=document.getElementById("btnCalPrev"))==null||t.addEventListener("click",()=>{this.calDate.setMonth(this.calDate.getMonth()-1),this.calSelectedDay=1,e(),i()}),(a=document.getElementById("btnCalNext"))==null||a.addEventListener("click",()=>{this.calDate.setMonth(this.calDate.getMonth()+1),this.calSelectedDay=1,e(),i()}),(n=document.getElementById("btnSaveCalNote"))==null||n.addEventListener("click",()=>{const s=this.calDate.getFullYear(),o=this.calDate.getMonth()+1,d=`${s}-${String(o).padStart(2,"0")}-${String(this.calSelectedDay).padStart(2,"0")}`,l=document.getElementById("calDayNoteInput").value.trim();l?this.calendarNotes[d]=l:delete this.calendarNotes[d],localStorage.setItem("commuter_calendar_notes",JSON.stringify(this.calendarNotes)),e(),i();const c=document.getElementById("btnSaveCalNote");if(c){const p=c.innerHTML;c.innerHTML="✓ บันทึกแล้ว!",c.style.background="#22c55e",c.style.borderColor="#22c55e",setTimeout(()=>{c.innerHTML=p,c.style.background="",c.style.borderColor=""},1800)}}),e(),i()}}class de{constructor(e,i){this.container=document.getElementById(e),this.state=i}async init(){this.renderSkeleton(),await this.fetchAndRender()}renderSkeleton(){this.container.innerHTML=`
      <div class="emergency-grid">
        <div class="glass-card skeleton" style="height: 350px;"></div>
        <div class="glass-card skeleton" style="height: 350px;"></div>
      </div>
    `,lucide.createIcons()}async fetchAndRender(){var e;try{const i=this.state.getCoords();let t=0;try{t=(await A(i.lat,i.lon)).current.weather_code}catch(s){console.warn("Could not load weather for safety check, using normal code",s)}const a=H(t),n=Y();this.render(a,n),this.setupEvents()}catch(i){console.error(i),this.container.innerHTML=`
        <div class="glass-card glow-card-red" style="text-align: center; padding: 40px;">
          <i data-lucide="shield-alert" style="width: 48px; height: 48px; color: var(--red); margin-bottom: 16px;"></i>
          <h3 style="color: var(--red);">เกิดข้อผิดพลาดในการโหลดข้อมูลความปลอดภัย</h3>
          <p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 20px;">${i.message}</p>
          <button class="btn btn-primary" id="retryEmergencyBtn"><i data-lucide="refresh-cw"></i> ลองใหม่</button>
        </div>
      `,lucide.createIcons(),(e=document.getElementById("retryEmergencyBtn"))==null||e.addEventListener("click",()=>this.init())}}render(e,i){const t=this.state.getCoords(),a=e.map(o=>{o.level;const d=o.level==="danger"?"border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.06);":o.level==="warning"?"border-color: rgba(245,158,11,0.25); background: rgba(245,158,11,0.04);":"border-color: var(--border);",l=o.level==="danger"?"var(--red)":o.level==="warning"?"var(--yellow)":"var(--cyan)",c=o.level==="danger"?"shield-alert":o.level==="warning"?"alert-triangle":"info";return`
        <div class="safety-alert-card" style="${d}">
          <div class="safety-alert-icon" style="color: ${l}; background: ${l}15;">
            <i data-lucide="${c}"></i>
          </div>
          <div class="safety-alert-info">
            <h4 style="color: ${l};">${o.title}</h4>
            <p>${o.text}</p>
          </div>
        </div>
      `}).join(""),n=i.map(o=>`
      <div class="todo-item" style="padding: 12px; align-items: flex-start; flex-direction: column; gap: 4px;">
        <div style="font-size: 0.8rem; font-weight: 500; color: var(--text); text-align: left;">${o.title}</div>
        <div style="display: flex; justify-content: space-between; width: 100%; font-size: 0.65rem; color: var(--muted); margin-top: 2px;">
          <span>📅 ${o.time}</span>
          <span style="color: var(--cyan); font-weight: 500;">🟢 ${o.status}</span>
        </div>
      </div>
    `).join(""),s=K.map(o=>{let d="phone";return o.category==="medical"&&(d="ambulance"),o.category==="police"&&(d="shield"),o.category==="fire"&&(d="flame"),o.category==="flood"&&(d="droplet"),`
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
                📍 พิกัดของฉัน: <b>${t.lat.toFixed(6)}, ${t.lon.toFixed(6)}</b> (${t.name})
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
              ${s}
            </div>
          </div>
        </div>
      </div>
    `,lucide.createIcons()}setupEvents(){var e;(e=document.getElementById("btnSOSShare"))==null||e.addEventListener("click",()=>{const i=this.state.getCoords(),t=`🚨 SOS EMERGENCY ALERT! ฉันต้องการความช่วยเหลือด่วน
ตำแหน่งของฉัน: ${i.name}
พิกัด GPS: ${i.lat.toFixed(6)}, ${i.lon.toFixed(6)}
แผนที่: https://maps.google.com/?q=${i.lat},${i.lon}`;navigator.share?navigator.share({title:"SOS Emergency Position",text:t,url:`https://maps.google.com/?q=${i.lat},${i.lon}`}).then(()=>{this.showToast("ส่งสำเร็จ","ส่งสัญญาน SOS แชร์ตำแหน่งเรียบร้อยแล้ว")}).catch(a=>{console.warn("Share failed, copying instead:",a),this.copySOSToClipboard(t)}):this.copySOSToClipboard(t)})}copySOSToClipboard(e){navigator.clipboard.writeText(e).then(()=>{this.showToast("คัดลอกสำเร็จ","คัดลอกข้อความพิกัด SOS ลงคลิปบอร์ดแล้ว คุณสามารถกดส่งไลน์หาผู้เกี่ยวข้องได้ทันที!")}).catch(i=>{console.error("Clipboard copy failed:",i)})}showToast(e,i){const t=document.getElementById("toastContainer");if(!t)return;const a=document.createElement("div");a.className="toast-alert",a.style.borderColor="var(--red)",a.innerHTML=`
      <div class="toast-icon" style="color: var(--red);">
        <i data-lucide="alert-circle" style="width:16px;height:16px;"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title" style="color: var(--red);">${e}</div>
        <div class="toast-msg">${i}</div>
      </div>
    `,t.appendChild(a),lucide.createIcons(),setTimeout(()=>{a.classList.add("dismissed"),setTimeout(()=>a.remove(),300)},4e3)}}class le{constructor(){const e=localStorage.getItem("commuter_coords");e?this.coords=JSON.parse(e):this.coords={lat:13.7462,lon:100.5348,name:"สยามสแควร์ (กรุงเทพฯ)",country:"TH"},this.widgets=[],this.thunderTimer=null,this.weatherCode=null}getWeatherCode(){return this.weatherCode}setWeatherCode(e){this.weatherCode=e}getCoords(){return this.coords}setCoords(e,i,t,a){this.coords={lat:e,lon:i,name:t,country:a},localStorage.setItem("commuter_coords",JSON.stringify(this.coords)),this.widgets.forEach(n=>{typeof n.fetchAndRender=="function"?n.fetchAndRender():typeof n.init=="function"&&n.init()})}registerWidget(e){this.widgets.push(e)}triggerBackgroundAnimation(e){const i=document.getElementById("weatherBgOverlay");if(!i)return;i.innerHTML="",this.thunderTimer&&(clearInterval(this.thunderTimer),this.thunderTimer=null);const t=[51,53,55,61,63,65,80,81,82,95,96],a=[2,3,45,48],n=[0,1];if(t.includes(e)){const s=document.createDocumentFragment();for(let o=0;o<40;o++){const d=document.createElement("div");d.className="rain-drop",d.style.left=`${Math.random()*100}vw`,d.style.top=`${-80-Math.random()*100}px`,d.style.animationDuration=`${.6+Math.random()*.6}s`,d.style.animationDelay=`${Math.random()*2}s`,s.appendChild(d)}i.appendChild(s),e>=95&&(this.thunderTimer=setInterval(()=>{Math.random()>.75&&(i.style.backgroundColor="rgba(255, 255, 255, 0.14)",setTimeout(()=>{i.style.backgroundColor="transparent"},60))},3500))}else if(a.includes(e)){const s=document.createDocumentFragment();for(let o=0;o<4;o++){const d=document.createElement("div");d.className="cloud-particle";const l=150+Math.random()*220;d.style.width=`${l}px`,d.style.height=`${l*.65}px`,d.style.top=`${Math.random()*60}%`,d.style.animationDuration=`${40+Math.random()*50}s`,d.style.animationDelay=`${-Math.random()*40}s`,s.appendChild(d)}i.appendChild(s)}else if(n.includes(e)){const s=document.createElement("div");s.className="sun-ray",i.appendChild(s)}}}function ce(r){return new Promise(e=>{if(!navigator.geolocation)return e();navigator.geolocation.getCurrentPosition(i=>{const{latitude:t,longitude:a}=i.coords;fetch(`https://nominatim.openstreetmap.org/reverse?lat=${t}&lon=${a}&format=json&accept-language=th`).then(n=>n.json()).then(n=>{var o,d,l,c,p,v;const s=((o=n.address)==null?void 0:o.city)||((d=n.address)==null?void 0:d.town)||((l=n.address)==null?void 0:l.suburb)||((c=n.address)==null?void 0:c.county)||"ตำแหน่งปัจจุบัน";r.setCoords(t,a,s,((v=(p=n.address)==null?void 0:p.country_code)==null?void 0:v.toUpperCase())||"TH")}).catch(()=>{r.setCoords(t,a,"ตำแหน่งปัจจุบัน","TH")}).finally(e)},()=>e(),{timeout:6e3,maximumAge:6e4})})}document.addEventListener("DOMContentLoaded",async()=>{const r=new le;me(),await ce(r);const e=new Q("tab-weather",r),i=new oe(null,"tab-transit",r),t=new re("tab-helper",r),a=new de("tab-emergency",r);r.registerWidget(e),r.registerWidget(i),r.registerWidget(t),r.registerWidget(a),await e.init(),await i.init(),await t.init(),await a.init(),ue(),pe(),he(),ge(),ve()});function me(){const r=document.getElementById("mainTime"),e=document.getElementById("mainDate");if(!r||!e)return;const i=()=>{const t=new Date;r.innerText=t.toLocaleTimeString("th-TH",{hour12:!1});const a=["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],n=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."],s=a[t.getDay()],o=t.getDate(),d=n[t.getMonth()],l=t.getFullYear()+543;e.innerText=`วัน${s}ที่ ${o} ${d} ${l}`};i(),setInterval(i,1e3)}function ue(){const r=document.getElementById("themeToggle"),e=document.getElementById("theme-icon-light"),i=document.getElementById("theme-icon-dark");if(!r)return;const t=n=>{n==="light"?(document.body.classList.add("light-theme"),e&&(e.style.display="none"),i&&(i.style.display="block")):(document.body.classList.remove("light-theme"),e&&(e.style.display="block"),i&&(i.style.display="none")),document.dispatchEvent(new CustomEvent("theme-changed"))},a=localStorage.getItem("commuter_theme")||"dark";t(a),r.addEventListener("click",()=>{const s=document.body.classList.contains("light-theme")?"dark":"light";localStorage.setItem("commuter_theme",s),t(s)})}function pe(r){const e=document.querySelectorAll(".nav-item"),i=document.querySelectorAll(".tab-content"),t=document.getElementById("headerTitle"),a=document.getElementById("headerSub"),n={weather:{main:"สภาพอากาศและการเตรียมตัว",sub:"BANGKOK METROPOLIS · TH"},transit:{main:"ตารางเวลารถไฟบีทีเอส-เอ็มอาร์ที",sub:"BANGKOK MASS TRANSIT HUB"},helper:{main:"สิ่งอำนวยความสะดวกในชีวิตประจำวัน",sub:"DAILY PRODUCTIVITY WIDGETS"},emergency:{main:"ศูนย์ความปลอดภัยและข้อมูลติดต่อด่วน",sub:"BANGKOK SAFETY BOARD & SOS"}};e.forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.tab;e.forEach(l=>l.classList.remove("active")),s.classList.add("active"),i.forEach(l=>l.classList.remove("active"));const d=document.getElementById(`tab-${o}`);d&&d.classList.add("active"),t&&a&&n[o]&&(t.innerText=n[o].main,a.innerText=n[o].sub)})})}function he(){const r=document.querySelector(".widgets-layout-grid");if(!r)return;const e=()=>{r.querySelectorAll(".glass-card").forEach(a=>{a.classList.add("draggable-widget"),a.setAttribute("draggable","true")})};e(),new MutationObserver(()=>{e()}).observe(r,{childList:!0});let t=null;r.addEventListener("dragstart",a=>{const n=a.target.closest(".draggable-widget");n&&(t=n,a.dataTransfer.effectAllowed="move",n.style.opacity="0.35")}),r.addEventListener("dragover",a=>{a.preventDefault();const n=a.target.closest(".draggable-widget");n&&n!==t&&n.classList.add("widget-drag-over")}),r.addEventListener("dragleave",a=>{const n=a.target.closest(".draggable-widget");n&&n.classList.remove("widget-drag-over")}),r.addEventListener("drop",a=>{a.preventDefault();const n=a.target.closest(".draggable-widget");if(n&&n!==t){n.classList.remove("widget-drag-over");const s=Array.from(r.children),o=s.indexOf(t),d=s.indexOf(n);o<d?r.insertBefore(t,n.nextSibling):r.insertBefore(t,n);const l=Array.from(r.children).map(c=>c.innerHTML.substring(0,30));localStorage.setItem("commuter_widget_order",JSON.stringify(l))}}),r.addEventListener("dragend",a=>{const n=a.target.closest(".draggable-widget");n&&(n.style.opacity="1"),r.querySelectorAll(".draggable-widget").forEach(s=>{s.classList.remove("widget-drag-over")})})}function ge(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(r=>console.log("Service Worker registered successfully:",r.scope)).catch(r=>console.error("Service Worker registration failed:",r))})}function ve(){const r=(e,i,t,a)=>{const n=document.getElementById("toastContainer");if(!n)return;const s=document.createElement("div");s.className="toast-alert",s.style.borderColor=t,s.innerHTML=`
      <div class="toast-icon" style="color: ${t};">
        <i data-lucide="${a}" style="width:16px;height:16px;"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title" style="color: ${t};">${e}</div>
        <div class="toast-msg">${i}</div>
      </div>
    `,n.appendChild(s),lucide.createIcons(),setTimeout(()=>{s.classList.add("dismissed"),setTimeout(()=>s.remove(),300)},4500)};window.addEventListener("online",()=>{r("การเชื่อมต่อกลับมาแล้ว","ระบบเปลี่ยนกลับเป็นโหมดออนไลน์อัตโนมัติ","var(--green)","wifi")}),window.addEventListener("offline",()=>{r("คุณออฟไลน์อยู่","ระบบสลับมาใช้ฐานข้อมูลและแคชออฟไลน์แล้ว","var(--yellow)","wifi-off")})}
