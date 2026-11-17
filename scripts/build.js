// Erzeugt das Release-Zip (notifications.zip) für ng_web_packages bzw. den Servoy Package Manager.
// Aufruf über "npm run make_release" (baut vorher die Library nach dist/).
const AdmZip = require('adm-zip');

const zip = new AdmZip();
zip.addLocalFolder('./META-INF/', '/META-INF/');
zip.addLocalFolder('./notification/', '/notification/');
zip.addLocalFolder('./dist/', '/dist/');
zip.writeZip('notifications.zip');
