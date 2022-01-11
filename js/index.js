import { S as Style, I as Icon, t as toSize, F as Feature, P as Point, f as fromLonLat, V as VectorLayer, a as Vector, M as Map, T as TileLayer, O as OSM, b as View, d as defaults, D as DragPan, p as platformModifierKeyOnly, c as MouseWheelZoom, e as Overlay } from "./vendor.js";
window.addEventListener('load',()=>{
    for(let index=0; index<MAPS.ids.length; index++){
        let current_map = document.getElementById('libre-map-'+MAPS.ids[index]);
        let points = current_map.getAttribute('data-points');
        let map_points = JSON.parse(points);
               
        const p = function polyfill() {
            const relList = document.createElement("link").relList;
            if (relList && relList.supports && relList.supports("modulepreload")) {
              return;
            }
            for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
              processPreload(link);
            }
            new MutationObserver((mutations) => {
              for (const mutation of mutations) {
                if (mutation.type !== "childList") {
                  continue;
                }
                for (const node of mutation.addedNodes) {
                  if (node.tagName === "LINK" && node.rel === "modulepreload")
                    processPreload(node);
                }
              }
            }).observe(document, { childList: true, subtree: true });
            function getFetchOpts(script) {
              const fetchOpts = {};
              if (script.integrity)
                fetchOpts.integrity = script.integrity;
              if (script.referrerpolicy)
                fetchOpts.referrerPolicy = script.referrerpolicy;
              if (script.crossorigin === "use-credentials")
                fetchOpts.credentials = "include";
              else if (script.crossorigin === "anonymous")
                fetchOpts.credentials = "omit";
              else
                fetchOpts.credentials = "same-origin";
              return fetchOpts;
            }
            function processPreload(link) {
              if (link.ep)
                return;
              link.ep = true;
              const fetchOpts = getFetchOpts(link);
              fetch(link.href, fetchOpts);
            }
        };
        p();
        var style = "";
        let img = document.getElementById("marker-"+MAPS.ids[index]);  //makrer element
        const iconStyle = new Style({
            image: new Icon({
                img,
                anchor: [0.5,1],
                imgSize: toSize([32, 32])
            })
        });

        let icons = [];
        map_points.forEach((p)=>{
            icons.push(
                new Feature({
                    geometry:new Point( fromLonLat([p[0],p[1]]) ),
                    name:p[2].replace('¤',' ')
                })
            );
        });
          icons.forEach((icon) => {
            icon.setStyle(iconStyle);
          });
          const vectorLayer = new VectorLayer({
            source: new Vector({
              features: icons
            })
          });
          const map = new Map({
            target: "libre-map-"+MAPS.ids[index],
            layers: [
              new TileLayer({
                source: new OSM()
              }),
              vectorLayer
            ],
            view: new View({
              center: fromLonLat([26.937323964883692, 36.99901508618826]),
              zoom: 10
            }),
            interactions: defaults({ dragPan: false, mouseWheelZoom: false, dragRotate: false, pinchRotate: false }).extend([
              new DragPan({
                condition: function(event) {
                  return this.getPointerCount() === 2 || platformModifierKeyOnly(event) || event.type == "pointerdown" && event.originalEvent.pointerType == "mouse";
                }
              }),
              new MouseWheelZoom({
                condition: platformModifierKeyOnly
              })
            ])
          });
          const element = document.querySelector("#libre-map-"+MAPS.ids[index] +" > .popup");
          const popup = new Overlay({
            element
          });
          map.addOverlay(popup);
          map.addEventListener("click", function(evt) {
            const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature2) {
              return feature2;
            });
            let msg = popup.getElement();
            if (feature) {
              popup.setPosition(evt.coordinate);
              msg.innerText = feature.get("name");
              msg.classList.add("visible");
            } else
              msg.classList.remove("visible");
          });
          //# sourceMappingURL=index.936f26c6.js.map
          
       // const b=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}};b();let I=document.getElementById("marker-"+MAPS.ids[index]);const M=new m({image:new y({img:I,imgSize:g([32,32])})});let d=[]; map_points.forEach((p)=>{d.push(new l({geometry:new c(i([p[0],p[1]])),name:p[2].replace('¤',' ')}));});d.forEach(e=>{e.setStyle(M)});const O=new p({source:new w({features:d})});new h({target:"libre-map-"+MAPS.ids[index],layers:[new L({source:new v}),O],view:new T({center:i([26.937323964883692,36.99901508618826]),zoom:10}),interactions:E({dragPan:!1,mouseWheelZoom:!1,dragRotate:!1,pinchRotate:!1}).extend([new P({condition:function(e){return this.getPointerCount()===2||u(e)||e.type=="pointerdown"&&e.originalEvent.pointerType=="mouse"}}),new S({condition:u})])});function z(e=null,s=""){if(e!=null){let t=e.getElementsByClassName("map_overlay")[0];t!=null&&(t.innerText=s,e.classList.add("scrolled"),setTimeout(()=>{e.classList.remove("scrolled"),t.innerText="ctrl + scroll to zoom"},2e3))}}var D=document.querySelectorAll(".libre_map"),f=0;D.forEach(e=>{let s=e.getElementsByClassName("map_overlay")[0];s.innerText="ctrl + scroll to zoom",e.addEventListener("pointerdown",t=>{t.pointerType=="touch"&&t.isPrimary==!0?(f==t.pointerID,z(e,"use two fingers to move the map")):t.pointerType=="touch"&&t.isPrimary==!1&&t.pointerID!=f&&e.classList.remove("scrolled")})});document.addEventListener("scroll",e=>{document.body.classList.add("scrolling"),setTimeout(()=>{document.body.classList.remove("scrolling")},"2000")});
    }
});
//# sourceMappingURL=index.59e2bc17.js.map
