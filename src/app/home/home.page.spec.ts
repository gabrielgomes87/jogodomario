import { ElementRef, ViewChild, HostListener } from '@angular/core';

export class MyComponent {
  @ViewChild('mario', { static: true }) mario!: ElementRef;
  @ViewChild('pipe', { static: true }) pipe!: ElementRef;
  loop: any;

  jump() {
    this.mario.nativeElement.classList.add('jump');

    setTimeout(() => {
      this.mario.nativeElement.classList.remove('jump');
    }, 500);
  }

  gameLoop() {
    this.loop = setInterval(() => {
      const pipePosition = this.pipe.nativeElement.offsetLeft;
      const marioPosition = +window.getComputedStyle(this.mario.nativeElement).bottom.replace('px', '');

      if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 110) {
        this.pipe.nativeElement.style.animation = 'none';
        this.pipe.nativeElement.style.left = pipePosition + "px";

        this.mario.nativeElement.style.animation = 'none';
        this.mario.nativeElement.style.bottom = marioPosition + "px";
        this.mario.nativeElement.src = "./images/game-over.png";
        this.mario.nativeElement.style.width = "75px";
        this.mario.nativeElement.style.marginLeft = "50px";
        clearInterval(this.loop);
      }

    }, 10);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.jump();
  }

  ngOnInit() {
    this.gameLoop();
  }
}
