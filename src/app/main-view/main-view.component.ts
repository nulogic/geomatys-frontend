import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DrawableImageViewComponent } from '../drawable-image-view/drawable-image-view.component';
import { ImageDispatchService } from '../image-dispatch.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})

export class MainViewComponent implements OnInit {
  
  roi = [0,0,0,0];
  filePath: string;
  otputImage: string;
  outputWidth = 600;
  outputHeight = 600;
  @ViewChild('drawableImView')
  drawableImView: DrawableImageViewComponent;
  
  constructor(private imageDispatchService: ImageDispatchService) { }

  ngOnInit() {
  }

  changeBG(event) {
    if (event.target.files && event.target.files[0]) {      
      this.filePath = event.target.files[0]; // read file as data url
      this.otputImage =  '';     
    } 
  }

  onRoiChanged(roi: number[]){
    this.roi=roi;
  }

  send(){
    // this.imageDispatchService.getConfig()
    //   .subscribe((data: any) => {
    //     console.log(data['message']);
    //   })
    
    // use http module to send and receive

    const scaledRoi = this.roi.map((num) => {return Math.floor(num*this.drawableImView.pixelScaleFactor)});
    this.imageDispatchService.postImage(scaledRoi,this.filePath)
    .subscribe((data) => {
      this.displayOutputImage(data);
    })
  }

  discardInput(input: string, length: number): boolean{
    return !this.drawableImView.isImageLoaded || input.length == 0 ||
    isNaN(Number(input)) || Number(input) < 0 || length > this.drawableImView.imageWidth
  }

  updateRoi(event){
    let length: number;
    switch (event.target.name) {
      case "x0ROI":
        length = Number(event.target.value) + Number(this.roi[2]);
        if(this.discardInput(event.target.value, length)){
          event.target.value = this.roi[0];
        } else {
          this.roi[0] = event.target.value;
          this.drawableImView.drawRect(this.roi);
        }
        break;
      case "y0ROI":       
        length = Number(event.target.value) + Number(this.roi[3]);
        if(this.discardInput(event.target.value, length)){
          event.target.value = this.roi[1];
        } else {
          this.roi[1] = event.target.value;
          this.drawableImView.drawRect(this.roi);
        }
        break;
        // Finire i controlli
      case "widthROI":
        length = Number(event.target.value) + Number(this.roi[0]);
        if(this.discardInput(event.target.value, length)){
          event.target.value = this.roi[2];
        } else {
          this.roi[2] = event.target.value;
          this.drawableImView.drawRect(this.roi);
        } 
        break;
      case "heightROI":
        length = Number(event.target.value) + Number(this.roi[1]);
        if(this.discardInput(event.target.value, length)){
          event.target.value = this.roi[3];
        } else {
          this.roi[3] = event.target.value;
          this.drawableImView.drawRect(this.roi);  
          break;
        }
      default:
        break;
    }
  }

  displayOutputImage(image: Blob) {
    let reader: any;
    reader = new FileReader();
    reader.onload = (event) => { 
      this.otputImage = event.target.result;
    };

   if (image) {
      reader.readAsDataURL(image);
   }
  }

  onImageChange(event) {
    this.outputHeight = event.target.naturalHeight/this.drawableImView.pixelScaleFactor;
    this.outputWidth = event.target.naturalWidth/this.drawableImView.pixelScaleFactor;
  }



}
