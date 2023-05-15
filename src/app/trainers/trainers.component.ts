import { Component } from '@angular/core';
import * as data from '../trainers/data.json';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent {

  trainersData: any = (data as any).default;

  deleteTrainer(trainerId: number){
    this.trainersData[trainerId-1].done = true;
  }

  getNotUsedTrainers(): any[] {
    var result = new Array();
    var beginResult = new Array();
    this.trainersData.forEach(function (value: any) {
      if(value.done != true){
        result.push(value);
      }else{
        beginResult.push(value);
      }
    });
    const numbers = beginResult.concat(result.reverse());
    return numbers;
  }

}
