import About from './bundle/about/About'
import scrollAnime from './bundle/scrollAnime'
import scrollUnderline from './bundle/scrollUnderline'
import scrollBgChange from './bundle/scrollBgChange'
import Menu from './bundle/Menu'
import MessageText from './bundle/messageText'
import ConditionSearch from './bundle/conditionSearch'
import Accordion from './bundle/accordion'
import Loading from './bundle/loading'
import ModalSlider from './bundle/modalSlider'

import threeCanvas from './bundle/threeCanvas'
import bgCircle from './bundle/bgCircle'
import viewport from './bundle/viewport'

new About();
new scrollAnime();
new scrollUnderline();
new scrollBgChange();
new Menu();
new MessageText();
new ConditionSearch();
new Accordion();
new Loading();
new ModalSlider();

new threeCanvas();
new bgCircle();
new viewport();

// export default class Router {
//   constructor() {
//     this.model = {
//       pathName: location.pathname,
//     }


//     this.initRouting();
//   }

//   initRouting() {
//     const pathName = this.model.pathName
//     switch (pathName) {
//       case '/':
//         new Home();
//         new scrollAnime();
//         new Menu();

//         break
//       case '/about':
//         new About();
//         break
//       case '/faq':
//         new threeCanvas();
//         new bgCircle();
//         break
//       default:
//         break
//     }
//   }
// }
