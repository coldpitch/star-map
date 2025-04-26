<script>
var vertexShaderString =
  "\nattribute float scale;\nvoid main() {\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_PointSize = scale * ( 300.0 / - mvPosition.z );\n\tgl_Position = projectionMatrix * mvPosition;\n}\n",
fragmentShaderString =
  "\nuniform vec3 color;\nvoid main() {\n\tif ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;\n\tgl_FragColor = vec4( color, 1.0 );\n}\n";

function removeProtocol(e) {
  return e.replace(/^https?\:\/\//i, "");
}

function initstars() {
  let t, n, i, r, o, a, s, d, l;
  params = JSON.parse($("#waves").attr("data-params"));
  let c,
    p = 0,
    w = 0,
    m = 0,
    u = window.innerWidth / 2,
    h = window.innerHeight / 2;

  (r = parseInt(params.separation)),
  (o = parseInt(params.amountX)),
  (a = parseInt(params.amountY)),
  ((s = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1e4
  )).position.z = 1e3),
  ((d = new THREE.Scene()).background = new THREE.Color(
    parseInt(params.bgColor, 16)
  ));

  (t = o * a), (n = new Float32Array(3 * t)), (i = new Float32Array(t));
  let g = 0,
    v = 0;
  for (let e = 0; e < o; e++)
    for (let t = 0; t < a; t++)
      (n[g] = e * r - (o * r) / 2),
      (n[g + 1] = 0),
      (n[g + 2] = t * r - (a * r) / 2),
      (i[v] = 1),
      (g += 3),
      v++;

  const E = new THREE.BufferGeometry();
  E.setAttribute("position", new THREE.BufferAttribute(n, 3)),
  E.setAttribute("scale", new THREE.BufferAttribute(i, 1));

  let H = new THREE.ShaderMaterial({
    uniforms: { color: { value: new THREE.Color(parseInt(params.color, 16)) } },
    vertexShader: vertexShaderString,
    fragmentShader: fragmentShaderString,
  });

  (c = new THREE.Points(E, H)), d.add(c);

  const S = document.querySelector("#waves");
  let y = S.offsetWidth,
    b = S.offsetHeight;

  (l = new THREE.WebGLRenderer({ canvas: S })).setPixelRatio(
    window.devicePixelRatio
  ),
  l.setSize(y, b);

  document.body.addEventListener("pointermove", function (e) {
    if (!1 === e.isPrimary) return;
    (w = e.clientX - u), (m = e.clientY - h);
  });

  window.addEventListener("resize", function () {
    (u = window.innerWidth / 2),
    (h = window.innerHeight / 2),
    (s.aspect = window.innerWidth / window.innerHeight),
    s.updateProjectionMatrix(),
    l.setSize(window.innerWidth, window.innerHeight),
    $("#waves").css("width", "100%").css("height", "100%");
  });

  (function e() {
    requestAnimationFrame(e);
    (function () {
      (s.position.x += (w - s.position.x) * params.camSpeed),
      (s.position.y += (-m - s.position.y) * params.camSpeed),
      s.lookAt(d.position);

      const e = c.geometry.attributes.position.array,
        t = c.geometry.attributes.scale.array;
      let n = 0,
        i = 0;

      for (let r = 0; r < o; r++)
        for (let o = 0; o < a; o++)
          (e[n + 1] =
            Math.sin(0.3 * (r + p)) * parseInt(params.wavesHeight) +
            Math.sin(0.5 * (o + p)) * parseInt(params.wavesHeight)),
          (t[i] =
            (Math.sin(0.3 * (r + p)) + 1) * parseInt(params.size) +
            (Math.sin(0.5 * (o + p)) + 1) * parseInt(params.size)),
          (n += 3),
          i++;

      (c.geometry.attributes.position.needsUpdate = !0),
      (c.geometry.attributes.scale.needsUpdate = !0),
      l.render(d, s),
      (p += 0.1);
    })();
  })();
}

$.getScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", function () {
  initstars();
});
</script>
