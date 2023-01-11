// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');

const DEG2RAD = Math.PI / 180;

let index = 0;
let radar = {
  offsetWidth: 100
};
const color = 'red';

function get(rot, fov) {
  if (radar == undefined) return;
  if (color == undefined) return;
  const r = radar.offsetWidth / 2;
  const radFov = Math.max(1, fov) * DEG2RAD;

  const dx = r * Math.sin(radFov / 2);
  const dy = r * Math.cos(radFov / 2);
  const sx = r / (2 * dx);
  const path = [
    'M', r, r,
    'L', r + dx, r - dy,
    'A', r, r, 0, 0, 0, r - dx, r - dy,
    'L', r, r
  ].join(' ');

  if (radar && !isNaN(sx)) {
    const gradName = `grad${index}`;
    radar.innerHTML =
      `<svg class="w-100 h-100" style="transform: rotate(${-rot}deg)">
<defs><radialGradient id="${gradName}" cx="50%" cy="100%" r="100%"
gradientTransform="translate(${0.5 - sx / 2}, 0) scale(${sx}, 1)">
<stop offset="0%" style="stop-color:${color};stop-opacity:1" />
<stop offset="100%" style="stop-color:white;stop-opacity:0" />
</radialGradient></defs>
<path d="${path}" fill="url(#${gradName})"></path></svg>`;
  } else {
    radar.innerHTML = '';
  }
}
get (0,100);
appDiv.innerHTML = radar.innerHTML;