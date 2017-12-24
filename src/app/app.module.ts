import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2MapModule } from 'ng2-map';
import { AppComponent } from './app.component';
import { FileUploadModule } from 'ng2-file-upload';
import { XlsxFileUploadComponent } from './xlsx-file-upload/xlsx-file-upload.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    XlsxFileUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2MapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCBXYNKCvZJePmJg4-SMcDsTpTb30qw58g' })
    , FileUploadModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
