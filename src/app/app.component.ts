import { Component } from '@angular/core';
import { Marker } from 'ng2-map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { read, WorkBook } from 'ts-xlsx';
import { UploadResult } from './xlsx-file-upload/xlsx-file-upload.component';
import { BehaviorSubject } from 'rxjs';
import html2canvas from 'html2canvas';

// import { parseXlsx } from 'excel';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  result: any;
  // positions: any[] = [];
  zoom = 10;
  showTemp = false;
  title = 'app';
  map: any;
  filePath: any;
  index = 0;
  sites: any[] = [];
  type = 'roadmap';

  public positions = [];
  public _positions = [];
  constructor() {
  }
  public uploaderContent: BehaviorSubject<string> = new BehaviorSubject('please drop file in');

  public xlsxUploaded(result: UploadResult) {
    console.log('====================================');
    const length = +result.payload[0]['!ref'].split(':')[1].slice(1, result.payload[0]['!ref'].split(':')[1].length);
    console.log(length + ' ' + typeof (length));
    console.log('====================================');
    const data = result.payload[0];
    this.sites = [];
    this.index = 0;
    console.log(data);
    for (let index = 2; index <= length; index++) {
      // try {
      console.log(data);
      if (data['A' + index] && data['F' + index] && data['F' + index].v && data['F' + index].v.trim()) {
        const lat = data['F' + index].v.trim().split(',')[1].trim();
        const lng = data['F' + index].v.trim().split(',')[0].trim();
        const obj = {
          sr: data['A' + index].v,
          lat: lat,
          lng: lng,
          ro: data['C' + index].v,
          zone: data['D' + index].v,
          dealer: data['E' + index].v,
          address: data['G' + index].v
        };

        this.sites.push(obj);
      }
      console.log('====================================');
      console.log('====================================');
      console.log('====================================');
      console.log('====================================');
      // let counter = 1000;
      this.positions = [];
      this._positions = [];
      this.sites.forEach(obj => {
        // setTimeout((obj) => {
        this.positions.push([obj['lng'], obj['lat']]);
        this._positions.push(obj);
        // })
      });
      console.log(this.positions);
      console.log('====================================');
      // } catch (e) {
      //   console.error('====================================');
      //   console.error(e);
      //   console.error('====================================');
      // }
    }

  }

  buttonClicked() {
    console.log('====================================');
    // alert(this._positions.length);
    console.log('====================================');
    this._positions.forEach(x => {
      let _ = '#images' + x.sr;
      console.log(_);
      html2canvas(document.querySelector(_), {
        logging: false,
        allowTaint: true,
        useCORS: true,
        proxy: 'localhost:3000'
      }).then(function (canvas) {
console.log('====================================');
// console.log(canvas.toDataURL('image/png'));
console.log('====================================');        ;
        document.body.appendChild(canvas);

      });

    });

    // setTimeout(function () {
    this.showTemp = true;
    // }, 4000);

  }

  onMapReady(map) {
    this.map = map;
    // console.log('map', map);
    // console.log('markers', map.markers);  // to get all markers as an array
  }

}
