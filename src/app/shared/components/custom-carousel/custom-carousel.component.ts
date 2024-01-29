import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-custom-carousel',
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.scss']
})
export class CustomCarouselComponent implements OnInit, OnDestroy {

  @Input() indicators = true;
  @Input() images = [1, 2, 3, 4, 5, 6, 7];
  @Input() autoSlide;
  @Input() slideInterval = 3000;
  @Input() dashboard;
  interval;
  pauseInterval;
  selectedIndex = 0;
  idleInterval;

  ngOnInit() {
    this.pauseInterval = !this.autoSlide;
    if (this.autoSlide) this.autoslideShow();
    
  }

  autoslideShow() {
    this.interval = setInterval(() => {
      if (!this.pauseInterval) {
        this.nextClick()
      }
    }, 4000
    )
  }

  carouselClick(): void {
    this.stopAutoSlide();
  }

  stopAutoSlide() {
    clearTimeout(this.interval);
    this.pauseInterval = false;
  }

  selectItem(idx) {
    this.selectedIndex = idx;
  }

  prevClick() {
    if (this.selectedIndex == 0) {
      this.selectedIndex = this.images.length - 1;
    }
    else this.selectedIndex--;
  }

  nextClick() {
    if (this.selectedIndex == this.images.length - 1) this.selectedIndex = 0;
    else this.selectedIndex++;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
