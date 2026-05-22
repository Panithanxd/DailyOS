(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=e(n);fetch(n.href,a)}})();const J=10*60*1e3;async function W(r,t={},e=J){const i=`api_cache_${r}`;if(!navigator.onLine){const a=localStorage.getItem(i);if(a){const{data:s}=JSON.parse(a);return console.log(`[API Cache] Offline mode: Served ${r} from cache.`),s}throw new Error("ระบบออฟไลน์และไม่มีข้อมูลสำรองสำหรับคำขอนี้")}const n=localStorage.getItem(i);if(n){const{data:a,timestamp:s}=JSON.parse(n);if(Date.now()-s<e)return a}try{const a=await fetch(r,t);if(!a.ok)throw new Error(`HTTP Error: ${a.status}`);const s=await a.json();return localStorage.setItem(i,JSON.stringify({data:s,timestamp:Date.now()})),s}catch(a){if(console.warn(`[API Cache] Fetch failed, fallback to cache for ${r}:`,a.message),n){const{data:s}=JSON.parse(n);return s}throw a}}const D={0:["☀️","CLEAR SKY","ท้องฟ้าแจ่มใส"],1:["🌤","MAINLY CLEAR","ท้องฟ้าโปร่ง"],2:["⛅","PARTLY CLOUDY","มีเมฆบางส่วน"],3:["☁️","OVERCAST","เมฆครึ้ม"],45:["🌫","FOGGY","หมอกลงจัด"],48:["🌫","RIME FOG","หมอกน้ำค้างแข็ง"],51:["🌦","LIGHT DRIZZLE","ฝนตกปรอยๆ เล็กน้อย"],53:["🌦","DRIZZLE","ฝนตกปรอยๆ"],55:["🌧","HEAVY DRIZZLE","ฝนตกปรอยหนาแน่น"],61:["🌧","LIGHT RAIN","ฝนตกเล็กน้อย"],63:["🌧","MODERATE RAIN","ฝนตกปานกลาง"],65:["🌧","HEAVY RAIN","ฝนตกชุกหนาแน่น"],80:["🌦","RAIN SHOWERS","ฝนตกกระจายตัว"],81:["⛈","STORM","พายุฝนฟ้าคะนอง"],82:["⛈","HEAVY STORM","พายุฝนคะนองรุนแรง"],95:["⛈","THUNDERSTORM","พายุฝนรุนแรงและฟ้าผ่า"],96:["⛈","HAIL STORM","พายุฝนฟ้าคะนองและลูกเห็บ"]},R=[{max:50,col:"#10b981",lbl:"ดีเยี่ยม (Good)",advice:"คุณภาพอากาศดีมาก เหมาะสำหรับทำกิจกรรมกลางแจ้ง"},{max:100,col:"#f59e0b",lbl:"ปานกลาง (Moderate)",advice:"คุณภาพอากาศปานกลาง กลุ่มเสี่ยงควรหลีกเลี่ยงกิจกรรมกลางแจ้งเป็นเวลานาน"},{max:150,col:"#ff9f43",lbl:"เริ่มมีผลกระทบ (Sensitive)",advice:"ควรสวมหน้ากากอนามัยเมื่ออยู่นอกอาคาร และลดการออกกำลังกายกลางแจ้ง"},{max:200,col:"#ef4444",lbl:"มีผลเสียต่อสุขภาพ (Unhealthy)",advice:"⚠️ สวมหน้ากาก PM2.5 ตลอดเวลาเมื่ออยู่กลางแจ้ง หลีกเลี่ยงกิจกรรมนอกอาคาร"},{max:300,col:"#b71c1c",lbl:"แย่อย่างยิ่ง (Very Unhealthy)",advice:"🚨 เป็นอันตรายต่อสุขภาพ! ควรอยู่ในอาคารที่ปิดมิดชิดและเปิดเครื่องฟอกอากาศ"},{max:500,col:"#7f1d1d",lbl:"อันตรายสูงสุด (Hazardous)",advice:"❌ วิกฤตคุณภาพอากาศร้ายแรง! ห้ามออกนอกอาคารโดยไม่จำเป็น"}];function V(r,t){const e=new Date,i=e.getHours(),n=i>=6&&i<10?1:i>=10&&i<14?2:i>=14&&i<18?3:0,a=Array.from({length:24},(l,c)=>{const d=new Date(e);return d.setHours(c,0,0,0),d.toISOString()}),s=Array.from({length:7},(l,c)=>{const d=new Date(e);return d.setDate(d.getDate()+c),d.toISOString().split("T")[0]}),o=Array.from({length:24},(l,c)=>30+Math.round(Math.sin((c-6)*Math.PI/12)*5));return{current:{temperature_2m:33,apparent_temperature:38,relative_humidity_2m:72,weather_code:n,wind_speed_10m:12,wind_direction_10m:180,surface_pressure:1009,visibility:9e3},hourly:{time:a,temperature_2m:o,weather_code:Array(24).fill(n),precipitation_probability:Array(24).fill(10)},daily:{time:s,weather_code:[1,2,3,63,1,2,0],temperature_2m_max:[35,34,33,30,36,35,37],temperature_2m_min:[26,25,25,24,27,26,27],sunrise:s.map(l=>l+"T06:08"),sunset:s.map(l=>l+"T18:32"),uv_index_max:[10,9,7,4,11,10,12],precipitation_sum:[0,0,2,15,0,0,0],precipitation_probability_max:[5,10,30,80,5,10,5]},latitude:r,longitude:t,_isMock:!0}}function Q(r,t){return{current:{us_aqi:78,pm2_5:22.4},latitude:r,longitude:t,_isMock:!0}}async function O(r,t){const e=`https://api.open-meteo.com/v1/forecast?latitude=${r}&longitude=${t}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max&timezone=Asia%2FBangkok`,i=`api_cache_${e}`;try{const n=localStorage.getItem(i);if(n){const{timestamp:a}=JSON.parse(n);Date.now()-a>10*60*1e3&&localStorage.removeItem(i)}}catch{localStorage.removeItem(i)}try{return await W(e,{},6e5)}catch{return V(r,t)}}async function q(r,t){const e=`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${r}&longitude=${t}&current=us_aqi,pm2_5&timezone=Asia%2FBangkok`;try{return await W(e,{},10*60*1e3)}catch{return Q(r,t)}}function z(r,t){const e=(r||"").toLowerCase(),i=(t||"").toLowerCase();if(e===i)return 100;if(e.startsWith(i))return 80;if(e.includes(i))return 60;let n=0;for(let a=0;a<e.length&&n<i.length;a++)e[a]===i[n]&&n++;return n===i.length?40:0}async function Z(r){if(!r||!r.trim())return[];const t=r.trim(),e=encodeURIComponent(t),i=[],n=new Set,a=m=>{const p=((m.name||"")+"|"+String(m.latitude||"").slice(0,5)+"|"+String(m.longitude||"").slice(0,5)).toLowerCase();return n.has(p)?!1:(n.add(p),!0)},s=fetch("https://geocoding-api.open-meteo.com/v1/search?name="+e+"&count=8&language=th&format=json").then(m=>m.json()).then(m=>(m.results||[]).map(p=>({name:p.name,admin1:p.admin1||"",country:p.country||"",country_code:p.country_code||"",latitude:p.latitude,longitude:p.longitude,_src:"omeo"}))).catch(()=>[]),o=fetch("https://nominatim.openstreetmap.org/search?q="+e+"&format=json&limit=8&addressdetails=1&accept-language=th,en").then(m=>m.json()).then(m=>m.map(p=>{const v=p.address||{};return{name:(p.display_name||"").split(",")[0]||t,admin1:v.state||v.province||v.county||"",country:v.country||"",country_code:(v.country_code||"").toUpperCase(),latitude:parseFloat(p.lat),longitude:parseFloat(p.lon),display_name:p.display_name,_src:"nominatim"}})).catch(()=>[]),[l,c]=await Promise.allSettled([s,o]),d=l.status==="fulfilled"?l.value:[],h=c.status==="fulfilled"?c.value:[];return[...d,...h].forEach(m=>{if(!m.latitude||!m.longitude||!a(m))return;const p=z(m.name,t)+z(m.admin1,t)*.3+z(m.country,t)*.1;i.push(Object.assign({},m,{_score:p}))}),i.sort((m,p)=>p._score-m._score),i.slice(0,8)}function X(r,t){return[51,53,55,61,63,65,80,81,82,95,96].includes(r)||t>=40?{needed:!0,text:"☔ ควรพกร่มหรือเสื้อกันฝน! มีโอกาสเกิดฝนตกสูงในระหว่างวัน",color:"var(--cyan)"}:t>=15?{needed:!1,text:"🌤️ ฝนตกยาก แต่ท้องฟ้าอาจครึ้มๆ ไม่จำเป็นต้องพกร่ม",color:"var(--muted)"}:{needed:!1,text:"☀️ ท้องฟ้าแจ่มใส/แดดจัด เดินทางสะดวก ไม่จำเป็นต้องพกร่ม",color:"var(--green)"}}function tt(r,t,e){return[51,53,55,61,63,65,80,81,82,95,96].includes(e)?"เสื้อผ้าแห้งไว (Quick-Dry) หรือเสื้อคลุมกันน้ำ หลีกเลี่ยงรองเท้าผ้าใบสีขาว":r>=35?"เสื้อผ้าฝ้ายบางเบา ระบายอากาศดีเยี่ยม หมวก แว่นกันแดด และควรทาครีมกันแดด":r>=28?"เสื้อผ้าสวมใส่สบาย เช่น เสื้อยืด แขนสั้น กางเกงขาสั้น/ระบายความร้อนได้ดี":r>=22?"เสื้อยืดแขนสั้น หรือเชิ้ตบางๆ สภาพอากาศกำลังเย็นสบายกำลังดี":"สวมเสื้อแขนยาว หรือเตรียมเสื้อแจ็คเก็ตบางๆ เนื่องจากอากาศค่อนข้างเย็น"}function et(r){return r>=8?{text:"อันตรายระดับสูงมาก! หลีกเลี่ยงแสงแดดช่วง 10:00-16:00 ทากันแดด SPF 30+",color:"var(--red)"}:r>=6?{text:"ระดับสูง! ควรทาครีมกันแดด สวมหมวกปีกกว้าง และสวมแว่นกันแดด",color:"var(--yellow)"}:r>=3?{text:"ระดับปานกลาง ควรกางร่มเมื่อเดินกลางแจ้งเป็นเวลานาน",color:"var(--cyan)"}:{text:"ระดับต่ำ ปลอดภัยต่อการออกแดดทั่วไป",color:"var(--green)"}}const it=[{name:"สายด่วนเจ็บป่วยฉุกเฉิน (สพฉ.)",number:"1669",category:"medical",desc:"กู้ชีพและอุบัติเหตุแพทย์ฉุกเฉิน"},{name:"เหตุด่วนเหตุร้าย (ตำรวจ)",number:"191",category:"police",desc:"แจ้งเหตุด่วนตำรวจหลัก"},{name:"สายด่วนข้อมูลการจราจร (บก.02)",number:"1197",category:"traffic",desc:"ศูนย์ควบคุมสั่งการจราจรกรุงเทพฯ"},{name:"ตำรวจทางหลวง",number:"1193",category:"traffic",desc:"เหตุบนมอเตอร์เวย์และทางหลวงแผ่นดิน"},{name:"แจ้งเหตุอัคคีภัย/ดับเพลิง",number:"199",category:"fire",desc:"นักดับเพลิงและกู้ภัยกรุงเทพฯ"},{name:"ศูนย์แพทย์ฉุกเฉินกทม. (ศูนย์เอราวัณ)",number:"1646",category:"medical",desc:"หน่วยแพทย์เคลื่อนที่กทม."},{name:"สายด่วนข้อมูลน้ำท่วมกทม.",number:"1555",category:"flood",desc:"ศูนย์ประสานงานน้ำท่วมกรุงเทพฯ"},{name:"สถานีวิทยุจราจรเพื่อการแจ้งเหตุ (จส.100)",number:"1137",category:"traffic",desc:"รายงานอุบัติเหตุและของหาย"}];function Y(r){const t=[];return[61,63,65,80,81,82,95,96].includes(r)&&(t.push({id:"rain_alert",level:"warning",title:"🌧️ แจ้งเตือนฝนฟ้าคะนองในพื้นที่",text:"มีฝนตกชุกหนาแน่นและลมกรรโชกแรงในเขตกรุงเทพมหานครและปริมณฑล หลีกเลี่ยงการเดินทางกลางแจ้งหากไม่จำเป็น"}),r>=63&&t.push({id:"flood_alert",level:"danger",title:"🚨 พื้นที่เสี่ยงน้ำท่วมขังรอระบาย",text:"เนื่องจากมีปริมาณน้ำสะสมสูง พบปัญหาถนนน้ำขังระดับ 10-15 ซม. ที่ ถนนอโศกมนตรี (หน้า ตึก GMM), แยกรัชดา-ลาดพร้าว และซอยสุขุมวิท 39"})),t.push({id:"aqi_alert",level:"info",title:"😷 อัพเดทสถานการณ์ฝุ่น PM 2.5",text:"ค่าฝุ่นละออง PM 2.5 วันนี้มีแนวโน้มสะสมตัวเนื่องจากสภาพลมสงบ แนะนำตรวจเช็คดัชนีคุณภาพอากาศก่อนทำกิจกรรมกลางแจ้งทุกครั้ง"}),t}function nt(){const r=[],t=new Date,e=["ถนนลาดพร้าว ซอย 80 (งานปรับปรุงระบบจำหน่ายแรงสูงเพื่อความปลอดภัย)","ซอยสุขุมวิท 22 (ติดตั้งอุปกรณ์ตรวจวัดกระแสไฟฟ้าแรงสูง)","ถนนพระราม 9 ซอย 15 (ย้ายเสาพาดสายหลบแนวก่อสร้างทางรถไฟฟ้า)"];for(let i=0;i<3;i++){const n=new Date(t);n.setDate(t.getDate()+i+1),r.push({id:`outage_${i}`,title:`⚡ ประกาศดับไฟเพื่อบำรุงรักษา — ${e[i]}`,time:`${n.toLocaleDateString("th-TH",{day:"numeric",month:"short"})} | 08:30 น. - 15:30 น.`,status:"กำลังดำเนินการตามแผน"})}return r}class at{constructor(t,e){this.containerId=t,this.state=e}async init(){this.container=document.getElementById(this.containerId),this.container&&(this.renderSkeleton(),await this.fetchAndRender())}renderSkeleton(){this.container.innerHTML=`
      <div class="glass-card skeleton" style="height: 120px;"></div>
    `}async fetchAndRender(){try{const t=this.state.getCoords(),e=await O(t.lat,t.lon),i=await q(t.lat,t.lon),n=e.current.weather_code,a=Y(n);this.render(e,i,a)}catch(t){console.warn("Commute insights fetch error:",t.message),this.container.innerHTML=""}}render(t,e,i){const n=t.current,a=e.current.us_aqi,o=new Date().getHours();let l="",c="🌟",d="เช้าอันสดใส เหมาะแก่การเดินทาง",h="var(--cyan)";const p=[61,63,65,80,81,82,95,96].includes(n.weather_code);i.some(S=>S.id==="flood_alert")?(l="<b>แจ้งเตือนภัยพิบัติ:</b> มีฝนตกหนักน้ำท่วมขังในบางพื้นที่และพบบีทีเอสขัดข้อง ดีเลย์ประมาณ 8 นาที แนะนำให้เผื่อเวลาอย่างน้อย 20-30 นาทีในการเดินทางช่วงนี้",c="🚨",d="แจ้งเตือน: การเดินทางมีความเสี่ยงสูง",h="var(--red)"):p?(l="<b>พยากรณ์ฝนตก:</b> ท้องฟ้าครึ้มฝนฟ้าคะนองในเขตกทม. แนะนำให้พกร่มและสวมใส่รองเท้าที่กันน้ำได้ การจราจรบนทางด่วนอาจชะลอตัวเนื่องจากทัศนวิสัยต่ำ",c="☔",d="เตือนภัย: มีฝนฟ้าคะนองในพื้นที่",h="var(--yellow)"):n.temperature_2m>=35?(l="<b>สภาพอากาศร้อนจัด:</b> อุณหภูมิพุ่งสูงถึง 36°C+ แนะนำให้สวมใส่เสื้อผ้าเบาสบาย ระบายอากาศได้ดี หลีกเลี่ยงแดดจัดช่วงเที่ยง-บ่าย และพกน้ำดื่มติดตัว",c="☀️",d="เตือนภัย: สภาพอากาศร้อนจัด (Extreme Heat)",h="#f59e0b"):a>150?(l="<b>มลพิษทางอากาศ:</b> ค่าฝุ่น PM 2.5 วันนี้สูงเกินมาตรฐาน (US AQI: "+a+") แนะนำให้สวมใส่หน้ากาก N95 ก่อนทำกิจกรรมกลางแจ้ง",c="😷",d="เตือนภัย: คุณภาพอากาศเป็นอันตราย",h="#a855f7"):(l="<b>สภาพอากาศเอื้ออำนวย:</b> อากาศปลอดโปร่ง ไม่มีรายงานดีเลย์รถไฟฟ้า การจราจรช่วงเช้านี้ไหลลื่นปกติ ขอให้คุณเดินทางด้วยความสุขความปลอดภัย!",c="✨",d="สถานการณ์ปกติ: เดินทางได้ราบรื่น",h="var(--cyan)");let u=30,g="เบาบาง (เดินทางสะดวก)",y="var(--green)";o>=7&&o<=9||o>=17&&o<=19?(u=85,g="หนาแน่นสูง (ชานชาลาแออัด)",y="var(--red)"):(o>=11&&o<=13||o>=16&&o<17)&&(u=55,g="ปานกลาง (มีผู้โดยสารพ้นเก้าอี้)",y="var(--yellow)");let x="07:00 น. หรือ หลัง 09:15 น.",b="16:30 น. หรือ หลัง 19:30 น.";p&&(x="เดินทางล่วงหน้าเร็วขึ้น 30 นาที",b="รอฝนซาหลัง 19:30 น."),this.container.innerHTML=`
      <div class="glass-card glow-card" style="margin-bottom: 24px; border-color: ${h}33; display: flex; flex-direction: column; gap: 16px; background: linear-gradient(135deg, ${h}05 0%, rgba(13, 20, 35, 0.4) 100%);">
        
        <!-- Header status -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border); padding-bottom: 12px;">
          <div style="display: flex; gap: 10px; align-items: center;">
            <div style="font-size: 1.5rem; line-height: 1;">${c}</div>
            <div>
              <div style="font-size: 0.85rem; font-weight: 600; color: ${h};">${d}</div>
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
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 500; color: ${y};">
                  <span>${g}</span>
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
    `,lucide.createIcons()}}class st{constructor(t,e){this.container=document.getElementById(t),this.state=e,this.searchTimeout=null,this._gpsWatchId=null,this._gpsLoading=!1}async init(){await this.fetchAndRender()}async fetchAndRender(){var t;try{const e=this.state.getCoords(),i=await O(e.lat,e.lon),n=await q(e.lat,e.lon);this.render(i,n)}catch(e){console.error(e),this.container.innerHTML=`
        <div class="glass-card glow-card-red" style="text-align:center;padding:40px;">
          <i data-lucide="wifi-off" style="width:48px;height:48px;color:var(--red);margin-bottom:16px;"></i>
          <h3 style="color:var(--red);margin-bottom:10px;">เกิดข้อผิดพลาดในการดึงข้อมูลสภาพอากาศ</h3>
          <p style="font-size:0.85rem;color:var(--muted);margin-bottom:20px;">${e.message}</p>
          <button class="btn btn-primary" id="retryWeatherBtn">
            <i data-lucide="refresh-cw" style="width:14px;height:14px;"></i> ลองใหม่
          </button>
        </div>`,lucide.createIcons(),(t=document.getElementById("retryWeatherBtn"))==null||t.addEventListener("click",()=>this.init())}}_requestGPS(){if(!this._gpsLoading){if(!navigator.geolocation){this._setLocationBadge("error","GPS ไม่รองรับ");return}this._gpsLoading=!0,this._setLocationBadge("loading","กำลังหาตำแหน่ง..."),navigator.geolocation.getCurrentPosition(t=>{this._gpsLoading=!1;const{latitude:e,longitude:i}=t.coords;this._reverseGeocode(e,i)},t=>{this._gpsLoading=!1;const e={1:"ไม่ได้รับอนุญาต GPS",2:"หา GPS ไม่ได้",3:"GPS หมดเวลา"};this._setLocationBadge("error",e[t.code]||"GPS ผิดพลาด")},{enableHighAccuracy:!0,timeout:1e4,maximumAge:3e4})}}_reverseGeocode(t,e){this._setLocationBadge("loading","กำลังระบุชื่อเมือง..."),fetch(`https://nominatim.openstreetmap.org/reverse?lat=${t}&lon=${e}&format=json&accept-language=th`).then(i=>i.json()).then(i=>{var s,o,l,c,d,h;const n=((s=i.address)==null?void 0:s.city)||((o=i.address)==null?void 0:o.town)||((l=i.address)==null?void 0:l.suburb)||((c=i.address)==null?void 0:c.county)||"ตำแหน่งปัจจุบัน",a=((h=(d=i.address)==null?void 0:d.country_code)==null?void 0:h.toUpperCase())||"TH";this.state.setCoords(t,e,n,a),this._setLocationBadge("ok",`${n} (${t.toFixed(4)}, ${e.toFixed(4)})`),this.fetchAndRender()}).catch(()=>{this.state.setCoords(t,e,"ตำแหน่งปัจจุบัน","TH"),this._setLocationBadge("ok",`${t.toFixed(4)}, ${e.toFixed(4)}`),this.fetchAndRender()})}_setLocationBadge(t,e){const i=document.getElementById("wLocationBadge"),n=document.getElementById("wLocationDot"),a=document.getElementById("wLocationLabel"),s=document.getElementById("wGpsBtn");if(!i)return;const l={loading:"var(--yellow)",ok:"var(--green)",error:"var(--red)"}[t]||"var(--muted)";n&&(n.style.background=l,n.style.animation=t==="loading"?"pulse 0.8s infinite":"pulse 2s infinite"),a&&(a.textContent=e),s&&(s.disabled=t==="loading",s.style.opacity=t==="loading"?"0.5":"1")}render(t,e){const i=t.current,n=this.state.getCoords(),[a,s,o]=D[i.weather_code]||["???","UNKNOWN","ไม่ทราบสภาพอากาศ"],l=t.daily.sunrise[0].slice(11,16),c=t.daily.sunset[0].slice(11,16),d=new Date,h=d.getHours()*60+d.getMinutes(),m=parseInt(l.slice(0,2))*60+parseInt(l.slice(3,5)),p=parseInt(c.slice(0,2))*60+parseInt(c.slice(3,5)),v=Math.min(100,Math.max(0,(h-m)/(p-m)*100)),u=X(i.weather_code,t.hourly.precipitation_probability[0]),g=tt(i.temperature_2m,i.apparent_temperature,i.weather_code),y=et(t.daily.uv_index_max[0]);this.state.setWeatherCode(i.weather_code),this.state.triggerBackgroundAnimation(i.weather_code);const x=d.getHours();let b="";for(let f=0;f<16;f++){const E=(x+f)%24,C=Math.round(t.hourly.temperature_2m[x+f]),P=t.hourly.weather_code[x+f],H=t.hourly.precipitation_probability[x+f],A=(D[P]||["???"])[0];b+=`
        <div class="hourly-item ${f===0?"now":""}">
          <div class="hourly-time">${f===0?"ตอนนี้":String(E).padStart(2,"0")+":00"}</div>
          <div class="hourly-icon">${A}</div>
          <div class="hourly-temp">${C}C</div>
          ${H>20?'<div style="font-size:0.6rem;color:var(--cyan);margin-top:2px;">&#128167;'+H+"%</div>":""}
        </div>`}let S="";for(let f=0;f<7;f++){const E=new Date(t.daily.time[f]),C=E.toLocaleDateString("th-TH",{weekday:"short"}),P=E.toLocaleDateString("th-TH",{day:"numeric",month:"short"}),H=Math.round(t.daily.temperature_2m_max[f]),A=Math.round(t.daily.temperature_2m_min[f]),F=t.daily.precipitation_probability_max[f],U=(D[t.daily.weather_code[f]]||["???"])[0];S+=`
        <div class="daily-item">
          <div class="daily-date">
            <span style="font-weight:500;">${C}</span><br>
            <span style="font-size:0.65rem;color:var(--muted);">${P}</span>
          </div>
          <div class="daily-icon-desc">
            <span class="daily-icon">${U}</span>
            ${F>20?'<span class="daily-rain-chance"><i data-lucide="droplet" style="width:10px;height:10px;"></i> '+F+"%</span>":'<span style="font-size:0.7rem;color:var(--muted2);">ไม่มีฝน</span>'}
          </div>
          <div class="daily-temps">
            <span class="daily-temp-max">${H}</span>
            <span class="daily-temp-min">${A}</span>
          </div>
        </div>`}const T=e.current.us_aqi,k=e.current.pm2_5;let _="var(--muted)",I="ไม่มีข้อมูล";if(T!==void 0){for(const f of R)if(T<=f.max){_=f.col,I=f.lbl,f.advice;break}}const M=n.lat&&n.lon?n.lat.toFixed(4)+", "+n.lon.toFixed(4):"--";this.container.innerHTML=`
      <!-- Search + GPS row -->
      <div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:24px;flex-wrap:wrap;">
        <div class="search-box-container" style="flex:1;min-width:200px;margin-bottom:0;">
          <div class="search-input-wrap">
            <i data-lucide="search"></i>
            <input type="text" id="weatherSearchInput" placeholder="ค้นหาชื่อเมือง อำเภอ หรือจังหวัด..." autocomplete="off">
          </div>
          <div class="suggestions-list" id="weatherSuggestions"></div>
        </div>

        <button id="wGpsBtn" class="btn btn-secondary" title="ใช้ GPS ตำแหน่งปัจจุบัน"
          style="display:flex;align-items:center;gap:6px;font-size:0.75rem;padding:10px 12px;white-space:nowrap;flex-shrink:0;">
          <i data-lucide="locate-fixed" style="width:14px;height:14px;color:var(--cyan);"></i>
          GPS ตำแหน่งฉัน
        </button>
      </div>

      <!-- Location badge -->
      <div id="wLocationBadge" style="display:flex;align-items:center;gap:8px;margin-bottom:20px;padding:8px 12px;border-radius:8px;background:rgba(255,255,255,0.03);border:1px solid var(--border);max-width:fit-content;">
        <div id="wLocationDot" style="width:8px;height:8px;border-radius:50%;background:var(--green);flex-shrink:0;animation:pulse 2s infinite;"></div>
        <i data-lucide="map-pin" style="width:12px;height:12px;color:var(--cyan);flex-shrink:0;"></i>
        <span id="wLocationLabel" style="font-size:0.7rem;color:var(--muted);font-family:'JetBrains Mono',monospace;">
          ${n.name||"ไม่ทราบตำแหน่ง"} &nbsp;
          <span style="color:var(--muted2);">(${M})</span>
        </span>
      </div>

      <div id="weatherDashboardContent">
        <div id="commuteBriefingContainer"></div>

        <div class="weather-grid">
          <div class="glass-card">
            <div style="font-size:0.75rem;color:var(--muted);letter-spacing:2px;text-transform:uppercase;font-family:'JetBrains Mono',monospace;margin-bottom:20px;">
              สภาพอากาศปัจจุบัน (${n.name||"ตำแหน่งปัจจุบัน"})
            </div>
            <div class="weather-main-info">
              <div class="weather-big-icon float-effect">${a}</div>
              <div>
                <div class="weather-main-temp">${Math.round(i.temperature_2m)}<sup>C</sup></div>
                <div class="weather-main-desc">${o}</div>
                <div class="weather-feels-like">รู้สึกเหมือนจริงประมาณ ${Math.round(i.apparent_temperature)}C</div>
              </div>
            </div>
            <div style="margin-top:16px;padding:12px;background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid var(--border);">
              <div style="font-size:0.72rem;color:${u.color};line-height:1.5;">${u.text}</div>
              <div style="font-size:0.72rem;color:var(--muted);margin-top:6px;line-height:1.5;">&#128084; ${g}</div>
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
              <div style="font-size:1.5rem;font-weight:500;font-family:'Outfit';color:${t.daily.uv_index_max[0]>=6?"var(--yellow)":"var(--text)"};">${Math.round(t.daily.uv_index_max[0])}</div>
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
            ${S}
          </div>

          <div class="weather-sub-cards">
            <div class="glass-card">
              <div style="font-size:0.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:2px;font-family:'JetBrains Mono',monospace;margin-bottom:12px;display:flex;align-items:center;gap:6px;">
                <i data-lucide="sun" style="width:14px;height:14px;"></i> วิถีดวงอาทิตย์ (Solar Orbit)
              </div>
              <div class="solar-track-box">
                <div class="solar-track-header">
                  <span>&#127749; ${l} น.</span>
                  <span>${c} น. &#127751;</span>
                </div>
                <div class="solar-track-line">
                  <div class="solar-track-fill" style="width:${v}%"></div>
                  <div class="solar-sun-dot" style="left:${v}%">&#9728;&#65039;</div>
                </div>
                <div class="solar-stats">
                  <div class="solar-stat-item">โอกาสเกิดฝนวันนี้<b>${t.daily.precipitation_probability_max[0]}%</b></div>
                  <div class="solar-stat-item">ดัชนีแสงแดด (UV)<b>${Math.round(t.daily.uv_index_max[0])}</b></div>
                </div>
              </div>
              <div style="font-size:0.7rem;color:var(--muted);line-height:1.4;border-top:1px solid var(--border);padding-top:12px;margin-top:12px;">
                <strong>ค่าแดดสูงสุด:</strong> ${y.text}
              </div>
            </div>

            <div class="glass-card" style="border-color:${_}33;">
              <div style="font-size:0.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:2px;font-family:'JetBrains Mono',monospace;margin-bottom:12px;display:flex;align-items:center;gap:6px;">
                <i data-lucide="wind" style="width:14px;height:14px;"></i> ดัชนีคุณภาพอากาศ (US AQI)
              </div>
              <div class="aqi-row">
                <div>
                  <div class="aqi-number" style="color:${_};">${T??"--"}</div>
                  <div class="aqi-label" style="color:${_};">${I}</div>
                </div>
                <div style="text-align:right;">
                  <span style="font-size:0.65rem;color:var(--muted);">ปริมาณฝุ่น PM 2.5</span><br>
                  <b style="font-size:1.15rem;font-family:'Outfit';">${(k==null?void 0:k.toFixed(1))??"--"} <span style="font-size:0.7rem;font-weight:normal;">&#956;g/m&#179;</span></b>
                </div>
              </div>
              <div class="aqi-scale-bar">
                ${R.map((f,E)=>'<div class="aqi-scale-segment '+(T!==void 0&&(E===0?T<=50:T>R[E-1].max&&T<=f.max)?"active":"")+'" style="background-color:'+f.col+';"></div>').join("")}
              </div>
              <div style="display:flex;justify-content:space-between;font-size:0.5rem;color:var(--muted);font-family:'JetBrains Mono',monospace;margin-top:6px;">
                <span>0</span><span>50</span><span>100</span><span>150</span><span>200</span><span>300+</span>
              </div>
            </div>
          </div>
        </div>
      </div>`,new at("commuteBriefingContainer",this.state).init(),lucide.createIcons(),this._attachGpsBtn(),this._attachSearchEvents()}_attachGpsBtn(){const t=document.getElementById("wGpsBtn");t&&t.addEventListener("click",()=>this._requestGPS())}_attachSearchEvents(){const t=document.getElementById("weatherSearchInput"),e=document.getElementById("weatherSuggestions");!t||!e||(t.addEventListener("input",()=>{const i=t.value.trim();if(this.searchTimeout&&clearTimeout(this.searchTimeout),!i){e.style.display="none",e.innerHTML="";return}e.innerHTML='<div class="suggestion-item" style="color:var(--muted2);cursor:default;font-size:0.78rem;">&#128269; กำลังค้นหา...</div>',e.style.display="block",this.searchTimeout=setTimeout(async()=>{try{const n=await Z(i);if(!n||n.length===0){e.innerHTML='<div class="suggestion-item" style="color:var(--muted);cursor:default;">ไม่พบสถานที่ดังกล่าว</div>',e.style.display="block";return}e.innerHTML=n.map(a=>{const s=a.admin1?", "+a.admin1:"",o=a.country||"";return'<div class="suggestion-item" data-lat="'+a.latitude+'" data-lon="'+a.longitude+'" data-name="'+a.name+'" data-country="'+(a.country_code||"TH")+'"><i data-lucide="map-pin" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:6px;color:var(--cyan);"></i><b>'+a.name+"</b>"+s+" ("+o+")</div>"}).join(""),e.style.display="block",lucide.createIcons(),e.querySelectorAll(".suggestion-item[data-lat]").forEach(a=>{a.addEventListener("click",()=>{const s=parseFloat(a.dataset.lat),o=parseFloat(a.dataset.lon),l=a.dataset.name,c=a.dataset.country;t.value="",e.style.display="none",e.innerHTML="",this._setLocationBadge("ok",l+" ("+s.toFixed(4)+", "+o.toFixed(4)+")"),this.state.setCoords(s,o,l,c),this.fetchAndRender()})})}catch(n){e.innerHTML='<div class="suggestion-item" style="color:var(--red);cursor:default;">เกิดข้อผิดพลาด: '+n.message+"</div>",e.style.display="block"}},350)}),document.addEventListener("click",i=>{!t.contains(i.target)&&!e.contains(i.target)&&(e.style.display="none")}),t.addEventListener("keydown",i=>{i.key==="Escape"&&(e.style.display="none",t.blur())}))}setupSearchEvents(){}}const ot={bts_green:{name:"BTS สายสุขุมวิท",short:"BTS-S",color:"#22c55e",fareBase:17,farePerSt:4.5,fareMax:65,timePerSt:2,pax:{adult:1,student:.7,senior:.5}},bts_silom:{name:"BTS สายสีลม",short:"BTS-L",color:"#15803d",fareBase:17,farePerSt:4.5,fareMax:65,timePerSt:2,pax:{adult:1,student:.7,senior:.5}},mrt_blue:{name:"MRT สายสีน้ำเงิน",short:"MRT-B",color:"#2563eb",fareBase:17,farePerSt:3,fareMax:45,timePerSt:2.5,pax:{adult:1,student:.9,senior:.5}},mrt_purple:{name:"MRT สายสีม่วง",short:"MRT-P",color:"#9333ea",fareBase:14,farePerSt:3,fareMax:42,timePerSt:2.5,pax:{adult:1,student:.9,senior:.5}},mrt_yellow:{name:"MRT สายสีเหลือง",short:"MRT-Y",color:"#eab308",fareBase:15,farePerSt:3.2,fareMax:45,timePerSt:2,pax:{adult:1,student:.9,senior:.5}},arl:{name:"Airport Rail Link",short:"ARL",color:"#e11d48",fareBase:15,farePerSt:5,fareMax:45,timePerSt:3,pax:{adult:1,student:1,senior:1}}},j=[{id:"khu_khot",name:"คูคต",line:"bts_green",idx:0},{id:"saphan_mai",name:"สะพานใหม่",line:"bts_green",idx:4},{id:"kasetsart",name:"ม.เกษตรศาสตร์",line:"bts_green",idx:11},{id:"ha_yaek",name:"ห้าแยกลาดพร้าว",line:"bts_green",idx:15},{id:"mo_chit",name:"หมอชิต",line:"bts_green",idx:16},{id:"saphan_khwai",name:"สะพานควาย",line:"bts_green",idx:17},{id:"ari",name:"อารีย์",line:"bts_green",idx:19},{id:"victory",name:"อนุสาวรีย์ชัยฯ",line:"bts_green",idx:21},{id:"phaya_thai",name:"พญาไท",line:"bts_green",idx:22},{id:"siam",name:"สยาม",line:"bts_green",idx:24},{id:"chit_lom",name:"ชิดลม",line:"bts_green",idx:25},{id:"phloen_chit",name:"เพลินจิต",line:"bts_green",idx:26},{id:"nana",name:"นานา",line:"bts_green",idx:27},{id:"asok",name:"อโศก",line:"bts_green",idx:28},{id:"phrom_phong",name:"พร้อมพงษ์",line:"bts_green",idx:29},{id:"thong_lo",name:"ทองหล่อ",line:"bts_green",idx:30},{id:"ekkamai",name:"เอกมัย",line:"bts_green",idx:31},{id:"phra_khanong",name:"พระโขนง",line:"bts_green",idx:32},{id:"on_nut",name:"อ่อนนุช",line:"bts_green",idx:33},{id:"bang_chak",name:"บางจาก",line:"bts_green",idx:34},{id:"udom_suk",name:"อุดมสุข",line:"bts_green",idx:36},{id:"bang_na",name:"บางนา",line:"bts_green",idx:37},{id:"bearing",name:"แบริ่ง",line:"bts_green",idx:38},{id:"samrong_bts",name:"สำโรง (BTS)",line:"bts_green",idx:39},{id:"kheha",name:"เคหะฯ",line:"bts_green",idx:47},{id:"nat_stadium",name:"สนามกีฬาแห่งชาติ",line:"bts_silom",idx:0},{id:"siam_l",name:"สยาม (สายสีลม)",line:"bts_silom",idx:1},{id:"sala_daeng",name:"ศาลาแดง",line:"bts_silom",idx:3},{id:"chong_nonsi",name:"ช่องนนทรี",line:"bts_silom",idx:4},{id:"saphan_taksin",name:"สะพานตากสิน",line:"bts_silom",idx:7},{id:"wongwian_yai",name:"วงเวียนใหญ่",line:"bts_silom",idx:9},{id:"bang_wa",name:"บางหว้า",line:"bts_silom",idx:13},{id:"tha_phra",name:"ท่าพระ",line:"mrt_blue",idx:0},{id:"tao_poon",name:"เตาปูน",line:"mrt_blue",idx:9},{id:"bang_sue",name:"บางซื่อ",line:"mrt_blue",idx:10},{id:"chatuchak",name:"สวนจตุจักร",line:"mrt_blue",idx:12},{id:"phahon_mrt",name:"พหลโยธิน (MRT)",line:"mrt_blue",idx:13},{id:"lat_phrao_mrt",name:"ลาดพร้าว (MRT)",line:"mrt_blue",idx:14},{id:"ratchadaphisek",name:"รัชดาภิเษก",line:"mrt_blue",idx:15},{id:"huai_khwang",name:"ห้วยขวาง",line:"mrt_blue",idx:17},{id:"rama9",name:"พระราม 9",line:"mrt_blue",idx:19},{id:"phetchaburi",name:"เพชรบุรี",line:"mrt_blue",idx:20},{id:"sukhumvit_mrt",name:"สุขุมวิท (MRT)",line:"mrt_blue",idx:21},{id:"silom_mrt",name:"สีลม (MRT)",line:"mrt_blue",idx:25},{id:"hua_lamphong",name:"หัวลำโพง",line:"mrt_blue",idx:27},{id:"bang_wa_mrt",name:"บางหว้า (MRT)",line:"mrt_blue",idx:34},{id:"lak_song",name:"หลักสอง",line:"mrt_blue",idx:38},{id:"tao_poon_p",name:"เตาปูน (สายสีม่วง)",line:"mrt_purple",idx:14},{id:"wong_sawang",name:"วงศ์สว่าง",line:"mrt_purple",idx:12},{id:"nonthaburi_cc",name:"ศูนย์ราชการนนทบุรี",line:"mrt_purple",idx:9},{id:"bang_son",name:"บางซ่อน",line:"mrt_purple",idx:13},{id:"klang_bang_phai",name:"คลองบางไผ่",line:"mrt_purple",idx:0},{id:"lat_phrao_y",name:"ลาดพร้าว (สายสีเหลือง)",line:"mrt_yellow",idx:0},{id:"chokchai4",name:"โชคชัย 4",line:"mrt_yellow",idx:2},{id:"phatthanakan",name:"พัฒนาการ",line:"mrt_yellow",idx:13},{id:"si_nut",name:"สี่แยกอ่อนนุช",line:"mrt_yellow",idx:15},{id:"on_nut_y",name:"อ่อนนุช (สายสีเหลือง)",line:"mrt_yellow",idx:16},{id:"samrong_y",name:"สำโรง (สายสีเหลือง)",line:"mrt_yellow",idx:18},{id:"phaya_thai_arl",name:"พญาไท (ARL)",line:"arl",idx:0},{id:"ratchaprarop",name:"ราชปรารภ",line:"arl",idx:1},{id:"makkasan",name:"มักกะสัน",line:"arl",idx:2},{id:"ramkhamhaeng",name:"รามคำแหง",line:"arl",idx:3},{id:"hua_mak",name:"หัวหมาก",line:"arl",idx:4},{id:"lat_krabang",name:"ลาดกระบัง",line:"arl",idx:5},{id:"suvarnabhumi",name:"สุวรรณภูมิ",line:"arl",idx:6}],rt={};j.forEach(r=>{rt[r.id]=r});function lt(r,t,e,i="adult"){const n=ot[r];if(!n)return{fare:0,stationsCount:0,duration:0};const a=Math.abs(t-e);if(a===0)return{fare:0,stationsCount:0,duration:0};const s=Math.min(n.fareBase+a*n.farePerSt,n.fareMax);return{fare:Math.round(s*(n.pax[i]||1)),stationsCount:a,duration:Math.round(a*n.timePerSt)}}function dt(r){const t=new Date,e=t.getHours(),i=t.getMinutes(),n=e*60+i,a={bts_green:{first:5*60+30,last:24*60+0,peakFreq:3,offFreq:7},bts_silom:{first:5*60+30,last:24*60+0,peakFreq:3,offFreq:7},mrt_blue:{first:5*60+30,last:24*60+0,peakFreq:4,offFreq:8},mrt_purple:{first:5*60+30,last:23*60+59,peakFreq:5,offFreq:10},mrt_yellow:{first:5*60+30,last:23*60+30,peakFreq:4,offFreq:8},arl:{first:6*60+0,last:24*60+0,peakFreq:10,offFreq:15}},s=a[r]||a.bts_green,o=e>=7&&e<9||e>=17&&e<20,l=o?s.peakFreq:s.offFreq;let c=n;if(n<s.first)c=s.first;else if(n>=s.last)c=s.first+24*60;else{const m=(n-s.first)%l;c=n+(m===0?0:l-m)}const d=c-n,h=m=>{const p=Math.floor(m%1440/60),v=m%60;return`${String(p).padStart(2,"0")}:${String(v).padStart(2,"0")} น.`};return{firstTrain:h(s.first),lastTrain:h(s.last),frequencyPeak:`${s.peakFreq}-${s.peakFreq+1} นาที/ขบวน`,frequencyOffPeak:`${s.offFreq}-${s.offFreq+1} นาที/ขบวน`,nextTrain:h(c),waitMinutes:d,isPeak:o,currentFreq:l}}const N=(()=>{const r={};return j.forEach(t=>{(r[t.line]=r[t.line]||[]).push({name:t.name,index:t.idx})}),Object.values(r).forEach(t=>t.sort((e,i)=>e.index-i.index)),r})();function ct(r,t,e){const i=[{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่จตุจักร/หมอชิต",kw:["หมอชิต","จตุจักร"]},{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่สุขุมวิท/อโศก",kw:["อโศก","สุขุมวิท"]},{text:"เชื่อมต่อ MRT สีน้ำเงิน ที่สีลม/ศาลาแดง",kw:["ศาลาแดง","สีลม"]},{text:"เชื่อมต่อ Airport Rail Link ที่พญาไท",kw:["พญาไท"]},{text:"เชื่อมต่อ MRT สีม่วง ที่เตาปูน",kw:["เตาปูน"]},{text:"เชื่อมต่อ MRT สีเหลือง ที่ลาดพร้าว",kw:["ลาดพร้าว"]},{text:"เชื่อมต่อ MRT สีเหลือง/BTS ที่สำโรง",kw:["สำโรง"]}];for(const n of i)if(n.kw.some(a=>t.includes(a)||e.includes(a)))return`💡 ${n.text}`;return null}function K(){try{return JSON.parse(localStorage.getItem("commuter_fav_routes")||"[]")}catch{return[]}}function mt(r,t,e,i,n,a,s){const o=K();return o.push({id:Date.now(),name:r,start:{lat:t,lng:e,name:a},end:{lat:i,lng:n,name:s}}),localStorage.setItem("commuter_fav_routes",JSON.stringify(o)),o}function ut(r){const t=K().filter(e=>e.id!==r);return localStorage.setItem("commuter_fav_routes",JSON.stringify(t)),t}function pt(r,t,e,i){const a=$(e-r),s=$(i-t),o=Math.sin(a/2)*Math.sin(a/2)+Math.cos($(r))*Math.cos($(e))*Math.sin(s/2)*Math.sin(s/2);return 6371*(2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o)))}function $(r){return r*(Math.PI/180)}const w={bts_sukhumvit:{name:"BTS สายสุขุมวิท",shortName:"BTS Sukhumvit",color:"#22c55e",textColor:"#fff",avgSpeedKmh:35,type:"elevated",stations:[{id:"N24",name:"Khu Khot",nameTH:"คูคต",lat:13.9518,lon:100.6086},{id:"N23",name:"Lam Luk Ka Khlong 1",nameTH:"ลำลูกกา คลอง 1",lat:13.9358,lon:100.6098},{id:"N22",name:"Pho Kaeo",nameTH:"โพธิ์แก้ว",lat:13.9202,lon:100.606},{id:"N21",name:"Saphan Mai",nameTH:"สะพานใหม่",lat:13.905,lon:100.5987},{id:"N20",name:"Wat Phra Si Mahathat",nameTH:"วัดพระศรีมหาธาตุ",lat:13.8954,lon:100.5969},{id:"N19",name:"Krom Luang Chumphon",nameTH:"กรมทหารราบที่ 11",lat:13.8824,lon:100.5938},{id:"N18",name:"Kasetsart University",nameTH:"ม.เกษตรศาสตร์",lat:13.8716,lon:100.5934},{id:"N17",name:"Ha Yaek Lat Phrao",nameTH:"ห้าแยกลาดพร้าว",lat:13.8199,lon:100.5629},{id:"N16",name:"Phahon Yothin 59",nameTH:"พหลโยธิน 59",lat:13.8135,lon:100.5576},{id:"N15",name:"Talat Yot Charoen",nameTH:"ตลาดยิ่งเจริญ",lat:13.8059,lon:100.5538},{id:"N14",name:"Mit Samphan",nameTH:"มิตรสัมพันธ์",lat:13.7987,lon:100.5503},{id:"N13",name:"Saphan Khwai",nameTH:"สะพานควาย",lat:13.7921,lon:100.5476},{id:"N12",name:"Ari",nameTH:"อารีย์",lat:13.7843,lon:100.544},{id:"N11",name:"Sanam Pao",nameTH:"สนามเป้า",lat:13.7762,lon:100.5406},{id:"N10",name:"Victory Monument",nameTH:"อนุสาวรีย์ชัยสมรภูมิ",lat:13.7636,lon:100.5365},{id:"CEN",name:"Siam",nameTH:"สยาม",lat:13.7457,lon:100.5331,isInterchange:!0},{id:"E1",name:"Chit Lom",nameTH:"ชิดลม",lat:13.744,lon:100.5408},{id:"E2",name:"Phloenchit",nameTH:"เพลินจิต",lat:13.7426,lon:100.5465},{id:"E3",name:"Nana",nameTH:"นานา",lat:13.7411,lon:100.556},{id:"E4",name:"Asok",nameTH:"อโศก",lat:13.737,lon:100.5608,isInterchange:!0},{id:"E5",name:"Phrom Phong",nameTH:"พร้อมพงษ์",lat:13.7307,lon:100.5678},{id:"E6",name:"Thong Lo",nameTH:"ทองหล่อ",lat:13.7295,lon:100.5786},{id:"E7",name:"Ekkamai",nameTH:"เอกมัย",lat:13.7193,lon:100.5853},{id:"E8",name:"Phra Khanong",nameTH:"พระโขนง",lat:13.7098,lon:100.5998},{id:"E9",name:"On Nut",nameTH:"อ่อนนุช",lat:13.7012,lon:100.6094},{id:"E10",name:"Bang Chak",nameTH:"บางจาก",lat:13.6913,lon:100.6178},{id:"E11",name:"Punnawithi",nameTH:"ปุณณวิถี",lat:13.6849,lon:100.6264},{id:"E12",name:"Udom Suk",nameTH:"อุดมสุข",lat:13.6825,lon:100.6385},{id:"E13",name:"Bang Na",nameTH:"บางนา",lat:13.6802,lon:100.652},{id:"E14",name:"Bearing",nameTH:"แบริ่ง",lat:13.6701,lon:100.6678},{id:"E15",name:"Samrong",nameTH:"สำโรง",lat:13.6594,lon:100.6832},{id:"E16",name:"Pu Chao",nameTH:"ปู่เจ้า",lat:13.6506,lon:100.6919},{id:"E17",name:"Chang Erawan",nameTH:"ช้างเอราวัณ",lat:13.6421,lon:100.7024},{id:"E18",name:"Royal Thai Naval Academy",nameTH:"โรงเรียนนายเรือ",lat:13.635,lon:100.711},{id:"E19",name:"Pak Nam",nameTH:"ปากน้ำ",lat:13.6277,lon:100.7184},{id:"E20",name:"Srinagarindra",nameTH:"ศรีนครินทร์",lat:13.6256,lon:100.7296},{id:"E21",name:"Phraek Sa",nameTH:"แพรกษา",lat:13.6201,lon:100.743},{id:"E22",name:"Sai Luat",nameTH:"สายลวด",lat:13.6183,lon:100.7557},{id:"E23",name:"Kheha Samut Prakan",nameTH:"เคหะสมุทรปราการ",lat:13.6136,lon:100.7652}]},bts_silom:{name:"BTS สายสีลม",shortName:"BTS Silom",color:"#16a34a",textColor:"#fff",avgSpeedKmh:33,type:"elevated",stations:[{id:"W4",name:"Bang Wa",nameTH:"บางหว้า",lat:13.7225,lon:100.4753},{id:"W3",name:"Phetkasem 48",nameTH:"เพชรเกษม 48",lat:13.7239,lon:100.4862},{id:"W2",name:"Phasi Charoen",nameTH:"ภาษีเจริญ",lat:13.7186,lon:100.4993},{id:"W1",name:"Wutthakat",nameTH:"วุฒากาศ",lat:13.7095,lon:100.5053},{id:"CEN",name:"Siam",nameTH:"สยาม",lat:13.7457,lon:100.5331,isInterchange:!0},{id:"S1",name:"Ratchadamri",nameTH:"ราชดำริ",lat:13.7405,lon:100.5283},{id:"S2",name:"Sala Daeng",nameTH:"ศาลาแดง",lat:13.727,lon:100.5293,isInterchange:!0},{id:"S3",name:"Chong Nonsi",nameTH:"ช่องนนทรี",lat:13.7198,lon:100.5249},{id:"S4",name:"Saint Louis",nameTH:"เซนต์หลุยส์",lat:13.7148,lon:100.5198},{id:"S5",name:"Surasak",nameTH:"สุรศักดิ์",lat:13.7118,lon:100.5134},{id:"S6",name:"Saphan Taksin",nameTH:"สะพานตากสิน",lat:13.7186,lon:100.5078},{id:"S7",name:"Krung Thon Buri",nameTH:"กรุงธนบุรี",lat:13.7225,lon:100.5013},{id:"S8",name:"Wongwian Yai",nameTH:"วงเวียนใหญ่",lat:13.7225,lon:100.4897},{id:"S9",name:"Pho Nimit",nameTH:"โพธิ์นิมิตร",lat:13.7204,lon:100.4811},{id:"S10",name:"Talat Phlu",nameTH:"ตลาดพลู",lat:13.7178,lon:100.4761}]},mrt_blue:{name:"MRT สายสีน้ำเงิน",shortName:"MRT Blue",color:"#3b82f6",textColor:"#fff",avgSpeedKmh:32,type:"underground",stations:[{id:"BL01",name:"Tha Phra",nameTH:"ท่าพระ",lat:13.7225,lon:100.4786},{id:"BL02",name:"Bang Phai",nameTH:"บางไผ่",lat:13.7295,lon:100.4694},{id:"BL03",name:"Bang Wa",nameTH:"บางหว้า",lat:13.7225,lon:100.4754,isInterchange:!0},{id:"BL04",name:"Phetkasem 48",nameTH:"เพชรเกษม 48",lat:13.7187,lon:100.4838},{id:"BL05",name:"Phasi Charoen",nameTH:"ภาษีเจริญ",lat:13.713,lon:100.4928},{id:"BL06",name:"Bang Khae",nameTH:"บางแค",lat:13.6987,lon:100.4986},{id:"BL07",name:"Lak Song",nameTH:"หลักสอง",lat:13.685,lon:100.5012},{id:"BL08",name:"Lat Phrao",nameTH:"ลาดพร้าว",lat:13.8191,lon:100.5662,isInterchange:!0},{id:"BL09",name:"Ratchadaphisek",nameTH:"รัชดาภิเษก",lat:13.8065,lon:100.5657},{id:"BL10",name:"Huai Khwang",nameTH:"ห้วยขวาง",lat:13.7873,lon:100.5724},{id:"BL11",name:"Cultural Centre",nameTH:"ศูนย์วัฒนธรรม",lat:13.7756,lon:100.5698},{id:"BL12",name:"Phetchaburi",nameTH:"เพชรบุรี",lat:13.7512,lon:100.5636},{id:"BL13",name:"Sukhumvit",nameTH:"สุขุมวิท",lat:13.737,lon:100.5608,isInterchange:!0},{id:"BL14",name:"Queen Sirikit",nameTH:"ศูนย์ฯ สิริกิติ์",lat:13.7219,lon:100.562},{id:"BL15",name:"Khlong Toei",nameTH:"คลองเตย",lat:13.7224,lon:100.557},{id:"BL16",name:"Lumphini",nameTH:"ลุมพินี",lat:13.7262,lon:100.5408},{id:"BL17",name:"Silom",nameTH:"สีลม",lat:13.7254,lon:100.528,isInterchange:!0},{id:"BL18",name:"Sam Yan",nameTH:"สามย่าน",lat:13.7318,lon:100.5294},{id:"BL19",name:"Hua Lamphong",nameTH:"หัวลำโพง",lat:13.738,lon:100.5151},{id:"BL20",name:"Wat Mangkon",nameTH:"วัดมังกร",lat:13.7413,lon:100.5083},{id:"BL21",name:"Sam Yot",nameTH:"สามยอด",lat:13.7463,lon:100.5025},{id:"BL22",name:"Sanam Chai",nameTH:"สนามไชย",lat:13.7448,lon:100.4963},{id:"BL23",name:"Itsaraphap",nameTH:"อิสรภาพ",lat:13.7356,lon:100.4851}]},mrt_yellow:{name:"MRT สายสีเหลือง",shortName:"MRT Yellow",color:"#eab308",textColor:"#000",avgSpeedKmh:36,type:"elevated",stations:[{id:"YL01",name:"Lat Phrao",nameTH:"ลาดพร้าว",lat:13.8191,lon:100.5662,isInterchange:!0},{id:"YL02",name:"Phawana",nameTH:"ภาวนา",lat:13.8084,lon:100.5795},{id:"YL03",name:"Chokchai 4",nameTH:"โชคชัย 4",lat:13.7974,lon:100.5901},{id:"YL04",name:"Lat Phrao 71",nameTH:"ลาดพร้าว 71",lat:13.7885,lon:100.5964},{id:"YL05",name:"Lat Phrao 83",nameTH:"ลาดพร้าว 83",lat:13.7841,lon:100.6012},{id:"YL06",name:"Mahadthai",nameTH:"มหาดไทย",lat:13.7769,lon:100.6083},{id:"YL07",name:"Lat Phrao 101",nameTH:"ลาดพร้าว 101",lat:13.7695,lon:100.6152},{id:"YL08",name:"Bang Kapi",nameTH:"บางกะปิ",lat:13.762,lon:100.6218},{id:"YL09",name:"Yaek Lam Sali",nameTH:"แยกลำสาลี",lat:13.7548,lon:100.6272},{id:"YL10",name:"Si Kritha",nameTH:"ศรีกรีฑา",lat:13.7451,lon:100.6401},{id:"YL11",name:"Hua Mak",nameTH:"หัวหมาก",lat:13.738,lon:100.6488,isInterchange:!0},{id:"YL12",name:"Lam Sali",nameTH:"ลำสaลี",lat:13.7286,lon:100.6543},{id:"YL13",name:"Si Nut",nameTH:"ศรีนุช",lat:13.7203,lon:100.6618},{id:"YL14",name:"Chaloem Phrakiat R.9",nameTH:"เฉลิมพระเกียรติ ร.9",lat:13.7095,lon:100.6721},{id:"YL15",name:"Suan Luang R.9",nameTH:"สวนหลวง ร.9",lat:13.7001,lon:100.6812},{id:"YL16",name:"Phatthana Kan",nameTH:"พัฒนาการ",lat:13.6928,lon:100.6892},{id:"YL17",name:"Srinagarindra 38",nameTH:"ศรีนครินทร์ 38",lat:13.6852,lon:100.6977},{id:"YL18",name:"Srinagarindra",nameTH:"ศรีนครินทร์",lat:13.6782,lon:100.7052},{id:"YL19",name:"Si Dan",nameTH:"ศรีด่าน",lat:13.6708,lon:100.7138},{id:"YL20",name:"Bearing",nameTH:"แบริ่ง",lat:13.6658,lon:100.7205,isInterchange:!0},{id:"YL21",name:"Samrong",nameTH:"สำโรง",lat:13.6579,lon:100.7287,isInterchange:!0},{id:"YL22",name:"Thiphawan",nameTH:"ทิพวัล",lat:13.6471,lon:100.7404},{id:"YL23",name:"Si Iam",nameTH:"ศรีเอี่ยม",lat:13.6391,lon:100.7491},{id:"YL24",name:"Thepharak",nameTH:"เทพารักษ์",lat:13.6289,lon:100.7578},{id:"YL25",name:"Samrong South",nameTH:"สำโรง (ใต้)",lat:13.6211,lon:100.7651}]},arl:{name:"Airport Rail Link",shortName:"ARL",color:"#e11d48",textColor:"#fff",avgSpeedKmh:90,type:"elevated",stations:[{id:"A1",name:"Phaya Thai",nameTH:"พญาไท",lat:13.7646,lon:100.534,isInterchange:!0},{id:"A2",name:"Ratchaprarop",nameTH:"ราชปรารภ",lat:13.76,lon:100.5481},{id:"A3",name:"Makkasan",nameTH:"มักกะสัน",lat:13.7539,lon:100.5614},{id:"A4",name:"Ramkhamhaeng",nameTH:"รามคำแหง",lat:13.7511,lon:100.6017},{id:"A5",name:"Hua Mak",nameTH:"หัวหมาก",lat:13.7417,lon:100.6397},{id:"A6",name:"Ban Thap Chang",nameTH:"บ้านทับช้าง",lat:13.7322,lon:100.6786},{id:"A7",name:"Lat Krabang",nameTH:"ลาดกระบัง",lat:13.7258,lon:100.715},{id:"A8",name:"Suvarnabhumi",nameTH:"สุวรรณภูมิ",lat:13.6921,lon:100.7467}]}};function G(r,t,e,i){const a=(e-r)*Math.PI/180,s=(i-t)*Math.PI/180,o=Math.sin(a/2)**2+Math.cos(r*Math.PI/180)*Math.cos(e*Math.PI/180)*Math.sin(s/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))}class ht{constructor(t=3){this.lat=null,this.lon=null,this.variance=-1,this._lastTs=null,this._Q=t}process(t,e,i,n){if(i<1&&(i=1),this.variance<0)this.lat=t,this.lon=e,this.variance=i*i,this._lastTs=n;else{const s=(n&&this._lastTs?Math.max((n-this._lastTs)/1e3,0):1)*this._Q*this._Q;this.variance+=s;const o=this.variance/(this.variance+i*i);this.lat+=o*(t-this.lat),this.lon+=o*(e-this.lon),this.variance*=1-o,this._lastTs=n}return{lat:this.lat,lon:this.lon}}reset(){this.lat=null,this.lon=null,this.variance=-1,this._lastTs=null}}function gt(r){if(r.length<2)return 0;const t=r.slice(-5);let e=0,i=0;for(let n=1;n<t.length;n++)e+=G(t[n-1].lat,t[n-1].lon,t[n].lat,t[n].lon),i+=(t[n].ts-t[n-1].ts)/1e3;return i<=0?0:e/i*3.6}function vt(r,t){const e=gt(r),i=e>=8&&e<=110,n=e>=2&&e<8,a=e<2;let s="unknown";a?s="stationary":n?s="walking":i?s="on_train":e>110&&(s="vehicle_other");let o=0;if(t&&t.length>0){const l=t.slice(-10),c=yt(l.map(d=>Math.sqrt(d.x**2+d.y**2+d.z**2)));c>.5&&c<8&&(o=.8)}return{speedKmh:Math.round(e*10)/10,isOnTrain:i,isWalking:n,isStationary:a,activity:s,accelConfidence:o}}function yt(r){if(!r.length)return 0;const t=r.reduce((e,i)=>e+i,0)/r.length;return r.reduce((e,i)=>e+(i-t)**2,0)/r.length}function ft(r,t,e){const i=w[e];if(!i)return null;let n=null,a=1/0;return i.stations.forEach((s,o)=>{const l=G(r,t,s.lat,s.lon);l<a&&(a=l,n={...s,lineKey:e,idx:o,distance:l})}),n}function xt(r,t,e=500){let i=null,n=1/0;return Object.keys(w).forEach(a=>{const s=ft(r,t,a);s&&s.distance<n&&s.distance<e&&(n=s.distance,i=s)}),i}function bt(r,t,e){if(!r||!t||r.id===t.id)return null;const i=w[e];if(!i)return null;const n=i.stations.findIndex(s=>s.id===r.id),a=i.stations.findIndex(s=>s.id===t.id);return n<0||a<0?null:a>n?"forward":"backward"}function St(r,t,e,i){const n=w[e];if(!n||r===t)return{stationsRemaining:0,distanceKm:0,etaMinutes:0};const a=n.stations,s=t>r?1:-1;let o=0;const l=Math.abs(t-r);for(let p=r;p!==t;p+=s){const v=a[p],u=a[p+s];if(!v||!u)break;o+=G(v.lat,v.lon,u.lat,u.lon)/1e3}const c=i>=15&&i<=110?i:n.avgSpeedKmh,d=o/c*60,h=(l-1)*.5,m=Math.max(1,Math.round(d+h));return{stationsRemaining:l,distanceKm:Math.round(o*10)/10,etaMinutes:m}}class Tt{constructor(t){this.onUpdate=t,this.watchId=null,this._pollInterval=null,this._accelInterval=null,this.kalman=new ht(3),this.positions=[],this.accelerometerData=[],this.currentStation=null,this.prevStation=null,this.lineKey=null,this.direction=null,this.routeLocked=!1,this.stationHistory=[],this.destStationIdx=null,this.destLineKey=null,this.isTracking=!1,this.lastKnownState=null,this.GEOFENCE_RADIUS_M=200,this._alertedStationsLeft=new Set,this._motionState=null,this._undergroundMode=!1,this._lastGoodGPS=null}setDestination(t,e){this.destLineKey=t,this.destStationIdx=parseInt(e),this._alertedStationsLeft.clear(),this._emitCurrent()}start(){if(!this.isTracking){if(!navigator.geolocation){this._emitError("GPS ไม่รองรับบนอุปกรณ์นี้");return}this.isTracking=!0,this.kalman.reset(),this.positions=[],this.stationHistory=[],this.routeLocked=!1,this.direction=null,this.currentStation=null,this.prevStation=null,this._alertedStationsLeft.clear(),this._undergroundMode=!1,"Notification"in window&&Notification.permission==="default"&&Notification.requestPermission(),this.watchId=navigator.geolocation.watchPosition(t=>this._onGPS(t),t=>this._handleGPSError(t),{enableHighAccuracy:!0,timeout:15e3,maximumAge:2e3}),this._pollInterval=setInterval(()=>{navigator.geolocation.getCurrentPosition(t=>this._onGPS(t),()=>{},{enableHighAccuracy:!0,timeout:6e3,maximumAge:3e3})},3e3),this._startAccelerometer()}}stop(){this.watchId!==null&&(navigator.geolocation.clearWatch(this.watchId),this.watchId=null),this._pollInterval&&(clearInterval(this._pollInterval),this._pollInterval=null),this._accelInterval&&(clearInterval(this._accelInterval),this._accelInterval=null),window.removeEventListener("devicemotion",this._onDeviceMotion),this.isTracking=!1}_startAccelerometer(){"DeviceMotionEvent"in window&&(this._onDeviceMotion=t=>{const e=t.accelerationIncludingGravity;e&&(this.accelerometerData.push({x:e.x||0,y:e.y||0,z:e.z||0,ts:Date.now()}),this.accelerometerData.length>20&&this.accelerometerData.shift())},window.addEventListener("devicemotion",this._onDeviceMotion,{passive:!0}))}_onGPS(t){const e={lat:t.coords.latitude,lon:t.coords.longitude,acc:t.coords.accuracy,ts:t.timestamp||Date.now()};if(!(e.acc>80))this._lastGoodGPS=e,this._undergroundMode=!1;else if(this._undergroundMode=!0,this._lastGoodGPS){this._emitWithExtra({warning:`GPS อ่อน ±${Math.round(e.acc)}m (ใต้ดิน/อาคาร)`,gpsAccuracy:e.acc});return}const n=this.kalman.process(e.lat,e.lon,e.acc,e.ts),a={lat:n.lat,lon:n.lon,acc:e.acc,ts:e.ts};this.positions.push(a),this.positions.length>20&&this.positions.shift(),this._processPosition(a,e.acc)}_processPosition(t,e){const i=xt(t.lat,t.lon,400),n=vt(this.positions,this.accelerometerData);if(this._motionState=n,i&&i.distance<this.GEOFENCE_RADIUS_M&&(!this.currentStation||this.currentStation.id!==i.id)){if(this.prevStation=this.currentStation,this.currentStation=i,this.stationHistory.push({...i,arrivedAt:Date.now()}),this.stationHistory.length>10&&this.stationHistory.shift(),this.stationHistory.length>=2){const s=this.stationHistory,o=s[s.length-2],l=s[s.length-1];o.lineKey===l.lineKey&&(this.lineKey=l.lineKey,this.direction=bt(o,l,this.lineKey),!this.routeLocked&&s.filter(c=>c.lineKey===this.lineKey).length>=3&&(this.routeLocked=!0))}this._checkArrivalAlert()}this._emitFull({motion:n,nearest:i,accuracy:e,warning:null})}_checkArrivalAlert(){if(this.destStationIdx===null||!this.destLineKey||!this.currentStation||this.currentStation.lineKey!==this.destLineKey)return;const t=Math.abs(this.currentStation.idx-this.destStationIdx);t===1&&!this._alertedStationsLeft.has(1)?(this._alertedStationsLeft.add(1),this._triggerAlert("warning")):t===0&&!this._alertedStationsLeft.has(0)&&(this._alertedStationsLeft.add(0),this._triggerAlert("arrived"))}_triggerAlert(t){var n;const e=w[this.destLineKey],i=((n=e==null?void 0:e.stations[this.destStationIdx])==null?void 0:n.nameTH)||"ปลายทาง";if(navigator.vibrate&&(t==="warning"?navigator.vibrate([300,100,300,100,600]):navigator.vibrate([500,150,500,150,1e3])),Notification.permission==="granted"){const a=t==="warning"?"🚉 ใกล้ถึงปลายทางแล้ว!":"🎉 ถึงปลายทาง!",s=t==="warning"?`อีก 1 สถานีถึง ${i} — เตรียมตัวลงได้เลย`:`คุณถึง ${i} แล้ว`;try{new Notification(a,{body:s,icon:"/favicon.ico",badge:"/favicon.ico",tag:"train-alert-"+t,requireInteraction:t==="arrived"})}catch{}}window.dispatchEvent(new CustomEvent(t==="warning"?"trainArrivalWarning":"trainArrived",{detail:{destName:i,destLineKey:this.destLineKey,destStationIdx:this.destStationIdx}}))}_emitFull(t={}){var l,c,d,h,m;const e=this.lineKey?w[this.lineKey]:null,i=(e==null?void 0:e.stations)||[],n=((l=this.currentStation)==null?void 0:l.idx)??-1;let a=null;if(this.direction&&n>=0){const p=this.direction==="forward"?n+1:n-1;a=i[p]||null}let s=null;this.destStationIdx!==null&&n>=0&&this.destLineKey&&(s=St(n,this.destStationIdx,this.destLineKey,((c=t.motion)==null?void 0:c.speedKmh)||0));const o={isTracking:this.isTracking,currentStation:this.currentStation,nextStation:a,prevStation:this.prevStation,lineKey:this.lineKey,lineName:(e==null?void 0:e.name)||null,lineColor:(e==null?void 0:e.color)||null,lineType:(e==null?void 0:e.type)||null,direction:this.direction,routeLocked:this.routeLocked,destStationIdx:this.destStationIdx,destLineKey:this.destLineKey,eta:s,speedKmh:((d=t.motion)==null?void 0:d.speedKmh)||0,activity:((h=t.motion)==null?void 0:h.activity)||"unknown",isOnTrain:((m=t.motion)==null?void 0:m.isOnTrain)||!1,nearestStation:t.nearest||null,gpsAccuracy:t.accuracy||null,undergroundMode:this._undergroundMode,warning:t.warning||null,stationHistory:[...this.stationHistory]};this.lastKnownState=o,typeof this.onUpdate=="function"&&this.onUpdate(o)}_emitWithExtra(t){if(this.lastKnownState){const e={...this.lastKnownState,...t};typeof this.onUpdate=="function"&&this.onUpdate(e)}}_emitCurrent(){this.lastKnownState&&this._emitFull({motion:{speedKmh:this.lastKnownState.speedKmh,activity:this.lastKnownState.activity,isOnTrain:this.lastKnownState.isOnTrain}})}_emitError(t){typeof this.onUpdate=="function"&&this.onUpdate({isTracking:!1,error:t})}_handleGPSError(t){const i={1:"ไม่ได้รับอนุญาต GPS — กรุณาเปิดสิทธิ์ Location ใน Browser",2:"หา GPS ไม่ได้ (สัญญาณอ่อน/ใต้ดิน)",3:"GPS หมดเวลา — กำลังลองใหม่..."}[t.code]||"GPS Error";t.code!==3?this._emitError(i):this._emitWithExtra({warning:i})}}class wt{constructor(t,e){this.container=document.getElementById(t),this.state=e,this.tracker=null,this.trackerState=null,this.alertShown=!1,this.selectedLine="bts_sukhumvit",this.selectedDestIdx=null,this._simInterval=null,this._simStationIdx=0,this._simRunning=!1}init(){this.container&&(this._renderUI(),this._setupEvents(),window.addEventListener("trainArrivalWarning",t=>this._showArrivalPopup(t.detail)),window.addEventListener("trainArrived",t=>this._showArrivedPopup(t.detail)))}_renderUI(){this.container.innerHTML=`
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

        <!-- Simulate Start Station -->
        <div id="ttSimRow" style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
          <div class="input-field-wrap" style="flex:1;">
            <label style="font-size:0.65rem;">🧪 เริ่มจำลองจากสถานี</label>
            <select id="ttSimStartSelect" style="font-size:0.75rem;"></select>
          </div>
          <button id="ttSimBtn" class="btn" style="font-size:0.7rem;padding:6px 10px;margin-top:14px;background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.35);color:#c084fc;white-space:nowrap;">
            🧪 ทดสอบ
          </button>
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

          <!-- Simulate Progress Bar -->
          <div id="ttSimBar" style="display:none;margin-bottom:10px;">
            <div style="font-size:0.62rem;color:#c084fc;margin-bottom:4px;">🧪 โหมดจำลอง — รถไฟกำลังวิ่ง...</div>
            <div style="background:rgba(255,255,255,0.06);border-radius:4px;height:6px;overflow:hidden;">
              <div id="ttSimBarFill" style="height:100%;background:linear-gradient(90deg,#a855f7,#c084fc);width:0%;transition:width 1s;border-radius:4px;"></div>
            </div>
            <div id="ttSimStepLabel" style="font-size:0.6rem;color:var(--muted);margin-top:3px;"></div>
          </div>

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
          <span style="font-size:0.65rem;color:var(--muted2);">หรือกด 🧪 ทดสอบ เพื่อจำลองรถไฟวิ่งโดยไม่ต้องใช้ GPS จริง</span>
        </div>

        <!-- Arrival Alert Popup -->
        <div id="ttAlertPopup" style="display:none;position:absolute;inset:0;background:rgba(0,0,0,0.85);z-index:100;align-items:center;justify-content:center;border-radius:inherit;flex-direction:column;gap:12px;">
          <div style="font-size:2rem;">🚉</div>
          <div id="ttAlertTitle" style="font-size:1.1rem;font-weight:700;color:var(--yellow);text-align:center;"></div>
          <div id="ttAlertBody" style="font-size:0.8rem;color:var(--text);text-align:center;white-space:pre-line;"></div>
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
        .tt-badge.purple { background:rgba(168,85,247,0.12);border-color:rgba(168,85,247,0.3);color:#c084fc; }
        .tt-station-dot { width:10px;height:10px;border-radius:50%;border:2px solid;flex-shrink:0; }
        .tt-strip-wrap { display:flex;align-items:center;gap:0;min-width:max-content; }
        .tt-strip-segment { width:24px;height:3px;background:var(--border); }
        .tt-strip-label { font-size:0.55rem;color:var(--muted);margin-top:3px;max-width:48px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
        .tt-strip-item { display:flex;flex-direction:column;align-items:center; }
      </style>
    `,lucide.createIcons(),this._populateDestinations(),this._populateSimStart()}_populateDestinations(){const t=document.getElementById("ttDestSelect");if(!t)return;const e=w[this.selectedLine];e&&(t.innerHTML=e.stations.map((i,n)=>`<option value="${n}">${i.nameTH||i.name}</option>`).join(""),t.selectedIndex=e.stations.length-1,this.selectedDestIdx=e.stations.length-1)}_populateSimStart(){const t=document.getElementById("ttSimStartSelect");if(!t)return;const e=w[this.selectedLine];e&&(t.innerHTML=e.stations.map((i,n)=>`<option value="${n}">${i.nameTH||i.name}</option>`).join(""),t.selectedIndex=0)}_setupEvents(){var t,e,i,n,a;(t=document.getElementById("ttLineSelect"))==null||t.addEventListener("change",s=>{if(this.selectedLine=s.target.value,this._populateDestinations(),this._populateSimStart(),this.tracker){const o=document.getElementById("ttDestSelect");this.tracker.setDestination(this.selectedLine,parseInt((o==null?void 0:o.value)||0))}}),(e=document.getElementById("ttDestSelect"))==null||e.addEventListener("change",s=>{this.selectedDestIdx=parseInt(s.target.value),this.tracker&&this.tracker.setDestination(this.selectedLine,this.selectedDestIdx)}),(i=document.getElementById("ttStartBtn"))==null||i.addEventListener("click",()=>{!this.tracker||!this.tracker.isTracking?this._startTracking():this._stopTracking()}),(n=document.getElementById("ttSimBtn"))==null||n.addEventListener("click",()=>{this._simRunning?this._stopSimulate():this._startSimulate()}),(a=document.getElementById("ttAlertDismiss"))==null||a.addEventListener("click",()=>{const s=document.getElementById("ttAlertPopup");s&&(s.style.display="none")})}_startSimulate(){if(this._simRunning)return;this._stopTracking();const t=w[this.selectedLine];if(!t)return;const e=document.getElementById("ttDestSelect"),i=document.getElementById("ttSimStartSelect");this.selectedDestIdx=parseInt((e==null?void 0:e.value)??t.stations.length-1);let n=parseInt((i==null?void 0:i.value)??0);const a=n<=this.selectedDestIdx,s=a?1:-1;this._simRunning=!0,this._simStationIdx=n;const o=document.getElementById("ttSimBtn");o&&(o.textContent="⏹ หยุดจำลอง",o.style.background="rgba(239,68,68,0.15)",o.style.color="#f87171"),document.getElementById("ttIdleState").style.display="none",document.getElementById("ttStatusPanel").style.display="block",document.getElementById("ttSimBar").style.display="block",this._setGpsSignal("good","GPS จำลอง ±5m");const l=Math.abs(this.selectedDestIdx-n)+1,c=()=>{var _,I;if(!this._simRunning)return;const d=t.stations[this._simStationIdx];if(!d){this._stopSimulate();return}const h=()=>(Math.random()-.5)*2e-4;d.lat+h(),d.lon+h();const m=this._simStationIdx,p=m+s,v=t.stations[p]||null,u=Math.abs(this.selectedDestIdx-m),g=u>0?Math.round(u*1.2*10)/10:0,y=Math.max(1,Math.round(u*1.8)),x={isTracking:!0,currentStation:{...d,lineKey:this.selectedLine,idx:m},nextStation:v?{...v,lineKey:this.selectedLine,idx:p}:null,prevStation:this._simStationIdx!==n?{...t.stations[m-s],lineKey:this.selectedLine,idx:m-s}:null,lineKey:this.selectedLine,lineName:t.name,lineColor:t.color,lineType:t.type,direction:a?"forward":"backward",routeLocked:Math.abs(m-n)>=2,destStationIdx:this.selectedDestIdx,destLineKey:this.selectedLine,eta:{stationsRemaining:u,distanceKm:g,etaMinutes:y},speedKmh:32+Math.round(Math.random()*8),activity:"on_train",isOnTrain:!0,nearestStation:{...d,lineKey:this.selectedLine,idx:m,distance:15},gpsAccuracy:5,undergroundMode:!1,warning:null,stationHistory:[]},b=Math.abs(m-n),S=Math.round(b/Math.max(l-1,1)*100),T=document.getElementById("ttSimBarFill"),k=document.getElementById("ttSimStepLabel");if(T&&(T.style.width=S+"%"),k&&(k.textContent=`สถานีที่ ${b+1}/${l} — ${d.nameTH||d.name}`),u===1&&(window.dispatchEvent(new CustomEvent("trainArrivalWarning",{detail:{destName:(_=t.stations[this.selectedDestIdx])==null?void 0:_.nameTH}})),navigator.vibrate&&navigator.vibrate([300,100,300,100,600])),u===0){this._onTrackerUpdate(x),window.dispatchEvent(new CustomEvent("trainArrived",{detail:{destName:(I=t.stations[this.selectedDestIdx])==null?void 0:I.nameTH}})),navigator.vibrate&&navigator.vibrate([500,150,500,150,1e3]),this._stopSimulate();return}this._onTrackerUpdate(x),this._simStationIdx+=s,this._simInterval=setTimeout(c,2500)};c()}_stopSimulate(){clearTimeout(this._simInterval),this._simInterval=null,this._simRunning=!1;const t=document.getElementById("ttSimBtn");t&&(t.textContent="🧪 ทดสอบ",t.style.background="rgba(168,85,247,0.15)",t.style.color="#c084fc"),document.getElementById("ttSimBar").style.display="none"}_startTracking(){this._simRunning&&this._stopSimulate();const t=document.getElementById("ttStartBtn"),e=document.getElementById("ttDestSelect");this.selectedDestIdx=parseInt((e==null?void 0:e.value)||0),"Notification"in window&&Notification.permission==="default"&&Notification.requestPermission(),this.tracker=new Tt(i=>this._onTrackerUpdate(i)),this.tracker.setDestination(this.selectedLine,this.selectedDestIdx),this.tracker.start(),t&&(t.innerHTML='<i data-lucide="stop-circle" style="width:14px;height:14px;"></i><span>หยุดติดตาม</span>',t.style.background="rgba(239,68,68,0.15)",t.style.borderColor="rgba(239,68,68,0.3)",lucide.createIcons()),document.getElementById("ttIdleState").style.display="none",document.getElementById("ttStatusPanel").style.display="block",this._setGpsSignal("searching","กำลังหา GPS...")}_stopTracking(){this.tracker&&(this.tracker.stop(),this.tracker=null);const t=document.getElementById("ttStartBtn");t&&(t.innerHTML='<i data-lucide="navigation" style="width:14px;height:14px;"></i><span>เริ่มติดตาม</span>',t.style.background="",t.style.borderColor="",lucide.createIcons()),document.getElementById("ttStatusPanel").style.display="none",document.getElementById("ttIdleState").style.display="block",this._setGpsSignal("off","GPS ปิด")}_onTrackerUpdate(t){var l;if(this.trackerState=t,t.error){this._setGpsSignal("weak",t.error);const c=document.getElementById("ttWarning");c&&(c.textContent=t.error,c.style.display="block");return}const e=t.gpsAccuracy;this._simRunning||(e===null?this._setGpsSignal("searching","กำลังหา GPS..."):e>50?this._setGpsSignal("weak",`GPS ±${Math.round(e)}m (อ่อน)`):this._setGpsSignal("good",`GPS ±${Math.round(e)}m`));const i=t.currentStation;document.getElementById("ttCurrentStation").textContent=i?i.nameTH||i.name:t.nearestStation?`ใกล้ ${t.nearestStation.nameTH||t.nearestStation.name}`:"กำลังตรวจหาสถานี...",document.getElementById("ttCurrentLine").textContent=t.lineName||(t.nearestStation?(l=w[t.nearestStation.lineKey])==null?void 0:l.name:"")||"";const n=t.nextStation;document.getElementById("ttNextStation").textContent=n?n.nameTH||n.name:"--",document.getElementById("ttDirectionLabel").textContent=t.direction==="forward"?"→ ทิศทางปลายสาย":t.direction==="backward"?"← ทิศทางต้นสาย":"ยังไม่ทราบทิศทาง";const a=t.destLineKey?w[t.destLineKey]:null,s=a&&t.destStationIdx!==null?a.stations[t.destStationIdx]:null;document.getElementById("ttDestName").textContent=s?s.nameTH||s.name:"--",t.eta?(document.getElementById("ttStationsLeft").textContent=`เหลืออีก ${t.eta.stationsRemaining} สถานี · ${t.eta.distanceKm} กม.`,document.getElementById("ttETA").textContent=`${t.eta.etaMinutes} นาที`):(document.getElementById("ttStationsLeft").textContent="",document.getElementById("ttETA").textContent="--"),document.getElementById("ttSpeedLabel").textContent=t.speedKmh>0?`ความเร็ว ${t.speedKmh} กม./ชม.`:"",document.getElementById("ttOnTrainBadge").textContent=t.isOnTrain?"🚆 อยู่บนรถไฟ":"🚶 ยังไม่พบรถไฟ",document.getElementById("ttOnTrainBadge").className=`tt-badge ${t.isOnTrain?"green":"gray"}`,document.getElementById("ttRouteLock").textContent=t.routeLocked?"🔒 Route ล็อกแล้ว":"Route: ยังไม่ล็อก",document.getElementById("ttRouteLock").className=`tt-badge ${t.routeLocked?"cyan":"gray"}`,document.getElementById("ttGpsAccBadge").textContent=this._simRunning?"🧪 GPS จำลอง":e!==null?`GPS ±${Math.round(e)}m`:"GPS --",document.getElementById("ttGpsAccBadge").className=`tt-badge ${this._simRunning?"purple":e===null?"gray":e>50?"yellow":"green"}`;const o=document.getElementById("ttWarning");t.warning?(o.textContent="⚠ "+t.warning,o.style.display="block"):o.style.display="none",this._renderMapStrip(t)}_renderMapStrip(t){var p,v;const e=document.getElementById("ttMapStrip");if(!e)return;const i=t.lineKey||((p=t.nearestStation)==null?void 0:p.lineKey)||this.selectedLine,n=w[i];if(!n)return;const a=n.stations,s=((v=t.currentStation)==null?void 0:v.idx)??-1,o=t.destStationIdx!==null&&t.destLineKey===i?t.destStationIdx:-1,l=n.color,c=7;let d=Math.max(0,s-3),h=Math.min(a.length-1,d+c-1);h-d<c-1&&(d=Math.max(0,h-c+1));let m='<div class="tt-strip-wrap">';for(let u=d;u<=h;u++){const g=a[u],y=u===s,x=u===o,b=s>=0&&u<s,S=y?l:x?"#f59e0b":b?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.4)",T=b?"rgba(255,255,255,0.15)":l;u>d&&(m+=`<div class="tt-strip-segment" style="background:${T};"></div>`),m+=`
        <div class="tt-strip-item">
          <div class="tt-station-dot" style="border-color:${S};background:${y?S:"transparent"};${y?"box-shadow:0 0 8px "+S+";":""}${x?"box-shadow:0 0 6px #f59e0b;":""}"></div>
          <div class="tt-strip-label" style="color:${y?l:x?"#f59e0b":"var(--muted)"};">${g.nameTH||g.name}</div>
          ${y?'<div style="font-size:0.5rem;color:var(--cyan);">▲ คุณ</div>':""}
          ${x&&!y?'<div style="font-size:0.5rem;color:#f59e0b;">🏁</div>':""}
        </div>
      `}m+="</div>",e.innerHTML=m}_showArrivalPopup(t){var i,n;const e=this.selectedDestIdx!==null&&((n=(i=w[this.selectedLine])==null?void 0:i.stations[this.selectedDestIdx])==null?void 0:n.nameTH)||"ปลายทาง";this._showPopup("🚉 ใกล้ถึงแล้ว!",`อีก 1 สถานีจะถึง
${e}
เตรียมตัวลงได้เลย`)}_showArrivedPopup(t){var i,n;const e=this.selectedDestIdx!==null&&((n=(i=w[this.selectedLine])==null?void 0:i.stations[this.selectedDestIdx])==null?void 0:n.nameTH)||"ปลายทาง";this._showPopup("🎉 ถึงแล้ว!",`คุณถึงสถานี ${e} แล้ว`),this._stopTracking()}_showPopup(t,e){const i=document.getElementById("ttAlertPopup");i&&(document.getElementById("ttAlertTitle").textContent=t,document.getElementById("ttAlertBody").textContent=e,i.style.display="flex")}_setGpsSignal(t,e){const i=document.getElementById("ttGpsSignal"),n=document.getElementById("ttGpsLabel");i&&(i.className=`tt-signal-dot ${t}`),n&&(n.textContent=e)}}class _t{constructor(t,e,i){this.trafficContainer=document.getElementById(t),this.transitContainer=document.getElementById(e),this.state=i,this.map=null,this.tileLayer=null,this.routePolyline=null,this.startMarker=null,this.endMarker=null,this.routePoints={start:null,end:null},this.cctvIntervals=[],this.trainTrackerWidget=null}async init(){this.trafficContainer&&(this.renderTrafficTab(),this.initMap(),this.initCCTVs(),this.setupTrafficEvents()),this.renderTransitTab(),this.setupTransitEvents(),document.addEventListener("theme-changed",()=>this.updateMapTheme())}renderTrafficTab(){this.trafficContainer.innerHTML=`
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
    `,lucide.createIcons()}initMap(){const t=this.state.getCoords();this.map=L.map("trafficMap",{zoomControl:!1}).setView([t.lat,t.lon],13),L.control.zoom({position:"bottomright"}).addTo(this.map),this.updateMapTheme(),this.map.on("click",e=>this.handleMapClick(e))}updateMapTheme(){if(!this.map)return;this.tileLayer&&this.map.removeLayer(this.tileLayer);const e=document.body.classList.contains("light-theme")?"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png":"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";this.tileLayer=L.tileLayer(e,{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'}).addTo(this.map)}handleMapClick(t){const{lat:e,lng:i}=t.latlng;this.routePoints.start?this.routePoints.end?(this.resetRouting(),this.setRouteStart(e,i,`พิกัด: ${e.toFixed(4)}, ${i.toFixed(4)}`)):(this.setRouteEnd(e,i,`พิกัด: ${e.toFixed(4)}, ${i.toFixed(4)}`),this.calculateRoute()):this.setRouteStart(e,i,`พิกัด: ${e.toFixed(4)}, ${i.toFixed(4)}`)}setRouteStart(t,e,i){this.routePoints.start={lat:t,lng:e,name:i};const n=document.getElementById("routeStartText");n.innerText=i,n.classList.remove("empty"),this.startMarker&&this.map.removeLayer(this.startMarker),this.startMarker=L.marker([t,e],{icon:L.divIcon({className:"custom-map-marker-start",html:'<div style="width:14px;height:14px;background:var(--cyan);border:2px solid white;border-radius:50%;box-shadow:0 0 10px var(--cyan);"></div>',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(this.map)}setRouteEnd(t,e,i){this.routePoints.end={lat:t,lng:e,name:i};const n=document.getElementById("routeEndText");n.innerText=i,n.classList.remove("empty"),this.endMarker&&this.map.removeLayer(this.endMarker),this.endMarker=L.marker([t,e],{icon:L.divIcon({className:"custom-map-marker-end",html:'<div style="width:14px;height:14px;background:var(--red);border:2px solid white;border-radius:50%;box-shadow:0 0 10px var(--red);"></div>',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(this.map)}async calculateRoute(){if(!this.routePoints.start||!this.routePoints.end)return;const t=this.routePoints.start,e=this.routePoints.end,i=`https://router.project-osrm.org/route/v1/driving/${t.lng},${t.lat};${e.lng},${e.lat}?overview=full&geometries=geojson`;try{const a=await(await fetch(i)).json();if(a.routes&&a.routes.length>0){const s=a.routes[0],o=s.geometry.coordinates.map(u=>[u[1],u[0]]);this.routePolyline&&this.map.removeLayer(this.routePolyline),this.routePolyline=L.polyline(o,{color:"var(--cyan)",weight:5,opacity:.85,className:"glowing-polyline"}).addTo(this.map),this.map.fitBounds(this.routePolyline.getBounds(),{padding:[40,40]});const l=(s.distance/1e3).toFixed(1),c=Math.round(s.duration/60);document.getElementById("statDistance").innerText=`${l} กม.`;const d=new Date().getHours();let h=1,m="การจราจรไหลลื่น (ราบรื่น)",p="traffic-pill-green";d>=7&&d<=9||d>=17&&d<=19?(h=1.6,m="รถติดขัดหนาแน่น (วิกฤต)",p="traffic-pill-red"):(d>=12&&d<=14||d>=16&&d<17)&&(h=1.25,m="รถหนาแน่นปานกลาง (ระลอกตัว)",p="traffic-pill-yellow"),document.getElementById("statDuration").innerText=`${Math.round(c*h)} นาที`;const v=document.getElementById("statTrafficBadge");v.innerText=m,v.className=`traffic-status-pill ${p}`,document.getElementById("routeTravelStats").style.display="block"}else throw new Error("no route")}catch{this.routePolyline&&this.map.removeLayer(this.routePolyline),this.routePolyline=L.polyline([[t.lat,t.lng],[e.lat,e.lng]],{color:"var(--cyan)",weight:4,dashArray:"5, 10",opacity:.7}).addTo(this.map);const a=pt(t.lat,t.lng,e.lat,e.lng).toFixed(1);document.getElementById("statDistance").innerText=`${a} กม. (โดยตรง)`,document.getElementById("statDuration").innerText=`${Math.round(a*2.5)} นาที`;const s=document.getElementById("statTrafficBadge");s.innerText="การจราจรไม่พร้อมแสดง (Offline Mode)",s.className="traffic-status-pill traffic-pill-yellow",document.getElementById("routeTravelStats").style.display="block"}}resetRouting(){this.routePoints.start=null,this.routePoints.end=null;const t=document.getElementById("routeStartText");t.innerText="จุดเริ่มต้น (คลิกเลือกบนแผนที่)",t.classList.add("empty");const e=document.getElementById("routeEndText");e.innerText="จุดหมายปลายทาง (คลิกเลือกบนแผนที่)",e.classList.add("empty"),this.startMarker&&this.map.removeLayer(this.startMarker),this.endMarker&&this.map.removeLayer(this.endMarker),this.routePolyline&&this.map.removeLayer(this.routePolyline),this.startMarker=null,this.endMarker=null,this.routePolyline=null,document.getElementById("routeTravelStats").style.display="none"}setupTrafficEvents(){var t,e,i;(t=document.getElementById("btnResetRoute"))==null||t.addEventListener("click",()=>this.resetRouting()),(e=document.getElementById("btnUseMyLocation"))==null||e.addEventListener("click",()=>{const n=this.state.getCoords();this.setRouteStart(n.lat,n.lon,`ตำแหน่งของฉัน (${n.name})`),this.routePoints.end&&this.calculateRoute()}),(i=document.getElementById("btnSaveFavRoute"))==null||i.addEventListener("click",()=>{const n=document.getElementById("favRouteNameInput"),a=n.value.trim()||`เส้นทาง ${new Date().toLocaleDateString("th-TH")}`,s=this.routePoints.start,o=this.routePoints.end;s&&o&&(mt(a,s.lat,s.lng,o.lat,o.lng,s.name,o.name),n.value="",this.renderSavedRoutes(),this.showToast("บันทึกสำเร็จ",`บันทึกเส้นทาง "${a}" เรียบร้อยแล้ว`))}),this.renderSavedRoutes()}renderSavedRoutes(){const t=document.getElementById("savedRoutesList");if(!t)return;const e=K();if(e.length===0){t.innerHTML='<div style="text-align:center;color:var(--muted2);font-size:0.75rem;padding:12px 0;">ไม่มีเส้นทางที่บันทึกไว้</div>';return}t.innerHTML=e.map(i=>`
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
    `).join(""),lucide.createIcons(),t.querySelectorAll(".saved-route-trigger").forEach(i=>{i.addEventListener("click",()=>{const n=parseInt(i.dataset.id),a=e.find(s=>s.id===n);a&&(this.resetRouting(),this.setRouteStart(a.start.lat,a.start.lng,a.start.name),this.setRouteEnd(a.end.lat,a.end.lng,a.end.name),this.calculateRoute(),this.showToast("โหลดเส้นทาง",`แสดงเส้นทาง: ${a.name}`))})}),t.querySelectorAll(".route-del-btn").forEach(i=>{i.addEventListener("click",n=>{n.stopPropagation(),ut(parseInt(i.dataset.id)),this.renderSavedRoutes()})})}initCCTVs(){this.cctvIntervals.forEach(clearInterval),this.cctvIntervals=[],this.trainTrackerWidget=null;const t=e=>{const i=document.getElementById(e);if(!i)return;const n=i.getContext("2d");i.width=320,i.height=180;const a=Array.from({length:6},()=>({x:Math.random()*i.width,y:40+Math.random()*100,speed:1.5+Math.random()*2.5,color:["#00f2fe","#ffd740","#ff4d4d","#ffffff","#a855f7"][Math.floor(Math.random()*5)],size:5+Math.random()*8,dir:Math.random()>.5?1:-1})),s=()=>{n.fillStyle="#111827",n.fillRect(0,0,i.width,i.height),n.strokeStyle="rgba(255,255,255,0.08)",n.lineWidth=4,n.beginPath(),n.moveTo(0,90),n.lineTo(320,90),n.moveTo(160,0),n.lineTo(160,180),n.stroke(),n.strokeStyle="rgba(255,255,255,0.15)",n.lineWidth=1,n.setLineDash([8,8]),n.beginPath(),n.moveTo(0,65),n.lineTo(320,65),n.moveTo(0,115),n.lineTo(320,115),n.stroke(),n.setLineDash([]),a.forEach(o=>{o.x+=o.speed*o.dir,o.dir===1&&o.x>i.width+10&&(o.x=-10),o.dir===-1&&o.x<-10&&(o.x=i.width+10),n.fillStyle=o.color,n.beginPath(),n.roundRect(o.x,o.y,o.size*1.6,o.size,2),n.fill(),n.fillStyle=o.dir===1?"#ff4d4d":"#ffd740";const l=o.dir===1?o.x:o.x+o.size*1.6-2;n.fillRect(l,o.y+1,2,2),n.fillRect(l,o.y+o.size-3,2,2)}),n.fillStyle="rgba(0,242,254,0.03)";for(let o=0;o<i.height;o+=3)n.fillRect(0,o,i.width,1);Math.random()>.98&&(n.fillStyle="rgba(255,255,255,0.12)",n.fillRect(0,Math.random()*i.height,i.width,4)),n.fillStyle="#ffffff",n.font="7px monospace",n.fillText(new Date().toLocaleString("en-US"),200,172),n.fillStyle="var(--cyan)",n.fillText("REC ◉",15,172)};this.cctvIntervals.push(setInterval(s,1e3/24))};t("cctvAsoke"),t("cctvRama9"),t("cctvSathorn")}renderTransitTab(){this.transitContainer.innerHTML=`
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
    `,lucide.createIcons()}setupTransitEvents(){var p;if(!this.transitContainer)return;this.trainTrackerWidget=new wt("trainTrackerMount",this.state),this.trainTrackerWidget.init(),this.refreshTransitStatus(),(p=document.getElementById("btnRefreshTransitStatus"))==null||p.addEventListener("click",()=>{this.refreshTransitStatus(),this.showToast("อัพเดทสำเร็จ","อัพเดทสถานะรถไฟฟ้าแล้ว")});const t=document.getElementById("timeSystemSelect"),e=document.getElementById("timeStationSelect"),i=(v,u)=>{const g=document.getElementById(v);g&&(g.innerText=u)},n=(v,u)=>{const g=document.getElementById(v);g&&(g.innerHTML=u)},a=()=>{const v=t.value,u=N[v]||[];e.innerHTML=u.map(g=>`<option value="${g.name}">${g.name}</option>`).join(""),s()},s=()=>{const v=t==null?void 0:t.value;if(!v)return;const u=dt(v);i("firstTrainTime",u.firstTrain),i("lastTrainTime",u.lastTrain),i("nextTrainTime",u.nextTrain||"--:--"),i("freqPeak",u.frequencyPeak),i("freqOff",u.frequencyOffPeak),i("waitMinsText",u.waitMinutes!=null?u.waitMinutes===0?"กำลังจะถึง!":`อีก ${u.waitMinutes} นาที`:"--"),n("peakStatusText",u.isPeak?'<b style="color:var(--red);">⚡ ช่วงเร่งด่วน</b>':'<b style="color:var(--cyan);">🌙 ช่วงปกติ</b>')};t.addEventListener("change",a),e.addEventListener("change",s),a();const o=document.getElementById("fareSystemSelect"),l=document.getElementById("fareOriginSelect"),c=document.getElementById("fareDestSelect"),d=document.getElementById("farePassengerSelect"),h=()=>{const v=o.value,u=N[v]||[],g=u.map(y=>`<option value="${y.index}">${y.name}</option>`).join("");l.innerHTML=g,c.innerHTML=g,u.length>1&&(c.selectedIndex=1),m()},m=()=>{var I,M;const v=o.value,u=parseInt(l.value),g=parseInt(c.value),y=d.value;if(isNaN(u)||isNaN(g))return;const x=lt(v,u,g,y);document.getElementById("fareVal").innerHTML=`${x.fare} <span>บาท</span>`,i("fareStationsCount",x.stationsCount),i("fareDuration",x.duration);const b=N[v]||[],S=((I=b.find(B=>B.index===u))==null?void 0:I.name)||"",T=((M=b.find(B=>B.index===g))==null?void 0:M.name)||"",k=ct(v,S,T),_=document.getElementById("interchangeAdvice");k?(_.innerHTML=`<i data-lucide="sparkles" style="width:14px;height:14px;flex-shrink:0;"></i> <span>${k}</span>`,_.style.display="flex",lucide.createIcons()):_.style.display="none",document.getElementById("fareResultDisplay").style.display="flex"};o.addEventListener("change",h),l.addEventListener("change",m),c.addEventListener("change",m),d.addEventListener("change",m),h()}refreshTransitStatus(){var v,u;const t=document.getElementById("transitStatusContainer");if(!t)return;const e=new Date().getHours(),i=new Date().getMinutes(),n=e===8&&i>=15&&i<=35||e===18&&i>=20&&i<=45,a=e===8&&i>=30&&i<=55||e===18&&i>=10&&i<=30,s=((u=(v=this.state)==null?void 0:v.getWeatherCode)==null?void 0:u.call(v))??null,o=[51,53,55,61,63,65,80,81,82,95,96],l=[65,81,82,95,96],c=s!==null&&o.includes(s),d=s!==null&&l.includes(s);let h="";d?h="ฝนตกหนัก — อาจเกิดความล่าช้าเพิ่มเติมทุกสาย":c&&(h="ฝนตก — ผู้โดยสารหนาแน่นกว่าปกติ");const m=[{name:"BTS สายสุขุมวิท (Green Line)",color:"#22c55e",delayed:n||d,delayNote:n?"ล่าช้า 3-5 นาที ขบวนหนาแน่นที่สยาม":"ล่าช้าเนื่องจากฝนตกหนัก"},{name:"BTS สายสีลม (Silom Line)",color:"#15803d",delayed:d,delayNote:"ล่าช้าเนื่องจากฝนตกหนัก"},{name:"MRT สายเฉลิมรัชมงคล (Blue Line)",color:"#1e3a8a",delayed:a,delayNote:"ล่าช้า 8 นาที ระบบสัญญาณขัดข้องที่ห้วยขวาง"},{name:"MRT สายฉลองรัชธรรม (Purple Line)",color:"#7e22ce",delayed:!1},{name:"MRT สายสีเหลือง (Yellow Line)",color:"#ca8a04",delayed:!1},{name:"Airport Rail Link (ARL)",color:"#e11d48",delayed:!1}],p=h?`<div style="font-size:0.72rem;color:var(--yellow);background:rgba(234,179,8,0.08);border:1px solid rgba(234,179,8,0.2);border-radius:8px;padding:8px 12px;margin-bottom:12px;">${d?"🌧 ":"🌦 "}${h}</div>`:"";t.innerHTML=p+m.map(g=>`<div class="transit-line"><div class="transit-line-info"><div class="transit-color-bar" style="background-color:${g.color};"></div><div><div class="transit-name">${g.name}</div><div class="transit-desc">${g.delayed?"⚠️ "+g.delayNote:"🟢 บริการปกติความถี่คงที่"}</div></div></div><div class="transit-status ${g.delayed?"delay":"normal"}">${g.delayed?"🟡 ล่าช้า":"🟢 ปกติ"}</div></div>`).join("")}showToast(t,e){const i=document.getElementById("toastContainer");if(!i)return;const n=document.createElement("div");n.className="toast-alert",n.innerHTML=`
      <div class="toast-icon" style="color:var(--cyan);"><i data-lucide="info" style="width:16px;height:16px;"></i></div>
      <div class="toast-content">
        <div class="toast-title" style="color:var(--cyan);">${t}</div>
        <div class="toast-msg">${e}</div>
      </div>
    `,i.appendChild(n),lucide.createIcons(),setTimeout(()=>{n.classList.add("dismissed"),setTimeout(()=>n.remove(),300)},4e3)}}class kt{constructor(t,e){this.container=document.getElementById(t),this.state=e,this.pomoMinutes=25,this.pomoSeconds=0,this.pomoDuration=25*60,this.pomoTimer=null,this.pomoRunning=!1,this.pomoMode="work",this.waterGoal=8,this.waterCount=parseInt(localStorage.getItem("commuter_water_cups"))||0,this.audioCtx=null}async init(){this.render(),this.initTodo(),this.initWater(),this.initPomodoro(),this.initBattery(),this.initMemo(),this.initCalendar()}render(){this.container.innerHTML=`
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
    `,lucide.createIcons()}initTodo(){this.todoFilter="all",this.todos=JSON.parse(localStorage.getItem("commuter_todos"))||[{id:1,text:"หยิบร่มใส่กระเป๋า",category:"travel",checked:!1},{id:2,text:"เช็คสถานะการดีเลย์ของบีทีเอส",category:"travel",checked:!1},{id:3,text:"ตรวจความเรียบร้อยรอบบ้านก่อนออกเดินทาง",category:"home",checked:!0},{id:4,text:"ส่งรายงานประชุมเช้านี้",category:"work",checked:!1}],this.renderTodoItems();const t=document.getElementById("todoInput"),e=document.getElementById("btnTodoAdd"),i=()=>{const a=t.value.trim();if(!a)return;let s="work";const o=a.toLowerCase();o.includes("ร่ม")||o.includes("bts")||o.includes("รถ")||o.includes("ถนน")||o.includes("เดินทาง")?s="travel":(o.includes("บ้าน")||o.includes("ไฟ")||o.includes("น้ำ")||o.includes("แมว")||o.includes("หมา"))&&(s="home"),this.todos.push({id:Date.now(),text:a,category:s,checked:!1}),localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),t.value="",this.renderTodoItems()};e==null||e.addEventListener("click",i),t==null||t.addEventListener("keypress",a=>{a.key==="Enter"&&i()});const n=this.container.querySelectorAll(".todo-filter-btn");n.forEach(a=>{a.addEventListener("click",()=>{n.forEach(s=>{s.classList.remove("btn-primary"),s.classList.add("btn-secondary")}),a.classList.add("btn-primary"),a.classList.remove("btn-secondary"),this.todoFilter=a.dataset.filter,this.renderTodoItems()})})}renderTodoItems(){const t=document.getElementById("todoItemsContainer");if(!t)return;const e=this.todos.filter(i=>this.todoFilter==="all"?!0:i.category===this.todoFilter);if(e.length===0){t.innerHTML='<div style="text-align: center; font-size: 0.75rem; color: var(--muted2); padding: 24px 0;">ไม่มีรายการสิ่งที่จะทำในหมวดหมู่นี้</div>';return}t.innerHTML=e.map(i=>{const n=i.category==="work"?"💻":i.category==="travel"?"🚗":"🏠";return`
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
      `}).join(""),lucide.createIcons(),t.querySelectorAll(".todo-check-trigger").forEach(i=>{i.addEventListener("click",()=>{const n=parseInt(i.closest(".todo-item").dataset.id),a=this.todos.find(s=>s.id===n);a&&(a.checked=!a.checked,localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),this.renderTodoItems())})}),t.querySelectorAll(".todo-delete-trigger").forEach(i=>{i.addEventListener("click",n=>{n.stopPropagation();const a=parseInt(i.closest(".todo-item").dataset.id);this.todos=this.todos.filter(s=>s.id!==a),localStorage.setItem("commuter_todos",JSON.stringify(this.todos)),this.renderTodoItems()})})}initWater(){var t,e;this.updateWaterDisplay(),(t=document.getElementById("btnWaterAdd"))==null||t.addEventListener("click",()=>{this.waterCount<16&&(this.waterCount++,localStorage.setItem("commuter_water_cups",this.waterCount),this.updateWaterDisplay())}),(e=document.getElementById("btnWaterSub"))==null||e.addEventListener("click",()=>{this.waterCount>0&&(this.waterCount--,localStorage.setItem("commuter_water_cups",this.waterCount),this.updateWaterDisplay())})}updateWaterDisplay(){const t=document.getElementById("waterWave"),e=document.getElementById("waterDisplay");if(!t||!e)return;const i=Math.min(100,Math.round(this.waterCount/this.waterGoal*100));t.style.height=`${i}%`,e.innerHTML=`${this.waterCount} / ${this.waterGoal} <span style="font-size: 0.85rem; color: var(--muted);">แก้ว (${this.waterCount*250} มล.)</span>`}initPomodoro(){var i,n,a;const t=document.getElementById("btnPomoStart"),e=document.getElementById("btnPomoReset");document.getElementById("pomoCircle"),t==null||t.addEventListener("click",()=>{this.pomoRunning?this.pausePomodoro():this.startPomodoro()}),e==null||e.addEventListener("click",()=>{this.resetPomodoro()}),(i=document.getElementById("btnPomoWork"))==null||i.addEventListener("click",()=>this.setPomoMode("work",25)),(n=document.getElementById("btnPomoShort"))==null||n.addEventListener("click",()=>this.setPomoMode("short_break",5)),(a=document.getElementById("btnPomoLong"))==null||a.addEventListener("click",()=>this.setPomoMode("long_break",15))}setPomoMode(t,e){this.pausePomodoro(),this.pomoMode=t,this.pomoMinutes=e,this.pomoSeconds=0,this.pomoDuration=e*60;const i=document.getElementById("pomoModeText"),n=document.getElementById("pomoCircle");i&&(t==="work"?(i.innerText="โฟกัสงาน (WORK MODE)",n&&(n.style.stroke="var(--cyan)")):t==="short_break"?(i.innerText="พักสั้น (SHORT BREAK)",n&&(n.style.stroke="var(--green)")):(i.innerText="พักยาว (LONG BREAK)",n&&(n.style.stroke="var(--purple)"))),this.updatePomoDisplay()}startPomodoro(){this.pomoRunning=!0;const t=document.getElementById("btnPomoStart");t&&(t.innerHTML='<i data-lucide="pause" style="width: 12px; height: 12px;"></i> หยุด',lucide.createIcons()),this.pomoTimer=setInterval(()=>{if(this.pomoSeconds===0){if(this.pomoMinutes===0){this.triggerPomoAlarm(),this.resetPomodoro();return}this.pomoMinutes--,this.pomoSeconds=59}else this.pomoSeconds--;this.updatePomoDisplay()},1e3)}pausePomodoro(){this.pomoRunning=!1,clearInterval(this.pomoTimer);const t=document.getElementById("btnPomoStart");t&&(t.innerHTML='<i data-lucide="play" style="width: 12px; height: 12px;"></i> เริ่ม',lucide.createIcons())}resetPomodoro(){this.pausePomodoro();const t=this.pomoMode==="work"?25:this.pomoMode==="short_break"?5:15;this.pomoMinutes=t,this.pomoSeconds=0,this.pomoDuration=t*60,this.updatePomoDisplay()}updatePomoDisplay(){const t=document.getElementById("pomoDisplay"),e=document.getElementById("pomoCircle");if(!t)return;const i=`${String(this.pomoMinutes).padStart(2,"0")}:${String(this.pomoSeconds).padStart(2,"0")}`;if(t.innerText=i,e){const s=283*(1-(this.pomoMinutes*60+this.pomoSeconds)/this.pomoDuration);e.style.strokeDashoffset=s}}triggerPomoAlarm(){try{this.audioCtx||(this.audioCtx=new(window.AudioContext||window.webkitAudioContext));const e=this.audioCtx.createOscillator(),i=this.audioCtx.createGain();e.connect(i),i.connect(this.audioCtx.destination),e.type="sine",e.frequency.setValueAtTime(659.25,this.audioCtx.currentTime),e.frequency.setValueAtTime(830.61,this.audioCtx.currentTime+.15),e.frequency.setValueAtTime(987.77,this.audioCtx.currentTime+.3),i.gain.setValueAtTime(0,this.audioCtx.currentTime),i.gain.linearRampToValueAtTime(.3,this.audioCtx.currentTime+.05),i.gain.exponentialRampToValueAtTime(.01,this.audioCtx.currentTime+.8),e.start(),e.stop(this.audioCtx.currentTime+.9)}catch(e){console.warn("Audio Context init failed (user interaction required):",e)}const t=this.pomoMode==="work"?"ครบเวลาแล้ว! ได้เวลาพักผ่อนแล้วพักสติ":"ได้เวลาลุยต่อแล้ว! เริ่มโฟกัสงานอีกครั้ง";alert(`🛎️ Pomodoro Alarm:
${t}`)}initBattery(){const t=document.getElementById("batteryLevelFill"),e=document.getElementById("batteryPct"),i=document.getElementById("batteryStatusText");if(!t||!e||!i)return;const n=a=>{const s=Math.round(a.level*100);e.innerText=`${s}%`,t.style.width=`${s}%`,s<=20&&!a.charging?(t.style.backgroundColor="var(--red)",t.style.boxShadow="0 0 10px var(--red)"):a.charging?(t.style.backgroundColor="var(--cyan)",t.style.boxShadow="0 0 10px var(--cyan)"):(t.style.backgroundColor="var(--green)",t.style.boxShadow="0 0 10px var(--green)"),i.innerText=a.charging?"กำลังชาร์จไฟพ่วงอยู่ (Charging)":`กำลังจ่ายกระแสไฟ (${Math.round(a.dischargingTime/60)||0} ชม. คงเหลือ)`};navigator.getBattery?navigator.getBattery().then(a=>{n(a),a.addEventListener("levelchange",()=>n(a)),a.addEventListener("chargingchange",()=>n(a))}):(e.innerText="92%",t.style.width="92%",i.innerText="ไม่มี Battery API รองรับ (โหมดเดสก์ท็อป)")}initMemo(){const t=document.getElementById("memoTextarea"),e=document.getElementById("memoSaveStatus");if(!t||!e)return;t.value=localStorage.getItem("commuter_memo")||"";let i;t.addEventListener("input",()=>{e.innerHTML='<i data-lucide="loader" style="width:12px;height:12px;animation:spin 1s linear infinite;"></i> กำลังบันทึกแบบร่าง...',lucide.createIcons(),i&&clearTimeout(i),i=setTimeout(()=>{localStorage.setItem("commuter_memo",t.value),e.innerHTML='<i data-lucide="check" style="width:12px;height:12px;"></i> บันทึกในบราวเซอร์สำเร็จแล้ว',lucide.createIcons()},800)})}initCalendar(){var i,n,a;this.calDate=new Date,this.calSelectedDay=this.calDate.getDate(),this.calendarNotes=JSON.parse(localStorage.getItem("commuter_calendar_notes"))||{};const t=()=>{const s=this.calDate.getFullYear(),o=this.calDate.getMonth(),l=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];document.getElementById("calendarMonthYear").innerText=`${l[o]} ${s+543}`;let d=["อา","จ","อ","พ","พฤ","ศ","ส"].map(g=>`<div style="font-weight:600; color:var(--muted); margin-bottom:6px;">${g}</div>`).join("");const h=new Date(s,o,1).getDay(),m=new Date(s,o+1,0).getDate();for(let g=0;g<h;g++)d+="<div></div>";const p=new Date,v=p.getFullYear()===s&&p.getMonth()===o;for(let g=1;g<=m;g++){const y=v&&p.getDate()===g,x=this.calSelectedDay===g,b=`${s}-${String(o+1).padStart(2,"0")}-${String(g).padStart(2,"0")}`,S=!!this.calendarNotes[b];d+=`
          <div class="calendar-day-tile ${y?"today":""} ${x?"selected":""}" 
               data-day="${g}"
               style="padding: 8px 4px; border-radius: 6px; cursor: pointer; position: relative; transition: var(--transition);
                      border: 1px solid ${x?"var(--cyan)":"transparent"};
                      background: ${y?"rgba(0, 242, 254, 0.1)":S?"rgba(0, 242, 254, 0.05)":"transparent"};">
            ${g}
            ${S?'<div style="position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; background: var(--cyan); border-radius: 50%;"></div>':""}
          </div>
        `}const u=document.getElementById("calendarGrid");u&&(u.innerHTML=d,u.querySelectorAll(".calendar-day-tile").forEach(g=>{g.addEventListener("click",()=>{u.querySelectorAll(".calendar-day-tile").forEach(y=>{y.style.borderColor="transparent"}),g.style.borderColor="var(--cyan)",this.calSelectedDay=parseInt(g.dataset.day),e()})}))},e=()=>{const s=this.calDate.getFullYear(),o=this.calDate.getMonth()+1,l=`${s}-${String(o).padStart(2,"0")}-${String(this.calSelectedDay).padStart(2,"0")}`;document.getElementById("calSelectedDayText").innerHTML=`<span>โน้ตตารางเวลาวันที่: ${this.calSelectedDay}/${o}/${s+543}</span>`,document.getElementById("calDayNoteInput").value=this.calendarNotes[l]||""};(i=document.getElementById("btnCalPrev"))==null||i.addEventListener("click",()=>{this.calDate.setMonth(this.calDate.getMonth()-1),this.calSelectedDay=1,t(),e()}),(n=document.getElementById("btnCalNext"))==null||n.addEventListener("click",()=>{this.calDate.setMonth(this.calDate.getMonth()+1),this.calSelectedDay=1,t(),e()}),(a=document.getElementById("btnSaveCalNote"))==null||a.addEventListener("click",()=>{const s=this.calDate.getFullYear(),o=this.calDate.getMonth()+1,l=`${s}-${String(o).padStart(2,"0")}-${String(this.calSelectedDay).padStart(2,"0")}`,c=document.getElementById("calDayNoteInput").value.trim();c?this.calendarNotes[l]=c:delete this.calendarNotes[l],localStorage.setItem("commuter_calendar_notes",JSON.stringify(this.calendarNotes)),t(),e();const d=document.getElementById("btnSaveCalNote");if(d){const h=d.innerHTML;d.innerHTML="✓ บันทึกแล้ว!",d.style.background="#22c55e",d.style.borderColor="#22c55e",setTimeout(()=>{d.innerHTML=h,d.style.background="",d.style.borderColor=""},1800)}}),t(),e()}}class Lt{constructor(t,e){this.container=document.getElementById(t),this.state=e}async init(){this.renderSkeleton(),await this.fetchAndRender()}renderSkeleton(){this.container.innerHTML=`
      <div class="emergency-grid">
        <div class="glass-card skeleton" style="height: 350px;"></div>
        <div class="glass-card skeleton" style="height: 350px;"></div>
      </div>
    `,lucide.createIcons()}async fetchAndRender(){var t;try{const e=this.state.getCoords();let i=0;try{i=(await O(e.lat,e.lon)).current.weather_code}catch(s){console.warn("Could not load weather for safety check, using normal code",s)}const n=Y(i),a=nt();this.render(n,a),this.setupEvents()}catch(e){console.error(e),this.container.innerHTML=`
        <div class="glass-card glow-card-red" style="text-align: center; padding: 40px;">
          <i data-lucide="shield-alert" style="width: 48px; height: 48px; color: var(--red); margin-bottom: 16px;"></i>
          <h3 style="color: var(--red);">เกิดข้อผิดพลาดในการโหลดข้อมูลความปลอดภัย</h3>
          <p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 20px;">${e.message}</p>
          <button class="btn btn-primary" id="retryEmergencyBtn"><i data-lucide="refresh-cw"></i> ลองใหม่</button>
        </div>
      `,lucide.createIcons(),(t=document.getElementById("retryEmergencyBtn"))==null||t.addEventListener("click",()=>this.init())}}render(t,e){const i=this.state.getCoords(),n=t.map(o=>{o.level;const l=o.level==="danger"?"border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.06);":o.level==="warning"?"border-color: rgba(245,158,11,0.25); background: rgba(245,158,11,0.04);":"border-color: var(--border);",c=o.level==="danger"?"var(--red)":o.level==="warning"?"var(--yellow)":"var(--cyan)",d=o.level==="danger"?"shield-alert":o.level==="warning"?"alert-triangle":"info";return`
        <div class="safety-alert-card" style="${l}">
          <div class="safety-alert-icon" style="color: ${c}; background: ${c}15;">
            <i data-lucide="${d}"></i>
          </div>
          <div class="safety-alert-info">
            <h4 style="color: ${c};">${o.title}</h4>
            <p>${o.text}</p>
          </div>
        </div>
      `}).join(""),a=e.map(o=>`
      <div class="todo-item" style="padding: 12px; align-items: flex-start; flex-direction: column; gap: 4px;">
        <div style="font-size: 0.8rem; font-weight: 500; color: var(--text); text-align: left;">${o.title}</div>
        <div style="display: flex; justify-content: space-between; width: 100%; font-size: 0.65rem; color: var(--muted); margin-top: 2px;">
          <span>📅 ${o.time}</span>
          <span style="color: var(--cyan); font-weight: 500;">🟢 ${o.status}</span>
        </div>
      </div>
    `).join(""),s=it.map(o=>{let l="phone";return o.category==="medical"&&(l="ambulance"),o.category==="police"&&(l="shield"),o.category==="fire"&&(l="flame"),o.category==="flood"&&(l="droplet"),`
        <div class="emergency-contact-item">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,0.03); display: flex; align-items: center; justify-content: center; color: var(--cyan);">
              <i data-lucide="${l}" style="width: 14px; height: 14px;"></i>
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
              ${s}
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
    `,i.appendChild(n),lucide.createIcons(),setTimeout(()=>{n.classList.add("dismissed"),setTimeout(()=>n.remove(),300)},4e3)}}class It{constructor(){const t=localStorage.getItem("commuter_coords");t?this.coords=JSON.parse(t):this.coords={lat:13.7462,lon:100.5348,name:"สยามสแควร์ (กรุงเทพฯ)",country:"TH"},this.widgets=[],this.thunderTimer=null,this.weatherCode=null}getWeatherCode(){return this.weatherCode}setWeatherCode(t){this.weatherCode=t}getCoords(){return this.coords}setCoords(t,e,i,n){this.coords={lat:t,lon:e,name:i,country:n},localStorage.setItem("commuter_coords",JSON.stringify(this.coords)),this.widgets.forEach(a=>{typeof a.fetchAndRender=="function"?a.fetchAndRender():typeof a.init=="function"&&a.init()})}registerWidget(t){this.widgets.push(t)}triggerBackgroundAnimation(t){const e=document.getElementById("weatherBgOverlay");if(!e)return;e.innerHTML="",this.thunderTimer&&(clearInterval(this.thunderTimer),this.thunderTimer=null);const i=[51,53,55,61,63,65,80,81,82,95,96],n=[2,3,45,48],a=[0,1];if(i.includes(t)){const s=document.createDocumentFragment();for(let o=0;o<40;o++){const l=document.createElement("div");l.className="rain-drop",l.style.left=`${Math.random()*100}vw`,l.style.top=`${-80-Math.random()*100}px`,l.style.animationDuration=`${.6+Math.random()*.6}s`,l.style.animationDelay=`${Math.random()*2}s`,s.appendChild(l)}e.appendChild(s),t>=95&&(this.thunderTimer=setInterval(()=>{Math.random()>.75&&(e.style.backgroundColor="rgba(255, 255, 255, 0.14)",setTimeout(()=>{e.style.backgroundColor="transparent"},60))},3500))}else if(n.includes(t)){const s=document.createDocumentFragment();for(let o=0;o<4;o++){const l=document.createElement("div");l.className="cloud-particle";const c=150+Math.random()*220;l.style.width=`${c}px`,l.style.height=`${c*.65}px`,l.style.top=`${Math.random()*60}%`,l.style.animationDuration=`${40+Math.random()*50}s`,l.style.animationDelay=`${-Math.random()*40}s`,s.appendChild(l)}e.appendChild(s)}else if(a.includes(t)){const s=document.createElement("div");s.className="sun-ray",e.appendChild(s)}}}function Et(r){return new Promise(t=>{if(!navigator.geolocation)return t();navigator.geolocation.getCurrentPosition(e=>{const{latitude:i,longitude:n}=e.coords;fetch(`https://nominatim.openstreetmap.org/reverse?lat=${i}&lon=${n}&format=json&accept-language=th`).then(a=>a.json()).then(a=>{var o,l,c,d,h,m;const s=((o=a.address)==null?void 0:o.city)||((l=a.address)==null?void 0:l.town)||((c=a.address)==null?void 0:c.suburb)||((d=a.address)==null?void 0:d.county)||"ตำแหน่งปัจจุบัน";r.setCoords(i,n,s,((m=(h=a.address)==null?void 0:h.country_code)==null?void 0:m.toUpperCase())||"TH")}).catch(()=>{r.setCoords(i,n,"ตำแหน่งปัจจุบัน","TH")}).finally(t)},()=>t(),{timeout:6e3,maximumAge:6e4})})}document.addEventListener("DOMContentLoaded",async()=>{const r=new It;Mt(),await Et(r);const t=new st("tab-weather",r),e=new _t(null,"tab-transit",r),i=new kt("tab-helper",r),n=new Lt("tab-emergency",r);r.registerWidget(t),r.registerWidget(e),r.registerWidget(i),r.registerWidget(n),await t.init(),await e.init(),await i.init(),await n.init(),Bt(),Ct(),Ht(),$t(),Pt()});function Mt(){const r=document.getElementById("mainTime"),t=document.getElementById("mainDate");if(!r||!t)return;const e=()=>{const i=new Date;r.innerText=i.toLocaleTimeString("th-TH",{hour12:!1});const n=["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],a=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."],s=n[i.getDay()],o=i.getDate(),l=a[i.getMonth()],c=i.getFullYear()+543;t.innerText=`วัน${s}ที่ ${o} ${l} ${c}`};e(),setInterval(e,1e3)}function Bt(){const r=document.getElementById("themeToggle"),t=document.getElementById("theme-icon-light"),e=document.getElementById("theme-icon-dark");if(!r)return;const i=a=>{a==="light"?(document.body.classList.add("light-theme"),t&&(t.style.display="none"),e&&(e.style.display="block")):(document.body.classList.remove("light-theme"),t&&(t.style.display="block"),e&&(e.style.display="none")),document.dispatchEvent(new CustomEvent("theme-changed"))},n=localStorage.getItem("commuter_theme")||"dark";i(n),r.addEventListener("click",()=>{const s=document.body.classList.contains("light-theme")?"dark":"light";localStorage.setItem("commuter_theme",s),i(s)})}function Ct(r){const t=document.querySelectorAll(".nav-item"),e=document.querySelectorAll(".tab-content"),i=document.getElementById("headerTitle"),n=document.getElementById("headerSub"),a={weather:{main:"สภาพอากาศและการเตรียมตัว",sub:"BANGKOK METROPOLIS · TH"},transit:{main:"ตารางเวลารถไฟบีทีเอส-เอ็มอาร์ที",sub:"BANGKOK MASS TRANSIT HUB"},helper:{main:"สิ่งอำนวยความสะดวกในชีวิตประจำวัน",sub:"DAILY PRODUCTIVITY WIDGETS"},emergency:{main:"ศูนย์ความปลอดภัยและข้อมูลติดต่อด่วน",sub:"BANGKOK SAFETY BOARD & SOS"}};t.forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.tab;t.forEach(c=>c.classList.remove("active")),s.classList.add("active"),e.forEach(c=>c.classList.remove("active"));const l=document.getElementById(`tab-${o}`);l&&l.classList.add("active"),i&&n&&a[o]&&(i.innerText=a[o].main,n.innerText=a[o].sub)})})}function Ht(){const r=document.querySelector(".widgets-layout-grid");if(!r)return;const t=()=>{r.querySelectorAll(".glass-card").forEach(n=>{n.classList.add("draggable-widget"),n.setAttribute("draggable","true")})};t(),new MutationObserver(()=>{t()}).observe(r,{childList:!0});let i=null;r.addEventListener("dragstart",n=>{const a=n.target.closest(".draggable-widget");a&&(i=a,n.dataTransfer.effectAllowed="move",a.style.opacity="0.35")}),r.addEventListener("dragover",n=>{n.preventDefault();const a=n.target.closest(".draggable-widget");a&&a!==i&&a.classList.add("widget-drag-over")}),r.addEventListener("dragleave",n=>{const a=n.target.closest(".draggable-widget");a&&a.classList.remove("widget-drag-over")}),r.addEventListener("drop",n=>{n.preventDefault();const a=n.target.closest(".draggable-widget");if(a&&a!==i){a.classList.remove("widget-drag-over");const s=Array.from(r.children),o=s.indexOf(i),l=s.indexOf(a);o<l?r.insertBefore(i,a.nextSibling):r.insertBefore(i,a);const c=Array.from(r.children).map(d=>d.innerHTML.substring(0,30));localStorage.setItem("commuter_widget_order",JSON.stringify(c))}}),r.addEventListener("dragend",n=>{const a=n.target.closest(".draggable-widget");a&&(a.style.opacity="1"),r.querySelectorAll(".draggable-widget").forEach(s=>{s.classList.remove("widget-drag-over")})})}function $t(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(r=>console.log("Service Worker registered successfully:",r.scope)).catch(r=>console.error("Service Worker registration failed:",r))})}function Pt(){const r=(t,e,i,n)=>{const a=document.getElementById("toastContainer");if(!a)return;const s=document.createElement("div");s.className="toast-alert",s.style.borderColor=i,s.innerHTML=`
      <div class="toast-icon" style="color: ${i};">
        <i data-lucide="${n}" style="width:16px;height:16px;"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title" style="color: ${i};">${t}</div>
        <div class="toast-msg">${e}</div>
      </div>
    `,a.appendChild(s),lucide.createIcons(),setTimeout(()=>{s.classList.add("dismissed"),setTimeout(()=>s.remove(),300)},4500)};window.addEventListener("online",()=>{r("การเชื่อมต่อกลับมาแล้ว","ระบบเปลี่ยนกลับเป็นโหมดออนไลน์อัตโนมัติ","var(--green)","wifi")}),window.addEventListener("offline",()=>{r("คุณออฟไลน์อยู่","ระบบสลับมาใช้ฐานข้อมูลและแคชออฟไลน์แล้ว","var(--yellow)","wifi-off")})}
