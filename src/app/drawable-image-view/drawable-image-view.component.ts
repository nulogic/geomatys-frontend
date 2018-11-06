import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-drawable-image-view',
  templateUrl: './drawable-image-view.component.html',
  styleUrls: ['./drawable-image-view.component.css']
})
export class DrawableImageViewComponent implements OnInit {
  
  
  //BG image properties

  @ViewChild('bgimage') 
  bgimage: ElementRef;
  imagePath = '';
  imageWidth: number;
  imageHeight: number;

  //Drawable canvas properties
  @ViewChild('canvas') 
  canvas: ElementRef;
  context: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  
  //Other properties
  roi = [0,0,0,0];
  isDrawing = false;
  isImageLoaded = false;
  pivotX = 0;
  pivotY = 0;
  pixelScaleFactor = 1;

  @Input() 
  set filePath(filePath: string){
    if(filePath && filePath!=''){
      let reader: any;             // Work-around for compile error on event.target.result
      reader = new FileReader();
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imagePath = event.target.result;
      };    
      reader.readAsDataURL(filePath); // read file as data url      
    }
  }
  
  @Output() roiChanged = new EventEmitter<number[]>();

  constructor() {}

  ngOnInit() {
    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    this.imageWidth = 600;
    this.imageHeight = 600;
    this.canvasWidth = 600;
    this.canvasHeight = 600;    
  }

  onImageChange() {
    this.isImageLoaded = true;
    this.pixelScaleFactor = this.bgimage.nativeElement.naturalWidth/this.imageWidth;
    this.imageHeight = this.bgimage.nativeElement.naturalHeight/this.bgimage.nativeElement.naturalWidth*this.imageWidth;
    this.canvasHeight = this.imageHeight;
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height); 
    this.roi = [0,0,0,0];
    this.roiChanged.emit([0,0,0,0]);
    this.pivotX = 0;
    this.pivotY = 0;
  }

  startDraw(event: any){
    if(this.isImageLoaded){
      this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this.isDrawing = true;
      this.roi = [event.layerX, event.layerY, 0, 0];
      this.roiChanged.emit(this.roi);
      this.pivotX = event.layerX;
      this.pivotY = event.layerY;
    }
  }

  draw(event: any){
    if (this.isDrawing){
      if(event.layerX<this.pivotX){
        this.roi[0] = event.layerX;
        this.roi[2] = this.pivotX - this.roi[0];
      } else {
        this.roi[2] = event.layerX - this.roi[0];
      }
      
      if(event.layerY<this.pivotY){
        this.roi[1] = event.layerY;
        this.roi[3] = this.pivotY - this.roi[1];
      } else {
        this.roi[3] = event.layerY - this.roi[1];
      }

      this.drawRect(this.roi);
      this.roiChanged.emit(this.roi);
    }
  }

  endDraw(event: any){
    this.isDrawing = false;
  }

  drawRect(roi: number[]){
      this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height); 
      this.context.strokeStyle = 'red';
      this.context.strokeRect(roi[0],roi[1],roi[2],roi[3]);
  }

}
