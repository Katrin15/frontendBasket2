import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductListService {

	// названия продуктов
	gpu:string = 'GPU Server';

  constructor() { }

  processData(data) {

  	let items = data.Content.items.slice();

    //console.log('ОБРАБОТКА ДАННЫХ КОРЗИНЫ');
    //console.log('items', items);

    for (let entry of items) {

        //console.log('entry', entry);
        let arr = [];

        for (let key in entry.Configuration) {
          let o = {
            name: '',
            option: ''
          }

          // особые случаи
          if (key.toUpperCase() == 'HDD' && Array.isArray(entry.Configuration[key]) ) { //if (key === 'Hdd') {  hdd в виде массива

            //console.log('key', key);

            let b = {};

            for (let e of entry.Configuration[key]) {
              b[e] = 0;
            }
            //console.log('b', b);
            for (let e of entry.Configuration[key]) {              
              //console.log('e', e);
              for (let k in b) {
                //console.log('k', k);
                if (e === k) {
                  //console.log('e === k', e, k);
                  b[k]++;
                }
              }

            }
            //console.log('b', b);

            o.name = key;
            for (let k in b) {
              o.option += b[k] + 'x' + k + '; ';
            }

            arr.push(o);
          }
          else if (key === 'IPv6') {
              if (entry.Configuration[key] == false) {                
                o.option = 'NONE';  
              }
              else {
                o.option = entry.Configuration[key];
              }
              o.name = key;

              arr.push(o);
          }
          else if (key === 'Gpu') {
              // пропустить, будет в новом калькуляторе
          }
          else if (key === '_proto') {
              // пропустить, отладочная информация от сервера
          }
          else {
            o.name = key;
            o.option = entry.Configuration[key]; 

            arr.push(o);
          }          
          
        }

        entry['ConfigurationArr'] = arr.slice();
        entry['showMore'] = false;
        entry['showMoreLessText'] = 'Show More';

    }


    // комментарии к продукту
    let arr = [];
    let obj = {};
    for (let i=0, l = items.length; i < l; i++) {        

        // у домена нет PID!
        let pid:string;
        if (items[i].domain != undefined) {
          pid = 'domain';
        }
        else {
          pid = (items[i].pid).toString(); 
        }

        //let pid = (items[i].pid).toString();

        // description может не быть
        if (items[i].Description != undefined && items[i].Description != '') {

            obj[pid] = {
            "D": items[i].Description,
            "L": items[i].Label
          }
        }

        // для домена вместо billingcycle - RealCycle
        // this.basketContent.items[i].billingcycle == undefined && 
        if (items[i].RealCycle != undefined) {
            items[i]["billingcycle"] = items[i].RealCycle;

            // label всегда = "Domain"
            // items[i]["Configuration"] = items[i]["Label"] + " /" + items[i]["Configuration"];
            //console.log("ИЗМ");
            items[i]["Label"] = "Domain";
          }
    }
    
    for (let k in obj) {
        arr.push({"label":obj[k].L, "description":obj[k].D});
    }

    if (items.length > 0 ) {
      items[0]['basketItemComment'] = arr.slice();  
    }    	

    //console.log('items', items);

    return items;
  }
}


/*
for (let entry of items) {
      console.log(entry);

      // костыль gpu
      let receivedLabel = entry.Label;
      let calculatedLabel = this.gpu;
      let label:string;
      ( receivedLabel.indexOf(calculatedLabel) > -1 ) ?  ( label = this.gpu) : ( label = '' )

      switch (label) {
        case this.gpu:
          console.log("обрабатываем данные для", receivedLabel);
          
          let o = {
            "optionName": '',
            "optionValue": ''
          }
          let arr = [];
          for (let value of entry.Configuration) {
            console.log(value);
        }
          break;
        
        default:
          console.log("данные от сервера не поддаются обработке", receivedLabel);
          break;
      }
    }
*/
