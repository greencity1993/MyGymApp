import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as data2 from '../trainers/data.json';
import * as Tone from 'tone';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})

export class TrainerComponent {

  constructor(private route: ActivatedRoute) {}
  trainersData: any = (data2 as any).default;

  src : any;
  weight : any;
  timer = 0;
  interval: any;
  timeout: any;
  number = 0;
  autoRest = true;
  setPeriod = 30;
  restPeriod = 60;

  ngOnInit() {
    this.route.params.subscribe(params => {
      let current = this.trainersData[params['id']-1];
      this.src = current.imageSrc;
      this.weight = current.weight;
    });
  }

  playTone(delay = 0) {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now()
    synth.triggerAttack("C4", now + delay)
    synth.triggerRelease(now + 0.1 + delay)
    synth.triggerAttack("A5", now + 0.1 + delay)
    synth.triggerRelease(now + 0.2 + delay)
  }

  setAll(completed: boolean) {
    console.log(completed);
    this.autoRest = completed;
  }

  timerButtonClick(seconds: number, count = false) {
    this.playTone();
    this.playTone(seconds);
    this.startTimer(seconds);
    if(count == true){
      this.countInterval((seconds + 1) * 1000);
    }
    if(this.autoRest == true && count == true){
      this.timeout = setTimeout(() => {
        this.startTimer(this.restPeriod);
      }, seconds * 1000);
      this.playTone(seconds + this.restPeriod);
    }
  }

  startTimer(time: number) {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    this.timer = time;
    this.interval = window.setInterval(() => this.editTimerNumber(), 1000);
  }

  countInterval(time: number){
    this.timeout = setTimeout(() => {
        this.number = this.number + 1;
    }, time);
  }

  editTimerNumber(){
    if(this.timer > 0) {
      this.timer--;
    } else {
      clearInterval(this.interval);
    }
  }

}
