/* ===================================
   BURTONIA - App
=================================== */

loadDB();

render();

if(typeof initCloudSync === "function"){

    initCloudSync();

}